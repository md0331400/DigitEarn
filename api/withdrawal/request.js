/* POST /api/withdrawal/request — trusted withdrawal.
   - balance/amount server-side check (client-এর balance trust না)
   - atomic: deduct + record এক transaction-এ (balance কখনো negative হতে পারে না)
   - duplicate pending guard (pre-check + balance retry) */
import { getDb } from '../../lib/firebase-admin.js';
import { cors, fail, ok, readBody, authenticate, authReject, AUTH_OK, isPosFinite, isMobile, ApiError, opFail } from '../../lib/http.js';
import { FieldValue } from 'firebase-admin/firestore';

const METHODS = ['bKash', 'Nagad', 'Rocket'];

export default async function handler(req, res) {
  if (cors(req, res)) return;
  if (req.method !== 'POST') return fail(res, 405, 'Method Not Allowed');
  const a = await authenticate(req);
  if (a.state !== AUTH_OK) return authReject(res, a);
  const user = { uid: a.uid, email: a.email };
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

  const userRef = db.collection('users').doc(uid);
  const wdCol = db.collection('users').doc(uid).collection('withdrawals');
  /* duplicate pending guard — ⚠️ transaction-এর ভেতরে নেওয়া হয়েছে (আগে বাইরে ছিল),
     তাই দুটো concurrent request দুটোই "pending নেই" দেখে দুটো withdrawal বানাতে পারত */
  const now = FieldValue.serverTimestamp();
  const ts = Date.now();
  const rnd = Math.random().toString(36).slice(2, 8);
  const wdId = `w_${ts}_${rnd}`;
  try {
    await db.runTransaction(async tx => {
      const userSnap = await tx.get(userRef);
      if (!userSnap.exists) throw new ApiError(409, 'আপনার প্রোফাইল পাওয়া যায়নি');
      const d = userSnap.data();
      if (!d.isActive) throw new ApiError(409, 'উইথড্র করতে একাউন্ট অ্যাক্টিভ করুন');
      if (amount > (Number(d.balance) || 0)) throw new ApiError(409, 'পর্যাপ্ত ব্যালেন্স নেই');
      const pendingQ = await tx.get(wdCol.where('status', '==', 'pending').limit(1));
      if (!pendingQ.empty) throw new ApiError(409, 'আপনার একটা pending withdrawal request আছে — আগে সেটা resolve হোক');
      tx.set(wdCol.doc(wdId), {
        uid, name, amount, method, accountNumber,
        status: 'pending', note: '',
        createdAt: now, processedAt: null,
      });
      // admin review queue (top-level mirror — deposit/proof-এর মতো pattern)
      tx.set(db.collection('withdrawals').doc(wdId), {
        userId: uid, name, amount, method, accountNumber,
        status: 'pending', note: '',
        createdAt: now, processedAt: null,
      });
      tx.update(userRef, { balance: (Number(d.balance) || 0) - amount });
      tx.set(db.collection('users').doc(uid).collection('transactions').doc(`wd_${ts}_${rnd}`), {
        amount: -amount, type: 'withdraw', note: `উইথড্র রিকোয়েস্ট (${method} • ${accountNumber})`, createdAt: now,
      });
    });
  } catch (err) {
    return opFail(res, err);
  }

  return ok(res, { id: wdId });
}
