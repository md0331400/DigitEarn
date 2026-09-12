/* DigitEarn Admin — Firebase + API (admin rules-এর মাধ্যমে full access) */
import { initializeApp } from 'firebase/app';
import {
  getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged,
} from 'firebase/auth';
import {
  getFirestore, doc, getDoc, getDocs, collection, query, where, orderBy, limit,
  updateDoc, setDoc, deleteDoc, serverTimestamp,
} from 'firebase/firestore';

/* Config order:
   1. Android APK: window.DigitEarnBridge.getFirebaseConfig() — native bridge,
      synchronous, page load timing-এর উপর নির্ভর করে না (সবচেয়ে নির্ভরযোগ্য)
   2. window.__DIGITEARN_FB_CONFIG__ — evaluateJavascript injection (fallback)
   3. import.meta.env.VITE_* — web build (Vercel env vars)
   আগে শুধু (2) ছিল — WebView-তে onPageStarted injection না পৌঁছালে panel খালি
   config দিয়ে boot হয়ে "Firebase env variables set নেই" দেখাত। */
function readAppConfig() {
  try {
    const bridge = typeof window !== 'undefined' && window.DigitEarnBridge;
    if (bridge && typeof bridge.getFirebaseConfig === 'function') {
      const raw = String(bridge.getFirebaseConfig() || '');
      if (raw.length > 2) return JSON.parse(raw) || {};
    }
  } catch (_) {}
  return (typeof window !== 'undefined' && window.__DIGITEARN_FB_CONFIG__) || {};
}
const appCfg = readAppConfig();
const envCfg = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
const cfg = {
  apiKey: appCfg.apiKey || envCfg.apiKey || '',
  authDomain: appCfg.authDomain || envCfg.authDomain || '',
  projectId: appCfg.projectId || envCfg.projectId || '',
  storageBucket: appCfg.storageBucket || envCfg.storageBucket || '',
  messagingSenderId: appCfg.messagingSenderId || envCfg.messagingSenderId || '',
  appId: appCfg.appId || envCfg.appId || '',
};
export const firebaseReady = !!(cfg.apiKey && cfg.projectId && cfg.appId);

/* APK-তে (file:// origin) server API-তে absolute URL লাগে; web-এ same-origin।
   BUGFIX: আগে শুধু 'file:' দেখা হতো — WebView loadData/other shell origin
   (about:, content:, capacitor://) হলে relative URL fetch fail করত।
   এখন http/https ছাড়া যেকোনো origin-ই absolute base নেয়। */
const isWebOrigin = typeof location !== 'undefined' && /^https?:$/.test(location.protocol);
export const API_BASE = isWebOrigin ? '' : 'https://digitearn.vercel.app';

const app = initializeApp(cfg);
export const auth = getAuth(app);
export const db = getFirestore(app);

/* ---------- helpers ---------- */
export const fmt = n => '৳' + Number(n || 0).toLocaleString('en-BD', { maximumFractionDigits: 2 });
export const timeBn = ts => {
  const d = ts?.toDate ? ts.toDate() : (ts ? new Date(ts) : new Date(0));
  if (!d.getTime()) return '—';
  return d.toLocaleString('en-BD', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
};
export const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* ---------- secure API helper (admin) ----------
   NOTE: Vercel Hobby = max 12 function — sob /api/admin/<name> ekta single function-er
   /api/admin/panel?op=<name> -e map hoy (api/admin/panel.js router). Ei conversion ekhanei. */
export async function callApi(path, body = {}, method = 'POST') {
  if (!firebaseReady) throw new Error('Firebase configure করা নেই');
  let url = path;
  const m = String(path).match(/^\/api\/admin\/([a-z0-9-]+)/);
  if (m) url = '/api/admin/panel?op=' + encodeURIComponent(m[1]);
  const send = async (forceRefresh) => {
    const cu = auth.currentUser;
    if (!cu) throw new Error('Login required — আবার লগইন করুন');
    const resp = await fetch(API_BASE + url, {
      method,
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + (await cu.getIdToken(forceRefresh)) },
      body: method === 'GET' ? undefined : JSON.stringify(body),
    });
    /* text() আগে, তারপর parse — Vercel protection page / build error HTML এলে
       resp.json() ফেল করলে error message পুরোপুরি হারাত ("Operation fail হয়েছে") */
    let raw = '';
    try { raw = await resp.text(); } catch (_) {}
    let data = null;
    try { data = raw ? JSON.parse(raw) : {}; } catch (_) {}
    return { resp, data: data || {}, isJson: !!data };
  };
  let r = await send(false);
  /* ID token ~১ ঘণ্টা পর expire। APK দিন-তিনেক বন্ধ থাকলে admin-এর ক্যাশ করা token
     নিয়ে approve/reject চাপা হতো → server 401 → "Login required" (admin বারবার
     লগইন করত)। এখন force-refresh করে একবার retry হয়। */
  if (!r.resp.ok && (r.resp.status === 401 || r.data.sessionExpired === true)) r = await send(true);
  if (!r.resp.ok) {
    const d = r.data || {};
    if (d.protection || (d.error && typeof d.error === 'object' && String(d.error.code) === '401')) {
      throw new Error('Vercel Deployment Protection ব্লক করছে — এই deployment URL থেকে admin API চলে না। '
        + 'Production URL (digitearn.vercel.app) ব্যবহার করুন বা Vercel → Settings → Deployment Protection off করুন।');
    }
    const msg = typeof d.error === 'string' ? d.error : String((d.error && (d.error.message || d.error.code)) || d.message || '');
    throw new Error(msg || (r.isJson ? '' : `সার্ভার JSON দেয়নি (HTTP ${r.resp.status})`) || `Operation fail হয়েছে (${r.resp.status}) — আবার চেষ্টা করুন`);
  }
  return r.data;
}

