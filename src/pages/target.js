import '../styles.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { bootAppPage, esc } from '../core/ui.js';
import { teamCounts, hasTargetClaimed, claimTarget } from '../core/api.js';
import { toast } from '../core/ui.js';

bootAppPage({
  active: 'home',
  onReady: async ({ user, settings }) => {
    const box = document.getElementById('targetBox');
    if (!box) return;
    box.innerHTML = '<div class="loading-line"><i class="fa-solid fa-spinner fa-spin"></i> লোড হচ্ছে...</div>';
    const counts = await teamCounts(user.uid).catch(() => [0, 0, 0, 0]);
    const teamTotal = counts.reduce((a, b) => a + b, 0);
    const tiers = (settings.targetTiers || []).map(t => ({ ...t, claimed: hasTargetClaimed(user.uid, t.tier) }));

    box.innerHTML = `
      <div class="card" style="text-align:center;border-top:4px solid #ef4444">
        <div class="task-ico" style="color:#ef4444;background:#ef444414;width:64px;height:64px;font-size:26px;margin:0 auto 10px"><i class="fa-solid fa-bullseye"></i></div>
        <h2 style="font-size:19px;font-weight:800">টার্গেট বোনাস</h2>
        <p class="muted" style="font-size:13.5px;margin-top:8px">আপনার মোট রেফারেল: <b style="color:inherit">${teamTotal}</b> জন</p>
      </div>
      ${tiers.map(t => {
        const pct = Math.min(100, Math.round((teamTotal / Number(t.tier)) * 100));
        const reached = teamTotal >= Number(t.tier);
        return `
        <div class="card tier-card ${t.claimed ? 'done' : ''}">
          <div class="tier-top">
            <div style="flex:1">
              <div class="tier-name">${t.tier} জন রেফার করুন</div>
              <div class="tier-progress"><div class="tier-bar" style="width:${pct}%"></div></div>
            </div>
            <span class="tier-bonus">৳${t.bonus}</span>
          </div>
          ${t.claimed
            ? '<div class="ok-box"><i class="fa-solid fa-check"></i> বোনাস Claim করা হয়েছে</div>'
            : `<button type="button" class="btn btn-gold btn-block" data-tier="${t.tier}" data-bonus="${t.bonus}" ${reached ? '' : 'disabled style="opacity:.6"'}>${reached ? 'বোনাস Claim করুন' : `আরও ${Number(t.tier) - teamTotal} জন দরকার`}</button>`}
        </div>`;
      }).join('')}`;

    box.querySelectorAll('button[data-tier]').forEach(btn => {
      btn.addEventListener('click', async () => {
        btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Claim হচ্ছে...';
        try {
          const bonus = await claimTarget(user.uid, btn.dataset.tier);
          toast(`+৳${bonus} টার্গেট বোনাস যোগ হয়েছে`);
          location.reload();
        } catch (err) {
          toast(err.message, 'error');
          btn.disabled = false; btn.textContent = 'বোনাস Claim করুন';
        }
      });
    });
  },
});
