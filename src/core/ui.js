/* Shared UI: header, drawer, bottom nav, toast, timer, marquee, app bootstrap. */
import { auth, db, firebaseReady, notConfiguredMsg } from './firebase.js';
import { userCopy } from './microjobs.js';
import { onAuthStateChanged } from 'firebase/auth';
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
  return `<div class="video-soon"><i class="fa-solid fa-clapperboard"></i><span>${esc(text || 'ভিডিও শীঘ্রই আসছে')}</span></div>`;
}

/* ---------- project grid (shared between dashboard & landing fallback) ---------- */

/* task id → static page-র slug set (gen-task-pages.mjs এগুলোর জন্যই /task/<slug>.html বানায়) */
const TASK_PAGES = new Set(TASKS.map(t => t.slug));

/* BUGFIX: Firestore থেকে আসা task doc-এ `kind` নেই আর id চলে আসে `id` field-এ
   (`{ id: d.id, ...d.data() }`)। আগে শর্ত ছিল `t.kind === 'task' && t.slug` —
   production-এ সেটা কখনোই সত্যি হতো না, তাই প্রতিটা প্রজেক্ট কার্ডের link '/' হয়ে
   যেত — ড্যাশবোর্ড থেকে কোনো প্রজেক্টেই ঢোকা যেত না (homepage-এ ফিরে আসত)।
   এখন: page → নিজের url; task → /task/<slug>.html (page থাকলে), না থাকলে task-এর
   external url, সেটাও না থাকলে dashboard। */
