# 🔒 Security Audit + Task Submission System Report
**Date:** 2026-09-09 • **Branch:** arena/01a080f3-digitearn

**Final flow (যেমন চাওয়া হয়েছিল):**
`USER fills admin-configured fields → SUBMIT (pending) → ADMIN reviews in panel → APPROVE → server-side atomic balance credit`

## ⚠️ 2026-09-09 UPDATE — Vercel Hobby 12-function limit (deploy failure fix)
**Problem:** Vercel Hobby plan allows **max 12 serverless functions per deployment**. When the admin API merged into the main project, the function count jumped to 17 (9 user + 6 admin + 2 `api/_lib/` helper files) → every deploy failed at "Deploying outputs" with a generic "project or build error".

**Fix (structure change, zero behavior change):**
| আগে | এখন |
|---|---|
| `api/_lib/firebase-admin.js`, `api/_lib/http.js` (2 phantom functions) | `lib/firebase-admin.js`, `lib/http.js` (api/ বাইরে — function নয়) |
| `api/admin/{verify,proof-review,deposit-review,set-active,withdrawal-review,notice-targeted}.js` (6 functions) | `lib/admin/*.js` (handlers) + **একটিমাত্র** exact-path `api/admin.js` router — dispatch **`?op=<name>`** query param (path-segment fallback আছে) |

- **Function count এখন: 10** (9 user + 1 admin router) — limit-এর মধ্যে, 2-টা headroom।
- Admin panel (APK) এর `callApi()` এক জায়গায় `/api/admin/<name>` → `/api/admin?op=<name>` convert করে (src/admin/core.js)।
- ⚠️ **`api/admin/[...path].js` catch-all Vercel cloud-e route match করছে না (404)** — local build-এ route generate হলেও cloud-এ না। Exact-path file + query param dispatch-এ সরে আসা হয়েছে (proven working)। Catch-all file আবার যোগ করবেন না।
- Tests: 62/62 (section [10]: router dispatch ?op= + path fallback + preflight + 404 + 403)।
- নতুন admin endpoint যোগ করলে: `lib/admin/<name>.js` handler + `api/admin.js`-এর `HANDLERS` map-এ entry + panel-এ `callApi('/api/admin/<name>')` (conversion automatic) — **নতুন function file করবেন না** (12 limit)।

---

## 1. Files created
| File | কাজ |
|---|---|
| `api/_lib/firebase-admin.js` | Admin SDK singleton (env vars থেকে, browser-এ কখনো যায় না) |
| `api/_lib/http.js` | token verify, JSON, input validators, requireAdmin |
| `api/user/register.js` | registration + bonus + referral (atomic) |
| `api/user/ensure.js` | legacy profile heal (bonus ছাড়া) |
| `api/task/claim.js` | trusted task reward (approved proof gate সহ) — **পরবর্তী round-এ remove হয়েছে** (marketplace model: balance শুধু admin approve-এ), এখন আর এই file নেই |
| `api/gift/claim.js` | gift code (server code+amount) |
| `api/target/claim.js` | referral target (server tier+count) |
| `api/account/activate.js` | activation (exactly-once bonus) |
| `api/withdrawal/request.js` | withdrawal (atomic deduct) |
| `api/proof/submit.js` | **TASK SUBMISSION** — admin-configured input fields server-validate করে pending-এ store |
| `api/deposit/submit.js` | deposit request (amount server-এর) |
| `admin/api/_lib/` (2 files) | Admin project-এর Admin SDK + helpers |
| `admin/api/admin/verify.js` | admin auth check (enumeration-safe) |
| `admin/api/admin/proof-review.js` | **submission approve/reject (atomic, one-shot, reward = approval-time task doc)** |
| `admin/api/admin/deposit-review.js` | deposit approve/reject |
| `admin/api/admin/set-active.js` | manual activate/inactivate |
| `admin/vercel.json` | Admin Vercel project config |
| `tests/register.mjs`, `tests/hooks.mjs`, `tests/run.mjs`, `tests/mocks/*` | **Mock-based security test suite (32 tests)** — `node --import ./tests/register.mjs tests/run.mjs` |
| `AUDIT.md` | এই রিপোর্ট |

