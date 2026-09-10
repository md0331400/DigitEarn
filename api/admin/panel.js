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
     GET  /api/admin/panel?op=notice-targeted */
import { cors, fail } from '../../lib/http.js';
import { default as handleVerify } from '../../lib/admin/verify.js';
import { default as handleProofReview } from '../../lib/admin/proof-review.js';
import { default as handleDepositReview } from '../../lib/admin/deposit-review.js';
import { default as handleSetActive } from '../../lib/admin/set-active.js';
import { default as handleWithdrawalReview } from '../../lib/admin/withdrawal-review.js';
import { default as handleNoticeTargeted } from '../../lib/admin/notice-targeted.js';

const HANDLERS = {
  verify: handleVerify,
  'proof-review': handleProofReview,
  'deposit-review': handleDepositReview,
  'set-active': handleSetActive,
  'withdrawal-review': handleWithdrawalReview,
  'notice-targeted': handleNoticeTargeted,
  health: async (req, res) => {
    // Diagnostic: env var presence booleans + cert() error code (no secrets)
    const env = {
      FIREBASE_TYPE: !!process.env.FIREBASE_TYPE,
      FIREBASE_PROJECT_ID: !!process.env.FIREBASE_PROJECT_ID,
      FIREBASE_PRIVATE_KEY: !!process.env.FIREBASE_PRIVATE_KEY,
    };
    // cert() error info (no private key data)
    let certError = null;
    try {
      const admin = require('firebase-admin');
      // Just check if the module loads; actual cert() won't run without keys
      if (admin && admin.credential) {
        // Probe: attempt a non-destructive check of credential config
        const cred = admin.credential.cert;
        // If we have the private key env var, try to detect common misconfig
        if (process.env.FIREBASE_PRIVATE_KEY) {
          // Check if the private key format looks valid (starts with "-----BEGIN")
          const keyPreview = process.env.FIREBASE_PRIVATE_KEY.substring(0, 20);
          certError = keyPreview.startsWith('-----BEGIN') ? null : 'possible malformed private key';
        }
      }
    } catch (e) {
      certError = 'cert() check failed: ' + (e.message || 'unknown');
    }
    return ok(res, { env, certError });
  },
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
