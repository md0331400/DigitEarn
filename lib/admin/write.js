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
  FIELD_TYPES, fieldMaxLen,
} from '../http.js';
import { FieldValue } from 'firebase-admin/firestore';

const SLUG_RE = /^[a-z0-9][a-z0-9-]{1,60}$/;
const ID_RE = /^[A-Za-z0-9_.@:-]{2,80}$/;
const str = (v, max) => String(v === undefined || v === null ? '' : v).trim().slice(0, max);
const num = (v, min, max, dflt = 0) => {
  const n = Number(v);
  if (!Number.isFinite(n)) return dflt;
  return Math.max(min, Math.min(max, n));
};

const TASK_KEYS = ['nameBn', 'nameEn', 'icon', 'color', 'reward', 'url', 'locked', 'enabled', 'sort',
  'steps', 'videoUrl', 'description', 'password', 'submitLabel', 'historyLabel', 'dailyLimit', 'inputFields'];
const TASK_TEXT = { nameBn: 60, nameEn: 60, icon: 60, color: 20, url: 300, videoUrl: 300, description: 600, password: 60, submitLabel: 40, historyLabel: 40 };

function cleanTaskFields(body) {
  const out = {};
  for (const k of TASK_KEYS) {
    if (!(k in body)) continue; // partial update: যে key নেই সেটা মোছা হবে না
    const v = body[k];
    if (k === 'reward') out.reward = num(v, 0, 10000, 0);
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
      out.updatedAt = FieldValue.serverTimestamp();
      await db.collection('tasks').doc(slug).set(out, { merge: true });
      return ok(res, { ok: true, slug, saved: true });
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
