/* POST /api/admin/panel?op=read — admin panel-এর সব READ server থেকে (Admin SDK).

   KARON: panel browser theke sorasori Firestore porত (getDocs(collection(db,'users'))
   ইত্যাদি), jeta rules-er `isAdmin()`-er upor nirvor — `admins/<email>` doc-id er
   sathe signed-in email ektu-o na mile (casing/whitespace) ba live rules ektu
   different hole puro panel "Missing or insufficient permissions." dekhato, ar
   login+server verify pass korei gea. Admin SDK rules bypass kore, ar ekhane
   path/field allowlist hard-code — tai rules publish na korlei panel cholte pare.
   Notun Vercel function na: ?op=read, api/admin/panel.js router er moddhe
   (Hobby 12-function limit).

   Index-safe: kono orderBy query-e nei (single-field index-o lagte) — doc gulo
   JS-e sort hoy. `status` filter Firestore-where diyei hoy (equality → index na). */
import { getDb } from '../firebase-admin.js';
import { cors, fail, ok, readBody, requireAdmin, authReject, AUTH_OK, opFail } from '../http.js';
import { isFull, isSingleMode, requiredUsers, approvedCount, remainingOf } from '../../src/core/microjobs.js';

/* what → { path, adminOnly, status?, joinUser?, key?, sortBy?, dataOnly? } */
const LISTS = {
  /* jobSlug দিলে শুধু ওই job-এর submissions (একটাই where → composite index লাগে না;
     status পরে JS-য়ে ফিল্টার হয়) */
  proofs: { path: ['proofs'], adminOnly: true, status: true, joinUser: true, jobSlug: true },
  deposits: { path: ['deposits'], adminOnly: true, status: true, joinUser: true },
  withdrawals: { path: ['withdrawals'], adminOnly: true, status: true, joinUser: true },
  users: { path: ['users'], adminOnly: true, key: 'uid' },
  tasks: { path: ['tasks'], key: 'slug', sortBy: 'sort' },
  notices: { path: ['notices'], sortBy: 'sort' },
  'user-withdrawals': { path: ['users', ':uid', 'withdrawals'], adminOnly: true },
  'user-transactions': { path: ['users', ':uid', 'transactions'], adminOnly: true, dataOnly: true },
  'user-target-notices': { path: ['users', ':uid', 'targetNotices'], adminOnly: true },
};
const SINGLES = {
  user: { path: ['users', ':id'], adminOnly: true, key: 'uid' },
  settings: { path: ['settings', 'site'] },
};

const DEFAULT_LIMIT = 100;
const MAX_LIMIT = 500;
const UID_RE = /^[A-Za-z0-9_-]{2,128}$/;   /* path-safe id; Firebase uid সাধারণত 28 chars */
const ID_RE = /^[A-Za-z0-9_.@:-]{2,80}$/;

/* collection(a).doc(b).collection(c) chain — path array theke ref (subcollection support).
   ':uid' / ':id' placeholder path segment হিসেবেই বসে (doc id খালি হলে segment বাদ)। */
function refAt(db, path, uid, id) {
  const seg = path
    .map(p => (p === ':uid' ? String(uid || '') : p === ':id' ? String(id || '') : p))
    .filter(Boolean);
  let ref = db.collection(seg[0]);
  for (let i = 1; i < seg.length; i++) ref = i % 2 === 1 ? ref.doc(seg[i]) : ref.collection(seg[i]);
  return ref;   // id/path সব segement হিসেবেই বসে — নাহলে docRef-এ আবার doc() কল হতো
}

/* Timestamp | ISO string | number → ms (sort-er jonno; absent → 0) */
const whenOf = v => {
  if (!v) return 0;
  if (typeof v.toDate === 'function') { const d = v.toDate(); return d instanceof Date ? d.getTime() : 0; }
  if (typeof v === 'number') return v;
  const t = Date.parse(String(v));
  return Number.isFinite(t) ? t : 0;
};

