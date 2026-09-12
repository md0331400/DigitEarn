/* Firebase initialization. Keys come from Vercel / .env via VITE_ vars. */
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const env = import.meta.env;

export const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY || '',
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: env.VITE_FIREBASE_APP_ID || '',
};

export const firebaseReady = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);

/* ⚠️ বিল্ডে VITE_FIREBASE_* না থাকলে আগে শুধু চুপ করে "logged out" দেখাত (login পেজে
   bootAppPage-ও চলে না) — এখন এক লাইনে কারণ দেখায়। /version.json না থাকলে নীরব। */
if (!firebaseReady && typeof window !== 'undefined' && typeof document !== 'undefined') {
  queueMicrotask(async () => {
    try {
      const r = await fetch('/version.json', { cache: 'no-store' });
      if (!r.ok) return;
      const v = await r.json();
      if (!v || v.firebaseConfig !== false) return;
      if (document.getElementById('deployWarn')) return;
      const bar = document.createElement('div');
      bar.id = 'deployWarn';
      bar.style.cssText = 'background:#fee2e2;border-bottom:1px solid #dc2626;color:#7f1d1d;padding:9px 14px;font-size:12.5px;text-align:center';
      bar.innerHTML = '<b>এই বিল্ডে Firebase config নেই</b> — login/register/submit কাজ করবে না। '
        + 'Vercel → Settings → Environment Variables → VITE_FIREBASE_* (<b>Production</b>, Sensitive নয়) বসিয়ে Redeploy করুন।'
        + ` <span style="opacity:.7">(build: ${String(v.commit || v.buildId || '?')})</span>`;
      document.body.insertBefore(bar, document.body.firstChild);
    } catch (_) { /* diagnostic never breaks the app */ }
  });
}

let app = null;
if (firebaseReady) {
  app = initializeApp(firebaseConfig);
}
export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;

export function notConfiguredMsg() {
  return '⚠️ Firebase configure করা নেই — .env / Vercel environment variables-এ Firebase key বসান।';
}
