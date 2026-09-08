/* DigitEarn — user-facing site (separate app, port 3000).
   The admin panel lives in /admin on port 3001 — fully independent. */
const path = require('path');
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const db = require('../shared/db');

const app = express();
const PORT = process.env.PORT_USER || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.disable('x-powered-by');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/vendor/fa', express.static(path.join(__dirname, '..', 'node_modules', '@fortawesome', 'fontawesome-free')));
app.use(session({
  name: 'de_user_sid',
  secret: 'digitearn-user-site-secret-2026',
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, sameSite: 'lax', maxAge: 7 * 24 * 3600 * 1000 },
}));

/* ---------- locals & helpers ---------- */

app.use((req, res, next) => {
  res.locals.settings = db.getSettings();
  res.locals.user = req.session.userId ? db.getUserById(req.session.userId) : null;
  next();
});

function setFlash(req, type, msg) { req.session.flash = { type, msg }; }
function getFlash(req) {
  const f = req.session.flash;
  delete req.session.flash;
  return f || null;
}
function requireUser(req, res, next) {
  if (req.session.userId && db.getUserById(req.session.userId)) return next();
  res.redirect('/login');
}
function num(v, d = 0) { const n = parseFloat(v); return Number.isFinite(n) ? n : d; }
function esc(s) { return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
app.use((req, res, next) => { res.locals.esc = esc; res.locals.flash = getFlash(req); next(); });

/* ---------- auth pages ---------- */

app.get('/', (req, res) => {
  res.redirect(res.locals.user ? '/dashboard' : '/login');
});

app.get(['/login', '/register'], (req, res) => {
  const tab = req.path === '/register' || req.query.tab === 'register' ? 'register' : 'login';
  const old = {};
  if (req.query.ref) old.ref_code = req.query.ref;
  res.render('auth', { tab, errors: [], old, videoHtml: videoBlock() });
});

function videoBlock() {
  const url = db.getSetting('video_url', '');
  if (!url) return '';
  if (/youtube\.com|youtu\.be/.test(url)) {
    const id = url.match(/(?:v=|youtu\.be\/)([\w-]{6,})/);
    if (id) return `<iframe src="https://www.youtube.com/embed/${id[1]}" style="width:100%;aspect-ratio:16/10;border-radius:14px;border:0" allowfullscreen></iframe>`;
  }
  return `<video controls style="width:100%;aspect-ratio:16/10;border-radius:14px;background:#000"><source src="${esc(url)}"></video>`;
}

app.post('/register', (req, res) => {
  const { ref_code = '', full_name = '', mobile = '', email = '', password = '', confirm_password = '' } = req.body;
  const errors = [];
  const name = full_name.trim(), mob = mobile.trim(), em = email.trim().toLowerCase();
  if (name.length < 3) errors.push('সঠিক পুরো নাম লিখুন');
  if (!/^01[3-9]\d{8}$/.test(mob)) errors.push('সঠিক বাংলাদেশি মোবাইল নম্বর দিন (01XXXXXXXXX)');
  if (!/^\S+@\S+\.\S+$/.test(em)) errors.push('সঠিক ইমেইল ঠিকানা লিখুন');
  if (String(password).length < 6) errors.push('পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে');
  if (password !== confirm_password) errors.push('পাসওয়ার্ড দুটি মিলছে না');
  if (db.getUserByEmail(em)) errors.push('এই ইমেইল দিয়ে ইতিমধ্যে অ্যাকাউন্ট আছে');
  if (db.getUserByMobile(mob)) errors.push('এই মোবাইল নম্বরে ইতিমধ্যে অ্যাকাউন্ট আছে');

  let referrer = null;
  if (ref_code.trim()) {
    referrer = db.getUserByRefCode(ref_code.trim());
    if (!referrer) errors.push('রেফারেল কোডটি সঠিক নয়');
  }
  if (errors.length) {
    return res.render('auth', { tab: 'register', errors, old: { ref_code, full_name, mobile, email }, videoHtml: videoBlock() });
  }

  const regBonus = num(db.getSetting('register_bonus', 0));
  const refBonus = num(db.getSetting('referral_bonus', 0));
  const id = db.tx(() => {
    const uid = db.createUser({
      ref_code: db.newRefCode(),
      full_name: name, mobile: mob, email: em,
      password_hash: bcrypt.hashSync(password, 10),
      referred_by: referrer ? referrer.id : null,
    });
    if (regBonus > 0) db.addBalance(uid, regBonus, 'register_bonus', 'রেজিস্ট্রেশন বোনাস');
    if (referrer && refBonus > 0) db.addBalance(referrer.id, refBonus, 'referral_bonus', `নতুন রেফারেল: ${name}`);
    return uid;
  });
  req.session.userId = id;
  db.touchLogin(id);
  res.redirect('/dashboard');
});

app.post('/login', (req, res) => {
  const { email = '', password = '', remember = '' } = req.body;
  const u = db.getUserByEmail(email.trim());
  if (!u || !bcrypt.compareSync(password, u.password_hash)) {
    return res.render('auth', { tab: 'login', errors: ['ইমেইল বা পাসওয়ার্ড সঠিক নয়'], old: { email }, videoHtml: '' });
  }
  if (remember) req.session.cookie.maxAge = 30 * 24 * 3600 * 1000;
  req.session.userId = u.id;
  db.touchLogin(u.id);
  res.redirect('/dashboard');
});

app.get('/forgot', (req, res) => {
  res.render('forgot', { email: req.query.email || '' });
});
app.post('/forgot', (req, res) => {
  const email = String(req.body.email || '').trim();
  const exists = !!db.getUserByEmail(email);
  res.render('forgot', { email, done: true, exists, sent: false });
});

app.post('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/login'));
});

