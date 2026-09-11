/* DigitEarn — bugfix regression suite (server/API side).
   Runs the REAL handlers against the in-memory Firestore mock.
   Run: node --import ./tests/register.mjs tests/bugfixes.mjs */
import { store } from './mocks/firestore-fake.mjs';
import { createServer } from 'vite';

const submitH = (await import('../api/proof/submit.js')).default;
const targetH = (await import('../api/target/claim.js')).default;
const secretH = (await import('../lib/admin/secret.js')).default;
const routerH = (await import('../api/admin/panel.js')).default;
const giftH = (await import('../api/gift/claim.js')).default;
const registerH = (await import('../api/user/register.js')).default;
const proofReviewH = (await import('../lib/admin/proof-review.js')).default;
const depositReviewH = (await import('../lib/admin/deposit-review.js')).default;
const ensureH = (await import('../api/user/ensure.js')).default;
const checkH = (await import('../api/user/check.js')).default;
const setActiveH = (await import('../lib/admin/set-active.js')).default;

/* ---------- helpers (same shape as tests/run.mjs) ---------- */
function req(method, headers, body, url = '/api/x') {
  return {
    method, url, headers,
    on(ev, cb) {
      if (ev === 'data' && body !== undefined) setImmediate(() => cb(Buffer.from(JSON.stringify(body))));
      if (ev === 'end') setImmediate(() => cb());
    },
  };
}
function res() {
  return { statusCode: 0, headers: {}, body: '', setHeader(k, v) { this.headers[k] = v; }, end(b) { this.body = b; } };
}
const json = r => { try { return JSON.parse(r.body); } catch { return {}; } };
const auth = t => ({ authorization: 'Bearer ' + t });
const A = 'TOKEN_ALICE';
const ADMIN = 'TOKEN_ADMIN';

let pass = 0, failN = 0;
function check(name, cond, extra = '') {
  if (cond) { pass++; console.log(`  ✅ ${name}`); }
  else { failN++; console.log(`  ❌ ${name} ${extra}`); }
}

/* ---------- seed ---------- */
store.docs['tasks/gmail-sale'] = {
  slug: 'gmail-sale', nameBn: 'জিমেইল সেল', reward: 15, enabled: true, locked: false,
  inputFields: [{ label: 'Email', type: 'email', required: true }],
};
store.docs['users/alice'] = { balance: 0, totalEarned: 0, isActive: true, name: 'Alice', email: 'alice@test.com' };
store.docs['users/inactive'] = { balance: 0, totalEarned: 0, isActive: false, name: 'Ina', email: 'ina@test.com' };
store.docs['admins/admin@digitearn.com'] = { isAdmin: true };
store.docs['settings/site'] = {
  activationFee: 30, activationBonus: 20, registerBonus: 10, referralBonus: 5, giftReward: 5,
  targetTiers: [{ tier: 5, bonus: 50 }, { tier: 10, bonus: 100 }],
};
store.docs['settings/secret'] = { giftCode: 'OLD2026' };

/* ============================================================
   [A] TARGET BONUS ENDPOINT — api/target/claim.js (latest commit-এ delete
       হয়ে গিয়েছিল; site এখনও কল করত → target page-এর Claim বাটন 404)
   ============================================================ */
console.log('\n[A] /api/target/claim exists and gates like the UI promises');
{
  let r = res();
  await targetH(req('POST', {}, { tier: 5 }), r);
  check('no token → 401', r.statusCode === 401, `(got ${r.statusCode})`);

  r = res();
  await targetH(req('GET', auth(A), undefined), r);
  check('GET → 405', r.statusCode === 405, `(got ${r.statusCode})`);

  r = res();
  await targetH(req('POST', auth(A), { tier: 'abc' }), r);
  check('junk tier → 400', r.statusCode === 400, `(got ${r.statusCode})`);

  r = res();
  await targetH(req('POST', auth(A), { tier: 999 }), r);
  check('tier not in settings → 400 (client-এর requested bonus ignore)', r.statusCode === 400, `(got ${r.statusCode})`);

  r = res();
  await targetH(req('POST', auth(A), { tier: 5, bonus: 999999 }), r);
  check('not enough direct refs → 400', r.statusCode === 400, `(got ${r.statusCode} ${r.body})`);

  // ৫ জন সরাসরি রেফার
  for (let i = 1; i <= 5; i++) store.docs[`users/alice/team/ref${i}`] = { name: 'R' + i, createdAt: 1 };
  r = res();
  await targetH(req('POST', auth(A), { tier: 5 }), r);
  check('5 direct refs → 200', r.statusCode === 200, `(got ${r.statusCode} ${r.body})`);
  check('server-side bonus amount used (৳50 from settings)', json(r).bonus === 50, `(${json(r).bonus})`);
  check('balance 0 → 50', Number(store.docs['users/alice'].balance) === 50, `(${store.docs['users/alice'].balance})`);
  check('totalEarned 0 → 50', Number(store.docs['users/alice'].totalEarned) === 50);
  check('claim recorded (per-tier)', store.docs['users/alice/targetClaims/5'] !== undefined);
  const txs = Object.keys(store.docs).filter(k => k.startsWith('users/alice/transactions/'));
  check('transaction audit row written', txs.length === 1, `(${txs.length})`);

  r = res();
  await targetH(req('POST', auth(A), { tier: 5 }), r);
  check('double claim → 409', r.statusCode === 409, `(got ${r.statusCode})`);
  check('balance unchanged after 409', Number(store.docs['users/alice'].balance) === 50);

  store.docs['users/carol'] = { balance: 0, totalEarned: 0, isActive: false, name: 'C' };
  for (let i = 1; i <= 5; i++) store.docs[`users/carol/team/x${i}`] = {};
  r = res();
  await targetH(req('POST', auth('TOKEN_CAROL'), { tier: 5 }), r);
  check('inactive account → 409 (activation gate)', r.statusCode === 409, `(got ${r.statusCode})`);
}

