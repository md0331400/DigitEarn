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
/* Firebase Auth users (Admin SDK side) — Join admin approve/create flow এখানেই run হয়,
   তাই createUser/getUserByEmail/generatePasswordResetLink mock লাগে (real SDK-এর সেই surface)। */
export const AUTH_USERS = {};      /* email(lower) → { uid, email, displayName, hasPassword } */
export const RESET_LINKS = [];     /* generatePasswordResetLink call log */
let authSeq = 0;
export function resetAuthUsers() {
  for (const k of Object.keys(AUTH_USERS)) delete AUTH_USERS[k];
  RESET_LINKS.length = 0;
}
export function seedAuthUser(email, uid) {
  const k = String(email).toLowerCase();
  AUTH_USERS[k] = { uid: uid || ('fb_' + k.replace(/\W+/g, '_')), email: k, displayName: '', hasPassword: true };
  return AUTH_USERS[k];
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

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
  getUserByEmail: async (email) => {
    const u = AUTH_USERS[String(email || '').toLowerCase()];
    if (!u) { const e = new Error('There is no user record corresponding to this identifier.'); e.code = 'auth/user-not-found'; throw e; }
    return { uid: u.uid, email: u.email, displayName: u.displayName };
  },
  createUser: async (req) => {
    const email = String((req && req.email) || '').toLowerCase();
    if (!EMAIL_RE.test(email)) { const e = new Error('The email address is badly formatted.'); e.code = 'auth/invalid-email'; throw e; }
    if (AUTH_USERS[email]) { const e = new Error('The email address is already in use by another account.'); e.code = 'auth/email-already-in-use'; throw e; }
    const uid = (req.uid) || ('fb_' + email.replace(/\W+/g, '_') + '_' + (++authSeq));
    AUTH_USERS[email] = { uid, email, displayName: (req.displayName || ''), hasPassword: !!req.password };
    return { uid, email };
  },
  generatePasswordResetLink: async (email) => {
    const k = String(email || '').toLowerCase();
    if (!AUTH_USERS[k]) { const e = new Error('There is no user record corresponding to this identifier.'); e.code = 'auth/user-not-found'; throw e; }
    RESET_LINKS.push(k);
    return 'https://example.page.link/?link=https://app/authreset%3FoobCode=FAKE_' + k.replace(/\W+/g, '');
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
