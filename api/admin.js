/* /api/admin — sob admin endpoint EKTA exact-path Vercel function-e dispatch hoy (?op= query param).
   KARON 1: Vercel Hobby plan-e ek deployment-e max 12 serverless function —
            6-ta alada file baale 17 function hoye limit over hoye deploy fail hoyechilo.
   KARON 2: api/admin/[...path].js catch-all Vercel-e match na koreche (404) —
            tai exact file + ?op= dispatch. Admin APK panel er callApi() ei format use kore:
     POST /api/admin?op=verify
     POST /api/admin?op=proof-review
     POST /api/admin?op=deposit-review
     POST /api/admin?op=set-active
     POST /api/admin?op=withdrawal-review
     GET  /api/admin?op=notice-targeted
   (path-segment fallback: /api/admin/verify o thakbe — local/test-e) */
import { cors, fail } from '../lib/http.js';
import { default as handleVerify } from '../lib/admin/verify.js';
import { default as handleProofReview } from '../lib/admin/proof-review.js';
import { default as handleDepositReview } from '../lib/admin/deposit-review.js';
import { default as handleSetActive } from '../lib/admin/set-active.js';
import { default as handleWithdrawalReview } from '../lib/admin/withdrawal-review.js';
import { default as handleNoticeTargeted } from '../lib/admin/notice-targeted.js';

const HANDLERS = {
  verify: handleVerify,
  'proof-review': handleProofReview,
  'deposit-review': handleDepositReview,
  'set-active': handleSetActive,
  'withdrawal-review': handleWithdrawalReview,
  'notice-targeted': handleNoticeTargeted,
};

export default async function handler(req, res) {
  if (cors(req, res)) return;
  let name = '';
  try {
    const u = new URL(req.url, 'http://localhost');
    name = u.searchParams.get('op') ||
      u.pathname.replace(/^\/api\/admin\/?/, '').replace(/\/+$/, '');
  } catch (_) { name = ''; }
  const h = HANDLERS[name];
  if (!h) return fail(res, 404, 'Unknown admin endpoint');
  return h(req, res);
}