## 2. Files modified
| File | পরিবর্তন |
|---|---|
| `firestore.rules` | Full rewrite — client-এ কোনো financial write নেই |
| `src/core/api.js` | সব financial op → secure API call (`callApi` + Bearer token); index-free queries |
| `src/pages/task.js` | **Dynamic task form**: admin-configured amount, Open Link, Password box, Description, input fields, submit → pending; status boxes (approved/rejected+reason/pending) |
| `src/pages/history.js` + `history.html` | নতুন **Task Submissions** section (Task / Amount / Date / Status) |
| `src/pages/login.js` | email enumeration remove → generic error |
| `src/pages/target.js`, `src/tasks-data.js` | signature fix + step text accuracy |
| `src/styles.css` | `.pw-box` (task password display) — theme-matched |
| `admin/src/main.js` | **Micro Jobs**: password/description/**input fields editor**/URL validation; **Submissions** section (name, UID, email, fields, reward, status, approve/reject) |
| `admin/src/core.js` | reviews → server API; URL sanitize; index-free lists; `updatedAt` on task save |
| `admin/src/styles.css` | fields editor + submission review styles |
| `.env.example`, `README.md` | 3টা server env var docs |

## 3. API endpoints (সব POST, Bearer ID token)
| Endpoint | Auth | কাজ |
|---|---|---|
| `/api/user/register` | user | profile+bonus+referral atomic |
| `/api/user/ensure` | user | profile heal |
| `/api/task/claim` | ~~user~~ | **নেই** — marketplace model-এ direct claim নেই (`claimTask()` call করলে error message-ই বলে দেয়) |
| `/api/gift/claim` | user | gift (server code/amount) |
| `/api/target/claim` | user | target bonus (server) |
| `/api/account/activate` | user | activate + one-time bonus |
| `/api/proof/submit` | user | **task submission → pending** (fields server-validated) |
| `/api/deposit/submit` | user | deposit → pending |
| `/api/withdrawal/request` | user | atomic deduct |
(নিচের সব `POST /api/admin/panel?op=<name>` — একটাই Vercel function; আলাদা file না)

| op | কে | কাজ |
|---|---|---|
| `/api/admin/verify` | user | admin check (always 200) |
| `/api/admin/proof-review` | **admin (403 for user)** | approve (atomic credit) / reject (reason) |
| `/api/admin/deposit-review` | admin | approve/reject |
| `/api/admin/set-active` | admin | manual active |

## 4. Firestore collections
- `tasks/{slug}` — nameBn, reward, url, **password, description, inputFields[{label,type,placeholder,required}]**, enabled, locked, sort, videoUrl, updatedAt
  - `inputFields` = user form-এর **একমাত্র** source (কোনো task-specific hardcoded field নেই)। `type`: `text | email | password | tel | number | url | textarea`
    (canonical list `lib/http.js` `FIELD_TYPES`/`FIELD_MAXLEN`; client/admin copy-এর সাথে মিল `tests/web-and-apk.mjs [L]` guard করে)
- `proofs/{id}` (top-level) = **task submission review queue** — userId, username, userEmail, taskSlug, taskName, **submittedData{…}** + **submittedFields[{label,type,value,required}]** (config snapshot — পরে field বদলালেও পুরোনো submission পড়া যায়), reward (server), status, note, createdAt, reviewedAt, **approvedAt/approvedBy, rejectedAt/rejectedBy**
- `users/{uid}/proofs/{id}` — user mirror (history page থেকে পড়া হয়)
- `users/{uid}` — balance, totalEarned (server-only writes), transactions/, taskClaims/, giftClaims/, targetClaims/, withdrawals/, deposits/, team/
- `refs/{code}`, `settings/site`, `notices/{id}`, `deposits/{id}`, `admins/{email}`

