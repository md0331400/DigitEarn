/* POST /api/target/claim — trusted referral target bonus (atomic, server-side tier+amount).
   Client শুধু { tier } পাঠায় — bonus settings.targetTiers থেকে server নেয়। */
import { getDb } from '../../lib/firebase-admin.js';
import { cors, fail, ok, readBody, verifyUser } from '../../lib/http.js';
import { FieldValue } from 'firebase-admin/firestore';

export default async function handler(req, res) {
  if (cors(req, res)) return;
  if (req.method !== 'POST') return fail(res, 405, 'Method Not Allowed');
  const user = await verifyUser(req);
  if (!user) return fail(res, 401, 'Login required');
  const body = await readBody(req);
  const tier = Number(body.tier);
  if (!Number.isInteger(tier) || tier <= 0 || tier > 1000) return fail(res, 400, 'Invalid tier');

  const db = getDb();
  const uid = user.uid;
  const sSnap = await db.collection('settings').doc('site').get();
  const settings = sSnap.exists ? sSnap.data() : {};
  const tiers = Array.isArray(settings.targetTiers) ? settings.targetTiers : [];
  const found = tiers.find(t => Number(t.tier) === tier);
  if (!found) return fail(res, 400, 'এই টার্গেট নেই');
  const bonus = Math.max(0, Math.min(5000, Number(found.bonus) || 0));
  if (bonus <= 0) return fail(res, 400, 'টার্গেট বোনাস সেট করা নেই');

  // direct referral count (server-side)
  const teamSnap = await db.collection('users').doc(uid).collection('team').limit(1000).get();
  if (teamSnap.size < tier) return fail(res, 400, 'এই টার্গেটের রেফারেল পূরণ হয়নি');

  const claimRef = db.collection('users').doc(uid).collection('targetClaims').doc(String(tier));
  const userRef = db.collection('users').doc(uid);
  const now = FieldValue.serverTimestamp();
  const ts = Date.now();
  const rnd = Math.random().toString(36).slice(2, 8);

  try {
    await db.runTransaction(async tx => {
      const claimSnap = await tx.get(claimRef);
      if (claimSnap.exists) throw new Error('এই টার্গেটের বোনাস ইতিমধ্যে নিয়েছেন');
      const userSnap = await tx.get(userRef);
      if (!userSnap.exists) throw new Error('আপনার প্রোফাইল পাওয়া যায়নি');
      if (!userSnap.data().isActive) throw new Error('বোনাস পেতে আগে একাউন্ট অ্যাক্টিভ করুন');
      const d = userSnap.data();
      tx.set(claimRef, { tier, bonus, createdAt: now });
      tx.update(userRef, { balance: (Number(d.balance) || 0) + bonus, totalEarned: (Number(d.totalEarned) || 0) + bonus });
      tx.set(db.collection('users').doc(uid).collection('transactions').doc(`tg_${ts}_${rnd}`), {
        amount: bonus, type: 'target_bonus', note: `টার্গেট ${tier} রেফারেল বোনাস`, createdAt: now,
      });
    });
  } catch (err) {
    return fail(res, 409, err.message || 'Operation fail হয়েছে');
  }

  return ok(res, { bonus });
}
