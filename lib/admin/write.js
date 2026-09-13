/* POST /api/admin/panel?op=write — admin panel-এর সব ছোট WRITE server থেকে
   (Admin SDK rules bypass করে)। আগে panel browser থেকে সরাসরি setDoc/updateDoc
   করত, যেটা rules-এর `isAdmin()` (admins/<email> doc-id exact match) ছাড়া
   "Missing or insufficient permissions." খেত — মানে Micro Jobs Save, Settings
   Save, Notice Send সব বন্ধ। এখানে field allowlist + sanitize আছে, তাই
   payload-এ যা ইচ্ছে লেখা যায় না।

   Notun Vercel function না: ?op=write — api/admin/panel.js router-এর ভেতর।
   settings/site doc PUBLIC read (site সেটা পড়ে), তাই secret-looking key এখানে
   ঢুকতে পারবে না (blocked না এলে giftCode/password settings/site-এ ফাঁস হতো)। */
import { getDb } from '../firebase-admin.js';
import {
  cors, fail, ok, readBody, requireAdmin, authReject, AUTH_OK, opFail,
  FIELD_TYPES, fieldMaxLen, isTaskSlug,
} from '../http.js';
import { FieldValue } from 'firebase-admin/firestore';
import { requiredUsers, approvedCount, MODE_SINGLE, MODE_MARKET } from '../../src/core/microjobs.js';

const SLUG_RE = /^[a-z0-9][a-z0-9-]{1,60}$/;
const ID_RE = /^[A-Za-z0-9_.@:-]{2,80}$/;
const str = (v, max) => String(v === undefined || v === null ? '' : v).trim().slice(0, max);
const num = (v, min, max, dflt = 0) => {
  const n = Number(v);
  if (!Number.isFinite(n)) return dflt;
  return Math.max(min, Math.min(max, n));
};

/* MicroJob-এর own data — প্রতিটা job আলাদা doc, তাই প্রতিটা card-এর image/title/
   requiredUsers/reward/remaining সব আলাদা। `approvedCount`/`closed` এখানে নেই:
   ওগুলো শুধু server (approve path) লেখে — admin form থেকে count manipulate করা যাবে না। */
const TASK_KEYS = ['nameBn', 'nameEn', 'icon', 'color', 'reward', 'url', 'locked', 'enabled', 'sort',
  'steps', 'videoUrl', 'description', 'password', 'submitLabel', 'historyLabel', 'dailyLimit', 'inputFields',
  'image', 'shortDesc', 'requiredUsers', 'mode', 'closed'];
/* MicroJobs = আলাদা সিস্টেম: kind==='microjob'-doc শুধু Panel → MicroJobs থেকে বানানো
   হয়, আর সেগুলোই user-এর মাইক্রো জব পেজে দেখায় (পুরোনো টাস্ক এখানে আসে না) */
const MJ_KIND = 'microjob';
const TASK_TEXT = { nameBn: 60, nameEn: 60, icon: 60, color: 20, url: 300, videoUrl: 300, description: 1500, password: 60, submitLabel: 40, historyLabel: 40, shortDesc: 200 };
/* job image: admin panel canvas resize করা data URL (Firestore 1MB doc limit-এর নিচে)
   বা সরাসরি https URL দুটোই চলে */
const IMG_DATA_RE = /^data:image\/(png|jpe?g|webp|gif);base64,[A-Za-z0-9+/=\s]{24,}$/;
const IMG_DATA_MAX = 700 * 1024;
const slugify = v => String(v || '').toLowerCase().trim()
  .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40);

