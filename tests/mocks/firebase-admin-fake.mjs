/* Fake Admin SDK: token→identity map + in-memory db (shared store).
   FAILURES/INIT_ERROR যোগ করা হয়েছে যাতে auth *ব্যর্থ* হওয়াটাও test করা যায়
   (সব failure আগের code-এ একই 401 "Login required" দিত — সেটাই bug ছিল)। */
import { makeDb } from './firestore-fake.mjs';

export const TOKENS = {
  TOKEN_ALICE: { uid: 'alice', email: 'alice@test.com' },
  TOKEN_BOB: { uid: 'bob', email: 'bob@test.com' },
  TOKEN_CAROL: { uid: 'carol', email: 'carol@test.com' },
  TOKEN_ADMIN: { uid: 'admin1', email: 'admin@digitearn.com' },
};

/* token string → throw করার error ({ code, message }) */
export const FAILURES = {};
export function setVerifyFailure(token, err) { FAILURES[token] = err; }
export function clearVerifyFailure(token) { delete FAILURES[token]; }
export function clearAllFailures() { for (const k of Object.keys(FAILURES)) delete FAILURES[k]; }

/* getAdminApp() নিজে throw করলে (env missing) সেটা ধরার জন্য */
export const state = { initError: null };
export function setInitFailure(msg) { state.initError = msg ? new Error(msg) : null; }

/* ⚠️ REAL firebase-admin v14 surface: the legacy namespaced API is GONE —
   `getApp().auth()` / `.firestore()` are `undefined` (verified against the installed
   pinned major (13.x today; 14.3.0 when this mock was written). The fake must NOT offer
   `app.auth()`, otherwise code that calls it
   looks fine in tests and throws `TypeError: app.auth is not a function` in production
   (that is exactly how every endpoint started answering "Login required").
   Auth access = getAuth(app) → our lib exports getAdminAuth(). */
const AUTH_SERVICE = {
  verifyIdToken: async (t) => {
    const f = FAILURES[t];
    if (f) {
      const e = new Error(f.message || f.code || 'verify failed');
      e.code = f.code;
      if (f.errorInfo) e.errorInfo = f.errorInfo;
      throw e;
    }
    const dec = TOKENS[t];
    if (!dec) {
      const e = new Error('Invalid Firebase ID Token (fake: unknown token)');
      e.code = 'auth/invalid-id-token';
      throw e;
    }
    return dec;
  },
};

export function getAdminApp() {
  if (state.initError) throw state.initError;
  // no .auth() / .firestore() on purpose — mirrors firebase-admin v14
  return { name: '[DEFAULT]', getAuth: undefined, auth: undefined };
}

export function getAuth(app = getAdminApp()) {   // eslint-disable-line no-unused-vars
  if (state.initError) throw state.initError;
  return AUTH_SERVICE;
}

/* our own wrapper (lib/firebase-admin.js) — handlers import this */
export function getAdminAuth() {
  return getAuth(getAdminApp());
}

export function getDb() {
  // real: getDb() = getFirestore(getAdminApp()) → init failure surfaces here too
  if (state.initError) throw state.initError;
  return makeDb();
}