/* ---------- dashboard ---------- */

app.get('/dashboard', requireUser, (req, res) => {
  const u = res.locals.user;
  res.render('dashboard', {
    user: u,
    tasks: db.allTasks(),
    notices: db.enabledNotices(),
    counts: db.teamCounts(u.id),
    welcome: !u.welcome_shown,
  });
});

app.post('/welcome/close', requireUser, (req, res) => {
  db.markWelcomeShown(req.session.userId);
  res.redirect('/dashboard');
});

/* ---------- task pages ---------- */

app.get('/task/:id', requireUser, (req, res) => {
  const t = db.getTaskById(req.params.id);
  if (!t || !t.enabled) return res.redirect('/dashboard');
  const u = res.locals.user;
  res.render('task', { user: u, task: t, claimedToday: db.claimedToday(u.id, t.id), settings: res.locals.settings });
});

app.post('/task/:id/claim', requireUser, (req, res) => {
  const t = db.getTaskById(req.params.id);
  const u = res.locals.user;
  if (!t || !t.enabled) return res.redirect('/dashboard');
  if (t.locked) setFlash(req, 'error', 'এই প্রজেক্টটি এখনো লক করা আছে');
  else if (!u.is_active) setFlash(req, 'error', 'রিওয়ার্ড পেতে আগে আপনার একাউন্ট অ্যাক্টিভ করুন');
  else if (db.claimedToday(u.id, t.id)) setFlash(req, 'error', 'আপনি আজ এই টাস্কের রিওয়ার্ড ইতিমধ্যে নিয়েছেন');
  else {
    db.claimTask(u.id, t.id, t.reward);
    db.addBalance(u.id, t.reward, 'task_reward', `টাস্ক: ${t.name_bn}`);
    setFlash(req, 'success', `+৳${t.reward} ব্যালেন্সে যোগ হয়েছে`);
  }
  res.redirect('/task/' + t.id);
});

/* ---------- internal project pages ---------- */

