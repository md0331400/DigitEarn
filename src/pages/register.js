import '../styles.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db, firebaseReady } from '../core/firebase.js';
import { registerUser, friendlyError, callApi } from '../core/api.js';
import { toast, videoEmbedHtml, videoSoonHtml } from '../core/ui.js';
import { getSettings } from '../core/store.js';

const form = document.getElementById('registerForm');
const errBox = document.getElementById('registerError');

const $f = n => form.querySelector(`[name="${n}"]`);
const $m = id => document.getElementById(id);

// prefill referral code from ?ref=
const refFromUrl = new URLSearchParams(location.search).get('ref');
const refInput = document.getElementById('refCode');
if (refInput && refFromUrl) refInput.value = refFromUrl;

// tutorial video — admin panel থেকে settings.videoUrl বদলালেই এটা বদলে যাবে;
// link না থাকলে "Video Coming Soon" দেখাবে
const videoBox = document.getElementById('registerVideo');
if (videoBox) {
  videoBox.innerHTML = videoSoonHtml('Video Coming Soon');
  getSettings()
    .then(settings => {
      const html = videoEmbedHtml(settings.videoUrl);
      if (html) videoBox.innerHTML = html;
    })
    .catch(() => {});
}

if (firebaseReady) {
  onAuthStateChanged(auth, u => { if (u) location.replace('/dashboard.html'); });
}

document.querySelectorAll('.eye').forEach(btn => {
  btn.addEventListener('click', () => {
    const input = btn.parentElement.querySelector('input');
    if (!input) return;
    const show = input.type === 'password';
    input.type = show ? 'text' : 'password';
    btn.querySelector('i').className = show ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye';
  });
});

/* ============================================================
   LIVE VALIDATION — field লেখার সাথে সাথে green/red
   ============================================================ */

const state = {
  ref: { ok: false, checked: false, timer: null },
  mobile: { ok: false, checked: false, timer: null },
  email: { ok: false, checked: false, timer: null },
};

function setField(input, msgEl, status, msg) {
  const wrap = input.closest('.field');
  wrap.classList.remove('valid', 'invalid');
  if (status === 'ok') wrap.classList.add('valid');
  if (status === 'err') wrap.classList.add('invalid');
  msgEl.textContent = msg || '';
  msgEl.className = 'field-msg' + (status === 'ok' ? ' ok' : status === 'err' ? ' err' : '');
}

const isMobileRe = v => /^01[3-9]\d{8}$/.test(v);
const isEmailRe = v => /^\S+@\S+\.\S+$/.test(v);

function vName() {
  const v = $f('full_name').value.trim();
  if (!v) { setField($f('full_name'), $m('msgName'), '', ''); return false; }
  if (v.length < 3 || v.length > 50) { setField($f('full_name'), $m('msgName'), 'err', 'সঠিক পুরো নাম লিখুন (কমপক্ষে ৩ অক্ষর)'); return false; }
  setField($f('full_name'), $m('msgName'), 'ok', '✓');
  return true;
}

