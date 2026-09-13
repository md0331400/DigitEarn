/* Admin wallet — MicroJob publishing-এর টাকা atomically secure করা (owner-এর business rule)
   -----------------------------------------------------------------------------
   Role (server-এ `admins/{email}` doc থেকেই নেওয়া হয়, client-এর পাঠানো role কখনো ধরা হয় না):
     owner  → balance লাগে না, পুরো সিস্টেম control, Job Poster balance add/remove করতে পারে
     full   → balance লাগে না (Full Access permission system-এর অংশ)
     poster → MicroJob publish করতে requiredBudget = reward × requiredUsers balance-এ থাকতে হবে

   Atomicity (security-critical):
     balance decrement + tasks/{slug} doc create + ledger write = EKTA Firestore transaction।
     তাই (ক) টাকা কেটে job না বানানো অবস্থায় থাকতে পারে না, (খ) concurrent দুটো publish-এর
     মধ্যে একটাই commit হয় (Firestore transaction re-read করে, হেরে যাওয়াটা আবার retry করে
     তখন balance কম দেখে 402 পায়), (গ) balance কখনো negative হয় না।
   Notun Vercel function না — lib/ ফাইল, api/admin/panel.js ?op=write/read router-এর ভেতর দিয়েই চলে। */
import { getDb } from '../firebase-admin.js';
import { ApiError } from '../http.js';
import { FieldValue } from 'firebase-admin/firestore';
import {
  ROLE_OWNER, ROLE_POSTER, requiresBalance, roleOf, effectiveRole, budgetOf,
  POSTER_REWARD_MIN, POSTER_REWARD_MAX, INSUFFICIENT_PUBLISH, INSUFFICIENT_UPDATE,
} from '../../src/core/microjobs.js';

const money2 = v => Math.round((Number(v) || 0) * 100) / 100;
const MAX_AMOUNT = 10_000_000;         // এক operation-এ সর্বোচ্চ ৳1 কোটি (typo/abuse রোধ)

export const adminRefOf = (db, email) => db.collection('admins').doc(String(email || ''));
export const ledgerOf = (db, email) => adminRefOf(db, email).collection('wallet');

/** একটা admin doc → panel-এর দেখানোর wallet shape */
export function walletView(doc = {}) {
  const role = roleOf(doc);
  const eff = effectiveRole(doc);
  const balance = money2(doc.balance);
  const reserved = money2(doc.reservedBudget);
  return {
    role, effectiveRole: eff, isOwner: role === ROLE_OWNER, isPoster: eff === ROLE_POSTER,
    activeMode: doc.activeMode === ROLE_POSTER ? ROLE_POSTER : 'full',
    balance, reserved,
    available: money2(Math.max(0, balance)),
    needsBalance: requiresBalance(eff),
    limits: { rewardMin: POSTER_REWARD_MIN, rewardMax: POSTER_REWARD_MAX },
    /* Admin Management list/row-এর জন্য (panel এই একটা view-ই পড়ে) */
    suspended: !!doc.suspended, suspendReason: String(doc.suspendReason || '').slice(0, 300),
    fullName: String(doc.fullName || '').slice(0, 60), joinedAt: doc.createdAt || null,
    updatedBy: String(doc.createdBy || '').slice(0, 120),
  };
}

const failShort = (need, have, kind) => {
  const n = money2(need).toFixed(2), h = money2(have).toFixed(2);
  const base = kind === 'update' ? INSUFFICIENT_UPDATE : INSUFFICIENT_PUBLISH;
  throw new ApiError(402, `${base} (দরকার ৳${n}, আছে ৳${h})`);
};

/* ---------- publish: balance secure + job public, এক transaction ---------- */
/**
 * @param {object} o.db
 * @param {string} o.email      admin email (requireAdmin থেকে — body থেকে না)
 * @param {string} o.role       effective role (server-computed)
 * @param {string} o.slug       tasks/{slug}
 * @param {object} o.doc        প্রস্তুত task doc (reward/requiredUsers already sanitized)
 * @param {boolean} o.publish  false হলে draft — টাকা কাটা হয় না, job public হয় না
 */
