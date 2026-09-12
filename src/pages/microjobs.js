import '../styles.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { bootAppPage, toast, esc, videoEmbedHtml, fmtDate } from '../core/ui.js';
import { getMicrojobs, getJobView, submitProof } from '../core/api.js';
import { ST, jobViewsSorted, remainingOf, leftBadge, bnDigits } from '../core/microjobs.js';
import { cleanFields, fieldsHtml, readFields, paintErrors, mountImageFields, stateBannerHtml } from '../core/jobform.js';

/* MicroJobs page = list + detail, এক পেজেই (hash routing)।
   ⚠️ কোনো card hardcode নয়: admin যত job বানায়, `tasks` collection-এ ততটা doc —
   প্রতিটা doc = একটা আলাদা card/post (§1)। নতুন job-এর জন্য আলাদা static page বা
   developer-এর দরকার নেই: #job-<slug> hash-এই detail খোলে। */

const money = n => '৳' + (Number(n) || 0).toFixed(2);
const imgUrl = v => (typeof v === 'string' && /^https?:\/\/\S+$/i.test(v)) ? v : '';
const imgData = v => (typeof v === 'string' && /^data:image\/(png|jpe?g|webp|gif);base64,/i.test(v)) ? v : '';

/** একটা job-এর card (list view) — image, "N জন বাকি", title, reward, status, View Job */
function jobCard(v) {
  const badge = leftBadge(v);
  const pic = imgUrl(v.image) || imgData(v.image);
  const color = /^#[0-9a-fA-F]{3,8}$/.test(v.color || '') ? v.color : '#f59e0b';
  const icon = /^fa-(solid|regular|brands) [a-z0-9-]+$/.test(v.icon || '') ? v.icon : 'fa-solid fa-hand-holding-dollar';
  const stateChip = v.state === ST.PENDING ? '<span class="mj-chip pending">Pending</span>'
    : v.state === ST.RESUBMIT ? '<span class="mj-chip reject">Rejected — আবার করুন</span>'
    : v.state === ST.APPROVED ? '<span class="mj-chip ok">Done ✓</span>'
    : v.state === ST.FULL || v.full ? '<span class="mj-chip full">FULL</span>' : '';
  return `
    <article class="mj-card${v.state === ST.PENDING ? ' is-pending' : ''}" data-job="${esc(v.slug)}">
      <div class="mj-media">
        ${pic ? `<img src="${esc(pic)}" alt="${esc(v.nameBn || v.slug)}" loading="lazy" onerror="this.hidden=true;this.nextElementSibling.hidden=false">` : ''}
        <div class="mj-fallback" ${pic ? 'hidden' : ''} style="color:${color}"><i class="${icon}"></i></div>
        ${v.locked ? '<span class="mj-lock"><i class="fa-solid fa-lock"></i></span>' : ''}
        ${badge.text ? `<span class="mj-left ${badge.full ? 'full' : ''}"><i class="fa-solid fa-users"></i> ${esc(badge.text)}</span>` : ''}
      </div>
      <div class="mj-body">
        <h3 class="mj-name">${esc(v.nameBn || v.slug)} ${stateChip}</h3>
        ${v.shortDesc ? `<p class="mj-desc">${esc(v.shortDesc)}</p>` : ''}
        <div class="mj-foot">
          <span class="mj-reward"><i class="fa-solid fa-sack-dollar"></i> ${money(v.reward)}</span>
          <a class="btn btn-green btn-sm" href="#job-${esc(v.slug)}"><i class="fa-solid fa-eye"></i> View Job</a>
        </div>
      </div>
    </article>`;
}

function emptyState(user) {
  return `<div class="mj-empty">
    <i class="fa-solid fa-inbox"></i>
    <p><b>এখন কোনো MicroJob চালু নেই</b><br>Admin Panel → Micro Jobs থেকে job বানালেই এখানে একেকটা job একেকটা card হিসেবে দেখাবে।</p>
    <a href="/dashboard.html" class="btn btn-gold btn-sm"><i class="fa-solid fa-gauge-high"></i> Dashboard</a>
  </div>`;
}

