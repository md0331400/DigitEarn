# 🔧 DigitEarn — Bug Fix Batch (2026-09-11)

এই ফাইলে এই batch-এ কী কী bug ঠিক করা হয়েছে তার পূর্ণ তালিকা — symptom → cause → fix →
কীভাবে verify করবেন। সব fix-এর জন্য test যোগ করা হয়েছে (`npm test` → **406 assertions, 0 failed**:
68 API + 25 marketplace + 133 bugfix + 180 website/APK)।

> Push করার পর: Vercel auto-deploy (main) + GitHub Actions → `Build Admin APK` artifact.
> Firestore rules-এ কোনো change নেই, তাই rules publish করা লাগবে না।

---

## 🔴 সবচেয়ে বড় bug (এই round-এর আসল কারণ): `firebase-admin` v14-তে `app.auth()` নেই

**Symptom:** login থাকতেও proof submit / withdrawal / gift / deposit / activate / admin-এর
approve-reject — **প্রতিটা API call-ই** `401 "Login required"` দিত। অথচ admin panel থেকে
rate + Facebook video set করা চলত (ওগুলো সরাসরি Firestore লেখে, API লাগে না) — তাই মনে হতো
"admin app ঠিক, user site ভাঙা"।

**Cause:** `lib/http.js` token verify করত `getAdminApp().auth().verifyIdToken(token)` দিয়ে।
`firebase-admin@14` (এই repo-র dependency) legacy namespaced API **সরিয়ে ফেলেছে** — installed
package-ে যাচাই করা: `app.auth === undefined`, `app.firestore === undefined`। ফলে প্রতিটা
request-এ `TypeError: app.auth is not a function` → আগের `try { … } catch { return null }`
সেটাকে "লগইন নেই" বানিয়ে দিত।

**Fix:** `lib/firebase-admin.js`-এ `getAdminAuth()` = `getAuth(getAdminApp())`
(`firebase-admin/auth`) — `lib/http.js` এখন সেটাই ব্যবহার করে। সাথে তিনটা প্রতিরক্ষা:
1. `.code`-বিহীন `TypeError` এখন **CONFIG** bucket → `503 "Server configuration সমস্যা"`, কখনো আর
   "Login required" না।
2. Test mock (`tests/mocks/firebase-admin-fake.mjs`) এখন **v14-এর আসল surface** মানে —
   ফেকে `.auth()` নেই। bug ফিরলেই ৩১টা assertion লাল হয় (যাচাই করা হয়েছে)।
3. `tests/web-and-apk.mjs [I]` আসল ইনস্টল করা package-এর উপর `app.auth === undefined`,
   `getAuth(app).verifyIdToken` আছে, আর আমাদের ব্যবহৃত প্রতিটা Firestore/FieldValue
   surface আছে কিনা — সেটা check করে।

**Deploy confirm:** প্রতিটা API response এখন `X-DigitEarn-API: v3` header পাঠায়।
browser devtools → Network → `/api/proof/submit` → Response Headers-এ সেটা না দেখলে মানে
**পুরোনো functions এখনো চলছে** (commit/deploy হয়নি) — client তখন toast-এ
"সার্ভারের build পুরোনো মনে হচ্ছে" বলেই দেয়।

> ⚠️ আরেকটা আলাদা করে দেখার জিনিস: preview deployment URL
> (`digitearn-<hash>-<scope>.vercel.app`) **Vercel Deployment Protection**-এ ঢাকা থাকে —
> ওখান থেকে (বা APK/WebView থেকে, যেখানে Vercel SSO cookie নেই) সব `/api/*` request
> function-এ পৌঁছানোর আগেই `401 {"error":{"code":"401","message":"Protected deployment"}}`
> পায়। এখন সেটা আলাদা message-এ ধরা পড়ে ("সার্ভার Vercel Deployment Protection-এ ঢাকা…")।
> সমাধান: production domain ব্যবহার করুন, নয়তো Vercel → Settings → Deployment Protection →
> **Protect Deployment URLs** off (বা "Vercel Authentication"-এ scope শুধু previews-এ রেখে
> bypass token দিন)।

## A. Website (user side)

