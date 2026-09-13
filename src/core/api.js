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

/* Day key (yyyy-mm-dd) — ⚠️ UTC, কারণ server-ও UTC day key লেখে (Vercel TZ=UTC):
   api/gift/claim.js এবং api/proof/submit.js। আগে এটা browser-এর local date ছিল,
   তাই বাংলাদেশের (UTC+6) user-এর কাছে রাত ১২টা–সকাল ৬টার মধ্যে দুটো key আলাদা
   হতো → "গিফট আগেই claim করেছেন"/"আজকের জমা" লিস্ট ভুল, daily-limit count মিলত না।
   দুই পাশেই একই key = দুই পাশের result একই। */
export function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

/* ---------- secure API helper ----------
   Verified Firebase ID token পাঠায়; uid/amount/balance client থেকে কখনো পাঠায় না
   (যেখানে লাগে শুধু identifier — taskSlug/code/method/amount-input — server validate করে) */
export async function callApi(path, body = {}, method = 'POST', { anonymous = false } = {}) {
  if (!firebaseReady) throw new Error('Firebase configure করা নেই');
  const send = async (forceRefresh) => {
    const headers = { 'Content-Type': 'application/json' };
    if (!anonymous) {
      const cu = auth.currentUser;
      if (!cu) throw new Error('Login required — আগে লগইন করুন');
      const tok = await cu.getIdToken(forceRefresh);
      /* খালি token হলে 'Bearer undefined' পাঠানো মানে server-এ "Login required" —
         কারণটা এখানেই বলানো ভালো (Firebase config/projectId ভুল হলে এমন হয়) */
      if (!tok || typeof tok !== 'string') {
        throw new Error('Firebase token পাওয়া যায়নি — একবার লগআউট করে আবার লগইন করুন; বারবার হলে admin-কে জানান (Firebase config দেখা দরকার)');
      }
      headers.Authorization = 'Bearer ' + tok;
    }
    const resp = await fetch(path, {
      method,
      headers,
      body: method === 'GET' ? undefined : JSON.stringify(body),
    });
    /* resp.json() instead of text() would hide non-JSON failures (Vercel protection
       page / build error HTML) as a blank error — তা আগে text, তারপর parse */
    let raw = '';
    try { raw = await resp.text(); } catch (_) {}
    let data = null;
    try { data = raw ? JSON.parse(raw) : {}; } catch (_) {}
    /* x-vercel-error: Vercel edge-এর নিজের error header — function load-ই fail করলে
       (FUNCTION_INVOCATION_FAILED) আমাদের কোনো JSON-ই আসে না; কারণটা এখান থেকেই বোঝা যায় */
    const vercelError = (resp.headers && resp.headers.get('x-vercel-error')) || '';
    return { resp, data: data || {}, isJson: !!data, serverApi: (resp.headers && resp.headers.get('x-digitearn-api')) || '', vercelError };
  };
  let r = await send(false);
  /* ID token ~১ ঘণ্টা পর expire — long-idle tab/app-এর পুরোনো token নিয়ে submit করলে
     server 401 দিত; এখন force-refresh করে একবারই retry হয় (আবার লগইন লাগে না)।
     NOTE: এবারের "Login required" report-এর আসল কারণটা আরও গভীর ছিল — server-এর
     `app.auth()` (firebase-admin v14-তে নেই) → সব request 401; সেটা lib/http.js-তে ঠিক
     করা, আর নিচের apiErrorMessage এখন সেই ধরনের server-side failure আলাদা করে দেখায়। */
  if (!anonymous && shouldRetryWithFreshToken(r.resp.status, r.data, auth.currentUser)) {
    r = await send(true);
  }
  if (!r.resp.ok) {
    throw new Error(apiErrorMessage(r.resp.status, r.data, { json: r.isJson, serverApi: r.serverApi, vercelError: r.vercelError }));
  }
  return r.data;
}

/* 401 (বা server-এর sessionExpired flag) + এখনো currentUser থাকলে → refresh করে retry।
   আলাদা ফাংশন করা হয়েছে যাতে test-এ ধরা যায়। */
export function shouldRetryWithFreshToken(status, data, currentUser) {
  if (!currentUser) return false;
  if (data && data.sessionExpired === true) return true;
  return status === 401;
}

