/* Seeds Firebase Firestore with tasks, settings & notices.
   Run:  npm run seed   (needs .env with your Firebase keys)
   Safe to re-run — it only creates docs that don't exist yet. */
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// load .env manually (no dotenv dependency)
const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const envPath = path.join(rootDir, '.env');
const env = {};
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}

const apiKey = env.VITE_FIREBASE_API_KEY || process.env.VITE_FIREBASE_API_KEY;
if (!apiKey) {
  console.error('❌ .env-এ VITE_FIREBASE_API_KEY পাওয়া যায়নি। .env.example কপি করে .env বানিয়ে Firebase key বসান, তারপর আবার চালাক।');
  process.exit(1);
}

const { initializeApp } = await import('firebase/app');
const { getFirestore, doc, setDoc, getDoc, collection, query, where, getDocs } = await import('firebase/firestore');

const app = initializeApp({
  apiKey,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID || process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID || process.env.VITE_FIREBASE_APP_ID,
});
const db = getFirestore(app);

const { TASKS, SITE } = await import('../src/tasks-data.js');

const settings = {
  siteName: SITE.name,
  siteStart: '2026-04-29',
  footerText: 'POWERED BY DIGITEARN',
  videoUrl: '',
  telegramLink: 'https://t.me/digitearnbd',
  facebookLink: 'https://facebook.com/digitearnbd',
  youtubeLink: 'https://youtube.com/@digitearnbd',
  activationLink: 'https://t.me/digitearnbd',
  admin1Name: 'এডমিন ১',
  admin1Link: 'https://t.me/digitearnbd',
  admin2Name: 'এডমিন ২',
  admin2Link: 'https://t.me/digitearnbd',
  registerBonus: 10,
  activationBonus: 20,
  referralBonus: 5,
  minWithdraw: 100,
  giftCode: 'DIGIEARN01',
  giftReward: 5,
  targetTiers: [
    { tier: 5, bonus: 50 },
    { tier: 10, bonus: 100 },
    { tier: 20, bonus: 300 },
  ],
};

const existingSettings = await getDoc(doc(db, 'settings', 'site'));
if (existingSettings.exists()) {
  console.log('⚠️ settings/site আগে থেকেই আছে — skip করছি (চাইলে Firestore Console থেকে নিজে এডিট করুন)।');
} else {
  await setDoc(doc(db, 'settings', 'site'), settings);
  console.log('✅ settings/site created');
}

let created = 0;
for (const t of TASKS) {
  const ref = doc(db, 'tasks', t.slug);
  const snap = await getDoc(ref);
  if (snap.exists()) continue;
  await setDoc(ref, {
    slug: t.slug,
    nameBn: t.nameBn,
    nameEn: t.nameEn,
    icon: t.icon,
    color: t.color,
    reward: t.reward,
    url: t.url,
    locked: t.locked,
    enabled: true,
    sort: t.sort,
    steps: t.steps,
  });
  created++;
}
console.log(`✅ tasks: ${created} created, ${TASKS.length - created} already existed`);

const notices = [
  'গিফট কোড বোনাস পেতে আমাদের টেলিগ্রাম চ্যানেলে জয়েন করুন',
  'নতুন আইডি রেজিস্টার করলে সাথে সাথে ৳১০ বোনাস!',
];
for (let i = 0; i < notices.length; i++) {
  const ref = doc(db, 'notices', `n${i + 1}`);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    await setDoc(ref, { text: notices[i], enabled: true, sort: i + 1 });
  }
}
console.log('✅ notices ensured');
console.log('🎉 Seed সম্পন্ন! এখন সাইট চালু করলে সব ডাটা লোড হবে।');
