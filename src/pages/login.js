import '../styles.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { onAuthStateChanged, fetchSignInMethodsForEmail } from 'firebase/auth';
import { auth, firebaseReady } from '../core/firebase.js';
import { loginUser, friendlyError } from '../core/api.js';
import { toast } from '../core/ui.js';

const form = document.getElementById('loginForm');
const errBox = document.getElementById('loginError');
// ?next= শুধু same-site path নেওয়া হবে (open-redirect রোধ)
const rawNext = new URLSearchParams(location.search).get('next');
const next = rawNext && rawNext.startsWith('/') && !rawNext.startsWith('//') ? rawNext : '/dashboard.html';

if (firebaseReady) {
  onAuthStateChanged(auth, u => { if (u) location.replace(next); });
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
  const btn = form.querySelector('button[type=submit]');
  btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> লগইন হচ্ছে...';
  errBox.innerHTML = '';
  const fd = new FormData(form);
  const email = String(fd.get('email') || '').trim();
  const password = String(fd.get('password') || '');
  try {
    const keep = document.getElementById('keepLogin') ? document.getElementById('keepLogin').checked : true;
    await loginUser(email, password, keep);
    location.replace(next);
  } catch (err) {
    let msg = friendlyError(err);
    // email নেই vs password ভুল — আলাদা করে বলা হবে
    if (['auth/invalid-credential', 'auth/wrong-password', 'auth/user-not-found'].includes(err.code)) {
      try {
        const methods = await fetchSignInMethodsForEmail(auth, email);
        msg = methods.length
          ? 'Wrong password — পাসওয়ার্ড ভুল হয়েছে, আবার চেষ্টা করুন'
          : 'এই email-এ register করা নেই — আগে register করুন';
      } catch (_) { /* network issue-তে fallback msg */ }
    }
    errBox.innerHTML = `<div class="error-box"><div><i class="fa-solid fa-circle-exclamation"></i> ${msg}</div></div>`;
    btn.disabled = false; btn.innerHTML = 'LOGIN SECURELY <i class="fa-solid fa-shield-halved"></i>';
  }
});
