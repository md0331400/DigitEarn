/* Shared helpers for API routes: token verification, JSON, validation.
   RULE: কখনোই client-supplied uid/amount/balance trust করবেন না —
   uid সবসময় verified Firebase ID token থেকে নেওয়া হয়, amount সবসময় Firestore-এর trusted doc থেকে। */
import { getAdminApp, getAdminAuth } from './firebase-admin.js';

export function sendJson(res, status, data) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  /* deploy check: client এই header দেখে বুঝে সত্যিই নতুন api/ code চলছে কি না
     (Vercel কখনো কখনো পুরোনো functions রেখে দেয় / অসম্পূর্ণ push হয়) */
  try { res.setHeader('X-DigitEarn-API', API_VERSION); } catch (_) {}
  res.end(JSON.stringify(data));
}
export const ok = (res, data) => sendJson(res, 200, data);
export const fail = (res, status, error) => sendJson(res, status, { error: String(error) });

/* CORS — admin APK-তে WebView (file:// origin) থেকে server API call-এর জন্য।
   Security impact zero: সব endpoint token-verify করে, origin-এ কোনো secret ফাঁক হয় না।
   Handler-এর শুরুতে:  if (cors(req, res)) return;  */
export function cors(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return true;
  }
  return false;
}

export async function readBody(req) {
  return new Promise((resolve) => {
    let raw = '';
    let done = false;
    const finish = v => { if (done) return; done = true; resolve(v); };
    req.on('data', c => {
      raw += c;
      /* BODY too large: stream ta destroy করে সাথে সাথে resolve করতে হবে —
         আগে destroy() এর পর resolve-ই হতো না → handler await-এ আটকে function
         timeout পর্যন্ত ঝুলে থাকত (কোনো response না, পুরো invocation bill)।
         খালি object দিলে handler নিয়ম অনুযায়ী 400 দেবে। */
      if (raw.length > 1e5) { req.destroy(); finish({}); }
    });
    req.on('end', () => {
      if (!raw) return finish({});
      try { finish(JSON.parse(raw)); } catch (_) { finish({}); }   // malformed JSON = {} → 400
    });
    req.on('error', () => finish({}));
  });
}

/* Authorization: Bearer <Firebase ID Token> → verify → { uid, email }
   ⚠️ আগে সব failure-ই `null` হতো → handler "Login required" (401) দেখাত।
   ফল: user logged-in থাকলেও "Login required" এলে বোঝাই যেত না কারণ কী —
   (১) token expire, (২) Vercel-এ FIREBASE_PROJECT_ID অন্য project-এর service
   account (aud mismatch), (৩) Admin SDK init fail। এখন কারণ আলাদা করা হয়,
   আর message-ে সেটাই থাকে (client ১-এ নিজে থেকেই token refresh করে retry করে)। */
export const API_VERSION = 'v3';

export const AUTH_OK = 'ok';
export const AUTH_NO_TOKEN = 'no-token';
export const AUTH_INVALID = 'invalid';
export const AUTH_EXPIRED = 'expired';
export const AUTH_CONFIG = 'config';

/* Signature check ছাড়াই payload-টা পড়া যায় (JWT base64url) — শুধু diagnostic
   message বানানোর জন্য; access token/secret কখনো response-এ যায় না। */
