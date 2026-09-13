/* ad-hoc repro (not shipped): withdrawal request → admin approve → both copies + read list */
import { store } from './tests/mocks/firestore-fake.mjs';

store.docs['users/alice'] = { balance: 500, totalEarned: 0, isActive: true, name: 'Sayemm', email: 'alice@test.com', mobile: '01962610866' };
store.docs['admins/admin@digitearn.com'] = { isAdmin: true };

const req = (method, headers, body, url = '/x') => ({
  method, headers, url,
  on(ev, cb) {
    if (ev === 'data' && body !== undefined) setImmediate(() => cb(Buffer.from(JSON.stringify(body))));
    if (ev === 'end') setImmediate(() => cb());
  },
});
const res = () => ({ statusCode: 0, headers: {}, body: '', setHeader(k, v) { this.headers[k] = v; }, end(b) { this.body = b; } });
const auth = t => ({ authorization: 'Bearer ' + t });
const j = r => { try { return JSON.parse(r.body); } catch { return { _raw: String(r.body).slice(0, 200), _s: r.statusCode }; } };

const wdH = (await import('./api/withdrawal/request.js')).default;
const reviewH = (await import('./lib/admin/withdrawal-review.js')).default;
const readH = (await import('./lib/admin/read.js')).default;

let r = res();
await wdH(req('POST', auth('TOKEN_ALICE'), { amount: 100, method: 'bKash', accountNumber: '01962610866' }, '/api/withdrawal/request'), r);
console.log('1) request →', r.statusCode, JSON.stringify(j(r)).slice(0, 140));
const id = Object.keys(store.docs).find(k => k.startsWith('withdrawals/'))?.split('/')[1];
console.log('   docs:', Object.keys(store.docs).filter(k => k.includes('withdraw')).join(' | '), '| id=', id);
console.log('   top :', JSON.stringify(store.docs['withdrawals/' + id]));
console.log('   user:', JSON.stringify(store.docs['users/alice/withdrawals/' + id]));

r = res();
await readH(req('POST', auth('TOKEN_ADMIN'), { what:'withdrawals', status:'pending' }, '/api/admin/panel?op=read'), r);
console.log('2) admin list pending BEFORE →', r.statusCode, JSON.stringify(j(r)).slice(0, 220));

r = res();
await reviewH(req('POST', auth('TOKEN_ADMIN'), { userId: 'alice', id, action: 'paid' }, '/api/admin/panel?op=withdrawal-review'), r);
console.log('3) review paid →', r.statusCode, JSON.stringify(j(r)).slice(0, 200));
console.log('   top now :', JSON.stringify(store.docs['withdrawals/' + id]));
console.log('   user now:', JSON.stringify(store.docs['users/alice/withdrawals/' + id]));

r = res();
await readH(req('POST', auth('TOKEN_ADMIN'), { what:'withdrawals', status:'pending' }, '/api/admin/panel?op=read'), r);
console.log('4) admin list pending AFTER →', r.statusCode, JSON.stringify(j(r)).slice(0, 220));
r = res();
await readH(req('POST', auth('TOKEN_ADMIN'), { what:'withdrawals', status:'all' }, '/api/admin/panel?op=read'), r);
console.log('5) admin list all AFTER  →', r.statusCode, JSON.stringify(j(r)).slice(0, 260));

r = res();
await readH(req('POST', auth('TOKEN_ADMIN'), { what:'withdrawals', status:'paid' }, '/api/admin/panel?op=read'), r);
console.log('5b) list paid →', r.statusCode, JSON.stringify(j(r)).slice(0, 240));
/* reject must carry a reason? (current server behaviour) */
r = res();
await wdH(req('POST', auth('TOKEN_ALICE'), { amount: 50, method: 'bKash', accountNumber: '01962610866' }, '/api/withdrawal/request'), r);
const id2 = Object.keys(store.docs).filter(k => k.startsWith('withdrawals/')).pop().split('/')[1];
r = res();
await reviewH(req('POST', auth('TOKEN_ADMIN'), { userId: 'alice', id: id2, action: 'rejected' }, '/api/admin/panel?op=withdrawal-review'), r);
console.log('6) reject WITHOUT reason →', r.statusCode, JSON.stringify(j(r)).slice(0, 160), '| note stored:', JSON.stringify(store.docs['withdrawals/' + id2].note));
