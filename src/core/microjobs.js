/* DigitEarn — MicroJobs model (একটাই source of truth)
   প্রতিটা admin-created Microjob = একটা আলাদা Firestore doc `tasks/{slug}` = একটা আলাদা
   user-facing card/post। কোনো card hardcode নয়, কোনো merge নয় — যত job আছে তত card।

   ⚠️ এই ফাইলটা pure (browser + Node দুটোতেই চলেন) — server (api/proof/submit.js,
   lib/admin/*.js) আর client (src/pages/microjobs.js, src/pages/task.js, src/admin) একই
   logic import করে, তাই "কেমনে pending/approved/hidden/full" — সেটা দুই পাশে আলাদা করে
   ভাবতে হয় না (drift হলে এক পাশে job lock হয়ে যেত)।

   State মানে সবসময় (user × job) জোড়াটার state — job-এর global state না।
   User A-র জন্য Job 2 approved, User B-র জন্য pending — দুটোই একসাথে সত্যি। */

/* ---------- দুইটা আলাদা সিস্টেম (mix করা যাবে না) ----------
   kind === 'microjob' → শুধু admin Panel → “MicroJobs” থেকে বানানো limited job
   আর সব পুরোনো/সাধারণ টাস্ক (ফেসবুক সেল, জিমাইল সেল…) = আলাদা সিস্টেম, এদের
   MicroJobs page-এ দেখানো হয় না, আর MicroJobs-এর job পুরোনো টাস্ক গ্রিডে আসে না। */
export const MJ_KIND = 'microjob';
export const isMicrojobDoc = t => String((t && t.kind) || '') === MJ_KIND;
/* পুরোনো 'মাইজাগো জব' static task-টা MicroJobs-এ convert হয়েছে — ওর leftover
   Firestore doc (tasks/myjob) কোনো grid-এই দেখানো হয় না (owner-এর request) */
export const RETIRED_TASK_SLUGS = new Set(['myjob']);
export const isRetiredTask = t => RETIRED_TASK_SLUGS.has(String((t && (t.slug || t.id)) || ''));

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
/** requiredUsers থাকলেই single-per-user mode (নাহলে slot হিসাব মানে হারায়)।
   MicroJob হলে সবসময় single — এক user এক job একবারই (§5/§6)। */
export function isSingleMode(task) {
  if (isMicrojobDoc(task)) return true;
  const mode = String((task && task.mode) || '');
  if (mode === MODE_SINGLE) return true;
  if (mode === MODE_MARKET) return false;
  return requiredUsers(task) > 0;
}

/* ---------- admin role + MicroJob wallet (owner-এর business rule) ----------
   তিনটা level:
     owner  = মূল অ্যাডমিন — deposit/balance ছাড়াই সবকিছু, admin manage করে
     full   = Full Access admin — deposit/balance ছাড়াই admin + publish
     poster = Job Poster — MicroJob প্রকাশের আগে balance দরকার, reward ৳১–৳৫০০
   ⚠️ role সবসময় server `admins/{email}` doc থেকে আসে — client যা পাঠায় তা কখনো
   grade হয় না (role/mode/budget সব backend-এই আবার হিসাব হয়)। */
export const ROLE_OWNER = 'owner';
export const ROLE_FULL = 'full';
export const ROLE_POSTER = 'poster';
export const POSTER_REWARD_MIN = 1;
export const POSTER_REWARD_MAX = 500;
const normRole = v => {
  const r = String(v || '').toLowerCase().replace(/[\s_-]/g, '');
  if (r === 'owner' || r === 'mainadmin' || r === 'superadmin' || r === 'main' || r === 'super') return ROLE_OWNER;
  if (r === 'poster' || r === 'jobposter' || r === 'jobposteradmin') return ROLE_POSTER;
  if (r === 'full' || r === 'fullaccess' || r === 'fullaccessadmin') return ROLE_FULL;
  return null;
};
/** role field না থাকা পুরোনো admin doc = Full Access (আগের behaviour ঠিক রাখে) */
export function roleOf(adminDoc) {
  return normRole(adminDoc && (adminDoc.role || adminDoc.adminRole || adminDoc.level)) || ROLE_FULL;
}
/** Owner চাইলে নিজেকে Job Poster mode-এ চালাতে পারে (testing/audit) — Full Access
   mode-এ ফিরলেই balance-এর শর্ত উঠে যায়। শুধু owner-এর জন্য, server-side enforce। */
export function effectiveRole(adminDoc) {
  const role = roleOf(adminDoc);
  const mode = normRole(adminDoc && adminDoc.activeMode);
  if (role === ROLE_OWNER && mode === ROLE_POSTER) return ROLE_POSTER;
  return role;
}
/** শুধু Job Poster-এই balance দিয়ে fund করে */
export const requiresBalance = role => role === ROLE_POSTER;
/** requiredBudget = rewardPerUser × requiredUsers (server-ই হিসাব করে) */
export function budgetOf(reward, required) {
  const r = Math.max(0, num(reward)), n = Math.max(0, Math.floor(num(required)));
  return Math.round(r * n * 100) / 100;
}
export const posterRewardOk = reward => {
  const r = num(reward);
  return Number.isFinite(r) && r >= POSTER_REWARD_MIN && r <= POSTER_REWARD_MAX;
};
export const INSUFFICIENT_PUBLISH = 'Insufficient balance to publish this job.';
export const INSUFFICIENT_UPDATE = 'Insufficient balance to update this job.';

/* job lifecycle: draft → published → active → completed/closed।
   draft = user-facing পেজে কখনো দেখায় না (enabled:false দিয়ে gate হয়, যাতে
   পুরোনো `enabled` field-ও একই কাজ করে — দুইটা source of truth না)। */