/* ?op=health — কেন "Login required" আসছে (env/project mismatch নাকি token) তার
   server-side উত্তর; secret value আসে না, শুধু boolean + project id + error code। */
export async function checkHealth() {
  try {
    return await callApi('/api/admin/health', {});
  } catch (err) {
    const m = String((err && err.message) || err);
    /* router-এ ?op=health নেই মানে server এখনো পুরোনো build-এ চলছে — admin যেন
       "panel-এর বাটন নষ্ট" না ভাবে, সেটা স্পষ্ট বলা */
    if (/Unknown admin endpoint|404/i.test(m)) {
      throw new Error('সার্ভারের build পুরোনো — `?op=health` নেই, মানে নতুন api/ + lib/ এখনো deploy হয়নি। Push করে Vercel-এ Redeploy করুন।');
    }
    throw err;
  }
}

/* ---------- admin auth (server-side verify — client check নয়) ----------
   BUGFIX: আগে error হলে isAdminEmail() চুপচাপ `false` দিত → main.js admin-কে
   signOut করে "আপনার email admin list-এ নেই" দেখাত — অর্থাৎ server 503/নেটওয়ার্ক
   সমস্যা হলেও দোষ admin-এর account-এর উপর চাপত, আর কাজের session টাও নষ্ট হতো।
   এখন error আলাদা করে ফেরায় (main.js session রেখে retry দেখায়)। */
export async function adminVerify() {
  try {
    const data = await callApi('/api/admin/verify', {});
    return { isAdmin: !!data.isAdmin, authenticated: !!data.authenticated, authState: data.authState || '', error: '' };
  } catch (err) {
    return { isAdmin: false, authenticated: false, error: String((err && err.message) || 'Admin verify fail') };
  }
}
export async function isAdminEmail() {
  return (await adminVerify()).isAdmin;
}

/* ---------- server-routed read/write (rules-independent) ----------
   আগে panel browser থেকে সরাসরি Firestore পড়ত/লিখত → rules-এর isAdmin()
   (admins/<email> doc-id হুবহু মিলতে হয়) fail করলে Users/Deposits/Withdrawals/
   Submissions/Overview সব জায়গায় "Missing or insufficient permissions." আর
   Micro Jobs/Settings/Notice Save-ও ভাঙত। এখন সব ?op=read / ?op=write (Admin SDK,
   rules bypass) দিয়ে। নতুন Vercel function না — দুটোই api/admin/panel.js router-এর op। */
async function adminRead(what, extra = {}) {
  const d = await callApi('/api/admin/read', { what, ...extra });
  return Array.isArray(d.items) ? d.items : [];
}
async function adminReadOne(what, extra = {}) {
  const d = await callApi('/api/admin/read', { what, ...extra });
  return d && d.item ? d.item : null;
}
const adminWrite = (what, extra = {}) => callApi('/api/admin/write', { what, ...extra });

/* ---------- proofs ---------- */
export async function listProofs(status = 'pending', limitN = 100) {
  return adminRead('proofs', { status, limit: limitN });
}

export async function approveProof(proofId) {
  await callApi('/api/admin/proof-review', { proofId, action: 'approve' });
}

export async function rejectProof(proofId, note = '') {
  await callApi('/api/admin/proof-review', { proofId, action: 'reject', note });
}

/* ---------- deposits ---------- */
export async function listDeposits(status = 'pending', limitN = 100) {
  return adminRead('deposits', { status, limit: limitN });
}