export async function fundAndPublish({ db, email, role, slug, doc, publish = true, note = '' }) {
  const budget = budgetOf(doc.reward, doc.requiredUsers);
  const need = requiresBalance(role) && publish;
  if (!publish) {
    // Draft: doc তৈরি হয় কিন্তু public হয় না, টাকাও কাটা হয় না — publish করলেই fund হবে
    const ref = db.collection('tasks').doc(slug);
    const existing = await ref.get();
    if (existing.exists) throw new ApiError(409, 'এই slug-এর job আগে থেকেই আছে');
    await ref.set({ ...doc, enabled: false, status: 'draft', funded: 'none', reservedBudget: 0, fundedBy: need ? email : '', fundedRole: role });
    return { ok: true, draft: true, budget, balanceAfter: walletView(await adminDoc(db, email)).balance };
  }
  if (!need) {
    /* owner / full access — deposit বা balance ছাড়াই publish (§1) */
    const ref = db.collection('tasks').doc(slug);
    const existing = await ref.get();
    if (existing.exists) throw new ApiError(409, 'এই slug-এর job আগে থেকেই আছে');
    await ref.set({ ...doc, enabled: true, status: 'published', funded: 'free', reservedBudget: 0, fundedBy: email, fundedRole: role, publishedAt: FieldValue.serverTimestamp() });
    return { ok: true, budget: 0, free: true };
  }
  const aRef = adminRefOf(db, email);
  const tRef = db.collection('tasks').doc(slug);
  let balanceAfter = 0;
  await db.runTransaction(async tx => {
    const aSnap = await tx.get(aRef);
    const a = (aSnap && aSnap.exists && aSnap.data()) || {};
    const liveRole = effectiveRole(a);                      // role tx-এর ভেতরেই আবার পড়া
    if (!requiresBalance(liveRole)) {                       // মাঝখানে role বদলে গেলে — fund লাগে না
      await tx.set(tRef, { ...doc, enabled: true, status: 'published', funded: 'free', reservedBudget: 0, fundedBy: email, fundedRole: liveRole, publishedAt: FieldValue.serverTimestamp() });
      return;
    }
    const bal = money2(a.balance);
    if (budget > bal) failShort(budget, bal, 'publish');   // ← insufficient → tx abort, job তৈরিই হয় না
    const tSnap = await tx.get(tRef);
    if (tSnap.exists) throw new ApiError(409, 'এই slug-এর job আগে থেকেই আছে');
    balanceAfter = money2(bal - budget);
    await tx.set(aRef, { balance: balanceAfter, updatedAt: FieldValue.serverTimestamp() }, { merge: true });
    await tx.set(tRef, {
      ...doc, enabled: true, status: 'published',
      funded: 'budget', fundedBy: email, fundedRole: liveRole,
      reservedBudget: budget, publishedAt: FieldValue.serverTimestamp(),
    });
    await tx.set(ledgerOf(db, email).doc(), {
      type: 'publish', amount: -budget, balanceAfter, jobSlug: slug, note, at: FieldValue.serverTimestamp(),
    });
  });
  return { ok: true, budget, balanceAfter };
}

/** পুনরায় fund করা (draft → publish) — same atomic rule */
export async function publishDraft({ db, email, slug }) {
  const aRef = adminRefOf(db, email);
  const tRef = db.collection('tasks').doc(slug);
  let out = {};
  await db.runTransaction(async tx => {
    const tSnap = await tx.get(tRef);
    if (!tSnap.exists) throw new ApiError(404, 'job doc পাওয়া যায়নি');
    const task = tSnap.data() || {};
    if (task.enabled === true && task.funded !== 'none') throw new ApiError(409, 'এই job আগে থেকেই প্রকাশিত');
    const a = ((await tx.get(aRef))?.data?.() || {});
    const role = effectiveRole(a);
    const budget = budgetOf(task.reward, task.requiredUsers);
    if (!requiresBalance(role)) {
      await tx.set(tRef, { enabled: true, status: 'published', funded: 'free', reservedBudget: 0, fundedBy: email, fundedRole: role, publishedAt: FieldValue.serverTimestamp() }, { merge: true });
      out = { ok: true, free: true, budget: 0 };
      return;
    }
    const bal = money2(a.balance);
    const already = money2(task.reservedBudget);
    const need = money2(Math.max(0, budget - already));
    if (need > bal) failShort(need, bal, 'publish');
    const balanceAfter = money2(bal - need);
    await tx.set(aRef, { balance: balanceAfter, updatedAt: FieldValue.serverTimestamp() }, { merge: true });
    await tx.set(tRef, {
      enabled: true, status: 'published', funded: 'budget', fundedBy: email, fundedRole: role,
      reservedBudget: budget, publishedAt: FieldValue.serverTimestamp(),
    }, { merge: true });
    await tx.set(ledgerOf(db, email).doc(), {
      type: 'publish', amount: -need, balanceAfter, jobSlug: slug, note: 'draft → published', at: FieldValue.serverTimestamp(),
    });
    out = { ok: true, budget: need, balanceAfter };
  });
  return out;
}

