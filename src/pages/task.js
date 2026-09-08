import '../styles.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { bootAppPage, toast, esc, videoEmbedHtml } from '../core/ui.js';
import { getTaskBySlug, getTodayProof, submitProof } from '../core/api.js';
import { TASKS } from '../tasks-data.js';

const slug = document.body.dataset.taskSlug || '';
const staticTask = TASKS.find(t => t.slug === slug) || { nameBn: 'টাস্ক', nameEn: '', icon: 'fa-solid fa-star', color: '#f59e0b', reward: 0, url: '', steps: [], locked: false };

// flash রোধ: auth state পাকা হওয়া পর্যন্ত header button ও claim box লোডিং দেখাবে
// (logged-in user কখনো "Register" দেখবে না)
(function hideUntilAuth() {
  const reg = document.getElementById('hdrReg');
  const dash = document.getElementById('hdrDash');
  const box = document.getElementById('taskActions');
  if (reg) reg.classList.add('hdr-hide');
  if (dash) dash.classList.add('hdr-hide');
  if (box) box.innerHTML = '<div class="loading-line"><i class="fa-solid fa-spinner fa-spin"></i> লোড হচ্ছে...</div>';
})();

bootAppPage({
  active: 'home',
  onReady: async ({ user, settings }) => {
    const box = document.getElementById('taskActions');
    const stepsEl = document.getElementById('taskSteps');
    if (!box) return;

    let task = await getTaskBySlug(slug).catch(() => null);
    if (!task) task = { ...staticTask, slug };

    // logged-in: Register button সার্বক্ষণিক মুছে ফেল, Dashboard দেখাও
    document.getElementById('hdrReg')?.remove();
    document.getElementById('hdrDash')?.classList.remove('hdr-hide');

    if (stepsEl) {
      const steps = task.steps && task.steps.length ? task.steps : staticTask.steps;
      if (steps && steps.length) {
        stepsEl.innerHTML = steps.map((s, i) => `<li><span class="step-num">${i + 1}</span>${esc(s)}</li>`).join('');
      }
    }
    // reflect live reward
    document.querySelectorAll('[data-reward]').forEach(el => { el.dataset.reward = task.reward; });
    document.querySelectorAll('.reward-pill').forEach(el => { el.textContent = `প্রতিদিন ৳${task.reward} রিওয়ার্ড`; });

    // per-project video guide — admin panel থেকে tasks/{slug}.videoUrl সেট করলেই দেখাবে
    const vidSlot = document.getElementById('taskVideo');
    if (vidSlot) {
      const vu = task.videoUrl || '';
      const embed = videoEmbedHtml(vu);
      if (embed) {
        vidSlot.innerHTML = `<div class="video-card"><p class="video-note"><i class="fa-solid fa-circle-play" style="color:var(--gold-deep)"></i> ভিডিও গাইড — দেখে কাজ করুন</p><div class="video-box">${embed}</div></div>`;
      } else if (vu) {
        vidSlot.innerHTML = `<div class="video-card"><p class="video-note"><i class="fa-solid fa-circle-play" style="color:var(--gold-deep)"></i> ভিডিও গাইড</p><a href="${esc(vu)}" target="_blank" rel="noopener" class="btn btn-indigo btn-block" style="margin-top:10px"><i class="fa-solid fa-arrow-up-right-from-square"></i> Open Video Link</a></div>`;
      }
    }

    const render = async () => {
      if (task.locked) {
        if (!user.isActive) {
          // locked task + inactive account → activation page-এ নিয়ে যাবে
          box.innerHTML = `
          <div class="lock-card">
            <div class="lock-ico"><i class="fa-solid fa-lock"></i></div>
            <h3>এই টাস্কটি অ্যাক্টিভ একাউন্টে খোলে</h3>
            <p>আপনার একাউন্ট অ্যাক্টিভ করলেই এই প্রিমিয়াম টাস্ক আনলক হয়ে যাবে। ৳${Number(settings.activationFee) || 30} deposit করলেই অ্যাক্টিভ + ${esc(settings.activationBonus)} টাকা বোনাস!</p>
            <a href="/deposit.html" class="btn btn-orange btn-block" style="margin-top:12px"><i class="fa-solid fa-bolt"></i> Deposit করে অ্যাক্টিভ করুন</a>
          </div>`;
          return;
        }
        box.innerHTML = `
          <div class="lock-card">
            <div class="lock-ico"><i class="fa-solid fa-lock"></i></div>
            <h3>এই প্রজেক্টটি এখনো লক করা আছে</h3>
            <p>শীঘ্রই খুলে দেওয়া হবে। আপডেট পেতে আমাদের টেলিগ্রাম চ্যানেলে জয়েন করুন।</p>
            <a href="${esc(settings.telegramLink)}" target="_blank" rel="noopener" class="btn-teal"><i class="fa-brands fa-telegram"></i> Join Telegram</a>
          </div>`;
        return;
      }
      if (!user.isActive) {
        box.innerHTML = `
          <div class="notice-orange"><i class="fa-solid fa-circle-info"></i><div>রিওয়ার্ড পেতে আপনার একাউন্ট অ্যাক্টিভ করতে হবে — ৳${Number(settings.activationFee) || 30} deposit করলেই অ্যাক্টিভ + ${esc(settings.activationBonus)} টাকা বোনাস!</div></div>
          <a href="/deposit.html" class="btn btn-orange btn-block" style="margin-top:12px"><i class="fa-solid fa-bolt"></i> Deposit করে অ্যাক্টিভ করুন</a>`;
        return;
      }

      // submission flow: আজকের submission-এর অবস্থা (server-এ approved হলেই reward যোগ হয়)
      const todayProof = await getTodayProof(user.uid, slug).catch(() => null);
      const thumbs = p => (p.images || []).map(u => `<img class="proof-thumb" src="${esc(u)}" alt="proof">`).join('');
      if (todayProof && todayProof.status === 'approved') {
        box.innerHTML = `
          <div class="ok-box proof-status-box"><i class="fa-solid fa-circle-check"></i> আপনার submission <b>Approve</b> হয়েছে — +৳${Number(todayProof.reward).toFixed(0)} আপনার ব্যালেন্সে যোগ হয়েছে</div>
          <div class="proof-thumbs">${thumbs(todayProof)}</div>`;
        return;
      }
      if (todayProof && todayProof.status === 'rejected') {
        box.innerHTML = `
          <div class="reject-box"><i class="fa-solid fa-circle-xmark"></i><div><b>আপনার submission Reject হয়েছে।</b>${todayProof.note ? `<span>${esc(todayProof.note)}</span>` : ''} আবার নতুন submission দিতে পারেন।</div></div>`;
      }
      if (todayProof && todayProof.status === 'pending') {
        box.innerHTML = `
          <div class="pending-box"><i class="fa-solid fa-hourglass-half"></i><div><b>Submission Review-এ আছে</b><span>Admin আপনার submission review করে approve করলেই +৳${Number(todayProof.reward).toFixed(0)} ব্যালেন্সে যোগ হবে।</span></div></div>
          <div class="proof-thumbs">${thumbs(todayProof)}</div>`;
        return;
      }

      /* নতুন submission form — fields admin panel-এর config থেকে (hardcoded নয়) */
      const F_TYPES = ['text', 'email', 'password', 'tel', 'number', 'url'];
      const fields = (Array.isArray(task.inputFields) ? task.inputFields : []).filter(f => typeof f.label === 'string' && f.label.trim());
      const fkey = f => String(f.label).trim().slice(0, 50);
      const iconOf = { text: 'fa-pen', email: 'fa-envelope', password: 'fa-lock', tel: 'fa-mobile-screen', number: 'fa-hashtag', url: 'fa-link' };
      const phOf = { text: 'এখানে লিখুন', email: 'email@example.com', password: '••••••••', tel: '01XXXXXXXXX', number: 'সংখ্যা লিখুন', url: 'https://…' };
      const safeUrl = /^https?:\/\//i.test(task.url || '') ? task.url : '';
      const fieldsHtml = fields.map((f, i) => {
        const type = F_TYPES.includes(f.type) ? f.type : 'text';
        const maxLen = type === 'url' ? 300 : type === 'email' ? 120 : type === 'tel' ? 20 : 100;
        return `
          <label class="fld-label">${esc(fkey(f))} ${f.required ? '<b style="color:#dc2626">*</b>' : ''}</label>
          <div class="field">
            <i class="fa-solid ${iconOf[type]} left"></i>
            <input type="${type}" data-tf="${i}" maxlength="${maxLen}" placeholder="${phOf[type]}" autocomplete="off">
          </div>`;
      }).join('');
      const stepsHtml = fields.length ? `
            <div class="step-line"><b class="step-num">১</b><span>উপরের লিংকে গিয়ে কাজ করুন</span></div>
            <div class="step-line"><b class="step-num">২</b><span>নিচের field-গুলো পূরণ করুন</span></div>
            <div class="step-line"><b class="step-num">৩</b><span>Submit করুন — admin <b>approve</b> করলেই +৳${Number(task.reward).toFixed(0)} ব্যালেন্সে যোগ হবে</span></div>` : `
            <div class="step-line"><b class="step-num">১</b><span>উপরের লিংকে গিয়ে কাজ করুন</span></div>
            <div class="step-line"><b class="step-num">২</b><span>কাজের স্ক্রিনশট <b>এডমিনকে Telegram-এ</b> পাঠিয়ে দিন</span></div>
            <div class="step-line"><b class="step-num">৩</b><span>নিচের বাটনে submit করুন — admin <b>approve</b> করলেই +৳${Number(task.reward).toFixed(0)} ব্যালেন্সে যোগ হবে</span></div>`;

      box.innerHTML = `
        ${safeUrl ? `<a href="${esc(safeUrl)}" target="_blank" rel="noopener" class="btn btn-gold btn-block"><i class="fa-solid fa-link"></i> লিংক ওপেন করে কাজ করুন</a>` : ''}
        <div class="card proof-card" style="margin-top:14px">
          <h4 class="sec-title"><i class="fa-solid fa-paper-plane" style="color:var(--gold-deep)"></i> কাজ শেষ? Submit করুন</h4>
          ${task.description ? `<p class="muted" style="margin-bottom:12px;font-size:13.5px;line-height:1.55">${esc(task.description)}</p>` : ''}
          ${task.password ? `
          <div class="pw-box">
            <span class="pw-label"><i class="fa-solid fa-key"></i> পাসওয়ার্ড রিকোয়ারমেন্ট:</span>
            <div class="pw-row"><b>${esc(task.password)}</b><button type="button" id="pwCopyBtn" class="pw-copy"><i class="fa-solid fa-copy"></i> COPY</button></div>
          </div>` : ''}
          <div class="steps-list" style="margin-bottom:${fieldsHtml ? '6px' : '14px'}">${stepsHtml}</div>
          ${fieldsHtml}
          ${settings.admin1Link ? `<a href="${esc(settings.admin1Link)}" target="_blank" rel="noopener" class="btn-teal"><i class="fa-brands fa-telegram"></i> ${esc(settings.admin1Name)}-এর সাথে চ্যাট করুন</a>` : ''}
          <button type="button" id="proofSubmitBtn" class="btn btn-green btn-block" style="margin-top:12px"><i class="fa-solid fa-paper-plane"></i> Submit করুন</button>
          <a href="/history.html" class="btn btn-gray btn-block" style="margin-top:10px"><i class="fa-solid fa-clock-rotate-left"></i> View Activity History</a>
        </div>`;

      const pwCopy = document.getElementById('pwCopyBtn');
      if (pwCopy) pwCopy.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(String(task.password || ''));
          toast('Password copy হয়েছে');
        } catch (_) { toast('Copy করতে পারা যায়নি', 'error'); }
      });

      const btn = document.getElementById('proofSubmitBtn');
      btn.addEventListener('click', async () => {
        // client pre-check (server-এ আবার পুরো validation হয়)
        const data = {};
        let firstBad = null;
        fields.forEach((f, i) => {
          const inp = box.querySelector(`[data-tf="${i}"]`);
          const v = inp ? inp.value.trim() : '';
          const type = F_TYPES.includes(f.type) ? f.type : 'text';
          if (f.required && !v && !firstBad) firstBad = inp;
          if (v && type === 'email' && !/^\S+@\S+\.\S+$/.test(v) && !firstBad) firstBad = inp;
          data[fkey(f)] = v;
        });
        if (firstBad) {
          toast('সব required field সঠিকভাবে পূরণ করুন', 'error');
          firstBad.focus();
          return;
        }
        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submit হচ্ছে...';
        try {
          await submitProof(user.uid, { taskSlug: slug, data });
          toast('Submission Submit হয়েছে — admin approval-এর অপেক্ষায় থাকুন');
          render();
        } catch (err) {
          toast(err.message, 'error');
          btn.disabled = false;
          btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Submit করুন';
        }
      });
    };
    await render();
  },
});
