/* DigitEarn Admin Panel — UI (hash routing, mobile-first) */
import '@fortawesome/fontawesome-free/css/all.min.css';
import './styles.css';
import {
  auth, firebaseReady, onAuthStateChanged, signInWithEmailAndPassword, signOut,
  isAdminEmail, adminVerify, checkHealth, esc, fmt, timeBn,
  overviewStats, listProofs, approveProof, rejectProof, getUser,
  listDeposits, approveDeposit, rejectDeposit,
  listWithdrawals, reviewWithdrawal,
  listUsers, getUserWithdrawals, getUserTransactions, setUserActive,
  listTasks, saveTask, seedTasks, deleteTask,
  listJobStats, listJobProofs, createMicrojob, decideProof, syncLeaderboard,
  getWallet, listAdminWallets, setAdminBalance, setAdminRole, setAdminMode, publishMicrojob,
  listAdminJoins, approveAdminJoin, rejectAdminJoin, createAdminAccount, setAdminSuspended, applyForAdmin,
  getSettings, saveSettings, clearGiftCode,
  listNotices, addNotice, updateNotice, deleteNotice,
  listUserTargetNotices, addTargetedNotice, updateTargetedNotice, deleteTargetedNotice, listTargetedAll,
} from './core.js';

import { pickImage } from '../core/jobform.js';   // ছবি resize (admin upload, Storage bucket লাগে না)

const app = document.getElementById('app');
let me = null;

/* ---------- toast ---------- */
function toast(msg, type = 'success') {
  const t = document.createElement('div');
  t.className = 'adm-toast ' + type;
  t.innerHTML = `<i class="fa-solid ${type === 'error' ? 'fa-circle-xmark' : 'fa-circle-check'}"></i> ${esc(msg)}`;
  app.appendChild(t);
  requestAnimationFrame(() => t.classList.add('show'));
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 300); }, 3200);
}

/* ---------- reason modal (reject/বাতিল এর কারণ) ----------
   `prompt()` WebView-এ reliably কাজ করে না (WebChromeClient.onJsPrompt লাগে),
   তাই in-page modal — web + admin app দুই জায়গাতেই একই রকম। */
function askReason(title = 'কারণ লিখুন', placeholder = 'কারণ লিখুন — user/আবেদনকারী এটাই দেখবে', opts = {}) {
  return new Promise(resolve => {
    const wrap = document.createElement('div');
    wrap.className = 'adm-modal';
    wrap.innerHTML = `<div class="am-box">
      <h5>${esc(title)}</h5>
      ${opts.hint ? `<p class="muted">${esc(opts.hint)}</p>` : ''}
      <textarea class="adm-input" rows="3" maxlength="200" placeholder="${esc(placeholder)}"></textarea>
      <div class="am-row">
        <button type="button" class="adm-btn ghost sm" data-x>বাতিল</button>
        <button type="button" class="adm-btn ${opts.tone === 'green' ? 'green' : 'red'} sm" data-ok>${esc(opts.okLabel || 'পাঠিয়ে দিন')}</button>
      </div></div>`;
    app.appendChild(wrap);
    const ta = wrap.querySelector('textarea');
    setTimeout(() => ta.focus(), 30);
    const done = v => { wrap.remove(); document.removeEventListener('keydown', onKey); resolve(v); };
    const onKey = e => { if (e.key === 'Escape') done(null); };
    document.addEventListener('keydown', onKey);
    wrap.querySelector('[data-x]').addEventListener('click', () => done(null));
    wrap.querySelector('[data-ok]').addEventListener('click', () => {
      const t = String(ta.value || '').trim();
      if (t.length < 3) { ta.classList.add('bad'); ta.placeholder = 'কমপক্ষে ৩ অক্ষর লিখুন'; return; }
      done(t);
    });
    wrap.addEventListener('click', e => { if (e.target === wrap) done(null); });
  });
}

/* ---------- auth ---------- */
if (!firebaseReady) {
  app.innerHTML = `<div class="loading-center"><p style="max-width:340px;text-align:center">Firebase env variables set নেই।<br>Vercel-এ ৬টা <b>VITE_FIREBASE_*</b> variable দিন।</p></div>`;
}

onAuthStateChanged(auth, fbUser => {
  if (!fbUser) { me = null; renderLogin(); return; }
  adminGate(fbUser);
});

/* Admin check — server 5xx/নেটওয়ার্ক সমস্যা হলে session ঠিক রেখে retry দেখায়
   (আগে signOut + "আপনি admin নন" — ভুল বার্তা + লগআউটের ঝামেলা)। */
async function adminGate(fbUser) {
  const v = await adminVerify();
  if (v.error) {
    app.innerHTML = `<div class="loading-center" style="display:block;text-align:center;padding:28px">
      <p style="margin-bottom:12px">Admin check করা যায়নি:<br><b style="font-size:13px">${esc(v.error)}</b></p>
      <button class="adm-btn gold" id="gateRetry"><i class="fa-solid fa-rotate"></i> আবার চেষ্টা করুন</button>
      <p class="muted" style="margin-top:12px;font-size:12px">লগইন ভাঙেনি — শুধু সার্ভার উত্তর দেয়নি।</p></div>`;
    document.getElementById('gateRetry').addEventListener('click', () => adminGate(fbUser));
    return;
  }
  if (!v.isAdmin) {
    await signOut(auth);
    renderLogin('এই email টা admin list-এ নেই — Firestore-এর admins collection-এ এই email-এর document আছে কিনা দেখুন।');
    return;
  }
  me = { email: fbUser.email };
  window.location.hash = window.location.hash || '#/overview';
  renderShell();
  window.addEventListener('hashchange', onHash);
}

function renderLogin(errMsg = '', mode = 'login') {
  /* দুইটা option — "Login" (already admin) ও "Join admin" (নতুন admin আবেদন)।
     Join শুধু আবেদন পাঠায়; Owner/Full Access অনুমোদন করলেই account চালু হয়। */
  app.innerHTML = `
    <div class="login-wrap">
      <div class="login-card">
        <div class="login-logo"><i class="fa-solid fa-bolt"></i></div>
        <h1>DigitEarn <span>Admin</span></h1>
        <p class="muted">${mode === 'join' ? 'Admin হতে আবেদন পাঠান' : 'Admin panel-এ লগইন করুন'}</p>
        <div class="auth-tabs" role="tablist">
          <button type="button" class="auth-tab ${mode === 'login' ? 'on' : ''}" data-am="login"><i class="fa-solid fa-right-to-bracket"></i> Login</button>
          <button type="button" class="auth-tab ${mode === 'join' ? 'on' : ''}" data-am="join"><i class="fa-solid fa-user-plus"></i> Join admin</button>
        </div>
        ${errMsg ? `<div class="form-err"><i class="fa-solid fa-triangle-exclamation"></i> ${esc(errMsg)}</div>` : ''}
        <form id="loginForm" ${mode === 'join' ? 'hidden' : ''}>
          <input type="email" id="lgEmail" class="adm-input" placeholder="Admin email" required autocomplete="username">
          <input type="password" id="lgPass" class="adm-input" placeholder="পাসওয়ার্ড" required autocomplete="current-password">
          <label class="check-label"><input type="checkbox" id="keepLogin" checked> আমাকে মনে রাখুন</label>
          <button class="adm-btn gold" type="submit"><i class="fa-solid fa-right-to-bracket"></i> লগইন করুন</button>
          <a href="/forgot-password.html" class="forgot-link">পাসওয়ার্ড ভুলে গেছেন?</a>
        </form>
        <form id="joinForm" ${mode === 'join' ? '' : 'hidden'}>
          <input class="adm-input" id="jName" placeholder="আপনার নাম" maxlength="60" required>
          <input type="email" class="adm-input" id="jEmail" placeholder="যে email দিয়ে login করবেন" maxlength="120" required autocomplete="email">
          <select class="adm-input" id="jRole">
            <option value="poster">Job Poster admin (ব্যালেন্স দিয়ে job প্রকাশ)</option>
            <option value="full">Full Access admin (সব panel, ব্যালেন্স লাগে না)</option>
          </select>
          <textarea class="adm-input" id="jNote" rows="3" maxlength="300" placeholder="কেন admin হতে চান? (১-২ লাইন)"></textarea>
          <button class="adm-btn gold" type="submit"><i class="fa-solid fa-paper-plane"></i> আবেদন পাঠান</button>
          <p class="muted" style="font-size:12px;margin-top:8px">আবেদন অনুমোদন হলে আপনাকে একটা পাসওয়ার্ড সেট করার লিংক দেওয়া হবে। এই ফর্মের কোনো লেখা public site-এ দেখায় না।</p>
        </form>
      </div>
    </div>`;

  app.querySelectorAll('[data-am]').forEach(b => b.addEventListener('click', () => renderLogin('', b.dataset.am)));

  const lf = document.getElementById('loginForm');
  lf?.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
    try {
      await signInWithEmailAndPassword(auth, document.getElementById('lgEmail').value.trim(), document.getElementById('lgPass').value);
    } catch (err) {
      btn.disabled = false;
      btn.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i> লগইন করুন';
      const code = String(err && (err.code || err.message) || '');
      renderLogin(/user-not-found|wrong-password|invalid-?login/i.test(code)
        ? 'email বা পাসওয়ার্ড ঠিক নেই (অথবা এই email-এ account নেই) — আবেদন করতে চাইলে “Join admin” টিপুন।'
        : 'লগইন করা যায়নি: ' + (code.slice(0, 80) || 'আবার চেষ্টা করুন'), 'login');
    }
  });

  document.getElementById('joinForm')?.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    btn.disabled = true;
    try {
      await applyForAdmin({
        fullName: document.getElementById('jName').value.trim(),
        email: document.getElementById('jEmail').value.trim(),
        role: document.getElementById('jRole').value,
        note: document.getElementById('jNote').value.trim(),
      });
      app.innerHTML = `<div class="login-wrap"><div class="login-card">
        <div class="login-logo ok"><i class="fa-solid fa-circle-check"></i></div>
        <h1>আবেদন পাঠানো হয়েছে</h1>
        <p class="muted">Owner বা Full Access admin অনুমোদন করলে আপনার email-এ পাসওয়ার্ড সেট করার লিংক পাঠানো হবে।</p>
        <button class="adm-btn gold" id="bkLogin"><i class="fa-solid fa-right-to-bracket"></i> Login</button>
      </div></div>`;
      document.getElementById('bkLogin').addEventListener('click', () => renderLogin());
    } catch (err) {
      btn.disabled = false;
      renderLogin(String(err.message || 'আবেদন পাঠানো যায়নি — একটু পরে আবার চেষ্টা করুন'), 'join');
    }
  });
}

/* ---------- shell ---------- */
const NAV = [
  { id: 'overview', label: 'Overview', icon: 'fa-gauge-high' },
  { id: 'proofs', label: 'Submissions', icon: 'fa-clipboard-list' },
  { id: 'deposits', label: 'Deposits', icon: 'fa-money-bill-wave' },
  { id: 'withdrawals', label: 'Withdrawals', icon: 'fa-money-bill-transfer' },
  { id: 'users', label: 'Users', icon: 'fa-users' },
  { id: 'microjobs', label: 'MicroJobs', icon: 'fa-briefcase' },
  { id: 'wallet', label: 'অ্যাডমিন ম্যানেজমেন্ট', icon: 'fa-sitemap' },
  { id: 'tasks', label: 'টাস্ক (অ্যাকাউন্ট সেল)', icon: 'fa-store' },
  { id: 'settings', label: 'Settings', icon: 'fa-gear' },
  { id: 'notices', label: 'Notices', icon: 'fa-bullhorn' },
];

function renderShell() {
  /* section গুলো বাঁ দিকের 3-line (hamburger) মেনুতে — মোবাইলে ট্যাব strip স্ক্রল
     করা কষ্টের ছিল; এখন এক ক্লিকে খুলে যেটা দরকার সেটা টিপলেই ঐ page */
  app.innerHTML = `
    <header class="adm-top">
      <button class="adm-menu-btn" id="admMenu" aria-label="মেনু খুলুন"><i class="fa-solid fa-bars"></i></button>
      <div class="adm-logo"><i class="fa-solid fa-bolt"></i> DigitEarn <span>Admin</span></div>
      <div class="adm-top-right">
        <button class="adm-bell" id="admBell" aria-label="নতুন রিকোয়েস্ট"><i class="fa-solid fa-bell"></i><span class="adm-bell-n" id="bellCount" hidden>0</span></button>
        <button class="adm-btn ghost sm" id="logoutBtn" aria-label="লগআউট"><i class="fa-solid fa-right-from-bracket"></i></button>
      </div>
    </header>
    <div class="adm-drawer" id="admDrawer" hidden>
      <div class="adm-drawer-scrim" data-close></div>
      <nav class="adm-drawer-nav">
        <div class="adm-drawer-who"><i class="fa-solid fa-user-shield"></i><b>${esc(me.email)}</b><span id="drawerRole" class="muted"></span></div>
        ${NAV.map(n => `<a href="#/${n.id}" data-nav="${n.id}"><i class="fa-solid ${n.icon}"></i> ${n.label}<span class="dd-n" data-badge="${n.id}" hidden></span></a>`).join('')}
        <button class="adm-btn ghost sm adm-drawer-out" id="drawerLogout"><i class="fa-solid fa-right-from-bracket"></i> লগআউট</button>
      </nav>
    </div>
    <div class="adm-alerts" id="admAlerts" hidden></div>
    <main class="adm-main" id="admMain"><div class="loading-center"><i class="fa-solid fa-spinner fa-spin"></i></div></main>`;
  const go = fn => { document.getElementById('logoutBtn').addEventListener('click', fn); document.getElementById('drawerLogout').addEventListener('click', fn); };
  go(() => { stopAlerts(); signOut(auth); });
  const drawer = document.getElementById('admDrawer');
  document.getElementById('admMenu').addEventListener('click', () => { drawer.hidden = !drawer.hidden; });
  drawer.addEventListener('click', e => { if (e.target.closest('[data-close]') || e.target.closest('[data-nav]')) drawer.hidden = true; });
  document.getElementById('admBell').addEventListener('click', () => renderAlerts(true));
  getWallet().then(w => {
    const el = document.getElementById('drawerRole');
    if (!el || !w || w.error) return;
    el.textContent = (ROLE_LABEL[w.role] || w.role) + (w.needsBalance ? ` · ব্যালেন্স ${fmt(w.balance)}` : '');
  }).catch(() => {});
  onHash();
  startAlerts();
}

/* ---------- নতুন withdrawal রিকোয়েস্ট → admin app/panel-এ নোটিফিকেশন ----------
   phone/no. push token লাগে না: panel খোলা থাকলে ৪৫ সেকেন্ড পরপর pending queue দেখে,
   নতুন id পেলে toast + vibrate + bell badge। "পড়া হয়েছে" মার্ক localStorage-এ (per admin)। */
/** admin app (WebView) থাকলে native notification পাঠায় — browser-এ চুপচাপ skip */
function nativeNotify(title, body) {
  try {
    const br = window.DigitEarnBridge;
    if (br && typeof br.notify === 'function') br.notify(String(title || ''), String(body || ''));
  } catch (_) { /* bridge না থাকলে সমস্যা নেই — in-app toast তো আছেই */ }
}

