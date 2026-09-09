/* User site Firebase + secure API client.
   Financial operations (balance/totalEarned/transactions/claims/withdraw/deposit)
   এখন সব Vercel serverless API-তে (Firebase Admin SDK) — browser সরাসরি financial doc লেখে না। */
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  signOut,
} from 'firebase/auth';
import {
  doc, getDoc, updateDoc, collection, query, where, orderBy, limit, getDocs,
} from 'firebase/firestore';
import { auth, db, firebaseReady } from './firebase.js';
import { getSettings } from './store.js';

export function friendlyError(err) {
  const map = {
    'auth/email-already-in-use': 'এই ইমেইলে আগেই আইডি আছে — লগইন করুন',
    // generic — email আছে/নেই যাচাই করা হয় না (enumeration রোধ)
    'auth/invalid-credential': 'ইমেইল বা পাসওয়ার্ড সঠিক নয়',
    'auth/wrong-password': 'ইমেইল বা পাসওয়ার্ড সঠিক নয়',
    'auth/user-not-found': 'ইমেইল বা পাসওয়ার্ড সঠিক নয়',
    'auth/weak-password': 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে',
    'auth/invalid-email': 'সঠিক ইমেইল লিখুন',
    'auth/too-many-requests': 'অনেকবার চেষ্টা হয়েছে — পরে আবার চেষ্টা করুন',
    'permission-denied': 'অনুমতি নেই — আবার চেষ্টা করুন',
    'unavailable': 'সার্ভারের সাথে কানেকশন সমস্যা — আবার চেষ্টা করুন',
    'failed-firebase-check': 'Firebase key সঠিক নয় — .env / Vercel variables চেক করুন',
  };
  if (map[err.code]) return map[err.code];
  return 'কিছু একটা সমস্যা হয়েছে — আবার চেষ্টা করুন';
}

export function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/* ---------- secure API helper ----------
   Verified Firebase ID token পাঠায়; uid/amount/balance client থেকে কখনো পাঠায় না
   (যেখানে লাগে শুধু identifier — taskSlug/code/method/amount-input — server validate করে) */
export async function callApi(path, body = {}, method = 'POST', { anonymous = false } = {}) {
  if (!firebaseReady) throw new Error('Firebase configure করা নেই');
  const headers = { 'Content-Type': 'application/json' };
  if (!anonymous) {
    const cu = auth.currentUser;
    if (!cu) throw new Error('Login required');
    headers.Authorization = 'Bearer ' + (await cu.getIdToken());
  }
  const resp = await fetch(path, {
    method,
    headers,
    body: method === 'GET' ? undefined : JSON.stringify(body),
  });
  let data = {};
  try { data = await resp.json(); } catch (_) {}
  if (!resp.ok) throw new Error(data.error || ('Server error (' + resp.status + ') — আবার চেষ্টা করুন'));
  return data;
}

/* ---------- auth ---------- */

/* Register: auth user client-এ, তারপর server-এ user doc + bonus + referral (atomic).
   Ref code server-ই validate করে — invalid হলে error throw (profile-less orphan রোধের
   জন্য client আগেই pre-check করে, server fail-closed)। */
export async function registerUser({ name, mobile, email, password, refCodeInput }) {
  if (!firebaseReady) throw new Error('Firebase configure করা নেই');
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await callApi('/api/user/register', { name, mobile, email, refCode: refCodeInput || '' });
  return cred.user.uid;
}

/* Login/session restore-এ profile না থাকলে server-side heal (বোনাস ছাড়া) */
export async function ensureUserProfile(uid, { email = '', name = '' } = {}) {
  if (!firebaseReady) return null;
  try {
    const data = await callApi('/api/user/ensure', { email, name });
    return data.profile;
  } catch (_) {
    return null;
  }
}

