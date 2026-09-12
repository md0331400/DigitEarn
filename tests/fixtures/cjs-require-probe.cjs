/* CJS-loadability probe for firebase-admin (run by tests/web-and-apk.mjs [N]).
 *
 * WHY THIS FILE EXISTS (2026-09-12 outage): the repo had `firebase-admin@^14.3.0`.
 * v14 depends on `jose@6`, which ships an ES-module-only entry (`type: module`, no
 * `require` condition). Vercel's Node builder compiles the ESM `api/*.js` handler to
 * CommonJS and `require()`s its dependencies, so on a runtime without `require(esm)`
 * support (Node < 20.19 / < 22.12 — Vercel's `nodejs20` image) module loading threw
 * before any handler code ran:
 *
 *   Error [ERR_REQUIRE_ESM]: require() of ES Module /var/task/node_modules/jose/dist/webapi/index.js not supported
 *
 * ⇒ every one of the 10 functions answered 500 (proof submit, withdrawal, admin panel,
 * even `?op=nope`), and the site looked "still broken after the fix".
 *
 * This probe re-creates that exact resolution path: a plain CommonJS file, `require()`-ing
 * the three subpaths our API graph imports, with Node's `require(esm)` fallback switched OFF
 * (`--no-experimental-require-module`). It must pass on whatever Node runs the tests, because
 * the deployed runtime may be older. Exit code 0 + one `OK` line per subpath = safe to deploy.
 *
 * Run standalone:
 *   node --no-experimental-require-module tests/fixtures/cjs-require-probe.cjs
 */
const SUBPATHS = ['firebase-admin/app', 'firebase-admin/auth', 'firebase-admin/firestore'];

let bad = 0;
for (const spec of SUBPATHS) {
  try {
    // eslint-disable-next-line import/no-dynamic-require
    const mod = require(spec);
    const need = spec.endsWith('/app')
      ? ['initializeApp', 'getApps', 'cert']
      : spec.endsWith('/auth')
        ? ['getAuth']
        : ['getFirestore', 'FieldValue'];
    const missing = need.filter(k => mod[k] === undefined);
    if (missing.length) {
      bad++;
      console.log(`MISSING ${spec}: ${missing.join(', ')}`);
    } else {
      console.log(`OK ${spec}`);
    }
  } catch (err) {
    bad++;
    const esm = /ES Module (\S+)/.exec(err && err.message ? err.message : '');
    console.log(`FAIL ${spec}: ${(err && (err.code || err.name)) || 'Error'}`
      + (esm ? ` ← ${esm[1]}` : ` — ${String((err && err.message) || err).split('\n')[0].slice(0, 160)}`));
  }
}
console.log(bad ? `RESULT: ${bad} subpath(s) cannot be require()d from CJS` : 'RESULT: all subpaths are CJS-requireable');
process.exit(bad ? 1 : 0);