app.get('/gift', requireUser, (req, res) => {
  res.render('gift', { user: res.locals.user, claimedToday: db.giftClaimedToday(res.locals.user.id) });
});
app.post('/gift/claim', requireUser, (req, res) => {
  const u = res.locals.user;
  const code = String(req.body.code || '').trim();
  const reward = num(db.getSetting('gift_reward', 0));
  if (!code) setFlash(req, 'error', 'গিফট কোড লিখুন');
  else if (!u.is_active) setFlash(req, 'error', 'বোনাস পেতে আগে একাউন্ট অ্যাক্টিভ করুন');
  else if (db.giftClaimedToday(u.id)) setFlash(req, 'error', 'আজকের গিফট বোনাস ইতিমধ্যে নিয়েছেন');
  else if (code.toLowerCase() !== String(db.getSetting('gift_code', '')).toLowerCase()) setFlash(req, 'error', 'কোডটি সঠিক নয় — কোড আমাদের টেলিগ্রাম চ্যানেলে দেওয়া হয়');
  else {
    db.insertGiftClaim(u.id, code, reward);
    db.addBalance(u.id, reward, 'gift_bonus', `গিফট কোড: ${code}`);
    setFlash(req, 'success', `+৳${reward} গিফট বোনাস যোগ হয়েছে`);
  }
  res.redirect('/gift');
});

app.get('/target', requireUser, (req, res) => {
  const u = res.locals.user;
  const counts = db.teamCounts(u.id);
  const tiers = db.safeParse(db.getSetting('target_tiers', '[]'), []);
  res.render('target', { user: u, tiers: tiers.map(t => ({ ...t, claimed: db.targetClaimed(u.id, t.tier) })), teamTotal: counts.reduce((a, b) => a + b, 0) });
});
app.post('/target/claim', requireUser, (req, res) => {
  const u = res.locals.user;
  const tier = String(req.body.tier || '');
  const tiers = db.safeParse(db.getSetting('target_tiers', '[]'), []);
  const t = tiers.find(x => String(x.tier) === tier);
  const teamTotal = db.teamCounts(u.id).reduce((a, b) => a + b, 0);
  if (!t) setFlash(req, 'error', 'সঠিক টার্গেট নির্বাচন করুন');
  else if (!u.is_active) setFlash(req, 'error', 'বোনাস পেতে আগে একাউন্ট অ্যাক্টিভ করুন');
  else if (teamTotal < Number(t.tier)) setFlash(req, 'error', `এই টার্গেট জন্য আপনার টীমে আরও ${Number(t.tier) - teamTotal} জন দরকার`);
  else if (db.targetClaimed(u.id, tier)) setFlash(req, 'error', 'এই টার্গেটের বোনাস ইতিমধ্যে নিয়েছেন');
  else {
    db.insertTargetClaim(u.id, tier, t.bonus);
    db.addBalance(u.id, t.bonus, 'target_bonus', `টার্গেট ${t.tier} রেফারেল বোনাস`);
    setFlash(req, 'success', `+৳${t.bonus} টার্গেট বোনাস যোগ হয়েছে`);
  }
  res.redirect('/target');
});

app.get('/leadership', requireUser, (req, res) => {
  const u = res.locals.user;
  const counts = db.teamCounts(u.id);
  const total = counts.reduce((a, b) => a + b, 0);
  const levels = [
    { min: 0, name: 'নতুন সদস্য', icon: 'fa-seedling', color: '#94a3b8' },
    { min: 1, name: 'ব্রোঞ্জ লিডার', icon: 'fa-medal', color: '#b45309' },
    { min: 10, name: 'সিলভার লিডার', icon: 'fa-medal', color: '#64748b' },
    { min: 50, name: 'গোল্ড লিডার', icon: 'fa-medal', color: '#f59e0b' },
    { min: 100, name: 'প্লাটিনাম লিডার', icon: 'fa-crown', color: '#8b5cf6' },
  ];
  let current = levels[0], next = null;
  for (let i = levels.length - 1; i >= 0; i--) {
    if (total >= levels[i].min) { current = levels[i]; next = levels[i + 1] || null; break; }
  }
  res.render('leadership', { user: u, counts, total, current, next });
});

/* ---------- team / referral ---------- */