export async function approveDeposit(depositId) {
  await callApi('/api/admin/deposit-review', { depositId, action: 'approve' });
}

export async function rejectDeposit(depositId, note = '') {
  await callApi('/api/admin/deposit-review', { depositId, action: 'reject', note });
}

/* ---------- users ---------- */
export async function listUsers(limitN = 300) {
  return adminRead('users', { limit: limitN });
}

export async function getUser(uid) {
  return await adminReadOne('user', { id: uid });
}

export async function getUserWithdrawals(uid, limitN = 20) {
  return adminRead('user-withdrawals', { uid, limit: limitN });
}

export async function getUserTransactions(uid, limitN = 25) {
  return adminRead('user-transactions', { uid, limit: limitN });
}

export async function setUserActive(uid, active) {
  await callApi('/api/admin/set-active', { uid, active });
}

/* ---------- tasks ---------- */
export async function listTasks() {
  return adminRead('tasks', { limit: 500 });   // server sort field অনুযায়ী সাজিয়ে দেয়
}

/* Firestore-এ tasks/{slug} doc নেই → user submit "Project পাওয়া যায়নি" খায়।
   এই call টা built-in list থেকে বাকি doc গুলো বানিয়ে দেয় (যা আগে থেকে আছে সেটা অক্ষত)। */
export async function seedTasks(slugs = []) {
  return await callApi('/api/admin/seed-tasks', { slugs });
}

export async function saveTask(slug, data) {
  // client-side pre-check (instant feedback); server (?op=write) আবার validate করে
  if (data.url && !/^https?:\/\/\S+$/i.test(data.url)) {
    throw new Error('Task URL শুধু http/https হতে পারে (javascript:/data: allowed না)');
  }
  return adminWrite('task', { slug, data });
}


/* ---------- settings ----------
   settings/site   → public (siteName, links, rates…)
   settings/secret → গোপন মান (giftCode) — user browser থেকে read blocked
   ⚠️ rules: `settings/secret` browser থেকে পড়া সবাই For বন্ধ (admin-ও) — তাই admin
   panel secret পড়ে/লিখে server endpoint (?op=secret, Admin SDK) দিয়ে। আগে সরাসরি
   getDoc() → permission-denied (চুপচাপ ধরা) → field খালি দেখাত → Save করলে
   giftCode:'' লিখে gift claim পুরো সাইটে ভেঙে দিত। */
const SECRET_KEYS = ['giftCode'];

export async function getSettings() {
  const [rawSite, secret] = await Promise.all([
    adminReadOne('settings').catch(() => null),
    // server থেকে পড়া (rules-bypass); API না চললে {} — কখনোই permission-denied ফেল করবে না
    callApi('/api/admin/secret', { get: true }).catch(() => ({})),
  ]);
  const base = { ...(rawSite || {}) };
  delete base.id;                      // server item-এ doc id থাকে, settings-এ লাগে না
  const sec = {};
  const secretLoaded = secret && typeof secret.giftCode === 'string';
  for (const k of SECRET_KEYS) if (typeof secret[k] === 'string') sec[k] = secret[k];
  // _secretLoaded=false মানে giftCode পড়া যায়নি (network/API issue) — তখন
  // field খালি দেখালে Save-এ কোড মুছে যাবে, তাই UI সেটা disable করে রাখে।
  return { ...base, ...sec, _secretLoaded: secretLoaded };
}

/* ---------- withdrawals (admin review) ---------- */
export async function listWithdrawals(status = 'pending', limitN = 100) {
  return adminRead('withdrawals', { status, limit: limitN });
}

export async function reviewWithdrawal(userId, id, action, note = '') {
  await callApi('/api/admin/withdrawal-review', { userId, id, action, note });
}

export async function saveSettings(data) {
  // গোপন key গুলো server endpoint দিয়ে (Admin SDK) — rules browser থেকে লেখা
  // allow করলেও পড়া বন্ধ, তাই read+write এক জায়গায় server-এই রাখা হয়েছে।
  // key না পাওয়া গেলে সেটা মোছে না (undefined → sendই হয় না)।
  const pub = { ...data };
  const secret = {};
  for (const k of SECRET_KEYS) {
    if (k in pub) { secret[k] = pub[k]; delete pub[k]; }
  }
  await adminWrite('settings', { data: pub });   // server allowlist (secret key ঢোকে না)
  const payload = { ...secret };
  // খালি giftCode = "পড়া যায়নি/ছোঁয়া হয়নি" হওয়ার সম্ভাবনা বেশি — মুছে ফেলা হবে না।
  // সত্যিই কোড বন্ধ করতে চাইলে panel-এর "Clear gift code" ব্যবহার করুন।
  for (const k of Object.keys(payload)) {
    if (String(payload[k]).trim() === '' && !payload.__clear) delete payload[k];
  }
  if (Object.keys(payload).length) {
    await callApi('/api/admin/secret', payload);
  }
}

