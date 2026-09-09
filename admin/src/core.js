/* DigitEarn Admin — Firebase + API (admin rules-এর মাধ্যমে full access) */
import { initializeApp } from 'firebase/app';
import {
  getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged,
} from 'firebase/auth';
import {
  getFirestore, doc, getDoc, getDocs, collection, query, where, orderBy, limit,
  updateDoc, setDoc, deleteDoc, serverTimestamp,
} from 'firebase/firestore';

const cfg = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
export const firebaseReady = !!(cfg.apiKey && cfg.projectId && cfg.appId);

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

/* ---------- secure API helper (admin) ---------- */
export async function callApi(path, body = {}, method = 'POST') {
  if (!firebaseReady) throw new Error('Firebase configure করা নেই');
  const cu = auth.currentUser;
  if (!cu) throw new Error('Login required');
  const token = await cu.getIdToken();
  const resp = await fetch(path, {
    method,
    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
    body: method === 'GET' ? undefined : JSON.stringify(body),
  });
  let data = {};
  try { data = await resp.json(); } catch (_) {}
  if (!resp.ok) throw new Error(data.error || 'Operation fail হয়েছে — আবার চেষ্টা করুন');
  return data;
}

/* ---------- admin auth (server-side verify — client check নয়) ---------- */
export async function isAdminEmail() {
  try {
    const data = await callApi('/api/admin/verify', {});
    return !!data.isAdmin;
  } catch (_) { return false; }
}

/* ---------- proofs ---------- */
export async function listProofs(status = 'pending', limitN = 100) {
  // index-free: createdAt desc + client-side status filter (composite index লাগে না)
  const q = query(collection(db, 'proofs'), orderBy('createdAt', 'desc'), limit(limitN));
  const snap = await getDocs(q);
  const all = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  return status && status !== 'all' ? all.filter(p => p.status === status) : all;
}

export async function approveProof(proofId) {
  await callApi('/api/admin/proof-review', { proofId, action: 'approve' });
}

export async function rejectProof(proofId, note = '') {
  await callApi('/api/admin/proof-review', { proofId, action: 'reject', note });
}

/* ---------- deposits ---------- */
export async function listDeposits(status = 'pending', limitN = 100) {
  // index-free: createdAt desc + client-side status filter
  const q = query(collection(db, 'deposits'), orderBy('createdAt', 'desc'), limit(limitN));
  const snap = await getDocs(q);
  const all = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  return status && status !== 'all' ? all.filter(p => p.status === status) : all;
}

export async function approveDeposit(depositId) {
  await callApi('/api/admin/deposit-review', { depositId, action: 'approve' });
}

export async function rejectDeposit(depositId, note = '') {
  await callApi('/api/admin/deposit-review', { depositId, action: 'reject', note });
}

/* ---------- users ---------- */
export async function listUsers(limitN = 300) {
  const q = query(collection(db, 'users'), limit(limitN));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ uid: d.id, ...d.data() }));
}

export async function getUser(uid) {
  const s = await getDoc(doc(db, 'users', uid));
  return s.exists ? { uid, ...s.data() } : null;
}

export async function getUserWithdrawals(uid, limitN = 20) {
  const q = query(collection(db, 'users', uid, 'withdrawals'), orderBy('createdAt', 'desc'), limit(limitN));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function getUserTransactions(uid, limitN = 25) {
  const q = query(collection(db, 'users', uid, 'transactions'), orderBy('createdAt', 'desc'), limit(limitN));
  const snap = await getDocs(q);
  return snap.docs.map(d => d.data());
}

export async function setUserActive(uid, active) {
  await callApi('/api/admin/set-active', { uid, active });
}

/* ---------- tasks ---------- */
export async function listTasks() {
  const snap = await getDocs(collection(db, 'tasks'));
  const tasks = snap.docs.map(d => ({ slug: d.id, ...d.data() }));
  tasks.sort((a, b) => (Number(a.sort) || 99) - (Number(b.sort) || 99));
  return tasks;
}

export async function saveTask(slug, data) {
  // URL sanitize: শুধু http/https — javascript:/data:/vbscript: বন্ধ
  if (data.url && !/^https?:\/\/\S+$/i.test(data.url)) {
    throw new Error('Task URL শুধু http/https হতে পারে (javascript:/data: allowed না)');
  }
  const clean = { ...data, updatedAt: serverTimestamp() };
  if (Array.isArray(data.inputFields)) {
    clean.inputFields = data.inputFields
      .map(f => ({
        label: String(f.label || '').trim().slice(0, 50),
        type: ['text', 'email', 'password', 'tel', 'number', 'url'].includes(f.type) ? f.type : 'text',
        required: !!f.required,
      }))
      .filter(f => f.label);
    // duplicate label remove (field key = label)
    const seen = new Set();
    clean.inputFields = clean.inputFields.filter(f => (seen.has(f.label) ? false : (seen.add(f.label), true)));
  }
  await setDoc(doc(db, 'tasks', slug), clean, { merge: true });
}

/* ---------- settings ---------- */
export async function getSettings() {
  const s = await getDoc(doc(db, 'settings', 'site'));
  return s.exists ? s.data() : {};
}

/* ---------- withdrawals (admin review) ---------- */
export async function listWithdrawals(status = 'pending', limitN = 100) {
  const q = query(collection(db, 'withdrawals'), orderBy('createdAt', 'desc'), limit(limitN));
  const snap = await getDocs(q);
  const all = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  return status && status !== 'all' ? all.filter(w => w.status === status) : all;
}

export async function reviewWithdrawal(userId, id, action, note = '') {
  await callApi('/api/admin/withdrawal-review', { userId, id, action, note });
}

export async function saveSettings(data) {
  await setDoc(doc(db, 'settings', 'site'), data, { merge: true });
}

/* ---------- notices ----------
   notices/{id}             → all-user notice (public, legacy-compatible)
   users/{uid}/targetNotices/{id} → private user-specific warning/notice
   (rules: targeted শুধু owner + admin read; write শুধু admin) */
export async function listNotices() {
  const q = query(collection(db, 'notices'), orderBy('sort'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
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
  if (expiresAt) clean.expiresAt = expiresAt; // JS Date → Firestore Timestamp
  await setDoc(doc(db, 'notices'), clean);
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
  await updateDoc(doc(db, 'notices', id), upd);
}

export async function deleteNotice(id) {
  await deleteDoc(doc(db, 'notices', id));
}

/* ---------- targeted notices (per-user, private) ---------- */
export async function listUserTargetNotices(uid) {
  const snap = await getDocs(query(collection(db, 'users', uid, 'targetNotices'), limit(50)));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
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
  await setDoc(doc(db, 'users', uid, 'targetNotices'), clean);
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
