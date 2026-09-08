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

    // welcome modal — login/reload-এর পরেই দেখাবে (Telegram + admin links admin panel থেকে change হয়)
    showWelcomeModal(settings);

    // tasks grid
    const grid = document.getElementById('projGrid');
    if (grid) {
      const tasks = await getTasks().catch(() => []);
      grid.innerHTML = projectGrid(tasks);
    }

    // notices marquee
    const notices = await getNotices().catch(() => []);
    if (notices.length) {
      const bar = document.getElementById('noticeBar');
      if (bar) { bar.style.display = 'flex'; setMarquee(bar, notices.map(n => n.text).join('  •  ')); }
    }
  },
});