/* ---------- edit: budget বাড়ালে additional reserve, কমালে release ---------- */
export async function resizeBudget({ db, email, slug, patch, taskNow, role }) {
  const newReward = 'reward' in patch ? patch.reward : taskNow.reward;
  const newNeed = 'requiredUsers' in patch ? patch.requiredUsers : taskNow.requiredUsers;
  const newBudget = budgetOf(newReward, newNeed);
  const oldReserved = money2(taskNow.reservedBudget);
  const delta = money2(newBudget - oldReserved);
  /* owner / full access — টাকা লাগে না, তাই শুধু doc save (reservedBudget-ও ছোঁয়া না) */
  if (!requiresBalance(role) || taskNow.funded !== 'budget') {
    await db.collection('tasks').doc(slug).set(patch, { merge: true });
    return { delta: 0, saved: true };
  }
  if (delta === 0) {
    await db.collection('tasks').doc(slug).set({ ...patch, reservedBudget: newBudget }, { merge: true });
    return { delta: 0, saved: true };
  }
  /* budget কমানো হলে সর্বোচ্চ "যতটা এখনো খরচ হয়নি"টুকুই ফেরত (reserved − approved×reward) —
     নাহলে আগে user-কে দেওয়া payout-ও ফেরত লেখা যেত (double refund) */
  const spent = money2(Number(taskNow.approvedCount || 0) * Number(taskNow.reward || 0));
  const release = delta < 0 ? money2(Math.min(Math.abs(delta), Math.max(0, oldReserved - spent))) : 0;
  const reservedAfter = money2(delta > 0 ? oldReserved + delta : oldReserved - release);
  if (delta < 0 && release <= 0) {
    await db.collection('tasks').doc(slug).set({ ...patch, reservedBudget: oldReserved }, { merge: true });
    return { delta: 0, saved: true, alreadySpent: true };
  }
  const aRef = adminRefOf(db, email);
  const tRef = db.collection('tasks').doc(slug);
  let out = {};
  await db.runTransaction(async tx => {
    const a = ((await tx.get(aRef))?.data?.() || {});
    const liveRole = effectiveRole(a);
    if (!requiresBalance(liveRole)) {
      await tx.set(tRef, { ...patch, reservedBudget: 0 }, { merge: true });
      out = { delta: 0, free: true };
      return;
    }
    const bal = money2(a.balance);
    if (delta > 0 && delta > bal) failShort(delta, bal, 'update');   // বাড়তি অংশের balance নেই → update reject
    const balanceAfter = money2(delta > 0 ? bal - delta : Math.min(MAX_AMOUNT, bal + release));
    await tx.set(aRef, { balance: balanceAfter, updatedAt: FieldValue.serverTimestamp() }, { merge: true });
    await tx.set(tRef, { ...patch, reservedBudget: reservedAfter }, { merge: true });
    await tx.set(ledgerOf(db, email).doc(), {
      type: delta > 0 ? 'publish' : 'refund', amount: delta > 0 ? -delta : release, balanceAfter, jobSlug: slug,
      note: delta > 0 ? 'budget increased on edit' : 'budget released on edit', at: FieldValue.serverTimestamp(),
    });
    out = { delta: delta > 0 ? delta : -release, balanceAfter, reservedBudget: reservedAfter };
  });
  return out;
}

/* ---------- delete: অব্যবহৃত budget ফেরত (যে Job Poster-এর টাকা থেকে fund হয়েছিল
   তার কাছেই ফেরত — delete যে admin করছে তার role-এর সাথে তার সম্পর্ক নেই) ---------- */
export async function refundOnDelete({ db, slug, task }) {
  const email = String(task.fundedBy || '');
  const reserved = money2(task.reservedBudget);
  /* ফান্ড করা হয়নি (owner/full-এর job, বা unfunded draft) → শুধু doc মুছুন, ফেরত নেই */
  if (!email || !reserved || task.funded !== 'budget') {
    await db.collection('tasks').doc(slug).delete();
    return { refunded: 0 };
  }
  const spent = money2(budgetOf(task.reward, task.approvedCount || 0));
  const refund = money2(Math.max(0, reserved - spent));
  const aRef = adminRefOf(db, email);
  await db.runTransaction(async tx => {
    if (refund > 0) {
      const a = ((await tx.get(aRef))?.data?.() || {});
      await tx.set(aRef, { balance: money2(money2(a.balance) + refund), updatedAt: FieldValue.serverTimestamp() }, { merge: true });
      await tx.set(ledgerOf(db, email).doc(), {
        type: 'refund', amount: refund, jobSlug: slug, note: 'job deleted — unused budget released', at: FieldValue.serverTimestamp(),
      });
    }
    await tx.delete(db.collection('tasks').doc(slug));
  });
  return { refunded: refund };
}

