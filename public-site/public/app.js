/* DigitEarn user site JS */
(function () {
  // drawer
  const open = () => document.body.classList.add('drawer-open');
  const close = () => document.body.classList.remove('drawer-open');
  const dbtn = document.getElementById('drawerBtn');
  const dclose = document.getElementById('drawerClose');
  const doverlay = document.getElementById('drawerOverlay');
  if (dbtn) dbtn.addEventListener('click', open);
  if (dclose) dclose.addEventListener('click', close);
  if (doverlay) doverlay.addEventListener('click', close);

  // password eye toggles
  document.querySelectorAll('.eye').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.parentElement.querySelector('input');
      if (!input) return;
      const show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      btn.querySelector('i').className = show ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye';
    });
  });

  // site age timer
  const timer = document.getElementById('siteTimer');
  if (timer) {
    const start = new Date(timer.dataset.start + 'T00:00:00').getTime();
    const el = sel => timer.querySelector(sel);
    function tick() {
      let diff = Math.max(0, Date.now() - start);
      const d = Math.floor(diff / 86400000); diff -= d * 86400000;
      const h = Math.floor(diff / 3600000); diff -= h * 3600000;
      const m = Math.floor(diff / 60000); diff -= m * 60000;
      const s = Math.floor(diff / 1000);
      if (el('[data-d]')) el('[data-d]').textContent = d;
      if (el('[data-h]')) el('[data-h]').textContent = h;
      if (el('[data-m]')) el('[data-m]').textContent = m;
      if (el('[data-s]')) el('[data-s]').textContent = s;
    }
    tick();
    setInterval(tick, 1000);
  }

  // copy referral link
  const copyBtn = document.getElementById('copyRef');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const input = document.getElementById('refLink');
      if (!input) return;
      input.select();
      input.setSelectionRange(0, 99999);
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(input.value).catch(() => {});
      } else {
        document.execCommand('copy');
      }
      copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copied';
      setTimeout(() => { copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i> Copy'; }, 1600);
    });
  }

  // level view toggles
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const box = document.getElementById(btn.dataset.target);
      if (box) {
        box.hidden = !box.hidden;
        btn.textContent = box.hidden ? 'View' : 'Hide';
      }
    });
  });
})();
