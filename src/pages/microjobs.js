import '../styles.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { bootAppPage, toast, esc, videoEmbedHtml, fmtDate } from '../core/ui.js';
import { getMicrojobs, getJobView, submitProof } from '../core/api.js';
import { ST, sortJobs, remainingOf, leftBadge, bnDigits, userCopy } from '../core/microjobs.js';
import { cleanFields, fieldsHtml, readFields, paintErrors, mountImageFields, stateBannerHtml } from '../core/jobform.js';

/* MicroJobs = admin Panel → "MicroJobs" থেকে বানানো job গুলোর আলাদা সিস্টেম।
     ⚠️ user-facing copy-এ admin workflow বোঝানো লেখা আসবে না (§7) — শুধু কাজের তথ্য,
     রেয়ার্ড, নিয়ম আর submit। এখানে পুরোনো ফেসবুক/জিমাইল/ইন্সট্রাগ্রাম টাস্কও আসে না, আর কিছুই
   hardcode নয় — list = শুধু microjob doc (kind==='microjob')। admin ৫টা বানালে ৫টা
   card, ১০টা বানালে ১০টা card, ০টা বানালে খালি অবস্থা। */

const money = n => '৳' + bnDigits((Number(n) || 0).toFixed(2));
const imgUrl = v => (typeof v === 'string' && /^https?:\/\/\S+$/i.test(v)) ? v : '';
const imgData = v => (typeof v === 'string' && /^data:image\/(png|jpe?g|webp|gif);base64,/i.test(v)) ? v : '';

const STATE_CHIP = {
  [ST.PENDING]: '<span class="mj-state pending"><i class="fa-solid fa-hourglass-half"></i> জমা দেওয়া হয়েছে — রিভিউ চলছে</span>',
  [ST.RESUBMIT]: '<span class="mj-state reject"><i class="fa-solid fa-triangle-exclamation"></i> কাজটি বাতিল — ঠিক করে আবার জমা দিন</span>',
  [ST.APPROVED]: '<span class="mj-state ok"><i class="fa-solid fa-check"></i> সম্পন্ন ✓</span>',
  [ST.FULL]: '<span class="mj-state full"><i class="fa-solid fa-lock"></i> সব জায়গা পূর্ণ</span>',
};

/** একটা job = একটা আলাদা card/post (reference UI: ছবি + "N জন বাকি" + লেখা + রেয়ার্ড) */
function jobCard(v) {
  const badge = leftBadge(v);
  const pic = imgUrl(v.image) || imgData(v.image);
  const color = /^#[0-9a-fA-F]{3,8}$/.test(v.color || '') ? v.color : '#f59e0b';
  const icon = /^fa-(solid|regular|brands) [a-z0-9-]+$/.test(v.icon || '') ? v.icon : 'fa-solid fa-hand-holding-dollar';
  const chip = STATE_CHIP[v.state] || '';
  return `
    <a class="mj-card${v.state === ST.PENDING ? ' is-pending' : ''}${v.state === ST.RESUBMIT ? ' is-reject' : ''}" href="#job-${esc(v.slug)}">
      <div class="mj-media">
        ${pic ? `<img src="${esc(pic)}" alt="${esc(userCopy(v.nameBn || v.slug))}" loading="lazy" onerror="this.hidden=true;this.nextElementSibling.hidden=false">` : ''}
        <div class="mj-fallback" ${pic ? 'hidden' : ''} style="color:${color}"><i class="${icon}"></i></div>
        ${badge.text ? `<span class="mj-left ${badge.full ? 'full' : ''}">${badge.full ? '<i class="fa-solid fa-lock"></i>' : '<i class="fa-solid fa-user-group"></i>'} ${esc(badge.text)}</span>` : ''}
        ${v.locked ? '<span class="mj-lock"><i class="fa-solid fa-lock"></i></span>' : ''}
      </div>
      <div class="mj-body">
        <h3 class="mj-name">${esc(userCopy(v.nameBn || v.slug))}</h3>
        ${v.shortDesc ? `<p class="mj-desc">${esc(userCopy(v.shortDesc))}</p>` : ''}
        ${chip}
        <div class="mj-foot">
          <span class="mj-reward"><i class="fa-solid fa-sack-dollar"></i> ${money(v.reward)}</span>
          <span class="mj-open">জব খুলুন <i class="fa-solid fa-arrow-right"></i></span>
        </div>
      </div>
    </a>`;
}

