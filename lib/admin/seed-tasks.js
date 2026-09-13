/* POST /api/admin/panel?op=seed-tasks — Firestore-এ tasks/{slug} doc না থাকলে
   built-in list (src/tasks-data.js) থেকে তৈরি করে দেয়। IDEMPOTENT: যে doc গুলো
   আগে থেকেই আছে সেগুলো ছোঁয়া হয় না (rate/inputFields অক্ষত থাকে)।

   KARON: user proof submit korle api/proof/submit.js "Project পাওয়া যায়নি" (404)
   dit — seta user-er dosh chilo na, server-er `tasks/<slug>` config doc-i thaka
   jeto na (empty Firestore = fresh deploy/restore)। Ar admin panel-er
   listTasks() collection খালি হলে কোনো card-ই দেখাত না, মানে panel থেকে নতুন
   doc বানানোর উপায় ছিল না — deadlock। এই op টা এক ক্লিকে সেটা ঠিক করে
   (?op=... router, নতুন Vercel function না — Hobby 12-function limit)।
   Security: admin-only, কোনো secret লেখে না, শুধু built-in public content। */
import { getDb } from '../firebase-admin.js';
import { cors, fail, ok, readBody, requireAdmin, authReject, AUTH_OK } from '../http.js';
import { TASKS } from '../../src/tasks-data.js';

/* doc id-এর জন্য conservative slug shape (Firestore id-safe) */
const SLUG_RE = /^[a-z0-9][a-z0-9-]{1,60}$/;

export function taskDocOf(t) {
  const fields = Array.isArray(t.inputFields)
    ? t.inputFields
      .map(f => ({
        label: String((f && f.label) || '').trim().slice(0, 50),
        type: ['text', 'email', 'password', 'tel', 'number', 'url', 'textarea'].includes(f && f.type) ? f.type : 'text',
        placeholder: String((f && f.placeholder) || '').trim().slice(0, 60),
        required: !!(f && f.required),
      }))
      .filter(f => f.label)
    : [];
  return {
    slug: t.slug,
    nameBn: t.nameBn || '',
    nameEn: t.nameEn || '',
    icon: t.icon || '',
    color: t.color || '#f59e0b',
    reward: Number(t.reward) || 0,
    // URL একটাই চলবে: http/https (javascript:/data:/vbscript: বন্ধ — admin save-এর মতোই)
    url: /^https?:\/\/\S+$/i.test(t.url || '') ? t.url : '',
    locked: !!t.locked,
    enabled: t.enabled !== false,
    sort: Number(t.sort) || 10,
    steps: Array.isArray(t.steps) ? t.steps : [],
    videoUrl: t.videoUrl || '',
    description: t.description || '',
    password: t.password || '',
    submitLabel: t.submitLabel || '',
    historyLabel: t.historyLabel || '',
    /* 0 = আনলিমিটেড (account-sell rule) — আগের default 20 submit আটকাতে */
    dailyLimit: (() => { const v = Number(t.dailyLimit); return Number.isFinite(v) && v > 0 ? Math.min(200, Math.floor(v)) : 0; })(),
    inputFields: fields,
    seededFrom: 'src/tasks-data.js',
  };
}

export default async function handler(req, res) {
  if (cors(req, res)) return;
  if (req.method !== 'POST') return fail(res, 405, 'Method Not Allowed');
  const admin = await requireAdmin(req);
  if (admin.state !== AUTH_OK) return authReject(res, admin);
  if (!admin.isAdmin) return fail(res, 403, 'Admin access required');

  const body = await readBody(req).catch(() => ({}));
  const requested = Array.isArray(body && body.slugs) ? body.slugs.map(s => String(s)).filter(Boolean) : [];
  const only = requested.length ? new Set(requested) : null;

  const db = getDb();
  const created = [];
  const skipped = [];
  const invalid = [];
  for (const t of TASKS) {
    const slug = String(t.slug || '');
    if (only && !only.has(slug)) continue;
    if (!SLUG_RE.test(slug)) { invalid.push(slug); continue; }
    const ref = db.collection('tasks').doc(slug);
    let snap = null;
    try { snap = await ref.get(); } catch (_) { snap = null; }
    if (snap && snap.exists) { skipped.push(slug); continue; }
    try {
      await ref.set(taskDocOf(t));
      created.push(slug);
    } catch (e) {
      invalid.push(slug + ' (' + String((e && e.code) || (e && e.message) || e).slice(0, 40) + ')');
    }
  }
  const notFound = only ? [...only].filter(s => !TASKS.some(t => t.slug === s)) : [];
  return ok(res, {
    ok: invalid.length === 0,
    created, skipped, invalid, notFound,
    createdCount: created.length,
    skippedCount: skipped.length,
    available: TASKS.length,
    note: created.length
      ? 'Task doc তৈরি হয়েছে — user এখন submit করতে পারবে। Admin panel → Micro Jobs থেকে rate/field পরে বদলানো যাবে।'
      : (skipped.length ? 'সব doc আগে থেকেই ছিল, কিছুই বদলানো হয়নি।' : 'কোনো নতুন doc লাগেনি/পাওয়া যায়নি।'),
  });
}
