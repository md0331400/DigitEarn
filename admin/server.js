/* DigitEarn ADMIN PANEL — a fully separate application.
   Runs on its own port (3001), its own login and its own UI.
   It is NOT part of the user-facing site (port 3000) — they only share the database. */
const path = require('path');
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const db = require('../shared/db');

const app = express();
const PORT = process.env.PORT_ADMIN || 3001;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.disable('x-powered-by');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/vendor/fa', express.static(path.join(__dirname, '..', 'node_modules', '@fortawesome', 'fontawesome-free')));
app.use(session({
  name: 'de_admin_sid',
  secret: 'digitearn-admin-panel-secret-2026',
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, sameSite: 'lax', maxAge: 8 * 3600 * 1000 },
}));

/* ---------- locals ---------- */

app.use((req, res, next) => {
  res.locals.admin = req.session.adminId ? db.allAdmins().find(a => a.id === req.session.adminId) || null : null;
  res.locals.settings = db.getSettings();
  res.locals.iconOptions = [
    ['fa-brands fa-facebook-f', 'Facebook'],
    ['fa-solid fa-envelope', 'Envelope'],
    ['fa-brands fa-instagram', 'Instagram'],
    ['fa-solid fa-briefcase', 'Briefcase'],
    ['fa-solid fa-crown', 'Crown'],
    ['fa-solid fa-bullseye', 'Bullseye'],
    ['fa-solid fa-users', 'Users'],
    ['fa-solid fa-gift', 'Gift'],
    ['fa-solid fa-calculator', 'Calculator'],
    ['fa-solid fa-list-check', 'List Check'],
    ['fa-solid fa-keyboard', 'Keyboard'],
    ['fa-solid fa-bullhorn', 'Bullhorn'],
    ['fa-solid fa-tv', 'TV'],
    ['fa-solid fa-hashtag', 'Hashtag'],
    ['fa-solid fa-star', 'Star'],
    ['fa-solid fa-heart', 'Heart'],
    ['fa-solid fa-pen', 'Pen'],
    ['fa-solid fa-mobile-screen', 'Mobile'],
  ];
  next();
});
function setFlash(req, type, msg) { req.session.flash = { type, msg }; }
function getFlash(req) {
  const f = req.session.flash;
  delete req.session.flash;
  return f || null;
}
function requireAdmin(req, res, next) {
  if (req.session.adminId) return next();
  res.redirect('/login');
}
function num(v, d = 0) { const n = parseFloat(v); return Number.isFinite(n) ? n : d; }
function esc(s) { return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
app.use((req, res, next) => { res.locals.esc = esc; res.locals.flash = getFlash(req); res.locals.bn = { pending: 'পেন্ডিং', paid: 'পেড', rejected: 'বাতিল' }; next(); });

function siteUrl(req) {
  const host = req.get('host') || 'localhost:3001';
  if (host.startsWith('localhost') || host.startsWith('127.0.0.1')) return 'http://localhost:3000';
  const m = host.match(/^(\d+)-(.+)$/);
  if (m) return `http://${3000}-${m[2]}`;
  return 'http://' + host;
}
app.use((req, res, next) => { res.locals.siteUrl = siteUrl(req); next(); });

/* ---------- admin auth ---------- */

app.get('/', (req, res) => {
  res.redirect(res.locals.admin ? '/dashboard' : '/login');
});
app.get('/login', (req, res) => {
  if (res.locals.admin) return res.redirect('/dashboard');
  res.render('login', { error: null });
});
app.post('/login', (req, res) => {
  const { username = '', password = '' } = req.body;
  const a = db.getAdminByUsername(String(username).trim());
  if (!a || !bcrypt.compareSync(password, a.password_hash)) {
    return res.render('login', { error: 'ইউজারনেম বা পাসওয়ার্ড সঠিক নয়' });
  }
  req.session.adminId = a.id;
  res.redirect('/dashboard');
});
app.post('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/login'));
});

/* ---------- dashboard ---------- */

app.get('/dashboard', requireAdmin, (req, res) => {
  const all = db.allUsers({ perPage: 1 }).total;
  const active = Number(db.db.prepare('SELECT COUNT(*) c FROM users WHERE is_active = 1').get().c);
  const newToday = Number(db.db.prepare("SELECT COUNT(*) c FROM users WHERE date(created_at) = date('now')").get().c);
  const pending = db.db.prepare("SELECT COUNT(*) c, COALESCE(SUM(amount),0) s FROM withdrawals WHERE status='pending'").get();
  const totalBalance = Number(db.db.prepare('SELECT COALESCE(SUM(balance),0) s FROM users').get().s);
  const recentUsers = db.db.prepare('SELECT * FROM users ORDER BY id DESC LIMIT 6').all().map(u => ({ ...u, is_active: !!u.is_active }));
  const recentWd = db.allWithdrawals('all', 6);
  res.render('dashboard', { stats: { all, active, newToday, pendingCount: Number(pending.c), pendingAmount: Number(pending.s), totalBalance }, recentUsers, recentWd });
});

