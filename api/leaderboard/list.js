/* POST /api/leaderboard/list — Top 4 লিডার (রেফারেল সংখ্যা অনুযায়ী)।
   Leaderboard = আলাদা page-এর আলাদা data; Refer page (team.html) স্প্রশ করা হয় না —
   শুধু existing referral system (users/{uid}.refBy + users/{uid}/team) থেকে গনা হয়,
   তাই নতুন referral model/টೇबল বানানো হয়নি।

   Privacy: ফোন server-এই mask হয় (01712****89) — পুরো নম্বর কোনো response-এই যায় না।
   Auth লাগে (login user), anonymous enumeration বন্ধ। */
import { getDb } from '../../lib/firebase-admin.js';
import { cors, fail, ok, readBody, authenticate, authReject, AUTH_OK, opFail, maskMobile } from '../../lib/http.js';

const SCAN_LIMIT = 500;   // এক request-এ কতটা user দেখা হবে
const TOP = 4;            // spec: Top 4 — না কম, না বেশি

/* চলতি মাস (Asia/Dhaka = UTC+6) — "Monthly Income" তার হিসাবে */
function monthStartMs(now = new Date()) {
  const dhaka = new Date(now.getTime() + 6 * 3600 * 1000);
  return Date.UTC(dhaka.getUTCFullYear(), dhaka.getUTCMonth(), 1) - 6 * 3600 * 1000;
}
const whenOf = v => {
  if (!v) return 0;
  if (typeof v.toMillis === 'function') return v.toMillis();
  if (typeof v.toDate === 'function') { const d = v.toDate(); return d && d.getTime ? d.getTime() : 0; }
  if (typeof v === 'number') return v;
  if (typeof v === 'object' && typeof v.seconds === 'number') return v.seconds * 1000;
  const t = Date.parse(String(v));
  return Number.isFinite(t) ? t : 0;
};

export default async function handler(req, res) {
  if (cors(req, res)) return;
  if (req.method !== 'POST') return fail(res, 405, 'Method Not Allowed');
  const a = await authenticate(req);
  if (a.state !== AUTH_OK) return authReject(res, a);

  const body = await readBody(req);
  const topN = Math.max(1, Math.min(TOP, Number(body.topN) || TOP));
  try {
    const db = getDb();
    const snap = await db.collection('users').limit(SCAN_LIMIT).get();
    const users = (snap.docs || []).map(d => ({ uid: d.id, ...(d.data() || {}) }));

    /* referral count = refBy pointer থেকে (একটাই scan, per-user subcollection query না)।
       cache field refCount থাকলে সেটা বসে যায় — scan limit-এর বাইরের user-ও তখন ঠিক
       থাকে (?op=write what:'leaderboard-backfill' দিলে refCount sync হয়)। */
    const counted = {};
    for (const u of users) {
      const parent = String(u.refBy || '');
      if (parent) counted[parent] = (counted[parent] || 0) + 1;
    }
    const rankOf = u => {
      const cached = Number(u.refCount);
      return Number.isFinite(cached) && cached > 0 ? cached : (counted[u.uid] || 0);
    };
    const start = monthStartMs();
    const ranked = users
      .map(u => ({ u, refs: rankOf(u), earned: Number(u.totalEarned) || 0 }))
      .sort((x, y) => (y.refs - x.refs) || (y.earned - x.earned) || String(x.u.name || '').localeCompare(String(y.u.name || '')))
      .slice(0, topN);

    const items = [];
    for (let i = 0; i < ranked.length; i++) {
      const { u, refs } = ranked[i];
      /* মাসিক আয় = চলতি মাসের trusted transaction (সবসময় server-side data) */
      let monthly = 0;
      try {
        const txSnap = await db.collection('users').doc(u.uid).collection('transactions').limit(250).get();
        for (const d of txSnap.docs || []) {
          const v = d.data() || {};
          if (whenOf(v.createdAt) >= start) monthly += Math.max(0, Number(v.amount) || 0);
        }
      } catch (_) { /* read fail → 0; page ভাঙবে না */ }
      const avatarSrc = String(u.photo || u.avatar || '');
      items.push({
        rank: i + 1,
        name: String(u.name || 'সদস্য').slice(0, 40),
        /* শুধু http(s) image URL — data:/javascript: img src-এ ঢুকলে XSS/বোঝা doc */
        avatar: /^https?:\/\/\S+$/i.test(avatarSrc) ? avatarSrc.slice(0, 300) : '',
        referrals: refs,
        monthlyIncome: Math.round(monthly * 100) / 100,
        totalEarned: Math.round((Number(u.totalEarned) || 0) * 100) / 100,
        mobile: maskMobile(u.mobile),      // 01712****89 — পুরো নম্বর কখনো যায় না
        isActive: !!u.isActive,
      });
    }
    return ok(res, {
      ok: true, items, top: topN, scanned: users.length,
      monthStart: new Date(start).toISOString().slice(0, 10),
    });
  } catch (err) {
    return opFail(res, err, 'Leaderboard পাওয়া যায়নি');
  }
}