bootAppPage({
  active: 'home',
  onReady: async ({ user, settings }) => {
    const box = document.getElementById('mjBox');
    if (!box) return;

    const drawList = async () => {
      box.innerHTML = '<div class="loading-line"><i class="fa-solid fa-spinner fa-spin"></i> Job লোড হচ্ছে...</div>';
      const { all } = await getMicrojobs(user.uid);
      /* list = user-facing: ওই user approved/hidden করে ফেলা job বাদে বাকি সব (§9) */
      const jobs = jobViewsSorted(all);
      const doneCount = (all || []).filter(v => v.state === ST.APPROVED).length;
      box.innerHTML = `
        <div class="mj-stats">
          <div class="mj-stat"><b>${bnDigits(jobs.length)}</b><span>চালু Job</span></div>
          <div class="mj-stat"><b>${bnDigits(jobs.filter(v => v.state === ST.PENDING).length)}</b><span>আমার Pending</span></div>
          <div class="mj-stat"><b>${bnDigits(doneCount)}</b><span>Complete</span></div>
          <div class="mj-stat"><b>${money(user.balance)}</b><span>Balance</span></div>
        </div>
        ${jobs.length ? `<div class="mj-grid">${jobs.map(jobCard).join('')}</div>` : emptyState(user)}`;
    };

    const drawDetail = async (slug) => {
      box.innerHTML = '<div class="loading-line"><i class="fa-solid fa-spinner fa-spin"></i> লোড হচ্ছে...</div>';
      const { task, view, proofs } = await getJobView(user.uid, slug);
      if (!task) {
        box.innerHTML = `<div class="mj-empty"><i class="fa-solid fa-circle-exclamation"></i>
          <p><b>Job পাওয়া যায়নি</b><br>এই job-টি হয় বন্ধ হয়ে গেছে, হয় সরিয়ে দেওয়া হয়েছে।</p>
          <a class="btn btn-gold btn-sm" href="#list"><i class="fa-solid fa-arrow-left"></i> সব Job</a></div>`;
        return;
      }
      const v = view || { ...task, slug };
      const state = v.state || ST.AVAILABLE;
      const gate = v.gate || { allowed: true, label: 'Submit' };
      const fields = cleanFields(task.inputFields);
      const pic = imgUrl(task.image) || imgData(task.image);
      const left = remainingOf(task);
      const safeUrl = /^https?:\/\//i.test(task.url || '') ? task.url : '';
      const video = videoEmbedHtml(task.videoUrl || '');
      const steps = Array.isArray(task.steps) ? task.steps.filter(Boolean) : [];

      box.innerHTML = `
        <div class="mj-back"><a href="#list"><i class="fa-solid fa-arrow-left"></i> সব MicroJobs</a></div>
        <article class="mj-detail">
          ${pic ? `<div class="mj-detail-media"><img src="${esc(pic)}" alt="${esc(task.nameBn || slug)}" onerror="this.hidden=true"></div>` : ''}
          <header class="mj-detail-head">
            <h2>${esc(task.nameBn || slug)}</h2>
            <div class="mj-chips">
              <span class="mj-chip gold"><i class="fa-solid fa-sack-dollar"></i> প্রতি কাজে ${money(task.reward)}</span>
              ${left === null ? '' : `<span class="mj-left ${left <= 0 ? 'full' : ''}"><i class="fa-solid fa-users"></i> ${bnDigits(left)} জন বাকি (মোট ${bnDigits(Number(task.requiredUsers) || 0)})</span>`}
              ${Number(task.approvedCount) > 0 ? `<span class="mj-done"><i class="fa-solid fa-check"></i> ${bnDigits(Number(task.approvedCount))} জন complete</span>` : ''}
            </div>
            ${task.shortDesc ? `<p class="mj-desc">${esc(task.shortDesc)}</p>` : ''}
          </header>

          ${stateBannerHtml(task, state, gate)}

          ${steps.length ? `<section class="mj-sec"><h4 class="sec-title"><i class="fa-solid fa-list-ol"></i> কাজের নিয়ম (Full Instructions)</h4>
            <ol class="mj-steps">${steps.map((x, i) => `<li><span class="step-num">${i + 1}</span>${esc(x)}</li>`).join('')}</ol></section>` : ''}
          ${task.description ? `<section class="mj-sec"><h4 class="sec-title"><i class="fa-solid fa-circle-info"></i> বিবরণ</h4><p class="mj-desc">${esc(task.description)}</p></section>` : ''}
          ${video ? `<section class="mj-sec"><h4 class="sec-title"><i class="fa-solid fa-circle-play"></i> Tutorial Video</h4><div class="video-box">${video}</div></section>` : ''}
          ${safeUrl ? `<a class="btn btn-gold btn-block mj-open" href="${esc(safeUrl)}" target="_blank" rel="noopener"><i class="fa-solid fa-arrow-up-right-from-square"></i> কাজের লিংক ওপেন করুন</a>` : ''}

          <section class="mj-sec mj-form-sec">
            <h4 class="sec-title"><i class="fa-solid fa-file-signature"></i> ${state === ST.RESUBMIT ? 'Submit Again' : 'Work Report'}</h4>
            ${fields.length ? fieldsHtml(fields) : `<p class="muted" style="font-size:13px">এই job-এ শুধু Submit চাপলেই হবে — admin নিজে থেকে verify করবে।</p>`}
            <button type="button" id="mjSubmit" class="btn ${gate.allowed ? 'btn-green' : 'btn-gray'} btn-block" style="margin-top:12px"${gate.allowed ? '' : ' disabled'}>
              <i class="fa-solid ${gate.allowed ? 'fa-paper-plane' : 'fa-hourglass-half'}"></i> ${esc(gate.allowed ? (state === ST.RESUBMIT ? 'Submit Again' : 'Submit') : gate.label)}
            </button>
          </section>

          ${proofs.length ? `<section class="mj-sec"><h4 class="sec-title"><i class="fa-solid fa-clock-rotate-left"></i> আমার submissions (${bnDigits(proofs.length)})</h4>
            <div class="hist-list">${proofs.slice().reverse().map(p => `
              <div class="hist-item">
                <div class="h-info"><b>${esc(p.taskName || task.nameBn || slug)}</b>
                  <span>${money(p.reward)} • ${fmtDate(p.createdAt)}${p.note ? ` • ${esc(p.note)}` : ''}</span></div>
                <span class="h-status ${p.status === 'approved' ? 'paid' : p.status === 'rejected' ? 'rejected' : 'pending'}">
                  ${p.status === 'approved' ? 'Approved' : p.status === 'rejected' ? (p.hiddenForUser ? 'Rejected (closed)' : 'Rejected') : 'Pending'}</span>
              </div>`).join('')}</div></section>` : ''}
        </article>`;

      if (fields.some(f => f.type === 'image')) mountImageFields(box, fields, { onError: msg => toast(msg, 'error') });

      const btn = document.getElementById('mjSubmit');
      if (!gate.allowed || !btn) { if (btn) btn.disabled = true; return; }
      btn.addEventListener('click', async () => {
        const { data, errors } = readFields(box, fields);
        if (errors.length) {
          paintErrors(box, errors);
          toast(errors[0].why, 'error');
          errors[0].el?.focus?.();
          return;
        }
        paintErrors(box, [], false);
        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submit হচ্ছে...';
        try {
          await submitProof(user.uid, { taskSlug: slug, data });
          toast('Submit হয়েছে — admin approval-এর অপেক্ষায় ✓');
          await drawDetail(slug);   // state এখন pending → card/পেজে বাটন বন্ধ (§8)
        } catch (err) {
          toast(err.message, 'error');
          btn.disabled = false;
          btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Submit';
        }
      });
    };

    const route = () => {
      const m = String(location.hash || '').match(/^#job-([a-z0-9-]{2,60})$/i);
      if (m) drawDetail(m[1]); else drawList();
    };
    window.addEventListener('hashchange', route);
    await route();
  },
});
