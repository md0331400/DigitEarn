/* POST /api/proof/submit — TASK SUBMISSION (user-এর input fields + pending status).
   - Balance কখনো change হয় না এখানে — reward শুধু admin approve-এ (atomic)
   - Submitted fields task config-এর inputFields অনুযায়ী server-side validate হয়
   - username/email server-এ user doc থেকে (client-এর কথা trust না)
   - userId = verified ID token-এর uid (client-এর uid ignore) */
import { getDb } from '../../lib/firebase-admin.js';
import { fail, ok, readBody, verifyUser, isTaskSlug, isEmail } from '../../lib/http.js';
import { FieldValue } from 'firebase-admin/firestore';

const FIELD_TYPES = ['text', 'email', 'password', 'tel', 'number', 'url'];

function today() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return fail(res, 405, 'Method Not Allowed');
  const user = await verifyUser(req);
  if (!user) return fail(res, 401, 'Login required');
  const body = await readBody(req);
  const taskSlug = String(body.taskSlug || '');
  if (!isTaskSlug(taskSlug)) return fail(res, 400, 'Invalid task');

  const db = getDb();
  const uid = user.uid;
  const userRef = db.collection('users').doc(uid);

  // Fail closed before any submission lookup/write. The transaction below repeats
  // this check to protect against an account being deactivated during a request.
  const userSnap = await userRef.get();
  if (!userSnap.exists || userSnap.data().isActive !== true) {
    return fail(res, 403, 'Submission submit করতে একাউন্ট অ্যাক্টিভ করুন');
  }

  // trusted task config (server-এই পড়ে — client-এর reward/amount কখনো নয়)
  const taskSnap = await db.collection('tasks').doc(taskSlug).get();
  if (!taskSnap.exists) return fail(res, 404, 'Task পাওয়া যায়নি');
  const task = taskSnap.data();
  if (task.enabled === false) return fail(res, 400, 'এই টাস্কটি বর্তমানে বন্ধ আছে');
  if (task.locked) return fail(res, 400, 'এই টাস্কটি এখনো লক করা আছে');
  const reward = Number(task.reward) || 0;
  if (reward <= 0) return fail(res, 400, 'টাস্কের রিওয়ার্ড সেট করা নেই');

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

  /* ---------- one-submission-per-day guard (pending/approved block, rejected-তে retry possible) ----------
     single-field query (day) — composite index লাগে না */
  const day = today();
  const existingQ = await db.collection('users', uid, 'proofs').where('day', '==', day).limit(20).get();
  for (const d of existingQ.docs) {
    const p = d.data();
    if (p.taskSlug !== taskSlug) continue;
    if (p.status !== 'rejected') return fail(res, 409, 'আজ এই টাস্কের submission আগেই আছে — review-এর অপেক্ষায় থাকুন');
  }

  const now = FieldValue.serverTimestamp();
  const ts = Date.now();
  const rnd = Math.random().toString(36).slice(2, 8);
  const pid = `p_${ts}_${rnd}`;
  const proofData = {
    taskSlug, taskName: task.nameBn || taskSlug, day,
    images: [], reward, status: 'pending', note: '',
    submittedData,
    createdAt: now, reviewedAt: null,
  };
  try {
    await db.runTransaction(async tx => {
      const userSnap = await tx.get(userRef);
      if (!userSnap.exists) throw new Error('আপনার প্রোফাইল পাওয়া যায়নি');
      const u = userSnap.data();
      if (u.isActive !== true) throw new Error('Submission submit করতে একাউন্ট অ্যাক্টিভ করুন');
      proofData.username = u.name || '';
      proofData.userEmail = u.email || '';
      tx.set(db.collection('users', uid, 'proofs').doc(pid), proofData);
      // admin review queue (top-level mirror)
      tx.set(db.collection('proofs').doc(pid), { ...proofData, userId: uid });
    });
  } catch (err) {
    return fail(res, 409, err.message || 'Operation fail হয়েছে');
  }

  return ok(res, { id: pid });
}
