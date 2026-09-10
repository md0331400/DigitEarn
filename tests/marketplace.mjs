/* Marketplace end-to-end: multiple account sales/day, duplicate guard, per-sale payout.
   Run: node --import ./tests/register.mjs tests/marketplace.mjs */
import { store } from './mocks/firestore-fake.mjs';

const submitH = (await import('../api/proof/submit.js')).default;
const reviewH = (await import('../lib/admin/proof-review.js')).default;

function req(method, headers, body) {
  return {
    method, headers,
    on(ev, cb) {
      if (ev === 'data' && body !== undefined) setImmediate(() => cb(Buffer.from(JSON.stringify(body))));
      if (ev === 'end') setImmediate(() => cb());
    },
  };
}
const res = () => ({ statusCode: 0, headers: {}, body: '', setHeader() {}, end(b) { this.body = b; } });
const auth = t => ({ authorization: 'Bearer ' + t });
const json = r => { try { return JSON.parse(r.body); } catch { return {}; } };

let pass = 0, failN = 0;
const check = (n, c, x = '') => { if (c) { pass++; console.log(`  ✅ ${n}`); } else { failN++; console.log(`  ❌ ${n} ${x}`); } };

/* seed: Gmail project, ৳15/account, seller Alice active */
store.docs['tasks/gmail-sale'] = {
  nameBn: 'জিমেইল সেল', reward: 15, enabled: true, locked: false, dailyLimit: 3,
  password: '@jony@#&',
  inputFields: [
    { label: 'জিমেইল এড্রেস', type: 'email', required: true },
    { label: 'পাসওয়ার্ড', type: 'password', required: true },
  ],
};
store.docs['users/alice'] = { balance: 0, totalEarned: 0, isActive: true, name: 'Alice', email: 'alice@test.com' };
store.docs['users/bob'] = { balance: 0, totalEarned: 0, isActive: true, name: 'Bob', email: 'bob@test.com' };
store.docs['users/carol'] = { balance: 0, totalEarned: 0, isActive: false, name: 'Carol', email: 'carol@test.com' };
store.docs['admins/admin@digitearn.com'] = { isAdmin: true };

