/* All Firebase Auth + Firestore operations for the user site. */
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
  doc, getDoc, setDoc, updateDoc, addDoc, collection, query, where, orderBy,
  limit, getDocs, runTransaction, serverTimestamp, increment,
} from 'firebase/firestore';
import { auth, db, firebaseReady } from './firebase.js';
import { getSettings } from './store.js';

export function friendlyError(err) {
  const map = {
    'auth/email-already-in-use': 'এই ইমেইলে আগেই আইডি আছে — লগইন করুন',
    'auth/invalid-credential': 'ইমেইল বা পাসওয়ার্ড সঠিক নয়',
    'auth/wrong-password': 'ইমেইল বা পাসওয়ার্ড সঠিক নয়',
    'auth/user-not-found': 'এই ইমেইলে কোনো আইডি নেই',
    'auth/weak-password': 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে',
    'auth/invalid-email': 'সঠিক ইমেইল লিখুন',
    'auth/too-many-requests': 'অনেকবার চেষ্টা হয়েছে — পরে আবার চেষ্টা করুন',
    'permission-denied': 'অনুমতি নেই — Firestore Security Rules চেক করুন',
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

function randomRefCode() {
  return String(Math.floor(10000000 + Math.random() * 90000000));
}

/* ---------- auth ---------- */

export async function registerUser({ name, mobile, email, password, refCodeInput }) {
  if (!firebaseReady) throw new Error('Firebase configure করা নেই');
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  const uid = cred.user.uid;
  const settings = await getSettings();
  const regBonus = Number(settings.registerBonus) || 0;
  const refBonus = Number(settings.referralBonus) || 0;

  // find referrer via the public refs/ directory (users collection নিজে query করা হয় না)
  let refBy = null;
  if (refCodeInput && refCodeInput.trim()) {
    const refSnap = await getDoc(doc(db, 'refs', refCodeInput.trim()));
    if (!refSnap.exists()) throw new Error('রেফারেল কোডটি সঠিক নয় — আবার চেষ্টা করুন');
    refBy = refSnap.data().uid;
  }

  const newRefCode = randomRefCode();
  await runTransaction(db, async tx => {
    const userRef = doc(db, 'users', uid);
    tx.set(userRef, {
      name, mobile, email,
      refCode: newRefCode,
      refBy: refBy || null,
      balance: regBonus,
      totalEarned: regBonus,
      isActive: false,
      welcomeShown: false,
      activationBonusGiven: false,
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
    });
    tx.set(doc(db, 'refs', newRefCode), { uid });
    if (refBy) {
      const refRef = doc(db, 'users', refBy);
      if (refBonus > 0) {
        tx.update(refRef, { balance: increment(refBonus), totalEarned: increment(refBonus) });
        tx.set(doc(db, 'users', refBy, 'transactions', `ref_${Date.now()}`), {
          amount: refBonus, type: 'referral_bonus', note: `নতুন রেফারেল: ${name}`,
          uid, refBy, createdAt: serverTimestamp(),
        });
      }
      // public referral-tree entry (শুধু non-sensitive ফিল্ড)
      tx.set(doc(db, 'users', refBy, 'team', uid), {
        refBy, name, refCode: newRefCode, isActive: false, createdAt: serverTimestamp(),
      });
    }
  });

  if (regBonus > 0) {
    await addDoc(collection(db, 'users', uid, 'transactions'), {
      amount: regBonus, type: 'register_bonus', note: 'রেজিস্ট্রেশন বোনাস', createdAt: serverTimestamp(),
    });
  }
  return uid;
}

/* Login/session restore-এ profile না থাকলে auto-create — dashboard blank হয়ে যাওয়া রোধ করে */
export async function ensureUserProfile(uid, { email = '', name = '' } = {}) {
  if (!firebaseReady) return null;
  const snap = await getDoc(doc(db, 'users', uid));
  if (snap.exists()) return { uid, ...snap.data() };
  const legacyCode = randomRefCode();
  const finalName = name || (email ? email.split('@')[0] : 'User');
  await setDoc(doc(db, 'users', uid), {
    name: finalName,
    mobile: '', email,
    refCode: legacyCode, refBy: null,
    balance: 0, totalEarned: 0, isActive: false, welcomeShown: true,
    activationBonusGiven: true,
    createdAt: serverTimestamp(), lastLogin: serverTimestamp(),
  });
  try { await setDoc(doc(db, 'refs', legacyCode), { uid }); } catch (_) {}
  return { uid, name: finalName, email, refCode: legacyCode, balance: 0, totalEarned: 0, isActive: false, welcomeShown: true };
}

export async function loginUser(email, password, keepLoggedIn = true) {
  if (!firebaseReady) throw new Error('Firebase configure করা নেই');
  // KEEP ME LOGGED IN: টিক থাকলে session browser বন্ধ করলেও থাকবে;
  // না থাকলে browser close করলেই session clear হয়ে যাবে
  const { browserLocalPersistence, browserSessionPersistence, setPersistence } = await import('firebase/auth');
  await setPersistence(auth, keepLoggedIn ? browserLocalPersistence : browserSessionPersistence);
  const cred = await signInWithEmailAndPassword(auth, email, password);
  await ensureUserProfile(cred.user.uid, { email, name: cred.user.displayName });
  return cred.user.uid;
}

export async function activateAccount(uid) {
  if (!firebaseReady) throw new Error('Firebase configure করা নেই');
  const settings = await getSettings();
  const bonus = Number(settings.activationBonus) || 0;
  await runTransaction(db, async tx => {
    const userRef = doc(db, 'users', uid);
    const userSnap = await tx.get(userRef);
    if (!userSnap.exists()) throw new Error('আপনার প্রোফাইল পাওয়া যায়নি');
    if (userSnap.data().isActive) throw new Error('একাউন্টটি ইতিমধ্যে অ্যাক্টিভ আছে');
    const bonusDue = bonus > 0 && !userSnap.data().activationBonusGiven;
    tx.update(userRef, {
      isActive: true,
      ...(bonusDue ? { balance: increment(bonus), totalEarned: increment(bonus), activationBonusGiven: true } : {}),
    });
    if (bonusDue) {
      tx.set(doc(db, 'users', uid, 'transactions', `a_${Date.now()}`), {
        amount: bonus, type: 'activation_bonus', note: 'একাউন্ট অ্যাক্টিভেশন বোনাস', createdAt: serverTimestamp(),
      });
    }
  });
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

export async function updateProfileName(uid, name) {
  await updateDoc(doc(db, 'users', uid), { name });
}

/* ---------- tasks ---------- */

export async function getTasks() {
  if (!firebaseReady) return [];
  const q = query(collection(db, 'tasks'), where('enabled', '==', true), orderBy('sort'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function getTaskBySlug(slug) {
  if (!firebaseReady) return null;
  const snap = await getDoc(doc(db, 'tasks', slug));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export async function hasClaimedToday(uid, taskSlug) {
  const snap = await getDoc(doc(db, 'users', uid, 'taskClaims', `${taskSlug}_${todayStr()}`));
  return snap.exists();
}

export async function claimTask(uid, taskSlug, task) {
  if (!firebaseReady) throw new Error('Firebase configure করা নেই');
  const reward = Number(task.reward) || 0;
  await runTransaction(db, async tx => {
    const claimRef = doc(db, 'users', uid, 'taskClaims', `${taskSlug}_${todayStr()}`);
    const claimSnap = await tx.get(claimRef);
    if (claimSnap.exists()) throw new Error('আপনি আজ এই টাস্কের রিওয়ার্ড ইতিমধ্যে নিয়েছেন');
    const userRef = doc(db, 'users', uid);
    const userSnap = await tx.get(userRef);
    if (!userSnap.exists()) throw new Error('আপনার প্রোফাইল পাওয়া যায়নি');
    const data = userSnap.data();
    if (!data.isActive) throw new Error('রিওয়ার্ড পেতে আগে আপনার একাউন্ট অ্যাক্টিভ করুন');
    if (task.locked) throw new Error('এই টাস্কটি এখনো লক করা আছে');
    tx.set(claimRef, { reward, taskId: taskSlug, claimedOn: todayStr(), createdAt: serverTimestamp() });
    tx.update(userRef, { balance: increment(reward), totalEarned: increment(reward) });
    tx.set(doc(db, 'users', uid, 'transactions', `t_${Date.now()}`), {
      amount: reward, type: 'task_reward', note: `টাস্ক: ${task.nameBn}`, createdAt: serverTimestamp(),
    });
  });
  return reward;
}

/* ---------- gift / target ---------- */

export async function hasGiftClaimedToday(uid) {
  const snap = await getDoc(doc(db, 'users', uid, 'giftClaims', todayStr()));
  return snap.exists();
}

export async function claimGift(uid, code) {
  if (!firebaseReady) throw new Error('Firebase configure করা নেই');
  const settings = await getSettings();
  const reward = Number(settings.giftReward) || 0;
  if (!settings.giftCode || String(code).trim().toLowerCase() !== String(settings.giftCode).trim().toLowerCase()) {
    throw new Error('কোডটি সঠিক নয় — কোড আমাদের টেলিগ্রাম চ্যানেলে দেওয়া হয়');
  }
  await runTransaction(db, async tx => {
    const claimRef = doc(db, 'users', uid, 'giftClaims', todayStr());
    const claimSnap = await tx.get(claimRef);
    if (claimSnap.exists()) throw new Error('আজকের গিফট বোনাস ইতিমধ্যে নিয়েছেন');
    const userRef = doc(db, 'users', uid);
    const userSnap = await tx.get(userRef);
    if (!userSnap.exists()) throw new Error('আপনার প্রোফাইল পাওয়া যায়নি');
    if (!userSnap.data().isActive) throw new Error('বোনাস পেতে আগে একাউন্ট অ্যাক্টিভ করুন');
    tx.set(claimRef, { code: String(code).trim(), reward, claimedOn: todayStr(), createdAt: serverTimestamp() });
    tx.update(userRef, { balance: increment(reward), totalEarned: increment(reward) });
    tx.set(doc(db, 'users', uid, 'transactions', `g_${Date.now()}`), {
      amount: reward, type: 'gift_bonus', note: `গিফট কোড: ${code}`, createdAt: serverTimestamp(),
    });
  });
  return reward;
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
    if (frontier.length > 500) break; // performance guard — বড় টীমের কাউন্ট cap করে দেখানো হবে
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

export async function claimTarget(uid, tier, bonus) {
  if (!firebaseReady) throw new Error('Firebase configure করা নেই');
  await runTransaction(db, async tx => {
    const claimRef = doc(db, 'users', uid, 'targetClaims', String(tier));
    const claimSnap = await tx.get(claimRef);
    if (claimSnap.exists()) throw new Error('এই টার্গেটের বোনাস ইতিমধ্যে নিয়েছেন');
    const userRef = doc(db, 'users', uid);
    const userSnap = await tx.get(userRef);
    if (!userSnap.exists()) throw new Error('আপনার প্রোফাইল পাওয়া যায়নি');
    if (!userSnap.data().isActive) throw new Error('বোনাস পেতে আগে একাউন্ট অ্যাক্টিভ করুন');
    tx.set(claimRef, { tier: Number(tier), bonus, createdAt: serverTimestamp() });
    tx.update(userRef, { balance: increment(bonus), totalEarned: increment(bonus) });
    tx.set(doc(db, 'users', uid, 'transactions', `tg_${Date.now()}`), {
      amount: bonus, type: 'target_bonus', note: `টার্গেট ${tier} রেফারেল বোনাস`, createdAt: serverTimestamp(),
    });
  });
  return bonus;
}

/* ---------- proof (task-er screenshot submit → admin review → approve) ---------- */

export async function getTodayProof(uid, taskSlug) {
  if (!firebaseReady) return null;
  const day = todayStr();
  const q = query(
    collection(db, 'users', uid, 'proofs'),
    where('taskSlug', '==', taskSlug),
    where('day', '==', day),
    limit(1),
  );
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { id: d.id, ...d.data() };
}

export async function getMyProofs(uid, limitN = 30) {
  if (!firebaseReady) return [];
  const q = query(collection(db, 'users', uid, 'proofs'), orderBy('createdAt', 'desc'), limit(limitN));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function submitProof(uid, { taskSlug, taskName, images, reward }) {
  if (!firebaseReady) throw new Error('Firebase configure করা নেই');
  const day = todayStr();
  const existing = await getTodayProof(uid, taskSlug);
  if (existing && existing.status !== 'rejected') throw new Error('আজ এই টাস্কের proof ইতিমধ্যে submit করা আছে — review-এর অপেক্ষায় থাকুন');
  const proofData = {
    taskSlug, taskName, day,
    images,
    reward: Number(reward) || 0,
    status: 'pending',
    note: '',
    createdAt: serverTimestamp(),
    reviewedAt: null,
  };
  const pRef = doc(collection(db, 'users', uid, 'proofs'));
  await runTransaction(db, async tx => {
    const userRef = doc(db, 'users', uid);
    const userSnap = await tx.get(userRef);
    if (!userSnap.exists()) throw new Error('আপনার প্রোফাইল পাওয়া যায়নি');
    if (!userSnap.data().isActive) throw new Error('Proof submit করতে একাউন্ট অ্যাক্টিভ করুন');
    tx.set(pRef, proofData);
    // admin panel-এর জন্য top-level mirror (admin সব pending proof এখান থেকে দেখবে)
    tx.set(doc(db, 'proofs', pRef.id), { ...proofData, userId: uid });
  });
  return pRef.id;
}

/* ---------- deposit (one-time activation fee → admin review → account active) ---------- */

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

export async function submitDeposit(uid, { method, trxId, senderNumber, amount }) {
  if (!firebaseReady) throw new Error('Firebase configure করা নেই');
  if (!trxId || String(trxId).trim().length < 6) throw new Error('Transaction ID (TrxID) সঠিকভাবে লিখুন');
  const sn = String(senderNumber || '').replace(/\D/g, '');
  if (!/^01[3-9]\d{8}$/.test(sn)) throw new Error('সঠিক Sender Number দিন (01XXXXXXXXX)');
  const pending = await getPendingDeposit(uid);
  if (pending) throw new Error('আপনার একটা deposit ইতিমধ্যে review-এ আছে — অপেক্ষায় থাকুন');
  const depositData = {
    method,
    trxId: String(trxId).trim(),
    senderNumber: sn,
    amount: Number(amount) || 0,
    status: 'pending',
    note: '',
    createdAt: serverTimestamp(),
    reviewedAt: null,
  };
  const dRef = doc(collection(db, 'users', uid, 'deposits'));
  await runTransaction(db, async tx => {
    const userSnap = await tx.get(doc(db, 'users', uid));
    if (!userSnap.exists()) throw new Error('আপনার প্রোফাইল পাওয়া যায়নি');
    if (userSnap.data().isActive) throw new Error('আপনার একাউন্ট ইতিমধ্যে অ্যাক্টিভ');
    tx.set(dRef, depositData);
    // admin panel-এর জন্য top-level mirror
    tx.set(doc(db, 'deposits', dRef.id), { ...depositData, userId: uid });
  });
  return dRef.id;
}

/* ---------- withdrawals ---------- */

export async function requestWithdrawal(uid, { amount, method, accountNumber, name, email }) {
  if (!firebaseReady) throw new Error('Firebase configure করা নেই');
  const settings = await getSettings();
  const minW = Number(settings.minWithdraw) || 0;
  if (!(amount > 0)) throw new Error('সঠিক টাকার পরিমাণ লিখুন');
  if (amount < minW) throw new Error(`ন্যূনতম উইথড্র পরিমাণ ৳${minW}`);
  if (!/^(bKash|Nagad|Rocket)$/.test(method)) throw new Error('পেমেন্ট মেথড নির্বাচন করুন');
  if (!/^01[3-9]\d{8}$/.test(accountNumber)) throw new Error('সঠিক মোবাইল নম্বর দিন (01XXXXXXXXX)');

  await runTransaction(db, async tx => {
    const userRef = doc(db, 'users', uid);
    const userSnap = await tx.get(userRef);
    if (!userSnap.exists()) throw new Error('আপনার প্রোফাইল পাওয়া যায়নি');
    const data = userSnap.data();
    if (!data.isActive) throw new Error('উইথড্র করতে একাউন্ট অ্যাক্টিভ করুন');
    if (amount > data.balance) throw new Error('পর্যাপ্ত ব্যালেন্স নেই');
    const wdRef = doc(collection(db, 'users', uid, 'withdrawals'));
    tx.set(wdRef, {
      uid, name, email,
      amount: Number(amount), method, accountNumber,
      status: 'pending', note: '',
      createdAt: serverTimestamp(), processedAt: null,
    });
    tx.update(userRef, { balance: increment(-Number(amount)) });
    tx.set(doc(db, 'users', uid, 'transactions', `w_${Date.now()}`), {
      amount: -Number(amount), type: 'withdraw', note: `উইথড্র রিকোয়েস্ট (${method} • ${accountNumber})`, createdAt: serverTimestamp(),
    });
  });
}

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

/* ---------- team ---------- */

export async function getDirectTeam(uid) {
  if (!firebaseReady) return [];
  const q = query(collection(db, 'users', uid, 'team'), orderBy('createdAt', 'desc'), limit(200));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ uid: d.id, ...d.data() }));
}

/* ---------- misc ---------- */

export async function getNotices() {
  if (!firebaseReady) return [];
  const q = query(collection(db, 'notices'), where('enabled', '==', true), orderBy('sort'));
  const snap = await getDocs(q);
  return snap.docs.map(d => d.data());
}

export async function markWelcomeShown(uid) {
  try { await updateDoc(doc(db, 'users', uid), { welcomeShown: true }); } catch (_) {}
}
