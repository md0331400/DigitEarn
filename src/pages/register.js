import '../styles.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, firebaseReady } from '../core/firebase.js';
import { registerUser, friendlyError } from '../core/api.js';
import { toast, videoEmbedHtml, videoSoonHtml } from '../core/ui.js';
import { getSettings } from '../core/store.js';

const form = document.getElementById('registerForm');
const errBox = document.getElementById('registerError');

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

form?.addEventListener('submit', async e => {
  e.preventDefault();
  const fd = new FormData(form);
  const name = String(fd.get('full_name') || '').trim();
  const mobile = String(fd.get('mobile') || '').trim();
  const email = String(fd.get('email') || '').trim();
  const password = String(fd.get('password') || '');
  const confirm = String(fd.get('confirm_password') || '');
  const refCode = String(fd.get('ref_code') || '').trim();

  const errors = [];
  if (name.length < 3) errors.push('সঠিক পুরো নাম লিখুন');
  if (!/^01[3-9]\d{8}$/.test(mobile)) errors.push('সঠিক বাংলাদেশি মোবাইল নম্বর দিন (01XXXXXXXXX)');
  if (!/^\S+@\S+\.\S+$/.test(email)) errors.push('সঠিক ইমেইল ঠিকানা লিখুন');
  if (password.length < 6) errors.push('পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে');
  if (password !== confirm) errors.push('পাসওয়ার্ড দুটি মিলছে না');
  if (errors.length) {
    errBox.innerHTML = '<div class="error-box">' + errors.map(x => `<div><i class="fa-solid fa-circle-exclamation"></i> ${x}</div>`).join('') + '</div>';
    return;
  }

  const btn = form.querySelector('button[type=submit]');
  btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> তৈরি হচ্ছে...';
  errBox.innerHTML = '';
  try {
    await registerUser({ name, mobile, email, password, refCodeInput: refCode });
    location.replace('/dashboard.html');
  } catch (err) {
    errBox.innerHTML = `<div class="error-box"><div><i class="fa-solid fa-circle-exclamation"></i> ${friendlyError(err)}</div></div>`;
    btn.disabled = false; btn.innerHTML = 'Register Now <i class="fa-solid fa-arrow-right"></i>';
  }
});
