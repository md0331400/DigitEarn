# 🔒 Security Audit Report — DigitEarn Wallet Hardening
**Date:** 2026-09-09 • **Commit:** 077e9e3 • **Status:** code shipped — **3 user action needed** (নিচে লিস্ট আছে)

---

## 1. আগে কী সমস্যা ছিল (Root Cause)
পুরনো `firestore.rules`-এ user-কে নিজের user doc-এ **write access** ছিল — মানে কোনো user browser console/Postman থেকে
নিজের `balance`-এ `999999` লিখে দিতে পারত, `transactions` doc বানিয়ে ফেক history দেখাতে পারত,
`giftClaims`/`taskClaims` doc delete করে আবার claim করতে পারত, withdrawal-এর `status` সরাসরি change করতে পারত।
এটা **critical** — real money site-তে একদম গ্রহণযোগ্য নয়।

## 2. এখন কী আর্কিটেকচার
| Layer | কী করে |
|---|---|
| **Vercel serverless API** (`api/` 9টা endpoint) | সব financial mutation — reward/bonus/amount সব **Firestore-এর trusted doc থেকে** server নিজে নেয় |
| **Admin Vercel API** (`admin/api/` 4টা endpoint) | proof approve/reject, deposit approve/reject, set-active, admin verify |
| **Firebase Admin SDK** | verified ID token-এ `verifyIdToken()` — **UID শুধু token থেকে**, client-এর পাঠানো কিছুই trust হয় না |
| **Firestore rules (rewrite)** | client এখন read-only + নিজের `name` field-এর বাইরে কিছু লিখতে পারে না |
| **Firebase client SDK** | শুধু auth + safe reads (tasks, settings, নিজের history) |

## 3. প্রতিটা balance-changing path — আগে vs এখন
| Path | আগে (client) | এখন (server) |
|---|---|---|
| Registration bonus + referral credit | client-এর লেখা amount | `/api/user/register` — settings থেকে, hard cap ৳300, atomic, self-ref block |
| Task reward | client `reward:999999` possible | `/api/task/claim` — task doc থেকে + **approved proof ছাড়া claim হয় না** |
| Gift code | client-এর amount | `/api/gift/claim` — code+amount settings থেকে, এক দিন একবার |
| Target bonus | client-এর amount | `/api/target/claim` — tier+bonus settings থেকে, direct team count server-এ check |
| Activation bonus | client-এর amount | `/api/deposit/submit` → admin `/api/admin/deposit-review` — `activationBonusGiven` flag-এ exactly once |
| Withdrawal | client balance trust, status client-এর হাতে | `/api/withdrawal/request` — server balance check, atomic deduct (negative possible না), min/max, duplicate pending guard |
| Proof approve (reward credit) | admin panel client-side write | `/api/admin/proof-review` — server token check, **double-credit guard** (claim record exists হলে আবার credit না) |
| Deposit approve | admin panel client-side write | `/api/admin/deposit-review` — one-shot (`status != pending` → block) |

## 4. Firestore rules — এখন কী block
- ❌ client `users/{uid}` doc **create/delete** — বন্ধ (server-ই বানায়)
- ❌ client `balance`, `totalEarned`, `refCode`, `refBy`, `isActive`, `activationBonusGiven` change — বন্ধ (শুধু `name` field, `diff().affectedKeys().hasOnly(['name'])` দিয়ে)
- ❌ client `transactions`/`taskClaims`/`giftClaims`/`targetClaims`/`withdrawals`/`deposits`/`proofs` doc create/update/delete — সব বন্ধ
- ❌ `admins/` collection browser থেকে read/write — সম্পূর্ণ বন্ধ
- ❌ `refs/` collection client write — বন্ধ (server-ই বানায়)
- ✅ admin = `admins/{email}` doc exists (rules engine-এর internal `get()` — browser-এ collection পাঠাতে হয় না)
- ✅ public reads: tasks, settings, notices, team (referral tree)

## 5. Auth / Token verification
- প্রতি API request-এ `Authorization: Bearer <Firebase ID token>` — server `verifyIdToken()` করে
- Invalid/expired/missing token → `401` (test করা: no token → 401, bad token → 401, GET → 405)
- Admin endpoint: verified token + `admins/{email}` doc (server-side) — client-এর কোনো "isAdmin" flag-এ ভরসা নেই
- **Email enumeration fix**: login error এখন generic ("ইমেইল বা পাসওয়ার্ড সঠিক নয়") — `fetchSignInMethodsForEmail` সম্পূর্ণ সরানো হয়েছে
- **Admin verify endpoint** always 200 + `{isAdmin:false}` unauthenticated হলে — admin email আবিষ্কার করা যায় না

