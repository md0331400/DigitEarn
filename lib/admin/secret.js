/* POST /api/admin/panel?op=secret — settings/secret doc (giftCode) admin-এর পড়া/লেখা।
   KARON: firestore.rules-e `settings/secret` browser theke read puroi bondho
   (`allow get, list: if false`) — admin panel-o client SDK diye seta porte parta na.
   Fatigap: panel-এ Gift Code field sob somoy khali dekhat, ar "Save Settings" chaple
   giftCode: '' likhe diye gift claim (POST /api/gift/claim) saradin 400 det —
   meaning: jekono settings save gift code mudhe dit. Ei endpoint ti Admin SDK diye
   (rules bypass) pore, tai panel dekhate o likhte pare parche.
   Login: verified ID token + admins/{email} doc — na thakle 403. */
import { getDb } from '../firebase-admin.js';
import { cors, fail, ok, readBody, requireAdmin, authenticate, authReject, AUTH_OK } from '../http.js';

export default async function handler(req, res) {
  if (cors(req, res)) return;
  if (req.method !== 'POST') return fail(res, 405, 'Method Not Allowed');
  const admin = await requireAdmin(req);
  if (admin.state !== AUTH_OK) return authReject(res, admin);   /* config/expiry = ভুল বার্তা নয় */
  if (!admin.isAdmin) return fail(res, 403, 'Admin access required');

  const body = await readBody(req);
  const db = getDb();
  const ref = db.collection('settings').doc('secret');

  // read: { get: true } → বর্তমান secret (panel prefill করার জন্য)
  if (body.get === true) {
    try {
      const snap = await ref.get();
      const d = snap.exists ? snap.data() : {};
      return ok(res, { giftCode: String(d.giftCode ?? '') });
    } catch (err) {
      return fail(res, 500, 'Secret পড়া যায়নি — আবার চেষ্টা করুন');
    }
  }

  // write: শুধু যেসব key অনুমোদিত সেগুলোই লেখে (arbitrary doc overwrite রোধ)
  const ALLOWED = ['giftCode'];
  const clearAll = body.__clear === true;
  const upd = {};
  for (const k of ALLOWED) {
    if (!(k in body)) continue; // key না থাকলে সেটা অক্ষত থাকবে
    const v = String(body[k] ?? '').trim().slice(0, 60);
    // খালি মান শুধু স্পষ্ট অনুরোধেই লেখা হয় — নাহলে ভুলবশত gift code মুছে যেত
    if (!v && !clearAll) continue;
    upd[k] = v;
  }
  if (!Object.keys(upd).length) return ok(res, { updated: [] });
  try {
    await ref.set(upd, { merge: true });
  } catch (err) {
    return fail(res, 500, 'Secret save করা যায়নি — আবার চেষ্টা করুন');
  }
  return ok(res, { updated: Object.keys(upd) });
}
