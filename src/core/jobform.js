/* DigitEarn — MicroJob submission form (একটাই implementation)
   src/pages/task.js (SEO static task page) আর src/pages/microjobs.js (MicroJobs page +
   detail view) দুটোই এখান থেকে field render/validate করে — দুই জায়গায় আলাদা copy থাকলে
   একটাতে নিয়ম বদলালে অন্যটা ভুল message/bypass দিত (আগে তাই হতো: client pre-check আর
   server check আলাদা হয়ে "সব ফিল্ড পূরণ করুন" বলে কোন ফিল্ড বুঝা যেত না)।

   ⚠️ F_TYPES/F_MAXLEN = lib/http.js-এর FIELD_TYPES/FIELD_MAXLEN-এর mirror
   (tests/web-and-apk.mjs [L] মিল check করে) — নতুন type দুদিকেই বসাতে হবে। */
import { ST, submitGate, remainingOf, leftBadge, bnDigits, userCopy } from './microjobs.js';

/* ⚠️ এখানে src/core/ui.js import করা যাবে না — admin panel (src/admin/*) এই module-টা
   import করে, আর ui.js firebase.js টেনে আনে (admin-এর নিজস্ব firebase init আছে)।
   তাই ছোট helper গুলো এখানেই; user-facing toast দেয় caller (onError hook)। */
const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export const F_TYPES = ['text', 'email', 'password', 'tel', 'number', 'url', 'textarea', 'image'];
export const F_MAXLEN = { url: 300, email: 120, tel: 20, number: 60, textarea: 2000, text: 100, password: 100, image: 300000 };
export const ftype = t => (F_TYPES.includes(t) ? t : 'text');
export const maxlen = t => (t in F_MAXLEN ? F_MAXLEN[t] : 100);
export const fkey = f => String((f && f.label) || '').trim().slice(0, 50);

const ICON = { text: 'fa-pen', email: 'fa-envelope', password: 'fa-lock', tel: 'fa-mobile-screen', number: 'fa-hashtag', url: 'fa-link', textarea: 'fa-align-left', image: 'fa-image' };
const PH = { text: 'এখানে লিখুন', email: 'example@gmail.com', password: 'পাসওয়ার্ড লিখুন', tel: '01XXXXXXXXX', number: 'সংখ্যা লিখুন', url: 'https://…', textarea: 'এখানে লিখুন…', image: 'ছবি তুলুন / বাছাই করুন' };

/** admin config (task.inputFields) → safe field list — শুধু এগুলোই form-এ আসে */
export function cleanFields(inputFields) {
  return (Array.isArray(inputFields) ? inputFields : [])
    .filter(f => f && typeof f.label === 'string' && f.label.trim())
    .slice(0, 20)
    .map(f => ({
      label: fkey(f),
      type: ftype(f.type),
      placeholder: String(f.placeholder || '').slice(0, 60),
      required: !!f.required,
    }));
}

export function fieldsHtml(fields) {
  return fields.map((f, i) => {
    const type = ftype(f.type);
    const maxLen = maxlen(type);
    const ph = String(f.placeholder || '').trim() || PH[type];
    const label = `<label class="fld-label">${esc(userCopy(f.label))} ${f.required ? '<b style="color:#dc2626">*</b>' : ''}</label>`;
    if (type === 'image') {
      return `${label}
        <div class="field field-img" data-imgfield="${i}">
          <input type="file" accept="image/png,image/jpeg,image/webp" data-tf-img="${i}" hidden>
          <button type="button" class="btn btn-gray btn-sm jf-pick" data-tf-pick="${i}">
            <i class="fa-solid fa-camera"></i> ${esc(ph)}</button>
          <div class="jf-preview" data-tf-prev="${i}" hidden>
            <img alt="proof preview" data-tf-imgel="${i}">
            <span class="jf-size" data-tf-size="${i}"></span>
            <button type="button" class="jf-clear" data-tf-clear="${i}"><i class="fa-solid fa-xmark"></i></button>
          </div>
          <input type="hidden" data-tf="${i}" value="">
        </div>`;
    }
    const control = type === 'textarea'
      ? `<textarea class="tf-area" data-tf="${i}" rows="4" maxlength="${maxLen}" placeholder="${esc(ph)}" autocomplete="off" spellcheck="false"></textarea>`
      : `<input type="${type}" data-tf="${i}" maxlength="${maxLen}" placeholder="${esc(ph)}" autocomplete="off" spellcheck="false" autocapitalize="off">`;
    return `${label}
      <div class="field${type === 'textarea' ? ' field-area' : ''}">
        <i class="fa-solid ${ICON[type]} left"></i>
        ${control}
      </div>`;
  }).join('');
}

