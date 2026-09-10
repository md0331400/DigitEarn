/* POST /api/user/register — referral-সহ রেজিস্ট্রেশন (server-side trusted).
   Auth user client-এ তৈরি হয়; user doc + bonus + referral credit সম্পূর্ণ server-side atomic। */
import { getDb } from '../../lib/firebase-admin.js';
import { cors, fail, ok, readBody, verifyUser, isNonEmptyStr, isMobile, isEmail } from '../../lib/http.js';
import { FieldValue } from 'firebase-admin/firestore';

export default async function handler(req, res) {
  if (cors(req, res)) return;
  if (req.method !== 'POST') return fail(res, 405, 'Method Not Allowed');
  const user = await verifyUser(req);
  if (!user) return fail(res, 401, 'Login required');
  const body = await readBody(req);

  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const mobile = String(body.mobile || '').trim();
  const email = String(body.email || '').trim();
  const refCode = String(body.refCode || '').trim();

  if (name.length < 3 || name.length > 50) return fail(res, 400, 'সঠিক পুরো নাম লিখুন');
  if (!isMobile(mobile)) return fail(res, 400, 'সঠিক বাংলাদেশি মোবাইল নম্বর দিন (01XXXXXXXXX)');
  if (!isEmail(email)) return fail(res, 400, 'সঠিক ইমেইল ঠিকানা লিখুন');
  if (!/^[A-Za-z0-9]{4,20}$/.test(refCode)) return fail(res, 400, 'সঠিক referral code দিন');

  const db = getDb();
  const uid = user.uid;
  const userRef = db.collection('users').doc(uid);

  const existing = await userRef.get();
  if (existing.exists) return fail(res, 409, 'আপনি ইতিমধ্যে register হয়েছেন');

  // referral code — server-side validation (client-এর কথা বিশ্বাস নয়)
  const refSnap = await db.collection('refs').doc(refCode).get();
  if (!refSnap.exists) return fail(res, 400, 'রেফারেল কোডটি সঠিক নয় — আবার চেষ্টা করুন');
  const refBy = refSnap.data().uid;
  if (refBy === uid) return fail(res, 400, 'নিজের রেফারেল কোড ব্যবহার করা যাবে না');

  // trusted amounts — settings থেকে (client-এর বোঝা amount নষ্ট হয়ে যায়)
  const sSnap = await db.collection('settings').doc('site').get();
  const settings = sSnap.exists ? sSnap.data() : {};
  const regBonus = Math.max(0, Math.min(300, Number(settings.registerBonus) || 0));
  const refBonus = Math.max(0, Math.min(300, Number(settings.referralBonus) || 0));

  // unique new ref code
  let newRefCode;
  do {
    newRefCode = String(Math.floor(10000000 + Math.random() * 90000000));
  } while ((await db.collection('refs').doc(newRefCode).get()).exists);

  const now = FieldValue.serverTimestamp();
  const ts = Date.now();
  const rnd = Math.random().toString(36).slice(2, 8);
  await db.runTransaction(async tx => {
    tx.set(userRef, {
      name, mobile, email,
      refCode: newRefCode, refBy,
      balance: regBonus, totalEarned: regBonus,
      isActive: false, welcomeShown: false, activationBonusGiven: false,
      createdAt: now, lastLogin: now,
    });
    tx.set(db.collection('refs').doc(newRefCode), { uid });
    if (regBonus > 0) {
      tx.set(db.collection('users').doc(uid).collection('transactions').doc(`r_${ts}_${rnd}`), {
        amount: regBonus, type: 'register_bonus', note: 'রেজিস্ট্রেশন বোনাস', createdAt: now,
      });
    }
    if (refBy) {
      const refRef = db.collection('users').doc(refBy);
      const rSnap = await tx.get(refRef);
      if (rSnap.exists) {
        if (refBonus > 0) {
          tx.update(refRef, {
            balance: (Number(rSnap.data().balance) || 0) + refBonus,
            totalEarned: (Number(rSnap.data().totalEarned) || 0) + refBonus,
          });
          tx.set(db.collection('users').doc(refBy).collection('transactions').doc(`ref_${ts}_${rnd}`), {
            amount: refBonus, type: 'referral_bonus', note: `নতুন রেফারেল: ${name}`, uid, refBy, createdAt: now,
          });
        }
        tx.set(db.collection('users').doc(refBy).collection('team').doc(uid), {
          refBy, name, refCode: newRefCode, isActive: false, createdAt: now,
        });
      }
    }
  });

  return ok(res, { uid, regBonus });
}
