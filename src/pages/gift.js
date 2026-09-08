import '../styles.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { bootAppPage, esc } from '../core/ui.js';
import { hasGiftClaimedToday, claimGift } from '../core/api.js';
import { toast } from '../core/ui.js';

bootAppPage({
  active: 'home',
  onReady: async ({ user, settings }) => {
    const box = document.getElementById('giftBox');
    if (!box) return;
    const claimed = await hasGiftClaimedToday(user.uid).catch(() => false);
    box.innerHTML = `
      <div class="card" style="text-align:center">
        <div class="task-ico" style="color:#ec4899;background:#ec489914;width:64px;height:64px;font-size:26px;margin:0 auto 10px"><i class="fa-solid fa-gift"></i></div>
        <h2 style="font-size:19px;font-weight:800">ডেইলি গিফট কোড</h2>
        <p class="muted" style="font-size:13.5px;margin:10px 0">প্রতিদিন আমাদের টেলিগ্রাম চ্যানেলে একটি গিফট কোড দেওয়া হয়। কোড দিয়ে ${esc(settings.giftReward)} টাকা বোনাস নিন।</p>
        <a href="${esc(settings.telegramLink)}" target="_blank" rel="noopener" class="btn btn-teal"><i class="fa-brands fa-telegram"></i> কোড পেতে জয়েন করুন</a>
      </div>
      <div class="card">
        <h4 class="sec-title">কোড এন্ট্রি করুন</h4>
        ${claimed
          ? '<div class="ok-box"><i class="fa-solid fa-circle-check"></i> আজকের গিফট বোনাস ইতিমধ্যে Claim করেছেন</div>'
          : `
          <form id="giftForm">
            <div class="field">
              <i class="fa-solid fa-ticket left"></i>
              <input type="text" name="code" placeholder="গিফট কোড লিখুন" required>
            </div>
            <button type="submit" class="btn btn-gold btn-block"><i class="fa-solid fa-gift"></i> Claim করুন</button>
          </form>`}
      </div>`;
    const form = document.getElementById('giftForm');
    if (form) form.addEventListener('submit', async e => {
      e.preventDefault();
      const code = String(new FormData(form).get('code') || '').trim();
      const btn = form.querySelector('button[type=submit]');
      btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> চেক হচ্ছে...';
      try {
        const reward = await claimGift(user.uid, code);
        toast(`+৳${reward} গিফট বোনাস যোগ হয়েছে`);
        form.closest('.card').innerHTML = '<div class="ok-box"><i class="fa-solid fa-circle-check"></i> আজকের গিফট বোনাস Claim করা হয়েছে</div>';
      } catch (err) {
        toast(err.message, 'error');
        btn.disabled = false; btn.innerHTML = '<i class="fa-solid fa-gift"></i> Claim করুন';
      }
    });
  },
});