| # | Symptom (user যা দেখত) | Cause | Fix | File |
|---|---|---|---|---|
| A1 | Dashboard/landing থেকে **কোনো প্রজেক্টেই ঢোকা যেত না** — কার্ড চাপলে homepage-এ ফিরে আসত | `projectGrid()` শর্ত দেখত `t.kind === 'task' && t.slug`, কিন্তু Firestore doc-এ `kind` নেই আর id আসে `id` field-এ → শর্ত কখনোই true হতো না, link `'/'` হয়ে যেত | `taskHref()` যোগ: Firestore task → `/task/<slug\|id>.html`; static page না থাকলে task-এর external url; সেটাও না থাকলে `/dashboard.html` (404 নয়) | `src/core/ui.js` |
| A2 | Target page-এ **বোনাস Claim করলেই error** ("Server error (404)") | সর্বশেষ commit (`update code`)-এ `api/target/claim.js` delete হয়ে গিয়েছিল, কিন্তু `claimTarget()` এখনও সেই path call করত (README/AUDIT-ও endpoint ধরে নিয়েছিল) | Endpoint restore করা হয়েছে (-git history থেকে), সাথে day-gate ঠিক করা | `api/target/claim.js` |
| A3 | Target page "Claim করুন" চালু দেখাত, চাপলে "রেফারেল পূরণ হয়নি" | UI gate করত **৪ লেভেলের যোগফল** দিয়ে, server gate করে শুধু **direct** referral (`users/{uid}/team`) দিয়ে | gate + progress bar এখন `counts[0]` (direct) ব্যবহার করে; total দেখানো হয়, সাথে স্পষ্ট লেখা "টার্গেট গণনা হয় সরাসরি X জন রেফার দিয়ে" | `src/pages/target.js` |
| A4 | রাত ১২টা–সকাল ৬টার মধ্যে: "গিফট আগেই claim করেছেন" ভুল, "আজকের জমা" লিস্ট খালি, daily-limit count মিলত না | Day key দুই পাশে আলাদা: browser local date (UTC+6) বনাম server UTC date | দুই পাশেই একই UTC day key (`toISOString().slice(0,10)`) | `src/core/api.js`, `api/proof/submit.js`, `api/gift/claim.js` |
| A5 | Log-in থাকলেও মাঝে মাঝে **লগইন পেজে ছুঁড়ে দিত** (ধীর নেটওয়ার্ক), তারপর submit → "Login required" | `bootAppPage()` auth state resolve হতে 4s-এর বেশি লাগলে `null` ধরে redirect করত | আগে `auth.currentUser` দেখে নেয়; signed-out হলে দ্রুত redirect; callback-ই না এলে 10s পরে শেষবার `currentUser` re-check | `src/core/ui.js` |
| A6 | একই mobile/email দিয়ে অনেক আইডি বানিয়ে **register ৳10 + referral ৳5 farm** করা যেত (সরাসরি API call) | Server uniqueness checkই ছিল না — client pre-check (`/api/user/check`) শুধু UX | register handler server-side duplicate check করে (email + case-variant, mobile) → 409 | `api/user/register.js` |
| A7 | Dashboard refresh করলেই **Welcome modal বারবার** উঠত | `showWelcomeModal()` gate ছাড়াই প্রতি load-এ চলত; `welcomeShown` field লেখা হতো কিন্তু কেউ পড়ত না (আর client সেটা লিখতেও পারে না — rules শুধু `name` allow করে) | gate: `!user.welcomeShown` + device localStorage flag (`de_welcome_seen_v1`) — একবার দেখলে আর আসবে না | `src/pages/dashboard.js` |
| A8 | **Log-in থাকা সত্ত্বেও proof/withdraw/gift submit-এ "Login required"** (user report: admin rate+video set করার পর submit-এ toast) | **আসল কারণ = উপরের `app.auth()` break — প্রতিটা verify ব্যর্থ হতো।** দ্বিতীয় দোষ: সব failure একই message-এ চেপে যেত: (১) ID token ~১ ঘণ্টা পর expire, ট্যাব/অ্যাপ দীর্ঘক্ষণ খোলা থাকলে পুরোনো token পাঠানো হতো — আর client-এর throw করা message-টা server-এর 401 message-এর হুবহু একই text ছিল, তাই কেউ বুঝত না কোনটা; (২) Vercel-এর `FIREBASE_PROJECT_ID` অন্য project-এর service account-এর সাথে দিলে `verifyIdToken` **প্রতিটা** token reject করে (site-এর client config কিন্তু digitearn → সবকিছু কাজ করে, শুধু API 401); (৩) env var না থাকলে Admin SDK init-ই fail করে | `lib/http.js`-এ `authenticate()` → reason code (`ok/no-token/invalid/expired/config`), JWT payload decode করে `aud`/`exp` মাপা যায়, `authReject()` কারণ অনুযায়ী 401/503 + বাংলায় actionable message (server log-এ পুরো code)। Client `callApi` এখন 401/`sessionExpired`-এ **force-refresh করে একবার retry** করে (A5-এর সাথে দ্বৈত সুরক্ষা: `bootAppPage`-এই token refresh), admin `callApi`-ও একই রকম। নতুন `?op=health` (single router-এর ভেতরে, function count 10-ই আছে) Overview-এ "সিস্টেম চেক" বাটন — env/project mismatch/Firestore পড়া এক ক্লিকে দেখায়, secret value কখনো ফেলে না | `lib/http.js`, `lib/admin/health.js`, `api/admin/panel.js`, ৮টা user handler + ৭টা admin op, `src/core/api.js`, `src/core/ui.js`, `src/admin/core.js` |
| A9 | Wallet-এ activationLink সেট না করলে "এক্টিভ করুন" বাটন চাপলে **কিছুই হতো না** | `href=""` (empty) → একই পেজে reload, user বোঝে না কী হয়েছে | link না থাকলে বাটন disabled + স্পষ্ট বার্তা "অ্যাডমিন এখনো এক্টিভেশন লিংক সেট করেননি" | `src/pages/wallet.js` |
| A10 | Task form-এ কোনো field ভুল হলে শুধু "সব required field সঠিকভাবে পূরণ করুন" — কোনটা, কেন — কিছুই বোঝা যেত না | client pre-check শুধু প্রথম ভাঙা input টা খুঁজে generic toast দিত | এখন field-এর নাম করে বার্তা ("জিমেইল এক্সেস" খালি রাখা যাবে না / সঠিক ইমেইল দিন…) + input-এর নিচে লাল inline message; নিয়মগুলো `api/proof/submit.js`-এর হুবহু mirror — client বেশি কড়া নয় | `src/pages/task.js` |
| A11 | উইথড্রর পর native `alert()` — বাংলা লেখা বক্স (□) হয়ে দেখাত, আর dialog-এর পেছনে বাটন "পাঠানো হচ্ছে..." আটকে যেত | success/error দুটোতেই `alert()` ব্যবহার হচ্ছিল, spinner reset alert-এর পরে | `alert()` বাদ, `toast()` + ৯০০ms পরে history-তে যাওয়া; fail করলে বাটন সাথে সাথে ফিরে আসে | `src/pages/wallet.js` |
| A12 | Mobile-এ **"প্রোফাইল লোড হয়নি — একবার refresh করুন…"** toast + "আমাদের প্রজেক্ট সমূহ" কার্ডে **"লোড হচ্ছে…" চিরকাল** আটকে | `bootAppPage()` profile না পেলে শুধু `toast()` দিয়ে `return` করত — পেজ নিজের spinner নিজেই ঝুলিয়ে রাখত, আর কারণটা (API 401) ঢাকা থাকত | এখন কারণসহ full-page card: কারণ লাইন + **আবার চেষ্টা করুন** (reload) + লগইন লিংক, প্রতিটা আটকে-যাওয়া `.loading-line` replace হয়, `.hdr-hide` header button গুলো ফিরে আসে; `ensureUserProfileResult()` API error-টা reason সহ বয়ে আনে | `src/core/ui.js`, `src/core/api.js` |
| A13 | Fix push করার পরেও user বোঝে না **আসলেই deploy হয়েছে কি না** (Vercel client বান্ডেল নতুন করে, functions cache থাকে) | কোনো signal-ই ছিল না | প্রতিটা API response-এ `X-DigitEarn-API: v3`; client boot-এই `checkApiBuild()` চালায় — header না মিললে সবার উপচে হলুদ ব্যানার **"সার্ভারের build পুরোনো — api/ + lib/ push করে Redeploy করুন"** (Vercel protection block করলে সেটাই আলাদা করে বলে), আর profile ঠিক থাকলেও দেখায়। Admin panel-এর সিস্টেম চেকও `?op=health` 404 হলে একই কথা বলে | `src/core/api.js`, `src/core/ui.js`, `src/admin/core.js`, `lib/http.js` |

