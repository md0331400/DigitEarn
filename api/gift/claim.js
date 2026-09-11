/* POST /api/gift/claim — trusted gift code reward (atomic, server-side code+amount). */
import { getDb } from '../../lib/firebase-admin.js';
import { cors, fail, ok, readBody, authenticate, authReject, AUTH_OK, ApiError, opFail } from '../../lib/http.js';
import { FieldValue } from 'firebase-admin/firestore';

/* Day key = UTC (client-এর todayStr()-ও এখন UTC — src/core/api.js)।
   এলোমেলো container TZ / browser local date হলে client আর server-এর "আজকের"
   key আলাদা হয়ে daily-limit + "আজকের জমা" লিস্ট ভুল দেখাতো। */
function today() {
  return new Date().toISOString().slice(0, 10);
}

export default async function handler(req, res) {
  if (cors(req, res)) return;
  if (req.method !== 'POST') return fail(res, 405, 'Method Not Allowed');
  const a = await authenticate(req);
  if (a.state !== AUTH_OK) return authReject(res, a);
  const user = { uid: a.uid, email: a.email };
  const body = await readBody(req);
  const code = String(body.code || '').trim();
  if (code.length < 3 || code.length > 30) return fail(res, 400, 'কোডটি সঠিক নয়');

  const db = getDb();
  const uid = user.uid;
  const sSnap = await db.collection('settings').doc('site').get();
  const settings = sSnap.exists ? sSnap.data() : {};
  /* SECURITY: আসল কোড settings/secret-এ (rules-এ সম্পূর্ণ read-blocked)।
     settings/site public read, তাই সেখানে কোড রাখলে যে কেউ browser console
     থেকে আজকের গিফট কোড পড়ে নিতে পারত। Legacy fallback রাখা হয়েছে যাতে
     পুরনো deploy-এ কোড না থাকলেও ভাঙে না — admin panel secret doc-এ লেখে। */
  const secSnap = await db.collection('settings').doc('secret').get();
  const secret = secSnap.exists ? secSnap.data() : {};
  const activeCode = String(secret.giftCode ?? settings.giftCode ?? '').trim();
  if (!activeCode || code.toLowerCase() !== activeCode.toLowerCase()) {
    return fail(res, 400, 'কোডটি সঠিক নয় — কোড আমাদের টেলিগ্রাম চ্যানেলে দেওয়া হয়');
  }
  const reward = Math.max(0, Math.min(300, Number(settings.giftReward) || 0));
  if (reward <= 0) return fail(res, 400, 'গিফট বোনাস সেট করা নেই');

  const claimRef = db.collection('users').doc(uid).collection('giftClaims').doc(today());
  const userRef = db.collection('users').doc(uid);
  const now = FieldValue.serverTimestamp();
  const ts = Date.now();
  const rnd = Math.random().toString(36).slice(2, 8);

  try {
    await db.runTransaction(async tx => {
      const claimSnap = await tx.get(claimRef);
      if (claimSnap.exists) throw new ApiError(409, 'আজকের গিফট বোনাস ইতিমধ্যে নিয়েছেন');
      const userSnap = await tx.get(userRef);
      if (!userSnap.exists) throw new ApiError(409, 'আপনার প্রোফাইল পাওয়া যায়নি');
      if (!userSnap.data().isActive) throw new ApiError(409, 'বোনাস পেতে আগে একাউন্ট অ্যাক্টিভ করুন');
      const d = userSnap.data();
      tx.set(claimRef, { code, reward, claimedOn: today(), createdAt: now });
      tx.update(userRef, { balance: (Number(d.balance) || 0) + reward, totalEarned: (Number(d.totalEarned) || 0) + reward });
      tx.set(db.collection('users').doc(uid).collection('transactions').doc(`g_${ts}_${rnd}`), {
        amount: reward, type: 'gift_bonus', note: 'গিফট কোড বোনাস', createdAt: now,
      });
    });
  } catch (err) {
    return opFail(res, err);
  }

  return ok(res, { reward });
}
