/* POST /api/admin/proof-review — admin account-sale approve/reject (trusted, atomic).
   approve: rate approval-time task doc থেকে, seller-এর balance-এ transaction সহ।
   MARKETPLACE MODEL: user একদিনে একাধিক account বিক্রি করতে পারে — তাই double-credit guard
   per-PROOF (proofId), per-day নয়। (আগে `${taskSlug}_${day}` ছিল, যার ফলে একই দিনে ২য়/৩য়
   account approve করলে টাকা যোগ হতো না — silent money loss।)
   reject: accountKey release হয় যাতে seller ঠিক করে আবার জমা দিতে পারে। */
import { getDb } from '../firebase-admin.js';
import { fail, ok, readBody, requireAdmin, cors } from '../http.js';
import { FieldValue } from 'firebase-admin/firestore';

export default async function handler(req, res) {
  if (cors(req, res)) return;
  if (req.method !== 'POST') return fail(res, 405, 'Method Not Allowed');
  const admin = await requireAdmin(req);
  if (!admin || !admin.isAdmin) return fail(res, 403, 'Admin access required');

  const body = await readBody(req);
  const proofId = String(body.proofId || '').slice(0, 80);
  const action = String(body.action || '');
  const note = typeof body.note === 'string' ? body.note.trim().slice(0, 200) : '';
  if (!proofId) return fail(res, 400, 'Invalid proofId');
  if (!['approve', 'reject'].includes(action)) return fail(res, 400, 'Invalid action');

  const db = getDb();
  const proofRef = db.collection('proofs').doc(proofId);
  const now = FieldValue.serverTimestamp();
  const ts = Date.now();
  const rnd = Math.random().toString(36).slice(2, 8);
  try {
    await db.runTransaction(async tx => {
      const pSnap = await tx.get(proofRef);
      if (!pSnap.exists) throw new Error('Submission পাওয়া যায়নি');
      const p = pSnap.data();
      // idempotency: pending না হলে আগেই review হয়ে গেছে (double-click / double-credit রোধ)
      if (p.status !== 'pending') throw new Error('এই submission-এর status আগেই পরিবর্তন হয়েছে');
      const uid = p.userId;
      const userRef = db.collection('users').doc(uid);
      const userProofRef = db.collection('users').doc(uid).collection('proofs').doc(proofId);

      if (action === 'approve') {
        // rate = APPROVAL time-এর task doc থেকে (spec: browser-এর পাঠানো amount কখনো trust না)
        const tSnap = await tx.get(db.collection('tasks').doc(p.taskSlug));
        const reward = tSnap.exists
          ? (Number(tSnap.data().reward) || 0)
          : (Number(p.reward) || 0);
        const upd = { status: 'approved', note: '', reward, reviewedAt: now, approvedAt: now, approvedBy: admin.uid };

        // per-submission claim record (audit trail) — proofId unique, তাই প্রতিটা
        // approved account আলাদা credit পায়; status guard-ই double-credit আটকায়
        const claimRef = db.collection('users').doc(uid).collection('taskClaims').doc(proofId);
        if (reward > 0) {
          const userSnap = await tx.get(userRef);
          if (!userSnap.exists) throw new Error('Seller পাওয়া যায়নি');
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
        tx.update(proofRef, upd);
        tx.update(userProofRef, upd);
      } else {
        const upd = { status: 'rejected', note, reviewedAt: now, rejectedAt: now, rejectedBy: admin.uid };
        // reject → accountKey release, যাতে seller ঠিক তথ্য দিয়ে আবার জমা দিতে পারে
        if (p.accountKey) {
          const keyRef = db.collection('accountKeys').doc(p.accountKey);
          const kSnap = await tx.get(keyRef);
          if (kSnap.exists && kSnap.data().proofId === proofId) tx.delete(keyRef);
        }
        tx.update(proofRef, upd);
        tx.update(userProofRef, upd);
      }
    });
  } catch (err) {
    return fail(res, 409, err.message || 'Operation fail হয়েছে');
  }
  return ok(res, { action });
}
