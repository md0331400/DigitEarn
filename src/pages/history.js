import '../styles.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { bootAppPage, fmtBDT, fmtDate, esc } from '../core/ui.js';
import { getMyWithdrawals, getMyProofs } from '../core/api.js';

bootAppPage({
  active: 'history',
  onReady: async ({ user }) => {
    const box = document.getElementById('histBox');
    if (!box) return;
    box.innerHTML = '<div class="loading-line"><i class="fa-solid fa-spinner fa-spin"></i> লোড হচ্ছে...</div>';
    const [rows, subs] = await Promise.all([
      getMyWithdrawals(user.uid).catch(() => []),
      getMyProofs(user.uid, 20).catch(() => []),
    ]);
    document.getElementById('histCount').textContent = rows.length;

    /* ---------- Task Submissions (pending/approved/rejected) ---------- */
    const subBox = document.getElementById('subBox');
    if (subBox) {
      if (!subs.length) {
        subBox.innerHTML = '<p class="muted" style="font-size:13px;padding:6px 0">এখনো কোনো জমা নেই।</p>';
      } else {
        subBox.innerHTML = subs.map(s => {
          const cls = s.status === 'approved' ? 'paid' : s.status === 'rejected' ? 'rejected' : 'pending';
          const ico = s.status === 'approved' ? 'fa-circle-check' : s.status === 'rejected' ? 'fa-circle-xmark' : 'fa-hourglass-half';
          const label = s.status === 'approved' ? 'অনুমোদিত' : s.status === 'rejected' ? 'বাতিল' : 'রিভিউ চলছে';
          return `
          <div class="hist-item">
            <div class="h-ico ${cls}"><i class="fa-solid ${ico}"></i></div>
            <div class="h-info">
              <b>${esc(s.taskName || s.taskSlug)} • ${fmtBDT(s.reward)}</b>
              <span>${fmtDate(s.createdAt)}${s.status === 'rejected' && s.note ? ` • ${esc(s.note)}` : ''}</span>
            </div>
            <span class="h-status ${cls}">${label}</span>
          </div>`;
        }).join('');
      }
    }

    if (!rows.length && !subs.length) {
      box.innerHTML = `
        <div class="card empty-card">
          <i class="fa-solid fa-receipt empty-ico"></i>
          <h3>কোনো রেকর্ড পাওয়া যায়নি!</h3>
          <p class="muted">আপনি এখনো কোনো উইথড্র রিকোয়েস্ট বা কাজ জমা দেননি।</p>
          <a href="/wallet.html" class="btn btn-gold" style="margin-top:10px">টাকা তুলুন</a>
        </div>
        <div class="back-link"><a href="/wallet.html"><i class="fa-solid fa-arrow-left"></i> উইথড্র পেজে ফিরে যান</a></div>`;
      return;
    }
    box.innerHTML = `
      <div class="hist-list">
        ${rows.map(w => {
          const ico = w.status === 'paid' ? 'fa-circle-check' : w.status === 'rejected' ? 'fa-circle-xmark' : 'fa-hourglass-half';
          const label = w.status === 'pending' ? 'অপেক্ষমাণ' : w.status === 'paid' ? 'পেমেন্ট পাঠানো হয়েছে' : 'বাতিল';
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
      <div class="back-link"><a href="/wallet.html"><i class="fa-solid fa-arrow-left"></i> উইথড্র পেজে ফিরে যান</a></div>`;
  },
});
