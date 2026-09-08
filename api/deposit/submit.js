/* POST /api/deposit/submit — one-time activation fee deposit request (amount server-এর, status=pending).
   Approve শুধু admin API-তে। */
import { getDb } from '../_lib/firebase-admin.js';
import { fail, ok, readBody, verifyUser, isMobile } from '../_lib/http.js';
import { FieldValue } from 'firebase-admin/firestore';

const METHODS = ['bkash', 'nagad', 'rocket'];

export default async function handler(req, res) {
  if (req.method !== 'POST') return fail(res, 405, 'Method Not Allowed');
  const user = await verifyUser(req);
  if (!user) return fail(res, 401, 'Login required');
  const body = await readBody(req);

  const method = String(body.method || '').toLowerCase();
  if (!METHODS.includes(method)) return fail(res, 400, 'পেমেন্ট মেথড নির্বাচন করুন');
  const trxId = String(body.trxId || '').trim();
  if (trxId.length < 6 || trxId.length > 30) return fail(res, 400, 'Transaction ID (TrxID) সঠিকভাবে লিখুন');
  const senderNumber = String(body.senderNumber || '').replace(/\D/g, '');
  if (!isMobile(senderNumber)) return fail(res, 400, 'সঠিক Sender Number দিন (01XXXXXXXXX)');

  const db = getDb();
  const uid = user.uid;
  const sSnap = await db.collection('settings').doc('site').get();
  const settings = sSnap.exists ? sSnap.data() : {};
  const amount = Math.max(0, Number(settings.activationFee) || 0); // amount server-এর — client-এর amount ignore

  const userRef = db.collection('users').doc(uid);
  const pendingQ = await db.collection('users', uid, 'deposits').where('status', '==', 'pending').limit(1).get();
  if (!pendingQ.empty) return fail(res, 409, 'আপনার একটা deposit ইতিমধ্যে review-এ আছে — অপেক্ষায় থাকুন');

  const now = FieldValue.serverTimestamp();
  const ts = Date.now();
  const rnd = Math.random().toString(36).slice(2, 8);
  const did = `d_${ts}_${rnd}`;
  const depositData = {
    method, trxId, senderNumber, amount,
    status: 'pending', note: '', createdAt: now, reviewedAt: null,
  };
  try {
    await db.runTransaction(async tx => {
      const userSnap = await tx.get(userRef);
      if (!userSnap.exists()) throw new Error('আপনার প্রোফাইল পাওয়া যায়নি');
      if (userSnap.data().isActive) throw new Error('আপনার একাউন্ট ইতিমধ্যে অ্যাক্টিভ');
      tx.set(db.collection('users', uid, 'deposits').doc(did), depositData);
      // admin review queue (top-level mirror)
      tx.set(db.collection('deposits').doc(did), { ...depositData, userId: uid });
    });
  } catch (err) {
    return fail(res, 409, err.message || 'Operation fail হয়েছে');
  }

  return ok(res, { id: did, amount });
}
