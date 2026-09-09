/* POST /api/account/activate — trusted activation (bonus exactly once, server-side amount). */
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
  const sSnap = await db.collection('settings').doc('site').get();
  const settings = sSnap.exists ? sSnap.data() : {};
  const bonus = Math.max(0, Math.min(300, Number(settings.activationBonus) || 0));
  const now = FieldValue.serverTimestamp();
  const ts = Date.now();
  const rnd = Math.random().toString(36).slice(2, 8);

  try {
    let bonusGiven = false;
    await db.runTransaction(async tx => {
      const userSnap = await tx.get(userRef);
      if (!userSnap.exists) throw new Error('আপনার প্রোফাইল পাওয়া যায়নি');
      const d = userSnap.data();
      if (d.isActive) throw new Error('একাউন্টটি ইতিমধ্যে অ্যাক্টিভ আছে');
      tx.update(userRef, { isActive: true, lastLogin: now });
      if (bonus > 0 && !d.activationBonusGiven) {
        bonusGiven = true;
        tx.update(userRef, {
          balance: (Number(d.balance) || 0) + bonus,
          totalEarned: (Number(d.totalEarned) || 0) + bonus,
          activationBonusGiven: true,
        });
        tx.set(db.collection('users', uid, 'transactions').doc(`a_${ts}_${rnd}`), {
          amount: bonus, type: 'activation_bonus', note: 'একাউন্ট অ্যাক্টিভেশন বোনাস', createdAt: now,
        });
      }
    });
  } catch (err) {
    return fail(res, 409, err.message || 'Operation fail হয়েছে');
  }

  return ok(res, { bonusGiven });
}
