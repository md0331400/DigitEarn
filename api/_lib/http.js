/* Shared helpers for API routes: token verification, JSON, validation.
   RULE: কখনোই client-supplied uid/amount/balance trust করবেন না —
   uid সবসময় verified Firebase ID token থেকে নেওয়া হয়, amount সবসময় Firestore-এর trusted doc থেকে। */
import { getAdminApp } from './firebase-admin.js';

export function sendJson(res, status, data) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(data));
}
export const ok = (res, data) => sendJson(res, 200, data);
export const fail = (res, status, error) => sendJson(res, status, { error: String(error) });

export async function readBody(req) {
  return new Promise((resolve) => {
    let raw = '';
    req.on('data', c => { raw += c; if (raw.length > 1e5) req.destroy(); });
    req.on('end', () => {
      if (!raw) return resolve({});
      try { resolve(JSON.parse(raw)); } catch (_) { resolve({}); }
    });
    req.on('error', () => resolve({}));
  });
}

/* Authorization: Bearer <Firebase ID Token> → verify → { uid, email } (null = unauthenticated) */
export async function verifyUser(req) {
  const h = req.headers.authorization || '';
  const token = h.startsWith('Bearer ') ? h.slice(7).trim() : '';
  if (!token) return null;
  try {
    const dec = await getAdminApp().auth().verifyIdToken(token);
    return { uid: dec.uid, email: dec.email || '' };
  } catch (_) {
    return null;
  }
}

/* Admin check: verified token + admins/{email} doc (server-side, Firestore rules bypass) */
export async function requireAdmin(req) {
  const u = await verifyUser(req);
  if (!u) return null;
  const { getDb } = await import('./firebase-admin.js');
  const snap = u.email ? await getDb().collection('admins').doc(u.email).get() : null;
  u.isAdmin = !!(snap && snap.exists);
  return u;
}

/* ---------- input validators ---------- */
export const isNonEmptyStr = (v, max = 200) => typeof v === 'string' && v.trim().length > 0 && v.trim().length <= max;
export const isMobile = v => typeof v === 'string' && /^01[3-9]\d{8}$/.test(v.trim());
export const isEmail = v => typeof v === 'string' && /^\S+@\S+\.\S+$/.test(v) && v.length <= 120;
export const isPosFinite = v => Number.isFinite(Number(v)) && Number(v) > 0;
export const isTaskSlug = v => typeof v === 'string' && /^[a-z0-9-]{2,50}$/.test(v);