bootAppPage({
  active: 'home',
  onReady: async ({ user }) => {
    const box = document.getElementById('mjBox');
if (!box) return;
    /* §10: একাউন্ট একটিভ না হলে submit বন্ধ (serverও আলাদা করে এটা check করে) */
    const accountActive = user.isActive !== false;
    const actOpts = { accountActive };

    const drawList = async () => {
      box.innerHTML = '<div class="loading-line"><i class="fa-solid fa-spinner fa-spin"></i> লোড হচ্ছে...</div>';
const { all } = await getMicrojobs(user.uid, actOpts);
      /* শুধু সেই job গুলো যেগুলো এই user-এর জন্য এখনো বাকি (approved/hidden/FULL বাদ),
         + pending job থাকে (card হারায় না, শুধু submit বন্ধ হয়) */
      const jobs = sortJobs(all.filter(v => v.visible || v.state === ST.PENDING));
      box.innerHTML = `
        <a class="mj-history" href="/history.html">
          <span class="mj-history-ico"><i class="fa-solid fa-clock-rotate-left"></i></span>
          <span><b>আপনার জমা দেওয়া কাজ</b><small>সব জমা ও অবস্থা দেখুন</small></span>
          <i class="fa-solid fa-arrow-right"></i>
        </a>
        ${jobs.length
          ? `<div class="mj-grid">${jobs.map(jobCard).join('')}</div>`
          : `<div class="mj-empty"><i class="fa-solid fa-inbox"></i>
              <p><b>এখন কোনো কাজ নেই</b><br>শীঘ্রই নতুন কাজ যোগ হবে — একটু পরে আবার দেখুন।</p>
              <a href="/dashboard.html" class="btn btn-gold btn-sm"><i class="fa-solid fa-house"></i> হোমে ফিরে যান</a></div>`}`;
    };

    const drawDetail = async (slug) => {
      box.innerHTML = '<div class="loading-line"><i class="fa-solid fa-spinner fa-spin"></i> লোড হচ্ছে...</div>';
const { task, view, proofs, wrongSystem, notPublic } = await getJobView(user.uid, slug, actOpts);
      if (!task) {
        box.innerHTML = `<div class="mj-empty"><i class="fa-solid fa-circle-exclamation"></i>
          <p><b>${notPublic ? 'এই কাজটি এখন চালু নেই' : wrongSystem ? 'এই পেজে শুধু মাইক্রো জব খোলে' : 'কাজটি পাওয়া যায়নি'}</b><br>${notPublic || wrongSystem ? 'তালিকায় থাকা অন্য কাজটি করে আয় শুরু করুন।' : 'এই কাজটি এখন করা যাচ্ছে না।'}</p>
          <a class="btn btn-gold btn-sm" href="#list"><i class="fa-solid fa-arrow-left"></i> সব কাজ</a></div>`;
        return;
      }
      const v = view || { ...task, slug };
      const state = v.state || ST.AVAILABLE;
      const gate = v.gate || { allowed: true, label: 'জমা দিন' };
      const fields = cleanFields(task.inputFields);
      const pic = imgUrl(task.image) || imgData(task.image);
      const left = remainingOf(task);
      const safeUrl = /^https?:\/\//i.test(task.url || '') ? task.url : '';
      const video = videoEmbedHtml(task.videoUrl || '');
      const steps = Array.isArray(task.steps) ? task.steps.filter(Boolean) : [];

      box.innerHTML = `
        <div class="mj-back"><a href="#list"><i class="fa-solid fa-arrow-left"></i> সব মাইক্রো জব</a></div>
        <article class="mj-detail">
          ${pic ? `<div class="mj-detail-media"><img src="${esc(pic)}" alt="${esc(userCopy(task.nameBn || slug))}" onerror="this.hidden=true"></div>` : ''}
          <header class="mj-detail-head">
            <h2>${esc(userCopy(task.nameBn || slug))}</h2>
            <div class="mj-chips">
              <span class="mj-chip gold"><i class="fa-solid fa-sack-dollar"></i> প্রতি জবে ${money(task.reward)}</span>
              ${left === null ? '' : `<span class="mj-left ${left <= 0 ? 'full' : ''}"><i class="fa-solid fa-user-group"></i> ${bnDigits(left)} জন বাকি (মোট ${bnDigits(Number(task.requiredUsers) || 0)})</span>`}
              ${Number(task.approvedCount) > 0 ? `<span class="mj-done"><i class="fa-solid fa-check"></i> ${bnDigits(Number(task.approvedCount))} জন সম্পন্ন</span>` : ''}
            </div>
            ${task.shortDesc ? `<p class="mj-desc">${esc(userCopy(task.shortDesc))}</p>` : ''}
          </header>

          ${stateBannerHtml(task, state, gate)}

          ${steps.length ? `<section class="mj-sec"><h4 class="sec-title"><i class="fa-solid fa-list-ordered"></i> কাজের নিয়ম</h4>
            <ol class="mj-steps">${steps.map((x, i) => `<li><span class="step-num">${bnDigits(i + 1)}</span>${esc(userCopy(x))}</li>`).join('')}</ol></section>` : ''}
          ${task.description ? `<section class="mj-sec"><h4 class="sec-title"><i class="fa-solid fa-circle-info"></i> বিবরণ</h4><p class="mj-desc">${esc(userCopy(task.description))}</p></section>` : ''}
          ${video ? `<section class="mj-sec"><h4 class="sec-title"><i class="fa-solid fa-circle-play"></i> ভিডিও গাইড</h4><div class="video-box">${video}</div></section>` : ''}
          ${safeUrl ? `<a class="btn btn-gold btn-block mj-open-link" href="${esc(safeUrl)}" target="_blank" rel="noopener"><i class="fa-solid fa-arrow-up-right-from-square"></i> কাজের লিংক খুলুন</a>` : ''}

          <section class="mj-sec mj-form-sec">
            <h4 class="sec-title"><i class="fa-solid fa-file-signature"></i> ${state === ST.RESUBMIT ? 'আবার জমা দিন' : 'কাজের রিপোর্ট'}</h4>
            ${fields.length ? fieldsHtml(fields) : `<p class="muted" style="font-size:13px">কাজটি শেষ করে নিচের বাটনে জমা দিন — অনুমোদন হলেই টাকা যোগ হবে।</p>`}
            ${accountActive ? '' : `<a class="btn btn-gold btn-block" href="/deposit.html" style="margin-bottom:8px"><i class="fa-solid fa-bolt"></i> একাউন্ট একটিভ করুন</a>`}
            <button type="button" id="mjSubmit" class="btn ${gate.allowed ? 'btn-green' : 'btn-gray'} btn-block" style="margin-top:12px"${gate.allowed ? '' : ' disabled'}>
              <i class="fa-solid ${gate.allowed ? 'fa-paper-plane' : 'fa-hourglass-half'}"></i> ${esc(gate.allowed ? (state === ST.RESUBMIT ? 'আবার জমা দিন' : 'জমা দিন') : gate.label)}
            </button>
          </section>

          ${proofs.length ? `<section class="mj-sec"><h4 class="sec-title"><i class="fa-solid fa-clock-rotate-left"></i> আপনার জমা (${bnDigits(proofs.length)})</h4>
            <div class="hist-list">${proofs.slice().reverse().map(p => `
              <div class="hist-item">
                <div class="h-info"><b>${esc(userCopy(p.taskName || task.nameBn || slug))}</b>
                  <span>${money(p.reward)} • ${fmtDate(p.createdAt)}${p.note ? ` • ${esc(p.note)}` : ''}</span></div>
                <span class="h-status ${p.status === 'approved' ? 'paid' : p.status === 'rejected' ? 'rejected' : 'pending'}">
                  ${p.status === 'approved' ? 'অনুমোদিত' : p.status === 'rejected' ? (p.hiddenForUser ? 'বাতিল (বন্ধ)' : 'বাতিল') : 'রিভিউ চলছে'}</span>
              </div>`).join('')}</div></section>` : ''}
        </article>`;

      if (fields.some(f => f.type === 'image')) mountImageFields(box, fields, { onError: msg => toast(msg, 'error') });
      if (!accountActive) toast('কাজ জমা দিতে আগে আপনার একাউন্ট একটিভ করুন', 'error');

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
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> জমা হচ্ছে...';
        try {
          await submitProof(user.uid, { taskSlug: slug, data });
          toast('জমা হয়েছে ✓ — অনুমোদন হলেই টাকা আপনার ব্যালেন্সে যোগ হবে');
          await drawDetail(slug);   // এখন pending → বাটন বন্ধ, "জমা দেওয়া হয়েছে" দেখাবে
        } catch (err) {
          toast(err.message, 'error');
          btn.disabled = false;
          btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> জমা দিন';
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
