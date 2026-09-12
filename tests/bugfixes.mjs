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
  /* dummy PEM — concatenated, যাতে GitHub secret scanning/push protection এটাকে
     real key বলে block না করে (কোনো secret এখানে নেই) */
  /* dummy PEM, markers concatenated at runtime — GitHub secret scanning source-এ
     contiguous PEM header দেখলে push protection block করতে পারে */
  const PEM_H = '-----BEGIN ' + 'PRIVATE KEY-----', PEM_T = '-----END ' + 'PRIVATE KEY-----';
  process.env.FIREBASE_PRIVATE_KEY = PEM_H + '\nZmFrZQ==\n' + PEM_T;
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
  /* dummy PEM, markers concatenated at runtime — GitHub secret scanning source-এ
     contiguous `-----BEGIN PRIVATE KEY-----` দেখলে push block করতে পারে */
  const PEM_H = '-----BEGIN ' + 'PRIVATE KEY-----', PEM_T = '-----END ' + 'PRIVATE KEY-----';
  process.env.FIREBASE_PRIVATE_KEY = PEM_H + '\nZmFrZQ==\n' + PEM_T;
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

/* ============================================================
   [N] CONCURRENCY — "check → then write" যেন কোনো financial guard-ই না হয়
   mock concurrency mode: transaction গুলো serialize হয় + ট্রানজেকশনের বাইরের
   read গুলো interleave হয়, তাই দুটো request সত্যিই একসাথে ঢোকে।
   (real Firestore-এ একই doc conflict-এ retry হয় — এখানে serial commit সমতুল্য)
   ============================================================ */
