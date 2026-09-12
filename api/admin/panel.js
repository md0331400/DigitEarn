/* /api/admin/panel — sob admin endpoint EKTA exact-path Vercel function-e dispatch hoy (?op= query param).
   KARON 1: Vercel Hobby plan-e ek deployment-e max 12 serverless function —
            6-ta alada file baale 17 function hoye limit over hoye deploy fail hoyechilo.
   KARON 2: api/admin/[...path].js catch-all EBONG 1-level api/admin.js duto-i Vercel cloud-e
            404 dileche (2-level api/user/check.js thik ache) — tai 2-level shape: api/admin/panel.js.
   Admin APK panel er callApi() ei format use kore:
     POST /api/admin/panel?op=verify
     POST /api/admin/panel?op=proof-review
     POST /api/admin/panel?op=deposit-review
     POST /api/admin/panel?op=set-active
     POST /api/admin/panel?op=withdrawal-review
     GET  /api/admin/panel?op=notice-targeted
     POST /api/admin/panel?op=secret          (settings/secret read+write — Admin SDK)
   POST /api/admin/panel?op=health          (auth/env self-check — "Login required" er karon ber korar jonno)
   POST /api/admin/panel?op=seed-tasks      (missing tasks/{slug} docs created from src/tasks-data.js)
   নতুন op যোগ করা = lib/admin/<name>.js + এই HANDLERS map — নতুন function file না। */
import { cors, fail } from '../../lib/http.js';
import { default as handleVerify } from '../../lib/admin/verify.js';
import { default as handleProofReview } from '../../lib/admin/proof-review.js';
import { default as handleDepositReview } from '../../lib/admin/deposit-review.js';
import { default as handleSetActive } from '../../lib/admin/set-active.js';
import { default as handleWithdrawalReview } from '../../lib/admin/withdrawal-review.js';
import { default as handleNoticeTargeted } from '../../lib/admin/notice-targeted.js';
import { default as handleSecret } from '../../lib/admin/secret.js';
import { default as handleHealth } from '../../lib/admin/health.js';
import { default as handleSeedTasks } from '../../lib/admin/seed-tasks.js';
import { default as handleRead } from '../../lib/admin/read.js';
import { default as handleWrite } from '../../lib/admin/write.js';

const HANDLERS = {
  verify: handleVerify,
  'proof-review': handleProofReview,
  'deposit-review': handleDepositReview,
  'set-active': handleSetActive,
  'withdrawal-review': handleWithdrawalReview,
  'notice-targeted': handleNoticeTargeted,
  secret: handleSecret,
  health: handleHealth,
  'seed-tasks': handleSeedTasks,
  /* panel-এর সব read/write এখান দিয়ে (Admin SDK = rules bypass) — browser direct
     read/write করলে rules-এর isAdmin() fail-এ পুরো panel অচল হয়ে যেত */
  read: handleRead,
  write: handleWrite,
};

export default async function handler(req, res) {
  if (cors(req, res)) return;
  let name = '';
  try {
    const u = new URL(req.url, 'http://localhost');
    name = u.searchParams.get('op') ||
      u.pathname.replace(/^\/api\/admin\/panel\/?/, '').replace(/\/+$/, '');
  } catch (_) { name = ''; }
  const h = HANDLERS[name];
  if (!h) return fail(res, 404, 'Unknown admin endpoint');
  return h(req, res);
}