/* ============================================================
   [B] DAY-KEY PARITY — client `todayStr()` বনাম server-এর `day`
       (আগে client local date (UTC+6) / server UTC → ৬ ঘণ্টা মিলত না)
   ============================================================ */
console.log('\n[B] day key: client and server must agree');
{
  const vite = await createServer({ configFile: false, logLevel: 'silent', server: { middlewareMode: true }, appType: 'custom' });
  const api = await vite.ssrLoadModule('/src/core/api.js');
  const utcDay = new Date().toISOString().slice(0, 10);

  const clientDay = api.todayStr();
  check('client todayStr() is UTC-based (== ISO date)', clientDay === utcDay, `(${clientDay} vs ${utcDay})`);

  let r = res();
  await submitH(req('POST', auth(A), { taskSlug: 'gmail-sale', data: { Email: 'a@b.com' } }), r);
  check('proof submit → 200', r.statusCode === 200, `(got ${r.statusCode} ${r.body})`);
  const pid = json(r).id;
  const stored = store.docs[`users/alice/proofs/${pid}`];
  check('server-stored day === client day key (getTodaySales will find it)', stored && stored.day === clientDay, `(stored ${stored && stored.day} vs client ${clientDay})`);
  check('top-level admin mirror also stored', store.docs[`proofs/${pid}`] !== undefined);

  // gift claim-এর day-key-ও একই (giftClaims/{day} doc id)
  store.docs['users/alice'] = { ...store.docs['users/alice'], isActive: true };
  r = res();
  await giftH(req('POST', auth(A), { code: 'OLD2026' }), r);
  check('gift claim → 200', r.statusCode === 200, `(got ${r.statusCode} ${r.body})`);
  check('giftClaims doc id uses the same UTC day', store.docs[`users/alice/giftClaims/${clientDay}`] !== undefined);
  await vite.close();
}

/* ============================================================
   [C] settings/secret — admin panel browser দিয়ে পড়তে পারে না (rules),
       তাই server op। আগে panel খালি দেখাত → Save করলে giftCode '' হয়ে
       পুরো gift feature মরে যেত।
   ============================================================ */
console.log('\n[C] ?op=secret — admin can read/write giftCode, empty never wipes');
{
  let r = res();
  await secretH(req('POST', auth(A), { get: true }), r);
  check('normal user → 403', r.statusCode === 403, `(got ${r.statusCode})`);

  r = res();
  await secretH(req('POST', auth(ADMIN), { get: true }), r);
  check('admin read → current giftCode', r.statusCode === 200 && json(r).giftCode === 'OLD2026', `(${r.body})`);

  r = res();
  await secretH(req('GET', auth(ADMIN), undefined), r);
  check('GET → 405', r.statusCode === 405);

  r = res();
  await secretH(req('POST', auth(ADMIN), { giftCode: '' }), r);
  check('empty giftCode without clear flag → not written', r.statusCode === 200 && json(r).updated.length === 0, `(${r.body})`);
  check('existing code survives the accidental-blank save', store.docs['settings/secret'].giftCode === 'OLD2026', `(${store.docs['settings/secret'].giftCode})`);

  r = res();
  await secretH(req('POST', auth(ADMIN), { giftCode: 'NEW2026' }), r);
  check('admin write → saved', r.statusCode === 200 && store.docs['settings/secret'].giftCode === 'NEW2026');

  r = res();
  await secretH(req('POST', auth(ADMIN), { giftCode: '  spaced  ' }), r);
  check('value trimmed', store.docs['settings/secret'].giftCode === 'spaced', `(${JSON.stringify(store.docs['settings/secret'].giftCode)})`);

  r = res();
  await secretH(req('POST', auth(ADMIN), { giftCode: '', __clear: true }), r);
  check('explicit clear works', r.statusCode === 200 && store.docs['settings/secret'].giftCode === '', `(${r.body})`);

  r = res();
  await secretH(req('POST', auth(ADMIN), { giftCode: 'X', evilField: 'boom' }), r);
  check('write with allowed key → 200 + updated list', r.statusCode === 200 && json(r).updated.includes('giftCode'), `(${r.statusCode} ${r.body})`);
  check('unallowed keys ignored (no arbitrary secret doc writes)', store.docs['settings/secret'].evilField === undefined);
  check('other secret fields survive merge', store.docs['settings/secret'].giftCode === 'X');

  /* router dispatch */
  r = res();
  await routerH(req('POST', auth(ADMIN), { get: true }, '/api/admin/panel?op=secret'), r);
  check('router ?op=secret dispatches (200, not 404)', r.statusCode === 200, `(got ${r.statusCode} ${r.body})`);

  r = res();
  await routerH(req('POST', auth(ADMIN), {}, '/api/admin/panel?op=does-not-exist'), r);
  check('router unknown op → 404', r.statusCode === 404, `(got ${r.statusCode})`);

  r = res();
  await routerH(req('POST', auth(A), { get: true }, '/api/admin/panel?op=secret'), r);
  check('router keeps 403 for non-admin', r.statusCode === 403, `(got ${r.statusCode})`);
}

/* ============================================================
   [D] Vercel Hobby 12-function limit — restored file must not break it
   ============================================================ */
console.log('\n[D] Vercel Hobby function count still <= 12');
{
  const { readdirSync, statSync } = await import('node:fs');
  const walk = d => readdirSync(d, { withFileTypes: true }).flatMap(e =>
    e.isDirectory() ? walk(d + '/' + e.name) : (e.name.endsWith('.js') ? [d + '/' + e.name] : []));
  const fns = walk('api');
  check(`api/ has ${fns.length} function files (limit 12)`, fns.length <= 12, `(${fns.join(', ')})`);
  check('target/claim.js restored as a function', fns.some(f => f.endsWith('api/target/claim.js')));
  check('no new function file added for secret (kept inside router)', !fns.some(f => /secret/.test(f)));
}


