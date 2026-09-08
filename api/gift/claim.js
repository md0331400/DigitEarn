/* POST /api/gift/claim — trusted gift code reward (atomic, server-side code+amount). */
import { getDb } from '../_lib/firebase-admin.js';
import { fail, ok, readBody, verifyUser } from '../_lib/http.js';
import { FieldValue } from 'firebase-admin/firestore';

function today() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return fail(res, 405, 'Method Not Allowed');
  const user = await verifyUser(req);
  if (!user) return fail(res, 401, 'Login required');
  const body = await readBody(req);
  const code = String(body.code || '').trim();
  if (code.length < 3 || code.length > 30) return fail(res, 400, 'কোডটি সঠিক নয়');

  const db = getDb();
  const uid = user.uid;
  const sSnap = await db.collection('settings').doc('site').get();
  const settings = sSnap.exists ? sSnap.data() : {};
  const activeCode = String(settings.giftCode || '').trim();
  if (!activeCode || code.toLowerCase() !== activeCode.toLowerCase()) {
    return fail(res, 400, 'কোডটি সঠিক নয় — কোড আমাদের টেলিগ্রাম চ্যানেলে দেওয়া হয়');
  }
  const reward = Math.max(0, Math.min(300, Number(settings.giftReward) || 0));
  if (reward <= 0) return fail(res, 400, 'গিফট বোনাস সেট করা নেই');

  const claimRef = db.collection('users', uid, 'giftClaims').doc(today());
  const userRef = db.collection('users').doc(uid);
  const now = FieldValue.serverTimestamp();
  const ts = Date.now();
  const rnd = Math.random().toString(36).slice(2, 8);

  try {
    await db.runTransaction(async tx => {
      const claimSnap = await tx.get(claimRef);
      if (claimSnap.exists) throw new Error('আজকের গিফট বোনাস ইতিমধ্যে নিয়েছেন');
      const userSnap = await tx.get(userRef);
      if (!userSnap.exists) throw new Error('আপনার প্রোফাইল পাওয়া যায়নি');
      if (!userSnap.data().isActive) throw new Error('বোনাস পেতে আগে একাউন্ট অ্যাক্টিভ করুন');
      const d = userSnap.data();
      tx.set(claimRef, { code, reward, claimedOn: today(), createdAt: now });
      tx.update(userRef, { balance: (Number(d.balance) || 0) + reward, totalEarned: (Number(d.totalEarned) || 0) + reward });
      tx.set(db.collection('users', uid, 'transactions').doc(`g_${ts}_${rnd}`), {
        amount: reward, type: 'gift_bonus', note: 'গিফট কোড বোনাস', createdAt: now,
      });
    });
  } catch (err) {
    return fail(res, 409, err.message || 'Operation fail হয়েছে');
  }

  return ok(res, { reward });
}