export function taskHref(t) {
  if (t.kind === 'page') return t.url || '/';
  const slug = String(t.slug || t.id || '').trim();
  if (slug && TASK_PAGES.has(slug)) return `/task/${slug}.html`;
  if (/^https?:\/\//i.test(String(t.url || ''))) return t.url;
  /* এই slug-এর কোনো static SEO page নেই (gen-task-pages শুধু TASKS থেকে বানায়) —
     /task/<slug>.html দিলে 404 হতো, তাই admin-এর বানানো নতুন MicroJob
     MicroJobs page-এর detail hash route-এ খোলে: প্রতিটা job = আলাদা post। */
  if (slug) return `/microjobs.html#job-${slug}`;
  return '/dashboard.html';
}

export function projectGrid(tasks) {
  /* পুরোনো "টাস্ক" গ্রিড = আলাদা সিস্টেম: এখানে MicroJobs doc (kind==='microjob')
     দেখানো হয় না, আর 'মাইজাগো জব'-এর leftover doc-ও না (সেটা এখন MicroJobs) */
  const notMine = t => String(t.kind || '') !== 'microjob' && !['myjob'].includes(String(t.slug || t.id || ''));
  const items = (tasks && tasks.length ? tasks : [...TASKS, ...[]].map(t => ({ ...t, kind: 'task', url: `/task/${t.slug}.html` })))
    .filter(notMine)
    .concat(INTERNAL_PAGES.map(p => ({ ...p, kind: 'page' })));
  // merge + sort
  const merged = [];
  const seen = new Set();
  for (const it of [...items]) {
    const key = it.slug || it.id || it.nameBn;
    if (seen.has(key)) continue;
    seen.add(key);
    merged.push(it);
  }
  merged.sort((a, b) => (a.sort || 99) - (b.sort || 99));
  return merged.map(t => {
    const link = taskHref(t);
    // XSS-hardening: Firestore-এর color/icon value-তে HTML inject করা যাবে না
    const color = /^#[0-9a-fA-F]{3,8}$/.test(t.color || '') ? t.color : '#f59e0b';
    const icon = /^fa-(solid|regular|brands) [a-z0-9-]+$/.test(t.icon || '') ? t.icon : 'fa-solid fa-star';
    return `<a href="${link}" class="proj">
      <div class="ico" style="color:${color}">
        <i class="${icon}"></i>
        ${t.locked ? '<span class="lock"><i class="fa-solid fa-lock"></i></span>' : ''}
      </div>
      <span class="proj-name">${esc(userCopy(t.nameBn))}</span>
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
      <span class="strip-label">স্বাগতম,</span>
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
      <span class="status-pill ${user && user.isActive ? 'active' : 'inactive'}"><span class="dot"></span> ${user && user.isActive ? 'একটিভ' : 'ইনএকটিভ'}</span>
    </div>
    <div class="drawer-stats">
      <div class="ds"><span>ব্যালেন্স</span><b data-balance>${user ? fmtBDT(user.balance) : '৳ 0.00'}</b></div>
      <div class="ds"><span>সদস্য হয়েছেন</span><b>${memberSince(user && user.createdAt)}</b></div>
    </div>
    <div class="drawer-actions">
      <a href="/profile.html" class="btn-mini btn-indigo"><i class="fa-solid fa-user-gear"></i> প্রোফাইল</a>
      <a href="/help.html" class="btn-mini btn-rose"><i class="fa-solid fa-headset"></i> সাপোর্ট</a>
    </div>
  </div>
  <nav class="drawer-nav">
    <div class="dnav-label">প্রধান মেনু</div>
    <a href="/dashboard.html" class="dnav-item ${active === 'home' ? 'on' : ''}"><i class="fa-solid fa-house" style="color:#f59e0b"></i> ড্যাশবোর্ড</a>
    <a href="/profile.html" class="dnav-item ${active === 'profile' ? 'on' : ''}"><i class="fa-solid fa-user-gear" style="color:#8b5cf6"></i> প্রোফাইল সম্পাদনা</a>
    <div class="dnav-label">টাকা-পয়সা</div>
    <a href="/wallet.html" class="dnav-item ${active === 'wallet' ? 'on' : ''}"><i class="fa-solid fa-money-bill-transfer" style="color:#10b981"></i> টাকা তোলুন</a>
    <a href="/history.html" class="dnav-item ${active === 'history' ? 'on' : ''}"><i class="fa-solid fa-clock-rotate-left" style="color:#6366f1"></i> পেমেন্ট হিস্টরি</a>
    <div class="dnav-label">টিম ও সাপোর্ট</div>
    <a href="/team.html" class="dnav-item ${active === 'team' ? 'on' : ''}"><i class="fa-solid fa-users" style="color:#0ea5e9"></i> আমার টিম</a>
    <a href="/help.html" class="dnav-item ${active === 'help' ? 'on' : ''}"><i class="fa-solid fa-headset" style="color:#f97316"></i> হেল্পলাইন</a>
    <div class="dnav-label">একাউন্ট</div>
    <a href="#" id="drawerLogout" class="dnav-item dnav-logout"><i class="fa-solid fa-right-from-bracket"></i> লগ আউট</a>
  </nav>`;
}

export function renderBottomNav(active) {
  return `
  <a href="/help.html" class="bn-item ${active === 'help' ? 'active' : ''}"><i class="fa-solid fa-headset"></i><span>সাপোর্ট</span></a>
  <a href="/wallet.html" class="bn-item ${active === 'wallet' || active === 'history' ? 'active' : ''}"><i class="fa-solid fa-wallet"></i><span>ওয়ালেট</span></a>
  <a href="/dashboard.html" class="bn-home" aria-label="হোম"><i class="fa-solid fa-house"></i><span>হোম</span></a>
  <a href="/team.html" class="bn-item ${active === 'team' ? 'active' : ''}"><i class="fa-solid fa-users"></i><span>টিম</span></a>
  <a href="/profile.html" class="bn-item ${active === 'profile' ? 'active' : ''}"><i class="fa-solid fa-user"></i><span>প্রোফাইল</span></a>`;
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
  container.innerHTML = `<span class="notice-chip">নোটিশ</span><div class="marquee"><span>${esc(text)}</span></div>`;
}

/* ---------- welcome modal ---------- */

/* admin panel থেকে set না থাকলে click-এ "Admin not set it" দেখাবে */
function openAdminLink(link, toastFn) {
  if (link && /^https?:\/\//i.test(String(link))) {
    window.open(String(link), '_blank', 'noopener');
  } else {
    toastFn && toastFn('এখনো এই লিংকটি যোগ করা হয়নি — সাপোর্টে যোগাযোগ করুন', 'error');
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

/* boot fail হলে পুরো app আটকে যায় — সেটা দেখাতে এই card + প্রতিটা আটকে-যাওয়া
   "লোড হচ্ছে…" skeleton replace করা হয় (no dead spinner)। */
function renderBootFailure(reason, build) {
  const next = encodeURIComponent(location.pathname + location.search);
  const stale = build && build.ok === false
    ? `<p style="font-size:12.5px;color:#b45309;margin:8px 0 0;text-align:center">
         <b>সার্ভারের API build পুরোনো মনে হচ্ছে</b>${build.blocked ? ' (এই deployment-এর URL Vercel Deployment Protection-এ ঢাকা)' : ''} —
         <code>api/</code> + <code>lib/</code> ফাইল push করে Vercel <b>Redeploy</b> করুন; ওটা না করা পর্যন্ত
         submit / withdraw / claim কাজ করবে না।
       </p>`
    : '';
  const card = `<div class="card" style="text-align:center;padding:22px">
    <i class="fa-solid fa-plug-circle-xmark" style="font-size:26px;color:#dc2626"></i>
    <h3 style="margin:10px 0 6px">সার্ভারের সাথে যোগাযোগ হয়নি</h3>
    <p class="muted" style="font-size:13px;margin:0">${esc(reason)}</p>
    ${stale}
    <div style="display:flex;gap:8px;justify-content:center;margin-top:14px;flex-wrap:wrap">
      <button class="btn btn-orange" id="bootRetry"><i class="fa-solid fa-rotate"></i> আবার চেষ্টা করুন</button>
      <a class="btn" href="/login.html?next=${next}"><i class="fa-solid fa-right-to-bracket"></i> লগইন</a>
    </div>
  </div>`;
  const host = document.getElementById('appMain') || document.getElementById('taskActions') || document.querySelector('main') || document.body;
  host.insertAdjacentHTML('afterbegin', card);
  document.querySelectorAll('.loading-line').forEach(el => {
    el.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> সার্ভারের সমস্যা — উপরের বার্তা দেখুন';
  });
  // hideUntilAuth class লাগানো header button গুলো আটকে থাকত — এখন দেখা যাবে
  document.querySelectorAll('.hdr-hide').forEach(el => el.classList.remove('hdr-hide'));
  document.getElementById('bootRetry')?.addEventListener('click', () => location.reload());
}

/* নতুন client + পুরোনো functions = আধা deploy; user যেন "fix কাজ করেনি" ভুলটা
   বারবার না করে, সেজন্য boot-এই দেখিয়ে দেওয়া হয় (profile ঠিক থাকলেও)। */
/* এই banner-এর ভেতরের লেখা deploy/admin diagnostic (Vercel, env var, redeploy) —
   normal user-এর সেটা দেখানো যাবে না (§7/§11/§13)। তাই:
     · default → শুধু এক লাইন বোঝার মতো বার্তা (technical নাম নেই)
     · `?debug=1` বা localStorage['de:debug']='1' → পুরো diagnostic (owner/ডেভ debug) */
const buildDebugEnabled = () => {
  try {
    return /[?&]debug=1/.test(location.search) || localStorage.getItem('de:debug') === '1';
  } catch (_) { return false; }
};
function showBuildBanner(build) {
  if (document.getElementById('deployWarn')) return;
  const b = build || {};
  const bar = document.createElement('div');
  bar.id = 'deployWarn';
  const red = b.crash || b.noFirebase;
  bar.style.cssText = red
    ? 'background:#fee2e2;border-bottom:1px solid #dc2626;color:#7f1d1d;padding:9px 14px;font-size:12.5px;text-align:center'
    : 'background:#fef3c7;border-bottom:1px solid #f59e0b;color:#92400e;padding:9px 14px;font-size:12.5px;text-align:center';
  const site = b.site ? ` <span style="opacity:.7">(deployed build: ${esc(b.site.commit || b.site.buildId || '?')}${b.site.api ? ', api ' + esc(b.site.api) : ''})</span>` : '';
  if (!buildDebugEnabled()) {
    /* user-facing: সমস্যাটা বুঝবে, সমাধানের internal নির্দেশনা পড়বে না */
    if (!red) return;                      // পুরোনো build/protection-ish → user-কে ঝামেলায় ফেলা হয় না
    bar.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> <b>সাইটটি এখন সাময়িকভাবে ঠিকমতো চলছে না</b> — একটু পরে আবার চেষ্টা করুন, না চললে সাপোর্টে জানান।';
    document.body.insertBefore(bar, document.body.firstChild);
    return;
  }
  if (b.crash) {
    bar.innerHTML = '<i class="fa-solid fa-fire"></i> <b>সার্ভারের function চালু হচ্ছে না</b> (' +
      esc(b.vercelError || 'FUNCTION_INVOCATION_FAILED') + ') — login/submit এখন কাজ করবে না। ' +
      'Admin: Vercel → Deployments → Functions log দেখুন (Node version/dependency)।' + site;
  } else if (b.noFirebase) {
    bar.innerHTML = '<i class="fa-solid fa-plug-circle-xmark"></i> <b>এই বিল্ডে Firebase config নেই</b> ' +
      '(VITE_FIREBASE_API_KEY / VITE_FIREBASE_PROJECT_ID বিল্ডের সময় পাওয়া যায়নি) — ' +
      'Vercel → Settings → Environment Variables → <b>Production</b>-এ বসিয়ে Redeploy করুন ' +
      '(Sensitive ভিসিবিলিটি build-এ দেয় না)।' + site;
  } else if (b.blocked) {
    bar.innerHTML = '<i class="fa-solid fa-shield-halved"></i> এই deployment-এর URL <b>Vercel Deployment Protection</b>-এ ঢাকা — API call ব্লক হচ্ছে। Production domain (digitearn.vercel.app) ব্যবহার করুন বা Vercel → Settings → Deployment Protection off করুন।' + site;
  } else {
    bar.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> <b>সার্ভারের build পুরোনো</b> (X-DigitEarn-API header নেই/মিলছে না) — <code>api/</code> + <code>lib/</code> push করে <b>Redeploy</b> করুন।' + site;
  }
  document.body.insertBefore(bar, document.body.firstChild);
}

/* Config ছাড়া build হলে সবচেয়ে বড় ঝামেলা: user মনে করে "লগইন ভাঙা"।
   login/register পেজেও (bootAppPage চলে না) এক লাইনে কারণ দেখায় — side effect ছাড়া চলে না
   বলে এখানেই, আর কিছু না পেলে চুপ থাকে। */
export function showBuildBannerIfBroken(build) {
  try {
    if (typeof document === 'undefined' || !document.body) return;
    if (build && (build.ok === false || build.noFirebase)) showBuildBanner(build);
    else if (build && build.noFirebase) showBuildBanner(build);
  } catch (_) { /* diagnostic কখনো app ভাঙাবে না */ }
}

export async function bootAppPage({ active = 'home', onReady }) {
  const next = encodeURIComponent(location.pathname + location.search);
  if (!firebaseReady) {
    document.body.innerHTML = `<div class="boot-error"><div><i class="fa-solid fa-triangle-exclamation"></i><h1>সেটআপ চলছে</h1><p>${esc(notConfiguredMsg())}</p></div></div>`;
    return;
  }
  // BUGFIX: আগের 4s timeout ধীর নেটওয়ার্কে (Firebase session restore) log-in
  // user-কেও "not logged in" ভেবে /login.html-এ পাঠিয়ে দিত — user বারবার লগইন
  // করত আর submit-এ "Login required" খেত। এখন: (a) cached currentUser থাকলে
  // সাথে সাথে চলে, (b) প্রথম auth callback-এই resolve হয় (signed-out হলে দ্রুত
  // redirect), (c) callback-ই না এলে 10s পরে শেষবার currentUser আবার দেখে নেয়।
  const user = await new Promise(resolve => {
    if (auth && auth.currentUser) { resolve(auth.currentUser); return; }
    let done = false;
    let unsub = null;
    const finish = u => { if (done) return; done = true; if (unsub) unsub(); resolve(u || null); };
    unsub = onAuthStateChanged(auth, u => finish(u));
    setTimeout(() => finish((auth && auth.currentUser) || null), 10000);
  });
  if (!user) {
    location.replace('/login.html?next=' + next);
    return;
  }
  /* Proactive token refresh — দীর্ঘক্ষণ খোলা ট্যাব/অ্যাপে পুরোনো (expired) ID token
     পাঠালে server 401 দিত → "Login required"। boot-এই একবার fresh token নেওয়া হয়;
     callApi আবার 401 এলে force-refresh করে retry-ও করে (src/core/api.js)।
     ব্যর্থ হলে চুপ — callApi-র retry সামলে নেবে। */
  try { user.getIdToken(true).catch(() => {}); } catch (_) {}
  const { checkApiBuild, ensureUserProfileResult } = await import('./api.js');
  const [settings, userDoc, build] = await Promise.all([
    getSettings(),
    getUserDoc(user.uid).catch(() => null),
    checkApiBuild(),          // server-এ নতুন api/ code চলছে কি না (কখনো throw করে না)
  ]);
  let profile = userDoc;
  let ensureError = '';
  if (!profile) {
    // stale/old session-এ profile missing হলে auto-create (self-heal)
    try {
      const r = await ensureUserProfileResult(user.uid, { email: user.email, name: user.displayName });
      profile = r.profile;
      ensureError = r.error || '';
    } catch (err) {
      ensureError = String((err && err.message) || err);
    }
  }
  if (!profile) {
    /* ⚠️ আগে এখানে শুধু toast দিয়ে `return` করত → পেজের "লোড হচ্ছে…" spinner চিরকাল
       ঘুরতে থাকত (mobile screenshot-এ ঠিক সেটাই দেখাচ্ছিল), আর কারণটাও জানা যেত না।
       এখন: কারণ + retry + (পুরোনো deploy হলে) পরিষ্কার সতর্কবার্তা, একই সাথে সব
       আটকে-যাওয়া skeleton replace। */
    renderBootFailure(ensureError || 'প্রোফাইল ডকুমেন্ট পাওয়া যায়নি (users/' + user.uid + ')', build);
    return;
  }
  if (build && build.ok === false) showBuildBanner(build);

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

  onReady && onReady({ uid: user.uid, user: profile, settings });
}

export { SITE };
