/* POST /api/user/ensure — profile doc না থাকলে server-side heal (legacy session).
   নতুন user না — বোনাস দেওয়া হয় না (farming-এর রোধে)। */
import { getDb } from '../../lib/firebase-admin.js';
import { fail, ok, verifyUser } from '../../lib/http.js';
import { FieldValue } from 'firebase-admin/firestore';

export default async function handler(req, res) {
  if (req.method !== 'POST') return fail(res, 405, 'Method Not Allowed');
  const user = await verifyUser(req);
  if (!user) return fail(res, 401, 'Login required');
  const db = getDb();
  const uid = user.uid;
  const userRef = db.collection('users').doc(uid);

  const snap = await userRef.get();
  if (snap.exists) return ok(res, { profile: { uid, ...snap.data() } });

  let refCode;
  do {
    refCode = String(Math.floor(10000000 + Math.random() * 90000000));
  } while ((await db.collection('refs').doc(refCode).get()).exists);

  const name = (user.email && user.email.split('@')[0]) || 'User';
  const now = FieldValue.serverTimestamp();
  await db.runTransaction(async tx => {
    tx.set(userRef, {
      name, mobile: '', email: user.email || '',
      refCode, refBy: null,
      balance: 0, totalEarned: 0, isActive: false, welcomeShown: true,
      activationBonusGiven: true, // legacy heal — activation bonus আর দেওয়া হবে না
      createdAt: now, lastLogin: now,
    });
    tx.set(db.collection('refs').doc(refCode), { uid });
  });
  return ok(res, { profile: { uid, name, email: user.email || '', refCode, balance: 0, totalEarned: 0, isActive: false, welcomeShown: true } });
}