let alertTimer = null;
let lastPending = null;
const seenKey = () => 'de:admSeenWd:' + String((me && me.email) || '');
const seenIds = () => { try { return new Set(JSON.parse(localStorage.getItem(seenKey()) || '[]')); } catch (_) { return new Set(); } };
const markSeen = ids => { try { localStorage.setItem(seenKey(), JSON.stringify(ids.slice(-400))); } catch (_) {} };

async function pollAlerts(showAll = false) {
  if (!document.getElementById('admMain') || !me) return;
  let items = [];
  try { items = await listWithdrawals('pending', 50); } catch (_) { return; }   /* network/5xx চুপচাপ — পরের tick */
  const seen = seenIds();
  const fresh = showAll ? items : items.filter(x => x && x.id && !seen.has(x.id));
  lastPending = items;
  const badge = document.getElementById('bellCount');
  if (badge) { const n = items.filter(x => x && x.id && !seen.has(x.id)).length; badge.textContent = String(n); badge.hidden = !n; }
  NAV.forEach(n => { const el = document.querySelector(`[data-badge="${n.id}"]`); if (el && n.id === 'withdrawals') { el.textContent = String(items.length); el.hidden = !items.length; } });
  renderAlerts(false, items);
  if (fresh.length) {
    const first = fresh[0];
    const who = first.name || first.userId || 'user';
    const line = `উইথড্র : ${Number(first.amount || 0)} BDT • ${first.accountNumber || '—'}`;
    toast(`নতুন উইথড্র রিকোয়েস্ট: ${who} — ৳${Number(first.amount || 0)}`, 'error');
    nativeNotify(`${fresh.length > 1 ? fresh.length + 'টা নতুন উইথড্র রিকোয়েস্ট' : 'নতুন উইথড্র রিকোয়েস্ট — ' + who}`, line);
    try { navigator.vibrate && navigator.vibrate([140, 70, 140]); } catch (_) {}
  }
  markSeen(items.map(x => x.id).filter(Boolean));
}
function renderAlerts(open, itemsArg) {
  const box = document.getElementById('admAlerts');
  if (!box) return;
  const items = (itemsArg || lastPending || []).slice(0, 12);
  if (open && !box.hidden) { box.hidden = true; return; }
  if (open) box.hidden = false;
  else if (box.hidden) return;
  box.innerHTML = `<div class="al-head"><b><i class="fa-solid fa-money-bill-transfer" style="color:#d97706"></i> নতুন উইথড্র রিকোয়েস্ট</b>
      <button class="adm-btn ghost sm" id="alClose"><i class="fa-solid fa-xmark"></i></button></div>
    ${items.length ? items.map(w => `
      <div class="al-row">
        <span class="al-ico"><i class="fa-solid fa-user"></i></span>
        <div class="al-txt"><b>${esc(w.name || w.userId || 'User')}</b>
          <span>উইথড্র : <b>${Number(w.amount || 0)} BDT</b> • ${esc(w.method || '')} • নম্বর ${esc(w.accountNumber || '—')}</span>
          <span class="muted">${timeBn(w.createdAt)}</span></div>
        <a class="adm-btn gold sm" href="#/withdrawals" data-alopen>খুলুন</a>
      </div>`).join('') : '<p class="muted" style="padding:10px 12px">এখনো কোনো অপেক্ষমাণ রিকোয়েস্ট নেই।</p>'}`;
  document.getElementById('alClose')?.addEventListener('click', () => { box.hidden = true; });
  box.querySelectorAll('[data-alopen]').forEach(a => a.addEventListener('click', () => { box.hidden = true; }));
}
function startAlerts() {
  stopAlerts();
  if (!me) return;
  pollAlerts(false);
  alertTimer = setInterval(() => pollAlerts(false), 45_000);
}
function stopAlerts() { if (alertTimer) clearInterval(alertTimer); alertTimer = null; lastPending = null; }

async function onHash() {
  const view = (window.location.hash || '#/overview').replace('#/', '');
  const main = document.getElementById('admMain');
  if (!main) return;
  document.querySelectorAll('[data-nav]').forEach(a => a.classList.toggle('on', a.dataset.nav === view));
  main.innerHTML = '<div class="loading-center"><i class="fa-solid fa-spinner fa-spin"></i></div>';
  try {
    if (view === 'proofs') await viewProofs(main);
    else if (view === 'deposits') await viewDeposits(main);
    else if (view === 'withdrawals') await viewWithdrawals(main);
    else if (view === 'users') await viewUsers(main);
    else if (view === 'tasks') await viewTasks(main, 'task');
    else if (view === 'microjobs') await viewTasks(main, 'microjob');
    else if (view === 'wallet' || view === 'admins') await viewWallet(main);
    else if (view === 'settings') await viewSettings(main);
    else if (view === 'notices') await viewNotices(main);
    else await viewOverview(main);
  } catch (err) {
    /* "Missing or insufficient permissions." = Firestore rules — admin-কে বোঝাতে
       হয় কী দেখতে হবে, নইলে panel-এর সব tab একই লাল বাক্স দেখাত (কোনো guidance না) */
    const m = String((err && err.message) || err);
    const perm = /permission|insufficient/i.test(m);
    main.innerHTML = `<div class="form-err"><i class="fa-solid fa-triangle-exclamation"></i> ${esc(m)}
      ${perm ? `<div class="muted" style="font-size:12px;margin-top:8px">
        Panel এখন server (Admin SDK) দিয়ে পড়ে — নিচের ↻ বাটন চাপুন। না চললে দেখুন:
        Firestore-এর <code>admins/&lt;email&gt;</code> doc-id হুবহু আপনার login email
        হতে হবে (বড়/ছোট হাতের তফাতও fail করে), আর Vercel function-এর build
        নতুন কিনা (?op=read থাকতে হবে)।</div>` : ''}</div>`;
  }
}

/* ---------- overview ---------- */
async function viewOverview(main) {
  const s = await overviewStats();
  main.innerHTML = `
    <div class="stat-grid">
      <div class="adm-stat gold"><i class="fa-solid fa-users"></i><b>${s.totalUsers}</b><span>মোট ইউজার</span></div>
      <div class="adm-stat green"><i class="fa-solid fa-circle-check"></i><b>${s.activeUsers}</b><span>অ্যাক্টিভ</span></div>
      <div class="adm-stat red"><i class="fa-solid fa-clipboard-list"></i><b>${s.pendingProofs}</b><span>জমার রিভিউ</span></div>
      <div class="adm-stat red"><i class="fa-solid fa-money-bill-wave"></i><b>${s.pendingDeposits}</b><span>ডিপোজিট রিভিউ</span></div>
    </div>
    <div class="adm-card"><h4><i class="fa-solid fa-scale-balanced" style="color:#d97706"></i> মোট Outstanding Balance</h4>
      <div class="big-num">${fmt(s.totalBalance)}</div>
      <p class="muted">সব ইউজারের ব্যালেন্সের যোগফল (প্রতি ১০০০ ইউজার পর্যন্ত)।</p>
    </div>
    ${s.recentProofs.length ? `
    <div class="adm-card">
      <h4><i class="fa-solid fa-clipboard-list" style="color:#d97706"></i> সর্বশেষ Pending Submissions</h4>
      ${s.recentProofs.map(p => `<div class="mini-row"><b>${esc(p.taskName || p.taskSlug)}</b> <span class="muted">${timeBn(p.createdAt)}</span><span class="badge gold">+${fmt(p.reward)}</span></div>`).join('')}
      <a href="#/proofs" class="link-more">সব দেখুন →</a>
    </div>` : ''}
    ${s.recentDeposits.length ? `
    <div class="adm-card">
      <h4><i class="fa-solid fa-money-bill-wave" style="color:#d97706"></i> সর্বশেষ Pending Deposits</h4>
      ${s.recentDeposits.map(d => `<div class="mini-row"><b>${esc(d.method)}</b> <span class="muted">${timeBn(d.createdAt)}</span><span class="badge gold">${fmt(d.amount)}</span></div>`).join('')}
      <a href="#/deposits" class="link-more">সব দেখুন →</a>
    </div>` : ''}
    ${!s.recentProofs.length && !s.recentDeposits.length ? '<p class="muted center-note">কোনো pending item নেই ✓</p>' : ''}
    <div class="adm-card">
      <h4><i class="fa-solid fa-stethoscope" style="color:#d97706"></i> সিস্টেম চেক (API auth)</h4>
      <p class="muted" style="font-size:13px;margin-bottom:10px">ইউজার যদি “Login required” দেখায় বা approve/reject fail করে, এখানে চাপলে কারণটা দেখাবে — Vercel-এর Firebase env, service account-এর project, আর Firestore পড়া যাচ্ছে কিনা।</p>
      <button class="adm-btn ghost sm" id="healthBtn"><i class="fa-solid fa-heart-pulse"></i> Check করুন</button>
      <div id="healthOut" style="margin-top:10px"></div>
    </div>`;
  document.getElementById('healthBtn').addEventListener('click', runHealthCheck);
}

async function runHealthCheck() {
  const out = document.getElementById('healthOut');
  if (out) out.innerHTML = '<span class="muted"><i class="fa-solid fa-spinner fa-spin"></i> চেক হচ্ছে…</span>';
  let h;
  try { h = await checkHealth(); } catch (err) {
    if (out) out.innerHTML = `<div class="form-err">${esc(String(err.message || err))}</div>`;
    return;
  }
  const row = (pass, label, detail) => `<div class="mini-row"><span class="badge ${pass ? 'green' : 'red'}">${pass ? '✓' : '✗'}</span> ${esc(label)}${detail ? ` <span class="muted">${esc(detail)}</span>` : ''}</div>`;
  const rows = [
    row(!!h.ok, 'সামগ্রিক', h.ok ? 'server ঠিক আছে — ইউজারের “Login required” হলে সেটা deployment-এর dosh নয়' : 'server-side সেটআপে সমস্যা'),
    row(!!h.firestore && !!h.firestore.reachable, 'Firestore পড়া', h.firestore && h.firestore.settingsDoc ? 'settings/site পাওয়া গেছে' : 'পড়া যাচ্ছে না'),
    /* deployed Admin SDK identity — v14 (ESM-only jose) Vercel-এর Node 20 runtime-এ
       প্রতিটা function-কে load হওয়ার আগেই মেরে ফেলে (ERR_REQUIRE_ESM, 2026-09-12 outage) */
    row(!h.sdk || h.sdk.cjsRequireSafe !== false, 'Admin SDK (firebase-admin)',
      `v${(h.sdk && h.sdk.version) || '?'}${h.sdk && h.sdk.jose ? ' · jose@' + h.sdk.jose : ''}`
      + (h.sdk && h.sdk.cjsRequireSafe === false ? ' — CJS require() ভাঙে, functions 500 (Node 22.x বা ^13.10.0 pin লাগবে)' : '')),
    row(!!h.privateKeyShape, 'Private key ফরম্যাট', ''),
    row(!!h.projectMatch, 'Project match', `site: ${h.tokenProject || h.serverProject || '?'} / server: ${h.serverProject || '?'} / SA: ${h.serviceAccountProject || '?'}`),
    row(!!h.authed, 'আপনার token verify', h.authed ? 'OK' : `ব্যর্থ (${esc(h.authState || '')} ${esc(h.authCode || '')})`),
  ].join('');
  const notes = (h.notes || []).map(n => `<p class="muted" style="font-size:12px;margin-top:6px"><i class="fa-solid fa-circle-info"></i> ${esc(n)}</p>`).join('');
  if (out) out.innerHTML = rows + notes;
}

/* ---------- task submissions (proof review queue) ---------- */
let proofFilter = 'pending';
/* Submission-এ save হওয়া dynamic fields — title + type + value (admin পরে config বদলালেও
   পুরোনো submission ঠিকভাবেই দেখা যাবে)। পুরোনো doc-এ snapshot না থাকলে submittedData
   থেকে fallback (backward compatible)। password টাইপের value ডিফল্ট লুকানো, "দেখুন" দিয়ে
   reveal, যাতে screen-share/log-এ ফাঁকি না পড়ে (raw value copy-all এ যায়)। */