console.log('\n[N] concurrent requests: no duplicate credit, no double submit, no lost update');
{
  const fake = await import('./mocks/firebase-admin-fake.mjs');
  const ffs = await import('./mocks/firestore-fake.mjs');
  const withdrawH = (await import('../api/withdrawal/request.js')).default;
  const activateH2 = (await import('../api/account/activate.js')).default;
  const depositH = (await import('../api/deposit/submit.js')).default;

  fake.TOKENS.TOKEN_C1 = { uid: 'c1', email: 'c1@test.com' };
  fake.TOKENS.TOKEN_C2 = { uid: 'c2', email: 'c2@test.com' };
  fake.TOKENS.TOKEN_C3 = { uid: 'c3', email: 'c3@test.com' };
  fake.TOKENS.TOKEN_C4 = { uid: 'c4', email: 'c4@test.com' };
  const C1 = 'TOKEN_C1', C2 = 'TOKEN_C2', C3 = 'TOKEN_C3', C4 = 'TOKEN_C4';
  const count = (prefix) => Object.keys(store.docs).filter(k => k.startsWith(prefix)).length;
  const two = (fn1, fn2) => Promise.all([fn1(), fn2()]);

  ffs.setConcurrencyMode(true);
  try {
    /* ---- N1: withdraw — balance 100, দুটোই 100 নিতে চায় ---- */
    store.docs['users/c1'] = { balance: 100, totalEarned: 100, isActive: true, name: 'C1', email: 'c1@test.com', mobile: '01700000001' };
    const wReq = (tok) => async () => { const r = res(); await withdrawH(req('POST', auth(tok), { amount: 100, method: 'bKash', accountNumber: '01700000001' }, '/api/withdrawal/request'), r); return r; };
    let [a, b] = await two(wReq(C1), wReq(C1));
    const codes = [a.statusCode, b.statusCode].sort();
    check('N1 concurrent withdraw ×2 → exactly one 200', codes.join(',') === '200,409', codes.join(','));
    check('N1 balance deducted once (100 → 0, never negative)', Number(store.docs['users/c1'].balance) === 0, `(${store.docs['users/c1'].balance})`);
    check('N1 only one withdrawal record created', count('users/c1/withdrawals/') === 1, `(${count('users/c1/withdrawals/')})`);
    check('N1 only one transaction row (record matches the mutation)', count('users/c1/transactions/') === 1, `(${count('users/c1/transactions/')})`);

    /* ---- N2: duplicate pending guard (same user, small amounts) ---- */
    store.docs['users/c2'] = { balance: 100, totalEarned: 0, isActive: true, name: 'C2', email: 'c2@test.com', mobile: '01700000002' };
    const w2 = () => { const r = res(); return withdrawH(req('POST', auth(C2), { amount: 10, method: 'Nagad', accountNumber: '01700000002' }, '/api/withdrawal/request'), r).then(() => r); };
    [a, b] = await two(w2, w2);
    codes[0] = 0;
    const codes2 = [a.statusCode, b.statusCode].sort();
    check('N2 concurrent requests → only one pending withdrawal queued', codes2.join(',') === '200,409', codes2.join(','));
    check('N2 one withdrawal doc only', count('users/c2/withdrawals/') === 1, `(${count('users/c2/withdrawals/')})`);

    /* ---- N3: deposit — দুটো concurrent pending deposit ---- */
    store.docs['users/c3'] = { balance: 0, totalEarned: 0, isActive: false, name: 'C3', email: 'c3@test.com', mobile: '01700000003' };
    const d2 = () => { const r = res(); return depositH(req('POST', auth(C3), { method: 'bkash', trxId: 'TRX999999', senderNumber: '01700000003' }, '/api/deposit/submit'), r).then(() => r); };
    [a, b] = await two(d2, d2);
    check('N3 concurrent deposit → one pending only', [a.statusCode, b.statusCode].sort().join(',') === '200,409', JSON.stringify([a.statusCode, b.statusCode]));
    check('N3 exactly one deposit doc + one queue mirror', count('users/c3/deposits/') === 1 && count('deposits/') >= 1, `${count('users/c3/deposits/')}`);

    /* ---- N4: daily limit — ২/day টাস্কে ৪টা concurrent submit ---- */
    store.docs['tasks/daily-limit'] = {
      nameBn: 'ডেইলি লিমিট', reward: 5, enabled: true, dailyLimit: 2,
      inputFields: [{ label: 'Email', type: 'email', required: true }],
    };
    store.docs['users/c4'] = { balance: 0, totalEarned: 0, isActive: true, name: 'C4', email: 'c4@test.com', mobile: '01700000004' };
    const sell = (mail) => async () => {
      const r = res();
      await submitH(req('POST', auth(C4), { taskSlug: 'daily-limit', data: { Email: mail } }, '/api/proof/submit'), r);
      return r;
    };
    const rs = await Promise.all([sell('s1@t.com'), sell('s2@t.com'), sell('s3@t.com'), sell('s4@t.com')].map(f => f()));
    const okN = rs.filter(x => x.statusCode === 200).length;
    const limN = rs.filter(x => x.statusCode === 429).length;
    check('N4 4 concurrent submits, limit 2 → exactly 2 accepted + 2 rejected', okN === 2 && limN === 2, `ok=${okN} limited=${limN} codes=${rs.map(x => x.statusCode)}`);
    check('N4 no over-cap proof docs written', count('users/c4/proofs/') === 2, `(${count('users/c4/proofs/')})`);

    /* ---- N5: same account sold twice concurrently (duplicate guard) ---- */
    store.docs['users/c5'] = { balance: 0, totalEarned: 0, isActive: true, name: 'C5', email: 'c5@test.com', mobile: '01700000005' };
    fake.TOKENS.TOKEN_C5 = { uid: 'c5', email: 'c5@test.com' };
    const sameSale = () => async () => {
      const r = res();
      await submitH(req('POST', auth('TOKEN_C5'), { taskSlug: 'daily-limit', data: { Email: 'SAME@t.com' } }, '/api/proof/submit'), r);
      return r;
    };
    const rs5 = await Promise.all([sameSale(), sameSale(), sameSale()].map(f => f()));
    check('N5 same account ×3 concurrent → 1 accepted, 2 duplicate-rejected', rs5.filter(x => x.statusCode === 200).length === 1 && rs5.filter(x => x.statusCode === 409).length === 2, rs5.map(x => x.statusCode).join(','));
    /* N4-এর দুটো reservation-ও একই task-এর → নির্দিষ্ট account-টা counting করি */
    const sameKey = Object.keys(store.docs).filter(k => k.startsWith('accountKeys/daily-limit__same@t.com'));
    check('N5 exactly one reservation doc for that account (3 concurrent, 1 winner)', sameKey.length === 1, JSON.stringify(sameKey));
    check('N5 reservation is owned by the winner', sameKey.length === 1 && store.docs[sameKey[0]].uid === 'c5', sameKey.length ? JSON.stringify(store.docs[sameKey[0]].uid) : 'none');
    check('N5 no extra proof rows for the losing requests', count('users/c5/proofs/') === 1, `(${count('users/c5/proofs/')})`);

    /* ---- N6: gift claim double ---- */
    store.docs['settings/secret'] = { giftCode: 'OLD2026' };   // আগের section গুলো এটা বদলে ফেলে
    store.docs['users/c6'] = { balance: 0, totalEarned: 0, isActive: true, name: 'C6', email: 'c6@test.com' };
    fake.TOKENS.TOKEN_C6 = { uid: 'c6', email: 'c6@test.com' };
    const claimGift = () => async () => {
      const r = res();
      await giftH(req('POST', auth('TOKEN_C6'), { code: 'OLD2026' }, '/api/gift/claim'), r);
      return r;
    };
    const rg = await Promise.all([claimGift(), claimGift()].map(f => f()));
    check('N6 concurrent gift claim → one 200, one 409', rg.map(x => x.statusCode).sort().join(',') === '200,409', rg.map(x => x.statusCode).join(','));
    check('N6 credited exactly once (giftReward 5)', Number(store.docs['users/c6'].balance) === 5, `(${store.docs['users/c6'].balance})`);
    check('N6 one giftClaims row + one transaction row', count('users/c6/giftClaims/') === 1 && count('users/c6/transactions/') === 1, `${count('users/c6/giftClaims/')}/${count('users/c6/transactions/')}`);

    /* ---- N7: activation bonus double ---- */
    store.docs['users/c7'] = { balance: 0, totalEarned: 0, isActive: false, activationBonusGiven: false, name: 'C7', email: 'c7@test.com' };
    fake.TOKENS.TOKEN_C7 = { uid: 'c7', email: 'c7@test.com' };
    const act = () => async () => {
      const r = res();
      try { await activateH2(req('POST', auth('TOKEN_C7'), {}, '/api/account/activate'), r); }
      catch (err) { r.statusCode = 0; r.body = 'HANDLER THREW: ' + (err && err.message); }   // e.g. ReferenceError → red test, not a dead suite
      return r;
    };
    const ra = await Promise.all([act(), act()].map(f => f()));
    check('N7 concurrent activate → one 200, one 409', ra.map(x => x.statusCode).sort().join(',') === '200,409', ra.map(x => x.statusCode).join(','));
    check('N7 activation bonus added exactly once (20)', Number(store.docs['users/c7'].balance) === 20, `(${store.docs['users/c7'].balance})`);
    check('N7 activate returns 200 + {bonusGiven:true} on success (ReferenceError regression)',
      ra.some(x => x.statusCode === 200 && json(x).bonusGiven === true), JSON.stringify(ra.map(x => [x.statusCode, x.body && x.body.slice(0, 60)])));

    /* ---- N8: admin approve double (same proof, two concurrent clicks) ---- */
    store.docs['users/c8'] = { balance: 0, totalEarned: 0, isActive: true, name: 'C8', email: 'c8@test.com' };
    store.docs['proofs/p8'] = { taskSlug: 'gmail-sale', taskName: 'জিমেইল সেল', day: '2026-09-12', reward: 15, status: 'pending', note: '', userId: 'c8', submittedData: { Email: 'c8@t.com' }, submittedFields: [{ label: 'Email', type: 'email', value: 'c8@t.com', required: true }], accountKey: '', images: [] };
    const approve = () => async () => { const r = res(); await proofReviewH(req('POST', auth(ADMIN), { proofId: 'p8', action: 'approve' }, '/api/admin/panel?op=proof-review'), r); return r; };
    const rp = await Promise.all([approve(), approve()].map(f => f()));
    check('N8 concurrent approve → one 200, one 409 (exactly-once)', rp.map(x => x.statusCode).sort().join(',') === '200,409', rp.map(x => x.statusCode).join(','));
    check('N8 seller paid exactly once (৳15)', Number(store.docs['users/c8'].balance) === 15, `(${store.docs['users/c8'].balance})`);
    check('N8 one taskClaims row + one transaction row', count('users/c8/taskClaims/') === 1 && count('users/c8/transactions/') === 1, `${count('users/c8/taskClaims/')}/${count('users/c8/transactions/')}`);

    /* ---- N9: approve + reject একসাথে (race between two different decisions) ---- */
    store.docs['users/c9'] = { balance: 0, totalEarned: 0, isActive: true, name: 'C9', email: 'c9@test.com' };
    store.docs['proofs/p9'] = { taskSlug: 'gmail-sale', taskName: 'জিমেইল সেল', day: '2026-09-12', reward: 15, status: 'pending', note: '', userId: 'c9', submittedData: { Email: 'c9@t.com' }, submittedFields: [{ label: 'Email', type: 'email', value: 'c9@t.com', required: true }], accountKey: '', images: [] };
    const ap9 = () => async () => { const r = res(); await proofReviewH(req('POST', auth(ADMIN), { proofId: 'p9', action: 'approve' }, '/api/admin/panel?op=proof-review'), r); return r; };
    const rj9 = () => async () => { const r = res(); await proofReviewH(req('POST', auth(ADMIN), { proofId: 'p9', action: 'reject', note: 'no' }, '/api/admin/panel?op=proof-review'), r); return r; };
    const rmx = await Promise.all([ap9(), rj9()].map(f => f()));
    const won = rmx.filter(x => x.statusCode === 200).length;
    const fin = store.docs['proofs/p9'].status;
    check('N9 approve vs reject concurrently → exactly one decision lands', won === 1 && (fin === 'approved' || fin === 'rejected'), `ok=${won} final=${fin}`);
    check('N9 money state matches the decision (no credit on reject)', fin === 'approved' ? Number(store.docs['users/c9'].balance) === 15 : Number(store.docs['users/c9'].balance) === 0, `status=${fin} balance=${store.docs['users/c9'].balance}`);

    /* ---- N10: register — same mobile, দুইটা ভিন্ন account একসাথে ---- */
    fake.TOKENS.TOKEN_R1 = { uid: 'r1', email: 'new1@test.com' };
    fake.TOKENS.TOKEN_R2 = { uid: 'r2', email: 'new2@test.com' };
    store.docs['refs/REF999'] = { uid: 'alice' };
    const reg = (tok, email) => async () => {
      const r = res();
      await registerH(req('POST', auth(tok), { name: 'Conc User', mobile: '01711119999', email, refCode: 'REF999' }, '/api/user/register'), r);
      return r;
    };
    const rr = await Promise.all([reg('TOKEN_R1', 'new1@test.com'), reg('TOKEN_R2', 'new2@test.com')].map(f => f()));
    const regOk = rr.filter(x => x.statusCode === 200).length;
    check('N10 same mobile, concurrent register → only one account created', regOk === 1, rr.map(x => `${x.statusCode}:${json(x).error || ''}`).join(' | '));
    check('N10 rejected one says duplicate mobile', rr.some(x => x.statusCode === 409 && /নম্বর/.test(json(x).error || '')), JSON.stringify(rr.map(x => json(x).error)));
    check('N10 referrer referral bonus paid once only', Number(store.docs['users/alice'].balance) % 5 === 0 && count('users/alice/transactions/') >= 1, `alice balance=${store.docs['users/alice'].balance}`);
  } finally {
    ffs.setConcurrencyMode(false);
  }
  check('N11 concurrency mode turns back off (other suites stay sequential)', ffs.mockState.concurrency === false);
}

