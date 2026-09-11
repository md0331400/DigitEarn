/* POST /api/admin/panel?op=health — deployment-এর auth self-check (Admin panel → Overview → "সিস্টেম চেক")।
   KARON: user "Login required" dekhat, kintu server response e kichu-bujhe jet na —
   token expire naki Vercel-এ FIREBASE_PROJECT_ID/service account onno project-er, dutoi
   ekti 401 chilo. Ekhon lib/http.js authenticate() reason code dey, ar ei op ta
   seigulo ek jaygay dekhay: env vars ache kina, Admin SDK init hoy kina, Firestore
   porhe kina, ar caller-er token-er project vs server-er project (mismatch hole karon seta)।
   Security: kakhono secret value (private key / client email full) firie na — sudhu boolean,
   error code, ar project id. AU endpoint ta ekhon admin-only (verified token + admins/{email}):
   age eta anonymous caller-কেও env presence / Firestore reachability / project id bolত —
   সেটা server configuration সম্পর্কে free reconnaissance।
   "admin-ও যেন diagnose করতে পারে" যখন auth ভাঙা: সেটা আর এই endpoint-এর কাজ না —
   lib/http.js-এর authReject ই 503-এ "token project: X, server project: Y" বলে দেয়,
   আর বাকি কারণ Vercel function log-এ থাকে। */
import { requireAdmin, authReject, AUTH_OK, AUTH_EXPIRED, AUTH_CONFIG, AUTH_INVALID, AUTH_NO_TOKEN, fail, ok, API_VERSION } from '../http.js';

const ENV_NAMES = ['FIREBASE_PROJECT_ID', 'FIREBASE_CLIENT_EMAIL', 'FIREBASE_PRIVATE_KEY'];

/* service account email = "<name>@<project>.iam.gserviceaccount.com" —
   ei project-id ta FIREBASE_PROJECT_ID-er sathe mismele verifyIdToken sob token reject kore। */
function projectFromServiceAccount(email) {
  const m = /@([^.]+)\.iam\.gserviceaccount\.com$/i.exec(String(email || ''));
  return m ? m[1] : '';
}

function privateKeyLooksValid(raw) {
  const v = String(raw || '').replace(/\\n/g, '\n');
  return /-----BEGIN (RSA )?PRIVATE KEY-----/.test(v) && /-----END (RSA )?PRIVATE KEY-----/.test(v);
}

export default async function handler(req, res) {
  const serverProject = process.env.FIREBASE_PROJECT_ID || '';
  const a = await requireAdmin(req);
  if (a.state !== AUTH_OK) return authReject(res, a);
  if (!a.isAdmin) return fail(res, 403, 'Admin access required');
  const env = {};
  for (const n of ENV_NAMES) env[n] = !!(process.env[n] && String(process.env[n]).trim());
  const saProject = projectFromServiceAccount(process.env.FIREBASE_CLIENT_EMAIL);

  const authed = a.state === AUTH_OK;
  const out = {
    ok: false,
    authed,
    /* caller-er token-er kotha (diagnostic) — signed payload decode, verify chara */
    tokenProject: a.tokenProject || a.payload?.aud || '',
    serverProject,
    serviceAccountProject: saProject,
    env,
    privateKeyShape: privateKeyLooksValid(process.env.FIREBASE_PRIVATE_KEY),
    projectMatch: !!(serverProject && saProject && serverProject === saProject),
    authState: a.state,
    authCode: a.code || '',
    /* expired hole koto second age expire hoyece (server clock onujayi) */
    tokenExpiredSecondsAgo: a.tokenExp ? Math.max(0, Math.floor(Date.now() / 1000) - a.tokenExp) : 0,
    firestore: { reachable: false, settingsDoc: false },
    notes: [],
  };

  out.apiVersion = API_VERSION;
  try {
    const { getDb, getAdminApp, getAdminAuth } = await import('../firebase-admin.js');
    try { getAdminApp(); out.sdkInit = true; } catch (e) { out.sdkInit = false; out.notes.push('Admin SDK init fail: ' + e.message); }
    /* ⚠️ এই check-টাই prod bug ধরত: firebase-admin v14-তে `app.auth()` নেই, তাই
       auth service টা সরাসরি না দেখে `getAdminAuth().verifyIdToken` exist করে কিনা দেখা। */
    out.authApi = false;
    try {
      const svc = typeof getAdminAuth === 'function' ? getAdminAuth() : null;
      out.authApi = !!(svc && typeof svc.verifyIdToken === 'function');
      if (!out.authApi) out.notes.push('Auth service পাওয়া যায়নি — getAuth(app) ব্যবহার হচ্ছে কিনা দেখুন (v14-তে namespaced auth accessor নেই)');
    } catch (e) { out.notes.push('Auth service fail: ' + e.message); }
    if (out.sdkInit) {
      const snap = await getDb().collection('settings').doc('site').get();
      out.firestore = { reachable: true, settingsDoc: !!(snap && snap.exists) };
    }
  } catch (e) {
    out.notes.push('Firestore read fail: ' + String((e && (e.code || e.message)) || e));
  }

  if (!env.FIREBASE_PROJECT_ID || !env.FIREBASE_CLIENT_EMAIL || !env.FIREBASE_PRIVATE_KEY) {
    out.notes.push('Env var missing — Vercel → Settings → Environment Variables, tarpor Redeploy (env change purono deployment-e boshe na)');
  } else if (!out.projectMatch && serverProject && saProject) {
    out.notes.push(`FIREBASE_PROJECT_ID (${serverProject}) onno project-er service account (${saProject})-er sathe dewa hoyece — Firebase Console → Project settings → Service accounts → Download key, tarpor Redeploy`);
  } else if (!out.firestore.reachable) {
    out.notes.push('Firestore porha jay na — project id ba API key check korun');
  }
  if (a.state === AUTH_EXPIRED) out.notes.push("Token expire hoyece — client ekhon nijei refresh kore retry kore; barrier khali refresh token-i morle (tokhon abar login lagbe)");
  if (a.state === AUTH_INVALID) out.notes.push('Token invalid (signature/aud) — client ar admin app e ei site-er i Firebase config use hocche kina dekhn');
  if (a.state === AUTH_NO_TOKEN) out.notes.push('Authorization header nei — ei op ta panel-er vitore call howa uchit (token shoho)');  /* defensive: handler age-i 401 dey */

  /* out.ok = server/deployment side thik ache kina (caller-er token state er upor depend kore na)।
     thik thaklei user "Login required" pakle seta deployment-er dosh noy. */
  out.authOk = authed;
  out.ok = !!(out.firestore.reachable && out.privateKeyShape && env.FIREBASE_PRIVATE_KEY && out.sdkInit !== false && out.authApi && (out.projectMatch || !(serverProject && saProject)));
  return ok(res, out);
}

/* export for tests: state names handlers may branch on */
export const AUTH_STATES = [AUTH_OK, AUTH_EXPIRED, AUTH_CONFIG, AUTH_INVALID, AUTH_NO_TOKEN];