function submittedFieldsHtml(data, snapshot) {
  const rows = [];
  if (Array.isArray(snapshot) && snapshot.length) {
    for (const f of snapshot) {
      if (!f || typeof f !== 'object') continue;
      const label = String(f.label || '').slice(0, 50) || 'Field';
      const type = String(f.type || 'text');
      const value = f.value === undefined || f.value === null || f.value === '' ? '' : String(f.value);
      rows.push({ label, type, value, required: !!f.required, secret: f.secret === true });
    }
  } else if (data && typeof data === 'object' && !Array.isArray(data)) {
    for (const [k, v] of Object.entries(data)) rows.push({ label: k, type: 'text', value: String(v ?? ''), required: false });
  }
  if (!rows.length) return '';
  const body = rows.map(r => {
    /* sensitive = type password / server-এ marked secret / secret-যুক্ত label
       (lib/http.js isSecretField-এর mirror) — admin screen-share/log-share-তে ফাঁকি না পায় */
    const SECRET_LABEL = /(password|passwd|pwd|passcode|otp|onetimecode|2fa|tfa|twofactor|authenticat|recovery|backupcode|secret|apikey|accesstoken|refreshtoken|privatetoken|privatekey|token|cookie|session|bearer)/;
    const normLabel = s => String(s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    const masked = !!r.value && (r.type === 'password' || r.secret || SECRET_LABEL.test(normLabel(r.label)));
    const shown = masked ? '•'.repeat(Math.min(r.value.length, 14)) : (r.value || '—');
    const reveal = masked ? `<button type="button" class="adm-btn ghost sm" data-reveal data-raw="${esc(r.value)}" style="margin-left:6px"><i class="fa-solid fa-eye"></i> দেখুন</button>` : '';
    const cls = [masked ? 'sub-secret' : '', r.type === 'textarea' ? 'sub-multi' : ''].filter(Boolean).join(' ');
    return `<div class="sub-row"><span class="muted">${esc(r.label)}:</span><b${cls ? ` class="${cls}"` : ''}>${esc(shown)}</b>${reveal}${!r.value && r.required ? ' <span class="muted">(required খালি)</span>' : ''}</div>`;
  }).join('');
  const all = rows.map(r => `${r.label}: ${r.value}`).join('\n');
  return `<div class="sub-fields">${body}</div>
    <button type="button" class="adm-btn ghost sm" data-copyall data-all="${esc(all)}" style="margin-top:6px"><i class="fa-solid fa-clipboard"></i> Copy All Data</button>`;
}
let proofKind = '';   // '' = সব, 'microjob', 'task' — দুই সিস্টেমের submission আলাদা দেখা যায়
async function viewProofs(main) {
  main.innerHTML = `
    <div class="chip-row" id="proofKindChips">
      ${[['', 'সব'], ['microjob', 'মাইক্রো জব'], ['task', 'টাস্ক (সেল)']].map(([v, l]) =>
        `<button class="chip ${proofKind === v ? 'on' : ''}" data-pk="${v}">${l}</button>`).join('')}
    </div>
    <div class="chip-row" id="proofChips">
      ${['pending', 'approved', 'rejected', 'all'].map(f => `<button class="chip ${f === proofFilter ? 'on' : ''}" data-pf="${f}">${{ pending: 'Pending', approved: 'Approved', rejected: 'Rejected', all: 'সব' }[f]}</button>`).join('')}
    </div>
    <div id="proofList"></div>`;
  document.getElementById('proofChips').addEventListener('click', e => {
    const b = e.target.closest('[data-pf]');
    if (!b) return;
    proofFilter = b.dataset.pf;
    document.querySelectorAll('[data-pf]').forEach(c => c.classList.toggle('on', c.dataset.pf === proofFilter));
    viewProofs(main);
  });
  document.getElementById('proofKindChips').addEventListener('click', e => {
    const b = e.target.closest('[data-pk]');
    if (!b) return;
    proofKind = b.dataset.pk || '';
    viewProofs(main);
  });
  const allList = await listProofs(proofFilter);
  /* kind = submission-এর সময় server বসায় (api/proof/submit.js) — পুরোনো doc-এ
     field না থাকলে সেটা টাস্ক সিস্টেমেরই ধরা হয় */
  const list = proofKind ? allList.filter(p => ((p.kind === 'microjob') ? 'microjob' : 'task') === proofKind) : allList;
  const box = document.getElementById('proofList');
  if (!list.length) { box.innerHTML = '<p class="muted center-note">কোনো submission নেই।</p>'; return; }
  const items = await Promise.all(list.map(async p => ({ p, user: p.user || await getUser(p.userId).catch(() => null) })));
  const stats = await listJobStats().catch(() => []);
  const statOf = slug => stats.find(x => x.slug === slug) || null;
  const rowHtml = ({ p, user }) => `
    <div class="adm-item">
      <div class="ai-head">
        <div class="ai-user"><b>${esc(user?.name || p.username || '—')}</b><span class="muted">${esc(user?.email || p.userEmail || '')}</span></div>
        <span class="badge ${p.status}">${{ pending: 'PENDING', approved: 'APPROVED', rejected: 'REJECTED' }[p.status] || p.status}</span>
      </div>
      <div class="ai-meta"><i class="fa-solid fa-user"></i> UID: ${esc(p.userId)}${user?.mobile ? ` • ${esc(user.mobile)}` : ''}</div>
      <div class="ai-meta"><i class="fa-solid fa-briefcase"></i> ${esc(p.taskName || p.taskSlug)} • <b class="gold-txt">${fmt(p.reward)}</b> • ${timeBn(p.createdAt)}</div>
      ${submittedFieldsHtml(p.submittedData, p.submittedFields)}
      ${(p.images || []).length ? `<div class="thumb-row">${p.images.map(u => `<a href="${esc(u)}" target="_blank" rel="noopener"><img class="adm-thumb" src="${esc(u)}" loading="lazy" alt="proof"></a>`).join('')}</div>` : ''}
      ${p.status === 'rejected' && p.note ? `<p class="ai-note"><i class="fa-solid fa-note"></i> ${esc(p.note)}</p>` : ''}
      ${p.status !== 'pending' && p.reviewedAt ? `<p class="ai-meta muted-sm">reviewed ${timeBn(p.reviewedAt)}${p.approvedBy ? ' by ' + esc(p.approvedBy) : ''}${p.rejectedBy ? ' by ' + esc(p.rejectedBy) : ''}</p>` : ''}
      ${p.status === 'pending' ? `
      <div class="ai-actions">
        <button class="adm-btn green sm" data-approve="${p.id}"><i class="fa-solid fa-check"></i> Approve +${fmt(p.reward)}</button>
        <button class="adm-btn red sm" data-rresub="${p.id}"><i class="fa-solid fa-rotate-left"></i> বাতিল — আবার জমা দিতে পারবে</button>
        <button class="adm-btn ghost sm" data-rhide="${p.id}"><i class="fa-solid fa-eye-slash"></i> বাতিল — এই user থেকে লুকান</button>
      </div>` : p.status === 'rejected' ? `<p class="ai-note"><i class="fa-solid fa-${p.hiddenForUser ? 'eye-slash' : 'rotate-left'}"></i> ${p.hiddenForUser ? 'বাতিল + লুকানো — jobটা শুধু এই user-এর list থেকে বাদ' : 'বাতিল করা হয়েছে — user ঠিক করে আবার জমা দিতে পারবে'}</p>` : ''}
    </div>`;
  /* Submissions = Microjob অনুযায়ী গ্রুপ (§12): job-এর Required/Approved/Pending/
     Rejected/Remaining + FULL badge, তারপর ওই job-এর submission গুলো। */
  const groups = new Map();
  for (const it of items) {
    const k = String(it.p.taskSlug || '(unknown)');
    if (!groups.has(k)) groups.set(k, []);
    groups.get(k).push(it);
  }
  const ordered = [...groups.entries()].sort((a, b) => b[1].length - a[1].length || String(a[0]).localeCompare(String(b[0])));
  box.innerHTML = ordered.map(([slug, rows]) => {
    const st = statOf(slug);
    const need = st ? (Number(st.requiredUsers) || 0) : 0;
    const head = `<div class="adm-card mj-jobhead">
      <b><i class="fa-solid fa-briefcase" style="color:#d97706"></i> ${esc(rows[0].p.taskName || slug)}</b>
      <span class="muted" style="margin-left:6px">${esc(slug)}</span>
      <div class="mj-statline">
        <span><i class="fa-solid fa-users"></i> Required <b>${need || '∞'}</b></span>
        <span class="ok"><i class="fa-solid fa-check"></i> Approved <b>${st ? (Number(st.approvedCount) || 0) : 0}</b></span>
        <span class="warn"><i class="fa-solid fa-hourglass-half"></i> Pending <b>${st ? (Number(st.pending) || 0) : rows.filter(x => x.p.status === 'pending').length}</b></span>
        <span class="bad"><i class="fa-solid fa-xmark"></i> Rejected <b>${st ? (Number(st.rejected) || 0) : 0}</b></span>
        <span><i class="fa-solid fa-user-plus"></i> Remaining <b>${st && st.remaining !== null && st.remaining !== undefined ? st.remaining : '∞'}</b></span>
        ${st && (st.full || st.closed) ? '<span class="badge red">সম্পূর্ণ/বন্ধ</span>' : ''}
      </div>
      <p class="muted" style="font-size:12px;margin:6px 0 0">approve করলে-ই ওই user-এর list থেকে job লুকিয়ে যাবে; Required Users শেষ হলে job স্বয়ংক্রিয়ভাবে FULL হবে (তখন আর approve হয় না)।</p>
    </div>`;
    return head + rows.map(rowHtml).join('');
  }).join('');

  box.querySelectorAll('[data-approve]').forEach(btn => btn.addEventListener('click', async () => {
    btn.disabled = true;
    try {
      await approveProof(btn.dataset.approve);
      toast('Proof approve — reward balance-এ যোগ হয়েছে');
      viewProofs(main);
    } catch (err) { toast(err.message, 'error'); btn.disabled = false; }
  }));
  box.querySelectorAll('[data-reveal]').forEach(btn => btn.addEventListener('click', () => {
    const cell = btn.previousElementSibling;
    if (!cell) return;
    const showing = btn.dataset.on === '1';
    cell.textContent = showing ? '•'.repeat(Math.min(String(btn.dataset.raw).length, 14)) : btn.dataset.raw;
    btn.innerHTML = showing ? '<i class="fa-solid fa-eye"></i> দেখুন' : '<i class="fa-solid fa-eye-slash"></i> লুকান';
    btn.dataset.on = showing ? '' : '1';
  }));
  box.querySelectorAll('[data-copyall]').forEach(btn => btn.addEventListener('click', async () => {
    const txt = btn.dataset.all || '';
    try { await navigator.clipboard.writeText(txt); toast('সব field data copy হয়েছে'); }
    catch (_) { prompt('Copy করুন:', txt); }
  }));
  /* দুই রকম reject (spec §10): Allow Resubmit = job user-এর list-এ থাকে + warning;
     Hide = শুধু ওই user থেকে লুকানো (job global ভাবে মোছে না, অন্য user পাবে) */
  const rejectWith = async (id, action, okMsg) => {
    const note = await askReason('Reject — কারণ লিখুন (user এই কারণটাই দেখবে)', 'যেমন: স্ক্রিনশটে নাম দেখা যাচ্ছে না');
    if (note === null) return;                     /* বাতিল = কিছুই হয় না */
    try {
      await decideProof(id, action, note);
      toast(okMsg);
      viewProofs(main);
    } catch (err) { toast(err.message, 'error'); }
  };
  box.querySelectorAll('[data-rresub]').forEach(btn => btn.addEventListener('click', () =>
    rejectWith(btn.dataset.rresub, 'reject_resubmit', 'Reject — user ঠিক করে আবার submit করতে পারবে')));
  box.querySelectorAll('[data-rhide]').forEach(btn => btn.addEventListener('click', () => {
    if (!confirm('Jobটা শুধু এই user-এর list থেকে লুকানো হবে (admin list-এ থাকবে)। ঠিক আছে?')) return;
    rejectWith(btn.dataset.rhide, 'reject_hide', 'Reject + Hide — এই user-এর MicroJobs list থেকে বাদ');
  }));
  box.querySelectorAll('[data-reject]').forEach(btn => btn.addEventListener('click', () =>
    rejectWith(btn.dataset.reject, 'reject_resubmit', 'Proof reject করা হয়েছে')));
}

/* ---------- deposits ---------- */
let depFilter = 'pending';
async function viewDeposits(main) {
  main.innerHTML = `
    <div class="chip-row" id="depChips">
      ${['pending', 'approved', 'rejected', 'all'].map(f => `<button class="chip ${f === depFilter ? 'on' : ''}" data-df="${f}">${{ pending: 'Pending', approved: 'Approved', rejected: 'Rejected', all: 'সব' }[f]}</button>`).join('')}
    </div>
    <div id="depList"></div>`;
  document.getElementById('depChips').addEventListener('click', e => {
    const b = e.target.closest('[data-df]');
    if (!b) return;
    depFilter = b.dataset.df;
    document.querySelectorAll('[data-df]').forEach(c => c.classList.toggle('on', c.dataset.df === depFilter));
    viewDeposits(main);
  });
  const list = await listDeposits(depFilter);
  const box = document.getElementById('depList');
  if (!list.length) { box.innerHTML = '<p class="muted center-note">কোনো deposit নেই।</p>'; return; }
  const items = await Promise.all(list.map(async d => ({ d, user: d.user || await getUser(d.userId).catch(() => null) })));
  box.innerHTML = items.map(({ d, user }) => `
    <div class="adm-item">
      <div class="ai-head">
        <div class="ai-user"><b>${esc(user?.name || d.userId)}</b><span class="muted">${esc(user?.mobile || '')}</span></div>
        <span class="badge ${d.status}">${{ pending: 'PENDING', approved: 'APPROVED', rejected: 'REJECTED' }[d.status] || d.status}</span>
      </div>
      <div class="ai-meta"><i class="fa-solid fa-money-bill-wave"></i> ${esc(d.method)} • <b class="gold-txt">${fmt(d.amount)}</b> • TrxID: <b>${esc(d.trxId)}</b>${d.senderNumber ? ` • Sender: <b>${esc(d.senderNumber)}</b>` : ''}</div>
      <div class="ai-meta muted-sm">${timeBn(d.createdAt)}${d.status !== 'pending' && d.reviewedAt ? ' • reviewed ' + timeBn(d.reviewedAt) : ''}</div>
      ${d.image ? `<div class="thumb-row"><a href="${esc(d.image)}" target="_blank" rel="noopener"><img class="adm-thumb" src="${esc(d.image)}" loading="lazy" alt="payment proof"></a></div>` : ''}
      ${d.status === 'rejected' && d.note ? `<p class="ai-note"><i class="fa-solid fa-note"></i> ${esc(d.note)}</p>` : ''}
      ${d.status === 'pending' ? `
      <div class="ai-actions">
        <button class="adm-btn green sm" data-dapprove="${d.id}"><i class="fa-solid fa-check"></i> অনুমোদন — একাউন্ট চালু</button>
        <button class="adm-btn red sm" data-dreject="${d.id}"><i class="fa-solid fa-xmark"></i> বাতিল</button>
      </div>` : ''}
    </div>`).join('');

  box.querySelectorAll('[data-dapprove]').forEach(btn => btn.addEventListener('click', async () => {
    if (!confirm('Approve করলে account ACTIVE হবে + activation bonus যোগ হবে। নিশ্চিত?')) return;
    btn.disabled = true;
    try {
      await approveDeposit(btn.dataset.dapprove);
      toast('Deposit approve — account active + bonus');
      viewDeposits(main);
    } catch (err) { toast(err.message, 'error'); btn.disabled = false; }
  }));
  box.querySelectorAll('[data-dreject]').forEach(btn => btn.addEventListener('click', async () => {
    const note = await askReason('ডিপোজিট বাতিল — কারণ লিখুন (user এটাই দেখবে)', 'যেমন: TrxID মেলেনি');
    if (note === null) return;
    try {
      await rejectDeposit(btn.dataset.dreject, note);
      toast('Deposit reject করা হয়েছে');
      viewDeposits(main);
    } catch (err) { toast(err.message, 'error'); }
  }));
}

/* ---------- withdrawals (admin review queue) ---------- */
let wdFilter = 'pending';
async function viewWithdrawals(main) {
  main.innerHTML = `
    <div class="chip-row" id="wdChips">
      ${['pending', 'paid', 'rejected', 'all'].map(f => `<button class="chip ${f === wdFilter ? 'on' : ''}" data-wf="${f}">${{ pending: 'অপেক্ষমাণ', paid: 'পাঠানো হয়েছে', rejected: 'বাতিল', all: 'সব' }[f]}</button>`).join('')}\n    </div>
    <div id="wdList"></div>`;
  document.getElementById('wdChips').addEventListener('click', e => {
    const b = e.target.closest('[data-wf]');
    if (!b) return;
    wdFilter = b.dataset.wf;
    document.querySelectorAll('[data-wf]').forEach(c => c.classList.toggle('on', c.dataset.wf === wdFilter));
    viewWithdrawals(main);
  });
  const list = await listWithdrawals(wdFilter);
  const box = document.getElementById('wdList');
  if (!list.length) { box.innerHTML = '<p class="muted center-note">কোনো withdrawal নেই। (পুরনো pending request Users tab-এ user-এর detail-এ দেখাবে)</p>'; return; }
  const items = await Promise.all(list.map(async w => ({ w, user: w.user || await getUser(w.userId).catch(() => null) })));
  box.innerHTML = items.map(({ w, user }) => `
    <div class="adm-item">
      <div class="ai-head">
        <div class="ai-user"><b>${esc(user?.name || w.name || w.userId)}</b><span class="muted">${esc(user?.mobile || '')}</span></div>
        <span class="badge ${w.status === 'paid' ? 'green' : w.status}">${{ pending: 'অপেক্ষমাণ', paid: 'পেমেন্ট পাঠানো', rejected: 'বাতিল' }[w.status] || w.status}</span>
      </div>
      <div class="ai-meta"><i class="fa-solid fa-money-bill-transfer"></i> ${esc(w.method)} • <b class="gold-txt">${fmt(w.amount)}</b> • ${esc(w.accountNumber)}</div>
      <div class="ai-meta muted-sm"><i class="fa-regular fa-clock"></i> ${timeBn(w.createdAt)}${w.processedAt ? ' • প্রসেসড ' + timeBn(w.processedAt) : ''}</div>
      ${w.note ? `<p class="ai-note ${w.status === 'rejected' ? 'bad' : ''}"><i class="fa-solid fa-note-sticky"></i> ${w.status === 'rejected' ? 'বাতিলের কারণ: ' : 'নোট: '}${esc(w.note)}</p>` : ''}
      ${w.status === 'pending' ? `
      <div class="ai-actions">
        <button class="adm-btn green sm" data-wpaid="${w.id}"><i class="fa-solid fa-check"></i> অনুমোদন — টাকা পাঠানো হয়েছে</button>
        <button class="adm-btn red sm" data-wrej="${w.id}"><i class="fa-solid fa-xmark"></i> বাতিল — টাকা ফেরত</button>
      </div>` : ''}
    </div>`).join('');

  const doReview = async (btn, action) => {
    const w = list.find(x => x.id === btn.dataset[action === 'paid' ? 'wpaid' : 'wrej']);
    if (!w) return;
    let note = '';
    if (action === 'paid') {
      if (!confirm(`“${w.name || w.userId || "user"}” এর ${fmt(w.amount)} কি আসল টাকা পাঠানো হয়েছে? অনুমোদন করলে রিকোয়েস্ট বন্ধ হয়ে যাবে (টাকা ইতিমধ্যে কেটা হয়েছে)।`)) return;
    } else {
      if (!confirm(`বাতিল করলে ${fmt(w.amount)} user-এর ব্যালেন্সে ফেরত যাবে। নিশ্চিত?`)) return;
      note = await askReason('বাতিল করার কারণ লিখুন — user এটাই দেখবে', 'যেমন: নম্বর ভুল, আবার ঠিক নম্বর দিয়ে পাঠান');
      if (note === null) return;                      /* বাতিল = কিছু হয় না */
    }
    btn.disabled = true;
    try {
      await reviewWithdrawal(w.userId, w.id, action, note);
      toast(action === 'paid' ? 'অনুমোদিত — পেমেন্ট পাঠানো হিসেবে চিহ্নিত হয়েছে' : 'বাতিল — টাকা ব্যালেন্সে ফেরত গেছে');
      pollAlerts(true);                                /* bell badge/ list সাথে সাথে আপডেট */
      viewWithdrawals(main);
    } catch (err) { toast(String(err.message || err), 'error'); btn.disabled = false; }
  };
  box.querySelectorAll('[data-wpaid]').forEach(b => b.addEventListener('click', () => doReview(b, 'paid')));
  box.querySelectorAll('[data-wrej]').forEach(b => b.addEventListener('click', () => doReview(b, 'rejected')));
}

/* ---------- users ---------- */
let userQuery = '';
let selectedUid = null;
async function viewUsers(main) {
  main.innerHTML = `
    <input type="search" id="userSearch" class="adm-input" placeholder="নাম বা মোবাইল দিয়ে খুঁজুন..." value="${esc(userQuery)}">
    <div id="userList" class="user-list"></div>
    <div id="userDetail"></div>`;
  const doList = async () => {
    const users = await listUsers(300);
    const q = userQuery.trim().toLowerCase();
    const filtered = q ? users.filter(u => (u.name || '').toLowerCase().includes(q) || String(u.mobile || '').includes(q)) : users;
    const box = document.getElementById('userList');
    box.innerHTML = filtered.slice(0, 100).map(u => `
      <div class="user-row ${u.uid === selectedUid ? 'on' : ''}" data-uid="${u.uid}">
        <div class="ur-avatar">${esc((u.name || '?').trim()[0].toUpperCase())}</div>
        <div class="ur-info"><b>${esc(u.name || '—')}</b><span class="muted">${esc(u.mobile || '')}</span></div>
        <div class="ur-right"><b class="gold-txt">${fmt(u.balance)}</b>${u.isActive ? '<span class="badge green">চালু</span>' : '<span class="badge gray">নিষ্ক্রিয়</span>'}</div>
      </div>`).join('') || '<p class="muted center-note">কোনো ইউজার পাওয়া যায়নি।</p>';
    box.querySelectorAll('[data-uid]').forEach(r => r.addEventListener('click', () => { selectedUid = r.dataset.uid; doList(); doDetail(); }));
    doDetail();
  };
  const doDetail = async () => {
    const dbox = document.getElementById('userDetail');
    if (!selectedUid) { dbox.innerHTML = ''; return; }
    dbox.innerHTML = '<div class="loading-center"><i class="fa-solid fa-spinner fa-spin"></i></div>';
    const [u, txs, wds, tns] = await Promise.all([
      getUser(selectedUid),
      getUserTransactions(selectedUid),
      getUserWithdrawals(selectedUid, 10),
      listUserTargetNotices(selectedUid).catch(() => []),
    ]);
    if (!u) { dbox.innerHTML = ''; return; }
    dbox.innerHTML = `
      <div class="adm-card detail-card">
        <h4><i class="fa-solid fa-user" style="color:#d97706"></i> ${esc(u.name || 'User')} <span class="muted" style="font-weight:500">• ${esc(u.mobile || '')}</span></h4>
        <div class="detail-grid">
          <div><span class="muted">ব্যালেন্স</span><b>${fmt(u.balance)}</b></div>
          <div><span class="muted">মোট আয়</span><b>${fmt(u.totalEarned)}</b></div>
          <div><span class="muted">অবস্থা</span>${u.isActive ? '<b style="color:#16a34a">চালু</b>' : '<b style="color:#dc2626">নিষ্ক্রিয়</b>'}</div>
          <div><span class="muted">যোগ দেওয়া</span><b>${timeBn(u.createdAt)}</b></div>
        </div>
        <div class="ai-actions">
          ${u.isActive ? `<button class="adm-btn red sm" data-deact="${u.uid}"><i class="fa-solid fa-ban"></i> নিষ্ক্রিয় করুন</button>` : `<button class="adm-btn green sm" data-act="${u.uid}"><i class="fa-solid fa-check"></i> চালু করুন</button>`}
        </div>
        <h4 style="margin-top:14px"><i class="fa-solid fa-money-bill-transfer" style="color:#d97706"></i> Withdrawals</h4>
        ${wds.length ? wds.map(w => `<div class="mini-row">
          <b>${esc(w.method)} • ${fmt(w.amount)}</b>
          <span class="muted">${esc(w.accountNumber)} • ${timeBn(w.createdAt)}</span>
          <span class="badge ${w.status === 'paid' ? 'green' : w.status}">${w.status.toUpperCase()}</span>
          ${w.status === 'pending' ? `<button class="adm-btn green sm" style="margin-left:6px" data-wd-paid="${w.id}">অনুমোদন</button><button class="adm-btn red sm" style="margin-left:4px" data-wd-rej="${w.id}">বাতিল</button>` : `<span class="badge ${w.status === 'paid' ? 'green' : 'red'}">${w.status === 'paid' ? 'পাঠানো হয়েছে' : 'বাতিল'}</span>${w.note ? `<br><span class="muted" style="font-size:11.5px">${esc(w.note)}</span>` : ''}` }
        </div>`).join('') : '<p class="muted">কোনো withdrawal নেই।</p>'}
        <h4 style="margin-top:14px"><i class="fa-solid fa-triangle-exclamation" style="color:#dc2626"></i> এই user-এর ব্যক্তিগত নোটিশ/সতর্কতা</h4>
        ${tns.length ? tns.map(n => `<div class="mini-row">
          <b>${n.type === 'warning' ? '⚠️ ' : ''}${esc(n.title || '')} ${n.enabled ? '' : '<span class="badge gray">বন্ধ</span>'}</b>
          <span class="muted">${esc(n.body || '')}</span>
          <span><button class="adm-btn ghost sm" style="margin-left:6px" data-tn-tgl="${n.id}">${n.enabled ? 'লুকান' : 'দেখান'}</button><button class="adm-btn red sm" style="margin-left:4px" data-tn-del="${n.id}">মুছুন</button></span>
        </div>`).join('') : '<p class="muted">কোনো private notice/warning নেই। (Notices tab থেকে পাঠান)</p>'}
        <h4 style="margin-top:14px"><i class="fa-solid fa-receipt" style="color:#d97706"></i> সাম্প্রতিক লেনদেন</h4>
        ${txs.length ? txs.map(t => `<div class="mini-row"><b>${esc(t.note || t.type)}</b><span class="muted">${timeBn(t.createdAt)}</span><span class="badge ${Number(t.amount) >= 0 ? 'green' : 'gray'}">${Number(t.amount) >= 0 ? '+' : ''}${fmt(t.amount)}</span></div>`).join('') : '<p class="muted">কোনো transaction নেই।</p>'}
      </div>`;
    const act = dbox.querySelector('[data-act]');
    if (act) act.addEventListener('click', async () => {
      try { await setUserActive(act.dataset.act, true); toast('User active করা হয়েছে'); doList(); } catch (err) { toast(err.message, 'error'); }
    });
    const deact = dbox.querySelector('[data-deact]');
    if (deact) deact.addEventListener('click', async () => {
      if (!confirm('User-কে inactive করবেন?')) return;
      try { await setUserActive(deact.dataset.deact, false); toast('User inactive করা হয়েছে'); doList(); } catch (err) { toast(err.message, 'error'); }
    });
    dbox.querySelectorAll('[data-wd-paid]').forEach(b => b.addEventListener('click', async () => {
      if (!confirm('অনুমোদন করবেন? (টাকা পাঠানো শেষ মানে)')) return;
      b.disabled = true;
      try { await reviewWithdrawal(selectedUid, b.dataset.wdPaid, 'paid'); toast('অনুমোদিত ✓'); pollAlerts(true); doDetail(); } catch (err) { toast(String(err.message || err), 'error'); b.disabled = false; }
    }));
    dbox.querySelectorAll('[data-wd-rej]').forEach(b => b.addEventListener('click', async () => {
      if (!confirm('বাতিল করলে টাকা user-এর ব্যালেন্সে ফেরত যাবে। নিশ্চিত?')) return;
      const why = await askReason('বাতিল করার কারণ লিখুন — user এটাই দেখবে', 'যেমন: নম্বর ভুল হয়েছে');
      if (why === null) return;
      b.disabled = true;
      try { await reviewWithdrawal(selectedUid, b.dataset.wdRej, 'rejected', why); toast('বাতিল — টাকা ফেরত গেছে'); pollAlerts(true); doDetail(); } catch (err) { toast(String(err.message || err), 'error'); b.disabled = false; }
    }));
    dbox.querySelectorAll('[data-tn-tgl]').forEach(b => b.addEventListener('click', async () => {
      const n = tns.find(x => x.id === b.dataset.tnTgl);
      try { await updateTargetedNotice(selectedUid, n.id, { enabled: !n.enabled }); toast('Notice toggle'); doDetail(); } catch (err) { toast(err.message, 'error'); }
    }));
    dbox.querySelectorAll('[data-tn-del]').forEach(b => b.addEventListener('click', async () => {
      if (!confirm('Notice মুছে ফেলবেন?')) return;
      try { await deleteTargetedNotice(selectedUid, b.dataset.tnDel); toast('Notice delete'); doDetail(); } catch (err) { toast(err.message, 'error'); }
    }));
  };
  document.getElementById('userSearch').addEventListener('input', e => { userQuery = e.target.value; doList(); });
  await doList();
}

/* ---------- tasks ---------- */
/* dynamic field types — lib/http.js FIELD_TYPES + src/pages/task.js F_TYPES এর mirror
   (তিনটা copy; tests/web-and-apk.mjs [L] হুবহু মিল check করে) */
const TF_TYPES = ['text', 'email', 'password', 'tel', 'number', 'url', 'textarea', 'image'];
/* MicroJobs-এ user-এর কাছ থেকে password নেওয়া যায় না (§9) — সেই ট্যাবে option-টাই থাকে না;
   পুরোনো account-sell টাস্ক নিজের account-এর তথ্য বিক্রি করে, তাই সেখানে থাকছে */
const MJ_TF_TYPES = TF_TYPES.filter(x => x !== 'password');
function fieldRowHtml(f = {}, types = TF_TYPES) {
  return `<div class="if-row" data-if-row>
    <input class="adm-input if-label" placeholder="Field Title (যেমন: UID, Password, Cookies)" value="${esc(f.label || '')}" maxlength="50">
    <select class="adm-input if-type">${types.map(t => `<option value="${t}" ${f.type === t ? 'selected' : ''}>${t}</option>`).join('')}</select>
    <input class="adm-input if-ph" placeholder="Placeholder (খালি রাখলে default)" value="${esc(f.placeholder || '')}" maxlength="60">
    <label class="chk if-req"><input type="checkbox" data-ifreq ${f.required ? 'checked' : ''}> Required</label>
    <button type="button" class="adm-btn red sm if-del" data-ifdel><i class="fa-solid fa-trash"></i></button>
  </div>`;
}
function inputFieldsEditorHtml(t, isMJ = false) {
  const fields = Array.isArray(t.inputFields) ? t.inputFields : [];
  const types = isMJ ? MJ_TF_TYPES : TF_TYPES;
  void types; // নিচের data-iftypes দিয়ে row গুলোতে লাগে
  return `
    <div class="if-editor">
      <div class="if-head">
        <label>Input Fields — user task page-এ এই field গুলো পূরণ করে submit করবে</label>
        <button type="button" class="adm-btn ghost sm" data-ifadd><i class="fa-solid fa-plus"></i> Add Input Field</button>
      </div>
      <div class="if-rows" data-ifrows data-iftypes="${isMJ ? 'mj' : ''}">${fields.map(f => fieldRowHtml(f, types)).join('') || '<p class="muted if-empty">কোনো field নেই — task শুধু "link + submit" flow-এ থাকবে।</p>'}</div>
    </div>`;
}
/* ---------- admin wallet tab (owner rule: Job Poster-এর balance) ---------- */
const ROLE_LABEL = { owner: 'Owner / Main Admin', full: 'Full Access Admin', poster: 'Job Poster Admin' };
async function viewWallet(main) {
  const [w, admins] = await Promise.all([
    getWallet().catch(() => null),
    listAdminWallets().catch(() => ({ items: [], isOwner: false })),
  ]);
  if (!w || w.ok === false || w.error) {
    main.innerHTML = `<div class="form-err"><i class="fa-solid fa-triangle-exclamation"></i> ওয়ালেট পড়া যায়নি${w && w.error ? `: ${esc(String(w.error))}` : ''}</div>`;
    return;
  }
  const money = v => `৳${(Number(v) || 0).toFixed(2)}`;
  const cards = `
    <div class="wt-grid">
      <div class="wt-card"><span>রোল</span><b>${ROLE_LABEL[w.role] || w.role}${w.activeMode === 'poster' && w.isOwner ? ' (Poster মোড)' : ''}</b></div>
      <div class="wt-card"><span>ব্যালেন্স</span><b class="${w.needsBalance && Number(w.balance) <= 0 ? 'bad' : ''}">${money(w.balance)}</b></div>
      <div class="wt-card"><span>job-এ আটকা (reserved)</span><b>${money(w.reserved)}</b></div>
      <div class="wt-card"><span>প্রকাশের নিয়ম</span><b>${w.needsBalance ? 'reward × requiredUsers আগে কাটে' : 'ব্যালেন্স লাগে না'}</b></div>
    </div>`;
  const modeSwitch = w.isOwner ? `
    <div class="adm-card wt-mode">
      <div><b>Owner মোড বদল</b><br><span class="muted">Full Access mode-এ নিজের publishing-এ ব্যালেন্স লাগে না; Job Poster mode চললে নিজেরও বাজেট কাটে (testing/audit-এর জন্য)।</span></div>
      <button class="adm-btn ${w.activeMode === 'poster' ? 'gold' : 'ghost'} sm" data-wtm="full"><i class="fa-solid fa-key"></i> Full Access Mode</button>
      <button class="adm-btn ${w.activeMode !== 'poster' ? 'gold' : 'ghost'} sm" data-wtm="poster"><i class="fa-solid fa-user-shield"></i> Job Poster Mode</button>
    </div>` : '';
  const jobsTable = (w.jobs || []).length ? `
    <div class="adm-card">
      <h4><i class="fa-solid fa-briefcase" style="color:#d97706"></i> আপনার ফান্ড করা job</h4>
      <table class="adm-table"><thead><tr><th>জব</th><th>রোয়ার্ড</th><th>লাগত জন</th><th>বাজেট</th><th>আটকানো</th><th>অবস্থা</th></tr></thead>
      <tbody>${w.jobs.map(j => `<tr>
        <td><b>${esc(j.nameBn || j.slug)}</b><br><span class="muted">${esc(j.slug)}</span></td>
        <td>${money(j.reward)}</td><td>${j.requiredUsers}</td><td>${money(j.budget)}</td><td>${money(j.reservedBudget)}</td>
        <td><span class="badge ${j.status === 'live' ? 'green' : j.status === 'draft' ? 'gray' : 'red'}">${j.status === 'live' ? 'লাইভ' : j.status === 'draft' ? 'ড্রাফট' : 'বন্ধ'}</span></td>
      </tr>`).join('')}</tbody></table>
    </div>` : '';
  const ledger = `
    <div class="adm-card">
      <h4><i class="fa-solid fa-receipt" style="color:#d97706"></i> ওয়ালেট লগ</h4>
      ${(w.ledger || []).length ? `<table class="adm-table"><thead><tr><th>কী</th><th>জব</th><th>টাকা</th><th>পরবর্তী ব্যালেন্স</th></tr></thead>
        <tbody>${w.ledger.map(x => `<tr><td>${esc(x.type || '')}${x.note ? ` <span class="muted">— ${esc(String(x.note))}</span>` : ''}${x.by && x.by !== '' ? `<br><span class="muted">by ${esc(String(x.by))}</span>` : ''}</td>
          <td>${esc(x.jobSlug || '—')}</td><td class="${Number(x.amount) < 0 ? 'bad' : 'ok'}">${Number(x.amount) < 0 ? '-' : '+'}${money(Math.abs(Number(x.amount) || 0)).slice(1)}</td>
          <td>${x.balanceAfter === undefined || x.balanceAfter === null ? '—' : money(x.balanceAfter)}</td></tr>`).join('')}</tbody></table>`
        : '<p class="muted">এখনো কোনো লেনদেন নেই।</p>'}
    </div>`;
  const isOwner = !!admins.isOwner;
  /* Owner + Full Access = manager (Job Poster admin manage করতে পারে না) */
  const isManager = !!admins.isManager || isOwner;

  /* ---- "Join admin" আবেদন — approve করলেই account + role তৈরি হয় ---- */
  const joins = isManager ? await listAdminJoins().catch(() => ({ items: [] })) : { items: [] };
  const pend = (joins.items || []).filter(j => String(j.status) === 'pending');
  const joinsHtml = !isManager ? '' : `
    <div class="adm-card">
      <h4><i class="fa-solid fa-user-plus" style="color:#d97706"></i> Join admin আবেদন${pend.length ? ` <span class="badge red">${pend.length}টা অপেক্ষমাণ</span>` : ''}</h4>
      <p class="muted" style="font-size:12.5px">যে কেউ আবেদন পাঠাতে পারে, কিন্তু approve না করা পর্যন্ত তার কোনো access নেই। Owner role শুধু Ownerই দিতে পারেন।</p>
      ${pend.length ? `<div class="jj-list">${pend.map(j => `
        <div class="jj-row">
          <div class="jj-who"><b>${esc(j.fullName || '—')}</b><span class="muted">${esc(j.email)}</span>
            ${j.alreadyAdmin ? '<span class="badge gold">এই email আগে থেকেই ব্যবহৃত</span>' : ''}
            ${j.note ? `<span class="muted jj-note">“${esc(j.note)}”</span>` : ''}</div>
          <div class="jj-act">
            <select class="adm-input jj-role" data-jrole="${esc(j.email)}">
              ${[['poster', 'Job Poster'], ['full', 'Full Access']].concat(isOwner ? [['owner', 'Owner']] : [])
                .map(([v, l]) => `<option value="${v}" ${j.requestedRole === v ? 'selected' : ''}>${l}</option>`).join('')}
            </select>
            <button class="adm-btn green sm" data-jok="${esc(j.email)}"><i class="fa-solid fa-check"></i> অনুমোদন</button>
            <button class="adm-btn red sm" data-jno="${esc(j.email)}"><i class="fa-solid fa-xmark"></i> বাতিল</button>
          </div>
          <div class="jj-rej" data-jrej="${esc(j.email)}" hidden>
            <input class="adm-input" data-jreason="${esc(j.email)}" maxlength="300" placeholder="বাতিল করার কারণ লিখুন (আবেদনকারী এটাই দেখবে)">
            <button class="adm-btn red sm" data-jrok="${esc(j.email)}">কারণ দিয়ে বাতিল</button>
          </div>
        </div>`).join('')}</div>` : '<p class="muted">এখনো কোনো আবেদন নেই।</p>'}
    </div>`;

  /* ---- নতুন admin account তৈরি (Owner / Full Access) ---- */
  const createHtml = !isManager ? '' : `
    <div class="adm-card">
      <h4><i class="fa-solid fa-user-plus" style="color:#d97706"></i> Admin account তৈরি করুন</h4>
      <p class="muted" style="font-size:12.5px">email-এ Firebase Auth account না থাকলে server নিজেই বানায়; password খালি রাখলে একটা <b>সেটআপ লিংক</b> দেখাবে — সেটা পাঠিয়ে দিন।</p>
      <div class="ac-grid">
        <input class="adm-input" id="acEmail" type="email" placeholder="admin email">
        <input class="adm-input" id="acName" placeholder="নাম">
        <select class="adm-input" id="acRole">${isOwner ? '<option value="owner">Owner</option>' : ''}<option value="full">Full Access</option><option value="poster" selected>Job Poster</option></select>
        <input class="adm-input" id="acBal" type="number" min="0" step="1" placeholder="শুরু ব্যালেন্স (Poster) ৳">
        <input class="adm-input" id="acPass" type="text" placeholder="password (খালি রাখলে setup link)" autocomplete="new-password">
        <button class="adm-btn gold sm" id="acCreate"><i class="fa-solid fa-plus"></i> তৈরি করুন</button>
      </div>
      <div id="acOut"></div>
    </div>`;

  /* ---- admin list: role/balance/suspend + details (manager) ---- */
  const adminTable = !isManager ? '' : `
    <div class="adm-card">
      <h4><i class="fa-solid fa-user-shield" style="color:#d97706"></i> অ্যাডমিন তালিকা ও ব্যালেন্স${isOwner ? '' : ' <span class="badge gray">Role বদল শুধু Owner</span>'}</h4>
      <p class="muted" style="font-size:12.5px">Owner ও Full Access-এর ব্যালেন্স লাগে না। Job Poster-কে প্রকাশের আগেই <b>reward × requiredUsers</b> ব্যালেন্স থাকতে হয় (রোয়ার্ড ৳১–৳৫০০)। সাসপেন্ড করলে সেই admin-এর সব panel access সাথে সাথে বন্ধ।</p>
      <table class="adm-table"><thead><tr><th>অ্যাডমিন</th><th>রোল</th><th>ব্যালেন্স / আটকা</th><th>কাজ</th></tr></thead><tbody>
        ${admins.items.map(a => `<tr class="${a.suspended ? 'wt-off' : ''}">
          <td><b>${esc(a.fullName || a.email)}</b><br><span class="muted">${esc(a.email)}</span>
            ${a.email === w.email ? ' <span class="badge gold">আপনি</span>' : ''}
            ${a.suspended ? `<span class="badge red">সাসপেন্ডেড</span>${a.suspendReason ? `<br><span class="muted">কারণ: ${esc(a.suspendReason)}</span>` : ''}` : ''}
            ${a.joinedAt ? `<br><span class="muted">যোগ দেওয়া: ${esc(timeBn(a.joinedAt))}</span>` : ''}</td>
          <td>${isOwner ? `<select class="adm-input wt-role" data-email="${esc(a.email)}">
            ${[['owner', 'Owner'], ['full', 'Full Access'], ['poster', 'Job Poster']].map(([v, l]) => `<option value="${v}" ${a.role === v ? 'selected' : ''}>${l}</option>`).join('')}
          </select> <button class="adm-btn ghost sm" data-rolessave="${esc(a.email)}">সেভ</button>`
            : `<b>${ROLE_LABEL[a.role] || a.role}</b>${a.activeMode === 'poster' && a.isOwner ? '<br><span class="muted">Poster মোড</span>' : ''}`}
            <br><span class="muted">${a.needsBalance ? 'ব্যালেন্স দিয়ে প্রকাশ করে' : 'ব্যালেন্স লাগে না'}</span></td>
          <td><b>${money(a.balance)}</b><br><span class="muted">job-এ আটকা ${money(a.reserved)}</span></td>
          <td class="wt-acts">
            <input class="adm-input wt-amt" data-amtfor="${esc(a.email)}" type="number" step="1" min="0" placeholder="৳" style="width:88px">
            <button class="adm-btn green sm" data-baladd="${esc(a.email)}">যোগ</button>
            <button class="adm-btn red sm" data-balsub="${esc(a.email)}">বাদ</button>
            <button class="adm-btn ghost sm" data-balset="${esc(a.email)}">সেট</button>
            <button class="adm-btn ${a.suspended ? 'green' : 'ghost'} sm" data-sus="${esc(a.email)}" data-sus-on="${a.suspended ? '0' : '1'}">
              <i class="fa-solid ${a.suspended ? 'fa-circle-check' : 'fa-ban'}"></i> ${a.suspended ? 'চালু করুন' : 'সাসপেন্ড'}
            </button>
          </td></tr>`).join('')}
      </tbody></table>
    </div>`;
  main.innerHTML = `
    <div class="adm-card">
      <h4><i class="fa-solid fa-sitemap" style="color:#d97706"></i> অ্যাডমিন ম্যানেজমেন্ট</h4>
      <p class="muted" style="font-size:12.5px">Admin account, আবেদন, ব্যালেন্স ও suspend — এখানে। সব হিসাব server-এ হয় (client-এর balance/role কখনো ধরা হয় না);
        Job Poster-এর জন্য শুধু নিজের ব্যালেন্স ও job-এ আটকা টাকা।</p>
      ${cards}
    </div>
    ${joinsHtml}
    ${createHtml}
    ${modeSwitch}
    ${adminTable}
    ${jobsTable}
    ${ledger}`;

  /* ---- আবেদন approve/reject ---- */
  main.querySelectorAll('[data-jno]').forEach(b => b.addEventListener('click', () => {
    const box = main.querySelector(`.jj-rej[data-jrej="${b.dataset.jno}"]`);
    if (box) { box.hidden = !box.hidden; if (!box.hidden) box.querySelector('input')?.focus(); }
  }));
  main.querySelectorAll('[data-jrok]').forEach(b => b.addEventListener('click', async () => {
    const email = b.dataset.jrok;
    const reason = String(main.querySelector(`[data-jreason="${email}"]`)?.value || '').trim();
    if (reason.length < 3) { toast('বাতিল করার কারণ লিখুন', 'error'); return; }
    b.disabled = true;
    try { await rejectAdminJoin(email, reason); toast('আবেদন বাতিল হয়েছে'); viewWallet(main); }
    catch (err) { toast(String(err.message || err), 'error'); b.disabled = false; }
  }));
  main.querySelectorAll('[data-jok]').forEach(b => b.addEventListener('click', async () => {
    const email = b.dataset.jok;
    const role = main.querySelector(`.jj-role[data-jrole="${email}"]`)?.value || 'poster';
    if (!confirm(`“${email}” কে ${ROLE_LABEL[role] || role} হিসেবে অনুমোদন করবেন?`)) return;
    b.disabled = true;
    try {
      const out = await approveAdminJoin(email, role);
      toast('Admin তৈরি হয়েছে ✓');
      const box = document.getElementById('acOut');
      if (box && out && out.setupLink) {
        box.innerHTML = `<p class="muted" style="font-size:12.5px">পাসওয়ার্ড সেট করার লিংক (${esc(out.email)}):</p>
          <input class="adm-input" value="${esc(out.setupLink)}" readonly onclick="this.select()">`;
      }
      viewWallet(main);
    } catch (err) { toast(String(err.message || err), 'error'); b.disabled = false; }
  }));

  /* ---- নতুন admin তৈরি ---- */
  document.getElementById('acCreate')?.addEventListener('click', async e => {
    const btn = e.currentTarget;
    const email = String(document.getElementById('acEmail').value || '').trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { toast('email ঠিক করে লিখুন', 'error'); return; }
    btn.disabled = true;
    try {
      const out = await createAdminAccount({
        email,
        fullName: String(document.getElementById('acName').value || '').trim(),
        role: document.getElementById('acRole').value,
        balance: Number(document.getElementById('acBal').value) || null,
        password: String(document.getElementById('acPass').value || ''),
      });
      document.getElementById('acOut').innerHTML = `<p class="ok-note">✓ ${esc(out.email)} — ${esc(ROLE_LABEL[out.role] || out.role)} তৈরি হয়েছে।${out.uid ? '' : ' <span class="muted">(Firebase account আগে থেকে ছিল)</span>'}${out.authError ? `<br><span class="muted">${esc(out.authError)}</span>` : ''}</p>
        ${out.setupLink ? `<p class="muted" style="font-size:12.5px">পাসওয়ার্ড সেট করার লিংক — পাঠিয়ে দিন:</p><input class="adm-input" value="${esc(out.setupLink)}" readonly onclick="this.select()">` : ''}`;
      toast('Admin account তৈরি হয়েছে ✓');
      viewWallet(main);
    } catch (err) { toast(String(err.message || err), 'error'); }
    btn.disabled = false;
  });

  /* ---- suspend / unsuspend ---- */
  main.querySelectorAll('[data-sus]').forEach(b => b.addEventListener('click', async () => {
    const email = b.dataset.sus;
    const on = b.dataset.susOn === '1';
    if (on && !confirm(`${email} কে সাসপেন্ড করবেন? — সাথে সাথে ওই admin-এর panel access বন্ধ হয়ে যাবে।`)) return;
    b.disabled = true;
    try {
      await setAdminSuspended(email, on, on ? 'Admin Management থেকে সাসপেন্ড করা হয়েছে' : '');
      toast(on ? 'সাসপেন্ড করা হয়েছে' : 'আবার চালু করা হয়েছে');
      viewWallet(main);
    } catch (err) { toast(String(err.message || err), 'error'); b.disabled = false; }
  }));

  main.querySelectorAll('[data-wtm]').forEach(b => b.addEventListener('click', async () => {
    try { await setAdminMode(b.dataset.wtm); toast('Mode বদলেছে'); viewWallet(main); }
    catch (err) { toast(String(err.message || err), 'error'); }
  }));
  main.querySelectorAll('[data-rolessave]').forEach(b => b.addEventListener('click', async () => {
    const sel = main.querySelector(`.wt-role[data-email="${b.dataset.rolessave}"]`);
    try { await setAdminRole(b.dataset.rolessave, sel.value); toast('Role সেভ হয়েছে'); viewWallet(main); }
    catch (err) { toast(String(err.message || err), 'error'); }
  }));
  const bal = async (email, mode, btn) => {
    const input = main.querySelector(`.wt-amt[data-amtfor="${email}"]`);
    const amount = Math.round((Number(input && input.value) || 0) * 100) / 100;
    if (!amount && amount !== 0) { toast('অংক লিখুন', 'error'); return; }
    if (btn) btn.disabled = true;
    try {
      const out = await setAdminBalance(email, mode === 'add' ? { delta: amount, note: 'owner credit' }
        : mode === 'sub' ? { delta: -amount, note: 'owner debit' } : { setBalance: amount, note: 'owner set' });
      toast(`ব্যালেন্স: ${money(out.balance || 0)}`);
      viewWallet(main);
    } catch (err) {
      toast(String(err.message || err), 'error');
      if (btn) btn.disabled = false;
    }
  };
  main.querySelectorAll('[data-baladd]').forEach(b => b.addEventListener('click', () => bal(b.dataset.baladd, 'add', b)));
  main.querySelectorAll('[data-balsub]').forEach(b => b.addEventListener('click', () => bal(b.dataset.balsub, 'sub', b)));
  main.querySelectorAll('[data-balset]').forEach(b => b.addEventListener('click', () => bal(b.dataset.balset, 'set', b)));
}

/* দুইটা আলাদা সিস্টেম, panel-এও আলাদা tab — একই `tasks` collection কিন্তু `kind`
   field দিয়ে ভাগ (MicroJobs = kind 'microjob', পুরোনো অ্যাকাউন্ট-সেল = 'task')।
   তাই MicroJobs tab-এ ফেসবুক/জিমাইল টাস্ক দেখায় না, টাস্ক tab-এ নতুন MicroJob দেখায় না। */
async function viewTasks(main, kind) {
  kind = kind === 'microjob' ? 'microjob' : 'task';
  const isMJ = kind === 'microjob';
  const redraw = () => viewTasks(main, kind);
  /* wallet = server-এর হিসাব (balance/role) — শুধু hint দেখাতে, verdict না */
  const wallet = isMJ ? await getWallet().catch(() => null) : null;
  const [allTasks, stats] = await Promise.all([listTasks(), listJobStats(kind).catch(() => [])]);
  const tasks = (allTasks || []).filter(x => ((x && x.kind) === 'microjob' ? 'microjob' : 'task') === kind);
  const statOf = slug => stats.find(x => x.slug === slug) || null;
  /* ⚠️ Firestore-এ task config doc না থাকলে user submit → "Project পাওয়া যায়নি" (404)।
     listTasks() খালি হলে এই panel-এ কার্ডই না, মানে নতুন doc বানানোর উপায়ও না —
     তাই একটা recovery bar (?op=seed-tasks, idempotent)। */
  /* নতুন job তৈরি = নতুন tasks/{slug} doc — user-এর MicroJobs page-এ সেটা আলাদা
     card/post হিসেবেই দেখাবে (৫টা job বানালে ৫টা card; কোনো hardcode নেই) */
  const createCard = `
    <div class="adm-card" id="mjCreateCard">
      <h4 style="margin:0 0 4px"><i class="fa-solid fa-plus" style="color:#d97706"></i> নতুন MicroJob তৈরি করুন</h4>
      <p class="muted" style="font-size:12.5px;margin:0 0 10px">প্রতিটা জব আলাদা পোস্ট — ছবি, টাইটেল, সংক্ষিপ্ত বিবরণ, নিয়ম, লিংক, ভিডিও, কতজন দরকার, রেয়ার্ড আর কী জমা দিতে হবে সব নিজে ঠিক করুন। Required Users পূরণ হলে জব স্বয়ংক্রিয়ভাবে FULL/CLOSED হবে।</p>
      <div class="two-col">
        <div><label>Job Title *</label><input class="adm-input" data-nc="nameBn" maxlength="60" placeholder="যেমন: ভিডিওতে like + comment"></div>
        <div><label>Slug (খালি রাখলে বানিয়ে নেওয়া হবে)</label><input class="adm-input" data-nc="slug" maxlength="50" placeholder="like-comment-video"></div>
      </div>
      <div class="two-col">
        <div><label>Reward / প্রতি user (৳)</label><input type="number" step="0.5" min="0" class="adm-input" data-nc="reward" value="1">
          <p class="muted" style="font-size:11.5px;margin:4px 0 0">Job Poster: ৳১–৳৫০০</p></div>
        <div><label>Required Users *</label><input type="number" min="1" max="1000000" class="adm-input" data-nc="requiredUsers" value="100"></div>
      </div>
      <label>সংক্ষিপ্ত বিবরণ</label><input class="adm-input" data-nc="shortDesc" maxlength="200" placeholder="কার্ডে দেখানো এক লাইন">
      <label>Main Job Link (https://…)</label><input class="adm-input" data-nc="url" maxlength="300" placeholder="https://">
      <label>Tutorial Video Link (optional)</label><input class="adm-input" data-nc="videoUrl" maxlength="300" placeholder="https://youtu.be/…">
      <label>জবের ছবি</label>
      <div class="img-pick">
        <input type="hidden" data-nc="image" id="mjNewImage">
        <input type="file" accept="image/png,image/jpeg,image/webp" id="mjNewImageFile" hidden>
        <button type="button" class="adm-btn ghost sm" id="mjNewImageBtn"><i class="fa-solid fa-image"></i> ছবি আপলোড</button>
        <div class="img-prev" id="mjNewImagePrev" hidden><img alt="preview" id="mjNewImageImg"></div>
      </div>
      <label>কাজের নিয়ম (এক লাইনে একটা করে ধাপ)</label>
      <textarea class="adm-input" data-nc="steps" rows="3" placeholder="লিংক ওপেন করুন&#10;লাইক + কমেন্ট দিন&#10;স্ক্রিনশটসহ submit করুন"></textarea>
      <div class="two-col">
        <div><label>ক্রম</label><input type="number" class="adm-input" data-nc="sort" value="100"></div>
        <label class="chk" style="align-self:flex-end;margin-bottom:8px"><input type="checkbox" data-nc="publish" checked> সাথে সাথেই প্রকাশ (Public)</label>
      </div>
      <div class="mj-budget" id="mjBudgetHint">বাজেট হিসাব হচ্ছে...</div>
      <details style="margin:10px 0 4px"><summary class="muted" style="font-size:12.5px;cursor:pointer">Submission fields (user কী কী জমা দেবে)</summary>
        <div class="if-rows" id="mjNewFields"></div>
        <button type="button" class="adm-btn ghost sm" id="mjNewFieldAdd" style="margin-top:8px"><i class="fa-solid fa-plus"></i> Field যোগ করুন</button>
      </details>
      <div class="ai-actions">
        <button type="button" class="adm-btn gold sm" id="mjCreateBtn"><i class="fa-solid fa-paper-plane"></i> Job তৈরি করুন</button>
      </div>
    </div>`;
  const seedBar = `
    <div class="adm-card" style="display:flex;gap:10px;align-items:center;justify-content:space-between;flex-wrap:wrap">
      <div style="flex:1 1 260px"><b>Built-in list থেকে task doc তৈরি করুন</b><br>
        <span class="muted">${tasks.length ? 'যেগুলোর doc নেই শুধু সেটুকুই বানাবে — আগে থেকে যা আছে (rate, fields, lock) অক্ষত থাকবে।' : 'Firestore-এ কোনো task config নেই — একারণেই user submit করলে “Project পাওয়া যায়নি” আসছে। নিচের বাটন চাপলেই ঠিক হয়ে যাবে।'}</span></div>
      <button class="adm-btn gold sm" id="seedTasksBtn"><i class="fa-solid fa-database"></i> ${tasks.length ? 'বাকিগুলো তৈরি করুন' : 'এখনই তৈরি করুন'}</button>
    </div>`;
  main.innerHTML = `
    <div class="adm-card task-head"><h4>${isMJ
      ? '<i class="fa-solid fa-briefcase" style="color:#d97706"></i> MicroJobs — আলাদা সিস্টেম'
      : '<i class="fa-solid fa-store" style="color:#d97706"></i> টাস্ক (অ্যাকাউন্ট সেল)'}</h4>
    <p class="muted">${isMJ
      ? 'এখান থেকে বানানো প্রতিটা জব user-এর “মাইক্রো জব” পেজে আলাদা পোস্ট/কার্ড হিসেবে দেখাবে — ৫টা বানালে ৫টা কার্ড, কিছুই hardcode নয়। Reward, ছবি, নিয়ম, লিংক, ভিডিও, কতজন দরকার, জমার ফিল্ড — সব এখান থেকেই। Required Users শেষ হলে জব স্বয়ংক্রিয়ভাবে FULL/CLOSED।'
      : 'পুরোনো সিস্টেম (ফেসবুক/জিমাইল/ইন্সট্রাগ্রাম সেল) — এগুলো মাইক্রো জব পেজে আসে না। Reward, link, password, description, input fields, lock/status, video এখান থেকেই; Save করলেই user website update হয়ে যাবে।'}</p></div>
    ${isMJ ? createCard : ''}
    ${isMJ ? '' : seedBar}
    <div id="taskList">${tasks.map(t => `
      <div class="adm-card task-card" data-slug="${esc(t.slug)}">
        <div class="task-row">
          <div class="task-info">
            <b>${esc(t.nameBn || t.slug)} ${t.enabled === false ? '<span class="badge gray">বন্ধ</span>' : ''} ${t.locked ? '<span class="badge gold">লকড</span>' : ''}</b>
            <span class="muted">${isMJ ? `/microjobs.html#job-${esc(t.slug)}` : `/task/${esc(t.slug)}.html`} • ${fmt(t.reward)}${Array.isArray(t.inputFields) && t.inputFields.length ? ` • ${t.inputFields.length} field(s)` : ''}</span>
            ${(() => { const st = statOf(t.slug); if (!st) return '';
              const need = Number(st.requiredUsers) || 0;
              return `<div class="mj-statline">
                <span><i class="fa-solid fa-users"></i> Required <b>${need || '∞'}</b></span>
                <span class="ok"><i class="fa-solid fa-check"></i> Approved <b>${Number(st.approvedCount) || 0}</b></span>
                <span class="warn"><i class="fa-solid fa-hourglass-half"></i> Pending <b>${Number(st.pending) || 0}</b></span>
                <span class="bad"><i class="fa-solid fa-xmark"></i> Rejected <b>${Number(st.rejected) || 0}</b></span>
                <span><i class="fa-solid fa-user-plus"></i> বাকি <b>${st.remaining === null || st.remaining === undefined ? '∞' : st.remaining}</b></span>
                ${st.full || st.closed ? '<span class="badge red">সম্পূর্ণ/বন্ধ</span>' : ''}
                ${st.mode === 'single' ? '<span class="badge gray">১ user = ১ submit</span>' : '<span class="badge gray">মার্কেটপ্লেস</span>'}
                ${isMJ ? `<span class="badge ${t.funded === 'budget' ? 'gold' : 'gray'}">Budget ৳${((Number(t.reward) || 0) * (need || 0)).toFixed(2)}</span>
                 <span class="badge ${t.funded === 'budget' ? 'green' : 'gray'}">${t.funded === 'budget' ? 'ফান্ডেড ' + fmt(t.reservedBudget || 0) : t.enabled === false ? 'ড্রাফট — প্রকাশ হলে কাটা হবে' : 'Owner/Full — ফ্রি'}</span>` : ''}
              </div>`; })()}
          </div>
          ${isMJ && t.enabled === false ? `<button class="adm-btn green sm" data-publish="${esc(t.slug)}" data-budget="${((Number(t.reward) || 0) * (Number(t.requiredUsers) || 0)).toFixed(2)}"><i class="fa-solid fa-paper-plane"></i> প্রকাশ</button>` : ''}
          <button class="adm-btn ghost sm" data-edit="${esc(t.slug)}"><i class="fa-solid fa-pen"></i></button>
          <button class="adm-btn red sm" data-del="${esc(t.slug)}" title="Doc মুছে ফেলুন"><i class="fa-solid fa-trash"></i></button>
        </div>
        <div class="task-form" data-form="${esc(t.slug)}" hidden>
          <label>নাম (বাংলা)</label><input class="adm-input" data-f="nameBn" value="${esc(t.nameBn || '')}">
          <label>Task URL (user-এর জন্য Open Link) — শুধু http/https</label><input class="adm-input" data-f="url" value="${esc(t.url || '')}" placeholder="https://...">
          <div class="two-col">
            <div><label>Amount / Reward (৳)</label><input type="number" step="0.5" class="adm-input" data-f="reward" value="${Number(t.reward) || 0}"></div>
            <div><label>ক্রম</label><input type="number" class="adm-input" data-f="sort" value="${Number(t.sort) || 10}"></div>
          </div>
          <div class="two-col">
            <div><label>Required Users (০ = unlimited)</label><input type="number" min="0" max="1000000" class="adm-input" data-f="requiredUsers" value="${Number(t.requiredUsers) || 0}">
              <p class="muted" style="font-size:11.5px;margin:4px 0 0">এই সংখ্যক approved user হলে job স্বয়ংক্রিয়ভাবে FULL/CLOSED হবে (পুরোনো marketplace job-এর জন্য ০ রাখুন)</p></div>
            <div><label>জমার ধরন</label>
              <select class="adm-input" data-f="mode">
                ${(() => { /* পুরোনো seeded task (mode নেই, requiredUsers নেই) = marketplace —
                     নাহলে শুধু edit করে Save চাপলেই ৮টা account-sell task এক-submit মোডে
                     চলে যেত (দিনে একাধিক বিক্রি বন্ধ) */
                  const cur = t.mode || ((Number(t.requiredUsers) || 0) > 0 ? 'single' : 'marketplace');
                  return `<option value="single" ${cur === 'single' ? 'selected' : ''}>MicroJob — এক user একবার</option>
                <option value="marketplace" ${cur === 'marketplace' ? 'selected' : ''}>Marketplace — দিনে একাধিক (account sell)</option>`; })()}
              </select></div>
          </div>
          <label>জবের ছবি (কার্ড/পোস্টে)</label>
          <div class="img-pick">
            <input type="hidden" class="adm-input" data-f="image" value="${esc(t.image || '')}">
            <input type="file" accept="image/png,image/jpeg,image/webp" data-imgfile="${esc(t.slug)}" hidden>
            <button type="button" class="adm-btn ghost sm" data-imgbtn="${esc(t.slug)}"><i class="fa-solid fa-image"></i> ছবি আপলোড</button>
            <input class="adm-input" data-imgurl value="${esc(/^https?:/.test(String(t.image || '')) ? t.image : '')}" placeholder="অথবা image URL (https://…)">
            <div class="img-prev" data-imgprev="${esc(t.slug)}" ${/^data:image/.test(String(t.image || '')) || /^https?:/.test(String(t.image || '')) ? '' : 'hidden'}>
              <img src="${esc(t.image || '')}" alt="preview"><button type="button" class="adm-btn red sm" data-imgclear="${esc(t.slug)}">মুছুন</button>
            </div>
          </div>
          <label>সংক্ষিপ্ত বিবরণ (কার্ডের এক লাইন)</label>
          <input class="adm-input" data-f="shortDesc" value="${esc(t.shortDesc || '')}" maxlength="200" placeholder="যেমন: ভিডিওতে like + comment করুন">
          <label>Account Password (seller যে পাসওয়ার্ড সেট করবে — খালি রাখলে hide)</label><input class="adm-input" data-f="password" value="${esc(t.password || '')}" maxlength="60">
          <label>Description / Instructions (project page-এ description)</label><textarea class="adm-input" data-f="description" rows="3" maxlength="300">${esc(t.description || '')}</textarea>
          <div class="two-col">
            <div><label>Submit বাটনের লেখা</label><input class="adm-input" data-f="submitLabel" value="${esc(t.submitLabel || '')}" placeholder="SUBMIT GMAIL" maxlength="40"></div>
            <div><label>History বাটনের লেখা</label><input class="adm-input" data-f="historyLabel" value="${esc(t.historyLabel || '')}" placeholder="View Gmail History" maxlength="40"></div>
          </div>
          <label>দৈনিক সর্বোচ্চ কয়টি account জমা দেওয়া যাবে (per seller)</label><input type="number" min="1" max="200" class="adm-input" data-f="dailyLimit" value="${Number(t.dailyLimit) || 20}">
          ${inputFieldsEditorHtml(t, isMJ)}
          <label>Video URL (YouTube link বা mp4) — task page-এ guide video</label><input class="adm-input" data-f="videoUrl" value="${esc(t.videoUrl || '')}">
          <div class="two-col">
            <label class="chk"><input type="checkbox" data-f="enabled" ${t.enabled !== false ? 'checked' : ''}> Task ON / Active</label>
            <label class="chk"><input type="checkbox" data-f="locked" ${t.locked ? 'checked' : ''}> Locked</label>
          </div>
          <div class="ai-actions">
            <button class="adm-btn gold sm" data-save="${esc(t.slug)}"><i class="fa-solid fa-floppy-disk"></i> সেভ</button>
          </div>
        </div>
      </div>`).join('')}</div>`;

  // input fields editor events (add / remove row)
  main.querySelectorAll('[data-ifadd]').forEach(btn => btn.addEventListener('click', () => {
    const rows = btn.closest('.if-editor').querySelector('[data-ifrows]');
    rows.querySelector('.if-empty')?.remove();
    const wrap = document.createElement('div');
    wrap.innerHTML = fieldRowHtml({}, rows.dataset.iftypes === 'mj' ? MJ_TF_TYPES : TF_TYPES);
    rows.appendChild(wrap.firstElementChild);
  }));
  main.querySelectorAll('[data-ifdel]').forEach(btn => btn.addEventListener('click', () => {
    btn.closest('[data-if-row]').remove();
    const rows = btn.closest('[data-ifrows]');
    if (!rows.querySelector('[data-if-row]')) rows.innerHTML = '<p class="muted if-empty">কোনো field নেই — task শুধু "link + submit" flow-এ থাকবে।</p>';
  }));

  main.querySelectorAll('[data-edit]').forEach(btn => btn.addEventListener('click', () => {
    const card = btn.closest('.task-card');
    const form = card.querySelector('[data-form]');
    form.hidden = !form.hidden;
  }));
  /* মুছুন = tasks/{slug} doc সরিয়ে ফেলা (user page থেকে cardও উঠে যাবে) */
  main.querySelectorAll('[data-del]').forEach(btn => btn.addEventListener('click', async () => {
    const slug = btn.dataset.del;
    if (!confirm(`“${slug}” মুছে ফেলবেন? user-এর পেজ থেকে এই job-এর card উঠে যাবে (জমা দেওয়া হিস্ট্রি থাকবে)।`)) return;
    btn.disabled = true;
    try {
      await deleteTask(slug);
      toast(`মুছে ফেলা হয়েছে: ${slug}`);
      redraw();
    } catch (err) {
      toast(err.message, 'error');
      btn.disabled = false;
    }
  }));

  main.querySelector('#seedTasksBtn')?.addEventListener('click', async e => {
    const btn = e.currentTarget;
    btn.disabled = true;
    try {
      const out = await seedTasks();
      toast(`তৈরি হয়েছে ${out.createdCount || 0}টা, আগে থেকেই ছিল ${out.skippedCount || 0}টা${out.invalid && out.invalid.length ? ' · কিছু হয়নি: ' + out.invalid.join(', ') : ''}`);
      redraw();
    } catch (err) { toast(err.message, 'error'); btn.disabled = false; }
  });

  /* ---- নতুন job তৈরি + ছবি আপলোড (per-card image picker-ও এখানেই) ---- */
  const newImg = document.getElementById('mjNewImage');
  const newPrev = document.getElementById('mjNewImagePrev');
  const setNewImg = v => {
    if (!newImg) return;
    newImg.value = v || '';
    if (newPrev) { const im = document.getElementById('mjNewImageImg'); if (im) im.src = v; newPrev.hidden = !v; }
  };
  document.getElementById('mjNewImageBtn')?.addEventListener('click', () => document.getElementById('mjNewImageFile')?.click());
  document.getElementById('mjNewImageFile')?.addEventListener('change', async e => {
    try { setNewImg(await pickImage(e.target.files && e.target.files[0], { maxSide: 640, maxBytes: 220_000 })); }
    catch (err) { toast(String(err.message || err), 'error'); }
  });
  const addRow = (host, f = {}) => {
    const wrap = document.createElement('div');
    wrap.innerHTML = fieldRowHtml(f, MJ_TF_TYPES);   // MicroJob create form-এ password field নেই (§9)
    host.appendChild(wrap.firstElementChild);
  };
  /* Job Poster হলে publish-এর আগেই budget = reward × requiredUsers balance-এ থাকতে হবে
     (§2) — hint এখানে শুধু দেখানোর জন্য, আসল verify server-এর transaction-এ */
  const budgetHint = document.getElementById('mjBudgetHint');
  /* ⚠️ val() এখানেই define করতে হবে — updHint + input listener + submit handler তিনটাই
     এটা ব্যবহার করে (ভেতরে define করলে বাইরে ReferenceError: val is not defined হতো) */
  const val = k => main.querySelector(`[data-nc="${k}"]`);
  const updHint = () => {
    if (!budgetHint) return;
    const r = Number(val('reward')?.value) || 0, n = Number(val('requiredUsers')?.value) || 0;
    const need = Math.round(r * n * 100) / 100;
    if (!wallet || !wallet.needsBalance) {
      budgetHint.className = 'mj-budget ok';
      budgetHint.innerHTML = `<i class="fa-solid fa-unlock-keyhole"></i> ${wallet && wallet.isOwner ? 'Owner' : 'Full Access'} — প্রকাশের জন্য ব্যালেন্স লাগে না। <b>মোট বাজেট ${fmt(need)}</b>`;
      return;
    }
    const ok = Number(wallet.balance) >= need;
    budgetHint.className = 'mj-budget ' + (ok ? 'ok' : 'bad');
    budgetHint.innerHTML = `<i class="fa-solid fa-${ok ? 'circle-check' : 'triangle-exclamation'}"></i> Job Poster: বাজেট <b>${fmt(need)}</b> (রোয়ার্ড ${fmt(r)} × ${n} জন) — আপনার ব্যালেন্স ${fmt(wallet.balance)}${ok ? '' : ' — যথেষ্ট নয়, প্রকাশ হবে না'}`;
  };
  ['reward', 'requiredUsers'].forEach(k => val(k)?.addEventListener('input', updHint));
  updHint();
  /* Draft → Public (server atomically ফান্ড করে) */
  main.querySelectorAll('[data-publish]').forEach(btn => btn.addEventListener('click', async () => {
    const slug = btn.dataset.publish;
    const budget = Number(btn.dataset.budget) || 0;
    if (!confirm(`“${slug}” প্রকাশ করবেন?${wallet && wallet.needsBalance ? ` Job Poster হিসেবে বাজেট ${fmt(budget)} আপনার ব্যালেন্স থেকে কেটে নেওয়া হবে (ব্যালেন্স ${fmt(wallet.balance)})।` : ''}`)) return;
    btn.disabled = true;
    try {
      const out = await publishMicrojob(slug);
      toast(`প্রকাশিত: ${slug}${out.budget ? ` — বাজেট ${fmt(out.budget)} কেটেছে, বাকি ${fmt(out.balanceAfter || 0)}` : ''}`);
      redraw();
    } catch (err) {
      toast(String(err.message || err), 'error');
      btn.disabled = false;
    }
  }));

  document.getElementById('mjNewFieldAdd')?.addEventListener('click', () => {
    const host = document.getElementById('mjNewFields');
    if (host) addRow(host);
  });
  document.getElementById('mjCreateBtn')?.addEventListener('click', async () => {
    const title = String(val('nameBn')?.value || '').trim();
    if (title.length < 2) { toast('Job Title লিখুন', 'error'); return; }
    const steps = String(val('steps')?.value || '').split('\n').map(x => x.trim()).filter(Boolean).slice(0, 20);
    const inputFields = [...(document.getElementById('mjNewFields')?.querySelectorAll('[data-if-row]') || [])]
      .map(r => ({
        label: r.querySelector('.if-label').value.trim(),
        type: r.querySelector('.if-type').value,
        placeholder: r.querySelector('.if-ph')?.value.trim() || '',
        required: r.querySelector('[data-ifreq]').checked,
      })).filter(x => x.label);
    const btn = document.getElementById('mjCreateBtn');
    btn.disabled = true;
    try {
      const fieldRows = [...(document.getElementById('mjNewFields')?.querySelectorAll('[data-if-row]') || [])]
        .map(r => ({
          label: r.querySelector('.if-label').value.trim(),
          type: r.querySelector('.if-type').value,
          placeholder: r.querySelector('.if-ph')?.value.trim() || '',
          required: r.querySelector('[data-ifreq]').checked,
        })).filter(x => x.label);
      const publish = !!val('publish')?.checked;
      const out = await createMicrojob({
        publish,
        /* kind: 'microjob' = আলাদা সিস্টেমের doc — user-এর মাইক্রো জব পেজ এটাই দেখায় */
        kind: 'microjob',
        /* subscription field না দিলে default দুটো (রিপোর্ট + ছবি) — admin চাইলে বদলায় */
        inputFields: fieldRows.length ? fieldRows : [
          { label: 'কাজের রিপোর্ট', type: 'textarea', required: true, placeholder: 'আপনি কী করেছেন লিখুন' },
          { label: 'প্রমাণের ছবি', type: 'image', required: true, placeholder: 'স্ক্রিনশট তুলুন' },
        ],
        nameBn: title, slug: String(val('slug')?.value || '').trim(),
        reward: Number(val('reward')?.value) || 0,
        requiredUsers: Math.max(1, Number(val('requiredUsers')?.value) || 1),
        shortDesc: String(val('shortDesc')?.value || '').trim(),
        url: String(val('url')?.value || '').trim(),
        videoUrl: String(val('videoUrl')?.value || '').trim(),
        image: newImg ? newImg.value : '',
        steps, sort: Number(val('sort')?.value) || 100,
        mode: 'single',
      });
      toast(out.draft
        ? `ড্রাফট সেভ হয়েছে: ${out.slug || ''} — “প্রকাশ” চাপলে ব্যালেন্স থেকে বাজেট কেটে public হবে`
        : `জব প্রকাশিত: ${out.slug || ''}${out.budget ? ` — বাজেট ${fmt(out.budget)} কেটেছে, বাকি ${fmt(out.balanceAfter || 0)}` : ''}`);
      redraw();
    } catch (err) { toast(err.message, 'error'); btn.disabled = false; }
  });
  /* ছবি: card প্রতি আপলোড/URL/clear (ডেটা data-f="image" hidden input-এ বসে, save সেটাই পাঠায়) */
  main.querySelectorAll('[data-imgbtn]').forEach(btn => btn.addEventListener('click', () => {
    const slug = btn.dataset.imgbtn;
    main.querySelector(`[data-imgfile="${slug}"]`)?.click();
  }));
  main.querySelectorAll('[data-imgfile]').forEach(inp => inp.addEventListener('change', async e => {
    const slug = inp.dataset.imgfile;
    const card = inp.closest('.task-card');
    try {
      const dataUrl = await pickImage(e.target.files && e.target.files[0], { maxSide: 640, maxBytes: 220_000 });
      const hid = card.querySelector('input[type=hidden][data-f="image"]');
      if (hid) hid.value = dataUrl;
      const urlInp = card.querySelector('[data-imgurl]');
      if (urlInp) urlInp.value = '';
      const prev = card.querySelector(`[data-imgprev="${slug}"]`);
      if (prev) { prev.querySelector('img').src = dataUrl; prev.hidden = false; }
      toast('ছবি লাগানো হয়েছে — Save চাপুন');
    } catch (err) { toast(String(err.message || err), 'error'); }
  }));
  main.querySelectorAll('[data-imgclear]').forEach(btn => btn.addEventListener('click', () => {
    const card = btn.closest('.task-card');
    const slug = btn.dataset.imgclear;
    const hid = card.querySelector('input[type=hidden][data-f="image"]');
    if (hid) hid.value = '';
    const urlInp = card.querySelector('[data-imgurl]');
    if (urlInp) urlInp.value = '';
    const prev = card.querySelector(`[data-imgprev="${slug}"]`);
    if (prev) prev.hidden = true;
  }));

  main.querySelectorAll('[data-save]').forEach(btn => btn.addEventListener('click', async () => {
    const card = btn.closest('.task-card');
    const f = n => card.querySelector(`[data-form] [data-f="${n}"]`);
    const url = f('url').value.trim();
    if (url && !/^https?:\/\//i.test(url)) {
      toast('Task URL শুধু http/https হতে পারে (javascript:/data: allowed না)', 'error');
      return;
    }
    const inputFields = [...card.querySelectorAll('[data-ifrows] [data-if-row]')].map(r => ({
      label: r.querySelector('.if-label').value.trim(),
      type: r.querySelector('.if-type').value,
      placeholder: r.querySelector('.if-ph')?.value.trim() || '',
      required: r.querySelector('[data-ifreq]').checked,
    })).filter(x => x.label);
    btn.disabled = true;
    try {
      await saveTask(btn.dataset.save, {
        nameBn: f('nameBn').value.trim(),
        url,
        reward: Number(f('reward').value) || 0,
        sort: Number(f('sort').value) || 10,
        password: f('password').value.trim(),
        description: f('description').value.trim(),
        submitLabel: f('submitLabel').value.trim(),
        historyLabel: f('historyLabel').value.trim(),
        dailyLimit: Math.max(1, Math.min(200, Number(f('dailyLimit').value) || 20)),
        inputFields,
        videoUrl: f('videoUrl').value.trim(),
        image: (card.querySelector('[data-imgurl]')?.value || '').trim() || (f('image')?.value || ''),
        shortDesc: f('shortDesc') ? f('shortDesc').value.trim() : '',
        requiredUsers: f('requiredUsers') ? Math.max(0, Number(f('requiredUsers').value) || 0) : 0,
        mode: f('mode') ? f('mode').value : 'single',
        enabled: f('enabled').checked,
        locked: f('locked').checked,
      });
      toast('সেভ হয়েছে — user website-তে update হয়ে গেছে');
      redraw();
    } catch (err) { toast(err.message, 'error'); btn.disabled = false; }
  }));
}

/* ---------- settings ---------- */
const SET_FIELDS = [
  { group: 'General', fields: [
    ['siteName', 'Site Name', 'text'],
    ['telegramLink', 'Telegram Link', 'url'],
    ['facebookLink', 'Facebook Link', 'url'],
    ['youtubeLink', 'YouTube Link', 'url'],
    ['videoUrl', 'Tutorial Video URL', 'url'],
  ]},
  { group: 'Money (৳)', fields: [
    ['activationFee', 'Activation Deposit Fee', 'number'],
    ['activationBonus', 'Activation Bonus', 'number'],
    ['registerBonus', 'Registration Bonus', 'number'],
    ['referralBonus', 'Referral Bonus', 'number'],
    ['minWithdraw', 'Minimum Withdraw', 'number'],
    ['giftReward', 'Daily Gift Reward', 'number'],
  ]},
  { group: 'Payment Numbers (Deposit-এর জন্য)', fields: [
    ['bkashNumber', 'bKash Number', 'text'],
    ['nagadNumber', 'Nagad Number', 'text'],
    ['rocketNumber', 'Rocket Number', 'text'],
  ]},
  { group: 'Gift', fields: [
    ['giftCode', 'Gift Code', 'text'],
  ]},
  { group: 'Admin Contact (Support page-এ দেখাবে)', fields: [
    ['admin1Name', 'Admin 1 — Name', 'text'],
    ['admin1Phone', 'Admin 1 — Phone', 'text'],
    ['admin1Email', 'Admin 1 — Email', 'email'],
    ['admin1Link', 'Admin 1 — Link', 'url'],
    ['admin2Name', 'Admin 2 — Name', 'text'],
    ['admin2Phone', 'Admin 2 — Phone', 'text'],
    ['admin2Email', 'Admin 2 — Email', 'email'],
    ['admin2Link', 'Admin 2 — Link', 'url'],
  ]},
];

async function viewSettings(main) {
  const s = await getSettings();
  // secret (giftCode) server থেকে পড়া যায়নি → field disable, নাহলে খালি value
  // Save করলে gift code মুছে যেত — আগের version-এ ঠিক এটাই হতো
  const secretOff = s._secretLoaded !== true;
  main.innerHTML = `
    <form id="settingsForm">
    ${SET_FIELDS.map(g => `
      <div class="adm-card">
        <h4><i class="fa-solid fa-sliders" style="color:#d97706"></i> ${g.group}</h4>
        <div class="set-grid">
          ${g.fields.map(([k, label, type]) => {
            const locked = k === 'giftCode' && secretOff;
            return `
            <div><label>${label}</label><input type="${type}" step="${type === 'number' ? '0.5' : undefined}" class="adm-input" data-sf="${k}" value="${locked ? '' : esc(s[k] ?? '')}" ${locked ? 'disabled placeholder="লোড করা যায়নি — API দেখুন"' : ''}></div>`;
          }).join('')}
        </div>
        ${g.group === 'Gift' && secretOff ? '<p class="muted" style="margin-top:8px"><i class="fa-solid fa-triangle-exclamation" style="color:#dc2626"></i> Gift Code server API থেকে পড়া যায়নি — এই ঘরটা এখন change হবে না (ভুলবশত কোড মুছে যাবে না)।</p>' : ''}
        ${g.group === 'Gift' && !secretOff ? `<p class="muted" style="margin-top:8px">কোড: <b>${esc(s.giftCode || '(খালি)')}</b> <button type="button" class="adm-btn ghost sm" id="clearGiftBtn" style="margin-left:8px">মুছুন</button></p>` : ''}
      </div>`).join('')}
      <button type="submit" class="adm-btn gold"><i class="fa-solid fa-floppy-disk"></i> Save Settings</button>
      <button type="button" class="adm-btn ghost" id="lbSyncBtn" style="margin-left:8px"><i class="fa-solid fa-trophy"></i> Leaderboard count sync</button>
      <p class="muted" style="font-size:12px;margin-top:6px">Leaderboard (Top 4) existing referral data থেকেই হিসাব করে; এই বাটন চাপলে referral সংখ্যা গুনে user doc-এ cache হয় (বড় list-এ দ্রুত লোড হয়)।</p>
    </form>`;
  document.getElementById('lbSyncBtn')?.addEventListener('click', async () => {
    const b = document.getElementById('lbSyncBtn');
    b.disabled = true;
    try {
      const out = await syncLeaderboard();
      toast(`Leaderboard sync: ${out.updated || 0}টা user (${out.failed || 0}টা বাদ)`);
    } catch (err) { toast(err.message, 'error'); }
    b.disabled = false;
  });
  document.getElementById('clearGiftBtn')?.addEventListener('click', async () => {
    if (!confirm('Gift code মুছে ফেলবেন? তাহলে কেউই আর gift claim করতে পারবে না।')) return;
    try { await clearGiftCode(); toast('Gift code cleared'); viewSettings(main); }
    catch (err) { toast(err.message, 'error'); }
  });
  document.getElementById('settingsForm').addEventListener('submit', async e => {
    e.preventDefault();
    const data = {};
    main.querySelectorAll('[data-sf]').forEach(inp => {
      if (inp.disabled) return; // load না হওয়া field পাঠানো হয় না — overwrite রোধ
      const k = inp.dataset.sf;
      data[k] = inp.type === 'number' ? (Number(inp.value) || 0) : inp.value.trim();
    });
    const btn = e.target.querySelector('button[type=submit]');
    btn.disabled = true;
    try {
      await saveSettings(data);
      toast('Settings save হয়েছে');
    } catch (err) {
      toast(err.message, 'error');
      btn.disabled = false;
    }
  });
}

/* ---------- notices ----------
   All-user notice (notices/) + user-specific private warning (users/{uid}/targetNotices/)
   Targeted শুধু সেই user-এই দেখবে (Firestore rules) — অন্য কেউ list করতে পারে না। */
let ntTargetUid = '';
async function viewNotices(main) {
  const [notices, targeted] = await Promise.all([listNotices(), listTargetedAll().catch(() => [])]);
  const users = await listUsers(300).catch(() => []);
  main.innerHTML = `
    <div class="adm-card">
      <h4><i class="fa-solid fa-bullhorn" style="color:#d97706"></i> নতুন Notice / Warning</h4>
      <div class="two-col">
        <div><label>ধরন</label>
          <select class="adm-input" id="ntType"><option value="notice">নোটিশ</option><option value="warning">সতর্কতা</option></select>
        </div>
        <div><label>টার্গেট</label>
          <select class="adm-input" id="ntTarget"><option value="all">সব user (All)</option><option value="user">নির্দিষ্ট user</option></select>
        </div>
      </div>
      <div id="ntUserWrap" hidden style="margin-top:8px">
        <label>User খুঁজুন (নাম/মোবাইল) + select করুন</label>
        <input class="adm-input" id="ntUserSearch" placeholder="নাম বা মোবাইল লিখুন...">
        <div id="ntUserResults" class="user-list" style="max-height:150px;overflow:auto"></div>
      </div>
      <input class="adm-input" id="ntTitle" placeholder="Title (ঐচ্ছিক)" maxlength="60" style="margin-top:8px">
      <textarea class="adm-input" id="ntBody" rows="3" placeholder="Notice/Warning লিখুন..." maxlength="300" style="margin-top:8px"></textarea>
      <div class="two-col" style="margin-top:8px">
        <div><label>Expiry (ঐচ্ছিক — তারিখের পর অদৃশ্য)</label><input type="date" class="adm-input" id="ntExpiry"></div>
        <div style="align-self:flex-end"><button class="adm-btn gold sm" id="ntAdd"><i class="fa-solid fa-plus"></i> Send</button></div>
      </div>
    </div>

    <h4 style="margin:14px 0 8px"><i class="fa-solid fa-bullhorn" style="color:#d97706"></i> All-User Notices</h4>
    ${notices.map(n => `
      <div class="adm-card">
        <div class="task-row">
          <div class="task-info"><b>${n.type === 'warning' ? '⚠️ ' : ''}${esc(n.title || '—')}</b><span class="muted">${n.enabled ? 'ON' : 'OFF'} • sort ${n.sort || 0}${n.expiresAt ? ' • expire ' + timeBn(n.expiresAt) : ''}</span></div>
          <div class="ai-actions" style="flex-wrap:wrap">
            <button class="adm-btn ghost sm" data-tgl="${n.id}"><i class="fa-solid ${n.enabled ? 'fa-eye-slash' : 'fa-eye'}"></i></button>
            <button class="adm-btn red sm" data-del="${n.id}"><i class="fa-solid fa-trash"></i></button>
          </div>
        </div>
        <p class="muted nt-body">${esc(n.body || '')}</p>
      </div>`).join('')}
    ${notices.length ? '' : '<p class="muted center-note">কোনো all-user notice নেই।</p>'}

    <h4 style="margin:14px 0 8px"><i class="fa-solid fa-triangle-exclamation" style="color:#dc2626"></i> Private Warnings (user-specific)</h4>
    ${targeted.map(n => `
      <div class="adm-card">
        <div class="task-row">
          <div class="task-info">
            <b>${n.type === 'warning' ? '⚠️ ' : ''}${esc(n.title || '—')}</b>
            <span class="muted">→ ${esc(n.userName || '—')} (${esc(n.userMobile || n.uid)}) • ${n.enabled ? 'ACTIVE' : 'OFF'}${n.expiresAt ? ' • expire ' + n.expiresAt : ''}</span>
          </div>
          <div class="ai-actions" style="flex-wrap:wrap">
            <button class="adm-btn ghost sm" data-tn-tgl="${n.uid}::${n.id}">${n.enabled ? 'লুকান' : 'দেখান'}</button>
            <button class="adm-btn red sm" data-tn-del="${n.uid}::${n.id}"><i class="fa-solid fa-trash"></i></button>
          </div>
        </div>
        <p class="muted nt-body">${esc(n.body || '')}</p>
      </div>`).join('')}
    ${targeted.length ? '' : '<p class="muted center-note">কোনো private warning নেই।</p>'}`;

  /* target select */
  const targetSel = document.getElementById('ntTarget');
  const userWrap = document.getElementById('ntUserWrap');
  const searchInp = document.getElementById('ntUserSearch');
  const results = document.getElementById('ntUserResults');
  targetSel.addEventListener('change', () => { userWrap.hidden = targetSel.value !== 'user'; });
  const renderResults = (q = '') => {
    const ql = q.trim().toLowerCase();
    const m = ql ? users.filter(u => (u.name || '').toLowerCase().includes(ql) || String(u.mobile || '').includes(ql)) : users;
    results.innerHTML = m.slice(0, 30).map(u => `
      <div class="user-row ${ntTargetUid === u.uid ? 'on' : ''}" data-ntu="${u.uid}">
        <div class="ur-avatar">${esc((u.name || '?').trim()[0].toUpperCase())}</div>
        <div class="ur-info"><b>${esc(u.name || '—')}</b><span class="muted">${esc(u.mobile || '')}</span></div>
        <div class="ur-right">${ntTargetUid === u.uid ? '<span class="badge green">SELECTED</span>' : ''}</div>
      </div>`).join('') || '<p class="muted">কোনো user পাওয়া যায়নি</p>';
    results.querySelectorAll('[data-ntu]').forEach(r => r.addEventListener('click', () => {
      ntTargetUid = r.dataset.ntu;
      renderResults(searchInp.value);
    }));
  };
  searchInp.addEventListener('input', () => renderResults(searchInp.value));

  document.getElementById('ntAdd').addEventListener('click', async () => {
    const title = document.getElementById('ntTitle').value.trim();
    const body = document.getElementById('ntBody').value.trim();
    const type = document.getElementById('ntType').value;
    const target = targetSel.value;
    const expRaw = document.getElementById('ntExpiry').value;
    if (!title && !body) { toast('Title বা message লিখুন', 'error'); return; }
    if (target === 'user' && !ntTargetUid) { toast('একটা user select করুন', 'error'); return; }
    const expiresAt = expRaw ? new Date(expRaw + 'T23:59:59') : null;
    try {
      if (target === 'user') await addTargetedNotice(ntTargetUid, { title, body, type, expiresAt });
      else await addNotice({ title, body, type, expiresAt });
      toast(target === 'user' ? 'Private warning পাঠানো হয়েছে (শুধু সেই user দেখবে)' : 'Notice add হয়েছে (সব user দেখবে)');
      ntTargetUid = '';
      viewNotices(main);
    } catch (err) { toast(err.message, 'error'); }
  });
  main.querySelectorAll('[data-tgl]').forEach(btn => btn.addEventListener('click', async () => {
    const n = notices.find(x => x.id === btn.dataset.tgl);
    try { await updateNotice(n.id, { title: n.title, body: n.body, enabled: !n.enabled, sort: n.sort }); toast('Notice toggle'); viewNotices(main); } catch (err) { toast(err.message, 'error'); }
  }));
  main.querySelectorAll('[data-del]').forEach(btn => btn.addEventListener('click', async () => {
    if (!confirm('Notice মুছে ফেলবেন?')) return;
    try { await deleteNotice(btn.dataset.del); toast('Notice delete হয়েছে'); viewNotices(main); } catch (err) { toast(err.message, 'error'); }
  }));
  main.querySelectorAll('[data-tn-tgl]').forEach(btn => btn.addEventListener('click', async () => {
    const [tuid, tid] = btn.dataset.tnTgl.split('::');
    const n = targeted.find(x => x.uid === tuid && x.id === tid);
    try { await updateTargetedNotice(tuid, tid, { enabled: !n.enabled }); toast('Warning toggle'); viewNotices(main); } catch (err) { toast(err.message, 'error'); }
  }));
  main.querySelectorAll('[data-tn-del]').forEach(btn => btn.addEventListener('click', async () => {
    if (!confirm('Warning মুছে ফেলবেন?')) return;
    const [tuid, tid] = btn.dataset.tnDel.split('::');
    try { await deleteTargetedNotice(tuid, tid); toast('Warning delete হয়েছে'); viewNotices(main); } catch (err) { toast(err.message, 'error'); }
  }));
}
