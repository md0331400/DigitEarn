/* GET /api/admin/notice-targeted — সব user-এর private targeted warning/notice এক জায়গায় (admin only).
   Browser-এ rules-এর কারণে অন্য user-এর targetNotices list করা যায় না — তাই admin panel-এর
   global list-এর জন্য এই server-side endpoint (Admin SDK = rules bypass, trusted)। */
import { getDb } from '../_lib/firebase-admin.js';
import { fail, ok, requireAdmin } from '../_lib/http.js';

const MAX_USERS = 300;   // বর্তমান scale-এ যথেষ্ট (ভবিষ্যতে index/query আলাদা করলে বড় করা যাবে)
const BATCH = 15;

export default async function handler(req, res) {
  if (req.method !== 'GET') return fail(res, 405, 'Method Not Allowed');
  const admin = await requireAdmin(req);
  if (!admin || !admin.isAdmin) return fail(res, 403, 'Admin access required');

  const db = getDb();
  try {
    const usersSnap = await db.collection('users').limit(MAX_USERS).get();
    const userDocs = usersSnap.docs.map(d => ({ uid: d.id, data: d.data() }));

    const targeted = [];
    for (let i = 0; i < userDocs.length; i += BATCH) {
      const batch = userDocs.slice(i, i + BATCH);
      const results = await Promise.all(batch.map(async ({ uid, data: u }) => {
        try {
          const n = await db.collection('users', uid, 'targetNotices').limit(20).get();
          return { uid, u, docs: n.docs.map(d => ({ id: d.id, ...d.data() })) };
        } catch (_) { return { uid, u, docs: [] }; }
      }));
      for (const { uid, u, docs } of results) {
        for (const nd of docs) {
          targeted.push({
            uid,
            userName: (u && u.name) || '',
            userMobile: (u && u.mobile) || '',
            id: nd.id,
            title: String(nd.title || '').slice(0, 60),
            body: String(nd.body || '').slice(0, 300),
            type: nd.type === 'warning' ? 'warning' : 'notice',
            enabled: !!nd.enabled,
            expiresAt: nd.expiresAt ? String(nd.expiresAt.toDate ? nd.expiresAt.toDate().toISOString().slice(0, 10) : nd.expiresAt) : '',
            createdAt: nd.createdAt && nd.createdAt.toDate ? nd.createdAt.toDate().toISOString() : '',
          });
        }
      }
    }
    return ok(res, { targeted });
  } catch (err) {
    return fail(res, 500, 'Notices load করতে পারিনি — আবার চেষ্টা করুন');
  }
}