## 5. Firestore rules
- Client `users/{uid}` create/delete — **বন্ধ** (server-ই বানায়)
- Client `balance`, `totalEarned`, `refCode`, `isActive`, `activationBonusGiven` — **বন্ধ** (শুধু `name`, `hasOnly(['name'])`)
- Client `transactions`/`taskClaims`/`giftClaims`/`targetClaims`/`withdrawals`/`deposits`/`proofs` — **সব read-only** (client create/update/delete বন্ধ)
- `admins/`, `refs/` client write — বন্ধ
- Admin = `admins/{email}` doc (rules-engine internal get) — tasks/settings/notices manage + submissions read
- ⚠️ **Publish করা লাগবে**: Firebase Console → Firestore → Rules → repo-র `firestore.rules` paste → Publish

## 6. Vercel environment variables (দুটো project-এই)
`FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`
(Firebase Console → Project settings → Service accounts → Generate new private key)
+ আগের `VITE_FIREBASE_*` ৬টা client variable (changed না)

## 7. Firebase config
- `admins/{email}` doc (email = document ID)
- কোনো **composite index লাগে না** — সব নতুন query single-field (code-side filter)

## 8. Test results
**Mock-based API test suite (in-memory Firestore, fake ID tokens): 32/32 PASSED**
- ✅ required field missing → 400 • invalid email → 400 • unknown field → 400 • oversized → 400 • no token → 401
- ✅ client `reward:999999` → **stored 50 (task doc)** • client `userId:"alice"` → **stored under token's uid**
- ✅ normal user → admin endpoint = **403**
- ✅ approve → balance+50, totalEarned+50, transaction record, approvedAt, **approvedBy=admin uid**
- ✅ **double approve → 409, balance unchanged (exactly-once)**
- ✅ reject → no money, rejectedAt/rejectedBy/reason stored, user mirror updated
- ✅ approve-after-reject → 409 • rejected user may resubmit • **reward = approval-time task doc**
- ✅ 13/13 handlers import + syntax check • both builds pass
- ✅ grep audit: client-এ `increment(` নেই, `updateDoc` শুধু `name` field, কোনো hardcoded secret নেই
- ✅ **Bug caught by tests (fixed)**: সব handler-তে `snapshot.exists()` function-like call — Firestore-এ `exists` property — production-এ 9টা endpoint break হতো

## 9. Remaining issues (honest)
1. **Rules publish + env vars — user action** (উপরে §5/§6) — এর আগ পর্যন্ত live site insecure থাকে
2. Withdrawal pending-duplicate-এর ছোট race (দুইটা একসাথে request) — money safe (tx-এ balance check), fix চাইলে Cloud Functions
3. `submittedData`-তে user credentials save হয় (business flow অনুযায়ী) — access শুধু owner+admin (rules), কিন্তু real-money scale-এ field-level encryption consider করুন
4. Admin email = full power — Firebase 2FA on রাখুন
5. "Fully secure" claim করিনি — build passing ≠ secure; উপরের action গুলো complete হলে তবেই system production-ready

---
---

# 🔎 FULL PROJECT AUDIT — ROUND 2 (2026-09-09, 12:45)
**Scope:** সম্পূর্ণ repo — সব API, rules, client pages, admin panel। 31-টা audit section-এর against trace।

## A. Critical bugs fixed (functional)
| # | Bug | Impact | Fix |
|---|---|---|---|
| 1 | **`snap.exists()` function call — 8 জায়গায় client-এ** (`api.js` ×4, `store.js` ×2, `admin/core.js` ×2) | Firestore-এ `exists` **property** — call করলে TypeError। Settings → defaults-এ silently fall-back, profile/task/claim check-গুলো break, admin panel-এ user/settings load fail | সব ঠিক করা (`snap.exists`) |
| 2 | **`target.js`: `claimed: hasTargetClaimed(...)` — Promise truthy** | সব target tier "বোনাস Claim করা হয়েছে" দেখাতো — claim button কখনো দেখাতো না | `Promise.all` + await |
| 3 | **Withdrawal workflow অসম্পূর্ণ** — user request দিলে balance deduct হতো, কিন্তু admin-এ approve/reject **কিছুই ছিল না** | টাকা deduct হয়ে permanent pending; refund-ও ছিল না | নতুন `admin/api/admin/withdrawal-review.js` (atomic paid/reject+refund) + admin UI "Withdrawals" queue + user-detail-এ withdrawal list |
| 4 | **Notices marquee `n.text`** — admin `body` field লেখে, dashboard `text` পড়ে | marquee "undefined • undefined" দেখাতো | `body || text` mapping |
| 5 | `forgot.js` — email innerHTML-এ unescaped | XSS surface (email valid হওয়াতই render) | `esc()` |

