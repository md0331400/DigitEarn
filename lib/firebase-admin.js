/* Firebase Admin SDK — server-side only (Vercel function-এর ভেতর).
   Browser-এ কখনো load হয় না। Env vars: FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY
   (Vercel → Settings → Environment Variables; private key-এর \n escaped থাকলে নিচে fix করা আছে) */
import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

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