app.get('/team', requireUser, (req, res) => {
  const u = res.locals.user;
  const counts = db.teamCounts(u.id);
  const refLink = `${req.protocol}://${req.get('host')}/register?ref=${u.ref_code}`;
  const levelData = [1, 2, 3, 4].map(l => ({ level: l, count: counts[l - 1], members: db.teamLevelMembers(u.id, l).slice(0, 20) }));
  res.render('team', { user: u, counts, refLink, levelData });
});

/* ---------- profile / account settings ---------- */

app.get('/profile', requireUser, (req, res) => {
  res.render('profile', { user: res.locals.user });
});
app.post('/profile', requireUser, (req, res) => {
  const u = res.locals.user;
  const name = String(req.body.full_name || '').trim();
  const cur = String(req.body.current_password || '');
  const nw = String(req.body.new_password || '');
  if (name.length < 3) setFlash(req, 'error', 'সঠিক পুরো নাম লিখুন');
  else {
    db.updateUser(u.id, { full_name: name });
    if (nw) {
      if (!bcrypt.compareSync(cur, u.password_hash)) setFlash(req, 'error', 'বর্তমান পাসওয়ার্ড সঠিক নয়');
      else if (nw.length < 6) setFlash(req, 'error', 'নতুন পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে');
      else {
        db.updateUser(u.id, { password_hash: bcrypt.hashSync(nw, 10) });
        setFlash(req, 'success', 'সেটিংস সেভ হয়েছে');
        return res.redirect('/profile');
      }
    }
    setFlash(req, 'success', 'সেটিংস সেভ হয়েছে');
  }
  res.redirect('/profile');
});

/* ---------- wallet / withdraw ---------- */

app.get('/wallet', requireUser, (req, res) => {
  res.render('wallet', { user: res.locals.user, methods: ['bKash', 'Nagad', 'Rocket'] });
});
app.post('/wallet/withdraw', requireUser, (req, res) => {
  const u = res.locals.user;
  const amount = num(req.body.amount);
  const method = String(req.body.method || '').trim();
  const account = String(req.body.account_number || '').trim();
  const minW = num(db.getSetting('min_withdraw', 100));
  if (!u.is_active) setFlash(req, 'error', 'উইথড্র করতে একাউন্ট অ্যাক্টিভ করুন');
  else if (!(amount > 0)) setFlash(req, 'error', 'সঠিক টাকার পরিমাণ লিখুন');
  else if (amount < minW) setFlash(req, 'error', `ন্যূনতম উইথড্র পরিমাণ ৳${minW}`);
  else if (amount > u.balance) setFlash(req, 'error', 'পর্যাপ্ত ব্যালেন্স নেই');
  else if (!['bKash', 'Nagad', 'Rocket'].includes(method)) setFlash(req, 'error', 'পেমেন্ট মেথড নির্বাচন করুন');
  else if (!/^01[3-9]\d{8}$/.test(account)) setFlash(req, 'error', 'সঠিক মোবাইল নম্বর দিন (01XXXXXXXXX)');
  else {
    db.tx(() => {
      db.insertWithdrawal({ userId: u.id, amount, method, accountNumber: account });
      db.addBalance(u.id, -amount, 'withdraw', `উইথড্র রিকোয়েস্ট (${method} • ${account})`);
    });
    setFlash(req, 'success', 'উইথড্র রিকোয়েস্ট পাঠানো হয়েছে — এডমিন অনুমোদনের অপেক্ষায়');
  }
  res.redirect('/wallet');
});

app.get('/history', requireUser, (req, res) => {
  res.render('history', { user: res.locals.user, rows: db.userWithdrawals(res.locals.user.id) });
});

/* ---------- support ---------- */

app.get('/help', requireUser, (req, res) => {
  res.render('help', { user: res.locals.user });
});

app.use((req, res) => res.status(404).render('404', { user: res.locals.user }));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[user-site] DigitEarn user website running at http://0.0.0.0:${PORT}`);
});