## B. Security vulnerabilities fixed
| # | Vulnerability | Fix |
|---|---|---|
| S1 | **Notices privacy** — কোনো user-specific private notice system ছিল না; rules-এ notices সম্পূর্ণ public | নতুন `users/{uid}/targetNotices/{id}` subcollection: **owner + admin read, admin write only**। User client শুধু নিজের targeted notices পায় (rules-scoped)। Admin panel: Notice/Warning type, All-user/Specific-user target (user search), expiry date, toggle/delete |
| S2 | **`team/{childUid}` anonymous public read** (`allow get, list: if true`) — anonymous team-tree enumeration | `if isSignedIn()` — anonymous বন্ধ; signed-in scope (multi-level count-এর জন্য দরকার — rules-এ descendant-only express করা যায় না); team doc-তে balance/email/mobile নেই (minimum fields only) |
| S3 | **`projectGrid` XSS** — task doc-এর `color`/`icon` value HTML-এ unescaped | whitelist validation (`^#[0-9a-fA-F]{3,8}$`, `^fa-(solid|regular|brands) [a-z0-9-]+$`) |
| S4 | Top-level `withdrawals/` queue-এ কোনো rule ছিল না (default deny — এখনো) | `match /withdrawals/{wdId} { allow get, list: if isAdmin(); ... }` — admin UI list-এর জন্য, write server-only |
| S5 | `registerUser`-এর no-op try/catch (error swallowing pattern) | সরাসরি await (error surface হয়) |

## C. Verified SECURE (no change দরকার ছিল)
- **সব financial mutation server-side** (13+2 API endpoints, Admin SDK, atomic transactions): register bonus/referral, activation, gift, target, task reward (approval-time task doc), deposit, withdrawal deduct, refund
- **Client-এ কোনো financial write নেই** — user site-এ একমাত্র client write = `updateDoc(users/{uid}, {name})` (rules: `hasOnly(['name'])`)
- **Fake rewardAmount/uid/amount body field** — server ignore করে (verified by tests)
- **Double-processing guards**: claim docs, pending guards, transaction status check (exactly-once)
- **Admin auth**: verified ID token → `admins/{email}` doc (browser-এ admins collection-এ list/write বন্ধ → self-escalation অসম্ভব)
- **Login**: generic error (enumeration-safe), `?next=` open-redirect guard, no `fetchSignInMethodsForEmail`
- **URL fields**: http/https only (`javascript:` reject) — task URL, submission url fields, admin task form
- **Secrets**: no hardcoded key/API key in src, admin/src, HTML; server keys শুধু `process.env`
- **Rules structure**: single service block, balanced, default-deny for all unlisted paths

## D. Files changed (round 2)
- `src/core/api.js` — `.exists()` ×4, `getNotices(uid)` privacy-scoped (all-user + own targeted + expiry), registerUser cleanup
- `src/core/store.js` — `.exists()` ×2
- `src/pages/target.js` — claimed Promise bug
- `src/pages/dashboard.js` — scoped notices + ⚠️ warning prefix
- `src/core/ui.js` — projectGrid color/icon sanitize
- `src/pages/forgot.js` — esc()
- `api/withdrawal/request.js` — top-level mirror (admin queue)
- `admin/api/admin/withdrawal-review.js` — **NEW** (paid/reject+refund, atomic)
- `admin/api/admin/notice-targeted.js` — **NEW** (admin global targeted list, Admin SDK scan)
- `admin/src/core.js` — `.exists()` ×2, withdrawal + targeted-notice functions
- `admin/src/main.js` — Withdrawals nav+view, user-detail withdrawals/warnings, notices form (type/target/expiry)
- `firestore.rules` — team signed-in-only, targetNotices owner+admin, withdrawals queue admin-only
- `tests/run.mjs` — নতুন [8] WITHDRAWAL REVIEW (10 cases), [9] TARGETED NOTICE LIST (6 cases) → **56/56 PASS**
- `tests/mocks/firestore-fake.mjs` — collection-level list support

