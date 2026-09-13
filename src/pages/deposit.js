import '../styles.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { bootAppPage, toast, esc } from '../core/ui.js';
import { getPendingDeposit, getLastDeposit, submitDeposit } from '../core/api.js';

const METHODS = [
  { key: 'bkash', label: 'bKash', color: '#e2136e', icon: 'fa-solid fa-mobile-screen', field: 'bkashNumber', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1eCYdSLflbztkyqrJchdnJieWDZgOTtbfAXMwPbQ03g&s=10' },
  { key: 'nagad', label: 'Nagad', color: '#f6921e', icon: 'fa-solid fa-wallet', field: 'nagadNumber', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ1kq9_6GpY3anEMuEoGRstF5dbWZp86KNNf9XaYu4Sw&s=10' },
  { key: 'rocket', label: 'Rocket', color: '#8c3494', icon: 'fa-solid fa-rocket', field: 'rocketNumber', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJSGkr_8tLBvVNIkzSxs9K-TM8-S-ZSDjQLCPMRmNwtw&s=10' },
];

bootAppPage({
  active: 'home',
  onReady: async ({ user, settings }) => {
    const box = document.getElementById('depositBox');
    if (!box) return;
    const fee = Number(settings.activationFee) || 30;
    const bonus = Number(settings.activationBonus) || 20;

    if (user.isActive) {
      box.innerHTML = `
        <div class="center-lock">
          <div class="lock-dot-green"><i class="fa-solid fa-circle-check"></i></div>
          <h2 class="locked-title">আপনার একাউন্ট চালু আছে!</h2>
          <p class="muted">সব টাস্ক আনলকড — এখন কাজ শুরু করুন।</p>
          <a href="/dashboard.html" class="btn btn-gold btn-block">ড্যাশবোর্ডে ফিরে যান</a>
        </div>`;
      return;
    }

    const pending = await getPendingDeposit(user.uid).catch(() => null);
    const last = pending ? null : await getLastDeposit(user.uid).catch(() => null);
    const methods = METHODS.filter(m => settings[m.field]);

    box.innerHTML = `
      <div class="deposit-hero">
        <div class="dh-title"><i class="fa-solid fa-bolt"></i> একাউন্ট অ্যাক্টিভেশন</div>
        <div class="dh-amount">৳${fee} <small>(একবার মাত্র)</small></div>
        <p>একবার ফি দিলেই পাবেন:</p>
        <div class="dh-features">
          <div class="dh-chip"><i class="fa-solid fa-unlock"></i> সব টাস্ক আনলক</div>
          <div class="dh-chip"><i class="fa-solid fa-gift"></i> ৳${bonus} অ্যাক্টিভেশন বোনাস</div>
          <div class="dh-chip"><i class="fa-solid fa-infinity"></i> লাইফটাইম অ্যাক্টিভ</div>
        </div>
      </div>

      ${pending ? `
        <div class="pending-box">
          <i class="fa-solid fa-hourglass-half"></i>
          <div><b>ডিপোজিট রিভিউতে আছে</b>
          <span>আপনার পাঠানো প্রমাণ (${esc(pending.method)}) দেখা হচ্ছে — অনুমোদন হলেই একাউন্ট চালু হবে + ৳${bonus} বোনাস পাবেন।</span></div>
        </div>
        ${pending.image ? `<div class="proof-thumbs"><img class="proof-thumb" src="${esc(pending.image)}" alt="payment proof"></div>` : ''}`
        : last && last.status === 'rejected' ? `
        <div class="reject-box">
          <i class="fa-solid fa-circle-xmark"></i>
          <div><b>ডিপোজিট বাতিল হয়েছে।</b>${last.note ? `<span>${esc(last.note)}</span>` : '<span>ঠিক পরিমাণ ও লেনদেন আইডি দিয়ে আবার চেষ্টা করুন।</span>'}</div>
        </div>`
        : ''}

      ${methods.length ? `
        <div class="card" style="margin-top:14px">
          <h4 class="sec-title"><i class="fa-solid fa-credit-card" style="color:var(--gold-deep)"></i> কীভাবে জমা দেবেন</h4>
          <div class="steps-list">
            ${methods.map((m, i) => `
              <div class="step-line"><b class="step-num">${i + 1}</b><span><b style="color:${m.color}">${m.label}</b> নম্বরে <b>${esc(settings[m.field])}</b> (টাকা পাঠান) — পরিমাণ: <b>৳${fee}</b></span></div>`).join('')}
            <div class="step-line"><b class="step-num">${methods.length + 1}</b><span>পেমেন্টের <b>লেনদেন আইডি (TrxID)</b> খাতায় লিখে রাখুন</span></div>
            <div class="step-line"><b class="step-num">${methods.length + 2}</b><span>নিচের ফর্মে <b>TrxID ও পাঠানোর নম্বর</b> দিয়ে জমা দিন</span></div>
          </div>
        </div>
        <div class="card" style="margin-top:14px">
          <h4 class="sec-title"><i class="fa-solid fa-file-shield" style="color:var(--gold-deep)"></i> ডিপোজিট জমা দিন</h4>
          <p class="muted" style="font-size:12.5px;margin-bottom:10px">Payment method select করুন:</p>
          <div class="pay-methods">
            ${methods.map((m, i) => `
              <label class="pay-method ${i === 0 ? 'on' : ''}">
                <input type="radio" name="depMethod" value="${m.key}" ${i === 0 ? 'checked' : ''}>
                <img src="${esc(m.img)}" alt="${esc(m.label)}" loading="lazy" onerror="this.style.display='none'">
                <b>${m.label}</b>
              </label>`).join('')}
          </div>
          <div class="dep-send-box"><span id="depMethodLabel">${esc(methods[0].label).toUpperCase()}</span> নম্বরে <b>৳${fee}</b> পাঠান:<br><span class="dep-num" id="depNumber">${esc(settings[methods[0].field])}</span> <small>(পার্সোনাল)</small></div>
          <input type="text" id="depTrxId" class="input-field" placeholder="লেনদেন আইডি (TrxID)" maxlength="30">
          <input type="tel" id="depSender" class="input-field" placeholder="Sender Number — যে নম্বর থেকে টাকা পাঠিয়েছেন (01XXXXXXXXX)" maxlength="13">
          <button type="button" id="depSubmitBtn" class="btn btn-green btn-block" style="margin-top:12px"><i class="fa-solid fa-paper-plane"></i> ডিপোজিট জমা দিন</button>
          <p class="muted" style="font-size:11.5px;margin-top:10px;text-align:center">রিভিউ শেষ হলেই একাউন্ট চালু হয়ে যাবে।</p>
        </div>`
      : `
        <div class="card" style="margin-top:14px">
          <div class="notice-orange"><i class="fa-solid fa-circle-info"></i><div>Deposit number শীঘ্রই যুক্ত হবে। এ পর্যন্ত যোগাযোগ করুন:</div></div>
        </div>`}
    `;

    const submitBtn = document.getElementById('depSubmitBtn');
    if (!submitBtn) return;

    // method বদলালে send box-এর number/label update
    const methodBox = document.querySelector('.pay-methods');
    methodBox.addEventListener('change', () => {
      const sel = methodBox.querySelector('input:checked');
      const m = methods.find(x => x.key === sel.value);
      if (!m) return;
      document.getElementById('depMethodLabel').textContent = m.label.toUpperCase();
      document.getElementById('depNumber').textContent = settings[m.field];
      methodBox.querySelectorAll('.pay-method').forEach(l => l.classList.toggle('on', l.contains(sel)));
    });

    submitBtn.addEventListener('click', async () => {
      const sel = document.querySelector('.pay-methods input:checked');
      const method = sel ? sel.value : '';
      const trxId = document.getElementById('depTrxId').value;
      const sender = document.getElementById('depSender').value;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submit হচ্ছে...';
      try {
        await submitDeposit(user.uid, { method, trxId, senderNumber: sender, amount: fee });
        toast('ডিপোজিট জমা পড়েছে — রিভিউ শেষ হলে ব্যালেন্সে যোগ হবে');
        location.reload();
      } catch (err) {
        toast(err.message, 'error');
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Deposit Submit করুন';
      }
    });
  },
});
