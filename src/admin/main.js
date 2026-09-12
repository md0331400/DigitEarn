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
  listTasks, saveTask, seedTasks,
  getSettings, saveSettings, clearGiftCode,
  listNotices, addNotice, updateNotice, deleteNotice,
  listUserTargetNotices, addTargetedNotice, updateTargetedNotice, deleteTargetedNotice, listTargetedAll,
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
  { id: 'proofs', label: 'Submissions', icon: 'fa-clipboard-list' },
  { id: 'deposits', label: 'Deposits', icon: 'fa-money-bill-wave' },
  { id: 'withdrawals', label: 'Withdrawals', icon: 'fa-money-bill-transfer' },
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
    else if (view === 'withdrawals') await viewWithdrawals(main);
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
      <div class="adm-stat red"><i class="fa-solid fa-clipboard-list"></i><b>${s.pendingProofs}</b><span>Task Submissions</span></div>
      <div class="adm-stat red"><i class="fa-solid fa-money-bill-wave"></i><b>${s.pendingDeposits}</b><span>Deposit Review</span></div>
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
  if (!list.length) { box.innerHTML = '<p class="muted center-note">কোনো submission নেই।</p>'; return; }
  const items = await Promise.all(list.map(async p => ({ p, user: await getUser(p.userId).catch(() => null) })));
  box.innerHTML = items.map(({ p, user }) => `
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

/* ---------- withdrawals (admin review queue) ---------- */
let wdFilter = 'pending';
async function viewWithdrawals(main) {
  main.innerHTML = `
    <div class="chip-row" id="wdChips">
      ${['pending', 'paid', 'rejected', 'all'].map(f => `<button class="chip ${f === wdFilter ? 'on' : ''}" data-wf="${f}">${{ pending: 'Pending', paid: 'Paid', rejected: 'Rejected', all: 'সব' }[f]}</button>`).join('')}\n    </div>
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
  const items = await Promise.all(list.map(async w => ({ w, user: await getUser(w.userId).catch(() => null) })));
  box.innerHTML = items.map(({ w, user }) => `
    <div class="adm-item">
      <div class="ai-head">
        <div class="ai-user"><b>${esc(user?.name || w.name || w.userId)}</b><span class="muted">${esc(user?.mobile || '')}</span></div>
        <span class="badge ${w.status === 'paid' ? 'green' : w.status}">${{ pending: 'PENDING', paid: 'PAID', rejected: 'REJECTED' }[w.status] || w.status}</span>
      </div>
      <div class="ai-meta"><i class="fa-solid fa-money-bill-transfer"></i> ${esc(w.method)} • <b class="gold-txt">${fmt(w.amount)}</b> • ${esc(w.accountNumber)}</div>
      <div class="ai-meta muted-sm">${timeBn(w.createdAt)}${w.processedAt ? ' • processed ' + timeBn(w.processedAt) : ''}</div>
      ${w.status === 'rejected' && w.note ? `<p class="ai-note"><i class="fa-solid fa-note"></i> ${esc(w.note)}</p>` : ''}
      ${w.status === 'pending' ? `
      <div class="ai-actions">
        <button class="adm-btn green sm" data-wpaid="${w.id}"><i class="fa-solid fa-check"></i> Paid (টাকা পাঠানো হয়েছে)</button>
        <button class="adm-btn red sm" data-wrej="${w.id}"><i class="fa-solid fa-xmark"></i> Reject (টাকা ফেরত)</button>
      </div>` : ''}
    </div>`).join('');

  const doReview = async (btn, action) => {
    if (action === 'paid' && !confirm('এটা Paid মার্ক করবেন? (টাকা send করে ফেলেছেন মানে)')) return;
    if (action === 'rejected' && !confirm('Reject করলে amount user-এর balance-এ ফেরত যাবে। নিশ্চিত?')) return;
    btn.disabled = true;
    try {
      const w = list.find(x => x.id === btn.dataset[action === 'paid' ? 'wpaid' : 'wrej']);
      await reviewWithdrawal(w.userId, w.id, action);
      toast(action === 'paid' ? 'Withdrawal paid মার্ক হয়েছে' : 'Withdrawal reject — টাকা ফেরত হয়েছে');
      viewWithdrawals(main);
    } catch (err) { toast(err.message, 'error'); btn.disabled = false; }
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
        <div class="ur-right"><b class="gold-txt">${fmt(u.balance)}</b>${u.isActive ? '<span class="badge green">ACTIVE</span>' : '<span class="badge gray">INACTIVE</span>'}</div>
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
          <div><span class="muted">Balance</span><b>${fmt(u.balance)}</b></div>
          <div><span class="muted">Total Earned</span><b>${fmt(u.totalEarned)}</b></div>
          <div><span class="muted">Status</span>${u.isActive ? '<b style="color:#16a34a">ACTIVE</b>' : '<b style="color:#dc2626">INACTIVE</b>'}</div>
          <div><span class="muted">Joined</span><b>${timeBn(u.createdAt)}</b></div>
        </div>
        <div class="ai-actions">
          ${u.isActive ? `<button class="adm-btn red sm" data-deact="${u.uid}"><i class="fa-solid fa-ban"></i> Inactive করুন</button>` : `<button class="adm-btn green sm" data-act="${u.uid}"><i class="fa-solid fa-check"></i> Active করুন (manual)</button>`}
        </div>
        <h4 style="margin-top:14px"><i class="fa-solid fa-money-bill-transfer" style="color:#d97706"></i> Withdrawals</h4>
        ${wds.length ? wds.map(w => `<div class="mini-row">
          <b>${esc(w.method)} • ${fmt(w.amount)}</b>
          <span class="muted">${esc(w.accountNumber)} • ${timeBn(w.createdAt)}</span>
          <span class="badge ${w.status === 'paid' ? 'green' : w.status}">${w.status.toUpperCase()}</span>
          ${w.status === 'pending' ? `<button class="adm-btn green sm" style="margin-left:6px" data-wd-paid="${w.id}">Paid</button><button class="adm-btn red sm" style="margin-left:4px" data-wd-rej="${w.id}">Reject</button>` : ''}
        </div>`).join('') : '<p class="muted">কোনো withdrawal নেই।</p>'}
        <h4 style="margin-top:14px"><i class="fa-solid fa-triangle-exclamation" style="color:#dc2626"></i> এই user-এর private Notice/Warning</h4>
        ${tns.length ? tns.map(n => `<div class="mini-row">
          <b>${n.type === 'warning' ? '⚠️ ' : ''}${esc(n.title || '')} ${n.enabled ? '' : '<span class="badge gray">OFF</span>'}</b>
          <span class="muted">${esc(n.body || '')}</span>
          <span><button class="adm-btn ghost sm" style="margin-left:6px" data-tn-tgl="${n.id}">${n.enabled ? 'Hide' : 'Show'}</button><button class="adm-btn red sm" style="margin-left:4px" data-tn-del="${n.id}">Del</button></span>
        </div>`).join('') : '<p class="muted">কোনো private notice/warning নেই। (Notices tab থেকে পাঠান)</p>'}
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
    dbox.querySelectorAll('[data-wd-paid]').forEach(b => b.addEventListener('click', async () => {
      if (!confirm('Paid মার্ক করবেন?')) return;
      b.disabled = true;
      try { await reviewWithdrawal(selectedUid, b.dataset.wdPaid, 'paid'); toast('Paid মার্ক হয়েছে'); doDetail(); } catch (err) { toast(err.message, 'error'); b.disabled = false; }
    }));
    dbox.querySelectorAll('[data-wd-rej]').forEach(b => b.addEventListener('click', async () => {
      if (!confirm('Reject করলে টাকা user-এর balance-এ ফেরত যাবে। নিশ্চিত?')) return;
      b.disabled = true;
      try { await reviewWithdrawal(selectedUid, b.dataset.wdRej, 'rejected'); toast('Reject — টাকা ফেরত'); doDetail(); } catch (err) { toast(err.message, 'error'); b.disabled = false; }
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
const TF_TYPES = ['text', 'email', 'password', 'tel', 'number', 'url', 'textarea'];
function fieldRowHtml(f = {}) {
  return `<div class="if-row" data-if-row>
    <input class="adm-input if-label" placeholder="Field Title (যেমন: UID, Password, Cookies)" value="${esc(f.label || '')}" maxlength="50">
    <select class="adm-input if-type">${TF_TYPES.map(t => `<option value="${t}" ${f.type === t ? 'selected' : ''}>${t}</option>`).join('')}</select>
    <input class="adm-input if-ph" placeholder="Placeholder (খালি রাখলে default)" value="${esc(f.placeholder || '')}" maxlength="60">
    <label class="chk if-req"><input type="checkbox" data-ifreq ${f.required ? 'checked' : ''}> Required</label>
    <button type="button" class="adm-btn red sm if-del" data-ifdel><i class="fa-solid fa-trash"></i></button>
  </div>`;
}
function inputFieldsEditorHtml(t) {
  const fields = Array.isArray(t.inputFields) ? t.inputFields : [];
  return `
    <div class="if-editor">
      <div class="if-head">
        <label>Input Fields — user task page-এ এই field গুলো পূরণ করে submit করবে</label>
        <button type="button" class="adm-btn ghost sm" data-ifadd><i class="fa-solid fa-plus"></i> Add Input Field</button>
      </div>
      <div class="if-rows" data-ifrows>${fields.map(fieldRowHtml).join('') || '<p class="muted if-empty">কোনো field নেই — task শুধু "link + submit" flow-এ থাকবে।</p>'}</div>
    </div>`;
}
async function viewTasks(main) {
  const tasks = await listTasks();
  /* ⚠️ Firestore-এ task config doc না থাকলে user submit → "Project পাওয়া যায়নি" (404)।
     listTasks() খালি হলে এই panel-এ কার্ডই না, মানে নতুন doc বানানোর উপায়ও না —
     তাই একটা recovery bar (?op=seed-tasks, idempotent)। */
  const seedBar = `
    <div class="adm-card" style="display:flex;gap:10px;align-items:center;justify-content:space-between;flex-wrap:wrap">
      <div style="flex:1 1 260px"><b>Built-in list থেকে task doc তৈরি করুন</b><br>
        <span class="muted">${tasks.length ? 'যেগুলোর doc নেই শুধু সেটুকুই বানাবে — আগে থেকে যা আছে (rate, fields, lock) অক্ষত থাকবে।' : 'Firestore-এ কোনো task config নেই — একারণেই user submit করলে “Project পাওয়া যায়নি” আসছে। নিচের বাটন চাপলেই ঠিক হয়ে যাবে।'}</span></div>
      <button class="adm-btn sm" id="seedTasksBtn"><i class="fa-solid fa-database"></i> ${tasks.length ? 'বাকিগুলো তৈরি করুন' : 'এখনই তৈরি করুন'}</button>
    </div>`;
  main.innerHTML = `
    <div class="adm-card task-head"><h4><i class="fa-solid fa-briefcase" style="color:#d97706"></i> Micro Jobs</h4>
    <p class="muted">Reward, link, password, description, input fields, lock/status, video — সব এখান থেকেই। Save করলেই user website-তে automatically update হয়ে যাবে। নতুন task-এর জন্য নতুন page লাগবে — developer-কে জানান।</p></div>
    ${seedBar}
    <div id="taskList">${tasks.map(t => `
      <div class="adm-card task-card" data-slug="${esc(t.slug)}">
        <div class="task-row">
          <div class="task-info">
            <b>${esc(t.nameBn || t.slug)} ${t.enabled === false ? '<span class="badge gray">OFF</span>' : ''} ${t.locked ? '<span class="badge gold">LOCKED</span>' : ''}</b>
            <span class="muted">/task/${esc(t.slug)}.html • ${fmt(t.reward)}${Array.isArray(t.inputFields) && t.inputFields.length ? ` • ${t.inputFields.length} field(s)` : ''}</span>
          </div>
          <button class="adm-btn ghost sm" data-edit="${esc(t.slug)}"><i class="fa-solid fa-pen"></i></button>
        </div>
        <div class="task-form" data-form="${esc(t.slug)}" hidden>
          <label>নাম (বাংলা)</label><input class="adm-input" data-f="nameBn" value="${esc(t.nameBn || '')}">
          <label>Task URL (user-এর জন্য Open Link) — শুধু http/https</label><input class="adm-input" data-f="url" value="${esc(t.url || '')}" placeholder="https://...">
          <div class="two-col">
            <div><label>Amount / Reward (৳)</label><input type="number" step="0.5" class="adm-input" data-f="reward" value="${Number(t.reward) || 0}"></div>
            <div><label>Sort order</label><input type="number" class="adm-input" data-f="sort" value="${Number(t.sort) || 10}"></div>
          </div>
          <label>Account Password (seller যে পাসওয়ার্ড সেট করবে — খালি রাখলে hide)</label><input class="adm-input" data-f="password" value="${esc(t.password || '')}" maxlength="60">
          <label>Description / Instructions (project page-এ description)</label><textarea class="adm-input" data-f="description" rows="3" maxlength="300">${esc(t.description || '')}</textarea>
          <div class="two-col">
            <div><label>Submit বাটনের লেখা</label><input class="adm-input" data-f="submitLabel" value="${esc(t.submitLabel || '')}" placeholder="SUBMIT GMAIL" maxlength="40"></div>
            <div><label>History বাটনের লেখা</label><input class="adm-input" data-f="historyLabel" value="${esc(t.historyLabel || '')}" placeholder="View Gmail History" maxlength="40"></div>
          </div>
          <label>দৈনিক সর্বোচ্চ কয়টি account জমা দেওয়া যাবে (per seller)</label><input type="number" min="1" max="200" class="adm-input" data-f="dailyLimit" value="${Number(t.dailyLimit) || 20}">
          ${inputFieldsEditorHtml(t)}
          <label>Video URL (YouTube link বা mp4) — task page-এ guide video</label><input class="adm-input" data-f="videoUrl" value="${esc(t.videoUrl || '')}">
          <div class="two-col">
            <label class="chk"><input type="checkbox" data-f="enabled" ${t.enabled !== false ? 'checked' : ''}> Task ON / Active</label>
            <label class="chk"><input type="checkbox" data-f="locked" ${t.locked ? 'checked' : ''}> Locked</label>
          </div>
          <div class="ai-actions">
            <button class="adm-btn gold sm" data-save="${esc(t.slug)}"><i class="fa-solid fa-floppy-disk"></i> Save</button>
          </div>
        </div>
      </div>`).join('')}</div>`;

  // input fields editor events (add / remove row)
  main.querySelectorAll('[data-ifadd]').forEach(btn => btn.addEventListener('click', () => {
    const rows = btn.closest('.if-editor').querySelector('[data-ifrows]');
    rows.querySelector('.if-empty')?.remove();
    const wrap = document.createElement('div');
    wrap.innerHTML = fieldRowHtml();
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
  main.querySelector('#seedTasksBtn')?.addEventListener('click', async e => {
    const btn = e.currentTarget;
    btn.disabled = true;
    try {
      const out = await seedTasks();
      toast(`তৈরি হয়েছে ${out.createdCount || 0}টা, আগে থেকেই ছিল ${out.skippedCount || 0}টা${out.invalid && out.invalid.length ? ' · কিছু হয়নি: ' + out.invalid.join(', ') : ''}`);
      viewTasks(main);
    } catch (err) { toast(err.message, 'error'); btn.disabled = false; }
  });

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
        enabled: f('enabled').checked,
        locked: f('locked').checked,
      });
      toast('Task save হয়েছে — user website-তে update হয়ে গেছে');
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
        ${g.group === 'Gift' && !secretOff ? `<p class="muted" style="margin-top:8px">কোড: <b>${esc(s.giftCode || '(খালি)')}</b> <button type="button" class="adm-btn ghost sm" id="clearGiftBtn" style="margin-left:8px">Clear</button></p>` : ''}
      </div>`).join('')}
      <button type="submit" class="adm-btn gold"><i class="fa-solid fa-floppy-disk"></i> Save Settings</button>
    </form>`;
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
        <div><label>Type</label>
          <select class="adm-input" id="ntType"><option value="notice">Notice</option><option value="warning">Warning</option></select>
        </div>
        <div><label>Target</label>
          <select class="adm-input" id="ntTarget"><option value="all">সব user (All)</option><option value="user">Specific user</option></select>
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
            <button class="adm-btn ghost sm" data-tn-tgl="${n.uid}::${n.id}">${n.enabled ? 'Hide' : 'Show'}</button>
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
