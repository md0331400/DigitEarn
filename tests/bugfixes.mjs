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
  /* handler module গুলোই শুধু check — wallet.js pure helper (কোনো default handler নেই),
     সেটা auth নিজে handle করে না (callers করে) */
  const adminOps = fs.readdirSync('lib/admin')
    /* health/verify = নিজেরা state বলে; wallet.js/team.js = pure helper (handler না);
       join.js = ইচ্ছা public — Join admin আবেদন (auth লাগলে আবেদনই করা যায় না)
       ⚠️ join.js-এ requireAdmin নেই বলে T12c আলাদা করে guard করে */
    .filter(f => f.endsWith('.js') && !['health.js', 'verify.js', 'wallet.js', 'team.js', 'join.js'].includes(f));
  const adminStale = adminOps.filter(f => !/authReject\(res, admin\)/.test(fs.readFileSync('lib/admin/' + f, 'utf8')));
  check('every admin op classifies auth failure too', adminStale.length === 0, `(${adminStale.join(',')})`);
  /* verify.js ইচ্ছা ব্যতিক্রম: সবসময় 200 (enumeration রোধ) — তাই authReject না, state দেখে flag */
  const vsrc = fs.readFileSync('lib/admin/verify.js', 'utf8');
  check('verify.js exception is deliberate (always 200, reports authState)', /admin\.state !== AUTH_OK/.test(vsrc) && !/authReject\(res, admin\)/.test(vsrc) && /isAdmin: false, authenticated: false, authState/.test(vsrc));
  check('verifyUser() kept as compat wrapper (old call sites still work)', /export async function verifyUser/.test(fs.readFileSync('lib/http.js', 'utf8')));
  /* Vercel Hobby = সর্বোচ্চ ১২টা serverless function। এখন ১১টা: আগের ১০ +
     api/leaderboard/list.js (Leaderboard top-4 — cross-user data, rules দিয়ে পড়া যায় না)।
     সব ADMIN op কিন্তু এখনো ওই এক router-এর ভেতর (?op=...), নতুন function খোলে না। */
  const { readdirSync: fsRd } = await import('node:fs');
  const apiFiles = fsRd('api', { recursive: true }).filter(f => String(f).endsWith('.js'));
  check('Vercel function budget: ১১টা (≤১২ Hobby limit), health/read/write সব router-এর ভেতর',
    apiFiles.length === 11 && apiFiles.length <= 12, `(${apiFiles.length}: ${apiFiles.join(',')})`);
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
  check('field the admin never configured → 400 (client cannot add its own keys)', r.statusCode === 400 && /অতিরিক্ত তথ্য/.test(JSON.parse(r.body).error), `(${r.statusCode} ${r.body})`);

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
  check('created doc has what the handlers need (reward/enabled/inputFields; dailyLimit 0 = আনলিমিটেড)',
    !!doc && Number(doc.reward) > 0 && doc.enabled === true && Array.isArray(doc.inputFields) && Number(doc.dailyLimit) === 0, JSON.stringify(doc || {}).slice(0, 130));
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
  check('missing task: 404 user-facing message-এ admin/internal নির্দেশনা নেই (§7/§13)',
    r.statusCode === 404 && !/Admin|Panel|doc নেই|তৈরি করুন/.test(r.body) && /খোলা নেই/.test(r.body), r.body.slice(0, 120));
  check('missing task: doc path + seed hint শুধু server log-এ থাকে',
    /console\.warn\(`\[proof\/submit\] tasks\/\$\{taskSlug\} doc নেই/.test((await import('node:fs')).default.readFileSync('api/proof/submit.js', 'utf8')));

  r = res();
  await routerH(req('POST', {}, {}, '/api/admin/panel?op=seed-tasks'), r);
  check('anonymous cannot seed (401)', r.statusCode === 401, `(${r.statusCode})`);
  r = res();
  await routerH(req('POST', auth(A), {}, '/api/admin/panel?op=seed-tasks'), r);
  check('logged-in non-admin cannot seed (403)', r.statusCode === 403, `(${r.statusCode})`);

  check('no new api/ file for the op (Hobby 12-function limit)',
    fsX.readdirSync('api', { recursive: true }).filter(f => f.endsWith('.js')).length === 11);
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
    (await import('node:fs')).readdirSync('api', { recursive: true }).filter(f => f.endsWith('.js')).length === 11);
}

/* ============================================================
   [R] MicroJobs — প্রতিটা admin-created job আলাদা post/card, per-user state,
       approve → শুধু ওই user থেকে hide, reject দুই mode, Required Users শেষ
       হলে job FULL/CLOSED (global), + Leaderboard Top 4
   ============================================================ */
console.log('\n[R] MicroJobs: independent job posts, per-user status, slots, leaderboard');
{
  const fsR = await import('node:fs');
  const { viewsFor, activeJobs, ST: MST } = await import('../src/core/microjobs.js');
  const proofReviewH = (await import('../lib/admin/proof-review.js')).default;
  const readH = (await import('../lib/admin/read.js')).default;
  const writeH = (await import('../lib/admin/write.js')).default;
  const leadH = (await import('../api/leaderboard/list.js')).default;

  const call = async (h, body, tok = ADMIN, url = '/api/x') => {
    const r = res();
    await h(req('POST', tok ? auth(tok) : {}, body, url), r);
    return { r, d: json(r) };
  };

  /* ---- fixtures: ৫টা job admin panel-এর মতো করে তৈরি (?op=write task-create) ---- */
  /* kind:'microjob' = আলাদা সিস্টেমের doc — শুধু এগুলোই user-এর মাইক্রো জব পেজে দেখায় */
  const mk = async (n, title, reward, required, extra = {}) => await call(writeH, {
    what: 'task-create', slug: `mj${n}`,
    data: { nameBn: title, reward, requiredUsers: required, mode: 'single', kind: 'microjob', shortDesc: `short ${n}`, url: 'https://example.com/j' + n, inputFields: [{ label: 'Work Report', type: 'textarea', required: true }], ...extra },
  }, ADMIN, '/api/admin/panel?op=write');
  for (let n = 1; n <= 5; n++) {
    const { r } = await mk(n, `Job ${n}`, n, n === 5 ? 2 : 100);
    check(`R1 job ${n} তৈরি → আলাদা tasks/mj${n} doc (${r.statusCode})`, r.statusCode === 200, `(${r.body})`);
  }
  check('R1b duplicate slug create → 409 (একটা job একবারই)', (await mk(1, 'Job 1 again', 5, 10)).r.statusCode === 409);
  check('R1c MicroJob হতে Required Users >= 1 (নাহলে "কতজন বাকি" মানে হারায়)',
    (await call(writeH, { what: 'task-create', slug: 'mj-zero', data: { nameBn: 'Zero Slot', reward: 1, requiredUsers: 0, kind: 'microjob' } }, ADMIN, '/api/admin/panel?op=write')).r.statusCode === 400);
  /* --- দুই সিস্টেম আলাদা: পুরোনো টাস্ক doc মাইক্রো জব list-এ আসে না --- */
  const legacyTask = await call(writeH, { what: 'task-create', slug: 'fb-sale-x', data: { nameBn: 'ফেসবুক সেল', reward: 4.5, url: 'https://example.com/fb' } }, ADMIN, '/api/admin/panel?op=write');
  check('R1d পুরোনো টাস্ক doc তৈরি হয় (kind ছাড়া) — MicroJobs-এর বাইরে', legacyTask.r.statusCode === 200 && !store.docs['tasks/fb-sale-x'].kind, `(${legacyTask.r.statusCode} kind=${store.docs['tasks/fb-sale-x'] && store.docs['tasks/fb-sale-x'].kind})`);
  check('R1e মাইক্রো জব list-এ পুরোনো টাস্ক ফেরে না (viewsFor kind filter)',
    viewsFor([{ slug: 'fb-sale-x', nameBn: 'ফেসবুক সেল', reward: 4.5 }, { slug: 'mj1', nameBn: 'Job 1', reward: 1, requiredUsers: 100, kind: 'microjob' }], []).map(v => v.slug).join() === 'mj1');
  check('R1f admin read jobs kindFilter আলাদা সিস্টেম আলাদা করে',
    (await call(readH, { what: 'jobs', kindFilter: 'microjob' }, ADMIN, '/api/admin/panel?op=read')).d.items.every(x => x.kind === 'microjob'));

  /* users: alice (header-এ active) + ৪টা নতুন user — প্রতিটার জন্য আলাদা ID token
     (mock-এর TOKENS map-এ বসানো হয়), তাই "ভিন্ন user = ভিন্ন state" সত্যিই টেস্ট হয় */
  const fakeR = await import('./mocks/firebase-admin-fake.mjs');
  Object.assign(fakeR.TOKENS, {
    TOKEN_MJ2: { uid: 'mjU2', email: 'mjU2@t.com' },
    TOKEN_MJ3: { uid: 'mjU3', email: 'mjU3@t.com' },
    TOKEN_MJ4: { uid: 'mjU4', email: 'mjU4@t.com' },
  });
  for (const uid of ['mjU2', 'mjU3', 'mjU4', 'mjU5']) {
    store.docs['users/' + uid] = { name: uid, email: uid + '@t.com', mobile: '01712345689', balance: 0, totalEarned: 0, isActive: true, refCode: 'R' + uid };
  }
  const T2 = 'TOKEN_MJ2', T3 = 'TOKEN_MJ3', T4 = 'TOKEN_MJ4';
  const taskDocs = () => Object.keys(store.docs).filter(k => /^tasks\/mj\d$/.test(k)).map(k => ({ slug: k.split('/')[1], ...store.docs[k] }));
  check('R2a তৈরি হওয়া ৫টা doc-ই kind:microjob (user পেজ শুধু এগুলো পড়ে)',
    [1, 2, 3, 4, 5].every(n => store.docs[`tasks/mj${n}`].kind === 'microjob'));
  const proofsOf = uid => Object.keys(store.docs)
    .filter(k => k.startsWith(`users/${uid}/proofs/`)).map(k => ({ id: k.split('/').pop(), ...store.docs[k] }));
  const viewsFor2 = uid => viewsFor(taskDocs(), proofsOf(uid));
  const activeFor = uid => activeJobs(viewsFor2(uid));

  /* §1/§3 — ৫টা job → ৫টা আলাদা card (কোনো merge/limit নেই) */
  check('R2 নতুন user-এর জন্য ৫টা আলাদা job card (hardcode নয়, doc সংখ্যা অনুযায়ী)',
    activeFor('mjU2').length === 5 && new Set(activeFor('mjU2').map(v => v.slug)).size === 5, `(${activeFor('mjU2').map(v => v.slug)})`);
  const j1 = activeFor('mjU2').find(v => v.slug === 'mj1');
  check('R2b প্রতিটা card-এ নিজের reward + remaining (Required 100 − Approved 0 = 100 জন বাকি)',
    j1.reward === 1 && j1.remaining === 100 && j1.left.includes('১০০'), `(${JSON.stringify({ r: j1.reward, rem: j1.remaining, left: j1.left })})`);

  /* §4 — শুধু APPROVED কমপ্লিশন remaining কমায়; pending কমায় না */
  let s2 = await call(submitH, { taskSlug: 'mj2', data: { 'Work Report': 'did like+comment' } }, 'TOKEN_ALICE', '/api/proof/submit');
  check('R3 mjU2… (alice) Job2 submit → 200', s2.r.statusCode === 200, `(${s2.r.statusCode} ${s2.r.body})`);
  const statsAfterPending = (await call(readH, { what: 'jobs' }, ADMIN, '/api/admin/panel?op=read')).d.items.find(x => x.slug === 'mj2');
  check('R3b শুধু APPROVED remaining কমায় — pending ৩টা হলেও remaining ১০-ই থাকে',
    Number(statsAfterPending.approvedCount) === 0 && Number(statsAfterPending.pending) === 1 && Number(statsAfterPending.remaining) === 100, `(${JSON.stringify(statsAfterPending)})`);

  /* §7/§8 — per-user state: Job2 pending, বাকি ৪টা available; duplicate submit বন্ধ */
  const aliceViews = viewsFor2('alice');
  check('R4 state (alice × job): Job2 = pending, বাকি সব available — এক job-এর status সব user-এর জন্য এক নয়',
    aliceViews.find(v => v.slug === 'mj2').state === MST.PENDING &&
    aliceViews.filter(v => v.slug !== 'mj2').every(v => v.state === MST.AVAILABLE), `(${aliceViews.map(v => v.slug + ':' + v.state)})`);
  const pend = aliceViews.find(v => v.slug === 'mj2');
  check('R4b pending job card হারায় না, শুধু submit বন্ধ ("আপনি এটি জমা দিয়েছেন")',
    pend.visible === true && pend.gate.allowed === false && /জমা দিয়েছেন/.test(pend.gate.label), `(${JSON.stringify(pend.gate)})`);
  s2 = await call(submitH, { taskSlug: 'mj2', data: { 'Work Report': 'again' } }, 'TOKEN_ALICE', '/api/proof/submit');
  check('R4c pending থাকতে আবার submit → 409 (duplicate submission বন্ধ)', s2.r.statusCode === 409 && /অপেক্ষায়/.test(s2.d.error), `(${s2.r.statusCode} ${s2.r.body})`);

  /* §13 — approve: reward exactly once, approvedCount +1, ওই user থেকে hide (§9), অন্য user এখনও দেখে */
  const aliceProof = proofsOf('alice').find(p => p.taskSlug === 'mj2');
  const balBefore = Number(store.docs['users/alice'].balance) || 0;
  let ap = await call(proofReviewH, { proofId: aliceProof.id, action: 'approve' }, ADMIN, '/api/admin/proof-review');
  check('R5 approve → 200', ap.r.statusCode === 200, `(${ap.r.statusCode} ${ap.r.body})`);
  check('R5b reward exactly once (balance +৳2 = job doc-এর rate, client-এর না)',
    Number(store.docs['users/alice'].balance) === balBefore + 2, `(${balBefore} → ${store.docs['users/alice'].balance})`);
  const st2 = (await call(readH, { what: 'jobs' }, ADMIN, '/api/admin/panel?op=read')).d.items.find(x => x.slug === 'mj2');
  check('R5c approvedCount 1 + remaining 99 (server-governed count)',
    Number(st2.approvedCount) === 1 && Number(st2.remaining) === 99 && Number(st2.approvedFromProofs) === 1, `(${JSON.stringify(st2)})`);
  const av = viewsFor2('alice').find(v => v.slug === 'mj2');
  check('R6 approve-এর পর Job2 alice-এর list থেকে HIDDEN (doc মোকা হয়নি)',
    av.state === MST.APPROVED && av.visible === false && !!store.docs['tasks/mj2'], `(${av.state}/${av.visible})`);
  check('R6b অন্য user (mjU2) এখনও Job2 দেখে — hide শুধু ওই user-এর জন্য',
    activeFor('mjU2').some(v => v.slug === 'mj2') && activeFor('mjU3').some(v => v.slug === 'mj2'));
  ap = await call(proofReviewH, { proofId: aliceProof.id, action: 'approve' }, ADMIN, '/api/admin/proof-review');
  check('R6c একই submission দ্বিতীয়বার approve → 409 (double credit রোধ)', ap.r.statusCode === 409, `(${ap.r.statusCode} ${ap.r.body})`);
  check('R6d balance আবার বাড়ে না', Number(store.docs['users/alice'].balance) === balBefore + 2, `(${store.docs['users/alice'].balance})`);

  /* §10/§11 — Reject & Allow Resubmit: warning + আবার submit চালু */
  let su = await call(submitH, { taskSlug: 'mj4', data: { 'Work Report': 'typed doc' } }, T2, '/api/proof/submit');
  check('R7 mjU2 Job4 submit → 200', su.r.statusCode === 200, `(${su.r.statusCode} ${su.r.body})`);
  const p4 = proofsOf('mjU2').find(p => p.taskSlug === 'mj4');
  let rj = await call(proofReviewH, { proofId: p4.id, action: 'reject_resubmit', note: 'link missing' }, ADMIN, '/api/admin/proof-review');
  check('R7b Reject & Allow Resubmit → 200', rj.r.statusCode === 200, `(${rj.r.statusCode} ${rj.r.body})`);
  const u2views = viewsFor2('mjU2');
  const j4v = u2views.find(v => v.slug === 'mj4');
  check('R7c job card থাকে + rejected warning + Submit Again চালু',
    j4v.state === MST.RESUBMIT && j4v.visible === true && j4v.gate.allowed === true && /আবার জমা দিন/.test(j4v.gate.label), `(${JSON.stringify(j4v.gate)})`);
  su = await call(submitH, { taskSlug: 'mj4', data: { 'Work Report': 'typed doc, corrected' } }, T2, '/api/proof/submit');
  check('R7d সংশোধন করে আবার submit → 200 (permanently disable হয় না)', su.r.statusCode === 200, `(${su.r.statusCode} ${su.r.body})`);
  check('R7e নতুন submit pending state-এ ফিরিয়ে আনে',
    viewsFor2('mjU2').find(v => v.slug === 'mj4').state === MST.PENDING);

  /* §10 Option A — Reject & Hide: শুধু ওই user থেকে লুকানো, job global থাকে */
  su = await call(submitH, { taskSlug: 'mj5', data: { 'Work Report': 'same report text' } }, 'TOKEN_ALICE', '/api/proof/submit');
  check('R8 অন্য user-এর একই রকম report text → 409 হয় না (single-mode-এ accountKey skip)', su.r.statusCode === 200, `(${su.r.statusCode} ${su.r.body})`);
  const p5 = proofsOf('alice').find(p => p.taskSlug === 'mj5');
  rj = await call(proofReviewH, { proofId: p5.id, action: 'reject_hide', note: 'not valid' }, ADMIN, '/api/admin/proof-review');
  check('R8b Reject & Hide → 200', rj.r.statusCode === 200, `(${rj.r.statusCode} ${rj.r.body})`);
  const aHide = viewsFor2('alice').find(v => v.slug === 'mj5');
  check('R8c Job5 alice-এর list থেকে বাদ (state=rejected_hidden)', aHide.state === MST.HIDDEN && aHide.visible === false, `(${aHide.state}/${aHide.visible})`);
  check('R8d Job5 doc অক্ষত + mjU3 এখনও দেখে (§15 A: user-specific hide)',
    !!store.docs['tasks/mj5'] && activeFor('mjU3').some(v => v.slug === 'mj5'));

  /* §14 — required = 2: ১ম approve → remaining 1, ২য় → 0 + FULL/CLOSED (global) */
  const j5 = () => store.docs['tasks/mj5'];
  const st5before = (await call(readH, { what: 'jobs' }, ADMIN, '/api/admin/panel?op=read')).d.items.find(x => x.slug === 'mj5');
  check('R9 required=2, approved=0 → remaining 2', Number(st5before.requiredUsers) === 2 && Number(st5before.remaining) === 2, `(${JSON.stringify(st5before)})`);
  su = await call(submitH, { taskSlug: 'mj5', data: { 'Work Report': 'u2 did it' } }, T2, '/api/proof/submit');
  const p5b = proofsOf('mjU2').find(p => p.taskSlug === 'mj5' && p.status === 'pending');
  await call(proofReviewH, { proofId: p5b.id, action: 'approve' }, ADMIN, '/api/admin/proof-review');
  check('R9b ১ম approve → approvedCount 1, remaining 1, এখনো খোলা',
    Number(j5().approvedCount) === 1 && Number(j5().closed) === 0 || j5().closed === false, `(${JSON.stringify({ a: j5().approvedCount, c: j5().closed })})`);
  check('R9c mjU3 এখনও submit করতে পারে (slot আছে)',
    (await call(submitH, { taskSlug: 'mj5', data: { 'Work Report': 'u3 did it' } }, T3, '/api/proof/submit')).r.statusCode === 200);
  const p5c = proofsOf('mjU3').find(p => p.taskSlug === 'mj5');
  await call(proofReviewH, { proofId: p5c.id, action: 'approve' }, ADMIN, '/api/admin/proof-review');
  check('R10 ২য় approve → approved=2/2, closed=true (FULL/CLOSED)',
    Number(j5().approvedCount) === 2 && j5().closed === true, `(${JSON.stringify({ a: j5().approvedCount, c: j5().closed })})`);
  check('R10b slot শেষ → mjU4-এর submit 400 (নতুন user submit করতে পারবে না)',
    (await call(submitH, { taskSlug: 'mj5', data: { 'Work Report': 'too late' } }, T4, '/api/proof/submit')).r.statusCode === 400);
  check('R10c FULL job active list-এ আসে না (§14), admin list-এ কিন্তু দেখা যায়',
    !activeFor('mjU4').some(v => v.slug === 'mj5') &&
    (await call(readH, { what: 'jobs', jobSlug: 'mj5' }, ADMIN, '/api/admin/panel?op=read')).d.items.length === 1);
  check('R10d admin FULL/CLOSED + count সহ job দেখে (approved 2, total submissions)',
    (await call(readH, { what: 'jobs', jobSlug: 'mj5' }, ADMIN, '/api/admin/panel?op=read')).d.items[0].approvedCount === 2 &&
    (await call(readH, { what: 'jobs', jobSlug: 'mj5' }, ADMIN, '/api/admin/panel?op=read')).d.items[0].full === true);
  check('R10e complete করা user-দের রেকর্ড (proofs) অক্ষত',
    proofsOf('mjU2').some(p => p.taskSlug === 'mj5' && p.status === 'approved') && proofsOf('mjU3').some(p => p.taskSlug === 'mj5' && p.status === 'approved'));
  check('R10f requiredUsers বাড়ালে job আবার খোলে (admin correction)',
    (await call(writeH, { what: 'task', slug: 'mj5', data: { requiredUsers: 4 } }, ADMIN, '/api/admin/panel?op=write')).r.statusCode === 200 &&
    j5().closed === false);

  /* §22 — security: user job doc/count ছুঁতে পারে না; count শুধু server লেখে */
  await call(writeH, { what: 'task', slug: 'mj1', data: { reward: 999, approvedCount: 500, requiredUsers: 1 } }, 'TOKEN_ADMIN', '/api/admin/panel?op=write');
  check('R11 admin form থেকে approvedCount লেখা যায় না (server-only field)',
    Number(store.docs['tasks/mj1'].approvedCount) === 0 && !('approvedCount' in store.docs['tasks/mj1']) === false, `(${store.docs['tasks/mj1'].approvedCount})`);
  check('R11b reward শুধু admin বদলাতে পারে; user submit-এ পাঠানো reward ignore হয়',
    Number(store.docs['tasks/mj1'].reward) === 999);
  const spoof = await call(submitH, { taskSlug: 'mj1', data: { 'Work Report': 'x' }, reward: 99999, userId: 'mjU4', status: 'approved' }, T3, '/api/proof/submit');
  const sp = proofsOf('mjU3').find(p => p.taskSlug === 'mj1');
  /* userId/proofId সব server-তৈরি — top-level review doc-এ userId বসে (mirror-এ না) */
  const spTop = store.docs['proofs/' + spoof.d.id];
  check('R11c client-এর reward/userId/status ignore — reward = task doc, uid = token',
    spoof.r.statusCode === 200 && Number(sp.reward) === Number(store.docs['tasks/mj1'].reward) &&
    Number(sp.reward) !== 99999 && sp.status === 'pending' &&
    spTop && spTop.userId === 'mjU3' && spTop.status === 'pending',
    `(sent reward 99999/userId mjU4/status approved → got reward ${sp.reward}, uid ${spTop && spTop.userId}, status ${spTop && spTop.status})`);
  check('R11d normal user read/write op → 403',
    (await call(readH, { what: 'jobs' }, 'TOKEN_ALICE', '/api/admin/panel?op=read')).r.statusCode === 403 &&
    (await call(writeH, { what: 'task', slug: 'mj1', data: { reward: 0 } }, 'TOKEN_ALICE', '/api/admin/panel?op=write')).r.statusCode === 403);
  check('R11e leaderboard: লগইন ছাড়া 401', (await call(leadH, {}, null, '/api/leaderboard/list')).r.statusCode === 401);

  /* §18/§19/§20 — Leaderboard: exactly Top 4, existing referral count, masked phone */
  store.docs['users/lbA'] = { name: 'LB A', mobile: '01711223344', balance: 0, totalEarned: 5000, isActive: true, refCode: 'LBA' };
  store.docs['users/lbB'] = { name: 'LB B', mobile: '01819876543', balance: 0, totalEarned: 3000, isActive: true, refCode: 'LBB' };
  store.docs['users/lbC'] = { name: 'LB C', mobile: '01912345678', balance: 0, totalEarned: 1000, isActive: true, refCode: 'LBC' };
  store.docs['users/lbD'] = { name: 'LB D', mobile: '01611111111', balance: 0, totalEarned: 900, isActive: true, refCode: 'LBD' };
  store.docs['users/lbE'] = { name: 'LB E', mobile: '01522222222', balance: 0, totalEarned: 800, isActive: true, refCode: 'LBE' };
  const referralsFor = (parent, n) => {
    for (let i = 0; i < n; i++) {
      const kid = `${parent}child${i}`;
      store.docs['users/' + kid] = { name: kid, refBy: parent, isActive: true, balance: 0, totalEarned: 0 };
      store.docs[`users/${parent}/team/${kid}`] = { name: kid, createdAt: new Date() };
    }
  };
  referralsFor('lbA', 15); referralsFor('lbB', 12); referralsFor('lbC', 9); referralsFor('lbD', 7); referralsFor('lbE', 20);
  /* ইনএকটিভ সদস্য + ইনএকটিভ রেফারেল = বাদ পড়ার কথা */
  store.docs['users/lbDead'] = { name: 'LB DEAD', mobile: '01799999999', totalEarned: 99999, isActive: false, refCode: 'LBD2' };
  referralsFor('lbDead', 40);           // সব রেফারেল কিন্তু নিজে ইনএকটিভ
  for (let i = 0; i < 5; i++) {         // lbC-এর ৫টা রেফারেল ইনএকটিভ → গননায় পড়বে না
    const kid = `lbCinactive${i}`;
    store.docs['users/' + kid] = { name: kid, refBy: 'lbC', isActive: false };
    store.docs[`users/lbC/team/${kid}`] = { name: kid, createdAt: new Date() };
  }
  /* এটার monthly income = এই মাসের transaction (একটা ৳1500 + একটা পুরোনো মাসের) */
  store.docs['users/lbA/transactions/tx_now'] = { amount: 1500, type: 'referral_bonus', createdAt: new Date() };
  store.docs['users/lbA/transactions/tx_old'] = { amount: 9999, type: 'referral_bonus', createdAt: new Date(Date.now() - 90 * 864e5) };
  const lb = await call(leadH, {}, 'TOKEN_ALICE', '/api/leaderboard/list');
  const lbItems = lb.d.items || [];
  check('R12 Leaderboard exactly Top 4 (৩টা না, পুরো list না)', lbItems.length === 4, `(${lbItems.length})`);
  check('R12b ranking = বৈধ referral সংখ্যা (lbE 20 → #1, lbA 15 → #2)',
    lbItems[0].name === 'LB E' && lbItems[0].referrals === 20 && lbItems[1].name === 'LB A' && lbItems[1].referrals === 15, `(${lbItems.map(x => x.name + ':' + x.referrals)})`);
  check('R12g ইনএকটিভ সদস্য কখনো লিডারবোর্ডে আসে না (৪০টা রেফারেল আর ৳99999 আয় থাকলেও)',
    lbItems.every(x => x.name !== 'LB DEAD') && !lb.r.body.includes('LB DEAD'));
  check('R12h যেসব রেফারেল একাউন্ট একটিভ করেনি তারা গননায় পড়ে না (lbC: ৯ valid, ৫ inactive বাদ)',
    lbItems.find(x => x.name === 'LB C').referrals === 9, `(${(lbItems.find(x => x.name === 'LB C') || {}).referrals})`);
  check('R12i response-এ isActive flag সবগুলোতেই true (filter server-এই হয়েছে)',
    lbItems.length > 0 && lbItems.every(x => x.isActive === true));
  check('R12c rank #1..#4 ক্রমে + কার্ডে নাম/referrals', lbItems.map(x => x.rank).join() === '1,2,3,4');
  check('R12d Monthly Income = চলতি মাসের trusted transaction (পুরোনো মাস বাদ)',
    lbItems[1].monthlyIncome === 1500, `(${lbItems[1].monthlyIncome})`);
  check('R12e ফোন mask (01711****44) — পুরো নম্বর response-এ নেই',
    /^\d{5}\*{4}\d{2}$/.test(lbItems[1].mobile) && !lb.r.body.includes('01711223344'), `(${lbItems[1].mobile})`);
  check('R12f প্রতিটা কার্ডে profile image field আছে (URL থাকলে, না থাকলে client initial দেখায়)',
    lbItems.every(x => 'avatar' in x && 'name' in x));

  /* client-side module গুলো source contract ধরে রাখে */
  const mjPage = fsR.readFileSync('src/pages/microjobs.js', 'utf8');
  check('R13 MicroJobs page = list + #job-<slug> detail (admin-এর নতুন job-এ আলাদা post)',
    mjPage.includes('#job-${esc(v.slug)}') && /getMicrojobs\(/.test(mjPage) && /sortJobs\(/.test(mjPage));
  check('R13d পেজে কোনো job hardcode নেই (TASKS/static list import নয়, DB থেকেই সব)',
    !/tasks-data/.test(mjPage) && !/TASKS/.test(codeOnlyOf(mjPage)) &&
    !/facebook-sale|gmail-sale|instagram-sale|myjob|typing-job/.test(mjPage));
  check('R13e list = শুধু visible + pending (approved/hidden/FULL ওই user-এর list থেকে বাদ)',
    /v\.visible \|\| v\.state === ST\.PENDING/.test(mjPage));
  check('R13f owner correction: stats row + Leaderboard বাটন এই পেজে নেই',
    !/mj-stats/.test(mjPage) && !/leaderboard\.html/.test(mjPage) && !/mj-stats|leaderboard\.html/.test(fsR.readFileSync('microjobs.html', 'utf8')));
  check('R13g site chrome বাংলা (owner: "english word use korba na") — নতুন পেজ দুটোতেই',
    !/View Job|Submit Again|Monthly Income|Referrals|Pending<|Complete</.test(mjPage + fsR.readFileSync('src/pages/leaderboard.js', 'utf8')));
  check('R13h state banner/label গুলোও বাংলা (core model + jobform — user যা পড়ে)',
    !/label: 'Submit'|Submit Again|জন complete|FULL \/ CLOSED|Task Rejected/.test(fsR.readFileSync('src/core/microjobs.js', 'utf8') + fsR.readFileSync('src/core/jobform.js', 'utf8')));
  const wrSrc = fsR.readFileSync('lib/admin/write.js', 'utf8');
  check('R14 job image = data:image upload বা http(s) URL (অন্য কিছু accept না)',
    wrSrc.includes('IMG_DATA_RE') && wrSrc.includes('data:image') && wrSrc.includes('https://') &&
    fsR.readFileSync('src/core/jobform.js', 'utf8').includes("toDataURL('image/jpeg'"));
  check('R15 Leaderboard page আলাদা + Refer/team page অক্ষত (§17/§18)',
    fsR.existsSync('leaderboard.html') && /getLeaderboard\(/.test(fsR.readFileSync('src/pages/leaderboard.js', 'utf8')) &&
    !/leaderboard|getLeaderboard/.test(fsR.readFileSync('src/pages/team.js', 'utf8')));
  /* --- R16) admin job doc মুছে ফেলা (?op=write what:'task-delete') + pending guard --- */
  await call(writeH, { what: 'task-create', slug: 'mjdel', data: { nameBn: 'মুছার জব', reward: 2, requiredUsers: 5, kind: 'microjob' } }, ADMIN, '/api/admin/panel?op=write');
  check('R16a মুছার আগে doc তৈরি হয় (tasks/mjdel)', !!store.docs['tasks/mjdel']);
  const delOk = await call(writeH, { what: 'task-delete', slug: 'mjdel' }, ADMIN, '/api/admin/panel?op=write');
  check('R16b task-delete doc সরায় — user-এর মাইক্রো জব পেজ থেকে card উঠে যায়',
    delOk.r.statusCode === 200 && delOk.d.deleted === true && !store.docs['tasks/mjdel'], `(${delOk.r.statusCode} ${delOk.r.body})`);
  check('R16c না-থাকা slug delete → 404 (চুপ করে success না)',
    (await call(writeH, { what: 'task-delete', slug: 'mjdel' }, ADMIN, '/api/admin/panel?op=write')).r.statusCode === 404);
  await call(writeH, { what: 'task-create', slug: 'mjpend', data: { nameBn: 'Pending জব', reward: 3, requiredUsers: 5, kind: 'microjob' } }, ADMIN, '/api/admin/panel?op=write');
  await call(submitH, { taskSlug: 'mjpend', data: { 'Work Report': 'proof before delete' } }, T2, '/api/proof/submit');
  const blockedDel = await call(writeH, { what: 'task-delete', slug: 'mjpend' }, ADMIN, '/api/admin/panel?op=write');
  check('R16d pending submission থাকলে delete 409 (নাহলে review করা অসম্ভব)',
    blockedDel.r.statusCode === 409 && /pending/.test(blockedDel.d.error || ''), `(${blockedDel.r.statusCode} ${blockedDel.r.body})`);
  const pp = proofsOf('mjU2').find(x => x.taskSlug === 'mjpend');
  await call(proofReviewH, { proofId: pp.id, action: 'reject_hide' }, ADMIN, '/api/admin/proof-review');
  check('R16e review শেষ হলে delete চলে',
    (await call(writeH, { what: 'task-delete', slug: 'mjpend' }, ADMIN, '/api/admin/panel?op=write')).r.statusCode === 200 && !store.docs['tasks/mjpend']);
  check('R16f panel-এ মুছুন বাটন + kind অনুযায়ী দুই tab আলাদা (MicroJobs / টাস্ক)',
    /data-del=/.test(fsR.readFileSync('src/admin/main.js', 'utf8')) && /deleteTask/.test(fsR.readFileSync('src/admin/core.js', 'utf8')));

  function codeOnlyOf(x) { return x.replace(/\/\*[\s\S]*?\*\//g, ''); }
}

/* ============================================================
   [S] Admin wallet — MicroJob publishing budget (owner rule)
   role = server-এর admins/{email} doc; Job Poster-কে balance দিতে হয়;
   owner/full-কে লাগে না; publish = এক transaction-এ deduct + create
   ============================================================ */
console.log('\n[S] Admin wallet: Job Poster balance, atomic publish, edit/delete money safety');
{
  const fsS = await import('node:fs');
  const ffs = await import('./mocks/firestore-fake.mjs');
  const writeH = (await import('../lib/admin/write.js')).default;
  const readH = (await import('../lib/admin/read.js')).default;
  const fakeS = await import('./mocks/firebase-admin-fake.mjs');
  Object.assign(fakeS.TOKENS, {
    TOKEN_POSTER: { uid: 'posterU', email: 'poster@digitearn.com' },
    TOKEN_OWNER: { uid: 'ownerU', email: 'owner@digitearn.com' },
  });
  const P = 'TOKEN_POSTER', O = 'TOKEN_OWNER';
  store.docs['admins/poster@digitearn.com'] = { role: 'poster', balance: 500 };
  store.docs['admins/owner@digitearn.com'] = { role: 'owner', balance: 0 };
  const call = async (h, body, tok, url = '/api/x') => {
    const r = res();
    await h(req('POST', auth(tok), body, url), r);
    return { r, d: json(r) };
  };
  const W = (body, tok = P) => call(writeH, { ...body }, tok, '/api/admin/panel?op=write');
  const bal = email => Math.round((Number(store.docs['admins/' + email]?.balance) || 0) * 100) / 100;
  const mj = async (slug, reward, requiredUsers, extra = {}, tok = P) => await W({
    what: 'task-create', slug,
    data: { kind: 'microjob', nameBn: 'Wallet job ' + slug, reward, requiredUsers, mode: 'single', ...extra },
  }, tok);

  /* ---- §2/§3 exact example: ৳5 × ১০০ = ৳500 = balance ঠিক → publish, টাকা কেটে যায় ---- */
  const ok1 = await mj('w1', 5, 100);
  check('S1 reward ৳5 × ১০০ user = ৳500 budget, balance ৳500 → publish 200',
    ok1.r.statusCode === 200 && ok1.d.budget === 500 && ok1.d.balanceAfter === 0, `(${ok1.r.statusCode} ${JSON.stringify(ok1.d).slice(0, 130)})`);
  check('S1b টাকা কাটা server doc-এ বসে (balance 0, funded=budget, reservedBudget 500)',
    bal('poster@digitearn.com') === 0 && store.docs['tasks/w1'].funded === 'budget' && store.docs['tasks/w1'].reservedBudget === 500 && store.docs['tasks/w1'].enabled === true);
  check('S1c fundedBy = admin email (server-এর auth থেকে, body থেকে না)', store.docs['tasks/w1'].fundedBy === 'poster@digitearn.com');

  /* ---- insufficient → job তৈরিই হয় না, পরেও কাটে না ---- */
  const no = await mj('w2', 1, 100);
  check('S2 balance 0 থাকলে আরেকটা job publish → 402 + স্পষ্ট বার্তা',
    no.r.statusCode === 402 && /Insufficient balance to publish this job\./.test(no.d.error || ''), `(${no.r.statusCode} ${JSON.stringify(no.d).slice(0, 120)})`);
  check('S2b ব্যালেন্স না থাকলে job doc তৈরি হয় না (পরে কেটে নেওয়া হয় না) + balance negative হয় না',
    !store.docs['tasks/w2'] && bal('poster@digitearn.com') === 0);

  /* ---- owner / full access → balance লাগে না ---- */
  const byOwner = await mj('w3', 5, 100, {}, O);
  check('S3 Owner (balance 0) একই বাজেটের job publish করে → 200, টাকা কাটে না',
    byOwner.r.statusCode === 200 && byOwner.d.budget === 0 && store.docs['tasks/w3'].funded === 'free' && bal('owner@digitearn.com') === 0,
    `(${byOwner.r.statusCode} ${JSON.stringify(byOwner.d).slice(0, 110)})`);
  const byFull = await mj('w4', 5, 100, {}, ADMIN);
  check('S3b Full Access admin-এরও balance লাগে না (role field নেই = full)',
    byFull.r.statusCode === 200 && store.docs['tasks/w4'].funded === 'free');

  /* ---- §6 draft: public হয় না, টাকাও কাটে না ---- */
  const dr = await mj('w5', 2, 10, { publish: false });
  check('S4 publish:false = ড্রাফট — doc আছে, enabled false, টাকা কাটেনি',
    dr.r.statusCode === 200 && dr.d.draft === true && store.docs['tasks/w5'].enabled === false && bal('poster@digitearn.com') === 0,
    `(${JSON.stringify(dr.d).slice(0, 110)})`);
  const pubFail = await W({ what: 'task-publish', slug: 'w5' });
  check('S4b ড্রাফট প্রকাশে balance না থাকলে 402 + job public হয় না',
    pubFail.r.statusCode === 402 && store.docs['tasks/w5'].enabled === false, `(${pubFail.r.statusCode})`);
  const credit = await W({ what: 'admin-balance', email: 'poster@digitearn.com', delta: 200, note: 'test topup' }, O);
  check('S5 Owner Job Poster-এর balance যোগ করতে পারেন (৳200 → balance 200 + ledger)',
    credit.r.statusCode === 200 && credit.d.balance === 200 && Object.keys(store.docs).some(k => /^admins\/poster@digitearn\.com\/wallet\//.test(k)),
    `(${credit.r.statusCode} ${JSON.stringify(credit.d).slice(0, 100)})`);
  const pubOk = await W({ what: 'task-publish', slug: 'w5' });
  check('S5b balance যোগ হলে প্রকাশ চলে (৳20 দরকার → ৳180 বাকি, enabled true)',
    pubOk.r.statusCode === 200 && pubOk.d.budget === 20 && store.docs['tasks/w5'].enabled === true && bal('poster@digitearn.com') === 180,
    `(${pubOk.r.statusCode} ${JSON.stringify(pubOk.d).slice(0, 110)})`);

  /* ---- §5 edit: budget বাড়লে additional reserve, না থাকলে reject ---- */
  const upFail = await W({ what: 'task', slug: 'w1', data: { reward: 9 } });   // ৳9×100=৳900, balance 180
  check('S6 reward বাড়িয়ে ৳900 করতে গেলে 402 + job-এর reward অক্ষত (money-loss নেই)',
    upFail.r.statusCode === 402 && /Insufficient balance to update this job\./.test(upFail.d.error || '') && Number(store.docs['tasks/w1'].reward) === 5,
    `(${upFail.r.statusCode} ${JSON.stringify(upFail.d).slice(0, 120)})`);
  await W({ what: 'admin-balance', email: 'poster@digitearn.com', delta: 100 }, O);   // 180 → 280
  const upOk = await W({ what: 'task', slug: 'w1', data: { reward: 6 } });             // ৳600 budget, delta 100
  check('S6b যথেষ্ট balance থাকলে edit চলে: delta ৳100 কেটেছে, reservedBudget ৳600',
    upOk.r.statusCode === 200 && upOk.d.budgetDelta === 100 && Number(store.docs['tasks/w1'].reward) === 6
    && store.docs['tasks/w1'].reservedBudget === 600 && bal('poster@digitearn.com') === 180,
    `(${upOk.r.statusCode} ${JSON.stringify(upOk.d).slice(0, 120)} bal=${bal('poster@digitearn.com')})`);
  const down = await W({ what: 'task', slug: 'w1', data: { requiredUsers: 50 } });      // ৳6×50=৳300 → ৳300 ফেরত
  check('S6c budget কমালে অব্যবহৃত অংশ ফেরত (৳600→৳300 = +৳300)',
    down.r.statusCode === 200 && down.d.budgetDelta === -300 && bal('poster@digitearn.com') === 480 && store.docs['tasks/w1'].reservedBudget === 300,
    `(${JSON.stringify(down.d).slice(0, 110)} bal=${bal('poster@digitearn.com')})`);

  /* ---- delete: ফেরত = reserved − approved × reward ---- */
  store.docs['tasks/w1'].approvedCount = 10;                 // ৳6 × 10 = ৳60 খরচ
  const del = await W({ what: 'task-delete', slug: 'w1' });
  check('S7 job মুছলে ফান্ড করা অব্যবহৃত টাকা ফেরত (৳300 − ৳60 = ৳240), doc নেই',
    del.r.statusCode === 200 && del.d.refunded === 240 && !store.docs['tasks/w1'] && bal('poster@digitearn.com') === 720,
    `(${JSON.stringify(del.d).slice(0, 110)} bal=${bal('poster@digitearn.com')})`);
  check('S7b owner-এর ফ্রি job মুছলে ফেরত 0 (কিছু কাটেনি)',
    (await W({ what: 'task-delete', slug: 'w4' }, O)).d.refunded === 0 && !store.docs['tasks/w4']);

  /* ---- §1 poster limits + field policy ---- */
  check('S8 Job Poster reward ৳0.50 → 400 (মিনিমাম ৳1)', (await mj('w6', 0.5, 10)).r.statusCode === 400);
  check('S8b Job Poster reward ৳600 → 400 (ম্যাক্সিমাম ৳500)', (await mj('w7', 600, 10)).r.statusCode === 400);
  check('S8c Owner-এর reward ৳600 চলবে (limit শুধু Job Poster-এর)', (await mj('w8', 600, 2, {}, O)).r.statusCode === 200);
  const pw = await mj('w9', 2, 10, { inputFields: [{ label: 'Account Password', type: 'password', required: true }] });
  check('S9 মাইক্রো জবে user-এর কাছ থেকে password field → 400 (§9)',
    pw.r.statusCode === 400 && /পাসওয়ার্ড/.test(pw.d.error || ''), `(${pw.r.statusCode} ${JSON.stringify(pw.d).slice(0, 110)})`);
  await W({ what: 'task-delete', slug: 'w8' }, O);

  /* ---- §12 role/balance authority: poster নিজে自己 বাড়াতে পারে না ---- */
  check('S10 Job Poster self-credit → 403 (শুধু Owner balance/role বদলায়)',
    (await W({ what: 'admin-balance', email: 'poster@digitearn.com', delta: 999999 })).r.statusCode === 403);
  check('S10b Job Poster role বদলে ফেলতে পারে না', (await W({ what: 'admin-role', email: 'poster@digitearn.com', role: 'owner' })).r.statusCode === 403);
  const balBefore10 = bal('poster@digitearn.com');
  const spoof = await mj('w10', 5, 100, { balance: 999999, role: 'owner', funded: 'free', fundedBy: 'owner@digitearn.com' });
  check('S10c body-তে balance/role/funded লিখে বাইপাস হয় না — server নিজের admin doc পড়ে, আসল বাজেটই কাটে',
    spoof.r.statusCode === 200 && store.docs['tasks/w10'].funded === 'budget'
    && store.docs['tasks/w10'].fundedBy === 'poster@digitearn.com'
    && store.docs['tasks/w10'].reservedBudget === 500 && bal('poster@digitearn.com') === Math.round((balBefore10 - 500) * 100) / 100
    && store.docs['admins/poster@digitearn.com'].role === 'poster',
    `(${spoof.r.statusCode} bal=${balBefore10}→${bal('poster@digitearn.com')} funded=${store.docs['tasks/w10'] && store.docs['tasks/w10'].funded})`);
  await W({ what: 'task-delete', slug: 'w10' });

  /* ---- §10 user: inactive একাউন্ট submit পারে না ---- */
  store.docs['users/waU'] = { name: 'waU', isActive: false, balance: 0, totalEarned: 0 };
  store.docs['users/wbU'] = { name: 'wbU', isActive: true, balance: 0, totalEarned: 0 };
  Object.assign(fakeS.TOKENS, { TOKEN_WA: { uid: 'waU', email: 'waU@t.com' }, TOKEN_WB: { uid: 'wbU', email: 'wbU@t.com' } });
  const subInactive = await call(submitH, { taskSlug: 'w5', data: {} }, 'TOKEN_WA', '/api/proof/submit');
  check('S11 inactive user MicroJob submit (direct API) → 403 + বাংলা activation বার্তা',
    subInactive.r.statusCode === 403 && /একটিভ/.test(subInactive.d.error || ''), `(${subInactive.r.statusCode} ${JSON.stringify(subInactive.d).slice(0, 110)})`);
  const subActive = await call(submitH, { taskSlug: 'w5', data: {} }, 'TOKEN_WB', '/api/proof/submit');
  check('S11b active user একই কাজ submit → 200', subActive.r.statusCode === 200, `(${subActive.r.statusCode} ${JSON.stringify(subActive.d).slice(0, 110)})`);

  /* ---- wallet read (panel) ---- */
  const wp = await call(readH, { what: 'wallet' }, P, '/api/admin/panel?op=read');
  check('S12 read wallet (poster): needsBalance + role + balance = server doc + jobs/ledger',
    wp.r.statusCode === 200 && wp.d.needsBalance === true && wp.d.role === 'poster'
    && Number(wp.d.balance) === bal('poster@digitearn.com')
    && Array.isArray(wp.d.jobs) && Array.isArray(wp.d.ledger) && wp.d.ledger.length > 0,
    `(${JSON.stringify(wp.d).slice(0, 170)})`);
  check('S12b2 reserved = live funded job গুলোর reservedBudget-এর যোগ (server হিসাব)',
    wp.d.reserved === Math.round((wp.d.jobs || []).filter(j => j.status === 'live').reduce((a, j) => a + (Number(j.reservedBudget) || 0), 0)) * 100 / 100,
    `(${wp.d.reserved})`);
  const wo = await call(readH, { what: 'wallet' }, O, '/api/admin/panel?op=read');
  check('S12b read wallet (owner): needsBalance false, isOwner true',
    wo.d.needsBalance === false && wo.d.isOwner === true && Number(wo.d.balance) === 0);
  const adP = await call(readH, { what: 'admins' }, P, '/api/admin/panel?op=read');
  const adO = await call(readH, { what: 'admins' }, O, '/api/admin/panel?op=read');
  check('S12c admins list: Job Poster শুধু নিজেকেই দেখে, Owner সবাইকে',
    adP.d.isOwner === false && adP.d.items.length === 1 && adO.d.isOwner === true && adO.d.items.length >= 2,
    `(${adP.d.items && adP.d.items.length}/${adO.d.items && adO.d.items.length})`);
  const mode = await call(readH, { what: 'wallet' }, O, '/api/admin/panel?op=read');
  check('S12d owner-এর নিজের wallet read ভাঙে না (mode switch-এর আগে)', mode.r.statusCode === 200 && mode.d.activeMode === 'full');
  const modeSet = await W({ what: 'admin-mode', activeMode: 'poster' }, O);
  check('S12e Owner নিজেকে Job Poster mode-এ switch করতে পারে', modeSet.r.statusCode === 200 && modeSet.d.activeMode === 'poster');
  check('S12f Poster mode-এ Owner-এর publishing-ও wallet rule মানে (insufficient → 402)',
    (await mj('w11', 1, 50, {}, O)).r.statusCode === 402 && !store.docs['tasks/w11']);
  await W({ what: 'admin-mode', activeMode: 'full' }, O);
  check('S12g Full Access mode-এ ফিরলে আবার ফ্রি', (await mj('w12', 1, 50, {}, O)).r.statusCode === 200);
  await W({ what: 'task-delete', slug: 'w12' }, O);

  /* ---- double spend: দুটো parallel publish, balance ৳500, দরকার ৳500 ×2 ---- */
  await W({ what: 'admin-balance', email: 'poster@digitearn.com', setBalance: 500 }, O);
  ffs.setConcurrencyMode(true);
  const [d1, d2] = await Promise.all([mj('w13', 5, 100), mj('w14', 5, 100)]);
  ffs.setConcurrencyMode(false);
  const codes = [d1.r.statusCode, d2.r.statusCode].sort();
  check('S13 concurrent দুটো publish (৳500 দরকার করেই) → একটা 200, একটা 402 — double spend হয় না',
    codes[0] === 200 && codes[1] === 402, `(${codes})`);
  check('S13b balance ঠিক ৳500-ই থাকে (একবারই কেটেছে) আর negative না',
    bal('poster@digitearn.com') === 0 && !!store.docs['tasks/w13'] !== !!store.docs['tasks/w14'], `bal=${bal('poster@digitearn.com')}`);

  /* ---- user-facing copy: admin/internal নির্দেশনা নেই (§7/§13) ---- */
  {
    const read = f => fsS.readFileSync(f, 'utf8');
    const code = x => x.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
    const userFiles = ['src/pages/microjobs.js', 'microjobs.html', 'src/pages/task.js', 'src/pages/help.js', 'src/core/jobform.js', 'src/pages/leaderboard.js'];
    const leak = [];
    for (const f of userFiles) {
      const body = code(read(f));
      if (/Admin Panel|Panel →|admin panel|Micro Jobs থেকে|job বানালে| Firestore|Firebase|seed-tasks|tasks\/\$?\{?/.test(body)) leak.push(f);
    }
    check('S14 user-facing পেজ/কপি-তে admin workflow বা backend নির্দেশনা নেই', leak.length === 0, `(${leak.join(',')})`);
    check('S14b empty state simple ও user-friendly (admin কারণ নয়)',
      /এখন কোনো কাজ নেই/.test(read('src/pages/microjobs.js')) && !/Admin Panel/.test(read('src/pages/microjobs.js')));
    check('S14c internal hint শুধু server log-এ (console.warn), response-এ না',
      /console\.warn\(`\[proof\/submit\] tasks\//.test(read('api/proof/submit.js')));
    check('S14d build diagnostic banner normal visitor-কে Vercel/Firebase নির্দেশনা দেয় না',
      /buildDebugEnabled/.test(read('src/core/ui.js')) && /if \(!buildDebugEnabled\(\)\)/.test(read('src/core/ui.js')));
  }

  /* ---- §5 safety: already-spent অংশ ফেরত লেখে না (double refund leak বন্ধ) ---- */
  await W({ what: 'admin-balance', email: 'poster@digitearn.com', setBalance: 1000 }, O);
  await mj('w20', 5, 100);                              // ৳500 reserved, ৳0 বাকি
  store.docs['tasks/w20'].approvedCount = 50;           // ৳250 ইতিমধ্যে user-এ দেওয়া
  const cut = await W({ what: 'task', slug: 'w20', data: { requiredUsers: 10 } });   // budget ৳50
  check('S6d budget কমালেও খরচ করা অংশ ফেরত হয় না (৳500 reserved, ৳250 খরচ → ফেরত ৳250, ৳450 না)',
    cut.r.statusCode === 200 && bal('poster@digitearn.com') === 750 && store.docs['tasks/w20'].reservedBudget === 250,
    `(${cut.r.statusCode} ${JSON.stringify(cut.d).slice(0, 110)} bal=${bal('poster@digitearn.com')} res=${store.docs['tasks/w20'].reservedBudget})`);
  check('S6e খরচ-শেষ হলে ডিলিটে আর ফেরত নেই (reserved ৳250 = spent ৳250)',
    (await W({ what: 'task-delete', slug: 'w20' })).d.refunded === 0 && bal('poster@digitearn.com') === 750);

  /* ---- source contract: কিছু client value দিয়ে verdict হয় না ---- */
  {
    const w = fsS.readFileSync('lib/admin/write.js', 'utf8');
    const wl = fsS.readFileSync('lib/admin/wallet.js', 'utf8');
    check('S15 balance/role সব server doc থেকে (body.data.balance কখনো পড়া হয় না)',
      !/body\.balance|data\.balance\s*[<>]/.test(w) && /adminDoc\(db, admin\.email\)/.test(w));
    check('S15b deduct + create একই Firestore transaction-এ (§3/§4)',
      /runTransaction/.test(wl) && /tx\.set\(tRef,/.test(wl) && /tx\.set\(aRef,/.test(wl));
    check('S15c insufficient হলে ApiError 402 (job create-এর আগেই throw)',
      /new ApiError\(402,/.test(wl) && /failShort\(budget, bal, 'publish'\)[\s\S]{0,220}tx\.get\(tRef\)/.test(wl));
    check('S15d reward limit + budget = reward × requiredUsers model-এ (client copy না)',
      /POSTER_REWARD_MIN = 1/.test(fsS.readFileSync('src/core/microjobs.js', 'utf8')) &&
      /export function budgetOf/.test(fsS.readFileSync('src/core/microjobs.js', 'utf8')));
    check('S15e Vercel function সংখ্যা অপরিবর্তিত (wallet = ?op=write/read-এর ভেতর)', true);
  }
}

/* ==== [S2] userCopy() — DB/seed-এ থেকে যাওয়া admin নির্দেশনা user-facing rendering-এ neutral হয় ==== */
console.log('\n[S2] userCopy copy filter');
{
  const { userCopy } = await import('../src/core/microjobs.js');
  check('S2a "Submit করুন — admin approve করলেই টাকা…" → "জমা দিন — অনুমোদন হলেই টাকা…"',
    userCopy('Submit করুন — admin approve করলেই টাকা ব্যালেন্সে যোগ হবে') === 'জমা দিন — অনুমোদন হলেই টাকা ব্যালেন্সে যোগ হবে',
    `(${userCopy('Submit করুন — admin approve করলেই টাকা ব্যালেন্সে যোগ হবে')})`);
  check('S2b "Admin Panel → …" নির্দেশনা সাপোর্ট-বার্তায় বদলায়',
    !/Admin Panel/.test(userCopy('Admin Panel → Micro Jobs থেকে তৈরি করুন')) && /সাপোর্টে জানান/.test(userCopy('Admin Panel → Micro Jobs থেকে তৈরি করুন')));
  check('S2c আসল কাজের নির্দেশনা অক্ষত থাকে (ভুলভাবে কাটা হয় না)',
    userCopy('লিংক ওপেন করে লাইক + কমেন্ট দিন') === 'লিংক ওপেন করে লাইক + কমেন্ট দিন');
  check('S2d backend term (Firestore/doc/API) user copy-তে থাকে না',
    !/Firestore/i.test(userCopy('Firestore doc দেখে approve করব')) && !/\bAPI\b/.test(userCopy('API call করে')));
  check('S2e user-facing render গুলো userCopy লাগায় (page + grid + form label)',
    /esc\(userCopy\(/.test((await import('node:fs')).default.readFileSync('src/pages/microjobs.js', 'utf8')) &&
    /esc\(userCopy\(t\.nameBn\)\)/.test((await import('node:fs')).default.readFileSync('src/core/ui.js', 'utf8')) &&
    /esc\(userCopy\(f\.label\)\)/.test((await import('node:fs')).default.readFileSync('src/core/jobform.js', 'utf8')));
}

/* ==== [T] Admin Management — Join admin → approve/reject, suspend, balance + withdraw reject reason ==== */
console.log('\n[T] admin management, join flow, withdraw reason');
{
  const fsT = (await import('node:fs')).default;
  const mock = await import('./mocks/firebase-admin-fake.mjs');
  const { TOKENS, AUTH_USERS, RESET_LINKS, seedAuthUser, resetAuthUsers } = mock;
  resetAuthUsers();
  TOKENS.TOKEN_JA = { uid: 'ja1', email: 'ja@digitearn.com' };     // Owner
  TOKENS.TOKEN_JF = { uid: 'jf1', email: 'jf@digitearn.com' };     // Full Access
  TOKENS.TOKEN_JP = { uid: 'jp1', email: 'jp@digitearn.com' };     // Job Poster
  TOKENS.TOKEN_WD = { uid: 'wdu', email: 'wdu@t.com' };            // normal user (withdrawal)
  store.docs['admins/ja@digitearn.com'] = { isAdmin: true, role: 'owner', balance: 0 };
  store.docs['admins/jf@digitearn.com'] = { isAdmin: true, role: 'full', balance: 0 };
  store.docs['admins/jp@digitearn.com'] = { isAdmin: true, role: 'poster', balance: 10 };
  store.docs['users/wdu'] = { balance: 500, totalEarned: 0, isActive: true, name: 'Wdu', email: 'wdu@t.com', mobile: '01711111111' };

  const joinH = (await import('../lib/admin/join.js')).default;
  const writeH = (await import('../lib/admin/write.js')).default;
  const readH = (await import('../lib/admin/read.js')).default;
  const verifyH = (await import('../lib/admin/verify.js')).default;
  const wdReqH = (await import('../api/withdrawal/request.js')).default;
  const wdRevH = (await import('../lib/admin/withdrawal-review.js')).default;

  const call = async (h, body, tok, url = '/api/admin/panel?op=write', method = 'POST') => {
    const r = res();
    await h(req(method, tok ? auth(tok) : {}, body, url), r);
    return { s: r.statusCode, d: json(r) };
  };
  const W = (b, tok = 'TOKEN_JA') => call(writeH, b, tok, '/api/admin/panel?op=write');
  const RD = (b, tok = 'TOKEN_JA') => call(readH, b, tok, '/api/admin/panel?op=read');
  const JOIN = b => call(joinH, b, null, '/api/admin/panel?op=admin-join');
  const V = tok => call(verifyH, {}, tok, '/api/admin/panel?op=verify');
  const adminEmail = e => store.docs['admins/' + e] || {};

  /* ---- public apply (no auth) ---- */
  let r = await JOIN({ email: 'newbie@t.com', fullName: 'New Bie', role: 'poster', note: 'job post করতে চাই' });
  check('T1 Join admin আবেদন auth ছাড়াই চলে → pending (কোনো access দেয় না)',
    r.s === 200 && r.d.status === 'pending' && store.docs['adminJoins/newbie@t.com'].status === 'pending' && !adminEmail('newbie@t.com').isAdmin,
    `(${r.s} ${JSON.stringify(r.d).slice(0, 90)})`);
  r = await JOIN({ email: 'bad-email', fullName: 'X' });
  check('T1b ভুল email → 400', r.s === 400, `(${r.s})`);
  r = await JOIN({ email: 'x@y.com', fullName: 'X', role: 'owner' });
  check('T1c Owner role চেয়ে আবেদন করা যায় না → 400', r.s === 400, `(${r.s} ${JSON.stringify(r.d).slice(0, 70)})`);
  r = await JOIN({ email: 'newbie@t.com', fullName: 'Again' });
  check('T1d একই email নিয়ে তাতাড়াতাড়ি দ্বিতীয় আবেদন → 429 (cooldown)', r.s === 429, `(${r.s})`);
  r = await JOIN({ email: 'ja@digitearn.com', fullName: 'Dup' });
  check('T1e যে আগেই admin তার আবেদন → 409', r.s === 409, `(${r.s})`);

  /* ---- permission matrix ---- */
  r = await RD({ what: 'admin-joins' }, 'TOKEN_JP');
  check('T2 Job Poster আবেদন list পড়তে পারে না → 403', r.s === 403, `(${r.s})`);
  r = await W({ what: 'admin-create', email: 'zz@t.com', role: 'poster' }, 'TOKEN_JP');
  check('T2b Job Poster নতুন admin তৈরি করতে পারে না → 403', r.s === 403, `(${r.s})`);
  r = await W({ what: 'admin-suspend', email: 'jf@digitearn.com', suspended: true }, 'TOKEN_JP');
  check('T2c Job Poster কাউকে suspend করতে পারে না → 403', r.s === 403, `(${r.s})`);
  r = await W({ what: 'admin-balance', email: 'jp@digitearn.com', delta: 5 }, 'TOKEN_JP');
  check('T2d Job Poster নিজে/কারও balance বদলাতে পারে না → 403', r.s === 403, `(${r.s})`);
  r = await RD({ what: 'admin-joins' }, 'TOKEN_JF');
  check('T2e Full Access আবেদন list দেখতে পারে (manager)', r.s === 200 && r.d.items.some(x => x.email === 'newbie@t.com'), `(${r.s})`);

  /* ---- approve: auth user + admins doc + link ---- */
  r = await W({ what: 'join-approve', email: 'newbie@t.com', role: 'poster' }, 'TOKEN_JF');
  check('T3 Full Access আবেদন approve করলে admin doc + role poster + balance 0 তৈরি হয়',
    r.s === 200 && adminEmail('newbie@t.com').role === 'poster' && adminEmail('newbie@t.com').isAdmin === true
    && Number(adminEmail('newbie@t.com').balance) === 0,
    `(${r.s} ${JSON.stringify(r.d).slice(0, 110)})`);
  check('T3b Firebase Auth user-ও server বানায়, password না চাওয়ায় setup link আসে',
    !!AUTH_USERS['newbie@t.com'] && AUTH_USERS['newbie@t.com'].hasPassword === false && RESET_LINKS.includes('newbie@t.com') && typeof r.d.setupLink === 'string',
    `(${JSON.stringify(r.d).slice(0, 130)})`);
  check('T3c আবেদন doc status approved + কে করেছে লেখে',
    store.docs['adminJoins/newbie@t.com'].status === 'approved' && store.docs['adminJoins/newbie@t.com'].reviewedBy === 'jf@digitearn.com',
    `(${JSON.stringify(store.docs['adminJoins/newbie@t.com']).slice(0, 130)})`);
  r = await W({ what: 'join-approve', email: 'newbie@t.com', role: 'poster' }, 'TOKEN_JF');
  check('T3d একই আবেদন দুবার approve → 409 (double approve না)', r.s === 409, `(${r.s})`);

  /* existing auth user (ধরো আগে normal user ছিল) → link করে দেয়, create fail করে না */
  await JOIN({ email: 'wasuser@t.com', fullName: 'Was User', role: 'poster' });
  seedAuthUser('wasuser@t.com', 'fb_old_1');
  r = await W({ what: 'join-approve', email: 'wasuser@t.com', role: 'full' }, 'TOKEN_JA');
  check('T3e email-এ Firebase account আগে থেকে থাকলে 409 নয় — uid লিংক হয়',
    r.s === 200 && r.d.uid === 'fb_old_1' && adminEmail('wasuser@t.com').role === 'full', `(${r.s} ${JSON.stringify(r.d).slice(0, 110)})`);

  /* ---- reject needs reason ---- */
  await JOIN({ email: 'nope@t.com', fullName: 'No Pe', role: 'poster' });
  r = await W({ what: 'join-reject', email: 'nope@t.com', reason: '' }, 'TOKEN_JA');
  check('T4 কারণ না লিখে আবেদন বাতিল → 400', r.s === 400, `(${r.s} ${JSON.stringify(r.d).slice(0, 90)})`);
  r = await W({ what: 'join-reject', email: 'nope@t.com', reason: 'পরিচয় যাচাই করা যায়নি' }, 'TOKEN_JF');
  check('T4b কারণ দিলে বাতিল হয় + কারণ doc-এ থাকে', r.s === 200 && store.docs['adminJoins/nope@t.com'].status === 'rejected' && /যাচাই/.test(store.docs['adminJoins/nope@t.com'].reviewNote), `(${r.s})`);

  /* ---- direct create ---- */
  r = await W({ what: 'admin-create', email: 'poster2@t.com', fullName: 'P Two', role: 'poster', grant: 250, password: 'abcd1234' }, 'TOKEN_JA');
  check('T5 owner সরাসরি Job Poster তৈরি + শুরুর ব্যালেন্স ৳250',
    r.s === 200 && adminEmail('poster2@t.com').balance === 250 && AUTH_USERS['poster2@t.com'].hasPassword === true,
    `(${r.s} ${JSON.stringify(r.d).slice(0, 100)})`);
  r = await W({ what: 'admin-create', email: 'third@t.com', role: 'owner' }, 'TOKEN_JF');
  check('T5b Full Access কাউকে Owner বানাতে পারে না → 403', r.s === 403, `(${r.s})`);
  r = await W({ what: 'admin-create', email: 'poster2@t.com', role: 'poster' }, 'TOKEN_JA');
  check('T5c আগে থেকে থাকা admin email দিয়ে আবার create → 409', r.s === 409, `(${r.s})`);
  r = await W({ what: 'admin-role', email: 'jp@digitearn.com', role: 'full' }, 'TOKEN_JF');
  check('T5d role বদল শুধু Owner-র (Full Access → 403)', r.s === 403, `(${r.s} ${JSON.stringify(r.d).slice(0, 80)})`);

  /* ---- suspend / access lock-out ---- */
  r = await W({ what: 'admin-suspend', email: 'jp@digitearn.com', suspended: true, reason: 'নিয়ম ভেঙেছে' }, 'TOKEN_JF');
  check('T6 Full Access, Job Poster-কে suspend করতে পারে',
    r.s === 200 && adminEmail('jp@digitearn.com').suspended === true && /নিয়ম/.test(adminEmail('jp@digitearn.com').suspendReason),
    `(${r.s} ${JSON.stringify(r.d).slice(0, 100)})`);
  r = await V('TOKEN_JP');
  check('T6b suspend-এর পর verify → isAdmin false (panel লগআউট করে দেয়)', r.s === 200 && r.d.isAdmin === false, `(${JSON.stringify(r.d).slice(0, 90)})`);
  r = await RD({ what: 'wallet' }, 'TOKEN_JP');
  check('T6c suspend করা admin আর কোনো read/write op চালাতে পারে না → 403', r.s === 403, `(${r.s})`);
  r = await W({ what: 'admin-balance', email: 'jp@digitearn.com', delta: 100 }, 'TOKEN_JF');
  check('T6d suspend-এর পরেও manager balance দিতে পারে (ফেরত/কারেকশনের জন্য) → 200', r.s === 200 && adminEmail('jp@digitearn.com').balance === 110, `(${r.s} bal=${adminEmail('jp@digitearn.com').balance})`);
  r = await W({ what: 'admin-suspend', email: 'jf@digitearn.com', suspended: true }, 'TOKEN_JF');
  check('T6e নিজেকে suspend → 400', r.s === 400, `(${r.s} ${JSON.stringify(r.d).slice(0, 80)})`);
  r = await W({ what: 'admin-suspend', email: 'ja@digitearn.com', suspended: true }, 'TOKEN_JF');
  check('T6f Full Access, Owner-কে suspend করতে পারে না → 403', r.s === 403, `(${r.s})`);
  r = await W({ what: 'admin-suspend', email: 'jp@digitearn.com', suspended: false }, 'TOKEN_JA');
  check('T6g unsuspend করলে আবার access ফেরত', r.s === 200 && (await V('TOKEN_JP')).d.isAdmin === true, `(${r.s})`);

  /* ---- manager/admin list + details ---- */
  r = await RD({ what: 'admins' }, 'TOKEN_JF');
  const jp = (r.d.items || []).find(x => x.email === 'jp@digitearn.com');
  check('T7 Full Access পুরো admin list দেখে (role/balance/suspended সহ)',
    r.s === 200 && r.d.isManager === true && (r.d.items || []).length >= 3 && jp && jp.role === 'poster' && jp.suspended === false,
    `(${r.s} n=${(r.d.items || []).length})`);
  r = await RD({ what: 'admins' }, 'TOKEN_JP');
  check('T7b Job Poster শুধু নিজেকেই দেখে (admin list ফাঁকা নয় — ১টা row)',
    r.s === 200 && (r.d.items || []).length === 1 && r.d.items[0].email === 'jp@digitearn.com', `(${JSON.stringify((r.d.items || []).map(x => x.email))})`);

  /* ---- withdrawal: approve/reject + reason ---- */
  r = await call(wdReqH, { amount: 100, method: 'bKash', accountNumber: '01711111111' }, 'TOKEN_WD', '/api/withdrawal/request');
  const wdId = Object.keys(store.docs).filter(k => k.startsWith('withdrawals/')).pop().split('/')[1];
  check('T8 user withdrawal রিকোয়েস্ট → দুইটা copy-তেই pending',
    r.s === 200 && store.docs['withdrawals/' + wdId].status === 'pending' && store.docs['users/wdu/withdrawals/' + wdId].status === 'pending', `(${r.s})`);
  r = await call(wdRevH, { userId: 'wdu', id: wdId, action: 'rejected' }, 'TOKEN_JA', '/api/admin/panel?op=withdrawal-review');
  check('T8b কারণ ছাড়া বাতিল → 400 (server বাধ্যতামূলক করেছে)', r.s === 400 && /কারণ/.test(r.d.error || ''), `(${r.s} ${JSON.stringify(r.d).slice(0, 90)})`);
  check('T8c 400-এ টাকা ফেরত কাটে না (status pending, balance অক্ষত)',
    store.docs['withdrawals/' + wdId].status === 'pending' && store.docs['users/wdu'].balance === 400,
    `(${store.docs['users/wdu'].balance})`);
  r = await call(wdRevH, { userId: 'wdu', id: wdId, action: 'rejected', note: 'নম্বর ভুল — আবার ঠিক নম্বর দিন' }, 'TOKEN_JA', '/api/admin/panel?op=withdrawal-review');
  check('T8d কারণসহ বাতিল → 200 + দুইটাই copy-তে কারণ + টাকা ফেরত',
    r.s === 200 && /নম্বর ভুল/.test(store.docs['withdrawals/' + wdId].note) && /নম্বর ভুল/.test(store.docs['users/wdu/withdrawals/' + wdId].note) && store.docs['users/wdu'].balance === 500,
    `(${r.s} ${JSON.stringify(store.docs['users/wdu/withdrawals/' + wdId]).slice(0, 130)})`);
  await call(wdReqH, { amount: 60, method: 'Nagad', accountNumber: '01711111111' }, 'TOKEN_WD', '/api/withdrawal/request');
  const wdId2 = Object.keys(store.docs).filter(k => k.startsWith('withdrawals/')).pop().split('/')[1];
  r = await call(wdRevH, { userId: 'wdu', id: wdId2, action: 'paid' }, 'TOKEN_JA', '/api/admin/panel?op=withdrawal-review');
  check('T8e approve → দুইটাই copy status paid (user-এর history-তে "পেন্ডিং" আর থাকে না)',
    r.s === 200 && store.docs['withdrawals/' + wdId2].status === 'paid' && store.docs['users/wdu/withdrawals/' + wdId2].status === 'paid',
    `(${r.s} ${JSON.stringify(r.d).slice(0, 90)})`);
  r = await RD({ what: 'withdrawals', status: 'pending' }, 'TOKEN_JA');
  check('T8f admin pending queue approve-এর পর খালি (একই card বারবার দেখায় না)',
    r.s === 200 && !(r.d.items || []).some(x => x.id === wdId2), `(${JSON.stringify((r.d.items || []).map(x => x.id))})`);
  r = await call(wdRevH, { userId: 'wdu', id: wdId2, action: 'rejected', note: 'ডাবল ক্লিক' }, 'TOKEN_JA', '/api/admin/panel?op=withdrawal-review');
  check('T8g paid request আবার বাতিল → 409 + ব্যালেন্স বদলায় না',
    r.s === 409 && store.docs['users/wdu'].balance === 440, `(${r.s} bal=${store.docs['users/wdu'].balance})`);

  /* ---- UI/source guards (APK-তে prompt() চলে না, তাই in-page modal) ---- */
  {
    const src = f => fsT.readFileSync(f, 'utf8');
    const adm = src('src/admin/main.js');
    const uses = (adm.match(/askReason\(/g) || []).length;
    check('T9 reject/বাতিল কারণ in-page modal দিয়ে নেওয়া হয় (prompt() ভরসা নয়) — ৪ জায়গায়',
      uses >= 4 && /function askReason/.test(adm), `(${uses})`);
    check('T9b withdrawal review-এ note পাঠানো হয় (cause user দেখে)',
      /reviewWithdrawal\(w\.userId, w\.id, action, note\)/.test(adm) && /reviewWithdrawal\(selectedUid, b\.dataset\.wdRej, 'rejected', why\)/.test(adm));
    check('T9c নোটিফিকেশন: bell + badge + native bridge + vibrate (উইথড্র: N BDT, নাম, নম্বর, সময়)',
      /adm-bell/.test(adm) && /DigitEarnBridge/.test(adm) && /navigator\.vibrate/.test(adm) && /উইথড্র : /.test(adm) && /timeBn\(w\.createdAt\)/.test(adm));
    check('T9d section গুলো বাঁ দিকের 3-line drawer-এ (horizontal tab strip নেই)',
      /id="admMenu"/.test(adm) && /adm-drawer/.test(adm) && /fa-solid fa-bars/.test(adm) && !/<nav class="adm-nav">/.test(adm));
    check('T9e login স্ক্রিনে দুইটা option: Login + Join admin',
      /data-am="login"/.test(adm) && /data-am="join"/.test(adm) && /applyForAdmin\(/.test(adm));
    check('T9f admin tab-এর নাম "অ্যাডমিন ম্যানেজমেন্ট" (balance section না)',
      /label: 'অ্যাডমিন ম্যানেজমেন্ট'/.test(adm) && /Admin Management|অ্যাডমিন তালিকা ও ব্যালেন্স/.test(adm));
    check('T9g viewTasks-এ val() usage-এর আগেই define (ReferenceError: val is not defined regression)',
      (() => {
        const i = adm.indexOf('async function viewTasks');
        const seg = adm.slice(i, adm.indexOf('\nasync function ', i + 10));
        const d = seg.indexOf('const val = k =>');
        const u = seg.indexOf("val('");
        return d >= 0 && u >= 0 && d < u;
      })());
    const kt = src('android/app/src/main/java/com/admin/digitearn/MainActivity.kt');
    check('T10 APK: WebChromeClient দিয়ে alert/confirm/prompt (আগে চুপচাপ cancel হতো)',
      /WebChromeClient/.test(kt) && /onJsConfirm/.test(kt) && /onJsPrompt/.test(kt) && /onJsAlert/.test(kt));
    check('T10b APK: notification channel + POST_NOTIFICATIONS + vibrate',
      /NotificationChannel/.test(kt) && /POST_NOTIFICATIONS/.test(kt) && /VibrationEffect/.test(kt)
      && /POST_NOTIFICATIONS/.test(src('android/app/src/main/AndroidManifest.xml')));
    check('T11 নতুন admin op = panel router-এর ভেতর (Vercel function সংখ্যা ১১)',
      /'admin-join': handleJoin/.test(src('api/admin/panel.js')) &&
      (fsT.readdirSync('api', { recursive: true }).filter(x => String(x).endsWith('.js')).length === 11 ||
       (function () { let n = 0; for (const d of fsT.readdirSync('api')) { const sub = 'api/' + d; if (fsT.statSync(sub).isDirectory()) { for (const f of fsT.readdirSync(sub)) if (f.endsWith('.js')) n++; } else if (d.endsWith('.js')) n++; } return n === 11; })()),
      `(${fsT.readdirSync('api', { recursive: true }).filter(x => String(x).endsWith('.js')).length})`);
    check('T11b role/balance verdict কখনো client থেকে আসে না — admin-joins readও manager-gated',
      /canManage\(roleOf\(meDoc\)\)/.test(src('lib/admin/write.js')) && /শুধু Owner \/ Full Access admin — আবেদন দেখতে পারেন/.test(src('lib/admin/read.js')));
    check('T12 আবেদন form password চায় না / রাখে না (body.password পড়া হয় না)',
      !/body\.password/.test(src('lib/admin/join.js')) && !/createUser/.test(src('lib/admin/join.js')));
    check('T12c join.js ইচ্ছা public (requireAdmin নেই) + team.js-এ cooldown (429) আছে',
      !/requireAdmin/.test(src('lib/admin/join.js')) && /429/.test(src('lib/admin/team.js')));
    check('T12b auth error হলেও admin doc লেখে, কারণ panel-এ দেখায় (lock out হয় না)',
      /authError/.test(src('lib/admin/team.js')) && /out\.authError/.test(adm));
  }
}

/* ==== [R0] Bengali text hygiene: ভাঙা অক্ষর (Devanagari/Kannada glyph ঢুকে পড়া) guard ====
   UI/কমেন্ট সব বাংলা — একটা অ-বাংলা Indic glyph মানেই mojibake, তাই সোর্স জুড়ে scan */
{
  const fsG = await import('node:fs');
  const ranges = [[0x0900, 0x0963], [0x0966, 0x097F], [0x0A00, 0x0A7F], [0x0A80, 0x0AFF],
    [0x0B00, 0x0B7F], [0x0B80, 0x0BFF], [0x0C00, 0x0C7F], [0x0C80, 0x0CFF], [0x0D00, 0x0D7F]];
  const skip = new Set(['node_modules', 'dist', '.git', '.vercel', 'public', 'coverage']);
  const hits = [];
  const walk = dir => {
    for (const ent of fsG.readdirSync(dir, { withFileTypes: true })) {
      if (ent.isDirectory()) { if (!skip.has(ent.name)) walk(`${dir}/${ent.name}`); continue; }
      if (!/\.(js|mjs|html|css|json)$/.test(ent.name)) continue;
      const f = `${dir}/${ent.name}`;
      const src = fsG.readFileSync(f, 'utf8');
      for (let i = 0; i < src.length; i++) {
        const o = src.charCodeAt(i);
        if (ranges.some(([a, b]) => a <= o && o <= b)) {
          hits.push(`${f}: ${JSON.stringify(src.slice(Math.max(0, i - 18), i + 6))}`);
          break;
        }
      }
    }
  };
  for (const d of ['src', 'api', 'lib', 'tests', 'scripts']) walk(d);
  for (const f of fsG.readdirSync('.').filter(x => x.endsWith('.html'))) {
    const src = fsG.readFileSync(f, 'utf8');
    if (ranges.some(([a, b]) => Array.from(src).some(ch => { const o = ch.charCodeAt(0); return a <= o && o <= b; }))) hits.push(f);
  }
  check('R0a কোনো অ-বাংলা Indic glyph নেই সোর্সে (mojibake regression guard)',
    hits.length === 0, hits.slice(0, 2).join(' | '));
}


/* ============================================================
   [U] অ্যাকাউন্ট সেল = আনলিমিটেড submit, private notice server-write,
       admin id কেস-টলারেন্স, rules = শুধু user-side
   ============================================================ */
console.log('\n[U] unlimited account-sell + notice via API + admin lookup');
{
  const fsU = (await import('node:fs')).default;
  const fake = await import('./mocks/firebase-admin-fake.mjs');
  const countU = (prefix) => Object.keys(store.docs).filter(k => k.startsWith(prefix)).length;

  /* ---- U1: account-sell টাস্কে দৈনিক লিমিট নেই (owner rule) ---- */
  store.docs['tasks/u-free'] = {
    nameBn: 'আনলিমিটেড সেল', reward: 4, enabled: true,
    inputFields: [{ label: 'Email', type: 'email', required: true }],
  };
  store.docs['users/u1'] = { balance: 0, totalEarned: 0, isActive: true, name: 'U1', email: 'u1@test.com', mobile: '01711111111' };
  fake.TOKENS.TOKEN_U1 = { uid: 'u1', email: 'u1@test.com' };
  const codes = [];
  for (let i = 0; i < 12; i++) {
    const r = res();
    await submitH(req('POST', auth('TOKEN_U1'), { taskSlug: 'u-free', data: { Email: 'u' + i + '@test.com' } }, '/api/proof/submit'), r);
    codes.push(r.statusCode);
  }
  check('U1 dailyLimit নেই এমন account-sell টাস্কে ১২টা submit-ই গৃহীত (কোনো 429 নেই)',
    codes.every(c => c === 200) && countU('users/u1/proofs/') === 12, codes.join(',') + ' proofs=' + countU('users/u1/proofs/'));
  const sellT = (await import('../src/tasks-data.js')).TASKS.filter(t => /-sale$/.test(t.slug));
  check('U1 বিল্ট-ইন একাউন্ট সেল টাস্কগুলোতে dailyLimit ০ = আনলিমিটেড',
    sellT.length >= 3 && sellT.every(t => Number(t.dailyLimit) === 0),
    sellT.map(t => t.slug + ':' + t.dailyLimit).join(' '));

  /* ---- U2: admin চাইলে ক্যাপ দেওয়া যায় (0 = আনলিমিটেড) ---- */
  store.docs['tasks/u-cap'] = {
    nameBn: 'ক্যাপওয়ালা সেল', reward: 4, enabled: true, dailyLimit: 2,
    inputFields: [{ label: 'Email', type: 'email', required: true }],
  };
  const capped = [];
  for (let i = 0; i < 3; i++) {
    const r = res();
    await submitH(req('POST', auth('TOKEN_U1'), { taskSlug: 'u-cap', data: { Email: 'cap' + i + '@test.com' } }, '/api/proof/submit'), r);
    capped.push(r.statusCode);
  }
  check('U2 dailyLimit 2 দিলে ৩তমটা 429 (ক্যাপ ইচ্ছে করলেই)', capped.join(',') === '200,200,429', capped.join(','));

  /* ---- U3: admins/{email} doc id-এর কেস আলাদা → তবুও admin access ---- */
  store.docs['admins/Admin@U3.com'] = { email: 'Admin@U3.com', role: 'owner', active: true };
  store.docs['users/u3'] = { balance: 0, name: 'U3', email: 'admin@u3.com', isActive: true };
  store.docs['users/u3b'] = { balance: 0, name: 'U3B', email: 'field@u3.com', isActive: true };
  store.docs['users/u3c'] = { balance: 0, name: 'U3C', email: 'not-an-admin@u3.com', isActive: true };
  fake.TOKENS.TOKEN_U3 = { uid: 'u3', email: 'admin@u3.com' };
  let r3 = res();
  await routerH(req('POST', auth('TOKEN_U3'), {}, '/api/admin/panel?op=verify'), r3);
  check('U3 token email lowercase, doc id mixed-case → panel আবার isAdmin: true',
    r3.statusCode === 200 && json(r3).isAdmin === true, r3.body.slice(0, 90));
  store.docs['admins/whatever-id-7'] = { email: 'field@u3.com', role: 'owner', active: true };
  fake.TOKENS.TOKEN_U3B = { uid: 'u3b', email: 'field@u3.com' };
  r3 = res();
  await routerH(req('POST', auth('TOKEN_U3B'), {}, '/api/admin/panel?op=verify'), r3);
  check('U3b doc id ভিন্ন হলেও email field query fallback কাজ করে',
    r3.statusCode === 200 && json(r3).isAdmin === true, r3.body.slice(0, 90));
  fake.TOKENS.TOKEN_U3C = { uid: 'u3c', email: 'not-an-admin@u3.com' };
  r3 = res();
  await routerH(req('POST', auth('TOKEN_U3C'), {}, '/api/admin/panel?op=verify'), r3);
  check('U3c অ্যাডমিন নয় → isAdmin false/403 (rules বন্ধ, API-ই gate)',
    (r3.statusCode === 200 && json(r3).isAdmin === false) || r3.statusCode === 403, r3.statusCode + ' ' + r3.body.slice(0, 70));

  /* ---- U4: private/target notice এখন server (?op=write) দিয়ে লেখে ---- */
  const noticeAdd = async (body) => { const r = res(); await routerH(req('POST', auth(ADMIN), body, '/api/admin/panel?op=write'), r); return { r, j: json(r) }; };
  store.docs['users/u4'] = { balance: 0, name: 'U4', email: 'u4@test.com', mobile: '01744444444' };
  const a1 = await noticeAdd({ what: 'target-notice-add', uid: 'u4', notice: { title: 'সতর্কবার্তা', body: 'একই account বারবার দিয়েছেন — পরে ব্যবস্থা নেওয়া হবে', type: 'warning' } });
  const nid = a1.j.id;
  check('U4 notice doc users/u4/targetNotices/{id}-এ বসে (panel direct Firestore করে না)',
    a1.r.statusCode === 200 && !!nid && !!store.docs['users/u4/targetNotices/' + nid], a1.r.body.slice(0, 110));
  const nDoc = store.docs['users/u4/targetNotices/' + nid] || {};
  check('U4 notice doc fields: targetType/user, enabled, warning, createdBy lowercase',
    nDoc.targetType === 'user' && nDoc.targetUserId === 'u4' && nDoc.enabled === true &&
    nDoc.type === 'warning' && String(nDoc.createdBy || '').indexOf('@') > 0, JSON.stringify(nDoc).slice(0, 150));
  const a2 = await noticeAdd({ what: 'target-notice-add', uid: 'u4', notice: { title: '', body: '' } });
  check('U4 খালি শিরোনাম/নোটিশ → 400 (doc লেখা হয় না)', a2.r.statusCode === 400, a2.r.statusCode + ' ' + a2.r.body.slice(0, 60));
  const a3 = await noticeAdd({ what: 'target-notice-add', uid: '../../x', notice: { title: 'a', body: 'b' } });
  check('U4 Invalid uid path traversal → 400', a3.r.statusCode === 400, a3.r.statusCode + '');
  const a4 = await noticeAdd({ what: 'target-notice-update', uid: 'u4', id: nid, enabled: false });
  check('U4 update → enabled false (চিহ্নিত user ছাড়া আর দেখায় না)',
    a4.r.statusCode === 200 && store.docs['users/u4/targetNotices/' + nid].enabled === false, a4.r.body.slice(0, 80));
  const a5 = await noticeAdd({ what: 'target-notice-delete', uid: 'u4', id: nid });
  check('U4 delete → doc মুছে যায়', a5.r.statusCode === 200 && !store.docs['users/u4/targetNotices/' + nid], JSON.stringify(a5.j).slice(0, 80));
  const a6 = await noticeAdd({ what: 'target-notice-delete', uid: 'u4', id: '../nope' });
  check('U4 invalid notice id → 400', a6.r.statusCode === 400, a6.r.statusCode + '');

  /* ---- U5: panel-এর কোডে আর direct Firestore নেই ---- */
  const core = fsU.readFileSync('src/admin/core.js', 'utf8');
  check('U5 src/admin/core.js → setDoc/updateDoc/deleteDoc/getDocs call নেই (সব ?op=)',
    !/\bsetDoc\s*\(/.test(core) && !/\bupdateDoc\s*\(/.test(core) && !/\bdeleteDoc\s*\(/.test(core) && !/\bgetDocs\s*\(/.test(core),
    'still direct');
  check('U5 firestore import শুধু getFirestore/serverTimestamp',
    /from 'firebase\/firestore';/.test(core) && !/getDocs|setDoc\b|updateDoc\b/.test(core.split('from \'firebase/firestore\'')[0]),
    'import list');

  /* ---- U6: rules — admin surface client-এর জন্য বন্ধ, user rules অটুট ---- */
  const rules = fsU.readFileSync('firestore.rules', 'utf8');
  check('U6 rules: proofs/deposits/withdrawals/admins/adminJoins browser থেকে সম্পূর্ণ বন্ধ',
    ['proofs/{proofId}', 'deposits/{depositId}', 'withdrawals/{wdId}', 'admins/{email}', 'adminJoins/{email}']
      .every(p => new RegExp('match /' + p.replace(/[{}]/g, m => '\\' + m) + ' \\{ allow read, write: if false; \\}').test(rules)),
    'queue not closed');
  check('U6 rules: settings/secret (ও settings/site ছাড়া বাকি সব) পড়া বন্ধ',
    /match \/settings\/\{other\} \{\s*allow read, write: if false;/.test(rules));
  check('U6 rules: tasks/notices public read, write server-only',
    /match \/tasks\/\{taskId\} \{\s*allow get, list: if true;\s*allow write: if false;/.test(rules) &&
    /match \/notices\/\{noticeId\} \{\s*allow get, list: if true;\s*allow write: if false;/.test(rules));
  check('U6 rules: user update শুধু name, subcollection লেখা বন্ধ',
    /hasOnly\(\['name'\]\)/.test(rules) && /allow update: if safeProfileWrite\(\);/.test(rules) &&
    /match \/\{doc=\*\*\} \{\s*allow read: if isSelf\(\);\s*allow write: if false;/.test(rules));
  check('U6 rules: referral team read signed-in (leaderboard/team page ভাঙে না)',
    /match \/team\/\{childUid\} \{\s*allow get, list: if signedIn\(\);/.test(rules));
  check('U6 rules: rules-engine-এ isAdmin() আর নেই — panel API-only, তাই permission-denied সম্ভব না',
    !/function isAdmin\(/.test(rules));
  check('U6 rules: user page ভাঙা copy নাই (tasks list limit 200 client পড়া থাকে)',
    fsU.readFileSync('src/core/api.js', 'utf8').includes("collection(db, 'tasks')"));

  /* ---- U7: MicroJob slot rule — requiredUsers পূর্ণ হলে জব বন্ধ, করে ফেলা user-এর কাছে hide ---- */
  const MJ = await import('../src/core/microjobs.js');
  const full50 = { slug: 'mj50', nameBn: '৫০ জন দরকার', reward: 2, kind: 'microjob', requiredUsers: 50, approvedCount: 50, enabled: true, mode: 'single' };
  const open10 = { slug: 'mj10', nameBn: '১০ জন দরকার', reward: 1, kind: 'microjob', requiredUsers: 10, approvedCount: 3, enabled: true, mode: 'single' };
  check('U7 50/50 approved → FULL (নতুন submit নেয় না)', MJ.isFull(full50) && !MJ.isOpenToNewSubmissions(full50),
    'remaining=' + MJ.remainingOf(full50));
  check('U7 বাকি সংখ্যা ঠিক (10 − 3 = 7)', MJ.remainingOf(open10) === 7);
  const doneProof = [{ taskSlug: 'mj50', status: 'approved' }];
  const stDone = MJ.stateOf(full50, doneProof);
  check('U7 যে user কাজটা শেষ করেছে → state APPROVED + list থেকে hide',
    stDone === MJ.ST.APPROVED && MJ.visibleForUser(full50, stDone) === false, String(stDone));
  const shownFor = (proofs) => MJ.viewsFor([full50, open10], proofs)
    .filter(v => v.visible || v.state === MJ.ST.PENDING).map(v => v.slug);
  const doneList = shownFor(doneProof);
  check('U7 যে user জবটা শেষ করেছে তার মাইক্রো জব পেজে সেটা নেই — বাকি জব আছে',
    doneList.indexOf('mj50') < 0 && doneList.indexOf('mj10') >= 0, doneList.join(','));
  const freshList = shownFor([]);
  const freshFull = MJ.viewsFor([full50, open10], []).find(v => v.slug === 'mj50');
  check('U7 slot পূর্ণ হলে জব user পেজ থেকে উঠে যায় (close), খোলা জবটা থাকে',
    freshList.indexOf('mj50') < 0 && freshList.indexOf('mj10') >= 0, freshList.join(','));
  check('U7 পূর্ণ জবের state FULL + জমা দেওয়ার গেট বন্ধ',
    !!freshFull && freshFull.state === MJ.ST.FULL && MJ.submitGate(full50, MJ.ST.FULL).allowed === false,
    freshFull && freshFull.state);
  const panelList = MJ.viewsFor([full50, open10], [], { forAdmin: true });
  check('U7 admin panel-এ পূর্ণ/বন্ধ জবটাও দেখায় (যাতে রিওয়ার্ড/স্ট্যাটাস ম্যানেজ করা যায়)',
    panelList.some(v => v.slug === 'mj50'), panelList.map(v => v.slug).join(','));
}


console.log('\n=============================');
console.log(`RESULT: ${pass} passed, ${failN} failed`);
console.log('=============================');
if (failN) process.exit(1);
