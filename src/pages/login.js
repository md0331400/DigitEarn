import '../styles.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { onAuthStateChanged } from 'firebase/auth';
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
  try {
    const fd = new FormData(form);
    await loginUser(String(fd.get('email') || '').trim(), String(fd.get('password') || ''));
    location.replace(next);
  } catch (err) {
    errBox.innerHTML = `<div class="error-box"><div><i class="fa-solid fa-circle-exclamation"></i> ${friendlyError(err)}</div></div>`;
    btn.disabled = false; btn.innerHTML = 'LOGIN SECURELY <i class="fa-solid fa-shield-halved"></i>';
  }
});
