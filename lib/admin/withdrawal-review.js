/* POST /api/admin/withdrawal-review — admin withdrawal approve(paid)/reject(refund) (trusted, atomic).
   - approve: status=paid (balance আগে থেকেই deducted — আবার কিছু subtract হয় না)
   - reject:  status=rejected + amount user-এর balance-এ ফেরত (atomic, transaction record সহ)
   - এক withdrawal একবারই resolve হয় (double-click/parallel — মাত্র একটা request সফল) */
import { getDb } from '../firebase-admin.js';
import { fail, ok, readBody, requireAdmin, cors } from '../http.js';
import { FieldValue } from 'firebase-admin/firestore';

export default async function handler(req, res) {
  if (cors(req, res)) return;
  if (req.method !== 'POST') return fail(res, 405, 'Method Not Allowed');
  const admin = await requireAdmin(req);
  if (!admin || !admin.isAdmin) return fail(res, 403, 'Admin access required');

  const body = await readBody(req);
  const id = String(body.id || '').slice(0, 80);
  const uid = String(body.userId || '').slice(0, 128);
  const action = String(body.action || '');
  const note = typeof body.note === 'string' ? body.note.trim().slice(0, 200) : '';
  if (!id) return fail(res, 400, 'Invalid withdrawal id');
  if (!['paid', 'rejected'].includes(action)) return fail(res, 400, 'Invalid action');

  const db = getDb();
  // user-detail থেকে (userId সহ) অথবা top-level queue mirror থেকে
  const userRefPath = uid ? db.collection('users', uid, 'withdrawals').doc(id) : null;
  const topRef = db.collection('withdrawals').doc(id);
  const now = FieldValue.serverTimestamp();
  const ts = Date.now();
  const rnd = Math.random().toString(36).slice(2, 8);

  try {
    await db.runTransaction(async tx => {
      // কোন copy-তে doc পাওয়া গেল সেটাই "main"
      let mainRef = null;
      let resolvedUid = uid;
      if (userRefPath) {
        const s1 = await tx.get(userRefPath);
        if (s1.exists) mainRef = userRefPath;
      }
      if (!mainRef) {
        const s2 = await tx.get(topRef);
        if (s2.exists) { mainRef = topRef; if (!resolvedUid) resolvedUid = s2.data().userId; }
      }
      if (!mainRef) throw new Error('Withdrawal পাওয়া যায়নি');
      const d = (mainRef === userRefPath ? await tx.get(userRefPath) : await tx.get(topRef)).data();
      if (d.status !== 'pending') throw new Error('এই withdrawal-এর status আগেই পরিবর্তন হয়েছে');
      if (!resolvedUid) throw new Error('Withdrawal-এর user info পাওয়া যায়নি');
      const amount = Number(d.amount) || 0;
      const userRef = db.collection('users').doc(resolvedUid);

      const upd = action === 'paid'
        ? { status: 'paid', note: '', processedAt: now, processedBy: admin.uid }
        : { status: 'rejected', note, processedAt: now, processedBy: admin.uid };

      if (action === 'rejected' && amount > 0) {
        // reject → money ফেরত (atomic, double-refund অসম্ভব: status check একই transaction-এ)
        const uSnap = await tx.get(userRef);
        if (!uSnap.exists) throw new Error('User পাওয়া যায়নি');
        const u = uSnap.data();
        tx.update(userRef, { balance: (Number(u.balance) || 0) + amount });
        tx.set(db.collection('users', resolvedUid, 'transactions').doc(`wr_${ts}_${rnd}`), {
          amount, type: 'withdraw_refund',
          note: 'উইথড্র বাতিল — টাকা ব্যালেন্সে ফেরত', createdAt: now,
        });
      }

      // সব existing copy update (user subcollection + top-level mirror) —
      // queue থেকে (userId ছাড়া) resolve হলেও user-এর copy sync থাকবে
      const copies = [db.collection('users', resolvedUid, 'withdrawals').doc(id), topRef];
      for (const c of copies) {
        const c2 = await tx.get(c);
        if (c2.exists) tx.update(c, upd);
      }
    });
  } catch (err) {
    return fail(res, 409, err.message || 'Operation fail হয়েছে');
  }
  return ok(res, { id, action });
}
