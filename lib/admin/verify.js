/* POST /api/admin/verify — token verify + admin check (server-side, admins/{email} doc).
   সবসময় 200 — email enumeration রোধে isAdmin flag-এই দেখানো হয়। */
import { requireAdmin, authReject, AUTH_OK, cors } from '../http.js';
import { ok } from '../http.js';

export default async function handler(req, res) {
  if (cors(req, res)) return;
  if (req.method !== 'POST') return ok(res, { isAdmin: false });
  const admin = await requireAdmin(req);
  /* আগে `authenticated: !!admin` — requireAdmin error object ফেরালেও true হতো।
     এখন state দেখে সত্যিটা বলে, আর panel-এর health-banner এটা ব্যবহার করে না (200 থাকে)। */
  if (admin.state !== AUTH_OK) return ok(res, { isAdmin: false, authenticated: false, authState: admin.state, authError: admin.error || admin.code || '' });
  return ok(res, { isAdmin: !!admin.isAdmin, authenticated: true });
}