/* server-এর message-কে user-বোধগম্য করা (lib/http.js authReject-এর reason অনুযায়ী)।
   data.error string না object-ও হতে পারে (Vercel নিজে `{"error":{"code":"401",...}}` দেয়) —
   আগে String(obj) → "[object Object]" দেখাত, সেটাও এখানে ঠিক। */
export function apiErrorMessage(status, data = {}, opts = {}) {
  const { json = true, serverApi = '', vercelError = '' } = opts;
  const d = data && typeof data === 'object' ? data : {};
  /* Serverless function load-ই fail (Vercel: 500 FUNCTION_INVOCATION_FAILED, body শুধু
     "A server error has occurred") — এটা user-এর ভুল না, deploy/dependency/Node-version
     সমস্যা; স্পষ্ট না বললে user বারবার login/refresh করতে থাকত (আগে ঠিক তাই হচ্ছিল)। */
  if (status >= 500 && /FUNCTION_INVOCATION_FAILED|DEPLOYMENT_NOT_FOUND|NO_BUILDER|MISSING_FILE/i.test(String(vercelError || ''))
      && !serverApi) {
    return 'সার্ভারের function চালু হচ্ছে না (' + vercelError + ') — এটা আপনার ভুল না। '
      + 'Admin-কে জানান: Vercel → Deployments → এই deploy → Functions/Runtime log দেখুন '
      + '(সাধারণত Node version বা dependency)। verify: `curl -i -X POST /api/user/check`-এ '
      + '`x-digitearn-api: v3` header থাকা কথা, আর site-এর /version.json মিলিয়ে দেখুন।';
  }
  /* Vercel Deployment Protection: function-এর আগেই 401 — preview URL/APK থেকে API চলে না */
  if (d.protection || (d.error && typeof d.error === 'object' && String(d.error.code) === '401')) {
    return 'সার্ভার Vercel Deployment Protection-এ ঢাকা — এই URL থেকে API call করা যায় না। '
      + 'Production URL (digitearn.vercel.app) ব্যবহার করুন, নয়তো Vercel → Settings → '
      + 'Deployment Protection → “Protected Deployment URLs” off করুন (না করলে Vercel-এ লগইন করা ব্রাউজারে চালান)।';
  }
  if (!json) return `সার্ভার JSON দেয়নি (HTTP ${status}) — deploy/build ঠিক আছে কিনা দেখুন`;
  const msg = typeof d.error === 'string' ? d.error : String((d.error && (d.error.message || d.error.code)) || d.message || '');
  if (status === 503 || /configuration|verify করতে পারছে/i.test(msg)) {
    return 'সার্ভার সেটআপ ঠিক নেই — API token verify হচ্ছে না, admin-কে জানান' + (msg ? ` (${msg})` : '');
  }
  /* serverApi খালি মানে এই response আমাদের নতুন api/ code-এর না (lib/http.js API_VERSION
     header পাঠায়) → পুরোনো/অসম্পূর্ণ deploy */
  const stale = (status === 401 || status === 403) && !serverApi
    ? ' (সার্ভারের build পুরোনো মনে হচ্ছে — api/ + lib/ ফাইলগুলো deploy হয়েছে কিনা Vercel-এ দেখুন)'
    : '';
  if (status === 401) return 'লগইন হারিয়ে গেছে — একবার refresh করে আবার চেষ্টা করুন' + (msg ? ` (${msg})` : '') + stale;
  return msg || `Server error (${status}) — আবার চেষ্টা করুন`;
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
  const r = await ensureUserProfileResult(uid, { email, name });
  return r.profile;
}

/* ⚠️ আগের version error চুপচাপ `null` দিত → UI শুধু "প্রোফাইল লোড হয়নি" দেখাত, আর
   আসল কারণ (server-এর app.auth break / 401 / নেটওয়ার্ক) কোথাও বের হতো না।
   এখন reason সহ ফেরায় — bootAppPage সেটাই user-কে দেখায়। */
export async function ensureUserProfileResult(uid, { email = '', name = '' } = {}) {
  if (!firebaseReady) return { profile: null, error: 'Firebase configure করা নেই' };
  try {
    const data = await callApi('/api/user/ensure', { email, name });
    return { profile: data && data.profile ? data.profile : null, error: '' };
  } catch (err) {
    return { profile: null, error: String((err && err.message) || err) };
  }
}

