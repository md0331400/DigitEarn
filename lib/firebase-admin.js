/* Firebase Admin SDK — server-side only (Vercel function-এর ভেতর).
   Browser-এ কখনো load হয় না. Env vars: FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY
   (Vercel → Settings → Environment Variables; private key-এর \n escaped থাকলে নিচে fix করা আছে) */
import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

let cachedApp = null;

export function getAdminApp() {
  if (cachedApp) return cachedApp;
  const existing = getApps();
  if (existing.length > 0) {
    cachedApp = existing[0];
    return cachedApp;
  }
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n');
  if (!projectId || !clientEmail || !privateKey) {
    throw new Error('Firebase Admin env variables missing (FIREBASE_PROJECT_ID / FIREBASE_CLIENT_EMAIL / FIREBASE_PRIVATE_KEY)');
  }
  cachedApp = initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
  });
  return cachedApp;
}

export function getDb() {
  return getFirestore(getAdminApp());
}

/* ============================================================
   ⚠️ ২টা আলাদা production bug, একই dependency-র কারণে — দুটোই মনে রাখুন:

   (১) firebase-admin v13+ legacy namespaced API সরিয়ে ফেলেছে. এই repo-র installed
       version-ে যাচাই করা: getApp().auth() → undefined, getApp().firestore() → undefined.
       তাই আগে যেমন `getAdminApp().auth().verifyIdToken(...)` লেখা হতো, সেটা TypeError
       দিত ("app.auth is not a function") → catch হয়ে null → প্রতিটা token-based endpoint
       401 "Login required" (proof submit, withdrawal, gift, deposit, register, activate,
       সব admin op). সবসময় getAuth(app) / getFirestore(app) ব্যবহার করুন. tests/mocks/
       firebase-admin-fake.mjs-ও এই surface-ই ফলো করে, তাই কেউ app.auth() লিখলে test
       immediately fail করবে.

   (২) v14-এ upgrade করা যাবে না — package.json-ের range (^13.10.0) সেটাই আটকায়.
       karon: v14-এর transitive dep jose@6 ESM-only (package.json-এ "type":"module",
       exports-এ "require" condition নেই). Vercel-এর Node builder আমাদের ESM api/*.js
       handler-কে CommonJS-এ compile করে node_modules externals রেখে `require()` করে;
       যেসব runtime-ে require(esm) নেই (Node < 20.19, < 22.12 — ধরা যাক Vercel "nodejs20")
       সেখানে function-এর ভেতরে ঢোকার আগেই module load fail:
         Error [ERR_REQUIRE_ESM]: require() of ES Module
           /var/task/node_modules/jose/dist/webapi/index.js not supported
       ফলাফল: ১০টা function-ই 500, `?op=nope` পর্যন্ত (Firebase ছুঁতে পারার আগেই crash),
       admin panel + site দুটোই "লগইন হারিয়ে গেছে" দেখাত. 2026-09-12-এ digitearn.vercel.app
       ঠিক এটাই চলছিল. এখনকার pin firebase-admin@13.10.0 (engines node>=18, jose@4 →
       exports-এ require condition আছে) — এই অবস্থায় CJS require নিরাপদ.
       Future-proofing: `npm test`-এর [N] section আসল installed tree-এর বিরুদ্ধে
       `node --no-experimental-require-module tests/fixtures/cjs-require-probe.cjs` চালায়,
       অর্থাৎ production-এর failure mode টা local-এ reproduce করে; major bump করলে
       সেটাই থামিয়ে দেবে. Vercel → Settings → Runtime → Node.js 22.x সেট করলে ঝুঁকি কমে,
       কিন্তু pin-টাই মূল সমাধান (build machine-ও একই Node version পায়).
   ============================================================ */
export function getAdminAuth() {
  return getAuth(getAdminApp());
}

/* deployed SDK identity — /api/admin/panel?op=health এটা দেখায়, কারণ "site ভাঙা" আর
   "ভুল firebase-admin deploy হয়েছে" বাইরে থেকে একই রকম লাগে. কোনো secret ধরে না. */
export const PINNED_FIREBASE_ADMIN_MAJOR = 13;