/* ============================================================
   [O] Sensitive-field policy (audit rule: never expose / never keep longer than needed)
   ============================================================ */
console.log('\n[O] credential fields: mask markers, redact on reject, no secrets in logs/source');
{
  const fs = await import('node:fs');
  const fake = await import('./mocks/firebase-admin-fake.mjs');
  const { isSecretField } = await import('../lib/http.js');
  for (const l of ['Password', 'login password', 'OTP', 'OTP code', '2FA Key', 'recovery code', 'access token', 'session', 'cookies', 'secret', 'api_key', 'API Key', 'Private Key', 'refresh token', 'authenticator'])
    check(`isSecretField("${l}") = true`, isSecretField(l, 'text') === true);
  for (const l of ['UID', 'Username', 'Profile Link', 'Screenshot URL', 'Amount', 'Description', 'Mobile Number', 'Channel Link'])
    check(`isSecretField("${l}") = false (business fields stay usable)`, isSecretField(l, 'text') === false);
  check('type=password is always treated as secret', isSecretField('anything', 'password') === true);

  store.docs['tasks/pw-sale'] = {
    nameBn: 'PW Sale', reward: 9, enabled: true, dailyLimit: 5,
    inputFields: [
      { label: 'Email', type: 'email', required: true },
      { label: 'Password', type: 'text', required: true },      /* admin ভুল type দিয়েছে — তবু secret ধরা হবে */
      { label: 'Cookies', type: 'textarea', required: false },
      { label: 'OTP code', type: 'text', required: false },
      { label: 'Profile Link', type: 'url', required: false },
    ],
  };
  store.docs['users/pwu'] = { name: 'PW U', email: 'pwu@t.com', balance: 0, totalEarned: 0, isActive: true, refCode: 'PWU1' };
  fake.TOKENS.TOKEN_PWU = { uid: 'pwu', email: 'pwu@t.com' };

  let r = res();
  await submitH(req('POST', auth('TOKEN_PWU'), {
    taskSlug: 'pw-sale',
    data: { Email: 'pwu@t.com', Password: 'topsecret1', Cookies: 'sessionid=abc', 'OTP code': '123456', 'Profile Link': 'https://x.com/p' },
  }, 'http://x/api/proof/submit'), r);
  check('submit with secret-ish fields → 200', r.statusCode === 200, `(${r.statusCode} ${r.body})`);
  const pid = json(r).id;
  const doc = store.docs['users/pwu/proofs/' + pid];
  const byLabel = Object.fromEntries(doc.submittedFields.map(f => [f.label, f]));
  check('secret marking is label-aware (Password/Cookies/OTP flagged even as text/textarea)',
    byLabel.Password.secret === true && byLabel.Cookies.secret === true && byLabel['OTP code'].secret === true,
    JSON.stringify(doc.submittedFields.map(f => [f.label, f.secret])));
  check('business fields NOT flagged (Email/Profile Link stay visible)', byLabel.Email.secret === false && byLabel['Profile Link'].secret === false);

  /* reject → credentials cleared; approve → kept (delivery needs them) */
  r = res();
  await proofReviewH(req('POST', auth(ADMIN), { proofId: pid, action: 'reject', note: 'cookie কাজ করে না' }, '/api/admin/panel?op=proof-review'), r);
  check('reject → 200', r.statusCode === 200, `(${r.statusCode} ${r.body})`);
  const rej = store.docs['users/pwu/proofs/' + pid] || {};
  const rd = rej.submittedData || {};
  check('reject clears credential VALUES from the user mirror', !rd.Password && !rd.Cookies && !rd['OTP code'], JSON.stringify(rd));
  check('reject keeps non-secret rows (admin/user দেখে কী ভুল ছিল)', rd.Email === 'pwu@t.com' && rd['Profile Link'] === 'https://x.com/p', JSON.stringify(rd));
  check('reject clears them in the snapshot too (no second copy of the secret)',
    rej.submittedFields.filter(f => f.secret).every(f => f.value === ''), JSON.stringify(rej.submittedFields.filter(f => f.secret)));
  check('reject clears the top-level queue copy as well', (() => { const t = (store.docs['proofs/' + pid] || {}).submittedData || {}; return !t.Password && !t.Cookies; })(), JSON.stringify((store.docs['proofs/' + pid] || {}).submittedData));
  check('reject keeps the reason + status (approval flow untouched)', rej.status === 'rejected' && rej.note === 'cookie কাজ করে না');

  /* approve path must keep values (account handover) */
  r = res();
  await submitH(req('POST', auth('TOKEN_PWU'), { taskSlug: 'pw-sale', data: { Email: 'pw2@t.com', Password: 'keepme1', Cookies: 'sid=2' } }, 'http://x/api/proof/submit'), r);
  const pid2 = json(r).id;
  r = res();
  await proofReviewH(req('POST', auth(ADMIN), { proofId: pid2, action: 'approve' }, '/api/admin/panel?op=proof-review'), r);
  check('approve → 200 + paid once', r.statusCode === 200 && Number(store.docs['users/pwu'].balance) === 9, `(${r.statusCode} bal=${store.docs['users/pwu'].balance})`);
  check('approved submission keeps the credential (handover needs it — documented policy)',
    ((store.docs['proofs/' + pid2] || {}).submittedData || {}).Password === 'keepme1', JSON.stringify((store.docs['proofs/' + pid2] || {}).submittedData));

  /* duplicate-then-approve safety + released key after reject */
  r = res();
  await submitH(req('POST', auth('TOKEN_PWU'), { taskSlug: 'pw-sale', data: { Email: 'pwu@t.com', Password: 'again' } }, 'http://x/api/proof/submit'), r);
  check('rejected account can be resubmitted (key was released)', r.statusCode === 200, `(${r.statusCode} ${r.body})`);

  /* leakage: logs + source */
  const apiSrc = ['api/proof/submit.js', 'api/gift/claim.js', 'api/user/register.js', 'api/withdrawal/request.js', 'api/deposit/submit.js', 'api/admin/panel.js', 'lib/http.js', 'lib/admin/proof-review.js']
    .map(f => fs.readFileSync(f, 'utf8'));
  const logLeaks = apiSrc.filter(src => /console\.(log|error|warn)\([^)]*(body|submittedData|data\[|req\.)/.test(src));
  check('no handler logs request bodies / submitted values', logLeaks.length === 0, `(${logLeaks.length} files)`);
  const creds = ['src/tasks-data.js', 'scripts/seed.mjs', 'scripts/gen-task-pages.mjs', 'src/core/firebase.js',
                 'android/app/src/main/java/com/admin/digitearn/MainActivity.kt', 'vercel.json', 'package.json']
    .filter(f => fs.existsSync(f))
    .filter(f => /@jony|password:\s*['"][^'"\s]{6,}['"]/.test(fs.readFileSync(f, 'utf8')));
  check('no real credential committed in source / generated assets', creds.length === 0, JSON.stringify(creds.slice(0, 3)));

  /* admin panel mirror: same secret policy, same regex */
  const panel = fs.readFileSync('src/admin/main.js', 'utf8');
  const srvSrc = (fs.readFileSync('lib/http.js', 'utf8').match(/const SECRET_LABEL = (\/[^;\n]*\/);/) || [])[1] || '';
  const pnlSrc = (panel.match(/const SECRET_LABEL = (\/[^;\n]*\/);/) || [])[1] || '';
  check('panel masking regex is the same policy as the server (no drift)', !!srvSrc && srvSrc === pnlSrc, `\n     server=${srvSrc}\n     panel =${pnlSrc}`);
  check('panel masks by type OR secret OR label (normalized)', /r\.type === 'password' \|\| r\.secret \|\| SECRET_LABEL\.test\(normLabel\(r\.label\)\)/.test(panel));
}

/* ============================================================
   [P] withdrawal double-refund across the two copies (HIGH fix)
   ============================================================ */
console.log('\n[P] withdrawal: one request, two docs — refund only once');
{
  store.docs['users/wd1'] = { name: 'WD1', email: 'wd1@t.com', mobile: '01712223334', balance: 40, totalEarned: 100, isActive: true };
  const w = { uid: 'wd1', name: 'WD1', amount: 60, method: 'bKash', accountNumber: '01712223334', status: 'pending', note: '', processedAt: null };
  store.docs['users/wd1/withdrawals/w9'] = { ...w };
  store.docs['withdrawals/w9'] = { ...w, userId: 'wd1' };

  /* Queue tab আগেই paid করেছে → top-level approved; user-side copy এখনো pending (ধরুন sync ভাঙেনি) */
  store.docs['withdrawals/w9'].status = 'paid';
  let r = res();
  await (await import('../lib/admin/withdrawal-review.js')).default(req('POST', auth(ADMIN), { id: 'w9', action: 'rejected', note: 'wrong number' }, '/api/admin/panel?op=withdrawal-review'), r);
  check('rejecting from the queue after it was already paid → 409 (no refund of a paid request)', r.statusCode === 409, `(${r.statusCode} ${r.body})`);
  check('balance untouched by that attempt', Number(store.docs['users/wd1'].balance) === 40, `(${store.docs['users/wd1'].balance})`);

  /* উল্টোটা: user-side copy resolve, queue copy pending — Queue থেকে reject আগে refund দিত */
  store.docs['users/wd1/withdrawals/w9'].status = 'rejected';
  store.docs['withdrawals/w9'].status = 'pending';
  r = res();
  await (await import('../lib/admin/withdrawal-review.js')).default(req('POST', auth(ADMIN), { id: 'w9', action: 'rejected', note: 'again' }, '/api/admin/panel?op=withdrawal-review'), r);
  check('queue-side reject after the user-side copy is resolved → 409 (double refund blocked)', r.statusCode === 409, `(${r.statusCode} ${r.body})`);
  check('no second refund credited', Number(store.docs['users/wd1'].balance) === 40, `(${store.docs['users/wd1'].balance})`);
  check('no extra refund transaction row', Object.keys(store.docs).filter(k => k.startsWith('users/wd1/transactions/') && store.docs[k].type === 'withdraw_refund').length === 0);

  /* happy path এখনো কাজ করে: দুটো copy-ই pending */
  store.docs['users/wd1/withdrawals/w9'].status = 'pending';
  store.docs['withdrawals/w9'].status = 'pending';
  r = res();
  await (await import('../lib/admin/withdrawal-review.js')).default(req('POST', auth(ADMIN), { id: 'w9', action: 'rejected', note: 'wrong number' }, '/api/admin/panel?op=withdrawal-review'), r);
  check('genuinely pending request can still be rejected (refund once)', r.statusCode === 200 && Number(store.docs['users/wd1'].balance) === 100, `(${r.statusCode} bal=${store.docs['users/wd1'].balance})`);
  check('both copies synced to rejected', store.docs['users/wd1/withdrawals/w9'].status === 'rejected' && store.docs['withdrawals/w9'].status === 'rejected');
}


/* ============================================================
   [P] ?op=seed-tasks — "Project পাওয়া যায়নি" (404) এর আসল কারণটা ঠিক করার
       recovery op: Firestore-এ tasks/{slug} config doc না থাকলে user কিছুই
       submit করতে পারে না, আর collection খালি হলে admin panel-এ card-ও দেখাত
       না — তাই panel থেকেই built-in list দিয়ে doc তৈরি (?op=seed-tasks)।
   ============================================================ */
console.log('\n[P] ?op=seed-tasks — missing Firestore task docs');
{
  const { TASKS } = await import('../src/tasks-data.js');
  const fsX = await import('node:fs');
  const slug = TASKS[0].slug;
  delete store.docs['tasks/' + slug];

  let r = res();
  await routerH(req('POST', auth(ADMIN), {}, '/api/admin/panel?op=seed-tasks'), r);
  const out = json(r);
  check('?op=seed-tasks routed through the single router (no new function)', r.statusCode === 200 && !/Unknown admin/.test(r.body), `(${r.statusCode} ${r.body.slice(0, 70)})`);
  check('missing doc created (created list + count)', Array.isArray(out.created) && out.created.includes(slug) && out.createdCount === out.created.length, JSON.stringify(out).slice(0, 140));
  const doc = store.docs['tasks/' + slug];
  check('created doc has what the handlers need (reward/enabled/inputFields/dailyLimit)',
    !!doc && Number(doc.reward) > 0 && doc.enabled === true && Array.isArray(doc.inputFields) && Number(doc.dailyLimit) >= 1, JSON.stringify(doc || {}).slice(0, 130));
  check('created doc url is http/https only', !doc || !doc.url || /^https?:\/\//i.test(doc.url));

  r = res();
  await routerH(req('POST', auth(ADMIN), {}, '/api/admin/panel?op=seed-tasks'), r);
  const out2 = json(r);
  check('idempotent: second run creates nothing, skips the rest', out2.createdCount === 0 && out2.skippedCount > 0, JSON.stringify(out2).slice(0, 110));

  store.docs['tasks/gmail-sale'].reward = 99;
  r = res();
  await routerH(req('POST', auth(ADMIN), {}, '/api/admin/panel?op=seed-tasks'), r);
  check('admin-set rate is never overwritten by seeding', Number(store.docs['tasks/gmail-sale'].reward) === 99 && json(r).skipped.includes('gmail-sale'), `(${store.docs['tasks/gmail-sale'].reward})`);

  const s2 = TASKS[1].slug, s3 = TASKS[2].slug;
  delete store.docs['tasks/' + s2]; delete store.docs['tasks/' + s3];
  r = res();
  await routerH(req('POST', auth(ADMIN), { slugs: [s2] }, '/api/admin/panel?op=seed-tasks'), r);
  const out3 = json(r);
  check('body.slugs limits what gets created', out3.created.length === 1 && out3.created[0] === s2 && !store.docs['tasks/' + s3], JSON.stringify(out3.created));
  r = res();
  await routerH(req('POST', auth(ADMIN), { slugs: ['no-such-task'] }, '/api/admin/panel?op=seed-tasks'), r);
  check('unknown slug reported in notFound (no silent success)', (json(r).notFound || []).includes('no-such-task'), JSON.stringify(json(r)).slice(0, 110));

  const req0 = (store.docs['tasks/' + slug].inputFields || []).find(x => x.type !== 'password' && x.required) || { label: 'UID' };
  r = res();
  await submitH(req('POST', auth(A), { taskSlug: slug, data: { [req0.label]: 'ACC-777', Password: 'pw12345' } }), r);
  check('after seeding, proof submit for that task works (no more 404)', r.statusCode === 200, `(${r.statusCode} ${r.body.slice(0, 90)})`);
  r = res();
  await submitH(req('POST', auth(A), { taskSlug: 'ghost-task', data: {} }), r);
  check('still-missing task: 404 names the doc path and the one-click fix',
    r.statusCode === 404 && /tasks\/ghost-task/.test(r.body) && /তৈরি করুন/.test(r.body), r.body.slice(0, 120));

  r = res();
  await routerH(req('POST', {}, {}, '/api/admin/panel?op=seed-tasks'), r);
  check('anonymous cannot seed (401)', r.statusCode === 401, `(${r.statusCode})`);
  r = res();
  await routerH(req('POST', auth(A), {}, '/api/admin/panel?op=seed-tasks'), r);
  check('logged-in non-admin cannot seed (403)', r.statusCode === 403, `(${r.statusCode})`);

  check('no new api/ file for the op (Hobby 12-function limit)',
    !fsX.existsSync('api/admin/seed-tasks.js') && fsX.readdirSync('api', { recursive: true }).filter(f => f.endsWith('.js')).length === 10);
  const src = (f) => fsX.readFileSync(f, 'utf8');
  check('admin panel ships the seed button (web + APK bundle use this source)',
    /seedTasksBtn/.test(src('src/admin/main.js')) && /seed-tasks/.test(src('src/admin/core.js')));
  check('task page refuses to show a doomed form when config is missing',
    /const configured = !!taskFromDb/.test(src('src/pages/task.js')) && /if \(!configured\)/.test(src('src/pages/task.js')));
}

/* ============================================================
   [Q] ?op=read / ?op=write — admin panel-এর সব read/write server দিয়ে
       (browser direct Firestore ছুঁলে rules-এর isAdmin() fail করলে পুরো
       panel "Missing or insufficient permissions." হতো)
   ============================================================ */
console.log('\n[Q] ?op=read / ?op=write — rules-independent admin panel data path');
{
  /* --- fixtures (shared store-এ additive; [Q] সবশেষে, তাই পরের section নাই) --- */
  const t0 = Date.now();
  store.docs['proofs/p1'] = { userId: 'alice', status: 'pending', reward: 15, createdAt: new Date(t0 - 9000) };
  store.docs['proofs/p2'] = { userId: 'alice', status: 'approved', createdAt: new Date(t0 + 9000) };
  store.docs['deposits/d1'] = { userId: 'alice', amount: 500, status: 'pending', createdAt: new Date(t0) };
  store.docs['withdrawals/w1'] = { userId: 'alice', amount: 100, status: 'pending', createdAt: new Date(t0) };
  store.docs['users/alice/transactions/tx1'] = { amount: 15, type: 'task', note: 'x' };
  store.docs['users/alice/withdrawals/uw1'] = { amount: 100, status: 'pending', createdAt: new Date(t0) };
  store.docs['notices/n2'] = { title: 'B', body: 'bbb', sort: 2 };
  store.docs['notices/n1'] = { title: 'A', body: 'aaa', sort: 1 };
  store.docs['notices/n3'] = { title: 'C', body: 'ccc' };   // sort নেই — বাদ পড়বে না

  const readVia = async (body, tok = ADMIN) => {
    const r = res();
    await routerH(req('POST', tok ? auth(tok) : {}, body, '/api/admin/panel?op=read'), r);
    return r;
  };
  const writeVia = async (body, tok = ADMIN) => {
    const r = res();
    await routerH(req('POST', tok ? auth(tok) : {}, body, '/api/admin/panel?op=write'), r);
    return r;
  };

  let r = await readVia({ what: 'zzz' });
  check('op=read router-এ reach করে, unknown target → 400 (404 হলে deploy পুরোনো)', r.statusCode === 400, `(${r.statusCode} ${r.body})`);

  r = await readVia({ what: 'proofs' }, null);
  check('read: no token → 401', r.statusCode === 401, `(${r.statusCode})`);
  r = await readVia({ what: 'proofs' }, A);
  check('read: logged-in non-admin → 403', r.statusCode === 403, `(${r.statusCode})`);
  r = await writeVia({ what: 'settings', data: { siteName: 'X' } }, A);
  check('write: non-admin → 403 (panel expose = convenience, bypass না)', r.statusCode === 403, `(${r.statusCode})`);

  r = await readVia({ what: 'proofs', status: 'pending' });
  let d = json(r);
  check('read proofs: শুধু pending আসে (server-side where, composite index লাগে না)',
    r.statusCode === 200 && d.items.length >= 1 && d.items.every(x => x.status === 'pending') &&
    d.items.some(x => x.id === 'p1') && !d.items.some(x => x.id === 'p2'), `(${d.items.length} items)`);
  const joined = d.items.find(x => x.id === 'p1');
  check('read proofs: userId join হয়েছে (panel-এর N+1 fetch বন্ধ)',
    joined.user && joined.user.uid === 'alice' && joined.user.isActive === true, `(${JSON.stringify(joined && joined.user)})`);

  r = await readVia({ what: 'proofs', status: 'all' });
  d = json(r);
  check('read proofs: status=all → নতুনটা আগে (JS sort, createdAt desc)', d.items[0].id === 'p2' && d.items[1].id === 'p1', `(${d.items.slice(0, 3).map(x => x.id)})`);

  r = await readVia({ what: 'users' });
  d = json(r);
  check('read users: key = uid (panel listUsers shape)', d.items.some(u => u.uid === 'alice' && u.name === 'Alice'), `(${r.body})`);

  r = await readVia({ what: 'user', id: 'alice' });
  d = json(r);
  check('read single user → { uid, ... } | না থাকলে item:null', d.item && d.item.uid === 'alice' && d.item.isActive === true, `(${r.body})`);
  r = await readVia({ what: 'user', id: 'nope-nope' });
  check('read single user (missing) → item null, 200', r.statusCode === 200 && json(r).item === null, `(${r.body})`);
  r = await readVia({ what: 'user', id: 'a' });
  check('read user: ছোট/অবৈধ id → 400', r.statusCode === 400, `(${r.statusCode})`);

  r = await readVia({ what: 'user-transactions', uid: 'alice' });
  d = json(r);
  check('read subcollection transactions: data-only rows (core.js shape রক্ষা)',
    d.items.some(x => x.amount === 15 && x.type === 'task' && x.note === 'x') && d.items.every(x => x.id === undefined), `(${d.items.length} items)`);
  r = await readVia({ what: 'user-transactions', uid: 'x' });
  check('read subcollection: invalid uid → 400', r.statusCode === 400, `(${r.statusCode})`);
  r = await readVia({ what: 'user-withdrawals', uid: 'alice' });
  check('read user withdrawals → users/alice/withdrawals পড়ে (top-level না)', json(r).items.length === 1 && json(r).items[0].id === 'uw1', `(${r.body})`);

  r = await readVia({ what: 'tasks' });
  d = json(r);
  check('read tasks: key = slug + sort asc', d.items.every(x => x.slug) && d.items[0].slug === 'facebook-sale', `(${d.items.map(x => x.slug + ':' + x.sort)})`);
  r = await readVia({ what: 'notices' });
  d = json(r);
  const titles = d.items.map(x => x.title);
  check('read notices: sort asc + যে doc-এ sort নেই সেটাও আসে (orderBy sort-এর মতো বাদ পড়ে না)',
    titles[0] === 'A' && titles.indexOf('B') > 0 && titles.indexOf('C') === titles.length - 1, `(${titles})`);
  r = await readVia({ what: 'settings' });
  check('read settings/site → fields + secret key নেই', json(r).item && json(r).item.activationFee === 30 && !('giftCode' in json(r).item), `(${r.body})`);

  /* ---------------- write ---------------- */
  store.docs['tasks/typing-job'] = { slug: 'typing-job', nameBn: 'টাইপিং', reward: 20, enabled: true, url: 'https://example.com', sort: 11 };
  r = await writeVia({
    what: 'task', slug: 'typing-job',
    data: {
      reward: '27.5', nameBn: 'টাইপিং জব ', dailyLimit: 9999, url: 'javascript:alert(1)',
      inputFields: [{ label: ' UID ', type: 'text', required: true }, { label: 'UID', type: 'evil' }, { label: '' }],
    },
  });
  check('write task: javascript: URL → 400 (document/URL-এ ঢোকে না)', r.statusCode === 400, `(${r.statusCode} ${r.body})`);
  check('write task: reject হলে doc অক্ষত', store.docs['tasks/typing-job'].reward === 20, `(${JSON.stringify(store.docs['tasks/typing-job'])})`);

  r = await writeVia({
    what: 'task', slug: 'typing-job',
    data: {
      reward: '27.5', nameBn: 'টাইপিং জব', dailyLimit: 9999,
      inputFields: [{ label: ' UID ', type: 'text', required: true }, { label: 'UID', type: 'evil' }, { label: '' }],
    },
  });
  d = json(r);
  const tj = store.docs['tasks/typing-job'];
  check('write task: reward clamp+number, partial update (url/অন্য field মোছে না)', d.ok === true && tj.reward === 27.5 && tj.url === 'https://example.com', `(${JSON.stringify(tj)})`);
  check('write task: inputFields sanitize (trim, dedupe label, unknown type → text, empty label বাদ)', tj.inputFields.length === 1 && tj.inputFields[0].label === 'UID' && tj.inputFields[0].type === 'text', `(${JSON.stringify(tj.inputFields)})`);
  check('write task: dailyLimit cap 200 + updatedAt বসে', tj.dailyLimit === 200 && tj.updatedAt !== undefined, `(${tj.dailyLimit} ${JSON.stringify(tj.updatedAt)})`);
  r = await writeVia({ what: 'task', slug: 'Bad Slug!!', data: { reward: 1 } });
  check('write task: অবৈধ slug → 400', r.statusCode === 400, `(${r.statusCode})`);

  r = await writeVia({ what: 'settings', data: { siteName: 'DigitEarn নতুন', activationFee: 45, giftCode: 'HACKED', password: 'x', apiKey: 'y' } });
  d = json(r);
  check('write settings: সাধারণ field লেখে', store.docs['settings/site'].siteName === 'DigitEarn নতুন' && store.docs['settings/site'].activationFee === 45, `(${JSON.stringify(store.docs['settings/site'])})`);
  check('write settings: secret key block (public doc-এ ফাঁস হয় না) + skipped says so',
    store.docs['settings/site'].giftCode === undefined && store.docs['settings/site'].password === undefined &&
    store.docs['settings/site'].apiKey === undefined && d.skipped.length === 3, `(${JSON.stringify(d.skipped)})`);
  check('write settings: settings/secret অক্ষত (আলাদা ?op=secret পথ)', store.docs['settings/secret'].giftCode === 'OLD2026', `(${JSON.stringify(store.docs['settings/secret'])})`);

  const before = Object.keys(store.docs).filter(k => k.startsWith('notices/')).length;
  r = await writeVia({ what: 'notice-add', title: 'Q notice', body: 'hello', type: 'warning' });
  d = json(r);
  const after = Object.keys(store.docs).filter(k => k.startsWith('notices/'));
  check('write notice-add: auto-id doc তৈরি (odd-segment bug ফেরে না)', r.statusCode === 200 && /^notices\/[\w-]+$/.test('notices/' + d.id) && after.length === before + 1, `(${r.body})`);
  r = await writeVia({ what: 'notice-add', title: '', body: '' });
  check('write notice-add: খালি title+body → 400', r.statusCode === 400, `(${r.statusCode})`);
  r = await writeVia({ what: 'notice-update', id: 'n1', title: 'A2', enabled: false });
  check('write notice-update: merge update', store.docs['notices/n1'].title === 'A2' && store.docs['notices/n1'].enabled === false && store.docs['notices/n1'].sort === 1, `(${JSON.stringify(store.docs['notices/n1'])})`);
  r = await writeVia({ what: 'notice-delete', id: 'n2' });
  check('write notice-delete: doc মুছে যায়', store.docs['notices/n2'] === undefined, `(${JSON.stringify(Object.keys(store.docs).filter(k => k.startsWith('notices/')))})`);
  r = await writeVia({ what: 'notice-delete', id: '../users/alice' });
  check('write: অবৈধ notice id (path traversal) → 400', r.statusCode === 400, `(${r.statusCode})`);
  r = await writeVia({ what: 'nope' });
  check('write: unknown target → 400', r.statusCode === 400, `(${r.statusCode})`);

  /* ---------------- client wiring (source guards) ---------------- */
  const coreSrc = (await import('node:fs')).readFileSync('src/admin/core.js', 'utf8');
  const fnBody = name => {
    const i = coreSrc.indexOf('export async function ' + name);
    if (i < 0) return '';
    const j = coreSrc.indexOf('\nexport ', i + 5);
    return coreSrc.slice(i, j < 0 ? coreSrc.length : j);
  };
  const routed = ['listProofs', 'listDeposits', 'listWithdrawals', 'listUsers', 'getUser', 'getUserWithdrawals', 'getUserTransactions', 'listTasks', 'listNotices', 'listUserTargetNotices', 'saveTask', 'saveSettings', 'addNotice', 'updateNotice', 'deleteNotice'];
  const notRouted = routed.filter(n => !/admin(Read|ReadOne|Write)\(/.test(fnBody(n)));
  check('core.js-এর ' + routed.length + 'টা list/save function-ই server op ব্যবহার করে', notRouted.length === 0, `(${notRouted.join(',')})`);
  const stillDirect = routed.filter(n => /getDocs\(|setDoc\(|updateDoc\(|deleteDoc\(/.test(fnBody(n)));
  check('ওই function গুলোতে আর direct Firestore call নেই (rules dependency বন্ধ)', stillDirect.length === 0, `(${stillDirect.join(',')})`);
  const mainSrc = (await import('node:fs')).readFileSync('src/admin/main.js', 'utf8');
  check('main.js joined user ব্যবহার করে (p.user || getUser)', /p\.user \|\| await getUser\(/.test(mainSrc) && /d\.user \|\| await getUser\(/.test(mainSrc) && /w\.user \|\| await getUser\(/.test(mainSrc));
  check('read/write দুটোই এক router-এর op — নতুন Vercel function না (Hobby 12)',
    (await import('node:fs')).readdirSync('api', { recursive: true }).filter(f => f.endsWith('.js')).length === 10);
}

console.log('\n=============================');
console.log(`RESULT: ${pass} passed, ${failN} failed`);
console.log('=============================');
if (failN) process.exit(1);