/* ---------- image → canvas resize → data URL (Storage bucket লাগে না) ----------
   Firestore doc limit 1MB: 220KB base64 ≈ 165KB image, ২টা field হলেও নিরাপদ */
export async function pickImage(file, { maxSide = 900, quality = 0.72, maxBytes = 220_000 } = {}) {
  if (!file || !/^image\/(png|jpe?g|webp)$/.test(file.type || '')) throw new Error('PNG/JPG/WEBP ছবি দিন');
  if (file.size > 8 * 1024 * 1024) throw new Error('ছবি 8MB-এর বড় না — ছোট করুন');
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise((resolve, reject) => {
      const im = new Image();
      im.onload = () => resolve(im);
      im.onerror = () => reject(new Error('ছবি পড়া যায়নি'));
      im.src = url;
    });
    let w = img.naturalWidth || img.width || 0, h = img.naturalHeight || img.height || 0;
    if (!w || !h) throw new Error('ছবির size বোঝা যায়নি');
    const scale = Math.min(1, maxSide / Math.max(w, h));
    w = Math.max(1, Math.round(w * scale)); h = Math.max(1, Math.round(h * scale));
    const cv = document.createElement('canvas');
    cv.width = w; cv.height = h;
    cv.getContext('2d').drawImage(img, 0, 0, w, h);
    let out = '', q = quality;
    for (let i = 0; i < 6; i++) {
      out = cv.toDataURL('image/jpeg', q);
      if (out.length <= maxBytes) break;
      q -= 0.12;
    }
    if (out.length > F_MAXLEN.image) throw new Error('ছবি ছোট করা যাচ্ছে না — আরেকটা ছবি দিন');
    return out;
  } finally {
    URL.revokeObjectURL(url);
  }
}

/** image field-এর file picker + preview বাঁধা (container এর ভেতরে) */
export function mountImageFields(container, fields, { onChange = () => {}, onError = () => {} } = {}) {
  fields.forEach((f, i) => {
    if (ftype(f.type) !== 'image') return;
    const input = container.querySelector(`[data-tf="${i}"]`);
    const file = container.querySelector(`[data-tf-img="${i}"]`);
    const prev = container.querySelector(`[data-tf-prev="${i}"]`);
    const imgEl = container.querySelector(`[data-tf-imgel="${i}"]`);
    const sizeEl = container.querySelector(`[data-tf-size="${i}"]`);
    container.querySelector(`[data-tf-pick="${i}"]`)?.addEventListener('click', () => file && file.click());
    container.querySelector(`[data-tf-clear="${i}"]`)?.addEventListener('click', () => {
      if (input) input.value = '';
      if (file) file.value = '';
      if (prev) prev.hidden = true;
      onChange(i, '');
    });
    file?.addEventListener('change', async () => {
      const btn = container.querySelector(`[data-tf-pick="${i}"]`);
      try {
        if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> প্রসেস হচ্ছে...'; }
        const dataUrl = await pickImage(file.files && file.files[0]);
        if (input) input.value = dataUrl;
        if (imgEl) imgEl.src = dataUrl;
        if (sizeEl) sizeEl.textContent = Math.round(dataUrl.length / 1024) + ' KB';
        if (prev) prev.hidden = false;
        onChange(i, dataUrl);
      } catch (err) {
        input && (input.value = '');
        if (prev) prev.hidden = true;
        onChange(i, '');
        onError(String(err.message || err));
      } finally {
        if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fa-solid fa-camera"></i> ' + esc('ছবি বদলান'); }
      }
    });
  });
}

/* ---------- validation: server (api/proof/submit.js) এর নিয়মের mirror ---------- */
export function readFields(container, fields) {
  const data = {};
  const errors = [];
  fields.forEach((f, i) => {
    const el = container.querySelector(`[data-tf="${i}"]`);
    const type = ftype(f.type);
    const raw = el ? String(el.value || '').trim() : '';
    const label = f.label || `ফিল্ড ${i + 1}`;
    let why = '';
    if (f.required && !raw) why = `“${label}” খালি রাখা যাবে না`;
    else if (raw && raw.length > maxlen(type)) why = `“${label}” সর্বোচ্চ ${maxlen(type)} অক্ষর`;
    else if (raw && type === 'email' && !/^\S+@\S+\.\S+$/.test(raw)) why = `“${label}”-এ সঠিক ইমেইল দিন (যেমন name@gmail.com)`;
    else if (raw && type === 'number' && !/^\d{1,30}(\.\d{1,6})?$/.test(raw)) why = `“${label}”-এ শুধু সংখ্যা লিখুন`;
    else if (raw && type === 'tel' && !/^01[3-9]\d{8}$/.test(raw.replace(/[\s-]/g, ''))) why = `“${label}”-এ সঠিক মোবাইল দিন (01XXXXXXXXX)`;
    else if (raw && type === 'url' && !/^https?:\/\/\S+$/i.test(raw)) why = `“${label}” লিংকটি http:// বা https:// দিয়ে শুরু করুন`;
    else if (raw && type === 'image' && !/^data:image\/(png|jpe?g|webp|gif);base64,/.test(raw)) why = `“${label}”-এ ছবি বাছাই করুন`;
    if (why) errors.push({ index: i, label, why, el });
    data[label] = raw;
  });
  return { data, errors };
}