function cleanTaskFields(body) {
  const out = {};
  for (const k of TASK_KEYS) {
    if (!(k in body)) continue; // partial update: যে key নেই সেটা মোছা হবে না
    const v = body[k];
    if (k === 'reward') out.reward = num(v, 0, 10000, 0);
    else if (k === 'requiredUsers') out.requiredUsers = Math.max(0, Math.floor(num(v, 0, 1000000, 0)));
    else if (k === 'mode') out.mode = v === MODE_MARKET ? MODE_MARKET : v === MODE_SINGLE ? MODE_SINGLE : MODE_SINGLE;
    else if (k === 'closed') out.closed = !!v;
    else if (k === 'image') {
      const im = str(v, IMG_DATA_MAX);
      if (im && !IMG_DATA_RE.test(im) && !/^https:\/\/\S+$/i.test(im)) return { error: 'Job image PNG/JPG/WEBP data URL বা https:// লিংক হতে হবে' };
      out.image = im;
    }
    else if (k === 'sort') out.sort = num(v, 1, 999, 10);
    else if (k === 'dailyLimit') out.dailyLimit = num(v, 1, 200, 20);
    else if (k === 'locked' || k === 'enabled') out[k] = !!v;
    else if (k === 'steps') {
      out.steps = (Array.isArray(v) ? v : []).map(s => str(s, 300)).filter(Boolean).slice(0, 20);
    } else if (k === 'inputFields') {
      const seen = new Set();
      out.inputFields = (Array.isArray(v) ? v : []).map(f => ({
        label: str(f && f.label, 50),
        type: FIELD_TYPES.includes(f && f.type) ? f.type : 'text',
        placeholder: str(f && f.placeholder, 60),
        maxLength: num(f && f.maxLength, 10, fieldMaxLen(f && f.type), fieldMaxLen(f && f.type)),
        required: !!(f && f.required),
      })).filter(f => f.label && !seen.has(f.label) && seen.add(f.label));
    } else out[k] = str(v, TASK_TEXT[k] || 120);
  }
  /* URL: শুধু http/https — javascript:/data:/vbscript: task page হয়ে user-এর
     token চুরি করতে পারত (client-এও check আছে, server final gate) */
  if ('url' in out && out.url && !/^https?:\/\/\S+$/i.test(out.url)) return { error: 'Task URL শুধু http:// বা https:// দিয়ে শুরু হতে পারে' };
  if ('videoUrl' in out && out.videoUrl && !/^(https?:\/\/\S+|[\w.-]+\.mp4)$/i.test(out.videoUrl)) out.videoUrl = '';
  return { out };
}

/* settings/site public → secret/money-critical key block করা হয় (giftCode এর
   জন্য আলাদা ?op=secret endpoint আছে) */
const SETTINGS_BLOCKED = /^(gift|password|passwd|secret|private|token|apikey|api_?key|serviceaccount|otp)/i;
const SETTINGS_MAX_KEYS = 40;
function cleanSettings(body) {
  const src = body && typeof body.data === 'object' && body.data ? body.data : {};
  const out = {};
  const skipped = [];
  for (const k of Object.keys(src).slice(0, SETTINGS_MAX_KEYS * 2)) {
    if (SETTINGS_BLOCKED.test(k)) { skipped.push(k); continue; }
    const v = src[k];
    if (typeof v === 'string') out[k] = v.slice(0, 2000);
    else if (typeof v === 'number' && Number.isFinite(v)) out[k] = v;
    else if (typeof v === 'boolean') out[k] = v;
    else if (Array.isArray(v)) out[k] = v.slice(0, 50);
    /* object/null/undefined skip — নাহলে nested junk বা `undefined` লিখে ফেলত */
  }
  return { out, skipped };
}

const noticeBody = b => {
  const out = {
    title: str(b.title, 60),
    body: str(b.body, 300),
    type: b.type === 'warning' ? 'warning' : 'notice',
  };
  if ('enabled' in b) out.enabled = !!b.enabled;
  if ('sort' in b) out.sort = num(b.sort, 1, 999, 10);
  const e = b.expiresAt;
  const ms = typeof e === 'number' ? e : (e && typeof e.getTime === 'function' ? e.getTime() : Date.parse(String(e || '')));
  if (Number.isFinite(ms) && ms > 0) out.expiresAt = new Date(ms);
  else if (!('expiresAt' in b)) { /* key না থাকলে ছোঁয়া না */ } else out.expiresAt = null;
  return out;
};

