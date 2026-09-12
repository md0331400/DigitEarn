/* DigitEarn — MicroJobs model (একটাই source of truth)
   প্রতিটা admin-created Microjob = একটা আলাদা Firestore doc `tasks/{slug}` = একটা আলাদা
   user-facing card/post। কোনো card hardcode নয়, কোনো merge নয় — যত job আছে তত card।

   ⚠️ এই ফাইলটা pure (browser + Node দুটোতেই চলেন) — server (api/proof/submit.js,
   lib/admin/*.js) আর client (src/pages/microjobs.js, src/pages/task.js, src/admin) একই
   logic import করে, তাই "কেমনে pending/approved/hidden/full" — সেটা দুই পাশে আলাদা করে
   ভাবতে হয় না (drift হলে এক পাশে job lock হয়ে যেত)।

   State মানে সবসময় (user × job) জোড়াটার state — job-এর global state না।
   User A-র জন্য Job 2 approved, User B-র জন্য pending — দুটোই একসাথে সত্যি। */

/* job mode (tasks/{slug}.mode) */
export const MODE_SINGLE = 'single';         // MicroJob: এক user একবারই submit করবে
export const MODE_MARKET = 'marketplace';    // পুরোনো account-sell flow: দিনে একাধিক (অপরিবর্তিত)

export const ST = {
  AVAILABLE: 'available',
  PENDING: 'pending',
  APPROVED: 'approved',
  RESUBMIT: 'rejected_resubmit',   // reject + আবার submit করা যাবে
  HIDDEN: 'rejected_hidden',       // reject + এই user থেকে লুকানো
  FULL: 'full',                    // global: required approved user হয়ে গেছে
};

/* ---------- job config ---------- */
export const num = v => (Number.isFinite(Number(v)) ? Number(v) : 0);

/** requiredUsers না থাকলে/0 হলে job unlimited (পুরোনো ৮টা account-sell task এভাবেই চলে) */
export function requiredUsers(task) {
  return Math.max(0, Math.floor(num(task && task.requiredUsers)));
}
export function approvedCount(task) {
  return Math.max(0, Math.floor(num(task && task.approvedCount)));
}
/** কয়টা slot বাকি — unlimited হলে null */
export function remainingOf(task) {
  const need = requiredUsers(task);
  if (!need) return null;
  return Math.max(0, need - approvedCount(task));
}
/** required approved user count শেষ → job FULL/CLOSED (global, সব user-এর জন্য) */
export function isFull(task) {
  const need = requiredUsers(task);
  if (need && approvedCount(task) >= need) return true;
  return !!(task && (task.closed === true || task.full === true));
}
/** user-facing list-এ এই job দেখানো যাবে কিনা (enabled + lock না + full না) */
export function isOpenToNewSubmissions(task) {
  if (!task) return false;
  if (task.enabled === false) return false;
  if (isFull(task)) return false;
  return true;
}
/** requiredUsers থাকলেই single-per-user mode (নাহলে slot হিসাব মানে হারায়) */
export function isSingleMode(task) {
  const mode = String((task && task.mode) || '');
  if (mode === MODE_SINGLE) return true;
  if (mode === MODE_MARKET) return false;
  return requiredUsers(task) > 0;
}

/* ---------- per-user state (ওই user-এর job-এর submissions থেকে) ---------- */
/** myProofs = শুধু এই job-এর (taskSlug মিলিয়ে নেওয়া) submission row গুলো */
export function stateOf(task, myProofs = []) {
  const rows = (myProofs || []).filter(p => (p.taskSlug || p.id) === (task.slug || task.id));
  if (rows.some(p => p.status === 'approved')) return ST.APPROVED;
  if (rows.some(p => p.status === 'pending')) return ST.PENDING;
  const rejected = rows.filter(p => p.status === 'rejected');
  if (rejected.length) {
    // সবচেয়ে নতুন rejection-ই decision দেয় (আগেরটা hide, পরেরটা resubmit — নতুনটা চলে)
    const last = rejected.slice().sort((a, b) => createdAtMs(b) - createdAtMs(a))[0];
    return last.hiddenForUser ? ST.HIDDEN : ST.RESUBMIT;
  }
  if (!isOpenToNewSubmissions(task)) return isFull(task) ? ST.FULL : ST.HIDDEN;
  return ST.AVAILABLE;
}

