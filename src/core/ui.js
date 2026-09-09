/* Shared UI: header, drawer, bottom nav, toast, timer, marquee, app bootstrap. */
import { auth, db, firebaseReady, notConfiguredMsg } from './firebase.js';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { getSettings, getUserDoc } from './store.js';
import { TASKS, INTERNAL_PAGES, SITE } from '../tasks-data.js';

export function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
export function fmtBDT(n) {
  return '৳ ' + (Number(n) || 0).toFixed(2);
}
export function fmtDate(s) {
  if (!s) return '—';
  const d = new Date(s.toDate ? s.toDate() : s);
  if (isNaN(d)) return String(s).slice(0, 16);
  return d.toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}
export function memberSince(s) {
  if (!s) return '—';
  const d = new Date(s.toDate ? s.toDate() : s);
  if (isNaN(d)) return String(s).slice(0, 10);
  return d.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
}

/* ---------- video embed (settings.videoUrl থেকে) ---------- */
/* YouTube (watch / youtu.be / embed / shorts) → embed iframe; সরাসরি mp4 → <video>;
   খালি/পরিচিত নয় → '' (কলার সাইড "coming soon" দেখাবে) */
export function videoEmbedHtml(url) {
  const u = String(url || '').trim();
  if (!u) return '';
  const m = u.match(/(?:youtube\.com\/(?:watch\?(?:[^#]*&)?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{6,11})/);
  if (m) {
    return `<iframe src="https://www.youtube.com/embed/${m[1]}" title="DigitEarn tutorial video" style="width:100%;height:100%;border:0;display:block" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  }
  if (/^https?:\/\/\S+\.(mp4|webm|ogv|ogg)(\?\S*)?$/i.test(u)) {
    return `<video src="${esc(u)}" controls style="width:100%;height:100%;display:block;background:#000"></video>`;
  }
  return '';
}

export function videoSoonHtml(text) {
  return `<div class="video-soon"><i class="fa-solid fa-clapperboard"></i><span>${esc(text || 'Video Coming Soon')}</span></div>`;
}

/* ---------- project grid (shared between dashboard & landing fallback) ---------- */

export function projectGrid(tasks) {
  const items = (tasks && tasks.length ? tasks : [...TASKS, ...[]].map(t => ({ ...t, kind: 'task', url: `/task/${t.slug}.html` })))
    .concat(INTERNAL_PAGES.map(p => ({ ...p, kind: 'page' })));
  // merge + sort
  const merged = [];
  const seen = new Set();
  for (const it of [...items]) {
    const key = it.slug || it.nameBn;
    if (seen.has(key)) continue;
    seen.add(key);
    merged.push(it);
  }
  merged.sort((a, b) => (a.sort || 99) - (b.sort || 99));
  return merged.map(t => {
    const href = t.kind === 'page' ? t.url : (t.url && t.url.startsWith('http') ? `/task/${t.slug || 'x'}.html` : '/');
    const isTask = t.kind === 'task' && t.slug;
    const link = isTask ? `/task/${t.slug}.html` : (t.kind === 'page' ? t.url : '/');
    // XSS-hardening: Firestore-এর color/icon value-তে HTML inject করা যাবে না
    const color = /^#[0-9a-fA-F]{3,8}$/.test(t.color || '') ? t.color : '#f59e0b';
    const icon = /^fa-(solid|regular|brands) [a-z0-9-]+$/.test(t.icon || '') ? t.icon : 'fa-solid fa-star';
    return `<a href="${link}" class="proj">
      <div class="ico" style="color:${color}">
        <i class="${icon}"></i>
        ${t.locked ? '<span class="lock"><i class="fa-solid fa-lock"></i></span>' : ''}
      </div>
      <span class="proj-name">${esc(t.nameBn)}</span>
    </a>`;
  }).join('');
}

/* ---------- header / drawer / bottom nav ---------- */

export function renderHeader(user, settings) {
  return `
  <div class="header-row">
    <button class="icon-btn" id="drawerBtn" aria-label="মেনু"><i class="fa-solid fa-bars"></i></button>
    <a class="site-title" href="/dashboard.html">${esc(settings.siteName)}</a>
    <a class="icon-btn" href="/help.html" aria-label="সাপোর্ট"><i class="fa-solid fa-bell"></i></a>
  </div>
  <div class="welcome-strip">
    <div class="strip-avatar"><i class="fa-solid fa-user"></i></div>
    <div class="strip-name">
      <span class="strip-label">WELCOME BACK,</span>
      <span class="strip-user">${esc(user ? user.name : '')}</span>
    </div>
    <div class="balance-chip"><i class="fa-solid fa-wallet"></i> <span data-balance>${user ? fmtBDT(user.balance) : '৳ 0.00'}</span></div>
  </div>`;
}

export function renderDrawer(user, settings, active) {
  return `
  <div class="drawer-head">
    <div class="drawer-brand"><i class="fa-solid fa-bolt"></i> ${esc(settings.siteName)}</div>
    <button class="icon-btn drawer-close" id="drawerClose" aria-label="বন্ধ করুন"><i class="fa-solid fa-xmark"></i></button>
  </div>
  <div class="drawer-profile">
    <div class="avatar-ring"><i class="fa-solid fa-user-tie"></i></div>
    <div class="drawer-name">${esc(user ? user.name : '')}</div>
    <div class="drawer-idline">
      <span class="id-pill">ID: ${esc(user ? user.refCode : '')}</span>
      <span class="status-pill ${user && user.isActive ? 'active' : 'inactive'}"><span class="dot"></span> ${user && user.isActive ? 'Active' : 'Inactive'}</span>
    </div>
    <div class="drawer-stats">
      <div class="ds"><span>BALANCE</span><b data-balance>${user ? fmtBDT(user.balance) : '৳ 0.00'}</b></div>
      <div class="ds"><span>MEMBER SINCE</span><b>${memberSince(user && user.createdAt)}</b></div>
    </div>
    <div class="drawer-actions">
      <a href="/profile.html" class="btn-mini btn-indigo"><i class="fa-solid fa-user-gear"></i> Profile</a>
      <a href="/help.html" class="btn-mini btn-rose"><i class="fa-solid fa-headset"></i> Support</a>
    </div>
  </div>
  <nav class="drawer-nav">
    <div class="dnav-label">HOME SELECTION</div>
    <a href="/dashboard.html" class="dnav-item ${active === 'home' ? 'on' : ''}"><i class="fa-solid fa-house" style="color:#f59e0b"></i> Dashboard</a>
    <a href="/profile.html" class="dnav-item ${active === 'profile' ? 'on' : ''}"><i class="fa-solid fa-user-gear" style="color:#8b5cf6"></i> Profile Update</a>
    <div class="dnav-label">FINANCE</div>
    <a href="/wallet.html" class="dnav-item ${active === 'wallet' ? 'on' : ''}"><i class="fa-solid fa-money-bill-transfer" style="color:#10b981"></i> Withdraw Funds</a>
    <a href="/history.html" class="dnav-item ${active === 'history' ? 'on' : ''}"><i class="fa-solid fa-clock-rotate-left" style="color:#6366f1"></i> Payment History</a>
    <div class="dnav-label">TEAM &amp; SUPPORT</div>
    <a href="/team.html" class="dnav-item ${active === 'team' ? 'on' : ''}"><i class="fa-solid fa-users" style="color:#0ea5e9"></i> My Team</a>
    <a href="/help.html" class="dnav-item ${active === 'help' ? 'on' : ''}"><i class="fa-solid fa-headset" style="color:#f97316"></i> Helpline</a>
    <div class="dnav-label">ACCOUNT</div>
    <a href="#" id="drawerLogout" class="dnav-item dnav-logout"><i class="fa-solid fa-right-from-bracket"></i> Log Out</a>
  </nav>`;
}

export function renderBottomNav(active) {
  return `
  <a href="/help.html" class="bn-item ${active === 'help' ? 'active' : ''}"><i class="fa-solid fa-headset"></i><span>Help</span></a>
  <a href="/wallet.html" class="bn-item ${active === 'wallet' || active === 'history' ? 'active' : ''}"><i class="fa-solid fa-wallet"></i><span>Wallet</span></a>
  <a href="/dashboard.html" class="bn-home" aria-label="হোম"><i class="fa-solid fa-house"></i><span>HOME</span></a>
  <a href="/team.html" class="bn-item ${active === 'team' ? 'active' : ''}"><i class="fa-solid fa-users"></i><span>Team</span></a>
  <a href="/profile.html" class="bn-item ${active === 'profile' ? 'active' : ''}"><i class="fa-solid fa-user"></i><span>Profile</span></a>`;
}

/* ---------- toast / timer / marquee ---------- */

export function toast(msg, type = 'success') {
  let el = document.getElementById('flashToast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'flashToast';
    el.className = 'toast';
    document.body.appendChild(el);
  }
  el.className = `toast toast-${type} show`;
  el.innerHTML = `<i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-circle-xmark'}"></i> <span>${esc(msg)}</span>`;
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), 3600);
}

export function setMarquee(container, text) {
  if (!container || !text) { if (container) container.parentElement?.remove(); return; }
  container.innerHTML = `<span class="notice-chip">Notice</span><div class="marquee"><span>${esc(text)}</span></div>`;
}

/* ---------- welcome modal ---------- */

/* admin panel থেকে set না থাকলে click-এ "Admin not set it" দেখাবে */
function openAdminLink(link, toastFn) {
  if (link && /^https?:\/\//i.test(String(link))) {
    window.open(String(link), '_blank', 'noopener');
  } else {
    toastFn && toastFn('Admin not set it — এখনো admin panel থেকে set করা হয়নি', 'error');
  }
}

export function showWelcomeModal(settings, onClose) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
  <div class="modal-card">
    <button class="modal-close" id="welcomeCloseX" aria-label="বন্ধ করুন"><i class="fa-solid fa-xmark"></i></button>
    <div class="welcome-icon"><img src="/handshake.png" alt="" width="92" height="92" onerror="this.replaceWith(Object.assign(document.createElement('i'),{className:'fa-solid fa-gift',style:'font-size:56px;color:var(--gold)'}))"></div>
    <h2 class="welcome-title">Welcome!</h2>
    <p class="welcome-text">প্রতিদিন গিফট কোড দেওয়া হয় আমাদের টেলিগ্রাম চ্যানেলে। গিফট কোড বোনাস নিতে জয়েন করুন</p>
    <button type="button" class="tg-join" id="tgJoinBtn"><i class="fa-brands fa-telegram"></i> Join Telegram</button>
    <hr class="welcome-hr">
    <p class="welcome-warn">যাদের ট্রানজেকশন সমস্যা তারা নিচের আইডিতে যোগাযোগ করবেন</p>
    <div class="admin-btns">
      <button type="button" class="admin-contact" data-adm="1"><i class="fa-solid fa-user-tie"></i> ${esc(settings.admin1Name || 'এডমিন ১')}</button>
      <button type="button" class="admin-contact" data-adm="2"><i class="fa-solid fa-user-tie"></i> ${esc(settings.admin2Name || 'এডমিন ২')}</button>
    </div>
  </div>`;
  document.body.appendChild(overlay);
  const close = () => { overlay.remove(); onClose && onClose(); };
  overlay.querySelector('#welcomeCloseX').addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  overlay.querySelector('#tgJoinBtn').addEventListener('click', () => openAdminLink(settings.telegramLink, toast));
  overlay.querySelectorAll('[data-adm]').forEach(btn => {
    btn.addEventListener('click', () => {
      const i = btn.dataset.adm;
      openAdminLink(i === '1' ? settings.admin1Link : settings.admin2Link, toast);
    });
  });
}

/* ---------- app page bootstrap ---------- */

export async function bootAppPage({ active = 'home', onReady }) {
  const next = encodeURIComponent(location.pathname + location.search);
  if (!firebaseReady) {
    document.body.innerHTML = `<div class="boot-error"><div><i class="fa-solid fa-triangle-exclamation"></i><h1>সেটআপ চলছে</h1><p>${esc(notConfiguredMsg())}</p></div></div>`;
    return;
  }
  const user = await new Promise(resolve => {
    const unsub = onAuthStateChanged(auth, resolve);
    setTimeout(() => { unsub(); resolve(null); }, 4000);
  });
  if (!user) {
    location.replace('/login.html?next=' + next);
    return;
  }
  const [settings, userDoc] = await Promise.all([getSettings(), getUserDoc(user.uid).catch(() => null)]);
  let profile = userDoc;
  if (!profile) {
    // stale/old session-এ profile missing হলে auto-create (self-heal)
    try {
      const { ensureUserProfile } = await import('./api.js');
      profile = await ensureUserProfile(user.uid, { email: user.email, name: user.displayName });
    } catch (_) {}
  }
  if (!profile) {
    toast('প্রোফাইল লোড হয়নি — একবার refresh করুন, আবার না হলে admin-এ জানান', 'error');
    return;
  }

  const header = document.getElementById('appHeader');
  const drawer = document.getElementById('appDrawer');
  const overlayEl = document.getElementById('drawerOverlay');
  const nav = document.getElementById('appNav');
  if (header) header.innerHTML = renderHeader(profile, settings);
  if (drawer) drawer.innerHTML = renderDrawer(profile, settings, active);
  if (nav) nav.innerHTML = renderBottomNav(active);

  const open = () => document.body.classList.add('drawer-open');
  const close = () => document.body.classList.remove('drawer-open');
  document.getElementById('drawerBtn')?.addEventListener('click', open);
  document.getElementById('drawerClose')?.addEventListener('click', close);
  overlayEl?.addEventListener('click', close);
  document.getElementById('drawerLogout')?.addEventListener('click', async e => {
    e.preventDefault();
    const { logout } = await import('./api.js');
    await logout();
    location.replace('/login.html');
  });

  // Keep activation status fresh. Admin activation is reflected without a reload,
  // and pages can re-render their submit controls immediately.
  const stopProfileWatch = onSnapshot(doc(db, 'users', user.uid), snap => {
    if (snap.exists()) onReady && onReady({ uid: user.uid, user: { ...profile, ...snap.data() }, settings, profileUpdate: true });
  });
  onReady && onReady({ uid: user.uid, user: profile, settings, profileUpdate: false, stopProfileWatch });
}

export { SITE };