/* ---------- deploy self-check ----------
   একটা token-free endpoint হিট করে response header দেখে: server-এ আসলেই নতুন
   api/ code চলছে কি না (lib/http.js-এর API_VERSION = EXPECTED_API_BUILD হতে হবে)।
   Vercel কখনো client বান্ডেল নতুন করে আর functions cache রেখে দেয় — তখন user
   ভাবে "fix কাজ করেনি"। এই check সেটা ১ সেকেন্ডে বলে দেয়। */
export const EXPECTED_API_BUILD = 'v3';

export async function checkApiBuild() {
  try {
    /* দুটো একসাথে: (১) function live + version header, (২) deployed static build identity
       (/version.json — scripts/gen-task-pages.mjs বিল্ডের সময় লেখে) */
    const [resp, site] = await Promise.all([
      fetch('/api/user/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '{}',
      }),
      fetch('/version.json', { cache: 'no-store' })
        .then(r => (r.ok ? r.json().catch(() => null) : null))
        .catch(() => null),
    ]);
    const version = (resp.headers && resp.headers.get('x-digitearn-api')) || '';
    const vercelError = (resp.headers && resp.headers.get('x-vercel-error')) || '';
    const crash = resp.status >= 500 && !version && /FUNCTION_INVOCATION_FAILED|DEPLOYMENT_NOT_FOUND|MISSING_FILE/i.test(vercelError + '');
    return {
      ok: version === EXPECTED_API_BUILD,
      version,
      status: resp.status,
      /* 401 + header নেই → Vercel Deployment Protection (preview URL / WebView) */
      blocked: !version && resp.status === 401,
      crash,
      vercelError,
      site,                                  // { api, commit, buildId, firebaseConfig, … }
      /* এই বিল্ডে Firebase web config বসেনি → login/submit অকার্যকর (vite warning-এও বলে) */
      noFirebase: !!(site && site.firebaseConfig === false),
      expected: EXPECTED_API_BUILD,
    };
  } catch (_) {
    return { ok: false, version: '', status: 0, blocked: false, crash: false, site: null, noFirebase: false };
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

/* NOTE: direct task-claim আর নেই — marketplace model-এ টাকা শুধু admin approve-এ
   যোগ হয় (api/proof/submit → admin proof-review)। আগে এখানে /api/task/claim কল হতো
   যে endpoint কখনো তৈরিই হয়নি (404)। ভুল করে কেউ ব্যবহার করলে যাতে বোঝে: */
export async function claimTask() {
  throw new Error('Direct claim বন্ধ — account submit করুন, admin approve করলেই টাকা যোগ হবে');
}

export async function claimGift(uid, code) {
  const data = await callApi('/api/gift/claim', { code });
  return data.reward;
}

export async function claimTarget(uid, tier) {
  const data = await callApi('/api/target/claim', { tier });
  return data.bonus;
}

/* Account sale submit — data = { fieldLabel: value }; server task config অনুযায়ী validate করে,
   duplicate account guard + daily limit সবই server-side। */
export async function submitProof(uid, { taskSlug, data } = {}) {
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

/* দুইটা আলাদা সিস্টেম, একই `tasks` collection-এ `kind` field দিয়ে আলাদা করা
   (নতুন collection = নতুন Firestore rules publish লাগত — owner সেটা করে না, তাই
   আগের rules-এই চলে): kind==='microjob' = MicroJobs, বাকি সব = পুরোনো টাস্ক। */
async function readTaskDocs() {
  if (!firebaseReady) return [];
  // index-free: sort client-side (task count কম, কোনো composite index লাগে না)
  const snap = await getDocs(query(collection(db, 'tasks'), limit(200)));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function getTasks() {
  const { isMicrojobDoc, isRetiredTask } = await import('./microjobs.js');
  const all = await readTaskDocs();
  return all
    .filter(t => !isMicrojobDoc(t) && !isRetiredTask(t) && t.enabled !== false)
    .sort((a, b) => (Number(a.sort) || 99) - (Number(b.sort) || 99));
}

/** MicroJobs page-এর data source: শুধু admin-এর বানানো microjob doc (hardcode নেই) */
export async function getMicrojobTasks() {
  const { isMicrojobDoc } = await import('./microjobs.js');
  const all = await readTaskDocs();
  return all
    .filter(t => isMicrojobDoc(t))
    .sort((a, b) => (Number(a.sort) || 99) - (Number(b.sort) || 99));
}

export async function getTaskBySlug(slug) {
  if (!firebaseReady) return null;
  const snap = await getDoc(doc(db, 'tasks', slug));
  if (!snap.exists()) return null;
  const { isMicrojobDoc } = await import('./microjobs.js');
  const t = { id: snap.id, ...snap.data() };
  // পুরোনো টাস্ক পেজ (/task/x.html) MicroJob doc পড়বে না — সিস্টেম আলাদা
  return isMicrojobDoc(t) ? null : t;
}

/* ---------- MicroJobs (admin-এর বানানো প্রতিটা job = আলাদা card) ----------
   list = public `tasks` docs (rules-এ allow) + নিজের submissions (users/{uid}/proofs,
   rules: isSelf) — নতুন server endpoint লাগেনি, আর state গণনা src/core/microjobs.js-এ
   (server-ও একই module import করে, তাই "এই user-এর জন্য pending/approved" দুই পাশে
   আলাদা হতে পারে না)। */
export async function getMyJobProofs(uid, limitN = 500) {
  if (!firebaseReady || !uid) return [];
  const snap = await getDocs(query(collection(db, 'users', uid, 'proofs'), limit(limitN)));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function getMicrojobs(uid) {
  const { viewsFor, activeJobs } = await import('./microjobs.js');
  const [tasks, proofs] = await Promise.all([getMicrojobTasks(), getMyJobProofs(uid)]);
  const views = viewsFor(tasks, proofs);
  return { all: views, jobs: activeJobs(views) };
}

/** একটা job-এর detail view (task page / microjobs detail দুটোতেই লাগে) */
export async function getJobView(uid, slug) {
  const { viewsFor, isMicrojobDoc } = await import('./microjobs.js');
  const [task, proofs] = await Promise.all([
    getTaskBySlug(slug),
    getMyJobProofs(uid),
  ]);
  if (!task) return { task: null, view: null, proofs: [] };
  // MicroJobs page শুধু নিজের system-এর job খোলে (পুরোনো টাস্কের doc না)
  if (!isMicrojobDoc(task)) return { task: null, view: null, proofs: [], wrongSystem: true };
  const mine = (proofs || []).filter(x => x.taskSlug === slug);
  const view = viewsFor([task], mine)[0] || null;
  return { task, view, proofs: mine };
}

export async function getLeaderboard() {
  return await callApi('/api/leaderboard/list', {}, 'POST');
}

export async function hasClaimedToday(uid, taskSlug) {
  const snap = await getDoc(doc(db, 'users', uid, 'taskClaims', `${taskSlug}_${todayStr()}`));
  return snap.exists();
}

/* ---------- gift / target (read) ---------- */

export async function hasGiftClaimedToday(uid) {
  const snap = await getDoc(doc(db, 'users', uid, 'giftClaims', todayStr()));
  return snap.exists();
}

export async function hasTargetClaimed(uid, tier) {
  const snap = await getDoc(doc(db, 'users', uid, 'targetClaims', String(tier)));
  return snap.exists();
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
  const q = query(collection(db, 'users', uid, 'proofs'), where('day', '==', day), limit(50));
  const snap = await getDocs(q);
  const d = snap.docs.find(x => x.data().taskSlug === taskSlug);
  if (!d) return null;
  return { id: d.id, ...d.data() };
}

/* MARKETPLACE: আজকে এই প্রজেক্টে জমা দেওয়া SOB account (একাধিক sale সাপোর্ট)।
   নতুনগুলো আগে দেখানো হয় — composite index লাগে না (single-field where + client sort)। */
export async function getTodaySales(uid, taskSlug) {
  if (!firebaseReady) return [];
  const day = todayStr();
  const q = query(collection(db, 'users', uid, 'proofs'), where('day', '==', day), limit(100));
  const snap = await getDocs(q);
  return snap.docs
    .map(d => ({ id: d.id, ...d.data() }))
    .filter(x => x.taskSlug === taskSlug)
    .sort((a, b) => {
      const ta = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
      const tb = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
      return tb - ta;
    });
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
