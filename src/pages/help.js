import '../styles.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { bootAppPage, esc, videoEmbedHtml } from '../core/ui.js';

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
        <h2 class="hist-title"><i class="fa-solid fa-headset"></i> Customer Support</h2>
        <p class="muted">যেকোনো সমস্যায় আমাদের সাথে যোগাযোগ করুন</p>
      </div>
      <div class="card">
        <h4 class="sec-title">Support Channels</h4>
        <div class="support-list">
          <a href="${esc(settings.facebookLink)}" target="_blank" rel="noopener" class="support-item">
            <span class="s-ico" style="background:#1877f2"><i class="fa-brands fa-facebook-f"></i></span>
            <span class="s-info"><b>Facebook Page</b><small>Like &amp; Follow us</small></span>
            <i class="fa-solid fa-chevron-right s-chev"></i>
          </a>
          <a href="${esc(settings.telegramLink)}" target="_blank" rel="noopener" class="support-item">
            <span class="s-ico" style="background:#229ed9"><i class="fa-brands fa-telegram"></i></span>
            <span class="s-info"><b>Telegram Channel</b><small>Get all updates</small></span>
            <i class="fa-solid fa-chevron-right s-chev"></i>
          </a>
          ${adminContactItem(settings.admin1Name, settings.admin1Link, settings.admin1Phone, settings.admin1Email, '#0ea5e9')}
          ${adminContactItem(settings.admin2Name, settings.admin2Link, settings.admin2Phone, settings.admin2Email, '#f59e0b')}
          <a href="${esc(settings.youtubeLink)}" target="_blank" rel="noopener" class="support-item">
            <span class="s-ico" style="background:#ff0000"><i class="fa-brands fa-youtube"></i></span>
            <span class="s-info"><b>YouTube Channel</b><small>Official Videos</small></span>
            <i class="fa-solid fa-chevron-right s-chev"></i>
          </a>
        </div>
      </div>
      <div class="card">
        <h4 class="sec-title"><i class="fa-solid fa-circle-play" style="color:#ef4444"></i> Training Tutorials</h4>
        ${videoHtml}
      </div>
      <div class="dev-credit">
        <b>Developer:</b> Ami Sayem<br>
        <a href="mailto:support.amisayem@gmail.com">support.amisayem@gmail.com</a>
      </div>`;
  },
});

function adminContactItem(name, link, phone, email, color) {
  if (!name && !link && !phone && !email) return '';
  const subs = [
    phone ? `<a href="tel:${esc(String(phone).replace(/\s+/g, ''))}" class="support-mini"><i class="fa-solid fa-phone"></i> ${esc(phone)}</a>` : '',
    email ? `<a href="mailto:${esc(email)}" class="support-mini"><i class="fa-solid fa-envelope"></i> ${esc(email)}</a>` : '',
  ].filter(Boolean).join('');
  return `
    <a href="${esc(link || (phone ? 'tel:' + String(phone).replace(/\s+/g, '') : (email ? 'mailto:' + email : '#')))}" target="_blank" rel="noopener" class="support-item">
      <span class="s-ico" style="background:${color}"><i class="fa-solid fa-user-group"></i></span>
      <span class="s-info"><b>${esc(name || 'Admin Support')}</b><small>ট্রানজেকশন / যেকোনো সমস্যায় যোগাযোগ করুন</small>${subs ? `<span class="support-mini-row">${subs}</span>` : ''}</span>
      <i class="fa-solid fa-chevron-right s-chev"></i>
    </a>`;
}
