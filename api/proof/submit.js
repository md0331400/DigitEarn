/* POST /api/proof/submit — user নিজের task proof submit (status=pending, reward server-এর).
   Approve/reject শুধু admin API-তে। */
import { getDb } from '../_lib/firebase-admin.js';
import { fail, ok, readBody, verifyUser, isTaskSlug } from '../_lib/http.js';
import { FieldValue } from 'firebase-admin/firestore';

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
  const taskSnap = await db.collection('tasks').doc(taskSlug).get();
  if (!taskSnap.exists) return fail(res, 404, 'Task পাওয়া যায়নি');
  const task = taskSnap.data();
  if (task.enabled === false || task.locked) return fail(res, 400, 'এই টাস্কের proof submit করা যাবে না');
  const reward = Number(task.reward) || 0;
  if (reward <= 0) return fail(res, 400, 'টাস্কের রিওয়ার্ড সেট করা নেই');

  // today-এর existing proof (pending/approved থাকলে block)
  const q = await db.collection('users', uid, 'proofs')
    .where('taskSlug', '==', taskSlug).where('day', '==', today()).limit(1).get();
  if (!q.empty) {
    const st = q.docs[0].data().status;
    if (st !== 'rejected') return fail(res, 409, 'আজ এই টাস্কের proof ইতিমধ্যে submit করা আছে — review-এর অপেক্ষায় থাকুন');
  }

  const userRef = db.collection('users').doc(uid);
  const now = FieldValue.serverTimestamp();
  const ts = Date.now();
  const rnd = Math.random().toString(36).slice(2, 8);
  const pid = `p_${ts}_${rnd}`;
  const proofData = {
    taskSlug, taskName: task.nameBn || taskSlug, day: today(),
    images: [], reward, status: 'pending', note: '',
    createdAt: now, reviewedAt: null,
  };
  try {
    await db.runTransaction(async tx => {
      const userSnap = await tx.get(userRef);
      if (!userSnap.exists()) throw new Error('আপনার প্রোফাইল পাওয়া যায়নি');
      if (!userSnap.data().isActive) throw new Error('Proof submit করতে একাউন্ট অ্যাক্টিভ করুন');
      tx.set(db.collection('users', uid, 'proofs').doc(pid), proofData);
      // admin review queue (top-level mirror)
      tx.set(db.collection('proofs').doc(pid), { ...proofData, userId: uid });
    });
  } catch (err) {
    return fail(res, 409, err.message || 'Operation fail হয়েছে');
  }

  return ok(res, { id: pid });
}
