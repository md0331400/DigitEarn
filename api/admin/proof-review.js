/* POST /api/admin/proof-review — admin proof approve/reject (trusted, atomic).
   approve: reward server-এর proof doc থেকে, user balance-এ transaction সহ। এক proof একবারই approve। */
import { getDb } from '../_lib/firebase-admin.js';
import { fail, ok, readBody, requireAdmin, cors } from '../_lib/http.js';
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
      if (!pSnap.exists) throw new Error('Proof পাওয়া যায়নি');
      const p = pSnap.data();
      if (p.status !== 'pending') throw new Error('এই proof-এর status আগেই পরিবর্তন হয়েছে');
      const uid = p.userId;
      const userRef = db.collection('users').doc(uid);
      if (action === 'approve') {
        // reward = APPROVAL time-এর task doc থেকে (spec: browser-এর পাঠানো amount কখনো trust না)
        const tSnap = await tx.get(db.collection('tasks').doc(p.taskSlug));
        const reward = tSnap.exists
          ? (Number(tSnap.data().reward) || 0)
          : (Number(p.reward) || 0);
        const upd = { status: 'approved', note: '', reviewedAt: now, approvedAt: now, approvedBy: admin.uid };
        // double-credit guard: claim record-এ same ID format (${taskSlug}_${day}) —
        // আগে direct claim হয়ে থাকলে reward আবার credit হয় না
        const claimRef = db.collection('users', uid, 'taskClaims').doc(`${p.taskSlug}_${p.day}`);
        const cSnap = await tx.get(claimRef);
        if (!cSnap.exists && reward > 0) {
          const userSnap = await tx.get(userRef);
          if (!userSnap.exists) throw new Error('User পাওয়া যায়নি');
          const d = userSnap.data();
          tx.update(userRef, {
            balance: (Number(d.balance) || 0) + reward,
            totalEarned: (Number(d.totalEarned) || 0) + reward,
          });
          tx.set(db.collection('users', uid, 'transactions').doc(`pr_${ts}_${rnd}`), {
            amount: reward, type: 'task_reward', note: `টাস্ক: ${p.taskName || p.taskSlug} (submission approved)`, createdAt: now,
          });
          tx.set(claimRef, {
            reward, taskId: p.taskSlug, claimedOn: p.day, source: 'submission', createdAt: now,
          });
        }
        tx.update(proofRef, upd);
        tx.update(db.collection('users', uid, 'proofs').doc(proofId), upd);
      } else {
        const upd = { status: 'rejected', note, reviewedAt: now, rejectedAt: now, rejectedBy: admin.uid };
        tx.update(proofRef, upd);
        tx.update(db.collection('users', uid, 'proofs').doc(proofId), upd);
      }
    });
  } catch (err) {
    return fail(res, 409, err.message || 'Operation fail হয়েছে');
  }
  return ok(res, { action });
}
