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

let app = null;
if (firebaseReady) {
  app = initializeApp(firebaseConfig);
}
export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;

export function notConfiguredMsg() {
  return '⚠️ Firebase configure করা নেই — .env / Vercel environment variables-এ Firebase key বসান।';
}