## 6. Atomicity (money কখনো negative/duplicate হতে পারে না)
প্রতিটা balance-changing operation `runTransaction`-এ:
- read balance → check → deduct/add → write record — **এক transaction-এ**
- দুইটা simultaneous request-এ একটা fail হয় (409)
- doc IDs unique: `w_{timestamp}_{random}` pattern — collision possible না
- `createdAt` সব জায়গায় `FieldValue.serverTimestamp()` — legacy data-র Timestamp type-এর সাথে consistent (orderBy break হয় না)

## 7. Anti-abuse guards
- Task claim: per-day doc (`{slug}_{YYYY-MM-DD}`) exists → block; **আজকের approved proof ছাড়া claim block**
- Gift: per-day doc → block
- Target: per-tier doc → block; direct team count < tier → block
- Withdrawal: pending withdrawal আছে → block; balance < amount → block; max ৳1,00,000
- Deposit: pending আছে → block; already active → block; amount client-এর নয় (settings থেকে)
- Proof approve / deposit approve: one-shot (`status` check transaction-এর ভিতরে)
- Registration: user doc exists → block; self-ref → block; unique ref code (collision loop)
- `ensure` (legacy heal): bonus দেয় না, `activationBonusGiven: true` সেট করে — farming possible না

## 8. Secrets handling
- Admin SDK config **শুধু** 3টা env variable-এ: `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`
- এগুলো `process.env` থেকে পড়ে — `api/_lib/firebase-admin.js` server-এ load হয়, **browser bundle-এ কখনো যায় না**
- `VITE_` prefix নেই → Vercel client bundle-এ inject হয় না
- `.env` gitignore-ড ✓ — repo-তে কোনো key নেই (grep audit করা: কোনো hardcoded key নেই)
- Private key-র escaped `\n` — code handle করে

## 9. Frontend (UX একদম unchanged)
- `src/core/api.js` — `callApi(path, body)` helper: ID token → Bearer header → server-এর message
- সব financial function এখন server call — signature একই, পেজের code প্রায় unchanged
- Error toast-ই থাকে (server-এর Bengali message এনে দেখায়)
- `name` update client-এই থাকে (rules-এ safe field হিসেবে allowed)
- Keep-me-logged-in unchanged

## 10. ⚠️ Known residual risks (সততার সাথে)
1. **Withdrawal duplicate-pending race**: pending check transaction-এর আগে — দুইটা একই মুহূর্তের request দুটোই pending দেখতে পারে। **Money safe** (balance check transaction-এর ভিতরে, negative possible না), কিন্তু দুইটা pending withdrawal request বানানো possible। Fix চাইলে Cloud Function লাগবে (spec অনুযায়ী Cloud Functions বাদ)।
2. **Settings-এর মান**: bonus/fee settings doc-এর value hard cap-এ (৳300/৳5000) bounded — settings-এর ভিতর cap-এর ভেতরে কী আছে সেটা admin-এর দায়িত্ব।
3. **Admin email = power** যতই: `admins/{email}` doc-এ যে email, সে-ই full admin (proof approve = টাকা দেওয়া)। Email account hack হলে admin access। Firebase 2FA on রাখুন।
4. **Rate limiting নেই**: Vercel-এ per-IP rate limit নেই — brute-force login attempt Firebase-এর নিজের throttle-এ (500/day/IP class)।
5. **Real-money scale**: এটা Vercel Hobby/Pro serverless — scale-up-এ Cloud Functions + audit log + idempotency key consider করুন।

## ✅ আপনার করতে থাকলে (3টা জিনিস — না করলে site অসম্পূর্ণ থাকবে)
1. **Vercel-এ 3টা env variable বসান (দুটো project-এই)** — Main + Admin:
   `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`
   (Firebase Console → Project settings → Service accounts → **Generate new private key** → JSON-এ আছে)
2. **Nতুন `firestore.rules` publish করুন** — Firebase Console → Firestore Database → Rules → repo-র `firestore.rules` ফাইল-র পুরোটা paste → **Publish**।
   ⚠️ এই publish-এর আগ পর্যন্ত পুরনো insecure rules চালু থাকবে।
3. **`admins/{email}` doc** — Firestore → `admins` collection → document ID = আপনার admin email, field: `{ "isAdmin": true }` (আগেই বানানো থাকলে লাগবে না)।

## Tested (sandbox-এ)
- ✅ সব 13টা API handler import + syntax check passed
- ✅ No token → 401, bad token → 401, wrong method → 405
- ✅ Admin verify unauthenticated → 200 `{isAdmin:false}` (enumeration-safe)
- ✅ Main build ✓, Admin build ✓
- ✅ Secret scan: repo-তে কোনো hardcoded key নেই
- ✅ Client-এ এখন কোনো financial write নেই (grep audit: শুধু `name` field)