## E. User action required
1. **firestore.rules নতুন version PUBLISH করুন** (Console → Firestore → Rules) — targeted-notice privacy + team privacy live করার জন্য
2. কোনো নতুন env variable লাগে না; কোনো Firebase config change লাগে না
3. Admin project-এ 3টা FIREBASE_* variable (আগের instruction) — এটা না দিলে admin panel-এর review buttons চলবে না
---

# 🔧 2026-09-11 BUG BATCH — website + admin APK (full details: `BUGFIXES.md`)

**Test status: 406 assertions, 0 failed** (`npm test`) — 68 (API) + 25 (marketplace) +
133 (`tests/bugfixes.mjs`, [F] auth-diagnostics + [G] Admin-SDK surface + [K] audit fixes + [L] dynamic fields সহ) +
180 (`tests/web-and-apk.mjs`, [A2] token-refresh + [I] real firebase-admin v14 surface + [K] runtime/escaping + [L] dynamic fields).
Patch + zip দুটোই fresh clone-এ apply করে verify করা: `git apply` → `npm test` (406 pass) →
`npm run build` (10 functions, 8 task pages) ✓

## Website (user side)
1. **Project grid links were dead (critical UX)** — `projectGrid()` gate `t.kind === 'task' && t.slug`;
   Firestore doc shape is `{ id, ...data }` (no `kind`, no `slug`) → every card linked to `/`.
   Now `taskHref()` → `/task/<slug|id>.html`, else task's external URL, else `/dashboard.html` (never a 404).
2. **`/api/target/claim` was deleted in the latest commit** while `claimTarget()` + the target page still
   called it → Claim button 404'd. Endpoint restored (function count back to 10, ≤ 12 limit).
3. **Target UI gated on 4-level team total, server gates on direct referrals** → enabled buttons that always
   errored. UI gate/progress now uses `counts[0]` and says so.
4. **Day-key mismatch** (client local date UTC+6 vs server UTC) → "gift already claimed", empty
   "today's submissions", wrong daily-limit counting between midnight and 6 AM. Both sides now use
   `toISOString().slice(0,10)`.
5. **`bootAppPage` false-logout**: 4s auth-restore timeout kicked logged-in users to `/login.html`
   (then "Login required" on submit). Now reads `auth.currentUser` first, 10s grace + re-check.
6. **No server-side uniqueness at signup** → same mobile/email reused to farm ৳10 register + ৳5 referral
   bonus via direct API. register handler now rejects duplicate email (case-insensitive) / mobile with 409.
