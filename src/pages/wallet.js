import '../styles.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { bootAppPage, fmtBDT, esc, toast } from '../core/ui.js';
import { requestWithdrawal } from '../core/api.js';

bootAppPage({
  active: 'wallet',
  onReady: async ({ user, settings }) => {
    const main = document.getElementById('appMain');
    main.innerHTML = `
      <div class="card balance-card">
        <div class="bc-label">আপনার ব্যালেন্স</div>
        <div class="bc-amount">${fmtBDT(user.balance)}</div>
        <div class="bc-sub">মোট আর্নড: ${fmtBDT(user.totalEarned)}</div>
      </div>
      ${user.isActive ? `
      <div class="card">
        <h4 class="sec-title">নতুন উইথড্র রিকোয়েস্ট</h4>
        <p class="muted" style="margin-bottom:14px;font-size:13px">ন্যূনতম উইথড্র: ${fmtBDT(settings.minWithdraw)} • পেমেন্ট: bKash / Nagad / Rocket</p>
        <form id="wdForm">
          <label class="fld-label">টাকার পরিমাণ (৳)</label>
          <input type="number" name="amount" min="${settings.minWithdraw}" max="${Math.floor(user.balance)}" step="1" placeholder="যেমন: 100" required>
          <label class="fld-label">পেমেন্ট মেথড</label>
          <div class="method-row">
            ${[
              { m: 'bKash', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1eCYdSLflbztkyqrJchdnJieWDZgOTtbfAXMwPbQ03g&s=10' },
              { m: 'Nagad', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ1kq9_6GpY3anEMuEoGRstF5dbWZp86KNNf9XaYu4Sw&s=10' },
              { m: 'Rocket', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJSGkr_8tLBvVNIkzSxs9K-TM8-S-ZSDjQLCPMRmNwtw&s=10' },
            ].map((x, i) => `
              <label class="method-chip"><input type="radio" name="method" value="${x.m}" ${i === 0 ? 'checked' : ''}><span><img class="m-img" src="${x.img}" alt="${x.m}" onerror="this.style.display='none'">${x.m}</span></label>`).join('')}
          </div>
          <label class="fld-label">একাউন্ট নম্বর</label>
          <div class="field" style="margin-bottom:0">
            <i class="fa-solid fa-mobile-screen left"></i>
            <input type="tel" name="account_number" placeholder="01XXXXXXXXX" required>
          </div>
          <button type="submit" class="btn btn-gold btn-block" style="margin-top:16px"><i class="fa-solid fa-paper-plane"></i> রিকোয়েস্ট পাঠান</button>
        </form>
      </div>` : `
      <div class="card withdraw-locked">
        <div class="wlock-ico"><i class="fa-solid fa-lock"></i></div>
        <h3>উইথড্র করতে একাউন্ট এক্টিভ করুন</h3>
        <p>আপনার একাউন্ট এ্যাক্টিভ করে ${esc(settings.activationBonus)} টাকা বোনাস নিন সাথে সাথে 💸</p>
        ${/^https?:\/\//i.test(String(settings.activationLink || '').trim())
          ? `<a href="${esc(String(settings.activationLink).trim())}" target="_blank" rel="noopener" class="btn btn-orange">এক্টিভ করুন</a>`
          /* BUGFIX: admin activationLink সেট না করলে href="" হতো → বাটনে চাপলে একই
             পেজে রিলোড (কোনো কাজ না, user-ও বোঝে না কী হয়েছে)। এখন স্পষ্ট বার্তা। */
          : `<div class="btn btn-orange" style="opacity:.65;cursor:not-allowed"><i class="fa-solid fa-triangle-exclamation"></i> অ্যাডমিন এখনো এক্টিভেশন লিংক সেট করেননি</div>`}
      </div>`}
      <div class="back-link"><a href="/history.html"><i class="fa-solid fa-clock-rotate-left"></i> Payment History দেখুন</a></div>`;

    const form = document.getElementById('wdForm');
    if (form) form.addEventListener('submit', async e => {
      e.preventDefault();
      const fd = new FormData(form);
      const btn = form.querySelector('button[type=submit]');
      btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> পাঠানো হচ্ছে...';
      try {
        await requestWithdrawal(user.uid, {
          amount: Number(fd.get('amount')),
          method: String(fd.get('method')),
          accountNumber: String(fd.get('account_number') || '').trim(),
          name: user.name, email: user.email,
        });
        /* alert() বাদ: native dialog বাংলায় বক্স (□) দেখায়, আর সেটা JS thread থেমে
           যাওয়ায় বাটন "পাঠানো হচ্ছে..." নিয়ে আটকে যেত — এখন toast + নিশ্চিত reset */
        toast('উইথড্র রিকোয়েস্ট পাঠানো হয়েছে — admin approve করলে টাকা কাটা হবে', 'success');
        setTimeout(() => { location.href = '/history.html'; }, 900);
      } catch (err) {
        toast(err.message, 'error');
        btn.disabled = false;
        btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> রিকোয়েস্ট পাঠান';
      }
    });
  },
});
