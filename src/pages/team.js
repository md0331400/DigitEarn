import '../styles.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { bootAppPage, esc } from '../core/ui.js';
import { teamCounts, getDirectTeam, getReferralIncome } from '../core/api.js';

bootAppPage({
  active: 'team',
  onReady: async ({ user, settings }) => {
    const box = document.getElementById('teamBox');
    if (!box) return;
    box.innerHTML = '<div class="loading-line"><i class="fa-solid fa-spinner fa-spin"></i> টীম লোড হচ্ছে...</div>';

    const [counts, direct, refIncome] = await Promise.all([
      teamCounts(user.uid).catch(() => [0, 0, 0, 0]),
      getDirectTeam(user.uid).catch(() => []),
      getReferralIncome(user.uid).catch(() => 0),
    ]);
    const total = counts.reduce((a, b) => a + b, 0);
    const refLink = `${location.origin}/register.html?ref=${user.refCode}`;

    const levelNames = ['লেভেল ১', 'লেভেল ২', 'লেভেল ৩', 'লেভেল ৪'];
    box.innerHTML = `
      <div class="stat-row2">
        <div class="stat-card2">
          <div class="sc-ico" style="background:#f3e8ff;color:#8b5cf6"><i class="fa-solid fa-users"></i></div>
          <b>${direct.length}</b><span>Total Refer</span>
        </div>
        <div class="stat-card2">
          <div class="sc-ico" style="background:#dbeafe;color:#2563eb"><i class="fa-solid fa-wallet"></i></div>
          <b>৳${Number(refIncome).toFixed(0)}</b><span>Ref Income</span>
        </div>
      </div>
      <div class="card team-card">
        <div class="team-top">
          <div class="team-ico"><i class="fa-solid fa-users"></i></div>
          <div><h2 class="team-title">My Referral Team</h2></div>
          <div class="team-size"><span>Team Size:</span><b>${total}</b></div>
        </div>
        <div class="ref-link-box">
          <input type="text" readonly value="${esc(refLink)}" id="refLink">
          <button type="button" class="copy-btn" id="copyRef"><i class="fa-regular fa-copy"></i> Copy</button>
        </div>
      </div>

      <div class="card">
        <h4 class="sec-title">লেভেল অনুযায়ী টীম</h4>
        ${counts.map((c, i) => `
          <div class="level-card">
            <div class="level-head">
              <b>${levelNames[i]} (${c})</b>
              <button type="button" class="view-btn" data-level="${i + 1}" ${c ? '' : 'style="opacity:.5"'}>View</button>
            </div>
            <div class="level-members" id="lv${i + 1}" hidden>
              ${i === 0 && direct.length ? direct.map(m => `
                <div class="member">
                  <div class="m-avatar"><i class="fa-solid fa-user"></i></div>
                  <div class="m-info"><b>${esc(m.name)}</b><span>ID: ${esc(m.refCode)} • ${(m.createdAt ? (m.createdAt.toDate ? m.createdAt.toDate().toISOString().slice(0, 10) : '') : '')}</span></div>
                  <span class="m-status ${m.isActive ? 'on' : 'off'}">${m.isActive ? 'Active' : 'Inactive'}</span>
                </div>`).join('') : `<p class="muted center" style="padding:10px 16px">এই লেভেলে ${i === 0 && direct.length ? '' : 'এখনো'} কোনো সদস্য নেই</p>`}
            </div>
          </div>`).join('')}
      </div>

      <div class="card">
        <h4 class="sec-title">রেফার করলে কী হয়?</h4>
        <ul class="perks">
          <li><i class="fa-solid fa-gift" style="color:#ec4899"></i> আপনার রেফার দিয়ে নতুন সদস্য <b>${esc(settings.registerBonus)} টাকা</b> বোনাস পাবে</li>
          <li><i class="fa-solid fa-hand-holding-dollar" style="color:#10b981"></i> আপনি প্রতি রেফারে <b>${esc(settings.referralBonus)} টাকা</b> বোনাস পাবেন</li>
          <li><i class="fa-solid fa-bullseye" style="color:#ef4444"></i> টার্গেট পূরণে বিশেষ বোনাস (৳৫০–৳৩০০) — <a href="/target.html" style="color:#d97706;font-weight:700">দেখুন</a></li>
        </ul>
      </div>`;

    document.querySelectorAll('.view-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = document.getElementById('lv' + btn.dataset.level);
        if (!target) return;
        target.hidden = !target.hidden;
        btn.textContent = target.hidden ? 'View' : 'Hide';
      });
    });
    const copyBtn = document.getElementById('copyRef');
    if (copyBtn) copyBtn.addEventListener('click', () => {
      const input = document.getElementById('refLink');
      if (!input) return;
      input.select();
      input.setSelectionRange(0, 99999);
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(input.value).catch(() => {});
      copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copied';
      setTimeout(() => { copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i> Copy'; }, 1600);
    });
  },
});