## 🟡 "কেন এখনো একই error দেখাচ্ছে?" — live probe-এর উত্তর (2026-09-11, digitearn.vercel.app)

| Probe | ফলাফল | মানে |
|---|---|---|
| `POST /api/proof/submit` + `Authorization: Bearer a.b.c` | `401 {"error":"Login required"}` — **`X-DigitEarn-API` header নেই** | live server = পুরোনো code (`getAdminAuth()` fix ওখানে নেই) |
| live `assets/api-DnH_pzE1.js` | `"লগইন হারিয়ে গেছে"` আছে, কিন্তু `"পুরোনো মনে হচ্ছে"` / `"Deployment Protection"` / `"token পাওয়া যায়নি"` / `"x-digitearn-api"` → **০টা** | deployed client = **আগের batch**, latest batch না |
| live `assets/ui-CpFEXpb2.js` | `getIdToken(!0)` আছে, `"Session শেষ"` নেই | client token refresh ঠিক আছে → 401 আসছে **server-এর `app.auth()` break** থেকে |
| preview URL `digitearn-31qh26hws-…vercel.app` সব `/api/*` | Vercel-এর `401 {"error":{"code":"401","message":"Protected deployment"}}` | preview deployment Deployment Protection-এ ঢাকা — ওখানে (এবং Vercel SSO-cookie-বিহীন WebView-তে) API কখনো চলবে না |

