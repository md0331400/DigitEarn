/* POST /api/admin/deposit-review — admin deposit approve/reject (trusted, atomic).
   approve: account active + activation bonus exactly once (server-side amount)। এক deposit একবারই approve। */
import { getDb } from '../firebase-admin.js';
import { fail, ok, readBody, requireAdmin, cors } from '../http.js';
import { FieldValue } from 'firebase-admin/firestore';

export default async function handler(req, res) {
  if (cors(req, res)) return;
  if (req.method !== 'POST') return fail(res, 405, 'Method Not Allowed');
  const admin = await requireAdmin(req);
  if (!admin || !admin.isAdmin) return fail(res, 403, 'Admin access required');

  const body = await readBody(req);
  const depositId = String(body.depositId || '').slice(0, 80);
  const action = String(body.action || '');
  const note = typeof body.note === 'string' ? body.note.trim().slice(0, 200) : '';
  if (!depositId) return fail(res, 400, 'Invalid depositId');
  if (!['approve', 'reject'].includes(action)) return fail(res, 400, 'Invalid action');

  const db = getDb();
  const depRef = db.collection('deposits').doc(depositId);
  const now = FieldValue.serverTimestamp();
  const ts = Date.now();
  const rnd = Math.random().toString(36).slice(2, 8);
  try {
    await db.runTransaction(async tx => {
      const dSnap = await tx.get(depRef);
      if (!dSnap.exists) throw new Error('Deposit পাওয়া যায়নি');
      const d = dSnap.data();
      if (d.status !== 'pending') throw new Error('এই deposit-এর status আগেই পরিবর্তন হয়েছে');
      const uid = d.userId;
      const userRef = db.collection('users').doc(uid);
      if (action === 'approve') {
        const userSnap = await tx.get(userRef);
        if (!userSnap.exists) throw new Error('User পাওয়া যায়নি');
        const u = userSnap.data();
        const sSnap = await tx.get(db.collection('settings').doc('site'));
        const settings = sSnap.exists ? sSnap.data() : {};
        const bonus = Math.max(0, Math.min(300, Number(settings.activationBonus) || 0));
        const alreadyGiven = !!u.activationBonusGiven;
        tx.update(userRef, {
          isActive: true,
          activationBonusGiven: true,
          balance: alreadyGiven ? (Number(u.balance) || 0) : (Number(u.balance) || 0) + bonus,
          totalEarned: alreadyGiven ? (Number(u.totalEarned) || 0) : (Number(u.totalEarned) || 0) + bonus,
        });
        if (!alreadyGiven && bonus > 0) {
          tx.set(db.collection('users', uid, 'transactions').doc(`ad_${ts}_${rnd}`), {
            amount: bonus, type: 'activation_bonus', note: 'একাউন্ট অ্যাক্টিভেশন বোনাস', createdAt: now,
          });
        }
        const upd = { status: 'approved', note: '', reviewedAt: now };
        tx.update(depRef, upd);
        tx.update(db.collection('users', uid, 'deposits').doc(depositId), upd);
      } else {
        const upd = { status: 'rejected', note, reviewedAt: now };
        tx.update(depRef, upd);
        tx.update(db.collection('users', uid, 'deposits').doc(depositId), upd);
      }
    });
  } catch (err) {
    return fail(res, 409, err.message || 'Operation fail হয়েছে');
  }
  return ok(res, { action });
}
