/* POST /api/admin/proof-review — admin account-sale approve/reject (trusted, atomic).
   approve: rate approval-time task doc থেকে, seller-এর balance-এ transaction সহ।
   MARKETPLACE MODEL: user একদিনে একাধিক account বিক্রি করতে পারে — তাই double-credit guard
   per-PROOF (proofId), per-day নয়। (আগে `${taskSlug}_${day}` ছিল, যার ফলে একই দিনে ২য়/৩য়
   account approve করলে টাকা যোগ হতো না — silent money loss।)
   reject: accountKey release হয় যাতে seller ঠিক করে আবার জমা দিতে পারে। */
import { getDb } from '../firebase-admin.js';
import { fail, ok, readBody, requireAdmin, authenticate, authReject, AUTH_OK, cors, ApiError, opFail, isSecretField } from '../http.js';
import { FieldValue } from 'firebase-admin/firestore';
import { isFull, requiredUsers, approvedCount } from '../../src/core/microjobs.js';

/* MicroJobs review actions:
   approve          → credit reward (একবারই), approvedCount +1, slot শেষ হলে job FULL
   reject_resubmit  → user ঠিক করে আবার submit করতে পারবে (job ওই user-এর list-এ থাকে)
   reject_hide      → job শুধু সেই user-এর list থেকে লুকানো (job global ভাবে মোছে না)
   reject           → legacy = reject_resubmit (পুরোনো client/API caller ভাঙে না) */
const ACTIONS = { approve: 'approve', reject: 'reject_resubmit', reject_resubmit: 'reject_resubmit', reject_hide: 'reject_hide' };

