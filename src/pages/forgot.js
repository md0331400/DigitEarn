import '../styles.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { forgotPassword, friendlyError } from '../core/api.js';
import { toast } from '../core/ui.js';

const form = document.getElementById('forgotForm');
const doneBox = document.getElementById('forgotDone');
const errBox = document.getElementById('forgotError');

form?.addEventListener('submit', async e => {
  e.preventDefault();
  const email = String(new FormData(form).get('email') || '').trim();
  const btn = form.querySelector('button[type=submit]');
  btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> পাঠানো হচ্ছে...';
  doneBox.innerHTML = ''; errBox.innerHTML = '';
  try {
    await forgotPassword(email);
    doneBox.innerHTML = `<div class="ok-box"><i class="fa-solid fa-circle-check"></i> পাসওয়ার্ড রিসেট লিংক পাঠানো হয়েছে: <b>&nbsp;${email}</b> — ইনবক্স চেক করুন।</div>`;
  } catch (err) {
    errBox.innerHTML = `<div class="error-box"><div><i class="fa-solid fa-circle-exclamation"></i> ${friendlyError(err)}</div></div>`;
  } finally {
    btn.disabled = false; btn.innerHTML = 'রিসেট লিংক পাঠান';
  }
});
