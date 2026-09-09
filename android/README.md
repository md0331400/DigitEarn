# 📱 Digit Earn Admin — Android App (Build Guide)

এই folder-টা (**android/**) একটা complete Android Studio project। এটা আপনার **admin panel-এর native app version** — ভেতরে সেই admin panel-টাই চলবে (web app), কিন্তু app-এর মতো থাকবে: apnar phone-এর home screen-এ icon, app name **"Digit Earn Admin"**, package **com.admin.digitearn**。

## কী লাগবে

1. **Android Studio** — https://developer.android.com/studio (free, install করুন)
2. একটা Android phone (USB cable ছাড়াও চালানো যায় — wireless debugging)

## Build করবেন যেভাবে (একবারই, ~10-15 min)

1. **Android Studio** খুলুন → **Open** → এই repo-র `android` folder select করুন
2. প্রথমবার Gradle download হবে (10-15 min, internet লাগবে) — বসে থাকুন, "Sync" complete হতে দিন
   - যদি wrapper নিয়ে warning দেখায় → **Fix** button চাপুন (নিজেই ঠিক করে নেবে)
3. `app/src/main/java/com/admin/digitearn/MainActivity.kt` file খুলুন
4. ভেতরে **`ADMIN_URL`** খুঁজুন — সেখানে আপনার **admin panel-এর Vercel URL** দিন:
   ```kotlin
   private const val ADMIN_URL = "https://apnar-admin.vercel.app"
   ```
   (Vercel Dashboard → admin project-এর URL)
5. উপরে **Run** button (▶️) চাপুন — phone connect করলে phone-এ install হয়ে যাবে, না করলে emulator-এ চলবে
6. Phone-এ **Digit Earn Admin** icon দেখবেন → চাপলে admin panel খুলবে → আপনার admin account দিয়ে login

## APK file বানাতে চাইলে (Play Store / অন্য phone-এ পাঠানোর জন্য)

Android Studio → menu **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
→ `app/release`... না, `app/build/outputs/apk/debug/app-debug.apk` file পাবেন — সেটাই APK (WhatsApp-এ পাঠানো যাবে, install করলে চলবে)

> ⚠️ Play Store-এ publish করতে হলে আলাদা Google Play Developer account + signed release build লাগবে — প্রয়োজন হলে পরে আলাদা করে বানাব।

## যা যা কাজ করে

- ✅ Admin panel-এর সব feature (tasks, submissions, deposits, withdrawals, users, notices/warnings, settings)
- ✅ Login session phone-এ save থাকবে (localStorage)
- ✅ Back button = পেছনের page
- ✅ নিচ-ডানে refresh button
- ✅ Admin site-এর বাইরের link (telegram) → phone-এর browser-এ খুলবে
- 🔒 App-এ কোনো key/secret নেই — সব security আগের মতোই (Vercel env vars + Firestore rules + server API)

## নতুন version দিতে

Repo push করলেই admin panel update হবে — app-এ refresh button চাপলেই নতুন version আসবে (কোনো নতুন APK লাগবে না)
