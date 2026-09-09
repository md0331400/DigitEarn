/* POST /api/admin/verify — token verify + admin check (server-side, admins/{email} doc).
   সবসময় 200 — email enumeration রোধে isAdmin flag-এই দেখানো হয়। */
import { requireAdmin } from '../_lib/http.js';
import { ok } from '../_lib/http.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return ok(res, { isAdmin: false });
  const admin = await requireAdmin(req);
  return ok(res, { isAdmin: !!(admin && admin.isAdmin), authenticated: !!admin });
}
