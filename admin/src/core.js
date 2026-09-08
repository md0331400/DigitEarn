/* DigitEarn Admin — Firebase + API (admin rules-এর মাধ্যমে full access) */
import { initializeApp } from 'firebase/app';
import {
  getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged,
} from 'firebase/auth';
import {
  getFirestore, doc, getDoc, getDocs, collection, query, where, orderBy, limit,
  updateDoc, setDoc, deleteDoc, serverTimestamp, runTransaction,
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

/* ---------- admin auth ---------- */
export async function isAdminEmail(email) {
  if (!email) return false;
  try {
    const snap = await getDoc(doc(db, 'admins', email));
    return snap.exists();
  } catch (_) { return false; }
}

/* ---------- proofs ---------- */
export async function listProofs(status = 'pending', limitN = 100) {
  let q;
  if (status && status !== 'all') {
    q = query(collection(db, 'proofs'), where('status', '==', status), orderBy('createdAt', 'desc'), limit(limitN));
  } else {
    q = query(collection(db, 'proofs'), orderBy('createdAt', 'desc'), limit(limitN));
  }
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function approveProof(proofId) {
  const snap = await getDoc(doc(db, 'proofs', proofId));
  if (!snap.exists()) throw new Error('Proof পাওয়া যায়নি');
  const p = snap.data();
  if (p.status !== 'pending') throw new Error('এই proof-এর status আগেই পরিবর্তন হয়েছে');
  const uid = p.userId;
  const reward = Number(p.reward) || 0;
  await runTransaction(db, async tx => {
    const userRef = doc(db, 'users', uid);
    const uSnap = await tx.get(userRef);
    if (!uSnap.exists()) throw new Error('User পাওয়া যায়নি');
    const u = uSnap.data();
    tx.update(userRef, {
      balance: (Number(u.balance) || 0) + reward,
      totalEarned: (Number(u.totalEarned) || 0) + reward,
    });
    tx.set(doc(db, 'users', uid, 'transactions'), {
      amount: reward, type: 'task_reward', note: `টাস্ক: ${p.taskName || p.taskSlug}`, uid: 'admin', createdAt: serverTimestamp(),
    });
    tx.update(doc(db, 'proofs', proofId), { status: 'approved', note: '', reviewedAt: serverTimestamp() });
    tx.update(doc(db, 'users', uid, 'proofs', proofId), { status: 'approved', note: '', reviewedAt: serverTimestamp() });
  });
}

export async function rejectProof(proofId, note = '') {
  await runTransaction(db, async tx => {
    const snap = await tx.get(doc(db, 'proofs', proofId));
    if (!snap.exists()) throw new Error('Proof পাওয়া যায়নি');
    const p = snap.data();
    tx.update(doc(db, 'proofs', proofId), { status: 'rejected', note, reviewedAt: serverTimestamp() });
    tx.update(doc(db, 'users', p.userId, 'proofs', proofId), { status: 'rejected', note, reviewedAt: serverTimestamp() });
  });
}

/* ---------- deposits ---------- */
export async function listDeposits(status = 'pending', limitN = 100) {
  let q;
  if (status && status !== 'all') {
    q = query(collection(db, 'deposits'), where('status', '==', status), orderBy('createdAt', 'desc'), limit(limitN));
  } else {
    q = query(collection(db, 'deposits'), orderBy('createdAt', 'desc'), limit(limitN));
  }
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function approveDeposit(depositId) {
  const snap = await getDoc(doc(db, 'deposits', depositId));
  if (!snap.exists()) throw new Error('Deposit পাওয়া যায়নি');
  const d = snap.data();
  if (d.status !== 'pending') throw new Error('এই deposit-এর status আগেই পরিবর্তন হয়েছে');
  const uid = d.userId;
  const sSnap = await getDoc(doc(db, 'settings', 'site'));
  const bonus = Number(sSnap.exists() ? sSnap.data().activationBonus : 20) || 20;
  await runTransaction(db, async tx => {
    const userRef = doc(db, 'users', uid);
    const uSnap = await tx.get(userRef);
    if (!uSnap.exists()) throw new Error('User পাওয়া যায়নি');
    const u = uSnap.data();
    const alreadyGiven = !!u.activationBonusGiven;
    tx.update(userRef, {
      isActive: true,
      activationBonusGiven: true,
      balance: alreadyGiven ? (Number(u.balance) || 0) : (Number(u.balance) || 0) + bonus,
      totalEarned: alreadyGiven ? (Number(u.totalEarned) || 0) : (Number(u.totalEarned) || 0) + bonus,
    });
    if (!alreadyGiven) {
      tx.set(doc(db, 'users', uid, 'transactions'), {
        amount: bonus, type: 'activation_bonus', note: 'একাউন্ট অ্যাক্টিভেশন বোনাস', uid: 'admin', createdAt: serverTimestamp(),
      });
    }
    tx.update(doc(db, 'deposits', depositId), { status: 'approved', note: '', reviewedAt: serverTimestamp() });
    tx.update(doc(db, 'users', uid, 'deposits', depositId), { status: 'approved', note: '', reviewedAt: serverTimestamp() });
  });
}

export async function rejectDeposit(depositId, note = '') {
  await runTransaction(db, async tx => {
    const snap = await tx.get(doc(db, 'deposits', depositId));
    if (!snap.exists()) throw new Error('Deposit পাওয়া যায়নি');
    const d = snap.data();
    tx.update(doc(db, 'deposits', depositId), { status: 'rejected', note, reviewedAt: serverTimestamp() });
    tx.update(doc(db, 'users', d.userId, 'deposits', depositId), { status: 'rejected', note, reviewedAt: serverTimestamp() });
  });
}

/* ---------- users ---------- */
export async function listUsers(limitN = 300) {
  const q = query(collection(db, 'users'), limit(limitN));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ uid: d.id, ...d.data() }));
}

