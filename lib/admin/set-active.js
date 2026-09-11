/* POST /api/admin/set-active — manual activate/inactivate (admin only, server-side). */
import { getDb } from '../firebase-admin.js';
import { fail, ok, readBody, requireAdmin, authenticate, authReject, AUTH_OK, cors, ApiError, opFail } from '../http.js';
import { FieldValue } from 'firebase-admin/firestore';

export default async function handler(req, res) {
  if (cors(req, res)) return;
  if (req.method !== 'POST') return fail(res, 405, 'Method Not Allowed');
  const admin = await requireAdmin(req);
  if (admin.state !== AUTH_OK) return authReject(res, admin);   /* config/expiry = ভুল বার্তা নয় */
  if (!admin.isAdmin) return fail(res, 403, 'Admin access required');

  const body = await readBody(req);
  const uid = String(body.uid || '').slice(0, 128);
  const active = !!body.active;
  if (!uid) return fail(res, 400, 'Invalid uid');

  const db = getDb();
  const userRef = db.collection('users').doc(uid);
  const snap = await userRef.get();
  if (!snap.exists) return fail(res, 404, 'User পাওয়া যায়নি');
  try {
    await userRef.update({ isActive: active, lastLogin: FieldValue.serverTimestamp() });
  } catch (err) {
    return opFail(res, err, 'অবস্থা বদলানো যায়নি — আবার চেষ্টা করুন');
  }
  return ok(res, { uid, active });
}