export function createdAtMs(p) {
  const v = p && p.createdAt;
  if (!v) return 0;
  if (typeof v.toMillis === 'function') return v.toMillis();
  if (typeof v.toDate === 'function') { const d = v.toDate(); return d && d.getTime ? d.getTime() : 0; }
  if (typeof v === 'number') return v;
  const t = Date.parse(String(v.seconds ? v.seconds * 1000 : v));
  return Number.isFinite(t) ? t : 0;
}

/** user-facing list: approved/hidden job ওই user-এর list থেকে বাদে; বাকি সব থাকে */
export function visibleForUser(task, state) {
  if (state === ST.APPROVED || state === ST.HIDDEN) return false;
  if (state === ST.FULL) return false;
  // job global ভাবে full/disabled হলে নতুন কাউকে দেখানো হয় না
  if (!isOpenToNewSubmissions(task)) return false;
  return true;
}

/** submit button এ চাপা যাবে কিনা + সেটা কেন */
export function submitGate(task, state) {
  if (state === ST.PENDING) return { allowed: false, label: 'আপনি এটি জমা দিয়েছেন — approval-এর অপেক্ষায়', tone: 'pending' };
  if (state === ST.APPROVED) return { allowed: false, label: 'এই jobটি আপনি complete করেছেন ✓', tone: 'ok' };
  if (state === ST.HIDDEN) return { allowed: false, label: 'এই jobটি আপনার জন্য বন্ধ', tone: 'warn' };
  if (state === ST.FULL || isFull(task)) return { allowed: false, label: 'এই job-এর সব slot পূর্ণ (FULL)', tone: 'warn' };
  if (task && task.locked) return { allowed: false, label: 'এই job এখনো লক করা', tone: 'warn' };
  if (task && task.enabled === false) return { allowed: false, label: 'এই job বর্তমানে বন্ধ', tone: 'warn' };
  if (state === ST.RESUBMIT) return { allowed: true, label: 'Submit Again', tone: 'warn' };
  return { allowed: true, label: 'Submit', tone: 'ok' };
}

/* "100 people left" — card badge text */
export function leftBadge(task) {
  const left = remainingOf(task);
  if (left === null) return { text: '', full: false };
  if (left <= 0) return { text: 'FULL / CLOSED', full: true };
  return { text: `${bn(left)} জন বাকি আছে`, full: false };
}
/* English digit → Bengali digit (UI text-এর জন্য) */
export const bnDigits = n => String(n).replace(/[0-9]/g, d => '০১২৩৪৫৬৭৮৯'[Number(d)]);
const bn = bnDigits;

/* list ordering: বাকি slot কম এমন job আগে (urgent), তারপর sort field */
export function sortJobs(jobs) {
  return (jobs || []).slice().sort((a, b) => {
    const ra = remainingOf(a), rb = remainingOf(b);
    const va = ra === null ? 1e9 : ra, vb = rb === null ? 1e9 : rb;
    if (va !== vb) return va - vb;
    return (num(a.sort) || 99) - (num(b.sort) || 99);
  });
}

/* ---------- list view model (client + tests) ----------
   tasks docs + ওই user-এর submissions থেকে প্রতিটা job-এর জন্য আলাদা view:
   state / remaining / full / visible / gate। admin যত job বানায় ততটা entry —
   কোনো hardcode count নেই, কোনো merge নেই। */
export function viewsFor(taskDocs, myProofs = []) {
  const byJob = {};
  for (const p of myProofs || []) {
    const k = String((p && p.taskSlug) || '');
    if (!k) continue;
    (byJob[k] || (byJob[k] = [])).push(p);
  }
  const out = [];
  for (const t of taskDocs || []) {
    const task = { slug: t.slug || t.id, ...t };
    const state = stateOf(task, byJob[task.slug] || []);
    out.push({
      ...task,
      state,
      remaining: remainingOf(task),
      full: isFull(task),
      single: isSingleMode(task),
      visible: visibleForUser(task, state),
      gate: submitGate(task, state),
      left: leftBadge(task).text,
    });
  }
  return out;
}

/** user-facing MicroJobs list: approved/hidden/full/disabled job বাদে সব */
export function activeJobs(views) {
  return sortJobs((views || []).filter(v => v.visible));
}

/** MicroJobs list: available + pending (submit করার পরেও card থকে, button বন্ধ হয় —
   spec §8), বাকি সব (approved/hidden/full/disabled) ওই user-এর list-এর বাইরে থাকে। */
export function jobViewsSorted(views) {
  return sortJobs((views || []).filter(v => v.visible || v.state === ST.PENDING));
}