⇒ **সমস্যাটা code-এ নয়, deploy-এ:** workspace/zip-এর `lib/firebase-admin.js`-এ `getAdminAuth()` আছে (test `[G]`/`[I]` সেটাই verify করে), কিন্তু production-এ সেটা পৌঁছায়নি।
`git add -A && git commit && git push origin main` করার পর Vercel deployment-এর Logs-ে `Building…`/`Ready` দেখে তারপর এই command:

```bash
curl -si -X POST -H 'content-type: application/json' -H 'Authorization: Bearer a.b.c' \
  -d '{}' https://digitearn.vercel.app/api/proof/submit | grep -Ei 'x-digitearn-api|error'
```
ঠিক হলে আসবে: `x-digitearn-api: v3` + `{"error":"Login required (auth/argument-error)"}`
(মানে server token verify করতে **পারছে** — আগে শুধু `"Login required"` দিত)। header না দেখলে deploy হয়নি;
browser-এর Network tab-এও সেটা দেখা যায়, আর সাইটে হলুদ ব্যানারও উঠবে (A13)।

"Login required": কীভাবে check করবেন (deploy-এর পর)

1. `npm test` + `npm run build` লোকালে pass হলে push করুন → Vercel redeploy হওয়া পর্যন্ত অপেক্ষা করুন (**এই fix-গুলো deploy না করা পর্যন্ত live site পুরোনো code-ই চালাবে** — probe করে দেখা গেছে `digitearn.vercel.app`-এ এখনো পুরোনো build চলছে)।
2. Admin panel (বা APK) → Overview → **সিস্টেম চেক → Check করুন**। `projectMatch: false` বা কোনো ✗ row দেখালে: Vercel → Settings → **Environment Variables** → `FIREBASE_PROJECT_ID` = `digitearn`, আর `FIREBASE_CLIENT_EMAIL`/`FIREBASE_PRIVATE_KEY` **একই project-এর** service account-এর (Firebase Console → Project settings → Service accounts → Generate new private key) — তারপর **Redeploy** (env change পুরোনো deployment-এ বসে থাকে)।
3. এরপর user-side submit করুন। এখনো error এলে message-টা আগেকার মতো "Login required" হবে না — হয় "Session শেষ হয়েছে…" (client নিজে থেকেই refresh করে retry করবে), নয় "Server configuration সমস্যা… (token project: X, server project: Y)" — সেই লেখাটাই diagnos-এর জন্য যথেষ্ট।
4. Vercel function log-এ `[auth] verifyIdToken failed: <code> tokenProject=… serverProject=…` লাইনটা থাকবে (Function Logs → /api/proof/submit)।


## B. Admin panel + Admin APK

