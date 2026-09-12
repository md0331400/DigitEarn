/* POST /api/proof/submit — ACCOUNT SELL SUBMISSION (user যে account বিক্রি করছে তার তথ্য).
   Marketplace model: user একদিনে একাধিক account জমা দিতে পারে (প্রতিটা আলাদা sale)।
   - Balance কখনো change হয় না এখানে — rate শুধু admin approve-এ (atomic)
   - Submitted fields task config-এর inputFields অনুযায়ী server-side validate হয়
   - DUPLICATE GUARD: একই account (username/email/UID) আগে জমা পড়লে reject —
     নিজের হোক বা অন্য user-এর, একই account দুবার বিক্রি করা যাবে না
   - Daily limit: task.dailyLimit (default 20) — spam রোধ
   - username/email server-এ user doc থেকে (client-এর কথা trust না)
   - userId = verified ID token-এর uid (client-এর uid ignore) */
import { getDb } from '../../lib/firebase-admin.js';
import {
  cors, fail, ok, readBody, authenticate, authReject, AUTH_OK, isTaskSlug, isEmail, ApiError,
  opFail, fieldMaxLen, fieldType, isSecretField, isProofImage,
} from '../../lib/http.js';
import { FieldValue } from 'firebase-admin/firestore';
/* job config + per-user state logic = src/core/microjobs.js (client আর server একই file
   import করে) — তাই "এই user-এর জন্য jobটা pending না approved" দুই পাশে আলাদাভাবে
   ভাবতে হয় না (drift হলে এক পাশে job ভুলভাবে lock/bypass হতো) */
import { isFull, isSingleMode, stateOf, ST } from '../../src/core/microjobs.js';

const DEFAULT_DAILY_LIMIT = 20;

/* Day key = UTC (client-এর todayStr()-ও এখন UTC — src/core/api.js)।
   এলোমেলো container TZ / browser local date হলে client আর server-এর "আজকের"
   key আলাদা হয়ে daily-limit + "আজকের জমা" লিস্ট ভুল দেখাতো। */
function today() {
  return new Date().toISOString().slice(0, 10);
}

/* account identity key — যে field দিয়ে account চেনা যায় (password/2FA বাদে প্রথম field).
   duplicate sale ধরার জন্য normalize করা হয়: lowercase + trim + @ প্রিফিক্স বাদ */