/* ============================================================
   [E] SIGNUP DUPLICATE GUARD (server-side) — একই email/mobile দিয়ে
       বহু আইডি বানিয়ে register+referral bonus farm বন্ধ
   ============================================================ */
console.log('\n[E] /api/user/register — email/mobile uniqueness enforced server-side');
{
  store.docs['users/carol'] = { balance: 0, totalEarned: 0, isActive: true, name: 'Carol', email: 'dup@test.com', mobile: '01711111111' };
  store.docs['users/dave'] = { balance: 0, totalEarned: 0, isActive: true, name: 'Dave', email: 'mixed@t.com', mobile: '01822222222' };
  store.docs['refs/12345678'] = { uid: 'carol' };
  const B = 'TOKEN_BOB';

  let r = res();
  await registerH(req('POST', auth(B), { name: 'Bob One', mobile: '01912345678', email: 'dup@test.com', refCode: '12345678' }), r);
  check('same email as existing user → 409 (not a new bonus)', r.statusCode === 409, `(got ${r.statusCode} ${r.body})`);

  r = res();
  await registerH(req('POST', auth(B), { name: 'Bob Two', mobile: '01711111111', email: 'brand-new@test.com', refCode: '12345678' }), r);
  check('same mobile, different email → 409', r.statusCode === 409, `(got ${r.statusCode} ${r.body})`);

  r = res();
  await registerH(req('POST', auth(B), { name: 'Bob Three', mobile: '01912345678', email: 'MIXED@T.COM', refCode: '12345678' }), r);
  check('email case-variant → 409 (case-insensitive match)', r.statusCode === 409, `(got ${r.statusCode} ${r.body})`);

  r = res();
  await registerH(req('POST', auth(B), { name: 'Bob Four', mobile: '01912345678', email: 'bob@test.com', refCode: '12345678' }), r);
  check('fresh email+mobile → 200', r.statusCode === 200, `(got ${r.statusCode} ${r.body})`);
  check('register bonus credited from settings (৳10)', Number(store.docs['users/bob'].balance) === 10, `(${store.docs['users/bob'] && store.docs['users/bob'].balance})`);
  check('referrer got referral bonus (৳5)', Number(store.docs['users/carol'].balance) === 5, `(${store.docs['users/carol'].balance})`);
  check('team entry under referrer', store.docs['users/carol/team/bob'] !== undefined);
  check('no junk doc at top level "users/bob/..."', store.docs['users/bob/'] === undefined);

  r = res();
  await registerH(req('POST', auth(B), { name: 'Bob Five', mobile: '01999999999', email: 'bob@test.com', refCode: '12345678' }), r);
  check('profile already exists → 409 (no second bonus)', r.statusCode === 409, `(got ${r.statusCode})`);
}

/* ============================================================
   [F] AUTH FAILURE DIAGNOSTICS — "Login required" was shown for everything
       (expired token / wrong project / Admin SDK not configured). Reported by a
       user on /task/facebook-sale.html while clearly logged in.
       Contract now: no-token → 401 "Login required"
                     expired   → 401 + sessionExpired (client force-refreshes + retries)
                     config    → 503 with token-vs-server project names (never secrets)
   ============================================================ */