export default async function handler(req, res) {
  if (cors(req, res)) return;
  if (req.method !== 'POST') return fail(res, 405, 'Method Not Allowed');
  const admin = await requireAdmin(req);
  if (admin.state !== AUTH_OK) return authReject(res, admin);
  if (!admin.isAdmin) return fail(res, 403, 'Admin access required');

  const body = await readBody(req);
  const what = String(body.what || '');
  try {
    const db = getDb();

    if (what === 'task') {
      const slug = str(body.slug, 60);
      if (!SLUG_RE.test(slug)) return fail(res, 400, 'Invalid task slug');
      const { out, error } = cleanTaskFields(body.data || {});
      if (error) return fail(res, 400, error);
      /* requiredUsers বাড়ালে slot খোলে — তখন FULL/CLOSED আপনি-আপনি উঠে যায়
         (নাহলে job চিরকাল বন্ধই থাকত) */
      if ('requiredUsers' in out) {
        const cur = await db.collection('tasks').doc(slug).get();
        const done = approvedCount(cur.exists ? (cur.data() || {}) : {});
        if (out.requiredUsers === 0 || out.requiredUsers > done) out.closed = false;
      }
      out.updatedAt = FieldValue.serverTimestamp();
      await db.collection('tasks').doc(slug).set(out, { merge: true });
      return ok(res, { ok: true, slug, saved: true });
    }

    /* নতুন Microjob = নতুন tasks/{slug} doc — admin যত job বানায়, ততটা আলাদা
       user-facing card (কোনো merge/limit নেই) */
    if (what === 'task-create') {
      const data = body.data && typeof body.data === 'object' && !Array.isArray(body.data) ? body.data : {};
      const nameBn = str(data.nameBn || data.title, 60);
      if (nameBn.length < 2) return fail(res, 400, 'Job Title দরকার (২+ অক্ষর)');
      let slug = str(body.slug || data.slug, 60);
      slug = slug ? slugify(slug) : (slugify(nameBn) || 'job-' + Date.now().toString(36));
      if (!SLUG_RE.test(slug)) slug = 'job-' + Date.now().toString(36).slice(-6);
      if (!isTaskSlug(slug)) return fail(res, 400, 'Invalid slug');
      const ref = db.collection('tasks').doc(slug);
      const exists = await ref.get();
      if (exists.exists) return fail(res, 409, 'এই slug-এর job আগে থেকেই আছে: ' + slug);
      const asMicrojob = data.kind === MJ_KIND;
      const { out, error } = cleanTaskFields({ ...data, nameBn });
      if (error) return fail(res, 400, error);
      const need = requiredUsers({ requiredUsers: data.requiredUsers });
      /* MicroJob = limited job: Required Users ছাড়া মানেই নেই (remaining হিসাব),
         তাই minimum ১ — নাহলে "কতজন বাকি" বোঝা যায় না */
      if (asMicrojob && need < 1) return fail(res, 400, 'MicroJob-এর জন্য Required Users (১+) দিতে হবে');
      const now = FieldValue.serverTimestamp();
      const doc = {
        ...out,
        nameBn, enabled: data.enabled === false ? false : true,
        locked: false, sort: num(data.sort, 1, 999, 100),
        reward: num(data.reward, 0, 10000, 0),
        requiredUsers: need,
        /* MicroJob mode: এক user একবারই — approved হলে ওই user থেকে job লুকানো */
        mode: asMicrojob ? MODE_SINGLE : (out.mode || MODE_SINGLE),
        ...(asMicrojob ? { kind: MJ_KIND } : {}),
        approvedCount: 0, pendingCount: 0, closed: false,
        createdAt: now, updatedAt: now, createdBy: admin.uid,
      };
      await ref.set(doc);
      return ok(res, { ok: true, slug, created: true, kind: doc.kind || 'task', mode: doc.mode, requiredUsers: doc.requiredUsers });
    }

    /* Leaderboard = existing referral system-এর উপর (users/{uid}/team docs)।
       refCount cache field-টা একবার sync করে নিলে top-4 query সস্তা হয়। */
    /* job/টাস্ক doc মুছে ফেলা (admin Panel → মুছুন বাটন) — ভুলে বানানো job বা
       বন্ধ করে দেওয়া পুরোনো job সরিয়ে ফেলার জন্য। pending submission থাকলে বাদ:
       নাহলে user-এর জমাটির config হারিয়ে admin-এর review-ই করা যেত না। */
    if (what === 'task-delete') {
      const slug = str(body.slug, 60);
      if (!SLUG_RE.test(slug)) return fail(res, 400, 'Invalid task slug');
      const ref = db.collection('tasks').doc(slug);
      const snap = await ref.get();
      if (!snap.exists) return fail(res, 404, 'এই slug-এর কোনো job/doc নেই');
      const pSnap = await db.collection('proofs').limit(1500).get();
      const pending = (pSnap.docs || []).filter(x => {
        const p = x.data() || {};
        return p.taskSlug === slug && String(p.status || '') === 'pending';
      }).length;
      if (pending) return fail(res, 409, `এই job-এ ${pending}টা pending submission আছে — আগে approve/reject করুন, তারপর মুছুন`);
      await ref.delete();
      return ok(res, { ok: true, slug, deleted: true });
    }

    /* refCount cache = বৈধ রেফারেল (যে রেফার-করা সদস্যের একাউন্ট একটিভ) —
       Leaderboard-এর হুবহু সেই হিসাব, যাতে panel সংখ্যা আর page সংখ্যা মিলে যায় */
    if (what === 'leaderboard-backfill') {
      const snap = await db.collection('users').limit(500).get();
      const all = (snap.docs || []).map(d => ({ uid: d.id, ...(d.data() || {}) }));
      const valid = {};
      for (const u of all) {
        const parent = String(u.refBy || '');
        if (parent && u.isActive === true) valid[parent] = (valid[parent] || 0) + 1;
      }
      let updated = 0, failed = 0;
      for (const u of all) {
        try {
          await db.collection('users').doc(u.uid).set({ refCount: valid[u.uid] || 0 }, { merge: true });
          updated++;
        } catch (_) { failed++; }
      }
      return ok(res, { ok: true, updated, failed, scanned: all.length });
    }

    if (what === 'settings') {
      const { out, skipped } = cleanSettings(body);
      if (!Object.keys(out).length) return ok(res, { ok: true, saved: false, skipped, note: 'কোনো field লেখা হয়নি' });
      out.updatedAt = FieldValue.serverTimestamp();
      await db.collection('settings').doc('site').set(out, { merge: true });
      return ok(res, { ok: true, saved: true, skipped });
    }

    if (what === 'notice-add' || what === 'notice-update' || what === 'notice-delete') {
      const data = noticeBody(body);
      if (what === 'notice-delete') {
        const id = str(body.id, 80);
        if (!ID_RE.test(id)) return fail(res, 400, 'Invalid notice id');
        await db.collection('notices').doc(id).delete();
        return ok(res, { ok: true, deleted: id });
      }
      if (what === 'notice-add') {
        if (!data.title && !data.body) return fail(res, 400, 'Title বা Notice/Warning — অন্তত একটা লাগবে');
        const ref = db.collection('notices').doc();
        await ref.set({
          ...data, targetType: 'all', enabled: true, sort: num(body.sort, 1, 999, 10),
          createdAt: FieldValue.serverTimestamp(),
        });
        return ok(res, { ok: true, id: ref.id });
      }
      const id = str(body.id, 80);
      if (!ID_RE.test(id)) return fail(res, 400, 'Invalid notice id');
      await db.collection('notices').doc(id).update(data);
      return ok(res, { ok: true, id });
    }

    return fail(res, 400, 'Unknown write target');
  } catch (err) {
    return opFail(res, err, 'Save fail করেছে');
  }
}