| # | Symptom | Cause | Fix | File |
|---|---|---|---|---|
| B1 | **Notice পাঠানোই যেত না** — Send চাপলেই error | `setDoc(doc(db, 'notices'), ...)` → Firestore client SDK: "Document references must have an **even number of segments**, but notices has 1" | `doc(collection(db, 'notices'))` (auto id) | `src/admin/core.js` |
| B2 | **কোনো user-এর private warning/notice পাঠানো যেত না** | `doc(db, 'users', uid, 'targetNotices')` = ৩টা segment (odd) → একই ধরনের throw | `doc(collection(db, 'users', uid, 'targetNotices'))` | `src/admin/core.js` |
| B3 | Settings tab-এ **Gift Code সবসময় খালি** দেখাত, আর "Save Settings" চাপলেই gift code মুছে সাইটজুড়ে gift claim 400 দিত | rules `settings/secret` browser থেকে read সম্পূর্ণ বন্ধ (`allow get, list: if false`) — admin-ও বাদ; `getDoc(...).catch(() => null)` error চাপা দিত → field খালি → খালি value আবার লেখা হতো | নতুন admin op `?op=secret` (Admin SDK দিয়ে read/write, rules ঠিক থাকে); খালি value কখনো লেখা হয় না, unless explicit **Clear** button; load না হলে input disable | `lib/admin/secret.js` (new), `api/admin/panel.js`, `src/admin/core.js`, `src/admin/main.js` |
| B4 | All-user notice list-এ কিছু notice হারাত | `orderBy('sort')` যেসব doc-এ `sort` field নেই সেগুলোকে **ছাপে ছুঁড়ে ফেলে** | index-free list + client-side sort | `src/admin/core.js` |
| B5 | APK-র ভেতরের panel পুরনো — Micro Jobs-এ `dailyLimit` / Submit / History label fieldই ছিল না | `android/.../assets/admin/` committed bundle 2026-09-09 build, `src/admin` বদলায় 2026-09-10 — কেউ bundle regenerate করেনি | `npm run build:admin-app` চালিয়ে fresh embed করা হয়েছে, এবং CI-তে এখন প্রতি build-এ আগে regenerate হয় | `android/app/src/main/assets/admin/**`, `.github/workflows/build-apk.yml` |
| B6 | APK খুললে মাঝে মাঝে "**Firebase env variables set নেই**" — refresh দিলে কখনো চলত, কখনো না | Config inject হতো `evaluateJavascript` দিয়ে `onPageStarted`-এ — ওই মুহূর্তে নতুন document-এর JS context তৈরি হয়নি, তাই injection প্রায়ই হারাত (race) | Native **JS bridge** (`DigitEarnBridge.getFirebaseConfig()`, sync, timing-free) প্রধান পথ; `onPageStarted` + `onPageFinished` injection fallback; core.js bridge → global → env ক্রমে পড়ে | `android/.../MainActivity.kt`, `src/admin/core.js` |
| B7 | **APK auto-build-ই হতো না** — push করলে কোনো artifact বের হতো না | Workflow trigger ছিল `arena/01a080f3-digitearn` branch-এ, যেটা 2026-09-09 থেকে স্থির (main-এর ৩৩ commit পিছে); main-এ push করলে workflow চলতই না | trigger: `main` push (paths: android/src/admin/lib/admin/package/vite) + PR + `workflow_dispatch`; Node → `npm ci` → panel rebuild → gradle | `.github/workflows/build-apk.yml` |
| B8 | Panel rotation/restore-এ একই page দুবার load হতো (login flash); external link না খুললে app crash করতে পারত | `onCreate` সর্বদা `loadUrl` + পরে `restoreState`; `startActivity` unguarded | `savedInstanceState == null` হলেই load, নাহলে restore (+ না পেলে load), external link try/catch + Toast | `android/.../MainActivity.kt` |
| B9 | APK/README docs ভুল branch থেকে ZIP নামাত ("`main`-এ `android/` নেই") | branch সরে গেছে, docs পুরনো | README/APK README এখন `main` ধরে লেখা | `android/README.md`, `README.md` |

---

## C. Test infrastructure (এই bug গুলো test-এ ধরা পড়েনি — এখন পড়বে)

| সমস্যা | fix |
|---|---|
| `tests/mocks/firestore-fake.mjs`-এ `QuerySnapshot.size` নেই → `teamSnap.size` `undefined`, তাই `undefined < tier` false → target-এর referral gate test-এ সবসময় pass করত (production-এ সঠিক, test অন্ধ) | fake-এ `size` যোগ (real SDK semantics) |
| fake `doc`-এ `set()/update()/delete()` নেই → `docRef.set()` ব্যবহার করা handler test করাই যেত না | fake-এ `set(data,{merge})` / `update` (NOT_FOUND) / `delete` যোগ |
| stale APK bundle ধরার কোনো test ছিল না | `tests/web-and-apk.mjs` [C]: src/admin-এর প্রতিটা `/api/admin/<op>` আর প্রতিটা `data-f="<field>"` embedded bundle-এ আছে কিনা, index.html-এর asset hash ফাইল আছে কিনা |
| UI link logic-এর কোনো test ছিল না (A1) | Vite `ssrLoadModule` দিয়ে **আসল** `src/core/ui.js` import করে assertion |