function vPassword() {
  const v = $f('password').value;
  if (!v) { setField($f('password'), $m('msgPass'), '', ''); return false; }
  if (v.length < 6) { setField($f('password'), $m('msgPass'), 'err', 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে'); return false; }
  setField($f('password'), $m('msgPass'), 'ok', '✓');
  return true;
}

function vConfirm() {
  const v = $f('confirm_password').value;
  const p = $f('password').value;
  if (!v) { setField($f('confirm_password'), $m('msgConfirm'), '', ''); return false; }
  if (v !== p) { setField($f('confirm_password'), $m('msgConfirm'), 'err', 'পাসওয়ার্ড দুটি মিলছে না'); return false; }
  setField($f('confirm_password'), $m('msgConfirm'), 'ok', '✓');
  return true;
}

/* referral code — refs collection-এ আসল user-এর code কিনা (random code = red) */
async function vRef(quiet = false) {
  const inp = $f('ref_code');
  const v = inp.value.trim();
  if (!v) {
    if (!quiet) { setField(inp, $m('msgRef'), '', 'Referral Code দিন — এটা mandatory'); }
    state.ref.ok = false; state.ref.checked = false;
    return false;
  }
  if (!/^[A-Za-z0-9]{4,20}$/.test(v)) {
    setField(inp, $m('msgRef'), 'err', 'Referral Code-এ শুধু হাতা/নম্বর থাকবে (৪-২০)');
    state.ref.ok = false; state.ref.checked = false;
    return false;
  }
  setField(inp, $m('msgRef'), '', 'চেক হচ্ছে...');
  try {
    const snap = await getDoc(doc(db, 'refs', v));
    if (snap.exists) {
      setField(inp, $m('msgRef'), 'ok', '✓ Referral Code সঠিক');
      state.ref.ok = true; state.ref.checked = true;
      return true;
    }
    setField(inp, $m('msgRef'), 'err', 'Referral Code সঠিক নয় — কোনো registered user-এর code দিন');
    state.ref.ok = false; state.ref.checked = true;
    return false;
  } catch (_) {
    setField(inp, $m('msgRef'), 'err', 'Code verify করতে পারিনি — internet check করুন');
    state.ref.ok = false; state.ref.checked = false;
    return false;
  }
}

/* mobile — format + server-এ "এই নম্বরে আগেই account আছে" check */
async function vMobile(quiet = false) {
  const inp = $f('mobile');
  const v = inp.value.trim();
  if (!v) {
    if (!quiet) { setField(inp, $m('msgMobile'), '', ''); }
    state.mobile.ok = false; state.mobile.checked = false;
    return false;
  }
  if (!isMobileRe(v)) {
    setField(inp, $m('msgMobile'), 'err', 'সঠিক বাংলাদেশি মোবাইল নম্বর দিন (01XXXXXXXXX)');
    state.mobile.ok = false; state.mobile.checked = false;
    return false;
  }
  setField(inp, $m('msgMobile'), '', 'চেক হচ্ছে...');
  try {
    const r = await callApi('/api/user/check', { mobile: v });
    if (r.mobileTaken) {
      setField(inp, $m('msgMobile'), 'err', 'এই নম্বরে আগেই account আছে — Login করুন');
      state.mobile.ok = false; state.mobile.checked = true;
      return false;
    }
    setField(inp, $m('msgMobile'), 'ok', '✓ নম্বরটি free');
    state.mobile.ok = true; state.mobile.checked = true;
    return true;
  } catch (_) {
    setField(inp, $m('msgMobile'), 'err', 'Check করতে পারিনি — আবার চেষ্টা করুন');
    state.mobile.ok = false; state.mobile.checked = false;
    return false;
  }
}

/* email — format + "already registered" check */
async function vEmail(quiet = false) {
  const inp = $f('email');
  const v = inp.value.trim();
  if (!v) {
    if (!quiet) { setField(inp, $m('msgEmail'), '', ''); }
    state.email.ok = false; state.email.checked = false;
    return false;
  }
  if (!isEmailRe(v)) {
    setField(inp, $m('msgEmail'), 'err', 'সঠিক ইমেইল ঠিকানা লিখুন');
    state.email.ok = false; state.email.checked = false;
    return false;
  }
  setField(inp, $m('msgEmail'), '', 'চেক হচ্ছে...');
  try {
    const r = await callApi('/api/user/check', { email: v });
    if (r.emailTaken) {
      setField(inp, $m('msgEmail'), 'err', 'Already registered — Login করুন');
      state.email.ok = false; state.email.checked = true;
      return false;
    }
    setField(inp, $m('msgEmail'), 'ok', '✓ ইমেইলটি free');
    state.email.ok = true; state.email.checked = true;
    return true;
  } catch (_) {
    setField(inp, $m('msgEmail'), 'err', 'Check করতে পারিনি — আবার চেষ্টা করুন');
    state.email.ok = false; state.email.checked = false;
    return false;
  }
}

const debounce = (fn, ms = 500) => {
  let t = null;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
};

$f('full_name').addEventListener('input', vName);
$f('password').addEventListener('input', () => { vPassword(); vConfirm(); });
$f('confirm_password').addEventListener('input', vConfirm);
$f('ref_code').addEventListener('input', debounce(() => vRef()));
$f('mobile').addEventListener('input', debounce(() => vMobile()));
$f('email').addEventListener('input', debounce(() => vEmail()));

/* ============================================================
   SUBMIT — সব field valid না হলে signup HOTE PARE NA
   (ref code unverified/random → block, fail-closed)
   ============================================================ */
form?.addEventListener('submit', async e => {
  e.preventDefault();
  errBox.innerHTML = '';

  // সব field re-validate (ref/mobile/email server check সহ)
  const [refOk, nameOk, mobOk, emOk, pwOk, cfOk] = await Promise.all([
    vRef(), vName(), vMobile(), vEmail(), vPassword(), vConfirm(),
  ]);

  if (!refOk) { errBox.innerHTML = `<div class="error-box"><div><i class="fa-solid fa-circle-exclamation"></i> Referral Code সঠিক না — কোনো registered user-এর code দিলে তবেই account তৈরি হবে</div></div>`; $f('ref_code').focus(); return; }
  if (!nameOk) { errBox.innerHTML = `<div class="error-box"><div><i class="fa-solid fa-circle-exclamation"></i> সঠিক পুরো নাম লিখুন</div></div>`; return; }
  if (!mobOk) { errBox.innerHTML = `<div class="error-box"><div><i class="fa-solid fa-circle-exclamation"></i> মোবাইল নম্বরটি চেক করুন — duplicate হলে Login করুন</div></div>`; return; }
  if (!emOk) { errBox.innerHTML = `<div class="error-box"><div><i class="fa-solid fa-circle-exclamation"></i> ইমেইলটি চেক করুন — আগেই আছে হলে Login করুন</div></div>`; return; }
  if (!pwOk) { errBox.innerHTML = `<div class="error-box"><div><i class="fa-solid fa-circle-exclamation"></i> পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের</div></div>`; return; }
  if (!cfOk) { errBox.innerHTML = `<div class="error-box"><div><i class="fa-solid fa-circle-exclamation"></i> পাসওয়ার্ড দুটি মিলছে না</div></div>`; return; }

  const btn = form.querySelector('button[type=submit]');
  btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> তৈরি হচ্ছে...';
  try {
    await registerUser({
      name: $f('full_name').value.trim(),
      mobile: $f('mobile').value.trim(),
      email: $f('email').value.trim(),
      password: $f('password').value,
      refCodeInput: $f('ref_code').value.trim(),
    });
    location.replace('/dashboard.html');
  } catch (err) {
    errBox.innerHTML = `<div class="error-box"><div><i class="fa-solid fa-circle-exclamation"></i> ${friendlyError(err)}</div></div>`;
    btn.disabled = false; btn.innerHTML = 'Register Now <i class="fa-solid fa-arrow-right"></i>';
  }
});

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
