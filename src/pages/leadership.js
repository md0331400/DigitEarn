import '../styles.css';
/* owner-এর correction: "লিডারশিপ"-এর বদলে Top-4 লিডারবোর্ড দেখাতে হবে —
   পুরোনো levels page-টা আর না দেখিয়ে সেই পেজেই নিয়ে যায় (পুরোনো লিংক ভাঙে না) */
location.replace('/leaderboard.html');
import '@fortawesome/fontawesome-free/css/all.min.css';
import { bootAppPage, esc } from '../core/ui.js';
import { teamCounts } from '../core/api.js';

bootAppPage({
  active: 'home',
  onReady: async ({ user }) => {
    const box = document.getElementById('leadBox');
    if (!box) return;
    box.innerHTML = '<div class="loading-line"><i class="fa-solid fa-spinner fa-spin"></i> লোড হচ্ছে...</div>';
    const counts = await teamCounts(user.uid).catch(() => [0, 0, 0, 0]);
    const total = counts.reduce((a, b) => a + b, 0);

    const levels = [
      { min: 0, name: 'নতুন সদস্য', icon: 'fa-seedling', color: '#a8a29e' },
      { min: 1, name: 'ব্রোঞ্জ লিডার', icon: 'fa-medal', color: '#b45309' },
      { min: 10, name: 'সিলভার লিডার', icon: 'fa-medal', color: '#64748b' },
      { min: 50, name: 'গোল্ড লিডার', icon: 'fa-medal', color: '#f59e0b' },
      { min: 100, name: 'প্লাটিনাম লিডার', icon: 'fa-crown', color: '#8b5cf6' },
    ];
    let current = levels[0], next = null;
    for (let i = levels.length - 1; i >= 0; i--) {
      if (total >= levels[i].min) { current = levels[i]; next = levels[i + 1] || null; break; }
    }
    const levelNames = ['লেভেল ১', 'লেভেল ২', 'লেভেল ৩', 'লেভেল ৪'];

    box.innerHTML = `
      <div class="card" style="text-align:center">
        <div class="task-ico" style="color:${current.color};background:${current.color}14;width:72px;height:72px;font-size:30px;margin:0 auto 10px"><i class="fa-solid ${current.icon}"></i></div>
        <h2 style="font-size:20px;font-weight:800;color:${current.color}">${current.name}</h2>
        <p class="muted" style="font-size:13.5px;margin-top:8px">মোট টীম: <b style="color:inherit">${total}</b> জন সদস্য</p>
        ${next
          ? `<div class="lead-progress"><div class="tier-bar" style="width:${Math.min(100, Math.round((total / next.min) * 100))}%"></div></div>
             <p class="muted" style="font-size:13px">পরবর্তী লেভেল (<b>${next.name}</b>) এর জন্য আরও <b>${next.min - total}</b> জন রেফার করুন</p>`
          : '<div class="ok-box" style="margin-top:12px"><i class="fa-solid fa-trophy"></i> আপনি সর্বোচ্চ লেভেলে আছেন!</div>'}
      </div>
      <div class="card">
        <h4 class="sec-title">আপনার টীম (লেভেল অনুযায়ী)</h4>
        <div class="level-rows">
          ${counts.map((c, i) => `<div class="level-row"><span>${levelNames[i]}</span><b>${c} জন</b></div>`).join('')}
        </div>
        <a href="/team.html" class="btn btn-gold btn-block" style="margin-top:14px"><i class="fa-solid fa-users"></i> পূর্ণ টীম দেখুন</a>
      </div>`;
  },
});