console.log('\n[F] auth failures are classified, not flattened into "Login required"');
{
  const fs = await import('node:fs');
  const { authenticate, authReject, AUTH_OK, AUTH_EXPIRED, AUTH_CONFIG, AUTH_INVALID, AUTH_NO_TOKEN } = await import('../lib/http.js');
  const fake = await import('./mocks/firebase-admin-fake.mjs');
  const b64u = o => Buffer.from(JSON.stringify(o)).toString('base64url');
  const jwt = payload => `${b64u({ alg: 'none', typ: 'JWT' })}.${b64u(payload)}.sig`;

  const noAuth = await authenticate(req('POST', {}, {}));
  check(`missing header → state ${AUTH_NO_TOKEN}`, noAuth.state === AUTH_NO_TOKEN, `(${noAuth.state})`);
  let r = res();
  authReject(r, noAuth);
  check('no-token still says "Login required" (401)', r.statusCode === 401 && /Login required/.test(r.body), `(${r.statusCode} ${r.body})`);

  /* ---- expired ---- */
  fake.setVerifyFailure('TOKEN_ALICE', { code: 'auth/id-token-expired', message: 'Your ID token has expired. Get a fresh one' });
  const exp = await authenticate(req('POST', auth(A), {}));
  check('expired token classified as expired (not invalid)', exp.state === AUTH_EXPIRED, `(${exp.state})`);
  r = res();
  await submitH(req('POST', auth(A), {}), r);
  check('real handler: expired → 401 + sessionExpired flag', r.statusCode === 401 && json(r).sessionExpired === true, `(${r.statusCode} ${r.body})`);
  check('real handler: expired message is NOT "Login required"', !/Login required/.test(String(json(r).error)), `(${json(r).error})`);
  fake.clearAllFailures();

  /* ---- project mismatch (Vercel FIREBASE_PROJECT_ID vs token aud) ---- */
  process.env.FIREBASE_PROJECT_ID = 'digitearn';
  const badAud = jwt({ aud: 'some-other-project', exp: Math.floor(Date.now() / 1000) - 99999, email: 'x@y.z' });
  fake.setVerifyFailure(badAud, { code: 'auth/invalid-id-token', message: 'The ID Token \'aud\' property must be exactly the project id' });
  const mism = await authenticate(req('POST', { authorization: 'Bearer ' + badAud }, {}));
  check('aud mismatch → state config', mism.state === AUTH_CONFIG, `(${mism.state} ${mism.code})`);
  check('aud mismatch exposes both project ids', mism.tokenProject === 'some-other-project' && mism.serverProject === 'digitearn', `(${mism.tokenProject}/${mism.serverProject})`);
  r = res();
  authReject(r, mism);
  check('aud mismatch → 503 with actionable message', r.statusCode === 503 && /token project: some-other-project/.test(r.body) && /server project: digitearn/.test(r.body), `(${r.statusCode} ${r.body})`);
  check('aud mismatch message says config, not login', /configuration/.test(r.body) && !/Login required/.test(r.body), `(${json(r).error})`);
  fake.clearAllFailures();

  /* ---- Admin SDK not initialised ---- */
  fake.setInitFailure('Firebase Admin env variables missing');
  const cfg = await authenticate(req('POST', auth(A), {}));
  check('init failure → state config (never looks like a logged-out user)', cfg.state === AUTH_CONFIG && cfg.code === 'admin-init-failed', `(${cfg.state} ${cfg.code})`);
  r = res();
  authReject(r, cfg);
  check('init failure → 503 (so it is not retried as a login problem)', r.statusCode === 503, `(${r.statusCode})`);
  check('init failure message names the missing env (no secret values)', /env variables missing/.test(r.body) && !/BEGIN.*PRIVATE/.test(r.body), `(${json(r).error})`);
  fake.setInitFailure(null);

  /* ---- garbage token: still invalid/401 ---- */
  const junk = await authenticate(req('POST', { authorization: 'Bearer not.a.real.token' }, {}));
  check('garbage token → invalid', junk.state === AUTH_INVALID || junk.state === AUTH_CONFIG, `(${junk.state})`);

  /* ---- happy path still works after the refactor ---- */
  const good = await authenticate(req('POST', auth(A), {}));
  check('valid token → ok + uid', good.state === AUTH_OK && good.uid === 'alice', `(${good.state} ${good.uid})`);
  r = res();
  await submitH(req('POST', auth(A), { taskSlug: 'gmail-sale', data: { email: 'a@b.com' } }), r);
  check('valid token after refactor → handler passes auth (no 401/503)', r.statusCode !== 401 && r.statusCode !== 503, `(${r.statusCode} ${r.body})`);

  /* ---- ?op=health through the single router (no new Vercel function) ---- */
  process.env.FIREBASE_PRIVATE_KEY = '-----BEGIN PRIVATE KEY-----\nZmFrZQ==\n-----END PRIVATE KEY-----';
  r = res();
  await routerH(req('POST', auth(ADMIN), {}, '/api/admin/panel?op=health'), r);
  const h = json(r);
  delete process.env.FIREBASE_PRIVATE_KEY;
  check('?op=health routed for an admin (200, not "Unknown admin endpoint")', r.statusCode === 200 && !/Unknown admin/.test(r.body), `(${r.statusCode} ${r.body})`);
  check('health reports authed + projects + firestore', h.authed === true && h.serverProject === 'digitearn' && !!h.firestore, `(${JSON.stringify(h).slice(0, 120)})`);
  check('health never echoes a private key', !/BEGIN [A-Z ]*PRIVATE KEY/.test(r.body) && !/FIREBASE_PRIVATE_KEY.*-----/.test(r.body));
  r = res();
  await routerH(req('POST', {}, {}, '/api/admin/panel?op=health'), r);
  check('health is admin-only: anonymous gets 401 and NO diagnostics', r.statusCode === 401 && !/env|firestore|privateKeyShape|serverProject/i.test(r.body), `(${r.statusCode} ${r.body})`);
  r = res();
  await routerH(req('POST', auth(A), {}, '/api/admin/panel?op=health'), r);
  check('health: logged-in non-admin gets 403, no diagnostics', r.statusCode === 403 && !/env|firestore|privateKeyShape/.test(r.body), `(${r.statusCode} ${r.body})`);

  /* ---- admin verify(): authenticated flag must not lie ---- */
  const verifyH = (await import('../lib/admin/verify.js')).default;
  fake.setVerifyFailure('TOKEN_ALICE', { code: 'auth/id-token-expired' });
  r = res();
  await verifyH(req('POST', auth(A), {}), r);
  check('admin verify: expired token → authenticated:false + authState', r.statusCode === 200 && json(r).authenticated === false && json(r).authState === 'expired', `(${r.body})`);
  fake.clearAllFailures();
  r = res();
  await verifyH(req('POST', auth(ADMIN), {}), r);
  check('admin verify: admin token → isAdmin true (regression)', json(r).isAdmin === true, `(${r.body})`);
  delete process.env.FIREBASE_PROJECT_ID;

  /* ---- source invariants: nobody keeps the flattened message ---- */
  const files = ['api/account/activate.js', 'api/deposit/submit.js', 'api/gift/claim.js', 'api/proof/submit.js', 'api/user/ensure.js', 'api/user/register.js', 'api/withdrawal/request.js', 'api/target/claim.js'];
  const stale = files.filter(f => /return fail\(res, 401, 'Login required'\)/.test(fs.readFileSync(f, 'utf8')));
  check('no user handler flattens auth failure into "Login required"', stale.length === 0, `(${stale.join(',')})`);
  const notRouted = files.filter(f => !/authReject\(res, a\)/.test(fs.readFileSync(f, 'utf8')));
  check('all 8 user handlers go through authenticate()+authReject()', notRouted.length === 0, `(${notRouted.join(',')})`);
  const adminOps = fs.readdirSync('lib/admin').filter(f => f.endsWith('.js') && !['health.js', 'verify.js'].includes(f));
  const adminStale = adminOps.filter(f => !/authReject\(res, admin\)/.test(fs.readFileSync('lib/admin/' + f, 'utf8')));
  check('every admin op classifies auth failure too', adminStale.length === 0, `(${adminStale.join(',')})`);
  /* verify.js ইচ্ছা ব্যতিক্রম: সবসময় 200 (enumeration রোধ) — তাই authReject না, state দেখে flag */
  const vsrc = fs.readFileSync('lib/admin/verify.js', 'utf8');
  check('verify.js exception is deliberate (always 200, reports authState)', /admin\.state !== AUTH_OK/.test(vsrc) && !/authReject\(res, admin\)/.test(vsrc) && /isAdmin: false, authenticated: false, authState/.test(vsrc));
  check('verifyUser() kept as compat wrapper (old call sites still work)', /export async function verifyUser/.test(fs.readFileSync('lib/http.js', 'utf8')));
  check('Vercel function budget still 10 (health lives inside the router)', fs.readdirSync('api', { recursive: true }).filter(f => f.endsWith('.js')).length === 10, `(${fs.readdirSync('api', { recursive: true }).filter(f => f.endsWith('.js')).join(',')})`);
}

