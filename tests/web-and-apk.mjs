/* DigitEarn — website + APK packaging regressions (no network, no Firebase needed).
   Runs the real browser modules through Vite's SSR loader and checks the APK's
   embedded bundle against the panel source.
   Run: node tests/web-and-apk.mjs */
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { createServer } from 'vite';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, collection } from 'firebase/firestore';

let pass = 0, failN = 0;
function check(name, cond, extra = '') {
  if (cond) { pass++; console.log(`  ✅ ${name}`); }
  else { failN++; console.log(`  ❌ ${name} ${extra}`); }
}
const read = p => readFileSync(p, 'utf8');

/* codeOnly(): comment-stripped source — negative greps must look at code, not at
   the explanatory BUGFIX comments that quote the old (broken) shape */
function codeOnly(src) {
  return src.replace(/\/\*[\s\S]*?\*\//g, '').split('\n')
    .filter(l => !/^\s*(\/\/|#)/.test(l)).join('\n');
}

/* ============================================================
   [A] Dashboard/landing project links (src/core/ui.js — real module)
   ============================================================ */
console.log('\n[A] project grid → every Firestore task must link to its task page');
{
  const vite = await createServer({ configFile: false, logLevel: 'silent', server: { middlewareMode: true }, appType: 'custom' });
  const ui = await vite.ssrLoadModule('/src/core/ui.js');
  const { TASKS } = await vite.ssrLoadModule('/src/tasks-data.js');
  const slug0 = TASKS[0].slug;

  // Firestore থেকে আসা shape-ই এটা (src/core/api.js getTasks(): { id, ...data }) — kind/slug নেই
  const fireStoreTask = { id: slug0, nameBn: 'টেস্ক', reward: 5, enabled: true, sort: 1 };
  check('ui.taskHref exported (link helper)', typeof ui.taskHref === 'function');
  // crash না করে প্রতিটা assert রিপোর্ট করুক — helper না থাকলে গণনা করে skip
  const H = t => (typeof ui.taskHref === 'function' ? ui.taskHref(t) : '(missing taskHref)');
  check('taskHref(Firestore task) → /task/<slug>.html', H(fireStoreTask) === `/task/${slug0}.html`, `(${H(fireStoreTask)})`);

  const grid = ui.projectGrid([fireStoreTask]);
  check('grid card is not a dead "/" link', grid.includes(`href="/task/${slug0}.html"`), grid.slice(0, 160));
  check('grid has no href="/" left', !/href="\/"/.test(grid));

  const withSlug = { id: slug0, slug: slug0, nameBn: 'x', sort: 1 };
  check('taskHref prefers slug when present', H(withSlug) === `/task/${slug0}.html`, `(${H(withSlug)})`);

  const page = { kind: 'page', slug: 'gift', nameBn: 'গিফট', url: '/gift.html', sort: 8 };
  check('internal page keeps its own url', H(page) === '/gift.html', `(${H(page)})`);

  const unknown = { id: 'brand-new-task', nameBn: 'New', url: 'https://example.com/x', sort: 3 };
  check('unknown slug (no static page) → external url, not homepage', H(unknown) === 'https://example.com/x', `(${H(unknown)})`);
  check('unknown slug without url → dashboard (not bare "/")', H({ id: 'zzz', nameBn: 'Z' }) === '/dashboard.html', `(${H({ id: 'zzz', nameBn: 'Z' })})`);

  const gridEmpty = ui.projectGrid([]);
  check('static fallback still links to task pages', gridEmpty.includes(`href="/task/${slug0}.html"`));
  check('grid escapes names (no raw HTML from Firestore)', /<span class="proj-name">[^<]*<\/span>/.test(gridEmpty.slice(0, 4000)));
  const injected = ui.projectGrid([{ id: slug0, nameBn: '<img src=x onerror=alert(1)>', sort: 1 }]);
  check('XSS: nameBn is escaped', injected.includes('&lt;img') && !injected.includes('<img src=x'), injected.slice(0, 200));
  await vite.close();
}

/* ============================================================
   [A2] Stale ID token → force-refresh + single retry (src/core/api.js, real module)
        User report: submit করলে "Login required", অথচ user logged-in ছিল
   ============================================================ */
console.log('\n[A2] api client survives an expired token and never says "Login required" for a server problem');
{
  const vite = await createServer({ configFile: false, logLevel: 'silent', server: { middlewareMode: true }, appType: 'custom' });
  const api = await vite.ssrLoadModule('/src/core/api.js');
  const R = api.shouldRetryWithFreshToken, M = api.apiErrorMessage;
  check('shouldRetryWithFreshToken exported (testable)', typeof R === 'function');
  check('apiErrorMessage exported (testable)', typeof M === 'function');
  const cu = { uid: 'x' };
  if (typeof R === 'function') {
    check('401 while logged in → retry with a fresh token', R(401, {}, cu) === true);
    check('sessionExpired flag → retry regardless of status', R(400, { sessionExpired: true }, cu) === true);
    check('business error (409) → no retry', R(409, { error: 'already claimed' }, cu) === false);
    check('nobody logged in → no retry (nothing to refresh)', R(401, {}, null) === false);
    check('200 → no retry', R(200, {}, cu) === false);
  }
  if (typeof M === 'function') {
    check('401 message: session gone, not "you must log in again"', /লগইন হারিয়ে গেছে/.test(M(401, { error: 'x' })), M(401, { error: 'x' }));
    check('503 message blames the server setup, not the user', /সার্ভার সেটআপ ঠিক নেই/.test(M(503, { error: 'nope' })), M(503, { error: 'nope' }));
    check('config message keeps the admin-actionable part', /project/.test(M(503, { error: 'token project: a, server project: b' })));
    check('ordinary errors pass the server message through', /duplicate/.test(M(400, { error: 'duplicate account' })));
  }
  const src = codeOnly(read('src/core/api.js'));
  check('callApi passes forceRefresh into the retry send', src.includes('getIdToken(forceRefresh)') && src.includes('await send(true)'));
  check('callApi no longer throws the same string the server 401 uses', !src.includes("throw new Error('Login required');"));
  check('boot refreshes the token up-front (long-idle tab fix)', codeOnly(read('src/core/ui.js')).includes('user.getIdToken(true)'));
  const adm = codeOnly(read('src/admin/core.js'));
  check('admin panel/APK callApi refreshes + retries too', adm.includes('getIdToken(forceRefresh)') && adm.includes('r.data.sessionExpired === true'));
  check('admin verify failure keeps the session (retry UI, no signOut)', codeOnly(read('src/admin/main.js')).includes('if (v.error)') && adm.includes('export async function adminVerify'));
  const wl = read('src/pages/wallet.js');
  check('wallet activation button guarded when link unset', wl.includes('String(settings.activationLink') && wl.includes('অ্যাডমিন এখনো এক্টিভেশন লিংক সেট করেননি'));
  await vite.close();
}

/* ============================================================
   [B] Admin panel Firestore doc paths (the 2 APK write bugs)
   ============================================================ */
console.log('\n[B] admin core.js document refs are valid (real firebase client SDK check)');
{
  const fbApp = initializeApp({ apiKey: 'test', projectId: 'test', appId: '1:test:web:x' });
  const db = getFirestore(fbApp);
  const throwsOld = (fn) => { try { fn(); return false; } catch (e) { return /even number of segments/.test(e.message); } };
  check('OLD shape doc(db,"notices") throws (this is why notices never saved)', throwsOld(() => doc(db, 'notices')));
  check('OLD shape doc(db,"users",uid,"targetNotices") throws', throwsOld(() => doc(db, 'users', 'u1', 'targetNotices')));
  const autoTop = doc(collection(db, 'notices'));
  check('FIXED all-user notice ref builds notices/<autoId>', /^notices\/[\w-]{15,25}$/.test(autoTop.path), `(${autoTop.path})`);
  const autoTn = doc(collection(db, 'users', 'u1', 'targetNotices'));
  check('FIXED targeted notice ref builds users/u1/targetNotices/<autoId>', /^users\/u1\/targetNotices\/[\w-]{15,25}$/.test(autoTn.path), `(${autoTn.path})`);

  const src = codeOnly(read('src/admin/core.js'));
  const wrtSrc = read('lib/admin/write.js');
  check("core.js addNotice → server ?op=write (notice-add)", src.includes("adminWrite('notice-add'"));
  check("server write.js notices ref = collection.doc() auto-id (odd-segment bug ফেরা যাবে না)",
    /db\.collection\('notices'\)\.doc\(\)/.test(wrtSrc) && !/doc\(db,\s*'notices'\s*\)/.test(wrtSrc));
  check("core.js uses doc(collection(db,'users',uid,'targetNotices'))", src.includes("doc(collection(db, 'users', uid, 'targetNotices'))"));
  check('no leftover single-segment doc(db,"notices")', !/doc\(db,\s*'notices'\s*\)/.test(src));
  check('no leftover odd-segment targetNotices doc()', !/doc\(db,\s*'users',\s*uid,\s*'targetNotices'\s*\)/.test(src));
  check('listNotices no longer orderBy("sort") (hides docs without sort)', !/orderBy\('sort'\)/.test(src));

  const apiBase = src.match(/const isWebOrigin[\s\S]{0,160}/);
  check('API_BASE falls back to absolute host for non-http origins', !!apiBase && /API_BASE = isWebOrigin \? '' : 'https:\/\/digitearn\.vercel\.app'/.test(src));
}

  const dash = read('src/pages/dashboard.js');
  check('dashboard: welcome modal is gated (not every load)', !/\n\s*showWelcomeModal\(settings\);/.test(dash));
  check('dashboard: remembers it was seen (localStorage flag)', /de_welcome_seen_v1/.test(dash) && /setItem\(WKEY/.test(dash));
  check('dashboard: still respects profile welcomeShown', /!user\.welcomeShown/.test(dash));

/* ============================================================
   [C] APK embedded bundle vs src/admin (stale-bundle bug)
   ============================================================ */
console.log('\n[C] APK assets/admin bundle must contain everything src/admin does');
{
  const dir = 'android/app/src/main/assets/admin';
  const htmlPath = `${dir}/index.html`;
  check('assets/admin/index.html exists', existsSync(htmlPath));
  const html = read(htmlPath);
  const refs = [...html.matchAll(/(?:src|href)="\.\/assets\/([^"]+)"/g)].map(m => m[1]);
  check('index.html references built assets (not /src/ dev paths)', refs.length >= 2 && !html.includes('/src/'), `(${refs.join(', ')})`);
  refs.forEach(r => check(`asset file present: ${r}`, existsSync(`${dir}/assets/${r}`)));
  const jsFile = refs.find(r => r.endsWith('.js'));
  const bundle = read(`${dir}/assets/${jsFile}`);

  // 1) every admin API op the source calls must exist in the bundle
  const coreSrc = read('src/admin/core.js');
  const ops = [...new Set([...coreSrc.matchAll(/\/api\/admin\/([a-z0-9-]+)/g)].map(m => m[1]))];
  check(`ops found in source (${ops.length})`, ops.length >= 6, `(${ops.join(',')})`);
  ops.forEach(op => check(`bundle knows admin op "${op}"`, bundle.includes(`/api/admin/${op}`)));

  // 2) every task-form field in the panel source must be in the bundle
  const mainSrc = read('src/admin/main.js');
  const fields = [...new Set([...mainSrc.matchAll(/data-f="([a-zA-Z]+)"/g)].map(m => m[1]))];
  check(`task fields found in source (${fields.length})`, fields.length >= 10, `(${fields.join(',')})`);
  fields.forEach(f => check(`bundle has task field "${f}" form control`, bundle.includes(`data-f="${f}"`) || bundle.includes('data-f:"' + f + '"') || bundle.includes(`"${f}"`)));

  // 3) native bridge support
  check('bundle reads DigitEarnBridge (APK config injection)', bundle.includes('DigitEarnBridge'));
  check('bundle still honors __DIGITEARN_FB_CONFIG__ fallback', bundle.includes('__DIGITEARN_FB_CONFIG__'));

  // 4) admin-only panel must never be reachable from the public site build
  const rootHtml = read('index.html') + read('404.html');
  check('public site has no admin.html link', !/admin\.html|Admin Panel/.test(rootHtml));
}

/* ============================================================
   [D] Android app: config injection + CI
   ============================================================ */
console.log('\n[D] MainActivity + CI workflow');
{
  const kt = read('android/app/src/main/java/com/admin/digitearn/MainActivity.kt');
  check('JS bridge registered (race-free config)', /addJavascriptInterface\(ConfigBridge\(\), "DigitEarnBridge"\)/.test(kt));
  check('bridge added BEFORE loadUrl', kt.indexOf('addJavascriptInterface') < kt.indexOf('web.loadUrl'));
  check('@JavascriptInterface annotation present', kt.includes('@JavascriptInterface'));
  check('onPageStarted injection kept as fallback', kt.includes('onPageStarted') && kt.includes('evaluateJavascript'));
  check('onPageFinished re-injection added', /onPageFinished[\s\S]{0,400}evaluateJavascript/.test(kt));
  check('no unguarded startActivity for external links (try/catch)', /try \{[\s\S]{0,200}ACTION_VIEW[\s\S]{0,200}catch/.test(kt));
  check('restore-state path does not double-load', /else if \(savedInstanceState == null\)/.test(kt));
  check('missing-config screen kept', kt.includes('missingConfigHtml'));

  // MainActivity.kt structural sanity (kotlinc isn't available here — CI gradle build is
  // the real compile check; this catches unbalanced blocks / nullable-Context mistakes)
  const ktRaw = read('android/app/src/main/java/com/admin/digitearn/MainActivity.kt');
  const scan = src => {
    let i = 0; const stack = []; let bad = []; const Q3 = '"'.repeat(3);
    while (i < src.length) {
      if (src.startsWith('//', i)) { const j = src.indexOf('\n', i); i = j < 0 ? src.length : j; continue; }
      if (src.startsWith('/*', i)) { const j = src.indexOf('*/', i + 2); i = j < 0 ? src.length : j + 2; continue; }
      if (src.startsWith(Q3, i)) { const j = src.indexOf(Q3, i + 3); if (j < 0) { bad.push('unclosed raw string'); break; } i = j + 3; continue; }
      if (src[i] === '"') { let j = i + 1; while (j < src.length && src[j] !== '"' && src[j] !== '\n') j += src[j] === '\\' ? 2 : 1; i = j + 1; continue; }
      if ('([{'.includes(src[i])) stack.push(src[i]);
      else if (')]}'.includes(src[i])) {
        const want = { ')': '(', ']': '[', '}': '{' }[src[i]];
        if (stack.pop() !== want) bad.push(`mismatch at ${i}`);
      }
      i++;
    }
    if (stack.length) bad.push('unclosed: ' + stack.join(''));
    return bad;
  };
  check('MainActivity.kt: braces/parens balanced', scan(ktRaw).length === 0, scan(ktRaw).join(';'));
  const ktCode = codeOnly(ktRaw).replace(/\/\*[\s\S]*?\*\//g, '');
  check('MainActivity.kt: Toast uses non-null Activity context', /Toast\.makeText\(this@MainActivity/.test(ktCode) && !/Toast\.makeText\(view\?/.test(ktCode));
  check('MainActivity.kt: bridge import present', ktCode.includes('import android.webkit.JavascriptInterface'));

  const yml = codeOnly(read('.github/workflows/build-apk.yml'));
  check('CI builds APK on push to main', /push:\s*\n\s*branches:\s*\n\s*-\s*main/.test(yml));
  check('CI no longer pinned to the stale arena branch', !yml.includes('arena/01a080f3-digitearn'));
  check('CI rebuilds panel from src before gradle', yml.includes('npm run build:admin-app') && yml.indexOf('build:admin-app') < yml.indexOf('gradle assembleDebug'));
  check('CI installs npm deps first', yml.includes('npm ci'));
  check('workflow_dispatch kept for manual builds', yml.includes('workflow_dispatch'));

  const gradle = read('android/app/build.gradle');
  check('gradle: no external deps (offline-buildable shell)', !/implementation\s+[\'"]/.test(gradle));
  check('INTERNET permission declared', read('android/app/src/main/AndroidManifest.xml').includes('android.permission.INTERNET'));

  const fb = JSON.parse(read('android/app/src/main/assets/firebase.json'));
  check('assets/firebase.json is valid JSON with all 6 web keys',
    ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'].every(k => typeof fb[k] === 'string' && fb[k].length > 0));
  check('firebase.json has NO private key (server-only secret)', !JSON.stringify(fb).includes('private_key'));
}

/* ============================================================
   [E] Firestore rules invariants the code relies on
   ============================================================ */
console.log('\n[E] firestore.rules invariants');
{
  const rules = read('firestore.rules');
  // brace-counted block extract (rules are nested at different indents)
  const block = name => {
    const i = rules.indexOf(`match /${name}`);
    if (i < 0) return '';
    const open = rules.lastIndexOf('{', rules.indexOf('\n', i)); // header-এর শেষ '{' (path-এর {key} নয়)
    let depth = 0;
    for (let j = open; j < rules.length; j++) {
      if (rules[j] === '{') depth++;
      else if (rules[j] === '}') { depth--; if (!depth) return rules.slice(open + 1, j); }
    }
    return '';
  };
  check('rules: settings/secret block located', block('settings/secret').includes('allow'), '(extractor failed)');
  check('settings/secret unreadable from browser (why the admin op is needed)', /allow get, list: if false/.test(block('settings/secret')));
  check('accountKeys closed to clients', /allow get, list: if false/.test(block('accountKeys')));
  check('users create blocked for clients (server makes profiles)', /allow create: if false/.test(rules));
  check('client cannot write top-level queues', (rules.match(/allow create, update, delete: if false;/g) || []).length >= 3);
  check('targetNotices writable only by admin', /allow create, update, delete: if isAdmin\(\);/.test(block('targetNotices')));

  // gift code must be read from secret (never from public settings)
  const gift = read('api/gift/claim.js');
  check('gift claim reads settings/secret first', /secret\.giftCode \?\? settings\.giftCode/.test(gift));
  const saveS = read('src/admin/core.js');
  check('admin saves giftCode through the API, not the public doc', /await callApi\('\/api\/admin\/secret', payload\)/.test(saveS) && /delete pub\[k\]/.test(saveS));

  // day keys: both sides UTC
  const proof = read('api/proof/submit.js');
  check('proof submit day key = UTC', /function today\(\) \{\s*\n\s*return new Date\(\)\.toISOString\(\)\.slice\(0, 10\);/.test(proof));
  check('gift claim day key = UTC', /new Date\(\)\.toISOString\(\)\.slice\(0, 10\)/.test(gift));
}

/* ============================================================
   [I] The REAL root cause of "Login required": firebase-admin v14 has no namespaced
       app.auth() — verified against the installed package, not against our mock.
       (Our old mock did have .auth(), which is why 200+ tests stayed green while
       every production endpoint returned 401.)
   ============================================================ */
console.log('\n[I] firebase-admin v14 surface + client error handling');
{
  const { generateKeyPairSync } = await import('node:crypto');
  const { initializeApp, deleteApp, cert } = await import('firebase-admin/app');
  const { getAuth } = await import('firebase-admin/auth');
  const fbAdmin = await import('../lib/firebase-admin.js');
  check('our wrapper exports getAdminAuth() (modular accessor)', typeof fbAdmin.getAdminAuth === 'function');
  check('getAdminApp() still exported (Firestore + init share one app)', typeof fbAdmin.getAdminApp === 'function');

  const { privateKey } = generateKeyPairSync('rsa', {
    modulusLength: 2048,
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
    publicKeyEncoding: { type: 'pkcs1', format: 'pem' },
  });
  let app = null;
  try {
    app = initializeApp({ credential: cert({ projectId: 'digitearn', clientEmail: 'x@digitearn.iam.gserviceaccount.com', privateKey }) }, 'surface-check');
    check('v14 really removed app.auth() — a call there is a TypeError', (app).auth === undefined, `(typeof=${typeof app.auth})`);
    check('v14 really removed app.firestore()', app.firestore === undefined, `(typeof=${typeof app.firestore})`);
    const svc = getAuth(app);
    check('getAuth(app).verifyIdToken exists (the only supported path)', typeof svc.verifyIdToken === 'function');
    let code = '';
    try { await svc.verifyIdToken('a.b.c'); } catch (e) { code = String(e.code || ''); }
    check('malformed token rejects with auth/argument-error (so 401 gets a code, never blank)', code === 'auth/argument-error', `(${code})`);
    let code2 = '';
    try { await svc.verifyIdToken('totally-not-a-jwt'); } catch (e) { code2 = String(e.code || ''); }
    check('non-JWT string also yields a coded error', /argument-error|invalid/.test(code2), `(${code2})`);
    /* বাকি যে Admin SDK surface গুলো our functions use করে — সেগুলোও v14-তে আছে কিনা
       (একই ধরনের silent breakage আগাছাভাবলেই ধরবে) */
    const { getFirestore, FieldValue } = await import('firebase-admin/firestore');
    const dbx = getFirestore(app);
    check('Firestore + FieldValue surfaces our API handlers use all exist in v14',
      ['collection', 'doc', 'batch', 'runTransaction'].every(m => typeof dbx[m] === 'function')
      && ['serverTimestamp', 'increment', 'arrayUnion', 'arrayRemove', 'delete'].every(m => typeof FieldValue[m] === 'function'));
  } catch (e) {
    check('firebase-admin app initialised for the surface check', false, `(${e.message})`);
  } finally {
    if (app) await deleteApp(app).catch(() => {});
  }

  /* ---- header name must match between server and client ---- */
  const httpSrc = codeOnly(read('lib/http.js'));
  const apiSrc = codeOnly(read('src/core/api.js'));
  check('server sets X-DigitEarn-API', /setHeader\('X-DigitEarn-API'/.test(httpSrc));
  check('client reads the same header (lowercase, fetch-safe)', apiSrc.includes("get('x-digitearn-api')"));
  check('API_VERSION is exported and non-empty', /export const API_VERSION = 'v3'/.test(httpSrc));

  /* ---- client-side message mapping (real module, via the SSR loader) ---- */
  const { createServer } = await import('vite');
  const vite = await createServer({ configFile: false, logLevel: 'silent', server: { middlewareMode: true }, appType: 'custom' });
  const api = await vite.ssrLoadModule('/src/core/api.js');
  const M = api.apiErrorMessage;
  if (typeof M === 'function') {
    check('Vercel Deployment Protection 401 gets its own message (not "Login required")',
      /Deployment Protection/.test(M(401, { error: { code: '401', message: 'Protected deployment' }, protection: {} })),
      M(401, { error: { code: '401', message: 'Protected deployment' }, protection: {} }));
    check('object-shaped error never prints [object Object]', !/\[object Object\]/.test(M(500, { error: { code: 'x', message: 'boom' } })));
    check('non-JSON response (HTML error page) is reported as such', /JSON দেয়নি/.test(M(502, {}, { json: false })));
    check('auth error without the version marker hints at a stale deploy', /পুরোনো/.test(M(401, { error: 'Login required' }, { json: true, serverApi: '' })));
    check('…and does NOT hint when the marker is present', !/পুরোনো/.test(M(401, { error: 'Login required' }, { json: true, serverApi: 'v3' })));
    check('503 still reads as a server setup problem', /সার্ভার সেটআপ ঠিক নেই/.test(M(503, { error: 'Server configuration সমস্যা' })));
  } else {
    check('apiErrorMessage exported', false);
  }
  await vite.close();

  /* ---- the two UX bugs in the screenshots ---- */
  const taskSrc = read('src/pages/task.js');
  check('task page names the offending field (no generic "সব required field")',
    /খালি রাখা যাবে না/.test(taskSrc) && !/সব required field সঠিকভাবে পূরণ করুন/.test(codeOnly(taskSrc)));
  check('client validation mirrors the server rules (email/number/url/maxLen)', /সঠিক ইমেইল দিন/.test(taskSrc) && /শুধু সংখ্যা লিখুন/.test(taskSrc) && /http:\/\/ বা https:\/\/ দিয়ে শুরু/.test(taskSrc));
  const walletSrc = read('src/pages/wallet.js');
  check('wallet uses toast, not native alert (Bengali boxes + stuck spinner)', !/[^a-zA-Z]alert\(/.test(codeOnly(walletSrc)) && /import \{ bootAppPage, fmtBDT, esc, toast \}/.test(walletSrc));
  check('wallet button is restored on failure', /btn.disabled = false;/.test(walletSrc));
}

/* ============================================================
   [J] "Fix কাজ করেনি" বিভ্রান্তি বন্ধ করা: client boot-এই check করে server-এ সত্যিই
       নতুন api/ code চলছে কি না, আর profile load fail হলে dead spinner নয় — কারণসহ
       retry card দেখায়। (user-এর mobile screenshot-এ "লোড হচ্ছে…" আটকে গিয়েছিল।)
   ============================================================ */
console.log('\n[J] deploy self-check + no dead loading state');
{
  const httpSrc = codeOnly(read('lib/http.js'));
  const uiRaw = read('src/core/ui.js');
  const ui = codeOnly(uiRaw);
  const m = httpSrc.match(/export const API_VERSION = '([^']+)'/);
  const apiRaw = read('src/core/api.js');
  const m2 = codeOnly(apiRaw).match(/export const EXPECTED_API_BUILD = '([^']+)'/);
  check('server API_VERSION constant exists', !!m, `(no API_VERSION literal in lib/http.js)`);
  check('client EXPECTED_API_BUILD exists', !!m2);
  check('the two version constants are kept in lockstep', !!m && !!m2 && m[1] === m2[1], `(${m && m[1]} vs ${m2 && m2[1]})`);
  check('sendJson attaches the header (all responses, incl. 401)', /setHeader\('X-DigitEarn-API', API_VERSION\)/.test(httpSrc));
  check('boot awaits checkApiBuild in parallel with profile load', /const \[settings, userDoc, build\] = await Promise\.all/.test(ui) && ui.includes('checkApiBuild()'));
  check('profile failure no longer just toasts + returns', !/if \(!profile\) \{\s*toast\('প্রোফাইল লোড হয়নি/.test(ui) && ui.includes('renderBootFailure('));
  check('failure card replaces every stuck loading-line skeleton', ui.includes("querySelectorAll('.loading-line')"));
  check('failure card unhides header buttons and offers reload', ui.includes("querySelectorAll('.hdr-hide')") && ui.includes("getElementById('bootRetry')"));
  check('stale build is surfaced even when the profile loads', ui.includes('if (build && build.ok === false) showBuildBanner(build)'));
  check('ensureUserProfile keeps its contract, new *Result variant carries the reason',
    apiRaw.includes('const r = await ensureUserProfileResult') && /return \{ profile: .*error: '' \}/.test(apiRaw));
  check('reason reaches the UI (no silent swallow of the API error)', /ensureError = r\.error/.test(ui));
  check("admin ?op=health explains a stale deploy instead of 'button broken'", /Unknown admin endpoint\|404/.test(codeOnly(read('src/admin/core.js'))) && /build পুরোনো/.test(read('src/admin/core.js')));

  /* behaviour: checkApiBuild against a stubbed fetch (real function, not a copy) */
  const { createServer } = await import('vite');
  const vite = await createServer({ configFile: false, logLevel: 'silent', server: { middlewareMode: true }, appType: 'custom' });
  const api = await vite.ssrLoadModule('/src/core/api.js');
  check('checkApiBuild exported', typeof api.checkApiBuild === 'function');
  if (typeof api.checkApiBuild === 'function') {
    const real = globalThis.fetch;
    const stub = (headers, status) => { globalThis.fetch = async () => ({ status, headers: { get: k => headers[String(k).toLowerCase()] ?? null } }); };
    stub({ 'x-digitearn-api': api.EXPECTED_API_BUILD }, 200);
    let r = await api.checkApiBuild();
    check('v3 header → ok:true (banner stays hidden)', r.ok === true, JSON.stringify(r));
    stub({}, 401);
    r = await api.checkApiBuild();
    check('401 without header → ok:false + blocked:true (Deployment Protection)', r.ok === false && r.blocked === true, JSON.stringify(r));
    stub({}, 200);
    r = await api.checkApiBuild();
    check('200 without header → stale deploy, not "blocked"', r.ok === false && r.blocked === false, JSON.stringify(r));
    stub({ 'x-digitearn-api': 'v9' }, 200);
    r = await api.checkApiBuild();
    check('a different version string also counts as not-current', r.ok === false && r.version === 'v9', JSON.stringify(r));
    globalThis.fetch = () => Promise.reject(new Error('offline'));
    r = await api.checkApiBuild();
    check('network failure never throws', r.ok === false && r.status === 0, JSON.stringify(r));
    globalThis.fetch = real;
  }
  await vite.close();
}

/* ============================================================
   [K] Vercel/runtime compatibility + admin-controlled text escaping
   ============================================================ */
console.log('\n[K] runtime + escaping invariants');
{
  const pkg = JSON.parse(read('package.json'));
  const fbPkg = JSON.parse(read('node_modules/firebase-admin/package.json'));
  const want = String((fbPkg.engines || {}).node || '');
  const ours = String((pkg.engines || {}).node || '');
  const maj = r => Number(String(r).match(/\d+/)?.[0] || 0);
  check('package.json declares engines.node (Vercel picks the function runtime from it)', !!ours, `(${ours || 'missing'})`);
  check('declared node range satisfies firebase-admin\'s own requirement', ours && maj(ours) >= maj(want), `(ours=${ours} firebase-admin wants ${want || '—'})`);
  check('install/build commands Vercel uses are the ones in vercel.json', /"installCommand":\s*"npm ci/.test(read('vercel.json')) && /"buildCommand":\s*"npm run build"/.test(read('vercel.json')));
  check('no Vercel function config that would drop api/ files', !/"functions"/.test(read('vercel.json')));
  const { readdirSync } = await import('node:fs');
  const fnCount = readdirSync('api', { recursive: true }).filter(f => String(f).endsWith('.js')).length;
  check('Vercel function count stays within the Hobby limit of 12', fnCount <= 12 && fnCount === 10, `(${fnCount})`);

  /* every admin-controlled string that lands in innerHTML must be esc()'d
     (interpolations are matched exactly — `${esc(task.x)}` and helper output are fine,
      a bare `${task.password}` / `${submitLabel}` inside innerHTML is not) */
  const taskSrc = read('src/pages/task.js');
  const RAW = /^(task\.[A-Za-z0-9_]+|submitLabel|historyLabel|description|password)$/;
  const offenders = [...taskSrc.matchAll(/innerHTML\s*=\s*`([\s\S]*?)`;/g)]
    .flatMap(m => [...m[1].matchAll(/\$\{([^{}]*)\}/g)].map(x => x[1].trim()))
    .filter(expr => RAW.test(expr));
  check('task page escapes admin-controlled text in every innerHTML template', offenders.length === 0, JSON.stringify(offenders.slice(0, 3)));
  check('post-submit button restore uses esc(submitLabel)', /btn\.innerHTML = `<i class="fa-solid fa-paper-plane"><\/i> \$\{esc\(submitLabel\)\}`/.test(taskSrc));
}

/* ============================================================
   [L] Dynamic task input fields — website + admin panel + APK bundle
   ============================================================ */
console.log('\n[L] dynamic fields: no hardcoded task fields, textarea supported');
{
  const { existsSync, readdirSync } = await import('node:fs');
  const http = codeOnly(read('lib/http.js'));
  const task = codeOnly(read('src/pages/task.js'));
  const admCore = codeOnly(read('src/admin/core.js'));
  const admMain = codeOnly(read('src/admin/main.js'));
  const css = read('src/styles.css');
  const admCss = read('src/admin/styles.css');
  const fieldTypes = (http.match(/export const FIELD_TYPES = (\[[^\]]*\])/) || [])[1] || '';
  const fieldTypesFromServer = fieldTypes;
  const pageTypes = (task.match(/const F_TYPES = (\[[^\]]*\])/) || [])[1] || '';
  // saveTask এখন server-এ (?op=write → lib/admin/write.js) — server নিজেই
  // lib/http.js FIELD_TYPES import করে, তাই client-এ আর দ্বিতীয় copy রাখা হয় না
  const saveTypes = /type: \[/.test(codeOnly(admCore)) ? 'DUPLICATED' : fieldTypesFromServer;
  const editorTypes = (admMain.match(/const TF_TYPES = (\[[^\]]*\])/) || [])[1] || '';
  const norm = t => t.replace(/\s+/g, '');
  check('textarea is in the server type list', /\btextarea\b/.test(fieldTypes), fieldTypes);
  check('user page + admin editor use the SAME type list as the server',
    norm(pageTypes) === norm(fieldTypes) && norm(editorTypes) === norm(fieldTypes),
    `\n     page=${norm(pageTypes)}\n     editor=${norm(editorTypes)}\n     server=${norm(fieldTypes)}`);
  check('admin core.js field-type list duplicate করে না (server single source)',
    saveTypes === fieldTypesFromServer);
  const maxlenPage = (task.match(/const F_MAXLEN = (\{[^}]*\})/) || [])[1] || '';
  const maxlenSrv = (http.match(/export const FIELD_MAXLEN = (\{[^}]*\})/) || [])[1] || '';
  check('per-type length limits mirror the server exactly', norm(maxlenPage) === norm(maxlenSrv) && maxlenPage.length > 0, `page=${norm(maxlenPage)} server=${norm(maxlenSrv)}`);

  /* ---- no hardcoded, task-specific fields anywhere ---- */
  check('task page has no hardcoded uid/gid inputs', !/getElementById\(['"](uid|gid)['"]\)/.test(task) && !/id="uid"|id="gid"/.test(task));
  check('task page has no task-specific label strings (Facebook/Gmail/Instagram)', !/['"](জিমেইল এড্রেস|আপনার FB UID|2FA Key|Instagram Username)['"]/.test(task));
  check('fields come only from task.inputFields', /Array\.isArray\(task\.inputFields\)/.test(task) && !/task\.(uidField|gmailField)/.test(task));
  check('field label rendered escaped from config', /esc\(fkey\(f\)\)/.test(task));
  check('textarea renders a real <textarea> with the same data-tf accessor', /<textarea class="tf-area" data-tf="\$\{i\}"/.test(task));
  check('icon overlap fixed for textarea + url fields (css selectors include both)', /\.field input\[type="url"\], \.field textarea\.tf-area/.test(css) && /\.field-area \.left/.test(css));
  check('admin css styles masked + multi-line values', /\.sub-secret/.test(admCss) && /\.sub-multi/.test(admCss));

  /* ---- password requirement: shown only when the admin set it ---- */
  check('requirement box gated on task.password (blank when unset)', /\$\{task\.password \? `/.test(task) && /task\.password \? `[\s\S]*?পাসওয়ার্ড রিকোয়ারমেন্ট/.test(task));
  check('no fallback/default password text when the admin left it empty', !/task\.password \|\| '[^']{2,}'/.test(task) && !/task\.password \?\? '[^']{2,}'/.test(task));
  // static SEO pages are generated at build time (dist/task/*.html) — nothing form-related may be baked
  const staticPages = ['facebook-sale', 'gmail-sale', 'instagram-sale', 'job-post']
    .map(slug => 'dist/task/' + slug + '.html')
    .filter(existsSync);
  // dist/ is a build artifact (not in the zip) — fall back to the generator's source
  const gen = codeOnly(read('scripts/gen-task-pages.mjs'));
  check('static page generator bakes no form/password data', !/task\.password|inputFields|data-tf/.test(gen) && /esc\(/.test(gen), '(generator writes only name/link/seo text)');
  const hardcoded = staticPages
    .filter(f => /@jony|পাসওয়ার্ড রিকোয়ারমেন্ট|id="uid"|id="gid"|<input[^>]*data-tf|textarea/.test(read(f)));
  check('generated static pages (if built) bake no fields / no password default', staticPages.length === 0 || hardcoded.length === 0, JSON.stringify(hardcoded));


  /* ---- admin panel UI ---- */
  check('admin has an "Add Input Field" button', /data-ifadd[^>]*>[\s\S]{0,120}Add Input Field/.test(admMain));
  check('field rows: title + type + placeholder + required + delete', /if-label/.test(admMain) && /if-type/.test(admMain) && /if-ph/.test(admMain) && /data-ifreq/.test(admMain) && /if-del/.test(admMain));
  check('Field Title wording matches the spec (UID, Password, Cookies example)', /Field Title \(যেমন: UID, Password, Cookies\)/.test(admMain));
  check('type select is built from the shared list (so textarea is selectable)', /TF_TYPES\.map\(t => `<option value="\$\{t\}"/.test(admMain));
  check('empty editor explains the no-field flow', /কোনো field নেই/.test(admMain));
  check('review card passes the stored snapshot (not just current config)', /submittedFieldsHtml\(p\.submittedData, p\.submittedFields\)/.test(admMain));
  check('password values masked + reveal + copy-all', /'•'\.repeat\(Math\.min\(r\.value\.length, 14\)\)/.test(admMain) && /data-reveal/.test(admMain) && /data-copyall/.test(admMain));
  check('no hardcoded field list in the admin panel itself', !/value="UID"|value="Password"|label:\s*'UID'/.test(admMain));
  // exact bundle the APK actually loads (from index.html), not "whatever .js is lying around"
  const apkHtml = read('android/app/src/main/assets/admin/index.html');
  const ref = (apkHtml.match(/assets\/(index-[\w-]+\.js)/) || [])[1] || '';
  const bundle = ref && existsSync('android/app/src/main/assets/admin/assets/' + ref) ? read('android/app/src/main/assets/admin/assets/' + ref) : '';
  check('APK index.html points at a bundle that exists', !!bundle, `(ref=${ref || 'none'})`);
  check('APK bundle ships the dynamic-field editor (Add Input Field + textarea)', bundle.includes('Add Input Field') && bundle.includes('textarea'), `(bundle ${ref})`);

  /* ---- behaviour: run the panel renderer itself (same trick as verifyForm) ---- */
  const fnSrc = admMain.slice(admMain.indexOf('function submittedFieldsHtml'), admMain.indexOf('async function viewProofs'));
  check('submittedFieldsHtml found in the panel source', fnSrc.includes('function submittedFieldsHtml'));
  const escFor = v => String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  const render = new Function('esc', fnSrc + '\nreturn submittedFieldsHtml;')(escFor);
  const html = render(
    { UID: 'user123', Password: 'sup3rsecret', Cookies: 'a=1\nb=2' },
    [
      { label: 'UID', type: 'text', required: true, value: 'user123' },
      { label: 'Password', type: 'password', required: true, value: 'sup3rsecret' },
      { label: 'Cookies', type: 'textarea', required: false, value: 'a=1\nb=2' },
    ]
  );
  check('admin detail shows title: value for every submitted field', ['UID:', 'user123', 'Password:', 'Cookies:', 'a=1'].every(x => html.includes(x)) && (html.match(/sub-row/g) || []).length === 3, `rows=${(html.match(/sub-row/g) || []).length}`);
  const shown = (html.match(/<b class="sub-secret">([^<]*)<\/b>/) || [])[1] || '';
  check('password value masked in the visible cell (dots only, raw behind reveal)', shown === '\u2022'.repeat('sup3rsecret'.length) && html.slice(0, html.indexOf('data-reveal')).includes(shown) && !html.slice(0, html.indexOf('data-reveal')).includes('sup3rsecret'), `shown=${shown}`);
  check('reveal button carries the raw value + textarea row marked multi-line', /data-raw="sup3rsecret"/.test(html) && /class="[^"]*\bsub-multi\b/.test(html));
  check('cookie-like label is masked too (secret policy is label-aware, not only type=password)', (html.match(/sub-secret/g) || []).length === 2, `masked rows=${(html.match(/sub-secret/g) || []).length}`);
  check('copy-all carries real values (workflow needs them)', /data-all="UID: user123\nPassword: sup3rsecret\nCookies: a=1/.test(html.replace(/\\n/g, '\n')) || /data-all="UID: user123/.test(html));
  const legacy = render({ 'জিমেইল এড্রেস': 'a@b.com', 'পাসওয়ার্ড': 'x' }, undefined);
  check('legacy submission (no snapshot) still renders from submittedData', legacy.includes('জিমেইল এড্রেস:') && legacy.includes('a@b.com'), legacy.slice(0, 80));
  check('removed field still visible via snapshot (admin renamed config later)', render({}, [{ label: 'Old Field', type: 'text', required: false, value: 'kept' }]).includes('Old Field:'));
  check('no fields → nothing rendered', render(null, []) === '' && render({}, undefined) === '');
  const xss = render({}, [{ label: '<img src=x onerror=1>', type: 'text', value: '<script>bad()</script>' }]);
  check('submitted values/labels escaped in the panel', !/<script>bad/.test(xss) && xss.includes('&lt;script&gt;'), xss.slice(0, 90));
}

/* ============================================================
   [M] "production পুরোনো build চালাচ্ছে কিনা" — identification layer
   ============================================================ */
console.log('\n[M] deploy identity: /version.json + API header + client diagnosis');
{
  const api = codeOnly(read('src/core/api.js'));
  const ui = codeOnly(read('src/core/ui.js'));
  const fb = codeOnly(read('src/core/firebase.js'));
  const gen = codeOnly(read('scripts/gen-task-pages.mjs'));
  const vc = codeOnly(read('vite.config.js'));
  const ign = read('.gitignore');

  check('build writes public/version.json with api/commit/buildId/firebaseConfig', /public[\s\S]{0,80}version\.json/.test(gen) && /firebaseConfig:/.test(gen) && /VERCEL_GIT_COMMIT_SHA/.test(gen));
  check('version.json carries no secret material (only ids + booleans)', !/PRIVATE_KEY|CLIENT_EMAIL|API_KEY['\"]?\s*[:=]/.test(gen.split('const version =')[1]?.split('};')[0] || ''));
  check('version.json is a build artifact, not committed', ign.includes('/public/version.json'));
  check('vite config warns loudly when Firebase web env is missing', /firebaseEnvWarn/.test(vc) && /loadEnv/.test(vc) && /Environment Variables/.test(vc));
  check('checkApiBuild reads /version.json alongside the header', /fetch\('\/version\.json'/.test(api) && /cache: 'no-store'/.test(api));
  check('crash detection: x-vercel-error FUNCTION_INVOCATION_FAILED → build.crash', /x-vercel-error/.test(api) && /FUNCTION_INVOCATION_FAILED/.test(api) && /crash/.test(api));
  check('no-Firebase-config build is detected as its own case', /noFirebase:\s*!!\(site && site\.firebaseConfig === false\)/.test(api));
  check('apiErrorMessage explains a function crash instead of a generic server error', /function চালু হচ্ছে না/.test(api) && /vercelError/.test(api));
  check('banner has separate copy for crash / no-config / protection / stale', ['fa-fire', 'Firebase config নেই', 'Deployment Protection', 'build পুরোনো'].every(t => read('src/core/ui.js').includes(t)));
  check('deployed build id is printed in the banner', /b\.site\.commit \|\| b\.site\.buildId/.test(read('src/core/ui.js')));
  check('login/register pages also get the banner (no bootAppPage there)', /showBuildBannerIfBroken|v\.firebaseConfig !== false/.test(fb));
  check('firebase.js banner never throws when /version.json is absent', /catch \(_\) \{ \/\* diagnostic never breaks the app \*\//.test(fb) || /catch \(_\) \{/.test(fb));

  /* behaviour: real checkApiBuild + apiErrorMessage against stubbed fetch */
  const { createServer } = await import('vite');
  const vite = await createServer({ configFile: false, logLevel: 'silent', server: { middlewareMode: true }, appType: 'custom' });
  const m = await vite.ssrLoadModule('/src/core/api.js');
  const real = globalThis.fetch;
  const stub = (opts) => {
    globalThis.fetch = async (url) => {
      if (String(url).includes('version.json')) {
        return opts.version === null ? { ok: false, json: async () => ({}) }
          : { ok: true, json: async () => opts.version };
      }
      return {
        status: opts.status ?? 200,
        headers: { get: (k) => (String(k).toLowerCase() === 'x-digitearn-api' ? (opts.header ?? '') : String(k).toLowerCase() === 'x-vercel-error' ? (opts.vercelError ?? '') : null) },
      };
    };
  };
  stub({ header: m.EXPECTED_API_BUILD, version: { api: 'v3', commit: 'abc1234', firebaseConfig: true } });
  let b = await m.checkApiBuild();
  check('healthy deploy → ok, no banner trigger', b.ok === true && !b.crash && !b.noFirebase && !b.blocked, JSON.stringify(b));
  stub({ status: 500, vercelError: 'FUNCTION_INVOCATION_FAILED', version: { api: 'v3', firebaseConfig: true } });
  b = await m.checkApiBuild();
  check('function crash detected (crash:true) even with no header', b.crash === true && b.ok === false, JSON.stringify(b));
  stub({ status: 200, version: { api: 'v3', firebaseConfig: false } });
  b = await m.checkApiBuild();
  check('build without Firebase config detected (noFirebase:true)', b.noFirebase === true, JSON.stringify(b));
  stub({ status: 401, version: null });
  b = await m.checkApiBuild();
  check('Deployment Protection case still distinguished', b.blocked === true && b.crash === false, JSON.stringify(b));
  stub({ status: 200, header: 'v2', version: { api: 'v2', firebaseConfig: true } });
  b = await m.checkApiBuild();
  check('older deployed api version (v2) → ok:false, not blocked', b.ok === false && b.version === 'v2' && b.blocked === false, JSON.stringify(b));
  globalThis.fetch = () => Promise.reject(new Error('offline'));
  b = await m.checkApiBuild();
  check('offline check never throws', b.ok === false && b.status === 0, JSON.stringify(b));
  globalThis.fetch = real;
  const msg = m.apiErrorMessage(500, {}, { json: false, serverApi: '', vercelError: 'FUNCTION_INVOCATION_FAILED' });
  check('crash message tells admin where to look (Vercel log) and never a secret', /FUNCTION_INVOCATION_FAILED/.test(msg) && /Vercel/.test(msg) && !/[A-Za-z0-9+/]{40,}/.test(msg), msg.slice(0, 70));
  await vite.close();
}

/* ============================================================
   [N] Vercel ERR_REQUIRE_ESM regression lock (2026-09-12 production outage)
       firebase-admin@14 pulls jose@6, which is ES-module-only (no "require" condition).
       Vercel compiles our ESM api/*.js handlers to CommonJS and require()s node_modules,
       so on a runtime without require(esm) (Node < 20.19 / < 22.12 — Vercel nodejs20)
       every function died at module load with
         Error [ERR_REQUIRE_ESM]: require() of ES Module .../jose/dist/webapi/index.js not supported
       → all 10 endpoints 500 (proof submit, withdrawal, admin panel, even ?op=nope).
       Fix: firebase-admin pinned to ^13.10.0 (jose@4 → CJS entry) + engines.node 22.x.
       These checks run against the *installed* tree, so a future bump re-opens the hole
       in CI instead of in production.
   ============================================================ */
console.log('\n[N] firebase-admin is require()-able from CJS (Vercel nodejs20 outage class)');
{
  const { spawnSync } = await import('node:child_process');
  const { createRequire } = await import('node:module');
  const reqCjs = createRequire(import.meta.url);
  const root = process.cwd();

  /* the probe must be a real CommonJS file — otherwise ESM loading hides the bug */
  const probePath = 'tests/fixtures/cjs-require-probe.cjs';
  check('CJS probe fixture exists and is .cjs (not ESM)', existsSync(probePath) && /\.cjs$/.test(probePath));
  const probeSrc = codeOnly(read(probePath));
  check('probe require()s exactly the 3 subpaths our API graph imports',
    probeSrc.includes("require(spec)") && /'firebase-admin\/app'/.test(probeSrc) && /'firebase-admin\/auth'/.test(probeSrc) && /'firebase-admin\/firestore'/.test(probeSrc));

  const flagSupported = spawnSync(process.execPath, ['--no-experimental-require-module', '-e', ''], { cwd: root }).status === 0;
  const run = spawnSync(process.execPath,
    flagSupported ? ['--no-experimental-require-module', probePath] : [probePath],
    { cwd: root, encoding: 'utf8' });
  const out = (run.stdout || '') + (run.stderr || '');
  check(flagSupported
    ? 'require() from CJS works with require(esm) DISABLED (≈ Vercel nodejs20 runtime)'
    : 'require() from CJS works (flag unsupported here — ran without it)', run.status === 0, out.split('\n').slice(0, 3).join(' | '));
  check('probe reports OK for app + auth + firestore (the exact prod crash was in auth)',
    /OK firebase-admin\/app/.test(out) && /OK firebase-admin\/auth/.test(out) && /OK firebase-admin\/firestore/.test(out), out.slice(0, 200));
  check('probe never reports ERR_REQUIRE_ESM', !/ERR_REQUIRE_ESM/.test(out));

  /* jose must keep a "require" condition — that single property is what broke production */
  const { dirname, basename, join } = await import('node:path');
  const faEntry = reqCjs.resolve('firebase-admin/app');
  let faDir = dirname(faEntry);
  while (basename(faDir) !== 'firebase-admin' && dirname(faDir) !== faDir) faDir = dirname(faDir);
  check('installed firebase-admin package dir located from the real resolution',
    basename(faDir) === 'firebase-admin' && existsSync(join(faDir, 'package.json')), faDir);
  const faPkg = JSON.parse(read(join(faDir, 'package.json')));
  let josePkg = null;
  for (const cand of [join(faDir, 'node_modules', 'jose', 'package.json'), join(dirname(faDir), 'jose', 'package.json')]) {
    if (existsSync(cand)) { josePkg = JSON.parse(read(cand)); break; }
  }
  check('the jose copy firebase-admin actually resolves is present', josePkg !== null, faDir);
  const joseRootExport = josePkg && (typeof josePkg.exports === 'string' ? { '.': josePkg.exports } : (josePkg.exports || {})['.']);
  check('jose exposes a CJS entry ("require" condition or main) — jose@6 has neither',
    !!(joseRootExport && joseRootExport.require) || !!(josePkg && josePkg.main),
    `jose@${josePkg && josePkg.version} type=${josePkg && josePkg.type} exports=${JSON.stringify(joseRootExport)}`);
  check('jose major < 6 (v6+ is ESM-only → ERR_REQUIRE_ESM on Node < 20.19)',
    Number(String(josePkg && josePkg.version).split('.')[0]) < 6, `(${josePkg && josePkg.version})`);

  /* dependency intent + lockfile agreement (the drift that shipped v14) */
  const pkg = JSON.parse(read('package.json'));
  const range = String((pkg.dependencies || {})['firebase-admin'] || '');
  check('package.json does not allow firebase-admin major >= 14', !/[\^~]?1[4-9]\./.test(range) && !/>\s*1[4-9]/.test(range), `(${range})`);
  const faInstalled = JSON.parse(read(join('node_modules', 'firebase-admin', 'package.json'))).version;
  const installedMajor = Number(String(faInstalled).split('.')[0]);
  const lock = JSON.parse(read('package-lock.json'));
  const locked = lock.packages && lock.packages['node_modules/firebase-admin'];
  check('lockfile pins the same firebase-admin the tests ran against (no Vercel-side drift)',
    !!locked && locked.version === faInstalled, `(${locked && locked.version} vs ${faInstalled})`);
  const minVer = (range.match(/(\d+)\.(\d+)\.(\d+)/) || []).slice(1).map(Number);
  const instVer = String(faInstalled).split('.').map(Number);
  check('installed version satisfies the declared minimum', minVer.length === 3
    && (instVer[0] > minVer[0] || (instVer[0] === minVer[0] && (instVer[1] > minVer[1] || (instVer[1] === minVer[1] && instVer[2] >= minVer[2])))), `(${range} vs ${instVer.join('.')})`);
  check('engines.node asks Vercel for a require(esm)-capable runtime', /^2[2-9](\.|$| )/.test(String((pkg.engines || {}).node || '')), `(${JSON.stringify(pkg.engines)})`);

  /* the API graph must not quietly grow new third-party imports (each one is a require() hazard) */
  const files = [];
  const walk = d => { for (const e of readdirSync(d, { withFileTypes: true })) { const f = d + '/' + e.name; if (e.isDirectory()) walk(f); else if (e.name.endsWith('.js')) files.push(f); } };
  walk('api'); walk('lib');
  const externals = new Set();
  for (const f of files) {
    for (const m of codeOnly(read(f)).matchAll(/from\s+['"]([^.'][^'"]*)['"]/g)) externals.add(m[1]);
  }
  const risky = [...externals].filter(s => !s.startsWith('node:') && s !== 'firebase-admin/app' && s !== 'firebase-admin/auth' && s !== 'firebase-admin/firestore');
  check('api/ + lib/ import nothing third-party except the 3 vetted firebase-admin subpaths',
    risky.length === 0, `(${risky.join(', ')})`);
  check('…and all 3 are still used somewhere (no dead SDK import to trip the tracer)',
    ['firebase-admin/app', 'firebase-admin/auth', 'firebase-admin/firestore'].every(s => [...externals].includes(s)));

  /* health must self-report the SDK it actually runs, so the next "500 everywhere" is readable */
  const healthSrc = codeOnly(read('lib/admin/health.js'));
  check('health exports firebaseAdminInfo() (deployed SDK identity, no secrets)', /export function firebaseAdminInfo/.test(healthSrc));
  check('health flags a v14 deploy as unsafe (ERR_REQUIRE_ESM note)', /ERR_REQUIRE_ESM/.test(read('lib/admin/health.js')) && /cjsRequireSafe/.test(healthSrc));
  const h = await import('../lib/admin/health.js');
  check('firebaseAdminInfo() reads the installed tree, not the range',
    typeof h.firebaseAdminInfo === 'function' && h.firebaseAdminInfo().major === installedMajor && h.firebaseAdminInfo().cjsRequireSafe === true,
    JSON.stringify(typeof h.firebaseAdminInfo === 'function' ? h.firebaseAdminInfo() : null));
  check('health response still never echoes a private key value', !/BEGIN [A-Z ]*PRIVATE KEY["']?\s*:/.test(healthSrc));
  check('firebaseAdminInfo() reports the same version the probe loaded',
    typeof h.firebaseAdminInfo === 'function' && h.firebaseAdminInfo().version === faInstalled,
    JSON.stringify(typeof h.firebaseAdminInfo === 'function' ? h.firebaseAdminInfo() : null));

  /* client must translate a 500 FUNCTION_INVOCATION_FAILED into "deploy is broken", not "log in again" */
  const { createServer } = await import('vite');
  const vite = await createServer({ configFile: false, logLevel: 'silent', server: { middlewareMode: true }, appType: 'custom' });
  const api = await vite.ssrLoadModule('/src/core/api.js');
  const msg = api.apiErrorMessage(500, {}, { json: false, serverApi: '', vercelError: 'FUNCTION_INVOCATION_FAILED' });
  check('user sees a deploy problem (not a login prompt) when the function itself fails to load',
    /function চালু হচ্ছে না/.test(msg) && !/লগইন হারিয়ে গেছে/.test(msg), msg.slice(0, 60));
  await vite.close();
}

/* ============================================================
   [O] delivery hygiene — owner চান code-only package, কোনো markdown doc না
       (BUGFIXES.md / AUDIT.md / README.md এই round-এ সরানো হয়েছে; fix-গুলোর
       পূর্ণ ব্যাখ্যা chat-এ দেওয়া আছে, তাই repo-তে doc থাকার দরকার নেই)
   ============================================================ */
console.log('\n[O] no markdown docs ship in the delivered tree');
{
  const md = [];
  const walk = d => {
    for (const e of readdirSync(d, { withFileTypes: true })) {
      if (e.name === 'node_modules' || e.name === '.git' || e.name === 'dist' || e.name === '.vercel') continue;
      const f = d === '.' ? e.name : d + '/' + e.name;
      if (e.isDirectory()) walk(f); else if (e.name.toLowerCase().endsWith('.md')) md.push(f);
    }
  };
  walk('.');
  check('tree contains zero .md files (docs intentionally removed)', md.length === 0, `(${md.join(', ')})`);
  const refs = [];
  const SHIPPED = ['api', 'lib', 'src', 'scripts', 'android'];
  const scan = d => {
    for (const e of readdirSync(d, { withFileTypes: true })) {
      if (e.name === 'node_modules' || e.name === '.git' || e.name === 'dist' || e.name === '.vercel') continue;
      const f = d === '.' ? e.name : d + '/' + e.name;
      if (e.isDirectory()) scan(f);
      else if (/\.(js|mjs|json|html|yml|kt|gradle|css)$/.test(e.name)) {
        const body = read(f);
        if (/README\.md|AUDIT\.md|BUGFIXES\.md|HOW-TO-PUSH\.md/.test(body)) refs.push(f);
      }
    }
  };
  SHIPPED.filter(existsSync).forEach(scan);
  check('nothing in the shipped code links to the removed docs', refs.length === 0, `(${refs.join(', ')})`);
}

/* ============================================================
   [P] Admin panel deployment: /admin/ on the website + APK firebase.json shape
   ============================================================ */
console.log('\n[P] admin panel — web build + APK config shape');
{
  const viteCfg = read('vite.config.js');
  check('P0 site build ভেতরে admin panel entry আছে (input[\'admin\'])',
    /input\['admin'\]\s*=\s*'src\/admin\/index\.html'/.test(viteCfg));
  check('P1 nested Vite output dist/src/admin → dist/admin relocate করা আছে',
    /path\.join\(distDir, 'src', 'admin', 'index\.html'\)/.test(viteCfg) &&
    /writeFileSync\(path\.join\(distDir, 'admin', 'index\.html'\)/.test(viteCfg) &&
    /rmSync\(path\.join\(distDir, 'src'\)/.test(viteCfg));

  const adminHtml = read('src/admin/index.html');
  check('P2 panel noindex — /admin/ URL গুগলে ছড়াবে না',
    /name="robots"\s+content="noindex, nofollow"/.test(adminHtml));
  const core = read('src/admin/core.js');
  const main = read('src/admin/main.js');
  check('P3 panel নিজেও server-এ adminVerify() করে (expose = convenience, bypass না)',
    /export async function adminVerify/.test(core) && /isAdmin: !!data\.isAdmin/.test(core) &&
    /await adminVerify\(\)/.test(main));
  check('P3b non-admin login করলে panel signOut করে (view খোলে না)',
    /if \(!v\.isAdmin\)/.test(main) && /await signOut\(auth\)/.test(main));

  if (existsSync('dist/admin/index.html')) {
    const distHtml = read('dist/admin/index.html');
    const refs = [...distHtml.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g)].map(m => m[1]);
    check('P4 dist/admin/index.html এর সব /assets/* ফাইল আসলেই আছে',
      refs.length >= 2 && refs.every(r => existsSync('dist' + r)), `(${refs.join(', ')})`);
    check('P5 dist/admin relative "../../" asset নেই (root থেকে 404 করত)',
      !/\.\.\/\.\.\//.test(distHtml));
  } else {
    check('P4-5 skipped — dist/admin/index.html নেই (npm run build চালান হয়নি)', true);
  }

  /* APK-র admin app assets/firebase.json না থাকলে/ভুল ফাইল হলে native shell-ই
     panel load করে না — ব্যবহারকারীর ফোনে ঠিক এটাই হয়েছিল (google-services.json
     paste করা ছিল, web app config নয়) */
  const fbPath = 'android/app/src/main/assets/firebase.json';
  const raw = read(fbPath);
  let cfg = null;
  try { cfg = JSON.parse(raw); } catch (_) {}
  check('P6 APK assets/firebase.json parse হয়', !!cfg, `(${raw.slice(0, 40)})`);
  const need = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'];
  const miss = need.filter(k => !cfg || typeof cfg[k] !== 'string' || !cfg[k].trim());
  check('P7 ৬টা web firebaseConfig field-ই non-empty', miss.length === 0, `(${miss.join(', ')})`);
  check('P8 google-services.json (Android shape) নয় — project_info/client নেই',
    !!cfg && !('project_info' in cfg) && !('client' in cfg));
  check('P9 apiKey AIza…, appId ":web:" (Android app id হলে browser SDK key reject করে)',
    !!cfg && /^AIza/.test(cfg.apiKey) && /:web:/.test(cfg.appId), `(${cfg && cfg.appId})`);
  check('P10 projectId "PASTE-YOUR" placeholder নয় (MainActivity সেটা ফেরত দেয়)',
    !!cfg && !raw.includes('PASTE-YOUR'));

  const kt = read('android/app/src/main/java/com/admin/digitearn/MainActivity.kt');
  check('P11 MainActivity ৪টা field validate করে (শুধু apiKey না)',
    /arrayOf\("apiKey", "authDomain", "projectId", "appId"\)/.test(kt));
  check('P12 google-services.json দিলে screen সেটাই বলে (আগে গোলমেলে "config নেই")',
    /project_info/.test(kt) && /google-services\.json/.test(kt) && /configError/.test(kt));
  check('P13 screen-এ flat JSON example আছে (কী বসাতে হবে guess করতে হয় না)',
    /"storageBucket"/.test(kt) && /"appId"/.test(kt));
}

console.log('\n=============================');
console.log(`RESULT: ${pass} passed, ${failN} failed`);
console.log('=============================');
if (failN) process.exit(1);
