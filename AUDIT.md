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