/** inline error দেখানো/মোছা (task.js আর microjobs.js একই ব্যবহার করে) */
export function paintErrors(container, errors, show = true) {
  container.querySelectorAll('.tf-err').forEach(el => el.remove());
  if (!show) return;
  for (const e of errors) {
    const inp = e.el || container.querySelector(`[data-tf="${e.index}"]`);
    const p = document.createElement('p');
    p.className = 'tf-err';
    p.style.cssText = 'color:#dc2626;font-size:12px;margin:6px 0 0';
    p.textContent = e.why;
    (inp && inp.closest ? inp.closest('div') : container)?.appendChild(p);
  }
}

/* ---------- per-user state banner (এই user × এই job) ---------- */
export function stateBannerHtml(task, state, gate = submitGate(task, state)) {
  const left = remainingOf(task);
  const badge = leftBadge(task);
  const chips = [];
  if (badge.text) chips.push(`<span class="mj-left ${badge.full ? 'full' : ''}"><i class="fa-solid fa-users"></i> ${esc(badge.text)}</span>`);
  if (task && Number(task.approvedCount) > 0) chips.push(`<span class="mj-done"><i class="fa-solid fa-check"></i> ${bnDigits(Number(task.approvedCount) || 0)} জন সম্পন্ন</span>`);
  const head = chips.length ? `<div class="mj-chips">${chips.join('')}</div>` : '';
  if (state === ST.PENDING) {
    return head + `<div class="mj-note pending"><i class="fa-solid fa-hourglass-half"></i><div>
      <b>আপনি এটি জমা দিয়েছেন</b><br>জমাটি রিভিউতে আছে — অনুমোদন হলেই ৳${(Number(task.reward) || 0).toFixed(2)} আপনার ব্যালেন্সে যোগ হবে।
    </div></div>`;
  }
  if (state === ST.APPROVED) {
    return head + `<div class="mj-note ok"><i class="fa-solid fa-circle-check"></i><div>
      <b>এই কাজটি আপনি সম্পন্ন করেছেন ✓</b><br>টাকা আপনার ব্যালেন্সে যোগ হয়েছে। এটি আর জমা দেওয়া যাবে না।
    </div></div>`;
  }
  if (state === ST.AVAILABLE && gate && gate.allowed === false) {
    /* যেমন একাউন্ট এখনো একটিভ হয়নি — gate-এর কারণটাই user-কে বলা হয় */
    return head + `<div class="mj-note warn"><i class="fa-solid fa-circle-exclamation"></i><div>
      <b>${esc(gate.label || 'এই কাজটি এখন করার জন্য খোলা নেই')}</b><br>সমস্যা থাকলে সাপোর্টে যোগাযোগ করুন।
    </div></div>`;
  }
  if (state === ST.HIDDEN) {
    return head + `<div class="mj-note warn"><i class="fa-solid fa-ban"></i><div>
      <b>কাজটি বাতিল হয়েছে</b><br>এই কাজটি আপনার জন্য বন্ধ করে দেওয়া হয়েছে। অন্য কাজ করে আয় করুন।
    </div></div>`;
  }
  if (state === ST.RESUBMIT) {
    return head + `<div class="mj-note reject"><i class="fa-solid fa-triangle-exclamation"></i><div>
      <b>⚠ কাজটি বাতিল হয়েছে</b><br>কাজটি ঠিকভাবে সম্পূর্ণ করে আবার জমা দিন। নিচের ফর্মে সংশোধন করে <b>আবার জমা দিন</b> বাটন চাপুন।
    </div></div>`;
  }
  if (state === ST.FULL || (badge.full && state !== ST.PENDING)) {
    return head + `<div class="mj-note warn"><i class="fa-solid fa-lock"></i><div>
      <b>এই কাজটি বন্ধ — সব জায়গা পূর্ণ</b><br>${left === 0 ? 'সব জায়গা পূরণ হয়ে গেছে, তাই এই কাজটি এখন বন্ধ।' : 'এই কাজে নতুন জমা বন্ধ আছে।'}
    </div></div>`;
  }
  return head;
}

/** submit button-এর অবস্থা (pending/hidden/full হলে disabled) */
export function gateOf(task, state) {
  return submitGate(task, state);
}