/* ---------- users ---------- */

app.get('/users', requireAdmin, (req, res) => {
  const search = String(req.query.q || '');
  const page = Math.max(1, num(req.query.page, 1));
  const perPage = 12;
  const { rows, total } = db.allUsers({ search, page, perPage });
  const pages = Math.max(1, Math.ceil(total / perPage));
  res.render('users', { rows, search, page, pages, total, active: 'users' });
});

app.get('/users/:id', requireAdmin, (req, res) => {
  const u = db.getUserById(req.params.id);
  if (!u) { setFlash(req, 'error', 'ইউজার পাওয়া যায়নি'); return res.redirect('/users'); }
  const withdrawals = db.userWithdrawals(u.id);
  const transactions = db.db.prepare('SELECT * FROM transactions WHERE user_id = ? ORDER BY id DESC LIMIT 30').all(u.id);
  const counts = db.teamCounts(u.id);
  res.render('user_detail', { u, withdrawals, transactions, counts, active: 'users' });
});

app.post('/users/:id/toggle-active', requireAdmin, (req, res) => {
  const u = db.getUserById(req.params.id);
  if (!u) return res.redirect('/users');
  const nowActive = !u.is_active;
  db.updateUser(u.id, { is_active: nowActive ? 1 : 0 });
  if (nowActive) {
    const bonus = num(db.getSetting('activation_bonus', 0));
    if (bonus > 0) db.addBalance(u.id, bonus, 'activation_bonus', `একাউন্ট অ্যাক্টিভ বোনাস (admin: ${res.locals.admin.username})`);
    setFlash(req, 'success', `${u.full_name} — অ্যাকাউন্ট অ্যাক্টিভ হয়েছে + ৳${bonus} বোনাস দেওয়া হয়েছে`);
  } else {
    setFlash(req, 'success', `${u.full_name} — অ্যাকাউন্ট ইন-অ্যাক্টিভ করা হয়েছে`);
  }
  res.redirect('/users/' + u.id);
});

app.post('/users/:id/balance', requireAdmin, (req, res) => {
  const u = db.getUserById(req.params.id);
  if (!u) return res.redirect('/users');
  const mode = req.body.mode || 'set';
  const val = num(req.body.amount);
  const note = String(req.body.note || 'Admin ব্যালেন্স আপডেট');
  if (val < 0) { setFlash(req, 'error', 'ব্যালেন্স নেগেটিভ হতে পারে না'); return res.redirect('/users/' + u.id); }
  const delta = mode === 'set' ? val - u.balance : (mode === 'add' ? val : -val);
  if (delta === 0) { setFlash(req, 'error', 'কোনো পরিবর্তন হয়নি'); return res.redirect('/users/' + u.id); }
  db.addBalance(u.id, delta, 'admin_adjust', `${note} (admin: ${res.locals.admin.username})`);
  setFlash(req, 'success', `ব্যালেন্স আপডেট হয়েছে (${delta >= 0 ? '+' : ''}${delta.toFixed(2)})`);
  res.redirect('/users/' + u.id);
});

