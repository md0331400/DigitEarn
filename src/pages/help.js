import '../styles.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { bootAppPage, esc, toast, videoEmbedHtml } from '../core/ui.js';

bootAppPage({
  active: 'help',
  onReady: async ({ user, settings }) => {
    const box = document.getElementById('helpBox');
    if (!box) return;
    const vu = settings.videoUrl || '';
    const embed = videoEmbedHtml(vu);
    const videoHtml = embed
      ? `<div class="video-box" style="border-radius:14px;overflow:hidden">${embed}</div>`
      : `
      <div class="tutorial-box">
        <i class="fa-solid fa-video-slash"></i>
        <p>ভিডিও টিউটোরিয়াল শীঘ্রই আসছে...</p>
      </div>`;
    box.innerHTML = `
      <div class="help-head">
        <h2 class="hist-title"><i class="fa-solid fa-headset"></i> গ্রাহক সেবা</h2>
        <p class="muted">যেকোনো সমস্যায় আমাদের সাথে যোগাযোগ করুন</p>
      </div>
      <div class="card">
        <h4 class="sec-title">যোগাযোগের মাধ্যম</h4>
        <div class="support-list">
          ${socialItem(settings.facebookLink, 'fa-brands fa-facebook-f', '#1877f2', 'Facebook Page', 'Like &amp; Follow us')}
          ${socialItem(settings.telegramLink, 'fa-brands fa-telegram', '#229ed9', 'Telegram Channel', 'Get all updates')}
          ${adminContactItem(settings.admin1Name, settings.admin1Link, settings.admin1Phone, settings.admin1Email, '#0ea5e9')}
          ${adminContactItem(settings.admin2Name, settings.admin2Link, settings.admin2Phone, settings.admin2Email, '#f59e0b')}
          ${socialItem(settings.youtubeLink, 'fa-brands fa-youtube', '#ff0000', 'YouTube Channel', 'Official Videos')}
        </div>
      </div>
      <div class="card">
        <h4 class="sec-title"><i class="fa-solid fa-circle-play" style="color:#ef4444"></i> শেখার ভিডিও</h4>
        ${videoHtml}
      </div>
      <div class="dev-credit">
        <b>ডেভেলপার:</b> Ami Sayem<br>
        <a href="mailto:support.amisayem@gmail.com">support.amisayem@gmail.com</a>
      </div>`;

    // admin panel থেকে link set না থাকলে "Admin not set it"
    box.querySelectorAll('[data-nolink]').forEach(el => el.addEventListener('click', () => {
      toast('এখনো এই লিংকটি যোগ করা হয়নি — সাপোর্টে যোগাযোগ করুন', 'error');
    }));
  },
});

/* link set → anchor; set না থাকলে → button (click-এ warning) */
function socialItem(link, icon, bg, title, sub) {
  const inner = `
    <span class="s-ico" style="background:${bg}"><i class="${icon}"></i></span>
    <span class="s-info"><b>${title}</b><small>${sub}</small></span>
    <i class="fa-solid fa-chevron-right s-chev"></i>`;
  if (link && /^https?:\/\//i.test(String(link))) {
    return `<a href="${esc(String(link))}" target="_blank" rel="noopener" class="support-item">${inner}</a>`;
  }
  return `<button type="button" class="support-item" data-nolink>${inner}</button>`;
}

function adminContactItem(name, link, phone, email, color) {
  if (!name && !link && !phone && !email) return '';
  const subs = [
    phone ? `<a href="tel:${esc(String(phone).replace(/\s+/g, ''))}" class="support-mini"><i class="fa-solid fa-phone"></i> ${esc(phone)}</a>` : '',
    email ? `<a href="mailto:${esc(email)}" class="support-mini"><i class="fa-solid fa-envelope"></i> ${esc(email)}</a>` : '',
  ].filter(Boolean).join('');
  const href = link && /^https?:\/\//i.test(String(link))
    ? esc(String(link))
    : (phone ? 'tel:' + String(phone).replace(/\s+/g, '') : (email ? 'mailto:' + email : ''));
  const inner = `
    <span class="s-ico" style="background:${color}"><i class="fa-solid fa-user-group"></i></span>
    <span class="s-info"><b>${esc(name || 'অ্যাডমিন সাপোর্ট')}</b><small>ট্রানজেকশন / যেকোনো সমস্যায় যোগাযোগ করুন</small>${subs ? `<span class="support-mini-row">${subs}</span>` : ''}</span>
    <i class="fa-solid fa-chevron-right s-chev"></i>`;
  if (href) {
    return `<a href="${href}" target="_blank" rel="noopener" class="support-item">${inner}</a>`;
  }
  return `<button type="button" class="support-item" data-nolink>${inner}</button>`;
}
