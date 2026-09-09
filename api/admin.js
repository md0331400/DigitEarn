/* /api/admin/* — sob admin endpoint EKTA Vercel function-e dispatch hoy.
   KARON: Vercel Hobby plan-e ek deployment-e max 12 serverless function —
   6-ta alada file thakle 17 function hoye limit over hoye deploy fail korechilo.
   Route paths PORECHI (client change lagbe na):
     POST /api/admin/verify
     POST /api/admin/proof-review
     POST /api/admin/deposit-review
     POST /api/admin/set-active
     POST /api/admin/withdrawal-review
     GET  /api/admin/notice-targeted */
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
  let seg = '';
  try {
    seg = new URL(req.url, 'http://localhost').pathname.replace(/^\/api\/admin\/?/, '').replace(/\/+$/, '');
  } catch (_) { seg = ''; }
  const h = HANDLERS[seg];
  if (!h) return fail(res, 404, 'Unknown admin endpoint');
  return h(req, res);
}
