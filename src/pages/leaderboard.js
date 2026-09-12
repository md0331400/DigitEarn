import '../styles.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { bootAppPage, esc } from '../core/ui.js';
import { getLeaderboard } from '../core/api.js';
import { bnDigits } from '../core/microjobs.js';

/* Leaderboard = আলাদা page (§18) — Refer page (team.html) এর সাথে মেশানো হয়নি।
   কঠিন নিয়ম: শুধু Top 4 (৩টা না, পুরো ranking list না), প্রতিটা কার্ডে প্রোফাইল,
   নাম, র‍্যাঙ্ক, রেফারেল সংখ্যা, মাসিক আয় আর mask করা ফোন — সব সার্ভার-ডাটা থেকে
   (hardcode নয়, ফোন নম্বর কখনো পুরোপুরি দেখানো হয় না)। */

const RANK = {
  1: { cls: 'r1', icon: 'fa-crown', label: 'চ্যাম্পিয়ন' },
  2: { cls: 'r2', icon: 'fa-medal', label: 'রানার-আপ' },
  3: { cls: 'r3', icon: 'fa-award', label: 'তৃতীয়' },
  4: { cls: 'r4', icon: 'fa-star', label: 'চতুর্থ' },
};
const money = n => '৳' + bnDigits((Number(n) || 0).toLocaleString('en-BD', { maximumFractionDigits: 0 }));
const imgUrl = v => (typeof v === 'string' && /^https?:\/\/\S+$/i.test(v)) ? v : '';

function initials(name) {
  const parts = String(name || 'সদস্য').trim().split(/\s+/).slice(0, 2);
  return parts.map(p => p[0] || '').join('').toUpperCase().slice(0, 2) || 'DE';
}

function leadCard(u) {
  const r = RANK[u.rank] || RANK[4];
  const pic = imgUrl(u.avatar);
  return `
    <article class="lb-card ${r.cls}">
      <div class="lb-rank"><i class="fa-solid ${r.icon}"></i><b>#${bnDigits(u.rank)}</b></div>
      <div class="lb-avatar">
        ${pic ? `<img src="${esc(pic)}" alt="${esc(u.name)}" loading="lazy" onerror="this.hidden=true;this.nextElementSibling.hidden=false">` : ''}
        <span class="lb-initial" ${pic ? 'hidden' : ''}>${esc(initials(u.name))}</span>
      </div>
      <h3 class="lb-name">${esc(u.name)}${u.isActive ? '' : ' <span class="lb-off">inactive</span>'}</h3>
      <p class="lb-tag">${r.label}</p>
      <div class="lb-rows">
        <div class="lb-row"><span><i class="fa-solid fa-user-plus"></i> Referrals</span><b>${bnDigits(Number(u.referrals) || 0)} জন</b></div>
        <div class="lb-row"><span><i class="fa-solid fa-wallet"></i> Monthly Income</span><b>${money(u.monthlyIncome)}</b></div>
        <div class="lb-row"><span><i class="fa-solid fa-phone"></i> Phone</span><b class="lb-mask">${esc(u.mobile || '—')}</b></div>
      </div>
    </article>`;
}

bootAppPage({
  active: 'team',
  onReady: async ({ user }) => {
    const box = document.getElementById('lbBox');
    if (!box) return;
    box.innerHTML = '<div class="loading-line"><i class="fa-solid fa-spinner fa-spin"></i> Leaderboard লোড হচ্ছে...</div>';
    let data = null;
    try {
      data = await getLeaderboard();
    } catch (err) {
      box.innerHTML = `<div class="mj-empty"><i class="fa-solid fa-triangle-exclamation"></i>
        <p><b>Leaderboard লোড হয়নি</b><br>${esc(String(err.message || err))}</p>
        <button class="btn btn-gold btn-sm" id="lbRetry"><i class="fa-solid fa-rotate"></i> আবার চেষ্টা</button></div>`;
      document.getElementById('lbRetry')?.addEventListener('click', () => location.reload());
      return;
    }
    const items = (data && Array.isArray(data.items) ? data.items : []).slice(0, 4);
    if (!items.length) {
      box.innerHTML = `<div class="mj-empty"><i class="fa-solid fa-trophy"></i>
        <p><b>এখনো টপ-৪ এ কেউ নেই</b><br>যার রেফারেল সবচেয়ে বেশি, সে-ই এখানে আসবে। এখনই রেফার করুন — আপনার Referral Code: <b>${esc(user.refCode || '')}</b></p>
        <a href="/team.html" class="btn btn-gold btn-sm"><i class="fa-solid fa-users"></i> Refer পেজ</a></div>`;
      return;
    }
    box.innerHTML = `
      <div class="lb-grid">${items.map(leadCard).join('')}</div>
      <div class="lb-note"><i class="fa-solid fa-shield-halved"></i>
        ফোন নম্বর মাঝখানের অঙ্কগুলো লুকানো থাকে (যেমন 01712****89) — পুরো নম্বর কাউকে দেখানো হয় না।
        র‍্যাঙ্ক = আপনার বৈধ রেফারেল সংখ্যা, আয় = চলতি মাসের approve হওয়া আয়।
      </div>`;
  },
});