/* ============================================================
   [G] THE actual production cause of "Login required": firebase-admin v14 removed
       the legacy namespaced API (`app.auth()` → undefined), so verifyIdToken threw
       `TypeError: app.auth is not a function` for EVERY request → 401 "Login required"
       on proof submit / withdrawal / gift / deposit / register / activate / admin ops,
       while everything that talks to Firestore directly (admin rate + video) kept working.
       Tests must therefore use the REAL v14 surface (fake has no `.auth()`) — that alone
       turned 13 green tests red before the fix.
   ============================================================ */
console.log('\n[G] token verification goes through the modular API (no removed app.auth())');
{
  const fs = await import('node:fs');
  const httpSrc = fs.readFileSync('lib/http.js', 'utf8');
  const fbSrc = fs.readFileSync('lib/firebase-admin.js', 'utf8');
  check('lib/firebase-admin.js imports getAuth from firebase-admin/auth', /import \{ getAuth \} from 'firebase-admin\/auth'/.test(fbSrc));
  check('lib/firebase-admin.js exports getAdminAuth()', /export function getAdminAuth\(\) \{\s*return getAuth\(getAdminApp\(\)\);/.test(fbSrc));
  check('lib/http.js uses getAdminAuth().verifyIdToken', /getAdminAuth\(\)\.verifyIdToken\(token\)/.test(httpSrc));
  const legacy = ['lib/http.js', 'lib/firebase-admin.js', ...fs.readdirSync('lib/admin').map(f => 'lib/admin/' + f),
    ...fs.readdirSync('api', { recursive: true }).filter(f => f.endsWith('.js')).map(f => 'api/' + f)];
  const codeOnly = src => src.replace(/\/\*[\s\S]*?\*\//g, '').split('\n').filter(l => !/^\s*(\/\/|#)/.test(l)).join('\n');
  const offenders = legacy.filter(f => /\.auth\(\)|\.firestore\(\)|\.messaging\(\)|\.storage\(\)/.test(codeOnly(fs.readFileSync(f, 'utf8'))));
  check('no api/lib file calls the removed namespaced app.auth()/app.firestore()', offenders.length === 0, `(${offenders.join(',')})`);
  const fake = await import('./mocks/firebase-admin-fake.mjs');
  check('mock mirrors v14 (app.auth is undefined — bug cannot hide here)', fake.getAdminApp().auth === undefined);

  /* a TypeError-shaped SDK break must be reported as CONFIG (503), never "Login required" */
  const { authenticate, AUTH_CONFIG } = await import('../lib/http.js');
  fake.setInitFailure('app.auth is not a function');
  const broke = await authenticate(req('POST', auth(A), {}));
  check('SDK/API-shape breakage → config, not a login error', broke.state === AUTH_CONFIG, `(${broke.state})`);
  fake.setInitFailure(null);

  /* every response carries the build tag so a partial deploy is visible from the client */
  let r = res();
  await submitH(req('POST', auth(A), { taskSlug: 'gmail-sale', data: { email: 'a@b.com' } }), r);
  check('API responses send X-DigitEarn-API (deploy/version marker)', r.headers['X-DigitEarn-API'] === 'v3', `(${JSON.stringify(r.headers)})`);
  r = res();
  await submitH(req('POST', {}, { taskSlug: 'gmail-sale' }), r);
  check('the 401 path carries the marker too (client tells old-deploy from it)', r.statusCode === 401 && r.headers['X-DigitEarn-API'] === 'v3', `(${r.statusCode} ${JSON.stringify(r.headers)})`);

  /* ?op=health must actually reach the auth service (that is what broke silently) */
  process.env.FIREBASE_PRIVATE_KEY = '-----BEGIN PRIVATE KEY-----\nZmFrZQ==\n-----END PRIVATE KEY-----';
  process.env.FIREBASE_CLIENT_EMAIL = 'svc@digitearn.iam.gserviceaccount.com';
  process.env.FIREBASE_PROJECT_ID = 'digitearn';
  r = res();
  await routerH(req('POST', auth(ADMIN), {}, '/api/admin/panel?op=health'), r);
  const h = json(r);
  delete process.env.FIREBASE_PRIVATE_KEY; delete process.env.FIREBASE_CLIENT_EMAIL; delete process.env.FIREBASE_PROJECT_ID;
  check('health proves getAdminAuth().verifyIdToken exists', h.authApi === true, `(${JSON.stringify(h).slice(0, 150)})`);
  check('health reports api version + overall ok', h.apiVersion === 'v3' && h.ok === true,
    `(${h.apiVersion}/ok=${h.ok} fs=${JSON.stringify(h.firestore)} key=${h.privateKeyShape} env=${JSON.stringify(h.env)} sdk=${h.sdkInit})`);
}

/* ============================================================
   [K] main-branch audit (2026-09-11) — confirmed bugs + their regressions
   ============================================================ */
console.log('\n[K] audit fixes: legacy mirror docs, in-transaction guards, error hygiene');
{
  const fs = await import('node:fs');
  const fake = await import('./mocks/firebase-admin-fake.mjs');

  /* ---------- K1: approval of a submission that has no user-side mirror doc ----------
     `tx.update(users/{uid}/proofs/{id})` threw NOT_FOUND and rolled the whole tx back →
     legacy (pre-mirror) submissions could NEVER be approved → seller never paid. */
  store.docs['proofs/legacy_p1'] = {
    taskSlug: 'gmail-sale', taskName: 'জিমেইল সেল', day: '2020-01-01', reward: 15,
    status: 'pending', note: '', userId: 'alice', submittedData: {}, accountKey: '', images: [],
  };
  store.docs['users/alice'].balance = 0;
  const balBefore = Number(store.docs['users/alice'].balance);

  let r = res();
  await proofReviewH(req('POST', auth(ADMIN), { proofId: 'legacy_p1', action: 'approve' }), r);
  check('legacy submission (no users/{uid}/proofs mirror) approves → 200', r.statusCode === 200, `(${r.statusCode} ${r.body})`);
  check('seller was actually credited (৳15 from task doc)', Number(store.docs['users/alice'].balance) === balBefore + 15, `(${store.docs['users/alice'].balance})`);
  check('mirror doc created by merge-set, status approved', store.docs['users/alice/proofs/legacy_p1']?.status === 'approved', JSON.stringify(store.docs['users/alice/proofs/legacy_p1'] || null));
  check('top-level proof marked approved + approvedBy recorded', store.docs['proofs/legacy_p1'].status === 'approved' && store.docs['proofs/legacy_p1'].approvedBy === 'admin1', JSON.stringify(store.docs['proofs/legacy_p1'].approvedBy));
  r = res();
  await proofReviewH(req('POST', auth(ADMIN), { proofId: 'legacy_p1', action: 'approve' }), r);
  check('second approve of the same proof → 409 (no double credit)', r.statusCode === 409, `(${r.statusCode})`);
  check('balance unchanged after the rejected double approve', Number(store.docs['users/alice'].balance) === balBefore + 15);

  /* same class for deposits */
  store.docs['deposits/legacy_d1'] = {
    method: 'bkash', trxId: 'TRX123456', senderNumber: '01711111111', amount: 100,
    status: 'pending', note: '', userId: 'inactive',
  };
  r = res();
  await depositReviewH(req('POST', auth(ADMIN), { depositId: 'legacy_d1', action: 'approve' }), r);
  check('deposit without user-side mirror approves → 200', r.statusCode === 200, `(${r.statusCode} ${r.body})`);
  check('account activated + bonus flag recorded', store.docs['users/inactive'].isActive === true && store.docs['users/inactive'].activationBonusGiven === true, JSON.stringify(store.docs['users/inactive']));
  r = res();
  await depositReviewH(req('POST', auth(ADMIN), { depositId: 'legacy_d1', action: 'approve' }), r);
  check('second deposit approve → 409 (one-shot)', r.statusCode === 409, `(${r.statusCode})`);

  /* ---------- K2: guards must run INSIDE the transaction ---------- */
  const src = f => fs.readFileSync(f, 'utf8');
  const inTx = (file, needle) => {
    const t = src(file);
    const i = t.indexOf('runTransaction(async tx => {');
    if (i < 0) return false;
    return t.slice(i).includes(needle) && t.slice(0, i).indexOf(needle) === -1;
  };
  check('proof submit: daily-limit count is read inside the tx', inTx('api/proof/submit.js', "tx.get(userProofs.where('day'"));
  check('withdrawal: pending guard is read inside the tx', inTx('api/withdrawal/request.js', "tx.get(wdCol.where('status', '==', 'pending')"));
  check('deposit: pending guard is read inside the tx', inTx('api/deposit/submit.js', "tx.get(depCol.where('status', '==', 'pending')"));
  check('register: profile + email/mobile uniqueness read inside the tx',
    inTx('api/user/register.js', 'tx.get(userRef)') && inTx('api/user/register.js', "tx.get(db.collection('users').where('email'"));
  check('no handler does the pending/day query outside the tx anymore',
    !/const pendingQ = await db\.collection/.test(src('api/withdrawal/request.js')) &&
    !/const pendingQ = await db\.collection/.test(src('api/deposit/submit.js')) &&
    !/const todayQ = await userProofs\.where/.test(src('api/proof/submit.js')));

  /* ---------- K3: error hygiene (opFail) — no internal leak, right status ---------- */
  const { opFail, ApiError, readBody } = await import('../lib/http.js');
  r = res();
  opFail(r, Object.assign(new Error('14 UNAVAILABLE: 7 internal detail from googleapis'), { code: 14 }));
  check('SDK/infra error → 503 retryable (not 409)', r.statusCode === 503, `(${r.statusCode})`);
  check('SDK error text is never sent to the client', !/UNAVAILABLE|internal detail|googleapis/.test(r.body), r.body);
  r = res();
  opFail(r, new Error('পর্যাপ্ত ব্যালেন্স নেই'));
  check('handler-written message still passes through with 409', r.statusCode === 409 && /ব্যালেন্স নেই/.test(r.body), `(${r.statusCode} ${r.body})`);
  r = res();
  opFail(r, new ApiError(429, 'আজকের লিমিট শেষ'));
  check('ApiError keeps its own status (429 daily limit intact)', r.statusCode === 429, `(${r.statusCode} ${r.body})`);

  /* oversized body must resolve (it used to hang until the function timed out) */
  const hang = await new Promise(resolve => {
    const big = 'x'.repeat(200000);
    const fakeReq = {
      headers: {},
      on(ev, cb) {
        if (ev === 'data') setImmediate(() => cb(Buffer.from(big)));
        if (ev === 'end') setImmediate(() => cb());
      },
      destroy() { this._destroyed = true; },
    };
    const timer = setTimeout(() => resolve('HUNG'), 1500);
    readBody(fakeReq).then(v => { clearTimeout(timer); resolve(v); });
  });
  check('readBody: oversized body resolves (no hang) instead of leaving the lambda stuck', hang !== 'HUNG' && hang && typeof hang === 'object' && Object.keys(hang).length === 0, JSON.stringify(hang));

  /* malformed JSON body must not 500 */
  r = res();
  await ensureH({
    method: 'POST', url: '/api/user/ensure',
    headers: { ...auth('TOKEN_CAROL'), 'content-type': 'application/json' },
    on(ev, cb) {
      if (ev === 'data') setImmediate(() => cb(Buffer.from('{not json')));
      if (ev === 'end') setImmediate(() => cb());
    },
  }, r);
  check('malformed JSON body → validated 400/200 path, never an unhandled 500', r.statusCode === 200 || r.statusCode === 400, `(${r.statusCode} ${r.body})`);

  /* ---------- K4: infra failure never leaks (check / ensure / set-active) ---------- */
  fake.setInitFailure('Firebase Admin env variables missing (FIREBASE_PROJECT_ID / FIREBASE_CLIENT_EMAIL / FIREBASE_PRIVATE_KEY)');
  r = res();
  await checkH(req('POST', {}, { email: 'a@b.com' }), r);
  check('/api/user/check: 503 on infra failure', r.statusCode === 503, `(${r.statusCode} ${r.body})`);
  check('/api/user/check: env var names not leaked to anonymous callers', !/FIREBASE_|env variables|Admin/.test(r.body), r.body);
  r = res();
  await ensureH(req('POST', auth(A), {}), r);
  check('/api/user/ensure: infra failure → 503, no stack/SDK internals', r.statusCode === 503 && !/at .*\.js|FirebaseError|Error:|undefined:/.test(r.body), `(${r.statusCode} ${r.body})`);
  r = res();
  await setActiveH(req('POST', auth(ADMIN), { uid: 'alice', active: true }), r);
  check('admin set-active: infra failure → 503 (never an empty 500)', r.statusCode === 503, `(${r.statusCode} ${r.body})`);
  fake.setInitFailure(null);

  r = res();
  await setActiveH(req('POST', auth(ADMIN), { uid: 'ghost-user', active: true }), r);
  check('set-active unknown uid → 404 (contract unchanged)', r.statusCode === 404, `(${r.statusCode} ${r.body})`);
  r = res();
  await setActiveH(req('POST', auth(A), { uid: 'alice', active: false }), r);
  check('non-admin token → 403 on set-active (no unauthorized admin access)', r.statusCode === 403, `(${r.statusCode} ${r.body})`);
}

/* ============================================================
   [L] Dynamic task input fields (admin-controlled) — server side
   ============================================================ */
console.log('\n[L] dynamic fields: admin config drives validation + stored snapshot');
{
  const fs = await import('node:fs');
  const H = await import('../lib/http.js');
  const fake = await import('./mocks/firebase-admin-fake.mjs');
  fake.TOKENS.TOKEN_DYN = { uid: 'dynu', email: 'dyn@e.com' };
  fake.TOKENS.TOKEN_DYN2 = { uid: 'dynu2', email: 'dyn2@e.com' };
  store.docs['users/dynu2'] = { name: 'Dyn U2', email: 'dyn2@e.com', mobile: '01712345672', balance: 0, totalEarned: 0, isActive: true, refCode: 'DYN2' };

  check('FIELD_TYPES/FIELD_MAXLEN/fieldType/fieldMaxLen exported (one source of truth)', ['FIELD_TYPES','FIELD_MAXLEN','fieldType','fieldMaxLen'].every(k => k in H));
  check('textarea is a supported field type', H.FIELD_TYPES.includes('textarea'), JSON.stringify(H.FIELD_TYPES));
  check('fieldMaxLen: textarea 2000, url 300, email 120, tel 20', H.fieldMaxLen('textarea') === 2000 && H.fieldMaxLen('url') === 300 && H.fieldMaxLen('email') === 120 && H.fieldMaxLen('tel') === 20);
  check('unknown type falls back to text (never a raw type attribute)', H.fieldType('script') === 'text' && H.fieldType('') === 'text');
  const subSrc = fs.readFileSync('api/proof/submit.js', 'utf8');
  check('submit handler has no local type list anymore (imports the shared one)', !/const FIELD_TYPES = \[/.test(subSrc) && /fieldMaxLen, fieldType/.test(subSrc));
  check('no task-specific field names hardcoded server-side', !/['"](gid|uid|জিমেইল এড্রেস|Cookies|2FA Key)['"]/.test(subSrc));

  store.docs['tasks/dyn-sale'] = {
    nameBn: 'ডায়নামিক সেল', reward: 7, enabled: true, dailyLimit: 5,
    inputFields: [
      { label: 'UID', type: 'text', required: true },
      { label: 'Password', type: 'password', required: true },
      { label: 'Cookies', type: 'textarea', required: false },
      { label: 'Profile Link', type: 'url', required: false },
    ],
  };
  store.docs['users/dynu'] = { name: 'Dyn U', email: 'dyn@e.com', mobile: '01712345671', balance: 0, totalEarned: 0, isActive: true, refCode: 'DYN1' };

  const cookies = 'c_session=' + 'a'.repeat(400) + '\nsecond line';
  let r = res();
  await submitH(req('POST', auth('TOKEN_DYN'), {
    taskSlug: 'dyn-sale',
    data: { UID: 'dyn-1', Password: 'p@ss', Cookies: cookies, 'Profile Link': 'https://fb.com/dyn-1' },
  }, 'http://x/api/proof/submit'), r);
  check('submit with admin-configured fields → 200', r.statusCode === 200, `(${r.statusCode} ${r.body})`);
  const pid = JSON.parse(r.body).id;
  const saved = store.docs['users/dynu/proofs/' + pid] || {};
  check('value saved per configured label (submittedData kept for compat)', saved.submittedData && saved.submittedData.UID === 'dyn-1' && saved.submittedData['Profile Link'] === 'https://fb.com/dyn-1', JSON.stringify(saved.submittedData));
  check('textarea value stored intact (multi-line, 400+ chars)', !!saved.submittedData && saved.submittedData.Cookies.length > 410 && saved.submittedData.Cookies.includes('second line'), `(len ${saved.submittedData && saved.submittedData.Cookies.length})`);
  const snap = saved.submittedFields;
  check('snapshot stores title + type + value for every field', Array.isArray(snap) && snap.length === 4 && snap.every(f => typeof f.label === 'string' && typeof f.type === 'string' && typeof f.value === 'string'), JSON.stringify(snap && snap.map(f => [f.label, f.type])));
  check('types come from the admin config, not the client', !!snap && snap[1].type === 'password' && snap[2].type === 'textarea' && snap[3].type === 'url', JSON.stringify(snap && snap.map(f => f.type)));
  check('required flag recorded (admin sees empty required fields)', !!snap && snap[0].required === true && snap[2].required === false, JSON.stringify(snap && snap.map(f => f.required)));
  check('duplicate key still derived from the first non-password field', String(saved.accountKey || '').startsWith('dyn-sale__dyn-1'), saved.accountKey);
  check('review queue mirror carries the same snapshot', !!(store.docs['proofs/' + pid] && store.docs['proofs/' + pid].submittedFields.length === 4));

  r = res();
  await submitH(req('POST', auth('TOKEN_DYN'), { taskSlug: 'dyn-sale', data: { UID: 'x2', Password: 'p', 'Profile Link': 'javascript:alert(1)' } }, 'http://x/api/proof/submit'), r);
  check('url field rejects non-http value', r.statusCode === 400 && /লিংক/.test(JSON.parse(r.body).error), `(${r.statusCode} ${r.body})`);
  r = res();
  await submitH(req('POST', auth('TOKEN_DYN'), { taskSlug: 'dyn-sale', data: { Password: 'p', Cookies: 'x' } }, 'http://x/api/proof/submit'), r);
  check('required UID missing → 400 naming the field', r.statusCode === 400 && /UID/.test(JSON.parse(r.body).error), `(${r.body})`);
  r = res();
  await submitH(req('POST', auth('TOKEN_DYN'), { taskSlug: 'dyn-sale', data: { UID: 'x3', Password: 'p', Cookies: 'x'.repeat(2001) } }, 'http://x/api/proof/submit'), r);
  check('textarea over 2000 chars → 400 (per-type limit enforced)', r.statusCode === 400 && /লম্বা/.test(JSON.parse(r.body).error), `(${r.statusCode} ${r.body})`);
  r = res();
  await submitH(req('POST', auth('TOKEN_DYN'), { taskSlug: 'dyn-sale', data: { UID: 'x4', Password: 'p', 'Extra Secret': 'boom' } }, 'http://x/api/proof/submit'), r);
  check('field the admin never configured → 400 (client cannot add its own keys)', r.statusCode === 400 && /invalid field/.test(JSON.parse(r.body).error), `(${r.statusCode} ${r.body})`);

  /* textarea + total-size guard আলাদা না থাকলে ৩টা বড় textarea "অনেক বড়" হতো */
  store.docs['tasks/many-cookies'] = {
    nameBn: 'Many Cookies', reward: 3, enabled: true,
    inputFields: [
      { label: 'UID', type: 'text', required: true },
      { label: 'Cookies A', type: 'textarea', required: false },
      { label: 'Cookies B', type: 'textarea', required: false },
      { label: 'Cookies C', type: 'textarea', required: false },
    ],
  };
  r = res();
  await submitH(req('POST', auth('TOKEN_DYN2'), { taskSlug: 'many-cookies', data: { UID: 'big-1', 'Cookies A': 'k='.padEnd(1800, 'a'), 'Cookies B': 'k='.padEnd(1800, 'b'), 'Cookies C': 'k='.padEnd(1800, 'c') } }, 'http://x/api/proof/submit'), r);
  check('3 × ~1.8KB textarea values accepted (guard sized for textarea)', r.statusCode === 200, `(${r.statusCode} ${r.body})`);
  /* ১৫টা textarea × ১৯০০ অক্ষর = ~28KB — প্রতিটা field বৈধ, মোট payload অস্বাভাবিক বড় */
  store.docs['tasks/huge-cookies'] = {
    nameBn: 'Huge Cookies', reward: 3, enabled: true,
    inputFields: [{ label: 'UID', type: 'text', required: true },
      ...Array.from({ length: 15 }, (_, i) => ({ label: 'Blob' + i, type: 'textarea', required: false }))],
  };
  const hugeData = { UID: 'big-2' };
  for (let i = 0; i < 15; i++) hugeData['Blob' + i] = 'z'.repeat(1900);
  r = res();
  await submitH(req('POST', auth('TOKEN_DYN2'), { taskSlug: 'huge-cookies', data: hugeData }, 'http://x/api/proof/submit'), r);
  check('total payload guard still rejects an oversized submission (24KB)', r.statusCode === 400 && /বড়/.test(JSON.parse(r.body).error), `(${r.statusCode} ${r.body})`);

  store.docs['tasks/big-sale'] = {
    nameBn: 'বড় সেল', reward: 1, enabled: true,
    inputFields: Array.from({ length: 21 }, (_, i) => ({ label: 'F' + i, type: 'text', required: false })),
  };
  r = res();
  await submitH(req('POST', auth('TOKEN_DYN'), { taskSlug: 'big-sale', data: {} }, 'http://x/api/proof/submit'), r);
  check('more than 20 configured fields → 400', r.statusCode === 400 && /২০/.test(JSON.parse(r.body).error), `(${r.statusCode} ${r.body})`);

  store.docs['tasks/nofields'] = { nameBn: 'নো ফিল্ড', reward: 2, enabled: true };
  r = res();
  await submitH(req('POST', auth('TOKEN_DYN'), { taskSlug: 'nofields', data: {} }, 'http://x/api/proof/submit'), r);
  check('legacy task without inputFields still accepts a submission', r.statusCode === 200, `(${r.statusCode} ${r.body})`);
  const ndoc = store.docs['users/dynu/proofs/' + JSON.parse(r.body).id] || {};
  check('empty snapshot for a field-less task (admin uses the legacy fallback)', Array.isArray(ndoc.submittedFields) && ndoc.submittedFields.length === 0, JSON.stringify(ndoc.submittedFields));
}

console.log('\n=============================');
console.log(`RESULT: ${pass} passed, ${failN} failed`);
console.log('=============================');
if (failN) process.exit(1);
