# 🔒 Security Audit + Task Submission System Report
**Date:** 2026-09-09 • **Branch:** arena/01a080f3-digitearn

**Final flow (যেমন চাওয়া হয়েছিল):**
`USER fills admin-configured fields → SUBMIT (pending) → ADMIN reviews in panel → APPROVE → server-side atomic balance credit`

---

## 1. Files created
| File | কাজ |
|---|---|
| `api/_lib/firebase-admin.js` | Admin SDK singleton (env vars থেকে, browser-এ কখনো যায় না) |
| `api/_lib/http.js` | token verify, JSON, input validators, requireAdmin |
| `api/user/register.js` | registration + bonus + referral (atomic) |
| `api/user/ensure.js` | legacy profile heal (bonus ছাড়া) |
| `api/task/claim.js` | trusted task reward (approved proof gate সহ) |
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
| `/api/task/claim` | user | reward (approved proof gate) |
| `/api/gift/claim` | user | gift (server code/amount) |
| `/api/target/claim` | user | target bonus (server) |
| `/api/account/activate` | user | activate + one-time bonus |
| `/api/proof/submit` | user | **task submission → pending** (fields server-validated) |
| `/api/deposit/submit` | user | deposit → pending |
| `/api/withdrawal/request` | user | atomic deduct |
| `/api/admin/verify` | user | admin check (always 200) |
| `/api/admin/proof-review` | **admin (403 for user)** | approve (atomic credit) / reject (reason) |
| `/api/admin/deposit-review` | admin | approve/reject |
| `/api/admin/set-active` | admin | manual active |

## 4. Firestore collections
- `tasks/{slug}` — nameBn, reward, url, **password, description, inputFields[{label,type,required}]**, enabled, locked, sort, videoUrl, updatedAt
- `proofs/{id}` (top-level) = **task submission review queue** — userId, username, userEmail, taskSlug, taskName, **submittedData{…}**, reward (server), status, note, createdAt, reviewedAt, **approvedAt/approvedBy, rejectedAt/rejectedBy**
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
