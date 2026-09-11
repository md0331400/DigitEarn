import '../styles.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { bootAppPage, projectGrid, setMarquee, showWelcomeModal, fmtBDT, esc } from '../core/ui.js';
import { getTasks, getNotices, friendlyError } from '../core/api.js';
import { getSettings } from '../core/store.js';

bootAppPage({
  active: 'home',
  onReady: async ({ user, settings }) => {
    // header balance
    document.querySelectorAll('[data-balance]').forEach(el => { el.textContent = fmtBDT(user.balance); });

    // inactive banner
    if (!user.isActive) {
      const main = document.getElementById('appMain');
      main.insertAdjacentHTML('afterbegin', `
        <div class="active-banner">
          <i class="fa-solid fa-triangle-exclamation banner-alert"></i>
          <h3>আপনার একাউন্ট একটিভ নয়!</h3>
          <p>৳${esc(settings.activationFee || 30)} deposit করে একাউন্ট অ্যাক্টিভ করুন — সাথে সাথে ${esc(settings.activationBonus)} টাকা বোনাস 💸</p>
          <div class="banner-actions">
            <a href="/deposit.html" class="pill-btn"><i class="fa-solid fa-bolt"></i> Deposit করে অ্যাক্টিভ করুন</a>
          </div>
        </div>`);
    }

    // Welcome modal — আগে প্রতিবার dashboard load-এই উঠত (refresh দিলেই বারবার
    // modal)। profile-এর `welcomeShown` field সেট আছে কিন্তু client সেটা লিখতে
    // পারে না (rules শুধু `name` allow করে), তাই flag = server field + device
    // localStorage। Modal বন্ধ করলে/দেখার পর আর আসবে না।
    const WKEY = 'de_welcome_seen_v1';
    let seen = false;
    try { seen = localStorage.getItem(WKEY) === '1'; } catch (_) {}
    if (!seen && !user.welcomeShown) {
      showWelcomeModal(settings, () => { try { localStorage.setItem(WKEY, '1'); } catch (_) {} });
      try { localStorage.setItem(WKEY, '1'); } catch (_) {}
    }

    // tasks grid
    const grid = document.getElementById('projGrid');
    if (grid) {
      const tasks = await getTasks().catch(() => []);
      grid.innerHTML = projectGrid(tasks);
    }

    // notices marquee (all-user + এই user-এর private warning — rules দ্বারা scoped)
    const notices = await getNotices(user.uid).catch(() => []);
    if (notices.length) {
      const bar = document.getElementById('noticeBar');
      const line = notices.map(n => {
        const t = (n.title ? n.title + ': ' : '') + (n.text || '');
        return n.targeted && n.type === 'warning' ? '⚠️ ' + t : t;
      }).join('  •  ');
      if (bar) { bar.style.display = 'flex'; setMarquee(bar, line); }
    }
  },
});
