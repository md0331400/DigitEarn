import '../styles.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { bootAppPage, toast, esc, videoEmbedHtml, fmtDate } from '../core/ui.js';
import { getTaskBySlug, getTodaySales, submitProof } from '../core/api.js';
import { TASKS } from '../tasks-data.js';

const slug = document.body.dataset.taskSlug || '';
const staticTask = TASKS.find(t => t.slug === slug) || { nameBn: 'প্রজেক্ট', nameEn: '', icon: 'fa-solid fa-star', color: '#f59e0b', reward: 0, url: '', steps: [], locked: false };

// flash রোধ: auth state পাকা হওয়া পর্যন্ত header button ও form box লোডিং দেখাবে
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
    // Firestore doc থাকলেও ফাঁকা field গুলো static data থেকে ভরে নাও
    task = { ...staticTask, ...task, reward: Number(task.reward) || Number(staticTask.reward) || 0 };

    // logged-in: Register button সার্বক্ষণিক মুছে ফেল, Dashboard দেখাও
    document.getElementById('hdrReg')?.remove();
    document.getElementById('hdrDash')?.classList.remove('hdr-hide');

    if (stepsEl) {
      const steps = task.steps && task.steps.length ? task.steps : staticTask.steps;
      if (steps && steps.length) {
        stepsEl.innerHTML = steps.map((s, i) => `<li><span class="step-num">${i + 1}</span>${esc(s)}</li>`).join('');
      }
    }
    // reflect live rate
    const rate = Number(task.reward) || 0;
    document.querySelectorAll('[data-reward]').forEach(el => { el.dataset.reward = rate; });
    document.querySelectorAll('.reward-pill').forEach(el => { el.textContent = `Rate: ৳${rate.toFixed(2)}`; });

    // per-project video guide — admin panel থেকে tasks/{slug}.videoUrl সেট করলেই দেখাবে
    const vidSlot = document.getElementById('taskVideo');
    if (vidSlot) {
      const vu = task.videoUrl || '';
      const embed = videoEmbedHtml(vu);
      if (embed) {
        vidSlot.innerHTML = `<div class="video-card"><p class="video-note"><i class="fa-solid fa-circle-play" style="color:var(--gold-deep)"></i> ${esc(task.nameBn)} Video Guide</p><div class="video-box">${embed}</div></div>`;
      } else if (vu) {
        vidSlot.innerHTML = `<div class="video-card"><p class="video-note"><i class="fa-solid fa-circle-play" style="color:var(--gold-deep)"></i> ${esc(task.nameBn)} Video Guide</p><a href="${esc(vu)}" target="_blank" rel="noopener" class="btn btn-indigo btn-block" style="margin-top:10px"><i class="fa-solid fa-arrow-up-right-from-square"></i> Open Video Link</a></div>`;
      }
    }

    const render = async () => {
      if (task.locked) {
        if (!user.isActive) {
          // locked project + inactive account → activation page-এ নিয়ে যাবে
          box.innerHTML = `
          <div class="lock-card">
            <div class="lock-ico"><i class="fa-solid fa-lock"></i></div>
            <h3>এই প্রজেক্টটি অ্যাক্টিভ একাউন্টে খোলে</h3>
            <p>আপনার একাউন্ট অ্যাক্টিভ করলেই এই প্রিমিয়াম প্রজেক্ট আনলক হয়ে যাবে। ৳${Number(settings.activationFee) || 30} deposit করলেই অ্যাক্টিভ + ${esc(settings.activationBonus)} টাকা বোনাস!</p>
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
          <div class="notice-orange"><i class="fa-solid fa-circle-info"></i><div>Account বিক্রি করতে আগে নিজের একাউন্ট অ্যাক্টিভ করতে হবে — ৳${Number(settings.activationFee) || 30} deposit করলেই অ্যাক্টিভ + ${esc(settings.activationBonus)} টাকা বোনাস!</div></div>
          <a href="/deposit.html" class="btn btn-orange btn-block" style="margin-top:12px"><i class="fa-solid fa-bolt"></i> Deposit করে অ্যাক্টিভ করুন</a>`;
        return;
      }

      /* MARKETPLACE: form সবসময় খোলা — একদিনে একাধিক account বিক্রি করা যায়।
         আগের submission গুলো নিচে "আজকের জমা" লিস্টে দেখা যাবে। */
      const sales = await getTodaySales(user.uid, slug).catch(() => []);

      const F_TYPES = ['text', 'email', 'password', 'tel', 'number', 'url'];
      const fields = (Array.isArray(task.inputFields) ? task.inputFields : []).filter(f => typeof f.label === 'string' && f.label.trim());
      const fkey = f => String(f.label).trim().slice(0, 50);
      const iconOf = { text: 'fa-pen', email: 'fa-envelope', password: 'fa-lock', tel: 'fa-mobile-screen', number: 'fa-hashtag', url: 'fa-link' };
      const phOf = { text: 'এখানে লিখুন', email: 'example@gmail.com', password: 'পাসওয়ার্ড লিখুন', tel: '01XXXXXXXXX', number: 'সংখ্যা লিখুন', url: 'https://…' };
      const safeUrl = /^https?:\/\//i.test(task.url || '') ? task.url : '';
      // admin panel থেকে সেট করা per-project লেখা (না থাকলে fallback)
      const submitLabel = String(task.submitLabel || '').trim() || `SUBMIT ${(task.nameEn || task.nameBn || 'ACCOUNT').toUpperCase()}`;
      const historyLabel = String(task.historyLabel || '').trim() || 'View Sales History';

      const fieldsHtml = fields.map((f, i) => {
        const type = F_TYPES.includes(f.type) ? f.type : 'text';
        const maxLen = type === 'url' ? 300 : type === 'email' ? 120 : type === 'tel' ? 20 : 100;
        const ph = String(f.placeholder || '').trim() || phOf[type];
        return `
          <label class="fld-label">${esc(fkey(f))} ${f.required ? '<b style="color:#dc2626">*</b>' : ''}</label>
          <div class="field">
            <i class="fa-solid ${iconOf[type]} left"></i>
            <input type="${type}" data-tf="${i}" maxlength="${maxLen}" placeholder="${esc(ph)}" autocomplete="off" spellcheck="false">
          </div>`;
      }).join('');

      const soldBadge = s => {
        const cls = s.status === 'approved' ? 'paid' : s.status === 'rejected' ? 'rejected' : 'pending';
        const label = s.status === 'approved' ? 'Approved' : s.status === 'rejected' ? 'Rejected' : 'Pending';
        return `<span class="h-status ${cls}">${label}</span>`;
      };
      const idOf = s => {
        const d = s.submittedData || {};
        const k = Object.keys(d).find(x => !/pass|2fa|cookie/i.test(x));
        return k ? d[k] : (s.accountKey || '').split('__')[1] || '—';
      };
      const salesHtml = sales.length ? `
        <div class="card" style="margin-top:14px">
          <h4 class="sec-title"><i class="fa-solid fa-clock-rotate-left" style="color:var(--gold-deep)"></i> আজকে জমা দেওয়া account (${sales.length})</h4>
          <div class="hist-list">
            ${sales.map(s => `
              <div class="hist-item">
                <div class="h-info">
                  <b>${esc(idOf(s))}</b>
                  <span>৳${(Number(s.reward) || 0).toFixed(2)} • ${fmtDate(s.createdAt)}${s.status === 'rejected' && s.note ? ` • ${esc(s.note)}` : ''}</span>
                </div>
                ${soldBadge(s)}
              </div>`).join('')}
          </div>
        </div>` : '';

      box.innerHTML = `
        ${safeUrl ? `<a href="${esc(safeUrl)}" target="_blank" rel="noopener" class="btn btn-gold btn-block"><i class="fa-solid fa-link"></i> লিংক ওপেন করুন</a>` : ''}
        <div class="card proof-card" style="margin-top:14px">
          <h4 class="sec-title"><i class="${esc(task.icon || 'fa-solid fa-store')}" style="color:${/^#[0-9a-fA-F]{3,8}$/.test(task.color || '') ? task.color : 'var(--gold-deep)'}"></i> ${esc(task.nameBn)} <span class="reward-pill" style="float:right">Rate: ৳${rate.toFixed(2)}</span></h4>
          ${task.description ? `<p class="muted" style="margin:8px 0 12px;font-size:13.5px;line-height:1.55">${esc(task.description)}</p>` : ''}

          <div class="notice-orange" style="margin-bottom:12px">
            <i class="fa-solid fa-triangle-exclamation"></i>
            <div><b>নিজের ব্যক্তিগত account দেবেন না।</b> শুধু যে account আপনি <b>বিক্রি করতে চান</b> সেটাই জমা দিন। Approve হলে account আমাদের হয়ে যাবে এবং ফেরত দেওয়া হবে না।</div>
          </div>

          ${task.password ? `
          <div class="pw-box">
            <span class="pw-label"><i class="fa-solid fa-key"></i> পাসওয়ার্ড রিকোয়ারমেন্ট:</span>
            <div class="pw-row"><b>${esc(task.password)}</b><button type="button" id="pwCopyBtn" class="pw-copy"><i class="fa-solid fa-copy"></i> COPY</button></div>
          </div>
          <p class="muted" style="font-size:12.5px;margin:-2px 0 12px">যে account বিক্রি করবেন তার পাসওয়ার্ড <b>এটাই</b> সেট করে তারপর জমা দিন।</p>` : ''}

          <div class="steps-list" style="margin-bottom:${fieldsHtml ? '6px' : '14px'}">
            <div class="step-line"><b class="step-num">১</b><span>যে account বিক্রি করবেন তার পাসওয়ার্ড উপরের মতো সেট করুন</span></div>
            <div class="step-line"><b class="step-num">২</b><span>নিচের ঘরগুলোতে <b>সেই account</b>-এর তথ্য দিন</span></div>
            <div class="step-line"><b class="step-num">৩</b><span>Submit করুন — admin <b>approve</b> করলেই +৳${rate.toFixed(2)} ব্যালেন্সে যোগ হবে</span></div>
          </div>
          ${fieldsHtml}
          ${settings.admin1Link ? `<a href="${esc(settings.admin1Link)}" target="_blank" rel="noopener" class="btn-teal"><i class="fa-brands fa-telegram"></i> ${esc(settings.admin1Name)}-এর সাথে চ্যাট করুন</a>` : ''}
          <button type="button" id="proofSubmitBtn" class="btn btn-green btn-block" style="margin-top:12px"><i class="fa-solid fa-paper-plane"></i> ${esc(submitLabel)}</button>
          <a href="/history.html" class="btn btn-gray btn-block" style="margin-top:10px"><i class="fa-solid fa-clock-rotate-left"></i> ${esc(historyLabel)}</a>
        </div>
        ${salesHtml}`;

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
          toast('Account জমা হয়েছে — admin approve করলেই টাকা যোগ হবে');
          render(); // form খালি হয়ে আবার আসবে — পরের account জমা দিতে পারবেন
        } catch (err) {
          toast(err.message, 'error');
          btn.disabled = false;
          btn.innerHTML = `<i class="fa-solid fa-paper-plane"></i> ${submitLabel}`;
        }
      });
    };
    await render();
  },
});