export default async function handler(req, res) {
  if (cors(req, res)) return;
  if (req.method !== 'POST') return fail(res, 405, 'Method Not Allowed');
  const admin = await requireAdmin(req);
  if (admin.state !== AUTH_OK) return authReject(res, admin);   /* config/expiry = ভুল বার্তা নয় */
  if (!admin.isAdmin) return fail(res, 403, 'Admin access required');

  const body = await readBody(req);
  const proofId = String(body.proofId || '').slice(0, 80);
  const action = String(body.action || '');
  const note = typeof body.note === 'string' ? body.note.trim().slice(0, 200) : '';
  if (!proofId) return fail(res, 400, 'Invalid proofId');
  const act = ACTIONS[action];
  if (!act) return fail(res, 400, 'Invalid action');

  const db = getDb();
  const proofRef = db.collection('proofs').doc(proofId);
  const now = FieldValue.serverTimestamp();
  const ts = Date.now();
  const rnd = Math.random().toString(36).slice(2, 8);
  try {
    await db.runTransaction(async tx => {
      const pSnap = await tx.get(proofRef);
      if (!pSnap.exists) throw new ApiError(409, 'Submission পাওয়া যায়নি');   /* 409: আগের contract ঠিক রাখা হয়েছে (client/tests) */
      const p = pSnap.data();
      // idempotency: pending না হলে আগেই review হয়ে গেছে (double-click / double-credit রোধ)
      if (p.status !== 'pending') throw new ApiError(409, 'এই submission-এর status আগেই পরিবর্তন হয়েছে');
      const uid = p.userId;
      const userRef = db.collection('users').doc(uid);
      const userProofRef = db.collection('users').doc(uid).collection('proofs').doc(proofId);
      const taskRef = db.collection('tasks').doc(p.taskSlug);

      if (act === 'approve') {
        // rate = APPROVAL time-এর task doc থেকে (spec: browser-এর পাঠানো amount কখনো trust না)
        const tSnap = await tx.get(taskRef);
        const taskDoc = tSnap.exists ? (tSnap.data() || {}) : {};
        const reward = tSnap.exists
          ? (Number(taskDoc.reward) || 0)
          : (Number(p.reward) || 0);
        const upd = { status: 'approved', note: '', reward, reviewedAt: now, approvedAt: now, approvedBy: admin.uid };

        /* SLOT GUARD: requiredUsers শেষ হলে আর approve নয় — নাহলে 100 slot-এর job-এ
           130 জনকে টাকা দিয়ে বসত (remaining = required - approved ঋণাত্মক হতো) */
        const need = requiredUsers(taskDoc);
        const done = approvedCount(taskDoc);
        if (need > 0 && done >= need) throw new ApiError(409, `এই job-এর slot শেষ (${need} জন) — approve করা যাচ্ছে না, আগে Required Users বাড়াতে হবে`);

        /* DOUBLE-CREDIT GUARD: claim doc (proofId = key) আগেই থাকলে মানে এই
           submission-এর টাকা ইতিমধ্যেই বসানো হয়েছে → money never credited twice,
           status field-এর সাথে দুইতরীবে রক্ষা (approve দুইবার চাপা/race হলেও) */
        const claimRef = db.collection('users').doc(uid).collection('taskClaims').doc(proofId);
        const claimSnap = await tx.get(claimRef);
        if (claimSnap.exists) throw new ApiError(409, 'এই submission-এর reward আগেই দেওয়া হয়েছে');
        if (reward > 0) {
          const userSnap = await tx.get(userRef);
          if (!userSnap.exists) throw new ApiError(409, 'Seller পাওয়া যায়নি');
          const d = userSnap.data();
          tx.update(userRef, {
            balance: (Number(d.balance) || 0) + reward,
            totalEarned: (Number(d.totalEarned) || 0) + reward,
          });
          tx.set(db.collection('users').doc(uid).collection('transactions').doc(`pr_${ts}_${rnd}`), {
            amount: reward, type: 'account_sale',
            note: `Account sale: ${p.taskName || p.taskSlug} (approved)`, createdAt: now,
          });
          tx.set(claimRef, {
            reward, taskId: p.taskSlug, claimedOn: p.day, proofId,
            source: 'account_sale', createdAt: now,
          });
        }
        /* job-এর completion count + auto FULL/CLOSED — একই transaction-এ, তাই
           "approved=100/100" আর "closed" কখনো আলাদা সময় হয় না */
        if (p.taskSlug) {
          const next = done + 1;
          const fullNow = need > 0 && next >= need;
          /* পুরো doc merge করে লেখা হয় (tx.set-এর merge option-এর উপর নির্ভর না) —
             নাহলে reward/enabled/inputFields মুছে যেত (mock merge বোঝে না, তাই test-এই ধরা পড়ে) */
          tx.set(taskRef, {
            ...taskDoc,
            approvedCount: next,
            pendingCount: Math.max(0, (Number(taskDoc.pendingCount) || 0) - 1),
            closed: need > 0 ? fullNow : !!taskDoc.closed,
            ...(fullNow ? { fullAt: now, closedAt: now } : {}),
          });
        }
        tx.update(proofRef, upd);
        /* ⚠️ user-side mirror doc না থাকলে tx.update() পুরো transaction ফেল করাত
           ("no document to update") — মানে পুরোনো (pre-mirror) submission কখনোই
           approve হতো না, seller টাকা পেত না। merge-set = না থাকলে তৈরি হবে। */
        tx.set(userProofRef, upd, { merge: true });
      } else {
        /* PRIVACY: reject মানে এই sale-টা আর processing হবে না — credential (password /
           cookie / OTP টাইপের field) Firestore-এ রেখে দিওয়ার কোনো কারণ নেই। label/type
           থেকে চিনে value ফাঁকা করা হয়; row + note + identity field থাকে, তাই admin ও
           user কী ভুল ছিল দেখতে পারে এবং seller ঠিক করে আবার জমা দিতে পারবে। */
        const snapIn = Array.isArray(p.submittedFields) ? p.submittedFields : null;
        const secretIdx = new Set();
        if (snapIn) snapIn.forEach((f, i) => { if (f && isSecretField(f.label, f.type)) secretIdx.add(i); });
        const dataIn = p.submittedData && typeof p.submittedData === 'object' && !Array.isArray(p.submittedData) ? p.submittedData : {};
        const clearedData = { ...dataIn };
        if (snapIn && snapIn.length) {
          for (const f of snapIn) if (f && isSecretField(f.label, f.type)) delete clearedData[String(f.label)];
        } else {
          for (const k of Object.keys(clearedData)) if (isSecretField(k, 'text')) delete clearedData[k];
        }
        const clearedSnap = snapIn ? snapIn.map((f, i) => (secretIdx.has(i) ? { ...f, value: '' } : f)) : undefined;
        const hideFromUser = act === 'reject_hide';
        const upd = {
          status: 'rejected', note, reviewedAt: now, rejectedAt: now, rejectedBy: admin.uid,
          /* reject_mode = user-এর list-এ jobটা আবার দেখাবে কিনা — top-level doc-এও
             রাখা হয় যাতে admin review queue-তে স্পষ্ট থাকে কোনটা কোন reject ছিল */
          rejectMode: act, hiddenForUser: hideFromUser,
          resubmitAllowed: !hideFromUser,
          submittedData: clearedData,
          ...(clearedSnap ? { submittedFields: clearedSnap } : {}),
        };
        // reject → accountKey release, যাতে seller ঠিক তথ্য দিয়ে আবার জমা দিতে পারে
        if (p.accountKey) {
          const keyRef = db.collection('accountKeys').doc(p.accountKey);
          const kSnap = await tx.get(keyRef);
          if (kSnap.exists && kSnap.data().proofId === proofId) tx.delete(keyRef);
        }
        tx.update(proofRef, upd);
        tx.set(userProofRef, upd, { merge: true });
      }
    });
  } catch (err) {
    return opFail(res, err);
  }
  return ok(res, { action });
}
