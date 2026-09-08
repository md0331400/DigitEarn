import '../styles.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { bootAppPage, fmtBDT, fmtDate, esc } from '../core/ui.js';
import { getMyWithdrawals } from '../core/api.js';

bootAppPage({
  active: 'history',
  onReady: async ({ user }) => {
    const box = document.getElementById('histBox');
    if (!box) return;
    box.innerHTML = '<div class="loading-line"><i class="fa-solid fa-spinner fa-spin"></i> লোড হচ্ছে...</div>';
    const rows = await getMyWithdrawals(user.uid).catch(() => []);
    document.getElementById('histCount').textContent = rows.length;
    if (!rows.length) {
      box.innerHTML = `
        <div class="card empty-card">
          <i class="fa-solid fa-receipt empty-ico"></i>
          <h3>কোনো রেকর্ড পাওয়া যায়নি!</h3>
          <p class="muted">আপনি এখনো কোনো উইথড্র রিকোয়েস্ট করেননি।</p>
          <a href="/wallet.html" class="btn btn-gold" style="margin-top:10px">Withdraw Now</a>
        </div>
        <div class="back-link"><a href="/wallet.html"><i class="fa-solid fa-arrow-left"></i> Back to Withdraw</a></div>`;
      return;
    }
    box.innerHTML = `
      <div class="hist-list">
        ${rows.map(w => {
          const ico = w.status === 'paid' ? 'fa-circle-check' : w.status === 'rejected' ? 'fa-circle-xmark' : 'fa-hourglass-half';
          const label = w.status === 'pending' ? 'পেন্ডিং' : w.status === 'paid' ? 'পেড' : 'বাতিল';
          return `
          <div class="hist-item">
            <div class="h-ico ${w.status}"><i class="fa-solid ${ico}"></i></div>
            <div class="h-info">
              <b>${fmtBDT(w.amount)} • ${esc(w.method)}</b>
              <span>${esc(w.accountNumber)} • ${fmtDate(w.createdAt)}</span>
              ${w.note ? `<em>${esc(w.note)}</em>` : ''}
            </div>
            <span class="h-status ${w.status}">${label}</span>
          </div>`;
        }).join('')}
      </div>
      <div class="back-link"><a href="/wallet.html"><i class="fa-solid fa-arrow-left"></i> Back to Withdraw</a></div>`;
  },
});