export async function loginUser(email, password, keepLoggedIn = true) {
  if (!firebaseReady) throw new Error('Firebase configure করা নেই');
  // KEEP ME LOGGED IN: টিক থাকলে session browser বন্ধ করলেও থাকবে; না থাকলে clear
  const { browserLocalPersistence, browserSessionPersistence, setPersistence } = await import('firebase/auth');
  await setPersistence(auth, keepLoggedIn ? browserLocalPersistence : browserSessionPersistence);
  const cred = await signInWithEmailAndPassword(auth, email, password);
  await ensureUserProfile(cred.user.uid, { email, name: cred.user.displayName });
  return cred.user.uid;
}

/* ---------- financial operations → secure API ---------- */

export async function activateAccount(uid) {
  return callApi('/api/account/activate');
}

export async function claimTask(uid, taskSlug) {
  const data = await callApi('/api/task/claim', { taskSlug });
  return data.reward;
}

export async function claimGift(uid, code) {
  const data = await callApi('/api/gift/claim', { code });
  return data.reward;
}

export async function claimTarget(uid, tier) {
  const data = await callApi('/api/target/claim', { tier });
  return data.bonus;
}

export async function submitProof(uid, { taskSlug, data } = {}) {
  // data = { fieldLabel: value } — server task config অনুযায়ী validate করে
  const r = await callApi('/api/proof/submit', { taskSlug, data: data || {} });
  return r.id;
}

export async function submitDeposit(uid, { method, trxId, senderNumber } = {}) {
  const data = await callApi('/api/deposit/submit', { method, trxId, senderNumber });
  return data.id;
}

export async function requestWithdrawal(uid, { amount, method, accountNumber, name } = {}) {
  await callApi('/api/withdrawal/request', { amount, method, accountNumber, name });
}

/* ---------- profile (safe field only) ---------- */

export async function updateProfileName(uid, name) {
  await updateDoc(doc(db, 'users', uid), { name: String(name).slice(0, 50) });
}

export async function forgotPassword(email) {
  if (!firebaseReady) throw new Error('Firebase configure করা নেই');
  await sendPasswordResetEmail(auth, email);
}

export async function logout() {
  if (auth) await signOut(auth);
}

export async function changePassword(currentPw, newPw) {
  if (!firebaseReady) throw new Error('Firebase configure করা নেই');
  const user = auth.currentUser;
  const emailCred = EmailAuthProvider.credential(user.email, currentPw);
  await reauthenticateWithCredential(user, emailCred);
  await updatePassword(user, newPw);
}

/* ---------- tasks (read) ---------- */

export async function getTasks() {
  if (!firebaseReady) return [];
  // index-free: sort client-side (task count কম, কোনো composite index লাগে না)
  const snap = await getDocs(query(collection(db, 'tasks'), limit(100)));
  return snap.docs
    .map(d => ({ id: d.id, ...d.data() }))
    .filter(t => t.enabled !== false)
    .sort((a, b) => (Number(a.sort) || 99) - (Number(b.sort) || 99));
}

export async function getTaskBySlug(slug) {
  if (!firebaseReady) return null;
  const snap = await getDoc(doc(db, 'tasks', slug));
  return snap.exists ? { id: snap.id, ...snap.data() } : null;
}

export async function hasClaimedToday(uid, taskSlug) {
  const snap = await getDoc(doc(db, 'users', uid, 'taskClaims', `${taskSlug}_${todayStr()}`));
  return snap.exists;
}

/* ---------- gift / target (read) ---------- */

export async function hasGiftClaimedToday(uid) {
  const snap = await getDoc(doc(db, 'users', uid, 'giftClaims', todayStr()));
  return snap.exists;
}

export async function hasTargetClaimed(uid, tier) {
  const snap = await getDoc(doc(db, 'users', uid, 'targetClaims', String(tier)));
  return snap.exists;
}

export async function teamCounts(uid) {
  if (!firebaseReady) return [0, 0, 0, 0];
  const counts = [0, 0, 0, 0];
  let frontier = [uid];
  for (let lvl = 1; lvl <= 4 && frontier.length; lvl++) {
    if (frontier.length > 500) break;
    const next = [];
    for (const parentId of frontier) {
      try {
        const snap = await getDocs(query(collection(db, 'users', parentId, 'team'), limit(500)));
        next.push(...snap.docs.map(d => d.id));
      } catch (_) {}
    }
    counts[lvl - 1] = next.length;
    frontier = next;
  }
  return counts;
}