export function accountKeyOf(taskSlug, fields, data) {
  const idField = fields.find(f => f.type !== 'password' && String(f.label || '').trim());
  if (!idField) return '';
  const raw = String(data[String(idField.label).trim().slice(0, 50)] || '').trim().toLowerCase();
  if (!raw) return '';
  const norm = raw.replace(/^@+/, '').replace(/\s+/g, '');
  // Firestore doc id-safe (no '/')
  return `${taskSlug}__${norm}`.replace(/[/\\#?]/g, '_').slice(0, 200);
}

export default async function handler(req, res) {
  if (cors(req, res)) return;
  if (req.method !== 'POST') return fail(res, 405, 'Method Not Allowed');
  const a = await authenticate(req);
  if (a.state !== AUTH_OK) return authReject(res, a);
  const user = { uid: a.uid, email: a.email };
  const body = await readBody(req);
  const taskSlug = String(body.taskSlug || '');
  if (!isTaskSlug(taskSlug)) return fail(res, 400, 'Invalid task');

  const db = getDb();
  const uid = user.uid;

  // trusted task config (server-এই পড়ে — client-এর rate/amount কখনো নয়)
  const taskSnap = await db.collection('tasks').doc(taskSlug).get();
  if (!taskSnap.exists) {
    /* আগে শুধু "Project পাওয়া যায়নি" — admin বুঝতেই পারতেন না যে Firestore-এ সেই
       task-এর config doc-ই নেই (empty collection = fresh deploy)। এখন doc path +
       এক-ক্লিক সমাধান (?op=seed-tasks) বলে দেয়। */
    return fail(res, 404, `Project পাওয়া যায়নি (tasks/${taskSlug} doc নেই) — Admin: Panel → Micro Jobs → “Built-in list থেকে তৈরি করুন” চাপান`);
  }
  const task = { ...taskSnap.data(), slug: taskSlug };
  if (task.enabled === false) return fail(res, 400, 'এই প্রজেক্টটি বর্তমানে বন্ধ আছে');
  if (task.locked) return fail(res, 400, 'এই প্রজেক্টটি এখনো লক করা আছে');
  /* MicroJob: admin-এর প্রতিটা job = আলাদা post; requiredUsers পূরণ হলে job
     globally FULL/CLOSED — আর কোনো নতুন submit না (এই check server-এ, client trust না) */
  if (isFull(task)) return fail(res, 400, 'এই job-এর সব slot পূরণ হয়েছে (FULL/CLOSED) — অন্য job দেখুন');
  const reward = Number(task.reward) || 0;
  if (reward <= 0) return fail(res, 400, 'প্রজেক্টের rate সেট করা নেই');

  /* ---------- submitted fields validate (per admin config) ----------
     label = field key, type = admin-selected field type — দুটোই submission-এর সাথে
     snapshot হিসেবে save হয় (admin পরে field config বদলালেও পুরোনো submission সঠিকভাবে
     দেখানো যায়, আর password-type value mask করা যায়)। */
  const fields = Array.isArray(task.inputFields) ? task.inputFields : [];
  /* একটা task-এ সর্বোচ্চ ২০টা dynamic field (admin config) — নাহলে submission doc
     আর review queue অসীম বড় হতে পারে */
  if (fields.length > 20) return fail(res, 400, 'Field সংখ্যা ২০-এর বেশি হতে পারবে না');
  const submittedData = {};
  const submittedFields = [];
  if (fields.length) {
    if (typeof body.data !== 'object' || body.data === null || Array.isArray(body.data)) {
      return fail(res, 400, 'Submission data সঠিক নয়');
    }
    const known = new Set();
    for (const f of fields) {
      const label = typeof f.label === 'string' ? f.label.trim().slice(0, 50) : '';
      if (!label || known.has(label)) continue;
      known.add(label);
      const type = fieldType(f.type);
      const required = !!f.required;
      const raw = typeof body.data[label] === 'string' ? body.data[label].trim() : '';
      if (required && !raw) return fail(res, 400, `সব ফিল্ড পূরণ করুন (${label})`);
      const maxLen = fieldMaxLen(type);
      if (raw.length > maxLen) return fail(res, 400, `ফিল্ডটি অনেক লম্বা (${label})`);
      if (raw) {
        if (type === 'email' && !isEmail(raw)) return fail(res, 400, `সঠিক email দিন (${label})`);
        if (type === 'number' && !/^\d{1,30}(\.\d{1,6})?$/.test(raw)) return fail(res, 400, `সঠিক সংখ্যা দিন (${label})`);
        if (type === 'url' && !/^https?:\/\/\S+$/i.test(raw)) return fail(res, 400, `সঠিক লিংক দিন (${label})`);
        /* proof image: শুধু data:image/(png|jpeg|webp|gif);base64 — svg/html scheme ঢুকবে না */
        if (type === 'image' && !isProofImage(raw)) return fail(res, 400, `ছবিটি আবার তুলুন (PNG/JPG/WEBP) (${label})`);
      }
      submittedData[label] = raw;
      /* secret: true → admin UI value mask করে, reject হলে value মুছে যায় (lib/http.js) */
      submittedFields.push({ label, type, required, secret: isSecretField(label, type), value: raw });
    }
    // config-এর বাইরের field reject — arbitrary JSON save হয় না
    for (const k of Object.keys(body.data)) {
      if (!known.has(k)) return fail(res, 400, 'Submission-এ invalid field পাওয়া গেছে');
    }
    /* মোট সাইজ guard — textarea (২০০০ অক্ষর/ফিল্ড) যেন বৈধ submission না বোঝায়,
       তাই limit ২৪KB (Firestore doc limit 1MB-এর অনেক নিচে, review card-এর জন্যও যথেষ্ট) */
    /* image field থাকলে cap ৭০০KB (client canvas resize করা data URL) — Firestore-এর
       1MB doc limit-এর নিচেই থাকে; নাহলে আগের ২৪KB-ই যথেষ্ট */
    const sizeCap = (fields.some(f => fieldType(f.type) === 'image') ? 700 : 24) * 1024;
    if (JSON.stringify(submittedData).length > sizeCap) return fail(res, 400, 'Submission অনেক বড় — ছবি ছোট করে আবার চেষ্টা করুন');
  }

  const day = today();
  const userProofs = db.collection('users').doc(uid).collection('proofs');

  /* ---------- daily limit (spam রোধ) — একদিনে কত account বিক্রি করা যাবে ----------
     ⚠️ count টা transaction-এর ভেতরে পড়া হয় (আগে বাইরে ছিল): দুটো submit একসাথে
     এলে দুটোই "আজকের ৩টির মধ্যে ২টি" দেখে limit cross করে বসিয়ে দিত — per-task
     daily-limit তাই bypass-যোগ্য ছিল। */
  const dailyLimit = Math.max(1, Math.min(200, Number(task.dailyLimit) || DEFAULT_DAILY_LIMIT));
  const singleMode = isSingleMode(task);   // MicroJob = এক user একবার; পুরোনো account-sell flow = দিনে একাধিক

  /* ---------- DUPLICATE ACCOUNT GUARD ----------
     একই account (একই username/email/UID) আগে কেউ জমা দিলে আবার নেওয়া যাবে না।
     accountKeys/{key} একটা global reservation doc — transaction-এ create হয়,
     তাই race condition-এও দুটো একসাথে ঢুকতে পারে না। */
  /* accountKeys = marketplace (account sell) guard — একই account দুবার বিক্রি বন্ধ।
     MicroJob mode-এ এটা লাগে না, বরং ক্ষতিকর: দুই user একই রকম "work report" লিখলে
     দ্বিতীয়জন 409 খেত। per-user guard (উপরে)-ই এখানে যথেষ্ট। */
  const accountKey = singleMode ? '' : accountKeyOf(taskSlug, fields, submittedData);
  const keyRef = accountKey ? db.collection('accountKeys').doc(accountKey) : null;

  const userRef = db.collection('users').doc(uid);
  const now = FieldValue.serverTimestamp();
  const ts = Date.now();
  const rnd = Math.random().toString(36).slice(2, 8);
  const pid = `p_${ts}_${rnd}`;
  const proofData = {
    taskSlug, taskName: task.nameBn || taskSlug, day,
    images: [], reward, status: 'pending', note: '',
    submittedData, submittedFields, accountKey,
    createdAt: now, reviewedAt: null,
  };
  try {
    await db.runTransaction(async tx => {
      const userSnap = await tx.get(userRef);
      if (!userSnap.exists) throw new ApiError(409, 'আপনার প্রোফাইল পাওয়া যায়নি');
      const u = userSnap.data();
      if (!u.isActive) throw new ApiError(409, 'Account বিক্রি করতে আগে নিজের একাউন্ট অ্যাক্টিভ করুন');

      if (singleMode) {
        /* MICROJOB MODE — এক user = একটাই submission per job।
           pending → আবার চাপা যাবে না; approved → jobটা ওই user-এর জন্য শেষ;
           reject+hide → ওই user-এর list থেকে বন্ধ; reject+resubmit → আবার submit করা যাবে।
           ⚠️ read টা transaction-এর ভেতরে: বাইরে হলে দুটো parallel submit একসাথে
           "আমার কোনো submission নেই" দেখে দুটোই বসিয়ে দিত (duplicate credit)। */
        const mine = await tx.get(userProofs.where('taskSlug', '==', taskSlug).limit(50));
        const rows = mine.docs.map(d => ({ id: d.id, ...d.data() }));
        const st = stateOf(task, rows);
        if (st === ST.PENDING) throw new ApiError(409, 'আপনি এই job-এর কাজটি জমা দিয়েছেন — admin approval-এর অপেক্ষায় আছেন');
        if (st === ST.APPROVED) throw new ApiError(409, 'এই jobটি আপনি আগেই complete করেছেন — আবার জমা দেওয়া যাবে না');
        if (st === ST.HIDDEN) throw new ApiError(409, 'এই jobটি আপনার জন্য বন্ধ (rejected) — নতুন job করুন');
        if (st === ST.FULL || isFull(task)) throw new ApiError(409, 'এই job-এর সব slot পূরণ হয়েছে (FULL/CLOSED)');
      } else {
        const todayQ = await tx.get(userProofs.where('day', '==', day).limit(dailyLimit + 50));
        const todayForTask = todayQ.docs.filter(x => x.data().taskSlug === taskSlug && x.data().status !== 'rejected');
        if (todayForTask.length >= dailyLimit) {
          throw new ApiError(429, `আজকের জন্য সর্বোচ্চ ${dailyLimit}টি account জমা দেওয়া যায় — আগামীকাল আবার চেষ্টা করুন`);
        }
      }

      if (keyRef) {
        const kSnap = await tx.get(keyRef);
        if (kSnap.exists) {
          const k = kSnap.data();
          throw new ApiError(409, k.uid === uid
            ? 'এই account আপনি আগেই জমা দিয়েছেন — অন্য account দিন'
            : 'এই account আগেই বিক্রি হয়ে গেছে — অন্য account দিন');
        }
        tx.set(keyRef, { uid, taskSlug, proofId: pid, createdAt: now });
      }

      proofData.username = u.name || '';
      proofData.userEmail = u.email || '';
      tx.set(userProofs.doc(pid), proofData);
      // admin review queue (top-level mirror)
      tx.set(db.collection('proofs').doc(pid), { ...proofData, userId: uid });
    });
  } catch (err) {
    return opFail(res, err);
  }

  return ok(res, { id: pid });
}
