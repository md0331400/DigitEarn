/* POST /api/withdrawal/request — trusted withdrawal.
   - balance/amount server-side check (client-এর balance trust না)
   - atomic: deduct + record এক transaction-এ (balance কখনো negative হতে পারে না)
   - duplicate pending guard (pre-check + balance retry) */
import { getDb } from '../_lib/firebase-admin.js';
import { fail, ok, readBody, verifyUser, isPosFinite, isMobile } from '../_lib/http.js';
import { FieldValue } from 'firebase-admin/firestore';

const METHODS = ['bKash', 'Nagad', 'Rocket'];

export default async function handler(req, res) {
  if (req.method !== 'POST') return fail(res, 405, 'Method Not Allowed');
  const user = await verifyUser(req);
  if (!user) return fail(res, 401, 'Login required');
  const body = await readBody(req);

  const amount = Number(body.amount);
  if (!isPosFinite(amount)) return fail(res, 400, 'সঠিক টাকার পরিমাণ লিখুন');
  if (amount > 100000) return fail(res, 400, 'Amount অনেক বেশি');
  const method = String(body.method || '');
  if (!METHODS.includes(method)) return fail(res, 400, 'পেমেন্ট মেথড নির্বাচন করুন');
  const accountNumber = String(body.accountNumber || '').trim();
  if (!isMobile(accountNumber)) return fail(res, 400, 'সঠিক মোবাইল নম্বর দিন (01XXXXXXXXX)');
  const name = typeof body.name === 'string' ? body.name.trim().slice(0, 50) : '';

  const db = getDb();
  const uid = user.uid;
  const sSnap = await db.collection('settings').doc('site').get();
  const settings = sSnap.exists ? sSnap.data() : {};
  const minW = Math.max(0, Number(settings.minWithdraw) || 0);
  if (amount < minW) return fail(res, 400, `ন্যূনতম উইথড্র পরিমাণ ৳${minW}`);

  // duplicate pending guard
  const pendingQ = await db.collection('users', uid, 'withdrawals').where('status', '==', 'pending').limit(1).get();
  if (!pendingQ.empty) return fail(res, 409, 'আপনার একটা pending withdrawal request আছে — আগে সেটা resolve হোক');

  const userRef = db.collection('users').doc(uid);
  const now = FieldValue.serverTimestamp();
  const ts = Date.now();
  const rnd = Math.random().toString(36).slice(2, 8);
  const wdId = `w_${ts}_${rnd}`;
  try {
    await db.runTransaction(async tx => {
      const userSnap = await tx.get(userRef);
      if (!userSnap.exists) throw new Error('আপনার প্রোফাইল পাওয়া যায়নি');
      const d = userSnap.data();
      if (!d.isActive) throw new Error('উইথড্র করতে একাউন্ট অ্যাক্টিভ করুন');
      if (amount > (Number(d.balance) || 0)) throw new Error('পর্যাপ্ত ব্যালেন্স নেই');
      tx.set(db.collection('users', uid, 'withdrawals').doc(wdId), {
        uid, name, amount, method, accountNumber,
        status: 'pending', note: '',
        createdAt: now, processedAt: null,
      });
      tx.update(userRef, { balance: (Number(d.balance) || 0) - amount });
      tx.set(db.collection('users', uid, 'transactions').doc(`wd_${ts}_${rnd}`), {
        amount: -amount, type: 'withdraw', note: `উইথড্র রিকোয়েস্ট (${method} • ${accountNumber})`, createdAt: now,
      });
    });
  } catch (err) {
    return fail(res, 409, err.message || 'Operation fail হয়েছে');
  }

  return ok(res, { id: wdId });
}