/* ---------- proof (read) ---------- */

export async function getTodayProof(uid, taskSlug) {
  if (!firebaseReady) return null;
  // single-field query (day) + code filter — composite index লাগে না
  const day = todayStr();
  const q = query(collection(db, 'users', uid, 'proofs'), where('day', '==', day), limit(20));
  const snap = await getDocs(q);
  const d = snap.docs.find(x => x.data().taskSlug === taskSlug);
  if (!d) return null;
  return { id: d.id, ...d.data() };
}

export async function getMyProofs(uid, limitN = 30) {
  if (!firebaseReady) return [];
  const q = query(collection(db, 'users', uid, 'proofs'), orderBy('createdAt', 'desc'), limit(limitN));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

/* ---------- deposit (read) ---------- */

export async function getPendingDeposit(uid) {
  if (!firebaseReady) return null;
  const q = query(collection(db, 'users', uid, 'deposits'), where('status', '==', 'pending'), limit(1));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { id: d.id, ...d.data() };
}

export async function getLastDeposit(uid) {
  if (!firebaseReady) return null;
  const q = query(collection(db, 'users', uid, 'deposits'), orderBy('createdAt', 'desc'), limit(1));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { id: d.id, ...d.data() };
}

/* ---------- withdrawals / transactions / team (read) ---------- */

export async function getReferralIncome(uid) {
  if (!firebaseReady) return 0;
  const q = query(collection(db, 'users', uid, 'transactions'), where('type', '==', 'referral_bonus'), limit(1000));
  const snap = await getDocs(q);
  return snap.docs.reduce((a, d) => a + (Number(d.data().amount) || 0), 0);
}

export async function getMyWithdrawals(uid, limitN = 50) {
  if (!firebaseReady) return [];
  const q = query(collection(db, 'users', uid, 'withdrawals'), orderBy('createdAt', 'desc'), limit(limitN));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function getMyTransactions(uid, limitN = 30) {
  if (!firebaseReady) return [];
  const q = query(collection(db, 'users', uid, 'transactions'), orderBy('createdAt', 'desc'), limit(limitN));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function getDirectTeam(uid) {
  if (!firebaseReady) return [];
  const q = query(collection(db, 'users', uid, 'team'), orderBy('createdAt', 'desc'), limit(200));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ uid: d.id, ...d.data() }));
}

/* ---------- misc (read) ---------- */

/* Notice visibility (privacy):
   - notices/{id}            → all-user notices (সাধারণ সকলের জন্য)
   - users/{uid}/targetNotices/{id} → শুধু সেই user-এর private warning/notice
   দুটোই শুধু enabled + (expiresAt থাকলে) expiry-এর পর দেখাবে। */
function noticeExpired(n) {
  const e = n.expiresAt;
  if (!e) return false;
  const d = e.toDate ? e.toDate() : new Date(e);
  return !isNaN(d) && d < new Date();
}
function noticeOut(d) {
  const n = d.data();
  if (!n.enabled) return null;
  if (noticeExpired(n)) return null;
  return { ...n, text: n.body || n.text || '' };
}

export async function getNotices(uid) {
  if (!firebaseReady) return [];
  const out = [];
  try {
    const a = await getDocs(query(collection(db, 'notices'), limit(50)));
    a.docs.forEach(d => { const n = noticeOut(d); if (n) out.push({ ...n, targeted: false }); });
  } catch (_) {}
  if (uid) {
    try {
      const t = await getDocs(query(collection(db, 'users', uid, 'targetNotices'), limit(20)));
      t.docs.forEach(d => { const n = noticeOut(d); if (n) out.push({ ...n, targeted: true }); });
    } catch (_) {}
  }
  out.sort((a, b) => (Number(a.sort) || 99) - (Number(b.sort) || 99));
  return out;
}