/* giftCode সত্যিই বন্ধ করতে চাইলে (admin panel-এর "Clear" checkbox) */
export async function clearGiftCode() {
  await callApi('/api/admin/secret', { giftCode: '', __clear: true });
}

/* ---------- notices ----------
   notices/{id}             → all-user notice (public, legacy-compatible)
   users/{uid}/targetNotices/{id} → private user-specific warning/notice
   (rules: targeted শুধু owner + admin read; write শুধু admin) */
export async function listNotices() {
  // server sort field অনুযায়ী সাজায়; যে notice-এ `sort` নেই সেটাও থাকে (orderBy
  // করলে সেগুলো বাদ পড়ত)
  return adminRead('notices', { limit: 100 });
}

export async function addNotice({ title, body, type = 'notice', expiresAt = null }) {
  const clean = {
    title: String(title || '').trim().slice(0, 60),
    body: String(body || '').trim().slice(0, 300),
    type: type === 'warning' ? 'warning' : 'notice',
    targetType: 'all',
    enabled: true,
    sort: 10,
    createdAt: serverTimestamp(),
  };
  if (expiresAt) clean.expiresAt = expiresAt;
  // auto-id + Firestore Timestamp সব server-এ (?op=write) — আগে doc(db,'notices')
  //odd segment throw করত, এখন server-ই doc id বানায়
  return adminWrite('notice-add', clean);
}

export async function updateNotice(id, { title, body, enabled, sort, type, expiresAt }) {
  const upd = {
    title: String(title || '').trim().slice(0, 60),
    body: String(body || '').trim().slice(0, 300),
    enabled: !!enabled,
    sort: Number(sort) || 10,
  };
  if (type) upd.type = type === 'warning' ? 'warning' : 'notice';
  if (expiresAt) upd.expiresAt = expiresAt;
  return adminWrite('notice-update', { id, ...upd });
}

export async function deleteNotice(id) {
  return adminWrite('notice-delete', { id });
}

/* ---------- targeted notices (per-user, private) ---------- */
export async function listUserTargetNotices(uid) {
  return adminRead('user-target-notices', { uid, limit: 50 });
}

export async function addTargetedNotice(uid, { title, body, type = 'warning', expiresAt = null }) {
  const clean = {
    title: String(title || '').trim().slice(0, 60),
    body: String(body || '').trim().slice(0, 300),
    type: type === 'warning' ? 'warning' : 'notice',
    targetType: 'user',
    targetUserId: uid,
    enabled: true,
    sort: 10,
    createdAt: serverTimestamp(),
    createdBy: 'admin',
  };
  if (expiresAt) clean.expiresAt = expiresAt;
  // BUGFIX: doc(db,'users',uid,'targetNotices') = ৩টা segment (odd) → Firestore
  // throw: "Document references must have an even number of segments" → private
  // warning/notice পাঠানোই যেত না। subcollection ref দিয়ে auto-id doc লাগে।
  await setDoc(doc(collection(db, 'users', uid, 'targetNotices')), clean);
}

export async function updateTargetedNotice(uid, id, { enabled }) {
  await updateDoc(doc(db, 'users', uid, 'targetNotices', id), { enabled: !!enabled });
}

export async function deleteTargetedNotice(uid, id) {
  await deleteDoc(doc(db, 'users', uid, 'targetNotices', id));
}

/* global targeted list — browser rules-এ অন্য user-এর subcollection list করা যায় না,
   তাই server-side (Admin SDK) endpoint */
export async function listTargetedAll() {
  const data = await callApi('/api/admin/notice-targeted', {}, 'GET');
  return data.targeted || [];
}

/* ---------- overview ---------- */
export async function overviewStats() {
  const [users, pendingProofs, pendingDeposits] = await Promise.all([
    listUsers(1000),
    listProofs('pending', 100),
    listDeposits('pending', 100),
  ]);
  return {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.isActive).length,
    pendingProofs: pendingProofs.length,
    pendingDeposits: pendingDeposits.length,
    totalBalance: users.reduce((s, u) => s + (Number(u.balance) || 0), 0),
    recentProofs: pendingProofs.slice(0, 3),
    recentDeposits: pendingDeposits.slice(0, 3),
  };
}

export { onAuthStateChanged, signInWithEmailAndPassword, signOut };
