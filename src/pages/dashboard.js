import '../styles.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { bootAppPage, projectGrid, setMarquee, showWelcomeModal, fmtBDT, esc } from '../core/ui.js';
import { getTasks, getNotices, markWelcomeShown, activateAccount, friendlyError } from '../core/api.js';
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
          <p>আগে আমাদের টেলিগ্রাম চ্যানেলে জয়েন করুন, তারপর Activate বাটনে চাপ দিন — সাথে সাথে ${esc(settings.activationBonus)} টাকা বোনাস 💸</p>
          <div class="banner-actions">
            <a href="${esc(settings.activationLink)}" target="_blank" rel="noopener" class="pill-btn ghost"><i class="fa-brands fa-telegram"></i> Telegram Join</a>
            <button type="button" id="activateBtn" class="pill-btn"><i class="fa-solid fa-bolt"></i> Activate Now</button>
          </div>
        </div>`);
      const actBtn = document.getElementById('activateBtn');
      if (actBtn) actBtn.addEventListener('click', async () => {
        actBtn.disabled = true;
        actBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> একটু অপেক্ষা...';
        try {
          await activateAccount(user.uid);
          actBtn.innerHTML = '<i class="fa-solid fa-check"></i> Active!';
          setTimeout(() => location.reload(), 900);
        } catch (e) {
          actBtn.disabled = false;
          actBtn.innerHTML = '<i class="fa-solid fa-bolt"></i> Activate Now';
          alert(friendlyError(e));
        }
      });
    }

    // welcome modal (first login)
    if (!user.welcomeShown) {
      showWelcomeModal(settings, () => markWelcomeShown(user.uid));
    }

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
