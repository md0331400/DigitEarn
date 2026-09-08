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
git push origin arena/01a080f3-digitearn
```

(যদি branch থেকে main-এ merge করে deploy করতে চান — Vercel যে branch connect করা আছে সেই branch-এ merge করুন।)

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
Notice marquee: **Firestore → notices** collection (`enabled`, `sort`, `text`)।

> ⚠️ **`referralBonus` ৫ আর টার্গেট বোনাস ৩০০-এর বেশি না** — এই দুইটা সংখ্যা `firestore.rules`-এ hard-code করা
> (নিরাপত্তার জন্য)। বোনাস বদলাতে হলে rules-এর `5` ও `300` মানটাও একসাথে বদলাতে হবে।

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

## 📸 ImageKit (proof image upload)

Task proof-এর screenshot upload-এ [ImageKit](https://imagekit.io) ব্যবহার হয়।
**Vercel-এ Environment Variables** (Settings → Environment Variables) — এই ৩টা নাম:

| Variable | কোথায় পাবেন (ImageKit Dashboard → Setup) |
|---|---|
| `IMAGEKIT_PUBLIC_KEY` | `Authentication` → Public Key (`ik_...`) |
| `IMAGEKIT_PRIVATE_KEY` | `Authentication` → Private Key (🔒 শুধু server-এ থাকবে, browser-এ যায় না) |
| `IMAGEKIT_URL_ENDPOINT` | `General` → URL Endpoint (`https://ik.imagekit.io/xxxxx/`) |

- Signature তৈরি হয় Vercel serverless function-এ (`api/imagekit.js`) — private key client-এ আসে না
- ছবি থাকে ImageKit-এ (ফ্রি প্ল্যান ৫GB) — Firebase Storage লাগবে না

### Firestore Rules-এ Admin সেটআপ (admin panel-এর জন্য)

1. Firebase Console → **Authentication** → আপনার admin email-এ email/password একাউন্ট খুলুন
2. **Firestore** → নতুন collection **`admins`** → document ID = আপনার **admin email** (field: `role: "admin"`)
3. `firestore.rules` পাস্ট করা থাকলে সেই email-এ login করলেই admin full access পাবে

Admin panel (আলাদা অ্যাপ) এখন বানাচ্ছি — সেটা এই সাইটের ভেতরে থাকবে না।
