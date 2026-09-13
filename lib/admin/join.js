/* POST /api/admin/panel?op=admin-join — "Join admin" (admin panel login screen-এর
   second option)। Auth লাগে না, কিন্তু এটা শুধু **আবেদন** লেখে — কোনো access দেয় না।
   approve হয় Admin Management → Join request list থেকে (Owner/Full Access)।
   password এখানে চাওয়া/রাখা হয় না; approve-এর পর setup link তৈরি হয় (lib/admin/team.js)।
   নতুন Vercel function না — panel.js router-এর op (?op=admin-join)। */
import { getDb } from '../firebase-admin.js';
import { cors, fail, ok, readBody, opFail, isEmail } from '../http.js';
import { createJoinRequest, emailOk } from './team.js';
import { ROLE_FULL, ROLE_POSTER } from '../../src/core/microjobs.js';

const str = (v, max) => String(v === undefined || v === null ? '' : v).trim().slice(0, max);

export default async function handler(req, res) {
  if (cors(req, res)) return;
  if (req.method !== 'POST') return fail(res, 405, 'Method Not Allowed');
  let body = {};
  try { body = await readBody(req); } catch (_) { body = {}; }

  const email = str(body.email, 120).toLowerCase();
  const fullName = str(body.fullName || body.name, 60);
  /* self-service-এ শুধু Full Access / Job Poster চাওয়া যায় — Owner চাইতেই পারবে না */
  const reqRoleRaw = str(body.role, 16).toLowerCase();
  if (reqRoleRaw && !['full', 'fullaccess', 'full access', 'poster', 'jobposter'].includes(reqRoleRaw.replace(/[_-]/g, ' ').trim())) {
    return fail(res, 400, 'Role শুধু "Full Access" বা "Job Poster" হতে পারে');
  }
  const requestedRole = ['full', 'fullaccess'].includes(reqRoleRaw.replace(/[\s_-]/g, '')) ? ROLE_FULL : ROLE_POSTER;

  if (!isEmail(email) || !emailOk(email)) return fail(res, 400, 'Email ঠিক করে লিখুন');
  if (fullName.length < 2) return fail(res, 400, 'নাম লিখুন (কমপক্ষে ২ অক্ষর)');

  try {
    const r = await createJoinRequest({
      db: getDb(), email, fullName, requestedRole, note: str(body.note, 300),
    });
    return ok(res, { ok: true, ...r, message: 'আবেদন পাঠানো হয়েছে — অনুমোদন হলেই email-এ জানানো হবে' });
  } catch (err) {
    return opFail(res, err, 'আবেদন পাঠানো যায়নি');
  }
}
