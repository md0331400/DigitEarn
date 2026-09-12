/* Generates static SEO task pages: task/<slug>.html
   Run automatically before `vite build` and `vite dev`. */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { TASKS, SITE } from '../src/tasks-data.js';

const scriptsDir = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(scriptsDir, '..', 'task'); // project root /task
mkdirSync(outDir, { recursive: true });

function esc(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
function bn(n) {
  const map = { 0: '০', 1: '১', 2: '২', 3: '৩', 4: '৪', 5: '৫', 6: '৬', 7: '৭', 8: '৮', 9: '৯' };
  return String(n).split('').map(c => map[c] ?? c).join('');
}

function head({ title, description, urlPath, jsonLd }) {
  const canonical = `${SITE.url}${urlPath}`;
  return `<!doctype html>
<html lang="bn">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="keywords" content="ডিজিটাল টাস্ক, টাকা আর্ন, online earn bangladesh, ${esc(title.replace(' | DigitEarn', ''))}">
<meta name="robots" content="index, follow">
<link rel="canonical" href="${canonical}">
<link rel="icon" type="image/png" href="/favicon.png">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${SITE.name}">
<meta property="og:locale" content="bn_BD">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${SITE.url}/logo.png">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<script type="application/ld+json">${jsonLd}</script>
</head>`;
}

for (const t of TASKS) {
  const urlPath = `/task/${t.slug}.html`;
  const canonical = `${SITE.url}${urlPath}`;
  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${t.nameEn} Task — DigitEarn`,
    description: t.seo.description,
    url: canonical,
    provider: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    areaServed: 'BD',
    offers: { '@type': 'Offer', priceCurrency: 'BDT', price: String(t.reward), description: 'প্রতি account ৳' + bn(t.reward) + ' — account জমা দিন, approve হলেই টাকা' },
  }).replace(/</g, '\\u003c');

  const stepsHtml = t.steps.map((s, i) => `            <li><span class="step-num">${i + 1}</span>${esc(s)}</li>`).join('\n');
  const crumbJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'হোম', item: SITE.url + '/' },
      { '@type': 'ListItem', position: 2, name: t.nameBn, item: canonical },
    ],
  }).replace(/</g, '\\u003c');

  const html = `${head({ title: t.seo.title, description: t.seo.description, urlPath, jsonLd })}
<body data-task-slug="${t.slug}">
<div class="phone task-page">
  <header class="site-header">
    <a class="brand" href="/"><img src="/logo.png" alt="${SITE.name} লোগো" width="34" height="34"><span>${SITE.name}</span></a>
    <nav class="header-actions" aria-label="হেডার মেনু">
      <a href="/dashboard.html" class="btn btn-ghost btn-sm" id="hdrDash">Dashboard</a>
      <a href="/register.html" class="btn btn-gold btn-sm" id="hdrReg">Register</a>
    </nav>
  </header>

  <main class="main task-main">
    <nav class="crumbs" aria-label="breadcrumb">
      <a href="/">হোম</a> <span>›</span> <b>${esc(t.nameBn)}</b>
    </nav>

    <div class="card task-hero" style="--task-color:${t.color}">
      <div class="task-hero-top">
        <div class="task-ico" style="color:${t.color};background:${t.color}14"><i class="${t.icon}"></i></div>
        <div>
          <h1>${esc(t.nameBn)}</h1>
          <span class="reward-pill">Rate: ৳${Number(t.reward).toFixed(2)}</span>
          ${t.locked ? '<span class="lock-pill"><i class="fa-solid fa-lock"></i> শীঘ্রই খুলবে</span>' : ''}
        </div>
      </div>
    </div>

    <div id="taskVideo"></div>

    <div class="card">
      <h2 class="sec-title">কীভাবে বিক্রি করবেন</h2>
      <ol class="steps" id="taskSteps">
${stepsHtml}
      </ol>
      <div id="taskActions" data-reward="${t.reward}">
        <p class="muted claim-hint">লগইন করে account জমা দিন — admin approve করলেই ৳${Number(t.reward).toFixed(2)} ব্যালেন্সে যোগ হবে।</p>
        <a href="/login.html?next=/task/${t.slug}.html" class="btn btn-gold btn-block">লগইন করে Account জমা দিন</a>
        <a href="/register.html" class="btn btn-outline-gold btn-block">নতুন? আইডি তৈরি করুন (৳১০ বোনাস)</a>
      </div>
    </div>

    <div class="card more-card">
      <h2 class="sec-title">আরও প্রজেক্ট দেখুন</h2>
      <div class="more-list">
        ${TASKS.filter(x => x.slug !== t.slug).slice(0, 6).map(x => `<a href="/task/${x.slug}.html"><i class="${x.icon}" style="color:${x.color}"></i> ${esc(x.nameBn)} <b>৳${x.reward}</b></a>`).join('\n        ')}
      </div>
    </div>
  </main>

  <footer class="site-footer">
    <div class="foot-grid">
      <div>
        <img src="/logo.png" alt="${SITE.name}" width="40" height="40">
        <p class="muted" style="font-size:13px;margin-top:8px">Facebook, Gmail, Instagram account বিক্রি করে টাকা আর্ন করুন — approve হলেই পেমেন্ট! 💰</p>
      </div>
      <div>
        <b>কুইক লিংক</b>
        <a href="/register.html">রেজিস্টার</a>
        <a href="/gift.html">গিফট কোড</a>
        <a href="/target.html">টার্গেট বোনাস</a>
        <a href="/help.html">সাপোর্ট</a>
      </div>
      <div>
        <b>প্রজেক্টসমূহ</b>
        ${TASKS.slice(0, 5).map(x => `<a href="/task/${x.slug}.html">${esc(x.nameBn)}</a>`).join('\n        ')}
      </div>
    </div>
    <p class="foot-copy">© ${new Date().getFullYear()} ${SITE.name} — All rights reserved.</p>
  </footer>
  <script type="application/ld+json">${crumbJson}</script>
</div>
<script src="/src/pages/task.js" type="module"></script>
</body>
</html>`;

  writeFileSync(path.join(outDir, `${t.slug}.html`), html);
  console.log(`[gen] task/${t.slug}.html`);
}
console.log(`[gen] ${TASKS.length} task pages generated`);

/* ------------------------------------------------------------------
   Build identity → public/version.json  (Vite copies public/ into dist/)
   WHY: "fix deploy হয়েছে কিনা" production-এ বাইরে থেকে বোঝা যেত না —
   Vercel কখনো static bundle নতুন করে আর functions পুরোনো রাখে (বা উল্টোটা)।
   এই ছোট ফাইলটা (কোনো secret না) + lib/http.js-এর `X-DigitEarn-API` header
   মিলিয়ে browser/owner এক লাইনে বুঝে যান deployed build কেমন।
   Vercel build-এ commit id `VERCEL_GIT_COMMIT_SHA` থেকে আসে।
   ------------------------------------------------------------------ */
const root = path.join(scriptsDir, '..');

/* Vite-era env: process.env (Vercel) জিতে যায়, নাহলে .env[.local|.production] */
function envValue(name) {
  if (process.env[name]) return process.env[name];
  for (const f of ['.env.production.local', '.env.production', '.env.local', '.env']) {
    const fp = path.join(root, f);
    if (!existsSync(fp)) continue;
    for (const line of readFileSync(fp, 'utf8').split('\n')) {
      const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
      if (m && m[1] === name) return m[2].trim().replace(/^["']|["']$/g, '');
    }
  }
  return '';
}

const version = {
  api: 'v3',                                            // lib/http.js API_VERSION এর সাথে মিলতে হবে
  commit: (process.env.VERCEL_GIT_COMMIT_SHA || envValue('GIT_COMMIT') || '').slice(0, 7),
  branch: process.env.VERCEL_GIT_COMMIT_REF || '',
  buildId: process.env.VERCEL_BUILD_ID || new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14),
  builtAt: new Date().toISOString(),
  node: process.version,
  /* Firebase web config বিল্ডে বসেছে কিনা — না থাকলে সাইট চুপচাপ "no Firebase" মোডে
     চলে (login/submit মরে যায়, কোনো error স্পষ্ট না) — এটাই diagnostic */
  firebaseConfig: Boolean(envValue('VITE_FIREBASE_PROJECT_ID') && envValue('VITE_FIREBASE_API_KEY')),
};
mkdirSync(path.join(root, 'public'), { recursive: true });
writeFileSync(path.join(root, 'public', 'version.json'), JSON.stringify(version, null, 2) + '\n');
console.log(`[gen] public/version.json → api=${version.api} commit=${version.commit || '?'} firebaseConfig=${version.firebaseConfig}`);
