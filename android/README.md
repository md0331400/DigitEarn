# 📱 Digit Earn Admin — Android App (Build Guide)

এই app **self-contained**: admin panel-এর সব file APK-এর ভেতরেই আছে (`assets/admin/`) —
public website-তে কোনো admin page থাকে না। App-এ admin action (approve/reject) করার সময়
server API-তে (digitearn.vercel.app) token-সহ call যায় — security আগের মতোই।

- **App name:** Digit Earn Admin
- **Package:** com.admin.digitearn
- **Firebase config:** নিজে সেট করতে হবে (নিচে step ৩)

## ✅ সবচেয়ে সহজ উপায় — GitHub-এই auto APK build (Android Studio লাগবে না!)

Developer-এর পুশে **GitHub Actions** (`Build Admin APK`) নিজে থেকেই APK বানায়।
আপনার করণীয়:
1. Firebase web app config-এর **৬টা value** (apiKey, authDomain, projectId,
   storageBucket, messagingSenderId, appId) developer-কে দিন → সে
   `app/src/main/assets/firebase.json`-এ বসিয়ে push করবে
2. GitHub → **DigitEarn** repo → **Actions** tab → **"Build Admin APK"** →
   সর্বশেষ run (green ✅) → নিচে **`DigitEarnAdmin-debug.apk`** artifact-এ
   click → **Download** → phone-এ install করুন

> ⚠️ firebase.json-এ **service account-এর private key JSON দেবেন না** — শুধু
> web app-এর ৬টা public value।

---

## (Fallback) নিজে phone/PC-তে build করতে চাইলে

## কী লাগবে

1. **Android Studio** — https://developer.android.com/studio (free)
2. একটা Android phone (অথবা emulator)

## Build করবেন যেভাবে (~15-20 min, একবারই)

### Step ১: Android Studio-তে project খুলুন
**Open** → এই repo-র `android` folder → প্রথম sync-এ 10-15 min লাগবে (বসে থাকুন;
wrapper warning দিলে **Fix** চাপুন)

⚠️ **Latest folder নিশ্চিত হোন:** GitHub-এ branch **`arena/01a080f3-digitearn`** select
করে Download ZIP → সেখানকার `android/` folder টা ব্যবহার করুন (পুরনো/আধো copy-তে
build error + ভাঙা app হয় — Details: নিচে Troubleshooting)

### Step ২: (skip) — admin panel আগে থেকেই APK-তে embedded আছে

### Step ৩: Firebase config file দিতে হবে (একবারই)
`app/src/main/assets/firebase.json` file খুলুন — এটা এখন placeholder।
সেখানে আপনার Firebase project-এর **web app config** বসান:

1. **Firebase Console** → আপনার project → ⚙️ **Project settings**
2. নিচে **Your apps** section → Web app-টা দেখলে SDK setup-এর `firebaseConfig` object আছে
   (না থাকলে **Add app → Web app** করে নিন — একই config)
3. ওই ৬টা value নিয়ে `firebase.json` ঠিক এমন থাকবে:
```json
{
  "apiKey": "AIzaSy...",
  "authDomain": "apnar-project.firebaseapp.com",
  "projectId": "apnar-project-id",
  "storageBucket": "apnar-project.appspot.com",
  "messagingSenderId": "1234567890",
  "appId": "1:1234567890:web:abcdef"
}
```
> ⚠️ **Service account-এর private key JSON এখানে দেবেন না** — সেটা শুধু Vercel server-এ থাকবে।
> এখানে যা লাগবে শুধু ওপরের web app config-টুকু (এটা public nature-এর, site-তেও আছে)।

### Step ৪: Run
**Run (▶️)** চাপুন → phone-এ **Digit Earn Admin** install হবে → চাপলে admin panel →
আপনার admin email/password দিয়ে login

## APK বানানো (অন্য phone-এ পাঠানোর জন্য)
Android Studio → **Build → Build APK(s)** → `app/build/outputs/apk/debug/app-debug.apk`
file পাবেন (WhatsApp-এ পাঠানো যাবে)

> Play Store-এ publish করতে হলে আলাদা Play Developer account + signed release build লাগবে —
> প্রয়োজন হলে পরে বানাব।

## যা যা কাজ করে

- ✅ Admin panel-এর সব feature (tasks, submissions, deposits, withdrawals, users, notices/warnings, settings)
- ✅ Panel APK-এর ভেতরে — website-তে admin page public নেই
- ✅ Login session phone-এ save
- ✅ Back button = পেছনে • নিচ-ডানে refresh button
- ✅ Telegram-এর মতো বাইরের link → phone-এর browser-এ
- 🔒 Private key/secret app-এ নাই — সব financial action Vercel server + token-এ

## নতুন admin feature add হলে
Developer-এ বলা — সে `npm run build:admin-app` চালিয়ে assets update করবে (এই repo-তে
`src/admin/`-এ source আছে)

## ❌ Build error হলে (Troubleshooting)

**Error: `resource style/Theme.Material3.DayNight.NoActionBar not found`**
→ আপনার phone-এর `android/` folder **পুরনো copy** (অথবা Android Studio-র template-র
`themes.xml` বাকি আছে)। এই repo-র themes.xml-এ Material3 নেই — system theme
(`android:Theme.Material.Light.NoActionBar`) use হয়, কোনো external library লাগে না।

Fix: **পুরো project folder-টা latest repo থেকে আবার নিন:**
1. GitHub → `md0331400/DigitEarn` → উপরে branch selector-এ `main`-এর বদলে
   **`arena/01a080f3-digitearn`** select করুন (⚠️ `main`-এ `android/` folder নেই)
2. **Code** (green button) → **Download ZIP** → unzip করুন
3. ZIP-এর `android/` folder-এর **সম্পূর্ণ content** দিয়ে আপনার project folder
   (CodeOnTheGoProjects/Digit Earn Admin/) replace করুন — পুরনো file গুলো delete করে
   নতুনটা copy করুন (half-half হলে হবে না)
4. Chack: `app/src/main/res/values/themes.xml`-এ `android:Theme.Material.Light.NoActionBar`
   লেখা থাকতে হবে (Material3 নয়)
5. `app/src/main/assets/`-এ `admin/` folder + `firebase.json` ফাইল থাকতে হবে —
   না থাকলে copy পুরনো
6. firebase.json-এ config paste করে (Step ৩) আবার Build

**কেন পুরোটা replace করতে হয়:** নতুন app admin panel APK-র ভেতর থেকে লোড করে
(`file:///android_asset/admin/index.html`) — পুরনো copy-তে assets/admin/ নেই আর সেটা
`digitearn.vercel.app/admin.html` খুলত, যেটা এখন 404 (admin public নেই)। অর্থাৎ
পুরনো copy-র APK = ভাঙা app।
