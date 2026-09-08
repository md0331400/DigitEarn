/* DigitEarn Admin Panel — UI (hash routing, mobile-first) */
import '@fortawesome/fontawesome-free/css/all.min.css';
import './styles.css';
import {
  auth, firebaseReady, onAuthStateChanged, signInWithEmailAndPassword, signOut,
  isAdminEmail, esc, fmt, timeBn,
  overviewStats, listProofs, approveProof, rejectProof, getUser,
  listDeposits, approveDeposit, rejectDeposit,
  listUsers, getUserTransactions, setUserActive,
  listTasks, saveTask,
  getSettings, saveSettings,
  listNotices, addNotice, updateNotice, deleteNotice,
} from './core.js';

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

/* ---------- auth ---------- */
if (!firebaseReady) {
  app.innerHTML = `<div class="loading-center"><p style="max-width:340px;text-align:center">Firebase env variables set নেই।<br>Vercel-এ ৬টা <b>VITE_FIREBASE_*</b> variable দিন।</p></div>`;
}

onAuthStateChanged(auth, async fbUser => {
  if (!fbUser) { me = null; renderLogin(); return; }
  const admin = await isAdminEmail(fbUser.email);
  if (!admin) {
    await signOut(auth);
    renderLogin('এই email টা admin list-এ নেই — Firestore-এর admins collection-এ email টা আছে কিনা দেখুন।');
    return;
  }
  me = { email: fbUser.email };
  window.location.hash = window.location.hash || '#/overview';
  renderShell();
  window.addEventListener('hashchange', onHash);
});

function renderLogin(errMsg = '') {
  app.innerHTML = `
    <div class="login-wrap">
      <div class="login-card">
        <div class="login-logo"><i class="fa-solid fa-bolt"></i></div>
        <h1>DigitEarn <span>Admin</span></h1>
        <p class="muted">Admin panel-এ লগইন করুন</p>
        ${errMsg ? `<div class="form-err"><i class="fa-solid fa-triangle-exclamation"></i> ${esc(errMsg)}</div>` : ''}
        <form id="loginForm">
          <input type="email" id="lgEmail" class="adm-input" placeholder="Admin email" required>
          <input type="password" id="lgPass" class="adm-input" placeholder="Password" required>
          <button class="adm-btn gold" type="submit"><i class="fa-solid fa-right-to-bracket"></i> Login</button>
        </form>
      </div>
    </div>`;
  document.getElementById('loginForm').addEventListener('submit', async e => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
    try {
      await signInWithEmailAndPassword(auth, document.getElementById('lgEmail').value.trim(), document.getElementById('lgPass').value);
    } catch (err) {
      btn.disabled = false;
      btn.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i> Login';
      renderLogin('Login fail — email/password ঠিক আছে কিনা দেখুন (অথবা এই email-এ Firebase Auth-এ account নেই)।');
    }
  });
}

/* ---------- shell ---------- */
const NAV = [
  { id: 'overview', label: 'Overview', icon: 'fa-gauge-high' },
  { id: 'proofs', label: 'Proofs', icon: 'fa-images' },
  { id: 'deposits', label: 'Deposits', icon: 'fa-money-bill-wave' },
  { id: 'users', label: 'Users', icon: 'fa-users' },
  { id: 'tasks', label: 'Micro Jobs', icon: 'fa-briefcase' },
  { id: 'settings', label: 'Settings', icon: 'fa-gear' },
  { id: 'notices', label: 'Notices', icon: 'fa-bullhorn' },
];

function renderShell() {
  app.innerHTML = `
    <header class="adm-top">
      <div class="adm-logo"><i class="fa-solid fa-bolt"></i> DigitEarn <span>Admin</span></div>
      <div class="adm-top-right">
        <span class="adm-email"><i class="fa-solid fa-user-shield"></i> ${esc(me.email)}</span>
        <button class="adm-btn ghost sm" id="logoutBtn"><i class="fa-solid fa-right-from-bracket"></i></button>
      </div>
    </header>
    <nav class="adm-nav">${NAV.map(n => `<a href="#/${n.id}" data-nav="${n.id}"><i class="fa-solid ${n.icon}"></i> ${n.label}</a>`).join('')}</nav>
    <main class="adm-main" id="admMain"><div class="loading-center"><i class="fa-solid fa-spinner fa-spin"></i></div></main>`;
  document.getElementById('logoutBtn').addEventListener('click', () => signOut(auth));
  onHash();
}

