import '../styles.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { bootAppPage } from '../core/ui.js';
import { updateProfileName, changePassword, friendlyError } from '../core/api.js';
import { toast } from '../core/ui.js';

bootAppPage({
  active: 'profile',
  onReady: async ({ user }) => {
    const nameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('emailField');
    if (nameInput) nameInput.value = user.name || '';
    if (emailInput) emailInput.value = user.email || '';

    const form = document.getElementById('profileForm');
    form?.addEventListener('submit', async e => {
      e.preventDefault();
      const fd = new FormData(form);
      const name = String(fd.get('full_name') || '').trim();
      const cur = String(fd.get('current_password') || '');
      const nw = String(fd.get('new_password') || '');
      if (name.length < 3) { toast('সঠিক পুরো নাম লিখুন', 'error'); return; }
      const btn = form.querySelector('button[type=submit]');
      btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> সেভ হচ্ছে...';
      try {
        if (nw) {
          if (nw.length < 6) throw Object.assign(new Error('নতুন পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে'), { code: '' });
          await changePassword(cur, nw);
        }
        await updateProfileName(user.uid, name);
        toast('সেটিংস সেভ হয়েছে');
        setTimeout(() => location.reload(), 700);
      } catch (err) {
        toast(friendlyError(err) || err.message, 'error');
        btn.disabled = false; btn.innerHTML = 'SAVE SETTINGS';
      }
    });
  },
});