নতুন: `tests/bugfixes.mjs` (server/API) + `tests/web-and-apk.mjs` (website + APK packaging) — দুটোই `npm test`-এ যোগ।

## D. Push — কীভাবে করবেন

```bash
# (ক) zip থেকে পুরো repo-ই নিতে চাইলে
unzip DigitEarn-fixed.zip -d DigitEarn && cd DigitEarn
git status                 # fix গুলো unstaged change হিসেবে দেখাবে
git add -A && git commit -m "fix: website + admin APK bug batch (see BUGFIXES.md)"
git push origin main       # Vercel auto-deploy + GitHub Actions → APK

# (খ) নিজের clone-এ শুধু patch লাগাতে চাইলে
git apply DigitEarn-bugfix.patch   # বা: git am < DigitEarn-bugfix.patch না, patch-ই যথেষ্ট
```

Push-এর পর ৩টা জায়গা দেখে নিন:
1. **Vercel** → Deployment build pass করেছে? Functions = **10** (Hobby limit 12)
2. **GitHub → Actions → Build Admin APK** (main) → সবুজ? → `DigitEarnAdmin-debug.apk` download
3. APK install করে → **Micro Jobs** (daily limit field আছে দেখবে), **Notices** (Notice + private
   warning দুটোই save হয়), **Settings** (Gift Code দেখা যায়)

## E. কীভাবে verify করবেন (লোকালে)

```bash
npm ci
npm test          # 406 assertions: 68 + 25 + 133 + 179, 0 failed
npm run build     # site build (10 Vercel functions — limit 12)
npm run build:admin-app   # APK-র ভেতরের panel update
```

Vercel-এ deploy হলে hand-verify:
1. Dashboard → যেকোনো প্রজেক্ট কার্ড → task page খুলবে (A1)
2. Target page → direct ৫ রেফারে Claim → balance +৳50, দ্বিতীয়বার চাপলে "ইতিমধ্যে নিয়েছেন" (A2/A3)
3. গিফট কোড রাত ১টা-ও আগের মতো একবারই (A4)
4. Admin panel → Notices → Notice Send + specific user-এর Warning Send (B1/B2)
5. Admin → Settings → Gift Code দেখা যাবে, save করলেও টিকবে (B3)
6. GitHub Actions → `Build Admin APK` (main) → artifact → install → Micro Jobs-এ daily limit field দেখা যাবে (B5/B7)
7. App বন্ধ করে আবার খুললে সরাসরি panel (B6/B8)
---

## L. `main` branch audit round (2026-09-11) — confirmed bugs only

ধাপ ১ **conflict marker check**: `git grep -n -E "^(<<<<<<<|=======|>>>>>>>)"` → **০টা ম্যাচ**,
untracked ফাইল সহ filesystem grep-ও পরিষ্কার (`api/target/claim.js`, `api/admin/panel.js`,
`lib/admin/secret.js` তিনটাই মার্কার-মুক্ত, সঠিকভাবেই resolve অবস্থায় আছে)।