/* ---------- owner-only: Job Poster balance + role ---------- */
export async function adminDoc(db, email) {
  const snap = await adminRefOf(db, email).get();
  return (snap && snap.exists && snap.data()) || {};
}

/** delta = add/remove (৳), setAbs = absolute set। সব transaction-এ + ledger। */
export async function adjustBalance({ db, email, actorEmail, delta = 0, setAbs = null, note = '' }) {
  const ref = adminRefOf(db, email);
  let out = {};
  await db.runTransaction(async tx => {
    const snap = await tx.get(ref);
    if (!snap.exists) throw new ApiError(404, 'এই admin-এর account নেই');
    const cur = money2((snap.data() || {}).balance);
    let next;
    if (setAbs !== null) {
      const v = money2(setAbs);
      if (!(v >= 0 && v <= MAX_AMOUNT)) throw new ApiError(400, 'Balance ০ থেকে ৳' + MAX_AMOUNT.toLocaleString('en-US') + '-এর মধ্যে হতে হবে');
      next = v;
    } else {
      const d = money2(delta);
      if (!(Math.abs(d) <= MAX_AMOUNT)) throw new ApiError(400, 'অনুরোধ সংখ্যাটি অনেক বড়');
      next = money2(cur + d);
      if (next < 0) throw new ApiError(400, `ব্যালেন্স negative হতে পারবে না (বর্তমান ৳${cur.toFixed(2)}, বিয়োগ ৳${Math.abs(d).toFixed(2)})`);
    }
    await tx.set(ref, { balance: next, updatedAt: FieldValue.serverTimestamp() }, { merge: true });
    await tx.set(ledgerOf(db, email).doc(), {
      type: next >= cur ? 'credit' : 'debit', amount: money2(next - cur), balanceAfter: next,
      note, by: actorEmail || '', at: FieldValue.serverTimestamp(),
    });
    out = { balance: next, changed: money2(next - cur) };
  });
  return out;
}

/** owner: role set (poster/full/owner) + owner-এর own mode switch */
export async function setRole({ db, email, role }) {
  const allowed = [ROLE_OWNER, 'full', ROLE_POSTER];
  if (!allowed.includes(role)) throw new ApiError(400, 'role owner | full | poster হতে হবে');
  await adminRefOf(db, email).set({ role, updatedAt: FieldValue.serverTimestamp() }, { merge: true });
  return { ok: true, role };
}
export async function setActiveMode({ db, email, activeMode }) {
  const mode = activeMode === ROLE_POSTER ? ROLE_POSTER : 'full';
  await adminRefOf(db, email).set({ activeMode: mode, updatedAt: FieldValue.serverTimestamp() }, { merge: true });
  return { ok: true, activeMode: mode };
}

/** panel-এর wallet read: balance + live job reserve + সাম্প্রতিক ledger */
export async function readWallet(db, email, limit = 20) {
  const doc = await adminDoc(db, email);
  const view = walletView(doc);
  const tSnap = await db.collection('tasks').limit(500).get();
  const mine = [];
  let reserved = 0;
  for (const d of tSnap.docs || []) {
    const t = d.data() || {};
    if (String(t.fundedBy || '') !== String(email)) continue;
    const b = money2(t.reservedBudget);
    if (b > 0 && t.enabled !== false) reserved = money2(reserved + b);
    mine.push({
      slug: d.id, nameBn: t.nameBn || d.id, reward: money2(t.reward), requiredUsers: Number(t.requiredUsers) || 0,
      approvedCount: Number(t.approvedCount) || 0, budget: budgetOf(t.reward, t.requiredUsers),
      reservedBudget: b, status: t.enabled === false ? 'draft' : (t.closed ? 'closed' : 'live'), funded: t.funded || '',
    });
  }
  let ledger = [];
  try {
    const l = await db.collection('admins').doc(String(email)).collection('wallet').limit(Math.max(1, Math.min(100, limit)) * 4).get();
    ledger = (l.docs || []).map(x => ({ id: x.id, ...(x.data() || {}) }))
      .sort((a, b) => (b.at?.seconds || 0) - (a.at?.seconds || 0)).slice(0, Math.max(1, Math.min(100, limit)));
  } catch (_) { /* subcollection পড়া না গেলে খালি — wallet view ভাঙবে না */ }
  return { ...view, reserved, jobs: mine, ledger };
}