async function onHash() {
  const view = (window.location.hash || '#/overview').replace('#/', '');
  const main = document.getElementById('admMain');
  if (!main) return;
  document.querySelectorAll('[data-nav]').forEach(a => a.classList.toggle('on', a.dataset.nav === view));
  main.innerHTML = '<div class="loading-center"><i class="fa-solid fa-spinner fa-spin"></i></div>';
  try {
    if (view === 'proofs') await viewProofs(main);
    else if (view === 'deposits') await viewDeposits(main);
    else if (view === 'users') await viewUsers(main);
    else if (view === 'tasks') await viewTasks(main);
    else if (view === 'settings') await viewSettings(main);
    else if (view === 'notices') await viewNotices(main);
    else await viewOverview(main);
  } catch (err) {
    main.innerHTML = `<div class="form-err"><i class="fa-solid fa-triangle-exclamation"></i> ${esc(err.message)}</div>`;
  }
}

/* ---------- overview ---------- */
async function viewOverview(main) {
  const s = await overviewStats();
  main.innerHTML = `
    <div class="stat-grid">
      <div class="adm-stat gold"><i class="fa-solid fa-users"></i><b>${s.totalUsers}</b><span>মোট ইউজার</span></div>
      <div class="adm-stat green"><i class="fa-solid fa-circle-check"></i><b>${s.activeUsers}</b><span>অ্যাক্টিভ</span></div>
      <div class="adm-stat red"><i class="fa-solid fa-images"></i><b>${s.pendingProofs}</b><span>Proof Review</span></div>
      <div class="adm-stat red"><i class="fa-solid fa-money-bill-wave"></i><b>${s.pendingDeposits}</b><span>Deposit Review</span></div>
    </div>
    <div class="adm-card"><h4><i class="fa-solid fa-scale-balanced" style="color:#d97706"></i> মোট Outstanding Balance</h4>
      <div class="big-num">${fmt(s.totalBalance)}</div>
      <p class="muted">সব ইউজারের ব্যালেন্সের যোগফল (প্রতি ১০০০ ইউজার পর্যন্ত)।</p>
    </div>
    ${s.recentProofs.length ? `
    <div class="adm-card">
      <h4><i class="fa-solid fa-images" style="color:#d97706"></i> সর্বশেষ Pending Proofs</h4>
      ${s.recentProofs.map(p => `<div class="mini-row"><b>${esc(p.taskName || p.taskSlug)}</b> <span class="muted">${timeBn(p.createdAt)}</span><span class="badge gold">+${fmt(p.reward)}</span></div>`).join('')}
      <a href="#/proofs" class="link-more">সব দেখুন →</a>
    </div>` : ''}
    ${s.recentDeposits.length ? `
    <div class="adm-card">
      <h4><i class="fa-solid fa-money-bill-wave" style="color:#d97706"></i> সর্বশেষ Pending Deposits</h4>
      ${s.recentDeposits.map(d => `<div class="mini-row"><b>${esc(d.method)}</b> <span class="muted">${timeBn(d.createdAt)}</span><span class="badge gold">${fmt(d.amount)}</span></div>`).join('')}
      <a href="#/deposits" class="link-more">সব দেখুন →</a>
    </div>` : ''}
    ${!s.recentProofs.length && !s.recentDeposits.length ? '<p class="muted center-note">কোনো pending item নেই ✓</p>' : ''}`;
}