7. **Welcome modal fired on every dashboard load** — `welcomeShown` was written but never read (and clients
   can't write it: rules allow only `name`). Gated on `!user.welcomeShown` + device localStorage flag.
8. **"Login required" on submit while logged in — the real cause was `getAdminApp().auth()`.**
   `firebase-admin@14.3.0` removed the legacy namespaced API — `app.auth` and `app.firestore` are `undefined`
   (asserted against the installed package in `tests/web-and-apk.mjs [I]`), so `verifyIdToken` threw
   `TypeError: app.auth is not a function` for **every** request and the old `catch → null` turned that into
   `401 "Login required"` on proof submit, withdrawal, gift, deposit, activate and every admin op — while the panel's
   Firestore-only edits (task rate, video, notices) kept working, which is exactly the reported asymmetry
   ("admin app থেকে rate+video set করি, user submit করলে Login required").
   Fixed with `getAdminAuth()` = `getAuth(app)` from `firebase-admin/auth`. The test mock now mirrors the real v14
   surface (it has **no** `.auth()`), so restoring the bug turns 31 assertions red — verified by mutation, which is
   also the fix for why 222 green tests never caught it.
   Second-order fix (the message itself): *every* auth failure used to be flattened into one string — `verifyUser()`
   caught all `verifyIdToken` errors → `null` → 401 "Login required", and `callApi()` threw the identical text when
   `auth.currentUser` was null, so a stale token, a `FIREBASE_PROJECT_ID` pointing at another project's service
   account, and a missing-env Admin SDK all looked the same. Now `authenticate()` returns
   `ok/no-token/invalid/expired/config` (JWT payload decoded for `aud`/`exp`) and `authReject()` maps them to
   401 "Session শেষ…" + `sessionExpired`, 401 "Login required (code)", or **503 with both project ids** and a Redeploy
   hint; a code-less `TypeError` is treated as CONFIG (server), never as a login problem. The client force-refreshes
   and retries once on 401, `bootAppPage` refreshes the token up-front, and admin `callApi` does the same (APK
   idle-for-days). `?op=health` (inside the existing router — function count still 10) reports it in the panel.
   Deploy visibility: every response carries `X-DigitEarn-API: v3`, so a stale/partial `api/` deploy is obvious from
   the browser (client then says "সার্ভারের build পুরোনো মনে হচ্ছে"). Vercel's own
   `{"error":{"code":"401","message":"Protected deployment"}}` — Deployment Protection on preview URLs, which also
   blocks the APK WebView since it holds no Vercel SSO cookie — is now named as such instead of printing `[object Object]`.
   Server logs: `[auth] verifyIdToken failed: <code> tokenProject=… serverProject=…`.
   **Why it still looked broken (2026-09-11 probe):** production still serves `api-DnH_pzE1.js` (previous batch —
   none of the new strings), `/api/proof/submit` replies `{"error":"Login required"}` with **no `X-DigitEarn-API`
   header**, and the preview URL answers `401 Protected deployment` before any function runs. i.e. the fix is in
   the repo/zip, not on Vercel. Two follow-ups added for that class of confusion: a boot-time `checkApiBuild()`
   (yellow banner "server build is old" / "deployment protected") and `ensureUserProfileResult()` so the profile
   failure names its reason instead of leaving a dead `লোড হচ্ছে…` spinner (`BUGFIXES.md` A12/A13).
9. **Wallet activation button was a dead link** when `activationLink` was unset (`href=""` → self-reload).
   Now disabled with an explicit "admin has not set the link" note.

## Admin panel + APK
8. **`addNotice()` could never write** — `doc(db,'notices')` = odd segment count → Firestore throws
   "Document references must have an even number of segments". Now `doc(collection(db,'notices'))`.
9. **`addTargetedNotice()` (private warning) same class of bug** — `doc(db,'users',uid,'targetNotices')` → throws.
   Now `doc(collection(db,'users',uid,'targetNotices'))`. Both verified against the real client SDK in tests.
10. **Any "Save Settings" wiped the gift code** — rules close `settings/secret` to browsers (`allow get,list:if false`),
    the panel swallowed the permission error, showed a blank field and wrote `giftCode: ''` → gift claim dead
    site-wide. New admin op `?op=secret` (Admin SDK) reads/writes it; blank values are never written without an
    explicit **Clear**; the field is disabled when the secret can't be loaded.
11. **`listNotices()` used `orderBy('sort')`** → notices without a `sort` field silently vanished. Index-free list now.
12. **APK shipped a stale panel** (embedded bundle 09-09 vs `src/admin` 09-10 → no dailyLimit / submit / history label
    fields). Assets rebuilt, and CI now rebuilds `src/admin` → `assets/admin` on every APK build + a test asserts every
    `/api/admin/<op>` and every `data-f="<field>"` in source exists in the embedded bundle.
13. **Firebase config injection race in `MainActivity`** (evaluateJavascript at `onPageStarted` lands in the previous
    page's JS context) → panel sometimes booted with no config ("Firebase env variables set নেই"). Now a synchronous
    `@JavascriptInterface` bridge (`DigitEarnBridge.getFirebaseConfig()`) is the primary path; both `onPageStarted`
    and `onPageFinished` injections remain as fallbacks; `core.js` reads bridge → global → env.
14. **APK auto-build never ran** — the workflow triggered on `arena/01a080f3-digitearn` (stale, 33 commits behind main).
15. **Admin signed out on a server error** — `isAdminEmail()` swallowed every failure as `false`, so a 503/timeout
   looked like "this email is not in the admins list" *and* destroyed a working session. Now `adminVerify()`
   returns `{isAdmin, error}`; Overview has a **সিস্টেম চেক** button (`?op=health`: env presence, private-key shape,
   Firestore reachability, service-account project vs `FIREBASE_PROJECT_ID`, caller token state — booleans and
   project ids only, never secret values).
    Triggers are now `main` push + PR + `workflow_dispatch`.
15. `API_BASE` only special-cased `file:` → any other non-http WebView origin would fetch a relative URL and fail.
    Now: absolute base for every non-`http(s)` origin.
16. Android: no double `loadUrl`+`restoreState` on config change; unguarded `startActivity` for external links wrapped.

## Test mocks (why the above escaped tests)
- `firestore-fake` had **no `QuerySnapshot.size`** → `teamSnap.size` was `undefined`, so `undefined < tier` was false and
  the referral gate passed in tests only. Real `size` semantics added.
- fake `doc` refs had **no `set()/update()/delete()`** → `docRef.set()` handlers were untestable. Added (with `merge`).
- New suites run the *real* browser modules through Vite's `ssrLoadModule` (`src/core/ui.js`, `src/core/api.js`) instead of
  re-implementing them, so grid links and the day key are actually executed.

## Still open (user action / known limits)
- Deploy `main` to Vercel (production) → 10 functions, within Hobby limit. No rules change needed.
- `accountKeys` reservation is per (task + first identity field); an account sold under a different project slug is a
  different key (business call: dedupe across tasks would need a global key list).
- Welcome-modal "seen" state is per device (localStorage) — Firestore `welcomeShown` can't be written by clients by design.
- Withdrawal/registration duplicate guards are pre-check + transaction (not globally atomic); true atomicity needs Cloud Functions.

---

## main-branch audit round (2026-09-11) — summary

Conflict markers: `git grep -n -E "^(<<<<<<<|=======|>>>>>>>)"` → **none** (tracked + untracked;
`api/target/claim.js`, `api/admin/panel.js`, `lib/admin/secret.js` all clean and complete).

Confirmed + fixed (details in `BUGFIXES.md` §L): **L1** `tx.update()` on a missing user-side mirror
aborted the whole admin approval → legacy submissions/deposits could never be approved (seller never
paid) — now merge-set. **L2** daily-limit + duplicate-pending + already-registered + email/mobile
uniqueness were read *outside* the transaction → bypassable by 2 concurrent requests — every guard is
now read with `tx.get(query)` inside it. **L3** `readBody()` left the handler hung forever on an
oversized body (destroy without resolve) — now resolves. **L4** `catch → fail(409, err.message)` leaked
raw Firestore/SDK text and mis-reported infra failures as conflicts — shared `opFail()` + `ApiError`
keep handler messages/statuses (429 daily-limit intact) and return a retryable 503 for SDK errors.
**L5** `/api/user/check` returned internal error text to anonymous callers. **L6** `?op=health` answered
without admin verification (env presence / Firestore reachability / project ids to anyone) — now
admin-only. **L7** `register`, `user/ensure`, `set-active` had no catch → bare 500 with an empty body.
**L8** one `innerHTML` on the task page interpolated admin `submitLabel` unescaped. **L9** no
`engines.node` while `firebase-admin@14` requires Node ≥ 22 (npm warned) — declared so Vercel picks a
matching runtime.

Verified unchanged/on-purpose: no Cloud Functions added, no new `api/*.js` (still 10 functions ≤ 12),
no route/response-format churn, `npm ci` + `npm run build` + `npm run build:admin-app` all pass,
rules untouched, `getAdminAuth()`/Admin init newline handling preserved.