app.post('/users/:id/reset-password', requireAdmin, (req, res) => {
  const u = db.getUserById(req.params.id);
  if (!u) return res.redirect('/users');
  const pw = String(req.body.password || '');
  if (pw.length < 6) setFlash(req, 'error', 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে');
  else {
    db.updateUser(u.id, { password_hash: bcrypt.hashSync(pw, 10) });
    setFlash(req, 'success', `${u.full_name} — পাসওয়ার্ড রিসেট হয়েছে`);
  }
  res.redirect('/users/' + u.id);
});

app.post('/users/:id/delete', requireAdmin, (req, res) => {
  const u = db.getUserById(req.params.id);
  if (!u) return res.redirect('/users');
  db.deleteUser(u.id);
  setFlash(req, 'success', `${u.full_name} — অ্যাকাউন্ট মুছে ফেলা হয়েছে`);
  res.redirect('/users');
});

/* ---------- tasks ---------- */

app.get('/tasks', requireAdmin, (req, res) => {
  res.render('tasks', { tasks: db.allTasks({ includeDisabled: true }), active: 'tasks' });
});
function taskFromBody(body) {
  const kind = body.kind === 'page' ? 'page' : 'task';
  const pages = ['team', 'gift', 'target', 'leadership'];
  return {
    name_bn: String(body.name_bn || '').trim(),
    icon: String(body.icon || 'fa-solid fa-star'),
    color: String(body.color || '#2563eb'),
    kind,
    page: kind === 'page' && pages.includes(body.page) ? body.page : null,
    url: kind === 'task' ? String(body.url || '').trim() : null,
    steps: kind === 'task' ? String(body.steps || '').split('\n').map(s => s.trim()).filter(Boolean) : [],
    reward: kind === 'task' ? Math.max(0, num(body.reward)) : 0,
    locked: body.locked ? true : false,
    enabled: body.enabled ? true : false,
    sort: num(body.sort),
  };
}
app.get('/tasks/new', requireAdmin, (req, res) => {
  res.render('task_form', { task: { name_bn: '', icon: 'fa-solid fa-star', color: '#2563eb', kind: 'task', page: null, url: '', stepsText: '', reward: 5, locked: false, enabled: true, sort: 99 }, isNew: true, active: 'tasks' });
});
app.post('/tasks', requireAdmin, (req, res) => {
  const data = taskFromBody(req.body);
  if (!data.name_bn) { setFlash(req, 'error', 'প্রজেক্টের নাম লিখুন'); return res.redirect('/tasks'); }
  if (data.kind === 'page' && !data.page) { setFlash(req, 'error', 'কোন প্যেজে যাবে তা নির্বাচন করুন'); return res.redirect('/tasks'); }
  if (data.kind === 'task' && !data.url) { setFlash(req, 'error', 'টাস্কের লিংক দিন'); return res.redirect('/tasks'); }
  db.insertTask(data);
  setFlash(req, 'success', 'নতুন প্রজেক্ট যোগ হয়েছে');
  res.redirect('/tasks');
});
app.get('/tasks/:id/edit', requireAdmin, (req, res) => {
  const t = db.getTaskById(req.params.id);
  if (!t) return res.redirect('/tasks');
  t.stepsText = (t.steps || []).join('\n');
  res.render('task_form', { task: t, isNew: false, active: 'tasks' });
});
app.post('/tasks/:id', requireAdmin, (req, res) => {
  const data = taskFromBody(req.body);
  if (!data.name_bn) { setFlash(req, 'error', 'প্রজেক্টের নাম লিখুন'); return res.redirect('/tasks'); }
  db.updateTask(req.params.id, data);
  setFlash(req, 'success', 'প্রজেক্ট আপডেট হয়েছে');
  res.redirect('/tasks');
});
app.post('/tasks/:id/delete', requireAdmin, (req, res) => {
  db.deleteTask(req.params.id);
  setFlash(req, 'success', 'প্রজেক্ট মুছে ফেলা হয়েছে');
  res.redirect('/tasks');
});

/* ---------- withdrawals ---------- */

app.get('/withdrawals', requireAdmin, (req, res) => {
  const status = ['pending', 'paid', 'rejected'].includes(req.query.status) ? req.query.status : 'pending';
  const rows = db.allWithdrawals(status);
  const pendingSum = Number(db.db.prepare("SELECT COALESCE(SUM(amount),0) s FROM withdrawals WHERE status='pending'").get().s);
  res.render('withdrawals', { rows, status, pendingSum, active: 'withdrawals' });
});
app.post('/withdrawals/:id/approve', requireAdmin, (req, res) => {
  const w = db.getWithdrawal(req.params.id);
  if (!w || w.status !== 'pending') { setFlash(req, 'error', 'রিকোয়েস্টটি এখন আর পেন্ডিং নেই'); return res.redirect('/withdrawals'); }
  const note = String(req.body.note || '');
  db.setWithdrawalStatus(w.id, 'paid', note);
  setFlash(req, 'success', `৳${w.amount} পেমেন্ট কনফার্ম হয়েছে`);
  res.redirect('/withdrawals');
});
app.post('/withdrawals/:id/reject', requireAdmin, (req, res) => {
  const w = db.getWithdrawal(req.params.id);
  if (!w || w.status !== 'pending') { setFlash(req, 'error', 'রিকোয়েস্টটি এখন আর পেন্ডিং নেই'); return res.redirect('/withdrawals'); }
  const note = String(req.body.note || 'বাতিল');
  db.setWithdrawalStatus(w.id, 'rejected', note);
  db.addBalance(w.user_id, w.amount, 'withdraw_refund', `উইথড্র বাতিল — টাকা ফেরত: ${note}`);
  setFlash(req, 'success', `রিকোয়েস্ট বাতিল — ৳${w.amount} ইউজারের ব্যালেন্সে ফেরত দেওয়া হয়েছে`);
  res.redirect('/withdrawals');
});

/* ---------- notices ---------- */

app.get('/notices', requireAdmin, (req, res) => {
  res.render('notices', { notices: db.allNotices(), active: 'notices' });
});
app.post('/notices', requireAdmin, (req, res) => {
  const text = String(req.body.text || '').trim();
  if (!text) setFlash(req, 'error', 'নোটিশ টেক্সট লিখুন');
  else { db.insertNotice(text); setFlash(req, 'success', 'নোটিশ যোগ হয়েছে'); }
  res.redirect('/notices');
});
app.post('/notices/:id/toggle', requireAdmin, (req, res) => {
  db.toggleNotice(req.params.id);
  res.redirect('/notices');
});
app.post('/notices/:id/delete', requireAdmin, (req, res) => {
  db.deleteNotice(req.params.id);
  setFlash(req, 'success', 'নোটিশ মুছে ফেলা হয়েছে');
  res.redirect('/notices');
});

/* ---------- transactions ---------- */

app.get('/transactions', requireAdmin, (req, res) => {
  const search = String(req.query.q || '');
  res.render('transactions', { rows: db.searchTransactions(search, 300), search, active: 'transactions' });
});

/* ---------- settings ---------- */

app.get('/settings', requireAdmin, (req, res) => {
  res.render('settings', { active: 'settings' });
});
app.post('/settings', requireAdmin, (req, res) => {
  const keys = [
    'site_name', 'site_start', 'footer_text', 'video_url',
    'telegram_link', 'facebook_link', 'youtube_link', 'activation_link',
    'admin1_name', 'admin1_link', 'admin2_name', 'admin2_link',
    'register_bonus', 'activation_bonus', 'referral_bonus', 'min_withdraw',
    'gift_code', 'gift_reward', 'target_tiers',
  ];
  for (const k of keys) {
    if (req.body[k] !== undefined) db.setSetting(k, String(req.body[k]).trim());
  }
  // validate target tiers JSON
  const tiersRaw = String(req.body.target_tiers || '').trim();
  if (tiersRaw) {
    try {
      const parsed = JSON.parse(tiersRaw);
      if (!Array.isArray(parsed)) throw new Error('array');
      db.setSetting('target_tiers', JSON.stringify(parsed));
    } catch (e) {
      setFlash(req, 'error', 'টার্গেট টিয়ার JSON সঠিক নয় — বাকি সেটিংস সেভ হয়েছে');
      return res.redirect('/settings');
    }
  }
  setFlash(req, 'success', 'সেটিংস সেভ হয়েছে');
  res.redirect('/settings');
});

/* ---------- admins ---------- */

app.get('/admins', requireAdmin, (req, res) => {
  res.render('admins', { admins: db.allAdmins(), active: 'admins' });
});
app.post('/admins', requireAdmin, (req, res) => {
  const username = String(req.body.username || '').trim();
  const name = String(req.body.name || '').trim() || username;
  const password = String(req.body.password || '');
  if (!/^[a-zA-Z0-9_.-]{3,30}$/.test(username)) setFlash(req, 'error', 'ইউজারনেম ৩–৩০ অক্ষরের হতে হবে (a-z, 0-9)');
  else if (db.getAdminByUsername(username)) setFlash(req, 'error', 'এই ইউজারনেম আগেই ব্যবহৃত হয়েছে');
  else if (password.length < 6) setFlash(req, 'error', 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে');
  else {
    db.insertAdmin({ username, name, password_hash: bcrypt.hashSync(password, 10) });
    setFlash(req, 'success', `এডমিন "${username}" যোগ হয়েছে`);
  }
  res.redirect('/admins');
});
app.post('/admins/:id/delete', requireAdmin, (req, res) => {
  if (db.allAdmins().length <= 1) setFlash(req, 'error', 'সর্বশেষ এডমিনকে মুছা যাবে না');
  else {
    const a = db.allAdmins().find(x => x.id === Number(req.params.id));
    if (a) { db.deleteAdmin(a.id); setFlash(req, 'success', `এডমিন "${a.username}" মুছে ফেলা হয়েছে`); }
  }
  res.redirect('/admins');
});
app.post('/admins/:id/reset-password', requireAdmin, (req, res) => {
  const pw = String(req.body.password || '');
  if (pw.length < 6) setFlash(req, 'error', 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে');
  else { db.updateAdminPassword(req.params.id, bcrypt.hashSync(pw, 10)); setFlash(req, 'success', 'পাসওয়ার্ড রিসেট হয়েছে'); }
  res.redirect('/admins');
});

app.use((req, res) => {
  if (req.headers.accept && req.headers.accept.includes('html')) res.status(404).render('404', { active: '' });
  else res.status(404).send('Not found');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[admin-panel] DigitEarn admin panel running at http://0.0.0.0:${PORT}`);
});
