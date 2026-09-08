/* DigitEarn API security tests — in-memory mocks, no Firebase needed.
   Run: node --import ./tests/register.mjs tests/run.mjs */
import { store } from './mocks/firestore-fake.mjs';

const submitH = (await import('../api/proof/submit.js')).default;
const reviewH = (await import('../admin/api/admin/proof-review.js')).default;

/* ---------- helpers ---------- */
function req(method, headers, body) {
  return {
    method,
    headers,
    on(ev, cb) {
      if (ev === 'data' && body !== undefined) setImmediate(() => cb(Buffer.from(JSON.stringify(body))));
      if (ev === 'end') setImmediate(() => cb());
    },
  };
}
function res() {
  return { statusCode: 0, headers: {}, body: '', setHeader() {}, end(b) { this.body = b; } };
}
const json = r => { try { return JSON.parse(r.body); } catch { return {}; } };
const auth = token => ({ authorization: 'Bearer ' + token });

let pass = 0, failN = 0;
function check(name, cond, extra = '') {
  if (cond) { pass++; console.log(`  ✅ ${name}`); }
  else { failN++; console.log(`  ❌ ${name} ${extra}`); }
}

/* ---------- seed ---------- */
store.docs['tasks/facebook-account'] = {
  nameBn: 'Facebook Account Task', reward: 50, url: 'https://example.com',
  enabled: true, locked: false,
  inputFields: [
    { label: 'Email', type: 'email', required: true },
    { label: 'Password', type: 'password', required: true },
  ],
};
store.docs['users/alice'] = { balance: 0, totalEarned: 0, isActive: true, name: 'Alice', email: 'alice@test.com' };
store.docs['users/bob'] = { balance: 0, totalEarned: 0, isActive: true, name: 'Bob', email: 'bob@test.com' };
store.docs['admins/admin@digitearn.com'] = { isAdmin: true };

/* ============================================================ */
console.log('\n[1] INPUT VALIDATION (server-side)');
{
  let r = res();
  await submitH(req('POST', auth('TOKEN_ALICE'), { taskSlug: 'facebook-account', data: { Email: 'a@b.com' } }), r);
  check('required field missing → 400', r.statusCode === 400, `(got ${r.statusCode} ${r.body})`);

  r = res();
  await submitH(req('POST', auth('TOKEN_ALICE'), { taskSlug: 'facebook-account', data: { Email: 'not-an-email', Password: 'x' } }), r);
  check('invalid email → 400', r.statusCode === 400, `(got ${r.statusCode})`);

  r = res();
  await submitH(req('POST', auth('TOKEN_ALICE'), { taskSlug: 'facebook-account', data: { Email: 'a@b.com', Password: 'x', Hack: 'evil' } }), r);
  check('unknown extra field → 400 (arbitrary JSON blocked)', r.statusCode === 400, `(got ${r.statusCode})`);

  r = res();
  await submitH(req('POST', auth('TOKEN_ALICE'), { taskSlug: 'facebook-account', data: { Email: 'a@b.com', Password: 'y'.repeat(150) } }), r);
  check('oversized field → 400', r.statusCode === 400, `(got ${r.statusCode})`);

  r = res();
  await submitH(req('POST', {}, { taskSlug: 'facebook-account', data: {} }), r);
  check('no token → 401', r.statusCode === 401, `(got ${r.statusCode})`);
}

console.log('\n[2] FAKE REWARD / FAKE UID IGNORED');
{
  let r = res();
  await submitH(req('POST', auth('TOKEN_ALICE'), {
    taskSlug: 'facebook-account', userId: 'alice', balance: 999999,
    reward: 999999, data: { Email: 'alice@fb.com', Password: 'pw123' },
  }), r);
  check('submission with fake reward:999999 → accepted as PENDING', r.statusCode === 200, `(got ${r.statusCode} ${r.body})`);
  const aliceSubs = Object.entries(store.docs).filter(([k]) => k.startsWith('users/alice/proofs/'));
  check('stored under token UID (users/alice/proofs)', aliceSubs.length === 1, `(found ${aliceSubs.length})`);
  const saved = aliceSubs[0][1];
  check('stored reward = task doc amount (50), NOT client 999999', saved.reward === 50, `(got ${saved.reward})`);
  check('status = pending', saved.status === 'pending');
  check('balance NOT changed (still 0)', store.docs['users/alice'].balance === 0);

  r = res();
  await submitH(req('POST', auth('TOKEN_ALICE'), { taskSlug: 'facebook-account', data: { Email: 'x@y.com', Password: 'z' } }), r);
  check('duplicate same-day submission → 409 (one per user+task+date)', r.statusCode === 409, `(got ${r.statusCode})`);

  r = res();
  await submitH(req('POST', auth('TOKEN_BOB'), { taskSlug: 'facebook-account', userId: 'alice', data: { Email: 'bob@fb.com', Password: 'pw456' } }), r);
  const bobSubs = Object.entries(store.docs).filter(([k]) => k.startsWith('users/bob/proofs/'));
  check('bob sending userId:"alice" → stored under BOB (token uid)', r.statusCode === 200 && bobSubs.length === 1, `(got ${r.statusCode}, bob docs ${bobSubs.length})`);
}