const sell = async (token, email, pw) => {
  const r = res();
  await submitH(req('POST', auth(token), {
    taskSlug: 'gmail-sale',
    data: { 'জিমেইল এড্রেস': email, 'পাসওয়ার্ড': pw || 'pw123' },
  }), r);
  return r;
};
const review = async (proofId, action, note) => {
  const r = res();
  await reviewH(req('POST', auth('TOKEN_ADMIN'), { proofId, action, note: note || '' }), r);
  return r;
};
const aliceProofs = () => Object.entries(store.docs).filter(([k]) => /^users\/alice\/proofs\//.test(k));

console.log('\n[M1] SELLER একাধিক account জমা দেয় (এক দিনে)');
{
  let r = await sell('TOKEN_ALICE', 'sale1@gmail.com');
  check('1st account → 200', r.statusCode === 200, `(got ${r.statusCode} ${r.body})`);
  r = await sell('TOKEN_ALICE', 'sale2@gmail.com');
  check('2nd account একই দিনে → 200 (marketplace)', r.statusCode === 200, `(got ${r.statusCode} ${r.body})`);
  check('২টা submission আলাদা জমা আছে', aliceProofs().length === 2, `(${aliceProofs().length})`);
  check('balance এখনো 0 (approve ছাড়া টাকা নেই)', store.docs['users/alice'].balance === 0);
  const saved = aliceProofs()[0][1];
  check('rate task doc থেকে (৳15)', saved.reward === 15, `(got ${saved.reward})`);
  check('submitted data সংরক্ষিত', saved.submittedData['জিমেইল এড্রেস'] === 'sale1@gmail.com');
}

console.log('\n[M2] DUPLICATE ACCOUNT — একই account দুবার বিক্রি করা যাবে না');
{
  let r = await sell('TOKEN_ALICE', 'sale1@gmail.com', 'different');
  check('একই seller একই account আবার → 409', r.statusCode === 409, `(got ${r.statusCode})`);
  r = await sell('TOKEN_BOB', '  SALE1@Gmail.COM ');
  check('অন্য seller একই account (case/space) → 409', r.statusCode === 409, `(got ${r.statusCode})`);
  check('বার্তা বোধগম্য', /আগেই/.test(json(r).error || ''), `(${json(r).error})`);
  r = await sell('TOKEN_BOB', 'bobsale@gmail.com');
  check('Bob এর নিজের নতুন account → 200', r.statusCode === 200, `(got ${r.statusCode})`);
}

console.log('\n[M3] DAILY LIMIT (admin panel থেকে সেট — এখানে 3)');
{
  const r1 = await sell('TOKEN_ALICE', 'sale3@gmail.com');
  check('3rd account → 200', r1.statusCode === 200, `(got ${r1.statusCode})`);
  const r2 = await sell('TOKEN_ALICE', 'sale4@gmail.com');
  check('4th account → 429 (daily limit)', r2.statusCode === 429, `(got ${r2.statusCode})`);
}

console.log('\n[M4] INACTIVE seller বিক্রি করতে পারবে না');
{
  const r = await sell('TOKEN_CAROL', 'carolsale@gmail.com');
  check('inactive → 409 + activate বার্তা',
    r.statusCode === 409 && /অ্যাক্টিভ/.test(json(r).error || ''), `(${r.statusCode} ${json(r).error})`);
}

console.log('\n[M5] প্রতিটা approved account আলাদা টাকা পায় (একই দিনে) — পুরনো bug');
{
  const ids = aliceProofs().filter(([, v]) => v.status === 'pending').map(([k]) => k.split('/').pop());
  const before = store.docs['users/alice'].balance;
  const a1 = await review(ids[0], 'approve');
  check('1st approve → 200', a1.statusCode === 200, `(got ${a1.statusCode} ${a1.body})`);
  check(`balance ${before} → ${before + 15}`,
    store.docs['users/alice'].balance === before + 15, `(got ${store.docs['users/alice'].balance})`);
  const a2 = await review(ids[1], 'approve');
  check('2nd approve একই দিনে → 200', a2.statusCode === 200, `(got ${a2.statusCode} ${a2.body})`);
  check(`balance ${before + 15} → ${before + 30} (২য় account-ও টাকা পেল)`,
    store.docs['users/alice'].balance === before + 30, `(got ${store.docs['users/alice'].balance})`);
  const dbl = await review(ids[0], 'approve');
  check('একই submission আবার approve → 409 (double-credit বন্ধ)', dbl.statusCode === 409, `(got ${dbl.statusCode})`);
  check('balance অপরিবর্তিত', store.docs['users/alice'].balance === before + 30);
}

console.log('\n[M6] REJECT → account key release, seller আবার জমা দিতে পারে');
{
  const pend = aliceProofs().filter(([, v]) => v.status === 'pending').map(([k]) => k.split('/').pop());
  const id = pend[0];
  const rj = await review(id, 'reject', 'পাসওয়ার্ড ভুল');
  check('reject → 200', rj.statusCode === 200, `(got ${rj.statusCode} ${rj.body})`);
  const bal = store.docs['users/alice'].balance;
  const again = await sell('TOKEN_ALICE', 'sale3@gmail.com');
  check('reject হওয়া account আবার জমা → 200 (key release হয়েছে)', again.statusCode === 200, `(got ${again.statusCode} ${again.body})`);
  check('reject-এ টাকা যোগ হয়নি', store.docs['users/alice'].balance === bal);
}

console.log('\n[M7] কোনো junk doc top-level users/ তে যায়নি (path bug regression)');
{
  const junk = Object.keys(store.docs).filter(k => /^users\/(p_|pr_|wd_|g_|r_|tg_|ad_)/.test(k));
  check('users/ এর নিচে কোনো proof/transaction junk নেই', junk.length === 0, `(found ${junk.join(', ')})`);
  const realUsers = Object.keys(store.docs).filter(k => /^users\/[^/]+$/.test(k));
  check('শুধু আসল ৩ জন user আছে', realUsers.length === 3, `(${realUsers.join(', ')})`);
  check('Alice এর profile অক্ষত (balance+name)',
    store.docs['users/alice'].name === 'Alice' && typeof store.docs['users/alice'].balance === 'number');
}

console.log('\n=============================');
console.log(`RESULT: ${pass} passed, ${failN} failed`);
console.log('=============================\n');
if (failN) process.exit(1);