| # | সমস্যা (confirmed) | কী ঘটত | Fix | File |
|---|---|---|---|---|
| L1 | Admin review-এ user-side mirror doc `tx.update()` করা হতো, কিন্তু mirror না থাকলে Firestore **পুরো transaction rollback** করাত ("no document to update") | `ce6df13`-এর আগে জমা পড়া (legacy) submission/depot **চিরকাল approve হতো না** → seller-এর টাকা বকেয়া আটকে থাকত, admin বারবার 409 দেখত | mirror doc `tx.set(ref, upd, { merge: true })` (না থাকলে তৈরি হবে); proof-review + deposit-review দুটোতেই। existing tests-এর contract অনুযায়ী top-level doc-এ `tx.update()` রাখা হয়েছে | `lib/admin/proof-review.js`, `lib/admin/deposit-review.js` |
| L2 | Daily-limit / duplicate-pending guard গুলো **transaction-এর বাইরে** পড়া হতো | দুটো concurrent request দুটোই "আজকে ২/৩ হয়েছে" বা "pending নেই" দেখে **limit + duplicate guard bypass** করত (per-task daily limit, ২টা pending withdrawal, ২টা pending deposit), register-এর ক্ষেতে profile overwrite + double bonus | সব count/exists check `tx.get(query)` দিয়ে transaction-এর ভিতরে নেওয়া হয়েছে (proof/submit, withdrawal/request, deposit/submit, user/register — existing profile + email/mobile uniqueness সহ) | `api/proof/submit.js`, `api/withdrawal/request.js`, `api/deposit/submit.js`, `api/user/register.js` |
| L3 | `readBody()` 100KB-এর বেশি হলে `req.destroy()` করত কিন্তু **resolve করত না** | handler চিরকাল await-এ আটকে যেত → function timeout পর্যন্ত bill, client-কে কোনো response না | destroy করার সাথে সাথেই `finish({})` → handler নিয়ম অনুযায়ী 400 দেয় | `lib/http.js` |
| L4 | প্রায় সব handler-এর catch: `fail(res, 409, err.message)` | (ক) Firestore/SDK-এর raw message (`14 UNAVAILABLE: …`, `5 NOT_FOUND: …`) client-এ ফাঁকি পেত; (খ) infrastructure error-ও **409 conflict** হওয়ায় UI retry করত না | shared `opFail()` + `ApiError(status, msg)` — handler-এর নিজের বার্তা আগের status-এই যায় (429 daily-limit সহ), SDK/infra error → server log + generic **503** (retryable) | `lib/http.js` + ৯টা handler/op |
| L5 | `/api/user/check` (anonymous endpoint) infra fail-এ `'Server setup সমস্যা: ' + err.message` দিত | env var-এর নাম / SDK-এর ভেতরের লেখা anyone পড়তে পারত → server configuration reconnaissance | কারণ server log-এ, client-এ generic 503 | `api/user/check.js` |
| L6 | `/api/admin/panel?op=health` admin verify **না করেই** env presence, Firestore reachability, project id গুলো ফিরত দিত | anonymous caller-কেও deployment configuration-এর map দেওয়া হতো | এখন **admin-only** (`requireAdmin`): non-admin → 403, no-token → 401, diagnostics কোনো case-এই ফেরে না। "auth-ই ভাঙা" diagnostic `authReject`-এর 503 message-এ আছেই (`token project: X, server project: Y`), বাকি Vercel function log | `lib/admin/health.js`, `tests/bugfixes.mjs` |
| L7 | `register` / `user/ensure` / `set-active` handler-এ transaction/update-এর চারপাশে কোনো catch ছিল না | Firestore fail করলে **bare unhandled rejection** → Vercel 500 with **empty body** → UI "Server error (500)" | try/catch + `opFail` (JSON error + সঠিক status) | `api/user/register.js`, `api/user/ensure.js`, `lib/admin/set-active.js` |
| L8 | Task page submit-এর পর বাটন restore `btn.innerHTML = `… ${submitLabel}`` — admin-controlled text escape ছাড়া | অন্য সব জায়গায় `esc()` করা আছে, এখানে বাদ → admin `submitLabel`-এ HTML/Payload দিলে user page-এ inject হতো | `${esc(submitLabel)}` + প্রতিটা innerHTML template-এ raw admin field আছে কিনা test | `src/pages/task.js`, `tests/web-and-apk.mjs [K]` |
| L9 | `package.json`-এ `engines` ছিল না, কিন্তু `firebase-admin@14.3.0` **`node >= 22`** চায় (`npm ci`-তে EBADENGINE warning) | Vercel Function Runtime Node 20 ধরলে SDK ভাঙা আচরণ করতে পারে (এই project-ে আগেও SDK-version থেকে break হয়েছে) | `"engines": { "node": ">=22" }` যোগ — Vercel এটি পড়েই function runtime বেছে নেয়; test-এ firebase-admin-এর requirement-এর সাথে মিল check করা | `package.json`, `tests/web-and-apk.mjs [K]` |

যা **বদলানো হয়নি** (confirmed bug না, বা intentionally existing behavior): Firestore rules, response
shape/status contract (409 "not found" সহ), marketplace model (direct claim নেই), `snap.exists()`
client-side call style (firebase@10-এ method — ভাঙে না), `verifyUser()` compat wrapper (unused but
exported), admin panel-এ task delete UI (feature missing — product decision, bug না), registration
duplicate-guard-এর global atomicity (Cloud Functions লাগে — অনুমতি দেওয়া নেই)।
---

