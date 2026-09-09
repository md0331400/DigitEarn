/* POST /api/user/check — signup-এর আগের availability check (email/mobile already registered?
   + refCode valid কিনে, valid হলে referrer-এর নাম — display-এর জন্য).
   Anonymous (token লাগে না) — response-এ শুধু boolean + নাম, কোনো sensitive data না।
   Actual account creation শুধু /api/user/register-এ (verified token + valid ref code)। */
import { getDb } from '../../lib/firebase-admin.js';
import { fail, ok, readBody, isEmail, isMobile } from '../../lib/http.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return fail(res, 405, 'Method Not Allowed');
  const body = await readBody(req);
  const email = String(body.email || '').trim();
  const mobile = String(body.mobile || '').trim();
  const refCode = String(body.refCode || '').trim();

  const result = {
    emailTaken: false,
    mobileTaken: false,
    emailValid: isEmail(email),
    mobileValid: isMobile(mobile),
    refValid: false,
    refName: '',
  };
  if (!email && !mobile && !refCode) return ok(res, result);

  try {
    const db = getDb();
    if (email && isEmail(email)) {
      // case-insensitive: Firebase Auth-ও case-insensitive treat করে
      const e1 = await db.collection('users').where('email', '==', email).limit(1).get();
      result.emailTaken = !e1.empty;
      const lower = email.toLowerCase();
      if (!result.emailTaken && lower !== email) {
        const e2 = await db.collection('users').where('email', '==', lower).limit(1).get();
        result.emailTaken = !e2.empty;
      }
    }
    if (mobile && isMobile(mobile)) {
      const m = await db.collection('users').where('mobile', '==', mobile).limit(1).get();
      result.mobileTaken = !m.empty;
    }
    // ref code — আসল user-এর code কিনে (refs/{code} = { uid }); valid হলে referrer-এর নাম
    if (refCode && /^[A-Za-z0-9]{4,20}$/.test(refCode)) {
      const r = await db.collection('refs').doc(refCode).get();
      const rd = r.exists ? r.data() : null;
      if (rd && typeof rd.uid === 'string' && rd.uid) {
        result.refValid = true;
        const u = await db.collection('users').doc(rd.uid).get();
        if (u.exists && u.data() && u.data().name) result.refName = String(u.data().name).trim();
      }
    }
  } catch (err) {
    return fail(res, 500, 'Server setup সমস্যা: ' + (err && err.message ? err.message : String(err)));
  }
  return ok(res, result);
}