export default async function handler(req, res) {
  if (cors(req, res)) return;
  if (req.method !== 'POST') return fail(res, 405, 'Method Not Allowed');
  const admin = await requireAdmin(req);
  if (admin.state !== AUTH_OK) return authReject(res, admin);
  if (!admin.isAdmin) return fail(res, 403, 'Admin access required');

  const body = await readBody(req);
  const what = String(body.what || '');
  const list = LISTS[what];
  const single = SINGLES[what];
  // 'jobs' = aggregate spec (কোনো single collection না) — তাই আলাদা করে allow
  if (!list && !single && what !== 'jobs' && what !== 'wallet' && what !== 'admins') return fail(res, 400, 'Unknown read target');

  const uid = String(body.uid || '');
  if ((list && list.path.includes(':uid')) || (single && single.path.includes(':uid'))) {
    if (!UID_RE.test(uid)) return fail(res, 400, 'Invalid uid');
  }
  const id = String(body.id || '');
  if (single && single.path.includes(':id') && !ID_RE.test(id)) return fail(res, 400, 'Invalid id');

  const limit = Math.max(1, Math.min(MAX_LIMIT, Number(body.limit) || DEFAULT_LIMIT));
  const status = String(body.status || '');
  const jobSlug = String(body.jobSlug || '').slice(0, 60);
  try {
    const db = getDb();

    /* what:'jobs' — admin-এর MicroJobs review: প্রতিটা job আলাদা row + ওর own
       aggregate (required / approved / pending / rejected / remaining / FULL)।
       একটা tasks scan + একটা proofs scan (per-job query না → index লাগে না)। */
    if (what === 'jobs') {
      const tSnap = await db.collection('tasks').limit(500).get();
      const pSnap = await db.collection('proofs').limit(1500).get();
      const rows = pSnap.docs || [];
      const agg = {};
      for (const d of rows) {
        const v = d.data() || {};
        const k = String(v.taskSlug || '');
        const a = agg[k] || (agg[k] = { total: 0, approved: 0, pending: 0, rejected: 0, hidden: 0 });
        a.total++;
        if (v.status === 'approved') a.approved++;
        else if (v.status === 'rejected') { a.rejected++; if (v.hiddenForUser) a.hidden++; }
        else a.pending++;
      }
      const truncated = rows.length >= 1500;
      let items = (tSnap.docs || []).map(d => {
        const t = { slug: d.id, ...(d.data() || {}) };
        const a = agg[t.slug] || { total: 0, approved: 0, pending: 0, rejected: 0, hidden: 0 };
        const need = requiredUsers(t);
        return {
          slug: t.slug, nameBn: t.nameBn || t.slug, nameEn: t.nameEn || '',
          image: typeof t.image === 'string' && (t.image.startsWith('http') || t.image.startsWith('data:image/')) ? t.image.slice(0, 120) : '',
          reward: Number(t.reward) || 0, enabled: t.enabled !== false, locked: !!t.locked,
          closed: !!t.closed || isFull(t), full: isFull(t), mode: isSingleMode(t) ? 'single' : 'marketplace',
          /* দুইটা সিস্টেম আলাদা: kind==='microjob' = Panel → MicroJobs থেকে বানানো job,
             'task' = পুরোনো account-sell টাস্ক — panel দুইটা আলাদা tab-এ দেখায় */
          kind: t.kind === 'microjob' ? 'microjob' : 'task',
          requiredUsers: need, approvedCount: approvedCount(t), remaining: remainingOf(t),
          /* proofs থেকে গনা count — admin নিজে doc edit করলেও যাতে সত্যি দেখে */
          approvedFromProofs: a.approved, pending: a.pending, rejected: a.rejected,
          hiddenRejected: a.hidden, totalSubmissions: a.total,
          sort: Number(t.sort) || 99, inputFields: Array.isArray(t.inputFields) ? t.inputFields.length : 0,
        };
      });
      /* kindFilter='microjob' → শুধু MicroJobs tab-এর job; 'task' → শুধু পুরোনো টাস্ক */
      const kindFilter = String(body.kindFilter || '');
      if (kindFilter === 'microjob' || kindFilter === 'task') items = items.filter(t => t.kind === kindFilter);
      items = items.filter(t => !jobSlug || t.slug === jobSlug);
      items.sort((a, b) => (a.sort || 99) - (b.sort || 99));
      return ok(res, { ok: true, what: 'jobs', count: items.length, countTruncated: truncated, items });
    }

    /* admin wallet (MicroJob publishing budget) — সব server থেকে হিসাব,
       client-এর পাঠানো balance/role কখনো ধরা হয় না */
    if (what === 'wallet') {
      const { readWallet } = await import('./wallet.js');
      const w = await readWallet(db, admin.email, Number(body.limit) || 20);
      return ok(res, { ok: true, what: 'wallet', email: admin.email, ...w });
    }
    /* admin list (role + balance) — শুধু Owner পুরো list দেখে; বাকিরা নিজেকেই দেখে */
    if (what === 'admins') {
      const { walletView } = await import('./wallet.js');
      const { roleOf, ROLE_OWNER } = await import('../../src/core/microjobs.js');
      const all = await db.collection('admins').limit(200).get();
      const me = ((await db.collection('admins').doc(String(admin.email)).get())?.data?.()) || {};
      const isOwner = roleOf(me) === ROLE_OWNER;
      let items = (all.docs || []).map(d => ({
        email: d.id, updatedAt: d.data()?.updatedAt || null, ...(walletView(d.data() || {})),
      }));
      if (!isOwner) items = items.filter(x => String(x.email).toLowerCase() === String(admin.email).toLowerCase());
      items.sort((a, b) => String(a.email).localeCompare(String(b.email)));
      return ok(res, { ok: true, what: 'admins', isOwner, count: items.length, items });
    }

    if (single) {
      const snap = await refAt(db, single.path, uid, id).get();
      if (!snap.exists) return ok(res, { ok: true, item: null });
      const keyName = single.key || 'id';
      const data = snap.data() || {};
      return ok(res, { ok: true, item: { [keyName]: id || snap.id, ...data } });
    }

    let queryRef = refAt(db, list.path, uid);
    /* proofs review: jobSlug থাকলে সেই filter-টাই primary (দুটো where একসাথে =
       composite index লাগত, আর index না থাকলে admin queue চুপচাপ খালি দেখাত) */
    const perJob = list.jobSlug && jobSlug;
    if (perJob) queryRef = queryRef.where('taskSlug', '==', jobSlug);
    else if (list.status && status && status !== 'all') queryRef = queryRef.where('status', '==', status);
    const snap = await queryRef.limit(perJob ? Math.max(limit, 300) : limit).get();
    const keyName = list.key || 'id';
    let items = (snap.docs || []).map(d => {
      const data = d.data() || {};
      return list.dataOnly ? { ...data } : { [keyName]: d.id, ...data };
    });

    if (perJob && status && status !== 'all') items = items.filter(x => x.status === status);
    if (list.sortBy) {
      items.sort((a, b) => (Number(a[list.sortBy]) || 99) - (Number(b[list.sortBy]) || 99));
    } else {
      items.sort((a, b) => whenOf(b.createdAt) - whenOf(a.createdAt));
    }
    items = items.slice(0, limit);

    /* user join — row প্রতি আলাদা HTTP call (N+1) এড়ানো হয়, এক function-এই হয়ে যায় */
    if (list.joinUser) {
      for (const it of items.slice(0, 100)) {
        const u = String(it.userId || it.uid || '');
        if (!UID_RE.test(u)) { it.user = null; continue; }
        try {
          const us = await db.collection('users').doc(u).get();
          it.user = us.exists ? { uid: u, ...(us.data() || {}) } : null;
        } catch (_) { it.user = null; }
      }
    }
    return ok(res, { ok: true, what, count: items.length, items });
  } catch (err) {
    return opFail(res, err, 'Read fail করেছে');
  }
}
