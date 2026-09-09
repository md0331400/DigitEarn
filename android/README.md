# 📱 Digit Earn Admin — Android App (Build Guide)

এই app **self-contained**: admin panel-এর সব file APK-এর ভেতরেই আছে (`assets/admin/`) —
public website-তে কোনো admin page থাকে না। App-এ admin action (approve/reject) করার সময়
server API-তে (digitearn.vercel.app) token-সহ call যায় — security আগের মতোই।

- **App name:** Digit Earn Admin
- **Package:** com.admin.digitearn
- **Firebase config:** নিজে সেট করতে হবে (নিচে step ৩)

## কী লাগবে

1. **Android Studio** — https://developer.android.com/studio (free)
2. একটা Android phone (অথবা emulator)

## Build করবেন যেভাবে (~15-20 min, একবারই)

### Step ১: Android Studio-তে project খুলুন
**Open** → এই repo-র `android` folder → প্রথম sync-এ 10-15 min লাগবে (বসে থাকুন;
wrapper warning দিলে **Fix** চাপুন)

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