## M. Dynamic task input fields (admin-controlled) — implementation notes

Request: Facebook/Gmail/Instagram বা কোনো task/page-এ hardcoded input field থাকবে না; admin panel থেকে
field add/remove/edit হবে এবং user page-তে ঠিক সেগুলোই দেখাবে।

| বিষয় | বাস্তবায়ন | File |
|---|---|---|
| একমাত্র field source | `tasks/{slug}.inputFields = [{label,type,placeholder,required}]` — page শুধু এটা থেকেই form বানায়। task-specific hardcoded input (`#uid`, `#gid`, "জিমেইল এড্রেস") সব সরানো হয়েছে | `src/pages/task.js` |
| Field type | `text, email, password, tel, number, url, **textarea**` — canonical list `lib/http.js`-এর `FIELD_TYPES` + `FIELD_MAXLEN` (server validation এখান থেকেই); client/admin bundle `lib/http.js` import করতে না পারে বলে সেখানে copy আছে → `tests/web-and-apk.mjs [L]` চারটা copy হুবহু মিল check করে (drift = test fail) | `lib/http.js`, `src/pages/task.js`, `src/admin/core.js`, `src/admin/main.js` |
| textarea | user page-এ আসল `<textarea rows=4 maxlength=2000 class="tf-area">`, `.field textarea` + `.field input[type=url]` দুটোই field CSS-এ যোগ (আগে url type-এর styling missing ছিল → icon/text overlap) | `src/styles.css` |
| Admin UI | Micro Jobs → Task → Input Fields → **"Add Input Field"**: Field Title (যেমন UID/Password/Cookies) + Field Type select + Placeholder + Required + 🗱; task Save-এ একসাথে লেখে। label maxlength 40 → **50** (server `slice(0,50)`-এর সাথে মিল) | `src/admin/main.js`, `src/admin/core.js` |
| Data storage | server submit-এ `submittedFields: [{label,type,value,required}]` snapshot **ধাকে** (type সবসময় admin config থেকে, client থেকে না) + আগের মতোই `submittedData` (পুরোনো consumer/test compat) + `accountKey` duplicate guard অপরিবর্তিত | `api/proof/submit.js` |
| Admin detail | Proofs card `submittedFieldsHtml(p.submittedData, p.submittedFields)`: snapshot থাকলে সেখান থেকে (না থাকলে legacy fallback), `password` type ডিফল্ট masked + "দেখুন" reveal, textarea value pre-wrap, **Copy All Data** বাটন (real values) | `src/admin/main.js`, `src/admin/styles.css` |
| পাসওয়ার্ড রিকোয়ারমেন্ট | `task.password ?` gate-ই আছে — admin সেট না করলে box টা **blank** (কোনো default লেখা/Firebase-agnostic fallback নেই), static generated HTML-এ কিছু bake হয় না | `src/pages/task.js`, `scripts/gen-task-pages.mjs` |
| Limits | max ২০টা field/task (restore করা — user-এর edit-এ হারিয়ে গিয়েছিল), per-type length check, মোট payload ~24KB (textarea-এর জন্য 4096 → 24KB; ৩টা ১.৮KB textarea এখন বৈধ) | `api/proof/submit.js` |
| Backward compat | পুরোনো submission (snapshot নেই) → `submittedData` থেকে render; পুরোনো task (`inputFields` নেই) → field ছাড়া submit চলতেই থাকে; DB migration লাগে না — `npm run seed` merge-safe, `saveTask`-ও `merge: true` | `api/proof/submit.js`, `scripts/seed.mjs` |
| Tests | `[L]` server: 23টা check (textarea round-trip, title+type+value snapshot, per-type + total limits, config-only type, unknown field reject, no hardcoded names, legacy task) + `[L]` website/APK: 24টা check (list drift guard, hardcoded field absence, `<textarea>` render, CSS, admin UI strings, bundle contains the editor, panel renderer behavior + escaping + masking) | `tests/bugfixes.mjs`, `tests/web-and-apk.mjs` |

Mutation-প্রমাণ: `textarea` list থেকে সরালে, `#uid` input আবার বসালে, বা review card snapshot arg
বাদ দিলে — নতুন tests লাল হয়; restore করলে **406 assertions, 0 failed**।