export async function getUser(uid) {
  const s = await getDoc(doc(db, 'users', uid));
  return s.exists() ? { uid, ...s.data() } : null;
}

export async function getUserTransactions(uid, limitN = 25) {
  const q = query(collection(db, 'users', uid, 'transactions'), orderBy('createdAt', 'desc'), limit(limitN));
  const snap = await getDocs(q);
  return snap.docs.map(d => d.data());
}

export async function setUserActive(uid, active) {
  await updateDoc(doc(db, 'users', uid), { isActive: active });
}

/* ---------- tasks ---------- */
export async function listTasks() {
  const snap = await getDocs(collection(db, 'tasks'));
  const tasks = snap.docs.map(d => ({ slug: d.id, ...d.data() }));
  tasks.sort((a, b) => (Number(a.sort) || 99) - (Number(b.sort) || 99));
  return tasks;
}

export async function saveTask(slug, data) {
  await setDoc(doc(db, 'tasks', slug), data, { merge: true });
}

/* ---------- settings ---------- */
export async function getSettings() {
  const s = await getDoc(doc(db, 'settings', 'site'));
  return s.exists() ? s.data() : {};
}

export async function saveSettings(data) {
  await setDoc(doc(db, 'settings', 'site'), data, { merge: true });
}

/* ---------- notices ---------- */
export async function listNotices() {
  const q = query(collection(db, 'notices'), orderBy('sort'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function addNotice({ title, body, sort = 10 }) {
  await setDoc(doc(db, 'notices'), { title, body, enabled: true, sort: Number(sort) || 10, createdAt: serverTimestamp() });
}

export async function updateNotice(id, { title, body, enabled, sort }) {
  await updateDoc(doc(db, 'notices', id), { title, body, enabled, sort: Number(sort) || 10 });
}

export async function deleteNotice(id) {
  await deleteDoc(doc(db, 'notices', id));
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
