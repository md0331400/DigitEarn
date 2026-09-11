# DigitEarn 🇧🇩

বাংলাদেশের জন্য ডিজিটাল টাস্ক-ভিত্তিক আর্নিং ওয়েবসাইট — **Vite + Firebase (Firestore/Auth) + Vercel**, সম্পূর্ণ SEO-optimized (প্রতিটা পেজের আলাদা URL, title, meta, canonical, sitemap, robots, JSON-LD)।

লাইভ সাইট: **https://digitearn.vercel.app/**

> এই রিপো-তে **push করলেই Vercel auto-deploy** হয় (আপনার Vercel এই repo-এর সাথে connected)।

---

##  সেটআপ — ধাপে ধাপে (শুরুর একবারই করতে হবে)

### ধাপ ১: Firebase প্রজেক্ট বানাও

1. <https://console.firebase.google.com/> → **Add project** → নাম দিন `digitearn` (বা যেকোনো) → Create
2. বাঁ পাশের মেনু → **Authentication** → **Get started** → **Sign-in method** ট্যাব →
   - **Email/Password** → ON → **Save**
   - (আর কিছু দরকার নেই)
3. মেনু → **Firestore Database** → **Create database** →
   - Location: **asia-south1 (Mumbai)** (বাংলাদেশের জন্য সেরা)
   - Security rules: **Start in locked mode** → **Create**
4. মেনু → **Firestore Database** → **Rules** ট্যাব → যে যা লেখা আছে **সব মুছে** এই repo-এর
   [`firestore.rules`](./firestore.rules) ফাইলের কন্টেন্ট paste করে **PUBLISH** চাপুন
5. মেনু → **Project settings (⚙️)** → নিচের দিকে **Your apps** → **Add app** → **Web (</>)**
   - Nickname: `digitearn-web` → Register
   - এবার একটা `firebaseConfig = { ... }` দেখাবে — ৬টা মান এখান থেকেই বের করবেন:

### ধাপ ২: `.env` ফাইল বানাও

রিপোর root-এ `.env` নামে নতুন ফাইল বানাও (`.env.example` কপি করে)। ভেতরে ৬টা key বসানো আছে:

```env
VITE_FIREBASE_API_KEY=AIzaSy...            ← firebaseConfig.apiKey
VITE_FIREBASE_AUTH_DOMAIN=digitearn.firebaseapp.com   ← firebaseConfig.authDomain
VITE_FIREBASE_PROJECT_ID=digitearn         ← firebaseConfig.projectId
VITE_FIREBASE_STORAGE_BUCKET=digitearn.firestoreapp.com ← firebaseConfig.storageBucket
VITE_FIREBASE_MESSAGING_SENDER_ID=1234567890 ← firebaseConfig.messagingSenderId
VITE_FIREBASE_APP_ID=1:1234567890:web:abc... ← firebaseConfig.appId
```

> ⚠️ key-গুলোর **নাম ঠিক এই ৬টা** (VITE_ prefix ছাড়া কাজ করবে না — Vite শুধু `VITE_` দিয়ে শুরু হওয়া variable-এর বাইরে দিতে পারে)।
> `.env`-এর মানগুলো **গোপন রাখুন** — `.env` git-এ push হবে না (`.gitignore`-এ আছে), কিন্তু `VITE_` variable-গুলো browser-এর ফ্রন্ট-এন্ড config — এগুলো দিয়ে কেউ সাইটের ডেটা নিয়ে খেলতে পারবে না, কারণ **Firestore Security Rules** তা রোধ করে।

### ধাপ ৩: Firestore-এ ডেটা seed করো

টাস্ক, settings, notice গুলো Firestore-তে বসাতে লোকাল টার্মিনালে:

```bash
npm install
npm run seed
```

এবার console-এ ✅ দেখাবে। এটা **আবার আবার চালানো safe** — যে document আছে সেটাকে ছুঁয় না।

### ধাপ ৪: Vercel-এ Environment Variables বসানো

1. <https://vercel.com> → আপনার **DigitEarn** project → **Settings** → **Environment Variables**
2. উপরের ৬টা variable-এর **একই নাম আর একই মান** বসান (যেমন `VITE_FIREBASE_API_KEY` = ...)
3. Production / Preview / Development তিন জায়গাতেই (বা "All" scope) save করুন
4. আবার যেকোনো commit/push করলেই নতুন variable নিয়ে build হয়ে যাবে

