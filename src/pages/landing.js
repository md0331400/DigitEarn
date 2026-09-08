import '../styles.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, firebaseReady } from '../core/firebase.js';

/* landing page — mostly static; small interactivity only */

// logged-in user হলে header-এ Log In/Register-এর বদলে Dashboard দেখাবে
function showDashboardHeader() {
  const nav = document.querySelector('.header-actions');
  if (!nav) return;
  nav.innerHTML = '<a href="/dashboard.html" class="btn btn-gold btn-sm">Dashboard</a>';
}
if (firebaseReady) {
  if (auth.currentUser) showDashboardHeader();
  else onAuthStateChanged(auth, u => { if (u) showDashboardHeader(); });
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
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
