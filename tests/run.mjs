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

console.log('\n[7] PRE-SIGNUP CHECK ENDPOINT (anonymous)');
{
  const checkH = (await import('../api/user/check.js')).default;
  let r = res();
  await checkH(req('POST', {}, { email: 'alice@test.com', mobile: '01711111111' }), r);
  check('no token-ও check চলবে (anonymous)', r.statusCode === 200, `(got ${r.statusCode})`);
  check('known email → emailTaken true', json(r).emailTaken === true, r.body);
  check('unknown mobile → mobileTaken false', json(r).mobileTaken === false, r.body);

  store.docs['users/carol'] = { mobile: '01812345678', email: 'carol@x.com', balance: 0 };
  r = res();
  await checkH(req('POST', {}, { mobile: '01812345678' }), r);
  check('known mobile → mobileTaken true', json(r).mobileTaken === true, r.body);

  r = res();
  await checkH(req('GET', {}, {}), r);
  check('GET → 405', r.statusCode === 405, `(got ${r.statusCode})`);
}

console.log('\n[8] WITHDRAWAL REVIEW (admin, atomic, refund on reject)');
{
  const wdH = (await import('../admin/api/admin/withdrawal-review.js')).default;
  store.docs['users/alice'].balance = 100;
  store.docs['users/alice/withdrawals/w1'] = { uid: 'alice', amount: 30, method: 'bKash', accountNumber: '01700000001', status: 'pending', name: 'Alice' };
  store.docs['withdrawals/w1'] = { userId: 'alice', amount: 30, method: 'bKash', accountNumber: '01700000001', status: 'pending' };

  let r = res();
  await wdH(req('POST', auth('TOKEN_ALICE'), { id: 'w1', action: 'paid' }), r);
  check('normal user calls withdrawal review → 403', r.statusCode === 403, `(got ${r.statusCode} ${r.body})`);

  r = res();
  await wdH(req('POST', auth('TOKEN_ADMIN'), { id: 'w1', action: 'paid' }), r);
  check('admin mark paid → 200', r.statusCode === 200, `(got ${r.statusCode} ${r.body})`);
  check('user copy status=paid', store.docs['users/alice/withdrawals/w1'].status === 'paid');
  check('top-level mirror status=paid', store.docs['withdrawals/w1'].status === 'paid');
  check('balance NOT deducted again (still 100)', store.docs['users/alice'].balance === 100, `(got ${store.docs['users/alice'].balance})`);

  r = res();
  await wdH(req('POST', auth('TOKEN_ADMIN'), { id: 'w1', action: 'paid' }), r);
  check('second process (double-click) → 409', r.statusCode === 409, `(got ${r.statusCode})`);

  // reject → atomic refund
  store.docs['users/alice/withdrawals/w2'] = { uid: 'alice', amount: 20, method: 'Nagad', accountNumber: '01700000002', status: 'pending', name: 'Alice' };
  store.docs['withdrawals/w2'] = { userId: 'alice', amount: 20, method: 'Nagad', accountNumber: '01700000002', status: 'pending' };
  r = res();
  await wdH(req('POST', auth('TOKEN_ADMIN'), { id: 'w2', action: 'rejected', note: 'Wrong number' }), r);
  check('admin reject → 200', r.statusCode === 200, `(got ${r.statusCode} ${r.body})`);
  check('reject refunds balance (100 + 20 = 120)', store.docs['users/alice'].balance === 120, `(got ${store.docs['users/alice'].balance})`);
  const refundTx = Object.keys(store.docs).filter(k => k.startsWith('users/alice/transactions/') && store.docs[k].type === 'withdraw_refund');
  check('refund transaction record created (audit trail)', refundTx.length === 1, `(got ${refundTx.length})`);
  check('status=rejected + note stored', store.docs['withdrawals/w2'].status === 'rejected' && store.docs['withdrawals/w2'].note === 'Wrong number');

  r = res();
  await wdH(req('POST', auth('TOKEN_ADMIN'), { id: 'w2', action: 'rejected' }), r);
  check('second reject (double-refund attempt) → 409', r.statusCode === 409, `(got ${r.statusCode})`);
  check('balance still 120 (no double refund)', store.docs['users/alice'].balance === 120, `(got ${store.docs['users/alice'].balance})`);

  r = res();
  await wdH(req('POST', auth('TOKEN_ADMIN'), { id: 'nope', action: 'paid' }), r);
  check('unknown id → 409 (not 500/leak)', r.statusCode === 409, `(got ${r.statusCode})`);
}

console.log('\n[9] TARGETED NOTICE LIST (admin-only, server-side scan)');
{
  const ntH = (await import('../admin/api/admin/notice-targeted.js')).default;
  store.docs['users/alice/targetNotices/n1'] = { title: 'T1', body: 'B1', type: 'warning', enabled: true };
  store.docs['users/bob/targetNotices/n2'] = { title: 'T2', body: 'B2', type: 'notice', enabled: true };

  let r = res();
  await ntH(req('GET', {}), r);
  check('no token → 403/401', r.statusCode === 403 || r.statusCode === 401, `(got ${r.statusCode})`);

  r = res();
  await ntH(req('GET', auth('TOKEN_ALICE')), r);
  check('normal user GET → 403', r.statusCode === 403, `(got ${r.statusCode})`);

  r = res();
  await ntH(req('GET', auth('TOKEN_ADMIN')), r);
  const data = json(r);
  check('admin GET → 200', r.statusCode === 200, `(got ${r.statusCode} ${r.body})`);
  check('lists targeted notices of real users', Array.isArray(data.targeted) && data.targeted.filter(x => x.uid === 'alice' || x.uid === 'bob').length === 2, `(got ${JSON.stringify(data).slice(0, 140)})`);
  const aliceN = (data.targeted || []).find(x => x.uid === 'alice');
  check('includes user identity (name) for admin context', aliceN && aliceN.userName === 'Alice', `(got ${aliceN && aliceN.userName})`);

  r = res();
  await ntH(req('POST', auth('TOKEN_ADMIN')), r);
  check('POST → 405', r.statusCode === 405, `(got ${r.statusCode})`);
}

console.log(`\n=============================`);
console.log(`RESULT: ${pass} passed, ${failN} failed`);
console.log(`=============================`);
process.exit(failN ? 1 : 0);