### ধাপ ৫: Push

```bash
git push origin main
```

⚠️ আগে এখানে `arena/01a080f3-digitearn` লেখা ছিল — ওই branch-টা ২০২৬-০৯-০৯ থেকে
স্থির (main-এর ৩৩ commit পিছে)। সেখানে push করলে Vercel-ও পুরনো কোড deploy করত,
আর `Build Admin APK` workflow চলত, কিন্তু আসল সাইট update হতো না। **এখন সব work
`main`-এ** (Vercel production + GitHub Actions দুটোই `main` ধরে)।

---

## 📄 পেজ তালিকা

| URL | ধরন | Google Index |
|---|---|---|
| `/` | হোম/ল্যান্ডিং | ✅ |
| `/task/facebook-sale.html` | টাস্ক পেজ | ✅ |
| `/task/gmail-sale.html` | টাস্ক পেজ | ✅ |
| `/task/instagram-sale.html` | টাস্ক পেজ | ✅ |
| `/task/job-post.html` | টাস্ক পেজ | ✅ |
| `/task/angk-kron.html` | টাস্ক পেজ | ✅ |
| `/task/myjob.html` | টাস্ক পেজ | ✅ |
| `/task/typing-job.html` | টাস্ক পেজ | ✅ |
| `/task/ads-view.html` | টাস্ক পেজ | ✅ |
| `/register.html` | রেজিস্ট্রেশন | ✅ |
| `/login.html` | লগইন | ✅ |
| `/forgot-password.html` | পাসওয়ার্ড রিসেট | ✅ |
| `/dashboard.html` | অ্যাপ (লগইন পর) | ❌ noindex |
| `/wallet.html` | অ্যাপ | ❌ noindex |
| `/history.html` | অ্যাপ | ❌ noindex |
| `/team.html` | অ্যাপ | ❌ noindex |
| `/profile.html` | অ্যাপ | ❌ noindex |
| `/help.html` | অ্যাপ | ❌ noindex |
| `/gift.html` | অ্যাপ | ❌ noindex |
| `/target.html` | অ্যাপ | ❌ noindex |
| `/leadership.html` | অ্যাপ | ❌ noindex |

- sitemap: `/sitemap.xml` (শুধু public পেজ) • robots: `/robots.txt`
- লগইন ছাড়া অ্যাপ পেজ খুললেই `/login.html`-এ redirect

### SEO চেক (deploy এর পর)

