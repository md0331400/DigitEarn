/* POST /api/user/check — signup-এর আগের availability check (email/mobile already registered?).
   Anonymous (token লাগে না) — response-এ শুধু boolean taken/not-taken, কোনো sensitive data না।
   Actual account creation শুধু /api/user/register-এ (verified token + valid ref code)। */
import { getDb } from '../_lib/firebase-admin.js';
import { fail, ok, readBody, isEmail, isMobile } from '../_lib/http.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return fail(res, 405, 'Method Not Allowed');
  const body = await readBody(req);
  const email = String(body.email || '').trim();
  const mobile = String(body.mobile || '').trim();

  const result = {
    emailTaken: false,
    mobileTaken: false,
    emailValid: isEmail(email),
    mobileValid: isMobile(mobile),
  };
  if (!email && !mobile) return ok(res, result);

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
  } catch (_) {
    return fail(res, 500, 'Check করতে পারিনি — আবার চেষ্টা করুন');
  }
  return ok(res, result);
}
