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
import { cors, fail, ok, readBody, verifyUser, isTaskSlug, isEmail } from '../../lib/http.js';
import { FieldValue } from 'firebase-admin/firestore';

const FIELD_TYPES = ['text', 'email', 'password', 'tel', 'number', 'url'];
const DEFAULT_DAILY_LIMIT = 20;

function today() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
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
  const user = await verifyUser(req);
  if (!user) return fail(res, 401, 'Login required');
  const body = await readBody(req);
  const taskSlug = String(body.taskSlug || '');
  if (!isTaskSlug(taskSlug)) return fail(res, 400, 'Invalid task');

  const db = getDb();
  const uid = user.uid;

  // trusted task config (server-এই পড়ে — client-এর rate/amount কখনো নয়)
  const taskSnap = await db.collection('tasks').doc(taskSlug).get();
  if (!taskSnap.exists) return fail(res, 404, 'Project পাওয়া যায়নি');
  const task = taskSnap.data();
  if (task.enabled === false) return fail(res, 400, 'এই প্রজেক্টটি বর্তমানে বন্ধ আছে');
  if (task.locked) return fail(res, 400, 'এই প্রজেক্টটি এখনো লক করা আছে');
  const reward = Number(task.reward) || 0;
  if (reward <= 0) return fail(res, 400, 'প্রজেক্টের rate সেট করা নেই');

  /* ---------- submitted fields validate (per admin config) ---------- */
  const fields = Array.isArray(task.inputFields) ? task.inputFields : [];
  const submittedData = {};
  if (fields.length) {
    if (typeof body.data !== 'object' || body.data === null || Array.isArray(body.data)) {
      return fail(res, 400, 'Submission data সঠিক নয়');
    }
    const known = new Set();
    for (const f of fields) {
      const label = typeof f.label === 'string' ? f.label.trim().slice(0, 50) : '';
      if (!label || known.has(label)) continue;
      known.add(label);
      const type = FIELD_TYPES.includes(f.type) ? f.type : 'text';
      const required = !!f.required;
      const raw = typeof body.data[label] === 'string' ? body.data[label].trim() : '';
      if (required && !raw) return fail(res, 400, `সব ফিল্ড পূরণ করুন (${label})`);
      const maxLen = type === 'url' ? 300 : type === 'email' ? 120 : type === 'tel' ? 20 : 100;
      if (raw.length > maxLen) return fail(res, 400, `ফিল্ডটি অনেক লম্বা (${label})`);
      if (raw) {
        if (type === 'email' && !isEmail(raw)) return fail(res, 400, `সঠিক email দিন (${label})`);
        if (type === 'number' && !/^\d{1,30}(\.\d{1,6})?$/.test(raw)) return fail(res, 400, `সঠিক সংখ্যা দিন (${label})`);
        if (type === 'url' && !/^https?:\/\/\S+$/i.test(raw)) return fail(res, 400, `সঠিক লিংক দিন (${label})`);
      }
      submittedData[label] = raw;
    }
    // config-এর বাইরের field reject — arbitrary JSON save হয় না
    for (const k of Object.keys(body.data)) {
      if (!known.has(k)) return fail(res, 400, 'Submission-এ invalid field পাওয়া গেছে');
    }
    if (JSON.stringify(submittedData).length > 4096) return fail(res, 400, 'Submission অনেক বড়');
  }

  const day = today();
  const userProofs = db.collection('users').doc(uid).collection('proofs');

  /* ---------- daily limit (spam রোধ) — একদিনে কত account বিক্রি করা যাবে ---------- */
  const dailyLimit = Math.max(1, Math.min(200, Number(task.dailyLimit) || DEFAULT_DAILY_LIMIT));
  const todayQ = await userProofs.where('day', '==', day).limit(dailyLimit + 50).get();
  const todayForTask = todayQ.docs.filter(d => d.data().taskSlug === taskSlug && d.data().status !== 'rejected');
  if (todayForTask.length >= dailyLimit) {
    return fail(res, 429, `আজকের জন্য সর্বোচ্চ ${dailyLimit}টি account জমা দেওয়া যায় — আগামীকাল আবার চেষ্টা করুন`);
  }

  /* ---------- DUPLICATE ACCOUNT GUARD ----------
     একই account (একই username/email/UID) আগে কেউ জমা দিলে আবার নেওয়া যাবে না।
     accountKeys/{key} একটা global reservation doc — transaction-এ create হয়,
     তাই race condition-এও দুটো একসাথে ঢুকতে পারে না। */
  const accountKey = accountKeyOf(taskSlug, fields, submittedData);
  const keyRef = accountKey ? db.collection('accountKeys').doc(accountKey) : null;

  const userRef = db.collection('users').doc(uid);
  const now = FieldValue.serverTimestamp();
  const ts = Date.now();
  const rnd = Math.random().toString(36).slice(2, 8);
  const pid = `p_${ts}_${rnd}`;
  const proofData = {
    taskSlug, taskName: task.nameBn || taskSlug, day,
    images: [], reward, status: 'pending', note: '',
    submittedData, accountKey,
    createdAt: now, reviewedAt: null,
  };
  try {
    await db.runTransaction(async tx => {
      const userSnap = await tx.get(userRef);
      if (!userSnap.exists) throw new Error('আপনার প্রোফাইল পাওয়া যায়নি');
      const u = userSnap.data();
      if (!u.isActive) throw new Error('Account বিক্রি করতে আগে নিজের একাউন্ট অ্যাক্টিভ করুন');

      if (keyRef) {
        const kSnap = await tx.get(keyRef);
        if (kSnap.exists) {
          const k = kSnap.data();
          throw new Error(k.uid === uid
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
    return fail(res, 409, err.message || 'Operation fail হয়েছে');
  }

  return ok(res, { id: pid });
}