function decodeJwtPayload(token) {
  try {
    const part = String(token).split('.')[1] || '';
    const json = Buffer.from(part.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf8');
    return JSON.parse(json);
  } catch (_) { return null; }
}

/* verifyIdToken error → কারণ শ্রেণি: প্রথমে error.code (আমাদের বানানো ঠিকঠাক string),
   না মিললে message-টাও দেখা হয় — real SDK কেবল message দিলেও classify করা যায় */
function classifyVerifyError(err, payload) {
  const code = String((err && (err.code || (err.errorInfo && err.errorInfo.code))) || '');
  const where = code + ' ' + String((err && err.message) || '');
  if (/expired/i.test(where)) return { state: AUTH_EXPIRED, code };
  /* server-side setup failures (wrong service account / dead project / network) —
     egulate kora "Login required" dekhano-i user er kache vul kotha */
  if (/api-key|app-credential|app-not-allowed|internal-error|network|certificate|invalid-credential|operation-not-allowed|not-found|mismatch|fetch failed/i.test(where)) {
    return { state: AUTH_CONFIG, code };
  }
  /* server-এর নিজের code/SDK ভাঙলে (যেমন removed legacy API: `app.auth is not a function`)
     সেটা কখনোই user-এর login সমস্যা না — CONFIG bucket, নইলে সবচেয়ে ভয়াবহ failure-টাই
     চুপচাপ "Login required" হয়ে যায় (এই round-এর মূল bug) */
  if (!code && (err && err.name === 'TypeError' || /not a function|undefined/.test(where))) {
    return { state: AUTH_CONFIG, code: code || 'server-code-error', detail: String((err && err.message) || where).slice(0, 200) };
  }
  // token-এর aud (project) server-এর project-এর সাথে না মিললে mismatch
  const tokenProject = payload && payload.aud;
  if (tokenProject && process.env.FIREBASE_PROJECT_ID && tokenProject !== process.env.FIREBASE_PROJECT_ID) {
    return { state: AUTH_CONFIG, code: code || 'project-id-mismatch', tokenProject };
  }
  return { state: AUTH_INVALID, code };
}

export async function authenticate(req) {
  const h = req.headers.authorization || '';
  const token = h.startsWith('Bearer ') ? h.slice(7).trim() : '';
  if (!token) return { state: AUTH_NO_TOKEN };
  const payload = decodeJwtPayload(token);
  try {
    getAdminApp();
  } catch (e) {
    return { state: AUTH_CONFIG, code: 'admin-init-failed', detail: e.message, tokenPayload: payload };
  }
  try {
    // getAdminAuth() = getAuth(app) — v14-তে app.auth() নেই, সেটা call করলে TypeError
    const dec = await getAdminAuth().verifyIdToken(token);
    return { state: AUTH_OK, uid: dec.uid, email: dec.email || '', tokenProject: dec.aud, payload: dec };
  } catch (e) {
    const cls = classifyVerifyError(e, payload);
    // server log-এ পুরো কারণ (response-এ শুধু বোধগম্য বার্তা)
    console.error('[auth] verifyIdToken failed:', (e && (e.code || e.message)) || e,
      'tokenProject=', payload && payload.aud, 'serverProject=', process.env.FIREBASE_PROJECT_ID);
    return { ...cls, tokenProject: payload && payload.aud, tokenExp: payload && payload.exp, serverProject: process.env.FIREBASE_PROJECT_ID || '' };
  }
}

/* কারণ অনুযায়ী status + বার্তা। expired হলে `sessionExpired:true` — client এতে
   force-refresh করে একবার retry করে (src/core/api.js callApi)। */
export function authReject(res, a = {}) {
  if (a.state === AUTH_EXPIRED) {
    return sendJson(res, 401, { error: 'Session শেষ হয়েছে — পেজ refresh করুন (আবার লগইন লাগবে না)', code: a.code || 'auth/id-token-expired', sessionExpired: true });
  }
  if (a.state === AUTH_CONFIG) {
  const why = a.detail ? ` (${a.detail})` : '';
    const mismatch = a.tokenProject && a.serverProject && a.tokenProject !== a.serverProject
      ? ` (token project: ${a.tokenProject}, server project: ${a.serverProject} — Vercel-এ FIREBASE_PROJECT_ID + service account একই project-এর কিনা দেখুন, তারপর Redeploy)`
      : ' (Vercel environment variables FIREBASE_PROJECT_ID / FIREBASE_CLIENT_EMAIL / FIREBASE_PRIVATE_KEY চেক করুন)';
    /* a.detail = নিজের বানানো init-error (কোনো secret value নেই) — env missing হলে
       সেটাই user/admin-কে বলতে হবে, নইলে "Login required" ভুল বার্তা ছাড়া আর কিছু বোঝা না */
    return sendJson(res, 503, { error: 'Server configuration সমস্যা — API token verify করতে পারছে না' + mismatch + why, code: a.code || 'admin-config' });
  }
  return fail(res, 401, 'Login required' + (a.state === AUTH_INVALID && a.code ? ` (${a.code})` : ''));
}

export async function verifyUser(req) {
  const a = await authenticate(req);
  return a.state === AUTH_OK ? { uid: a.uid, email: a.email } : null;
}

/* Admin check: verified token + admins/{email} doc (server-side, Firestore rules bypass)
   ⚠️ auth fail হলে `state` নিয়ে ফিরে আসে — handler authReject() দিয়ে response দেবে
   (আগে null → 403 "Admin access required", যেটা আসলে config problem হলেও ভুল বার্তা দিত) */
export async function requireAdmin(req) {
  const a = await authenticate(req);
  if (a.state !== AUTH_OK) return a;
  const { getDb } = await import('./firebase-admin.js');
  const snap = a.email ? await getDb().collection('admins').doc(a.email).get() : null;
  return { ...a, isAdmin: !!(snap && snap.exists) };
}

/* ---------- dynamic task input fields (admin-controlled) ----------
   task doc-এর `inputFields: [{ label, type, placeholder, required }]` = একমাত্র field source;
   code-এ কোনো task-specific (Facebook/Gmail/Instagram) field hardcode করা যাবে না।
   type list + per-type length limit এখানেই রাখা হয়েছে যাতে server / user page / admin panel
   আলাদা না হয় (drift হলে submission 400 বা চুপচাপ truncation হতো)।
   ⚠️ client (src/pages/task.js, src/admin/core.js, src/admin/main.js) এই list-টা নিজের
   bundle-এ import করতে পারে না (lib/http.js = Node-only), তাই সেগুলোতে কপি আছে —
   tests/web-and-apk.mjs [L] চারটা copy-ই হুবহু মিলছে কিনা check করে। */
/* 'image' = proof/স্ক্রিনশট upload (client canvas দিয়ে resize করে data: URL পাঠায়,
   server শুধু shape + সাইজ verify করে) — MicroJobs-এর submission field। */
export const FIELD_TYPES = ['text', 'email', 'password', 'tel', 'number', 'url', 'textarea', 'image'];
export const FIELD_MAXLEN = { url: 300, email: 120, tel: 20, number: 60, textarea: 2000, text: 100, password: 100, image: 300000 };
export const fieldMaxLen = type => (type in FIELD_MAXLEN ? FIELD_MAXLEN[type] : 100);
/* Firestore doc limit 1MB — data URL base64 ভেবে cap রাখা (image field ২টা হলেও doc বাঁচে) */
export const PROOF_IMAGE_RE = /^data:image\/(png|jpe?g|webp|gif);base64,[A-Za-z0-9+/=\s]{64,}$/;
export const isProofImage = v => typeof v === 'string' && PROOF_IMAGE_RE.test(v.trim()) && v.length <= FIELD_MAXLEN.image;
export const fieldType = t => (FIELD_TYPES.includes(t) ? t : 'text');

/* ---------- input validators ---------- */
export const isNonEmptyStr = (v, max = 200) => typeof v === 'string' && v.trim().length > 0 && v.trim().length <= max;
export const isMobile = v => typeof v === 'string' && /^01[3-9]\d{8}$/.test(v.trim());
export const isEmail = v => typeof v === 'string' && /^\S+@\S+\.\S+$/.test(v) && v.length <= 120;
export const isPosFinite = v => Number.isFinite(Number(v)) && Number(v) > 0;
export const isTaskSlug = v => typeof v === 'string' && /^[a-z0-9-]{2,50}$/.test(v);

/* Leaderboard-এ phone প্রকাশ পায় না: 01712****89 (মুখের ৫টা + শেষের ২টা) */
export function maskMobile(v) {
  const d = String(v || '').replace(/\D/g, '');
  if (d.length < 7) return '';
  return d.slice(0, 5) + '****' + d.slice(-2);
}

/* ---------- sensitive-field policy (privacy) ----------
   এই platform-এ seller নিজের বিক্রি করা account-এর তথ্য জমা দেয়, তাই কিছু field
   সত্যিই সংবেদনশীল (password / cookie / OTP / token)। সেগুলো বন্ধ করা business-ই
   শেষ করে দেয়, তাই policy = **কম প্রকাশ, কম রাখা**:
     - admin list/log/error-এ কখনো raw দেখাবে না (mask)
     - reject হলে credential value মুছে যাবে (কাজ শেষ, রাখার দরকার নেই)
     - approve হলে রাখা হয় —buyer-কে account হস্তান্তরের জন্য দরকার (documented)
   label regex client (src/pages/task.js) + admin panel-এর mirror; test: [N] */
/* label normalize করে compact pattern মেলানো হয় — 'api_key' / 'API Key' / 'Password:'
   সব একই রকম ধরা পড়বে (space/punct/underscore ভেদে escape regex ভাঙত) */
const SECRET_LABEL = /(password|passwd|pwd|passcode|otp|onetimecode|2fa|tfa|twofactor|authenticat|recovery|backupcode|secret|apikey|accesstoken|refreshtoken|privatetoken|privatekey|token|cookie|session|bearer)/;
const normalizeLabel = s => String(s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
export const isSecretField = (label, type) => type === 'password' || SECRET_LABEL.test(normalizeLabel(label));
export const SECRET_LABEL_SOURCE = SECRET_LABEL.source;

/* ---------- shared catch helper ----------
   Handler গুলোর transaction/DB operation একই catch pattern use করত:
     catch (err) { return fail(res, 409, err.message) }
   সমস্যা দুটো: (ক) Firestore/Admin SDK-এর raw message (যেমন "5 NOT_FOUND: …",
   "14 UNAVAILABLE: …", "app.auth is not a function") client-এ চলে যেত — internal
   detail + user সেটা বুঝত না; (খ) infrastructure error-ও 409 "conflict" হিসেবে
   আসত, যেটা client retry করে না (আসলে retry করাই ঠিক)।
   এখানে handler-এর নিজের লেখা message (no code) আগের মতোই status সহ যায়, আর
   SDK/infra error → log + generic 503 (retryable)। response shape বদলায় না। */
export class ApiError extends Error {
  constructor(httpStatus, message) { super(message); this.httpStatus = httpStatus; this.isBusiness = true; }
}
const SDKISH = /^\s*\d+\s+[A-Z_]+:|FirebaseError|ECONNREFUSED|ENOTFOUND|ETIMEDOUT|EAI_AGAIN|fetch failed|socket hang up|UNAVAILABLE|INTERNAL:|PERMISSION_DENIED|NOT_FOUND:|ALREADY_EXISTS|INVALID_ARGUMENT|FAILED-PRECONDITION|ABORTED|OUT_OF_RANGE|RESOURCE_EXHAUSTED|UNAUTHENTICATED|no document to update|is not a function|not defined|Cannot read/i;

export function opFail(res, err, fallback = 'Operation fail হয়েছে — আবার চেষ্টা করুন') {
  const msg = String((err && err.message) || '');
  const numericCode = typeof (err && err.code) === 'number';
  const looksSdk = !!(err && !err.isBusiness) && (numericCode || (err.name === 'FirebaseError') || SDKISH.test(msg));
  if (looksSdk) {
    console.error('[api] operation failed:', (err.code !== undefined ? 'code=' + err.code + ' ' : '') + (err.name || '') + ': ' + msg);
    return fail(res, 503, 'সার্ভার সাময়িকভাবে কাজ করছে না — একটু পরে আবার চেষ্টা করুন');
  }
  const status = Number.isInteger(err && err.httpStatus) ? err.httpStatus : 409;
  return fail(res, status, msg || fallback);
}