1. <https://digitearn.vercel.app/sitemap.xml> খুলুন — ১২টা URL থাকবে
2. [Google Search Console](https://search.google.com/search-console) → Property add → `digitearn.vercel.app` →
   **Sitemap submit** করুন → `sitemap.xml`
3. যেকোনো public পেজে রাইট-ক্লিক → View Page Source → `<title>`, `<meta name="description">`,
   `canonical`, `og:` tags দেখুন

---

## ⚙️ সাইট কন্ট্রোল (Firestore থেকে)

সব কন্টেন্ট/সেটিংস Firestore-এর `settings/site` document-এ আছে — বদলাতে হলে
**Firebase Console → Firestore → settings → site** খুলে মান বদলালেই **লাইভ হয়ে যায়** (কোনো deploy লাগে না):

| Field | মানে | ডিফল্ট |
|---|---|---|
| `siteStart` | সাইট শুরুর তারিখ (header টাইমার) | `2026-04-29` |
| `videoUrl` | রেজিস্টার + হেল্প পেজের টিউটোরিয়াল ভিডিও (YouTube link — `watch?v=...` বা `youtu.be/...`); খালি থাকলে "Video Coming Soon" দেখাবে | `''` |
| `registerBonus` | রেজিস্ট্রেশন বোনাস | `10` |
| `activationBonus` | একাউন্ট অ্যাক্টিভেশন বোনাস | `20` |
| `referralBonus` | প্রতি রেফারে বোনাস | `5` |
| `minWithdraw` | ন্যূনতম উইথড্র | `100` |
| `giftCode` | গিফট কোড (টেলিগ্রামে দেন) | `DIGIEARN01` |
| `giftReward` | গিফট বোনাস | `5` |
| `telegramLink` / `facebookLink` / `youtubeLink` | সোশ্যাল লিংক | — |
| `activationLink` | "Telegram Join" বাটনের লিংক | — |
| `admin1Name` / `admin1Link` / `admin2Name` / `admin2Link` | সাপোর্ট/হেল্প পেজের যোগাযোগ | — |
| `targetTiers` | টার্গেট বোনাস (৫/১০/২০ জন → ৳৫০/৳১০০/৳৩০০) | — |

টাস্ক add/বন্ধ করতে: **Firestore → tasks** collection (প্রতি task-এ `enabled: true/false`, `reward`, `sort`)।

### Dynamic Input Fields (প্রতিটা task-এর form admin-এর হাতে)

`tasks/{slug}.inputFields = [{ label, type, placeholder, required }]` — **কোনো task-specific
field code-এ hardcode করা নেই** (Facebook/Gmail/Instagram সব একই সিস্টেমে)।

| `type` | User side | Limit |
|---|---|---|
| `text` / `number` / `tel` | input | 100 / 60 / 20 |
| `email` / `url` | input + server format check (url = শুধু `http(s)://`) | 120 / 300 |
| `password` | masked input (👁 show/hide) | 100 |
| `textarea` | multi-line box | 2000 |

- Admin: **Micro Jobs → Task → Input Fields → "Add Input Field"** — Field Title (যেমন `UID`,
  `Password`, `Cookies`), Field Type, placeholder, Required; বাদ দিতে 🗱 → **Save**। Save করলেই
  user task page-এর form updated হয় (নতুন build/deploy লাগে না)।
- User submit করলে server **admin config** অনুযায়ী validate করে এবং `submittedFields`
  (title + type + value) + `submittedData` (পুরোনো consumer-এর জন্য) দুটোই save করে —
  তাই admin পরে field বদলে/মুছে দিলেও পুরোনো submission ঠিকভাবেই দেখা যায়।
- **পাসওয়ার্ড রিকোয়ারমেন্ট** = `tasks/{slug}.password`: admin কিছু সেট না করলে user page-এ
  পুরো box টা **empty** থাকে (কোনো default লেখা নেই); সেট করলে value + COPY বাটন।
- Admin Proofs card-এ submitted fields dynamically দেখা যায়, `password` type ডিফল্ট **masked**
  ("দেখুন" দিয়ে reveal), সাথে **Copy All Data** (real values)।
- প্রতিটা task-এ সর্বোচ্চ ২০টা field; এক submission-এর মোট data ~24KB (server-side guard)।
- পুরোনো task-এ `inputFields` না থাকলে: শুধু link + submit দেখায় — panel থেকে field যোগ করুন,
  অথবা `npm run seed` চালালে `src/tasks-data.js`-এর config merge হয়ে বসে যাবে।
Notice marquee: **Firestore → notices** collection (`enabled`, `sort`, `text`)।

> ✅ **সব financial value শুধু server API থেকে লেখে** — `users/{uid}.balance` সহ প্রায় সব collection
> rules-এ `allow write: if false`, তাই browser/console থেকে টাকা বা referral bonus increase করা যায় না।
> আগের version-এ এখানে লেখা ছিল "rules-এ ৫ ও ৩০০ hard-code করা" — সেটা সঠিক ছিল না: bonus cap
> এখন `lib/rates.js`-এর মতো server-side validation + API-তেই আছে (settings-এর মানই ব্যবহার হয়)।

---

## 💰 Real Money নিয়ে গুরুত্বপূর্ণ সতর্কতা

এই সফটওয়্যারের **wallet ব্যালেন্স পরিবর্তন client-side (browser) থেকে** Firestore-এ হয় — এটা
অন্য ইউজারের ডেটা থেকে রক্ষা করে (rules দিয়ে), **কিন্তু নিজের ব্যালেন্স হ্যাকের ১০০%
রক্ষা Firestore Rules দিয়ে সম্ভব নয়** (যেকোনো client-side wallet-এই এই সীমাবদ্ধতা)।

**তাই real money দেওয়ার আগ পর্যন্ত:**
- **নিজেকে শিখিয়ে নিন**: browser DevTools দিয়ে কী কী সম্ভব তা বুঝুন
- পAYOUT (bKash/Nagad-এ টাকা পাঠানো) **সবসময় ম্যানুয়ালি করুন** — Firestore-এর
  `withdrawals` দেখে, তারপর নিজে টাকা পাঠিয়ে status আপডেট করুন
- **স্কাল করার আগে** wallet লজিক **Cloud Functions** (Firebase) তে তুলে আনুন —
  তখনই ব্যালেন্স ১০০% server-controlled হবে। এটা পরের ধাপে করা যাবে।

**এখন যা করবেন:** সাইটটা test mode-এ চালান (বোনাস/রিওয়ার্ডের মান কম রাখুন),
কিছু দিন দেখুন, তারপর আসল ব্যবসায় ধীরে ধীরে বাড়ান।

---

## 🛠️ ডেভেলপমেন্ট (লোকাল)

```bash
npm install        # একবারই
npm run dev        # লোকাল ডেভ সার্ভার (http://localhost:5173)
npm run build      # প্রোডাকশন build (dist/ তৈরি হয়)
npm run seed       # Firestore seed (বারবার চালানো safe)
```

- টাস্ক পেজগুলো **build-এর সময়** `scripts/gen-task-pages.mjs` দিয়ে তৈরি হয়
  (`task/` ফোল্ডার — জেনারেটেড, git-এ থাকে না)
- `src/tasks-data.js`-তে টাস্কের ডেটা/SEO text এডিট করুন → `npm run build`

---

## 📁 স্ট্রাকচার

```
├── index.html                  # ল্যান্ডিং পেজ (SEO)
├── login.html register.html forgot-password.html
├── dashboard.html wallet.html history.html team.html profile.html
├── help.html gift.html target.html leadership.html   # অ্যাপ পেজ (noindex)
├── 404.html
├── task/*.html                 # ৮টা টাস্ক পেজ (build-এ generated)
├── public/                     # logo.png, favicon.png, robots.txt, sitemap.xml
├── firestore.rules             # Firestore Security Rules (console-এ paste করবেন)
├── scripts/
│   ├── gen-task-pages.mjs      # টাস্ক পেজ জেনারেটর
│   └── seed.mjs                # Firestore seeder (tasks/settings/notices)
└── src/
    ├── core/
    │   ├── firebase.js         # Firebase init (import.meta.env থেকে)
    │   ├── store.js            # auth state + settings cache
    │   ├── api.js              # সব Firestore/Auth লজিক
    │   └── ui.js               # header/nav/drawer/modal helpers
    ├── pages/                  # প্রতিটা পেজের JS module
    └── tasks-data.js           # টাস্ক ডেটা + সাইট কনস্ট্যান্ট
```

---

## 🔑 Environment Variables (Vercel-এও একই নামে)

| Variable | কোথায় পাবেন |
|---|---|
| `VITE_FIREBASE_API_KEY` | Firebase Console → Project settings → Your apps → Web app → `apiKey` |
| `VITE_FIREBASE_AUTH_DOMAIN` | `authDomain` (সাধারণত `আপনার-প্রজেক্ট.firebaseapp.com`) |
| `VITE_FIREBASE_PROJECT_ID` | `projectId` |
| `VITE_FIREBASE_STORAGE_BUCKET` | `storageBucket` (সাধারণত `আপনার-প্রজেক্ট.firestoreapp.com`) |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | `messagingSenderId` (সংখ্যা) |
| `VITE_FIREBASE_APP_ID` | `appId` (web app-এর ID) |

## 🔒 Security Architecture (Wallet Protection)

**সব financial operation server-side (Vercel API + Firebase Admin SDK)** — browser-এর user
সরাসরি `balance`/`totalEarned`/transactions/claims কখনোই change করতে পারে না
(Firestore rules client-কে read-only + safe profile field-এর মধ্যে সীমাবদ্ধ রাখে)।

| Endpoint | কাজ |
|---|---|
| `POST /api/user/register` | রেজিস্ট্রেশন — bonus + referral credit server-side (atomic) |
| `POST /api/user/ensure` | profile doc heal (legacy session, bonus ছাড়া) |
| `POST /api/gift/claim` | gift code — code + amount server validate |
| `POST /api/target/claim` | referral target bonus — tier + bonus server-side |
| `POST /api/account/activate` | activation + bonus (exactly once) |
| `POST /api/proof/submit` | task proof submit (pending) |
| `POST /api/deposit/submit` | deposit request (amount server-এর settings থেকে) |
| `POST /api/withdrawal/request` | withdrawal — server balance check, atomic deduct |
| `POST /api/admin/verify` | admin token check (server-side) |
| `POST /api/admin/health` | (ভেতরে `?op=health`) auth/env self-check — **শুধু admin**, কারণ "Login required" বলে দেয় |
| `POST /api/admin/proof-review` | admin proof approve/reject (reward credit) |
| `POST /api/admin/deposit-review` | admin deposit approve/reject (account active) |
| `POST /api/admin/set-active` | manual activate/inactivate |

- প্রতি request-এ **Firebase ID token** (`Authorization: Bearer <token>`) — server `verifyIdToken()` করে
- UID/amount/balance **client থেকে কখনো trust করা হয় না**
- সব balance-changing operation **Firestore transaction**-এ (atomic, duplicate-proof)

### Server env variables (Vercel-এ, দুটো project-এই লাগবে)

| Variable | কোথায় পাবেন |
|---|---|
| `FIREBASE_PROJECT_ID` | Firebase Console → Project settings → **Service accounts** → `project_id` |
| `FIREBASE_CLIENT_EMAIL` | সেখানেই → `client_email` |
| `FIREBASE_PRIVATE_KEY` | সেখানেই → **Generate new private key** → `private_key` (\n escaped থাকলে ঠিক আছে) |

⚠️ এই ৩টা **কখনোই** `VITE_` prefix-এ নয়, GitHub-এ নয়, frontend-এ নয় — শুধু Vercel env-এ।

## 📸 Image upload

**Image upload feature বর্তমানে নেই** (ImageKit সরিয়ে দেওয়া হয়েছে)।
- Task proof: user কাজের screenshot **এডমিনকে Telegram-এ** পাঠায় → admin panel-এ approve/reject
- Deposit: user **TrxID + sender number** দেয় → admin নিজের bKash/Nagad app-এ ট্রানজেকশন check করে approve/reject

Image upload পরে চাইলে আবার add করা যাবে।

### Firestore Rules-এ Admin সেটআপ (admin panel-এর জন্য)

1. Firebase Console → **Authentication** → আপনার admin email-এ email/password একাউন্ট খুলুন
2. **Firestore** → নতুন collection **`admins`** → document ID = আপনার **admin email** (field: `role: "admin"`)
3. `firestore.rules` পাস্ট করা থাকলে সেই email-এ login করলেই admin full access পাবে

## 🛠️ Admin Panel (APK-তে embedded — আলাদা Vercel project লাগে না)

**⚠️ repo-তে `admin/` folder নেই** — আগে এই docs-এ "Root Directory: `admin`" বলে
দ্বিতীয় Vercel project বানাতে বলা হতো, সেটা এখন ভুল (project-ই build হতো না)।
এখন panel:

- Source: `src/admin/` (এই project-এর ভেতরেই) — public website-তে admin page নেই,
  `vite.config.js` `admin` dir build থেকে বাদ দেয়
- Distribution: **শুধু Android APK-তে embedded** — `npm run build:admin-app`
  panel build করে `android/app/src/main/assets/admin/`-এ বসায়; GitHub Actions
  (`Build Admin APK`, `main` push) প্রতিবার সেটা source থেকে নতুন করে build করে
- Server action: একই Vercel project-এর **একটিমাত্র** function
  `/api/admin/panel?op=<name>` (Hobby 12-function limit — নতুন `api/**` file বানাবেন না;
  handler চাইলে `lib/admin/<name>.js` + `api/admin/panel.js`-এর `HANDLERS` map)

ফায়দা: panel-এর কোনো public URL নেই (scan/bot পাবে না), আর APK offline খোলে;
শুধু approve/reject-এর সময় server-এ token-সহ call যায়।

> ⚠️ **`firebase-admin` v13/v14 upgrade করলে সতর্ক:** legacy `app.auth()` / `app.firestore()` আর নেই —
> `getAuth(app)` / `getFirestore(app)` ব্যবহার করুন (wrapper: `lib/firebase-admin.js` → `getAdminAuth()`)।
> ভুললে **প্রতিটা** API `401 "Login required"` দেবে (এই round-এর আসল bug); `npm test` ধরবে, কারণ test
> mock-ও এখন v14-এর আসল surface-ই মানে।
>
> **Preview URL বা APK থেকে API 401 এলে:** সেটা Vercel-এর **Deployment Protection** (Vercel → Settings →
> Deployment Protection) — request function-এ পৌঁছানোর আগেই ব্লক হয়। Production domain ব্যবহার করুন,
> নয়তো protection off করুন/bypass token দিন।
>
> **Node version:** `firebase-admin@14` requires **Node ≥ 22** — `package.json`-এ `engines.node`
> দেওয়া আছে, তাই Vercel matching function runtime বেছে নেয় (`npm ci`-তে EBADENGINE warning আসলে
> মানে runtime পুরোনো)।
>
> **নতুন code deploy হয়েছে কিনা:** যেকোনো `/api/*` response-এ `X-DigitEarn-API: v3` header থাকবে; না থাকলে
> server-এর functions এখনো পুরোনো (clientও সেটা toast-এ বলে দেয়)।
>
> **Auth error গুলো এখন সত্যি বলে:** token expire হলে `401` + "Session শেষ হয়েছে"
> (client নিজে থেকেই token refresh করে একবার retry করে), আর server-এর Firebase env/
> project ঠিক না থাকলে `503` with "Server configuration সমস্যা (token project: X, server project: Y)" —
> আগে দুটোরই একই message ছিল "Login required", যা logged-in user-কেও বিভ্রান্ত করত।
> কারণ খুঁজতে: Admin panel → Overview → **সিস্টেম চেক**, অথবা Vercel Function log-এ
> `[auth] verifyIdToken failed: …` লাইন।

### চাইলে web থেকেও চালানো যায় (dev only)

```bash
npx vite build --config <(echo "export default {build:{outDir:'dist-admin',rollupOptions:{input:{index:'src/admin/index.html'}}}}")
```
(production-এ আলাদা hosting-এ put না করলেও চলবে — সাধারণত লাগে না।)

### Admin সেটআপ (Firebase-এ)

1. Firebase Console → **Authentication → Users** → আপনার admin email-এ **Email/Password** account খুলুন
2. **Firestore** → collection **`admins`** → নতুন document — **document ID = আপনার admin email** (field: `role: "admin"`)
3. `firestore.rules` (এই repo-র ফাইল) Firestore Console-এ paste করে **PUBLISH** করুন
4. Admin panel-এ সেই email/password দিয়ে login

### Admin panel-এ যা যা করা যাবে

| Section | কাজ |
|---|---|
| **Overview** | মোট user, pending proof/deposit count, total balance, **সিস্টেম চেক** (API auth/env) |
| **Proofs** | User-এর task proof review — **Approve** (reward auto balance-এ) / **Reject** (reason সহ) |
| **Deposits** | bKash/Nagad payment proof + TrxID check — **Approve** (account active + bonus) / **Reject** |
| **Users** | Search, balance/transactions দেখা, manual activate/inactivate |
| **Micro Jobs** | Task-র reward, link, on/off, lock, video + **Add Input Field** (dynamic form fields) — save করলেই site-তে update |
| **Settings** | Deposit fee, bonus, bKash/Nagad/Rocket number, admin contact (name/phone/email), gift, links |
| **Notices** | Dashboard-এর notice bar — all-user notice + **specific user-এর private warning** (দুটোই এখন কাজ করে) |
| **Withdrawals** | Top-level queue — Paid মার্ক / Reject (টাকা balance-এ ফেরত, atomic) |

> Settings-এর **Gift Code** পড়া/লেখা এখন server op (`?op=secret`) দিয়ে হয়, কারণ
> `settings/secret` browser থেকে পড়া rules-এ বন্ধ — খালি field হলেও কোড আর মুছে যাবে না।

> নতুন task (নতুন page) add করতে চাইলে developer-কে জানান — static SEO page generate হয় build time-এ।