console.log('\n[3] ADMIN AUTHORIZATION');
{
  let r = res();
  const subId = Object.keys(store.docs).find(k => k.startsWith('users/alice/proofs/')).split('/').pop();
  await reviewH(req('POST', auth('TOKEN_ALICE'), { proofId: subId, action: 'approve' }), r);
  check('normal user calls admin approve → 403', r.statusCode === 403, `(got ${r.statusCode} ${r.body})`);
  await reviewH(req('POST', {}, { proofId: subId, action: 'approve' }), r);
  check('no token calls admin approve → 401/403', r.statusCode === 401 || r.statusCode === 403, `(got ${r.statusCode})`);
}

console.log('\n[4] APPROVE — ATOMIC, EXACTLY ONCE');
{
  const subId = Object.keys(store.docs).find(k => k.startsWith('users/alice/proofs/')).split('/').pop();
  let r = res();
  await reviewH(req('POST', auth('TOKEN_ADMIN'), { proofId: subId, action: 'approve' }), r);
  check('admin approve pending → 200', r.statusCode === 200, `(got ${r.statusCode} ${r.body})`);
  const a = store.docs['users/alice'];
  check('balance += 50 (from task doc, server-side)', a.balance === 50, `(got ${a.balance})`);
  check('totalEarned += 50', a.totalEarned === 50, `(got ${a.totalEarned})`);
  const txDocs = Object.keys(store.docs).filter(k => k.startsWith('users/alice/transactions/'));
  check('transaction history record created', txDocs.length === 1, `(got ${txDocs.length})`);
  const mirror = store.docs['proofs/' + subId];
  check('mirror status = approved', mirror && mirror.status === 'approved');
  check('approvedAt stored', !!(mirror && mirror.approvedAt));
  check('approvedBy = admin UID (from token)', mirror && mirror.approvedBy === 'admin1', `(got ${mirror && mirror.approvedBy})`);

  r = res();
  await reviewH(req('POST', auth('TOKEN_ADMIN'), { proofId: subId, action: 'approve' }), r);
  check('second approve (double click) → rejected (409)', r.statusCode === 409, `(got ${r.statusCode})`);
  check('balance still 50 (no double credit)', store.docs['users/alice'].balance === 50, `(got ${store.docs['users/alice'].balance})`);
}

console.log('\n[5] REJECT — NO MONEY');
{
  const subId = Object.keys(store.docs).find(k => k.startsWith('users/bob/proofs/')).split('/').pop();
  let r = res();
  await reviewH(req('POST', auth('TOKEN_ADMIN'), { proofId: subId, action: 'reject', note: 'Invalid account' }), r);
  check('admin reject → 200', r.statusCode === 200, `(got ${r.statusCode} ${r.body})`);
  check('bob balance unchanged (0)', store.docs['users/bob'].balance === 0, `(got ${store.docs['users/bob'].balance})`);
  const mirror = store.docs['proofs/' + subId];
  check('status = rejected', mirror && mirror.status === 'rejected');
  check('rejectedAt + rejectedBy stored', !!(mirror && mirror.rejectedAt && mirror.rejectedBy));
  check('rejectionReason (note) stored for user', mirror && mirror.note === 'Invalid account');
  check('user mirror also updated (user sees it)', store.docs['users/bob/proofs/' + subId].status === 'rejected');

  r = res();
  await reviewH(req('POST', auth('TOKEN_ADMIN'), { proofId: subId, action: 'approve' }), r);
  check('approve after reject → rejected (one-shot)', r.statusCode === 409, `(got ${r.statusCode})`);
}

console.log('\n[6] REWARD FROM TASK DOC AT APPROVAL TIME');
{
  store.docs['tasks/facebook-account'].reward = 60; // admin changed amount after submission
  store.docs['users/alice'].balance = 0; // reset for this scenario
  const r0 = res();
  await submitH(req('POST', auth('TOKEN_ALICE'), { taskSlug: 'facebook-account', data: { Email: 'a2@b.com', Password: 'p2' } }), r0);
  // same-day guard should block alice again — use bob instead (his was rejected → retry allowed)
  const r = res();
  await submitH(req('POST', auth('TOKEN_BOB'), { taskSlug: 'facebook-account', data: { Email: 'bob2@fb.com', Password: 'pw789' } }), r);
  check('rejected user may resubmit (server allows retry)', r.statusCode === 200, `(got ${r.statusCode} ${r.body})`);
  const subId = Object.entries(store.docs).filter(([k]) => k.startsWith('users/bob/proofs/') && store.docs[k].status === 'pending').map(([k]) => k.split('/').pop())[0];
  const r2 = res();
  await reviewH(req('POST', auth('TOKEN_ADMIN'), { proofId: subId, action: 'approve' }), r2);
  check('approve uses CURRENT task doc reward (60)', store.docs['users/bob'].balance === 60, `(got ${store.docs['users/bob'].balance})`);
}

console.log(`\n=============================`);
console.log(`RESULT: ${pass} passed, ${failN} failed`);
console.log(`=============================`);
process.exit(failN ? 1 : 0);