export const JOB_STATUS = { DRAFT: 'draft', PUBLISHED: 'published', ACTIVE: 'active', COMPLETED: 'completed', CLOSED: 'closed' };
export function jobStatus(task) {
  if (!task) return JOB_STATUS.DRAFT;
  if (task.enabled === false || String(task.status || '') === JOB_STATUS.DRAFT) return JOB_STATUS.DRAFT;
  if (task.closed === true) return JOB_STATUS.CLOSED;
  if (isFull(task)) return JOB_STATUS.COMPLETED;
  return JOB_STATUS.ACTIVE;
}
/** MicroJob public হওয়ার মানে: draft না + (poster হলে) fund হয়েছে */
export const isFundedJob = task => !!(task && (task.funded === 'free' || task.funded === 'budget' || !requiresBalance(task.fundedByRole)));
export const isPublicJob = task => jobStatus(task) !== JOB_STATUS.DRAFT && isFundedJob(task);

/* MicroJobs-এ user-এর কাছ থেকে কখনো password/credential চাওয়া হয় না (owner rule) —
   পুরোনো account-sell টাস্ক সেটা নিজের জিনিস বিক্রি করে, তাই সেখানে allowed। */
export const MJ_FIELD_TYPES = ['text', 'email', 'tel', 'number', 'url', 'textarea', 'image'];

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

/** submit button এ চাপা যাবে কিনা + সেটা কেন। `opts.accountActive` = user-এর
   server-side profile থেকে আসা activation status — inactive হলে MicroJobs submit
   বন্ধ (backend একই check আবার করে, এটা শুধু UI)। */
export function submitGate(task, state, opts = {}) {
  const activeCheck = opts.accountActive !== false;
  if (!activeCheck) return { allowed: false, label: 'আগে আপনার একাউন্ট একটিভ করুন — তারপর এই কাজ জমা দিতে পারবেন', tone: 'warn' };
  if (state === ST.PENDING) return { allowed: false, label: 'আপনি এটি জমা দিয়েছেন — অনুমোদনের অপেক্ষায়', tone: 'pending' };
  if (state === ST.APPROVED) return { allowed: false, label: 'এই কাজটি আপনি সম্পন্ন করেছেন ✓', tone: 'ok' };
  if (state === ST.HIDDEN) return { allowed: false, label: 'এই কাজটি আপনার জন্য বন্ধ', tone: 'warn' };
  if (state === ST.FULL || isFull(task)) return { allowed: false, label: 'এই কাজের সব জায়গা পূর্ণ', tone: 'warn' };
  if (task && task.locked) return { allowed: false, label: 'এই কাজটি এখনো খোলা হয়নি', tone: 'warn' };
  if (task && task.enabled === false) return { allowed: false, label: 'এই কাজটি এখন বন্ধ আছে', tone: 'warn' };
  if (state === ST.RESUBMIT) return { allowed: true, label: 'আবার জমা দিন', tone: 'warn' };
  return { allowed: true, label: 'জমা দিন', tone: 'ok' };
}

/* "100 people left" — card badge text */
export function leftBadge(task) {
  const left = remainingOf(task);
  if (left === null) return { text: '', full: false };
  if (left <= 0) return { text: 'সব জায়গা পূর্ণ', full: true };
  return { text: `${bn(left)} জন বাকি আছে`, full: false };
}
/* English digit → Bengali digit (UI text-এর জন্য) */
export const bnDigits = n => String(n).replace(/[0-9]/g, d => '০১২৩৪৫৬৭৮৯'[Number(d)]);
const bn = bnDigits;

/* ---------- user-facing copy filter (§7/§13) ----------
   পুরোনো seed/DB content-এ admin workflow বোঝানো লেখা ('admin approve করলেই',
   'Submit করুন', 'Admin Panel → …') থাকতে পারে। Data বদলাই না — normal user-কে
   দেখানোর সময় শুধু neutral বাংলায় বদলে দেওয়া হয় (admin panel raw text-ই দেখে)। */
const INTERNAL_COPY = [
  [/Admin\s*Panel[^।.\n]*/gi, 'সাপোর্টে জানান'],
  [/\badmin\s*(approval|approve|approved)?\s*করলেই/gi, 'অনুমোদন হলেই'],
  [/\badmin\s*[^।.\n]{0,24}অনুমোদন করলে/gi, 'অনুমোদন হলেই'],
  [/অ্যাডমিন\s*(নিজে থেকে\s*)?দেখে\s*অনুমোদন করবে/g, 'আমরা দেখে অনুমোদন করব'],
  [/\bapprove\s*হলেই/gi, 'অনুমোদন হলেই'],
  [/\badmit\b/gi, 'রিভিউ টিম'],
  [/Submit\s*করুন/gi, 'জমা দিন'],
  [/\brejected?\b/gi, 'বাতিল'],
  [/\badmin\b/gi, 'রিভিউ টিম'],
  [/অ্যাডমিন/g, 'রিভিউ টিম'],
  [/\b(Firestore|Firebase|Cloud\s*Function|API)\b/gi, 'সিস্টেম'],
];/** esc() করার আগে লাগাবেন (entity ভাঙে না) */
export function userCopy(s) {
  let out = String(s === undefined || s === null ? '' : s);
  for (const [re, to] of INTERNAL_COPY) out = out.replace(re, to);
  return out.trim();
}

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
export function viewsFor(taskDocs, myProofs = [], opts = {}) {
  /* MicroJobs list-এর জন্য আলাদা filter: শুধু admin-এর বানানো microjob doc
     (যদি admin ০টা বানায় → খালি list → page empty state দেখাবে) */
  taskDocs = (taskDocs || []).filter(isMicrojobDoc);
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
      gate: submitGate(task, state, opts),
      accountActive: opts.accountActive !== false,
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
