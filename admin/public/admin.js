/* Admin panel JS */
(function () {
  const burger = document.getElementById('sbBurger');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sbOverlay');
  if (burger && sidebar) {
    burger.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      if (overlay) overlay.classList.toggle('show');
    });
  }
  if (overlay) overlay.addEventListener('click', () => {
    if (sidebar) sidebar.classList.remove('open');
    overlay.classList.remove('show');
  });
})();