/* ---------- proofs ---------- */
let proofFilter = 'pending';
async function viewProofs(main) {
  main.innerHTML = `
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
  const list = await listProofs(proofFilter);
  const box = document.getElementById('proofList');
  if (!list.length) { box.innerHTML = '<p class="muted center-note">কোনো proof নেই।</p>'; return; }
  const items = await Promise.all(list.map(async p => ({ p, user: await getUser(p.userId).catch(() => null) })));
  box.innerHTML = items.map(({ p, user }) => `
    <div class="adm-item">
      <div class="ai-head">
        <div class="ai-user"><b>${esc(user?.name || p.userId)}</b><span class="muted">${esc(user?.mobile || '')}</span></div>
        <span class="badge ${p.status}">${{ pending: 'PENDING', approved: 'APPROVED', rejected: 'REJECTED' }[p.status] || p.status}</span>
      </div>
      <div class="ai-meta"><i class="fa-solid fa-briefcase"></i> ${esc(p.taskName || p.taskSlug)} • <b class="gold-txt">${fmt(p.reward)}</b> • ${timeBn(p.createdAt)}</div>
      ${(p.images || []).length ? `<div class="thumb-row">${p.images.map(u => `<a href="${esc(u)}" target="_blank" rel="noopener"><img class="adm-thumb" src="${esc(u)}" loading="lazy" alt="proof"></a>`).join('')}</div>` : ''}
      ${p.status === 'rejected' && p.note ? `<p class="ai-note"><i class="fa-solid fa-note"></i> ${esc(p.note)}</p>` : ''}
      ${p.status === 'pending' ? `
      <div class="ai-actions">
        <button class="adm-btn green sm" data-approve="${p.id}"><i class="fa-solid fa-check"></i> Approve +${fmt(p.reward)}</button>
        <button class="adm-btn red sm" data-reject="${p.id}"><i class="fa-solid fa-xmark"></i> Reject</button>
      </div>` : ''}
    </div>`).join('');

  box.querySelectorAll('[data-approve]').forEach(btn => btn.addEventListener('click', async () => {
    btn.disabled = true;
    try {
      await approveProof(btn.dataset.approve);
      toast('Proof approve — reward balance-এ যোগ হয়েছে');
      viewProofs(main);
    } catch (err) { toast(err.message, 'error'); btn.disabled = false; }
  }));
  box.querySelectorAll('[data-reject]').forEach(btn => btn.addEventListener('click', async () => {
    const note = prompt('Reject reason (user দেখবে):') || '';
    try {
      await rejectProof(btn.dataset.reject, note);
      toast('Proof reject করা হয়েছে');
      viewProofs(main);
    } catch (err) { toast(err.message, 'error'); }
  }));
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
  const items = await Promise.all(list.map(async d => ({ d, user: await getUser(d.userId).catch(() => null) })));
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
        <button class="adm-btn green sm" data-dapprove="${d.id}"><i class="fa-solid fa-check"></i> Approve — Account Active</button>
        <button class="adm-btn red sm" data-dreject="${d.id}"><i class="fa-solid fa-xmark"></i> Reject</button>
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
    const note = prompt('Reject reason (user দেখবে):') || '';
    try {
      await rejectDeposit(btn.dataset.dreject, note);
      toast('Deposit reject করা হয়েছে');
      viewDeposits(main);
    } catch (err) { toast(err.message, 'error'); }
  }));
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
        <div class="ur-right"><b class="gold-txt">${fmt(u.balance)}</b>${u.isActive ? '<span class="badge green">ACTIVE</span>' : '<span class="badge gray">INACTIVE</span>'}</div>
      </div>`).join('') || '<p class="muted center-note">কোনো ইউজার পাওয়া যায়নি।</p>';
    box.querySelectorAll('[data-uid]').forEach(r => r.addEventListener('click', () => { selectedUid = r.dataset.uid; doList(); doDetail(); }));
    doDetail();
  };
  const doDetail = async () => {
    const dbox = document.getElementById('userDetail');
    if (!selectedUid) { dbox.innerHTML = ''; return; }
    dbox.innerHTML = '<div class="loading-center"><i class="fa-solid fa-spinner fa-spin"></i></div>';
    const [u, txs] = await Promise.all([getUser(selectedUid), getUserTransactions(selectedUid)]);
    if (!u) { dbox.innerHTML = ''; return; }
    dbox.innerHTML = `
      <div class="adm-card detail-card">
        <h4><i class="fa-solid fa-user" style="color:#d97706"></i> ${esc(u.name || 'User')} <span class="muted" style="font-weight:500">• ${esc(u.mobile || '')}</span></h4>
        <div class="detail-grid">
          <div><span class="muted">Balance</span><b>${fmt(u.balance)}</b></div>
          <div><span class="muted">Total Earned</span><b>${fmt(u.totalEarned)}</b></div>
          <div><span class="muted">Status</span>${u.isActive ? '<b style="color:#16a34a">ACTIVE</b>' : '<b style="color:#dc2626">INACTIVE</b>'}</div>
          <div><span class="muted">Joined</span><b>${timeBn(u.createdAt)}</b></div>
        </div>
        <div class="ai-actions">
          ${u.isActive ? `<button class="adm-btn red sm" data-deact="${u.uid}"><i class="fa-solid fa-ban"></i> Inactive করুন</button>` : `<button class="adm-btn green sm" data-act="${u.uid}"><i class="fa-solid fa-check"></i> Active করুন (manual)</button>`}
        </div>
        <h4 style="margin-top:14px"><i class="fa-solid fa-receipt" style="color:#d97706"></i> Recent Transactions</h4>
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
  };
  document.getElementById('userSearch').addEventListener('input', e => { userQuery = e.target.value; doList(); });
  await doList();
}

/* ---------- tasks ---------- */
async function viewTasks(main) {
  const tasks = await listTasks();
  main.innerHTML = `
    <div class="adm-card task-head"><h4><i class="fa-solid fa-briefcase" style="color:#d97706"></i> Micro Jobs</h4>
    <p class="muted">Reward, link, lock/status, video পরিবর্তন করুন। Save করলেই website-তে update হয়ে যাবে। নতুন task-এর জন্য নতুন page লাগবে — developer-কে জানান।</p></div>
    <div id="taskList">${tasks.map(t => `
      <div class="adm-card task-card" data-slug="${esc(t.slug)}">
        <div class="task-row">
          <div class="task-info">
            <b>${esc(t.nameBn || t.slug)} ${t.enabled === false ? '<span class="badge gray">OFF</span>' : ''} ${t.locked ? '<span class="badge gold">LOCKED</span>' : ''}</b>
            <span class="muted">/task/${esc(t.slug)}.html • ${fmt(t.reward)}</span>
          </div>
          <button class="adm-btn ghost sm" data-edit="${esc(t.slug)}"><i class="fa-solid fa-pen"></i></button>
        </div>
        <div class="task-form" data-form="${esc(t.slug)}" hidden>
          <label>নাম (বাংলা)</label><input class="adm-input" data-f="nameBn" value="${esc(t.nameBn || '')}">
          <label>Task URL (user-এর জন্য link)</label><input class="adm-input" data-f="url" value="${esc(t.url || '')}">
          <div class="two-col">
            <div><label>Reward (৳)</label><input type="number" step="0.5" class="adm-input" data-f="reward" value="${Number(t.reward) || 0}"></div>
            <div><label>Sort</label><input type="number" class="adm-input" data-f="sort" value="${Number(t.sort) || 10}"></div>
          </div>
          <label>Video URL (YouTube link বা mp4) — task page-এ guide video</label><input class="adm-input" data-f="videoUrl" value="${esc(t.videoUrl || '')}">
          <div class="two-col">
            <label class="chk"><input type="checkbox" data-f="enabled" ${t.enabled !== false ? 'checked' : ''}> Task ON (website-এ দেখাবে)</label>
            <label class="chk"><input type="checkbox" data-f="locked" ${t.locked ? 'checked' : ''}> Locked</label>
          </div>
          <div class="ai-actions">
            <button class="adm-btn gold sm" data-save="${esc(t.slug)}"><i class="fa-solid fa-floppy-disk"></i> Save</button>
          </div>
        </div>
      </div>`).join('')}</div>`;

  main.querySelectorAll('[data-edit]').forEach(btn => btn.addEventListener('click', () => {
    const card = btn.closest('.task-card');
    const form = card.querySelector('[data-form]');
    form.hidden = !form.hidden;
  }));
  main.querySelectorAll('[data-save]').forEach(btn => btn.addEventListener('click', async () => {
    const card = btn.closest('.task-card');
    const f = n => card.querySelector(`[data-form] [data-f="${n}"]`);
    btn.disabled = true;
    try {
      await saveTask(btn.dataset.save, {
        nameBn: f('nameBn').value.trim(),
        url: f('url').value.trim(),
        reward: Number(f('reward').value) || 0,
        sort: Number(f('sort').value) || 10,
        videoUrl: f('videoUrl').value.trim(),
        enabled: f('enabled').checked,
        locked: f('locked').checked,
      });
      toast('Task save হয়েছে — website-তে update হয়ে গেছে');
      viewTasks(main);
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
  main.innerHTML = `
    <form id="settingsForm">
    ${SET_FIELDS.map(g => `
      <div class="adm-card">
        <h4><i class="fa-solid fa-sliders" style="color:#d97706"></i> ${g.group}</h4>
        <div class="set-grid">
          ${g.fields.map(([k, label, type]) => `
            <div><label>${label}</label><input type="${type}" step="${type === 'number' ? '0.5' : undefined}" class="adm-input" data-sf="${k}" value="${esc(s[k] ?? '')}"></div>`).join('')}
        </div>
      </div>`).join('')}
      <button type="submit" class="adm-btn gold"><i class="fa-solid fa-floppy-disk"></i> Save Settings</button>
    </form>`;
  document.getElementById('settingsForm').addEventListener('submit', async e => {
    e.preventDefault();
    const data = {};
    main.querySelectorAll('[data-sf]').forEach(inp => {
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

/* ---------- notices ---------- */
async function viewNotices(main) {
  const notices = await listNotices();
  main.innerHTML = `
    <div class="adm-card">
      <h4><i class="fa-solid fa-bullhorn" style="color:#d97706"></i> নতুন Notice</h4>
      <input class="adm-input" id="ntTitle" placeholder="Title" maxlength="80">
      <textarea class="adm-input" id="ntBody" rows="3" placeholder="Notice লিখুন..." maxlength="300" style="margin-top:8px"></textarea>
      <button class="adm-btn gold sm" id="ntAdd" style="margin-top:10px"><i class="fa-solid fa-plus"></i> Add Notice</button>
    </div>
    ${notices.map(n => `
      <div class="adm-card">
        <div class="task-row">
          <div class="task-info"><b>${esc(n.title || '—')}</b><span class="muted">${n.enabled ? 'ON' : 'OFF'} • sort ${n.sort || 0}</span></div>
          <div class="ai-actions" style="flex-wrap:wrap">
            <button class="adm-btn ghost sm" data-tgl="${n.id}"><i class="fa-solid ${n.enabled ? 'fa-eye-slash' : 'fa-eye'}"></i></button>
            <button class="adm-btn red sm" data-del="${n.id}"><i class="fa-solid fa-trash"></i></button>
          </div>
        </div>
        <p class="muted nt-body">${esc(n.body || '')}</p>
      </div>`).join('')}
    ${notices.length ? '' : '<p class="muted center-note">কোনো notice নেই।</p>'}`;

  document.getElementById('ntAdd').addEventListener('click', async () => {
    const title = document.getElementById('ntTitle').value.trim();
    const body = document.getElementById('ntBody').value.trim();
    if (!title && !body) { toast('Title বা notice লিখুন', 'error'); return; }
    try {
      await addNotice({ title, body });
      toast('Notice add হয়েছে');
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
}
