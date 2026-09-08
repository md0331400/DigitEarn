import '../styles.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { bootAppPage, toast, esc, videoEmbedHtml } from '../core/ui.js';
import { getTaskBySlug, hasClaimedToday, claimTask } from '../core/api.js';
import { TASKS } from '../tasks-data.js';

const slug = document.body.dataset.taskSlug || '';
const staticTask = TASKS.find(t => t.slug === slug) || { nameBn: 'টাস্ক', nameEn: '', icon: 'fa-solid fa-star', color: '#f59e0b', reward: 0, url: '', steps: [], locked: false };

bootAppPage({
  active: 'home',
  onReady: async ({ user, settings }) => {
    const box = document.getElementById('taskActions');
    const stepsEl = document.getElementById('taskSteps');
    if (!box) return;

    let task = await getTaskBySlug(slug).catch(() => null);
    if (!task) task = { ...staticTask, slug };

    if (stepsEl) {
      const steps = task.steps && task.steps.length ? task.steps : staticTask.steps;
      if (steps && steps.length) {
        stepsEl.innerHTML = steps.map((s, i) => `<li><span class="step-num">${i + 1}</span>${esc(s)}</li>`).join('');
      }
    }
    // reflect live reward
    document.querySelectorAll('[data-reward]').forEach(el => { el.dataset.reward = task.reward; });
    document.querySelectorAll('.reward-pill').forEach(el => { el.textContent = `প্রতিদিন ৳${task.reward} রিওয়ার্ড`; });

    // per-project video guide — admin panel থেকে tasks/{slug}.videoUrl সেট করলেই দেখাবে
    const vidSlot = document.getElementById('taskVideo');
    if (vidSlot) {
      const vu = task.videoUrl || '';
      const embed = videoEmbedHtml(vu);
      if (embed) {
        vidSlot.innerHTML = `<div class="video-card"><p class="video-note">এই প্রজেক্টের ভিডিও দেখে কাজ করুন</p><div class="video-box">${embed}</div></div>`;
      } else if (vu) {
        vidSlot.innerHTML = `<div class="video-card"><p class="video-note">ভিডিও গাইড দেখুন</p><a href="${esc(vu)}" target="_blank" rel="noopener" class="btn btn-indigo btn-block" style="margin-top:10px"><i class="fa-solid fa-arrow-up-right-from-square"></i> Open Video Link</a></div>`;
      }
    }

    const render = async () => {
      const claimed = await hasClaimedToday(user.uid, slug).catch(() => false);
      if (task.locked) {
        box.innerHTML = `
          <div class="lock-card">
            <div class="lock-ico"><i class="fa-solid fa-lock"></i></div>
            <h3>এই প্রজেক্টটি এখনো লক করা আছে</h3>
            <p>শীঘ্রই খুলে দেওয়া হবে। আপডেট পেতে আমাদের টেলিগ্রাম চ্যানেলে জয়েন করুন।</p>
            <a href="${esc(settings.telegramLink)}" target="_blank" rel="noopener" class="btn-teal"><i class="fa-brands fa-telegram"></i> Join Telegram</a>
          </div>`;
        return;
      }
      if (!user.isActive) {
        box.innerHTML = `
          <div class="notice-orange"><i class="fa-solid fa-circle-info"></i><div>রিওয়ার্ড পেতে আপনার একাউন্ট অ্যাক্টিভ করতে হবে। অ্যাক্টিভ করলে সাথে সাথে ${esc(settings.activationBonus)} টাকা বোনাস!</div></div>
          <a href="${esc(settings.activationLink)}" target="_blank" rel="noopener" class="btn btn-orange btn-block" style="margin-top:12px">এক্টিভ করুন</a>`;
        return;
      }
      box.innerHTML = `
        <a href="${esc(task.url)}" target="_blank" rel="noopener" class="btn btn-gold btn-block"><i class="fa-solid fa-link"></i> লিংক ওপেন করুন</a>
        ${claimed
          ? '<button type="button" class="btn btn-green btn-block" disabled><i class="fa-solid fa-check"></i> আজ Claim করা হয়েছে</button>'
          : `<button type="button" id="claimBtn" class="btn btn-green btn-block"><i class="fa-solid fa-gift"></i> Reward Claim করুন (৳${task.reward})</button>`}`;
      const claimBtn = document.getElementById('claimBtn');
      if (claimBtn) claimBtn.addEventListener('click', async () => {
        claimBtn.disabled = true;
        claimBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Claim হচ্ছে...';
        try {
          await claimTask(user.uid, slug, task);
          toast(`+৳${task.reward} ব্যালেন্সে যোগ হয়েছে`);
          document.querySelectorAll('[data-balance]').forEach(el => { el.textContent = '৳ ' + (Number(user.balance) + task.reward).toFixed(2); });
          render();
        } catch (err) {
          toast(err.message, 'error');
          claimBtn.disabled = false;
        }
      });
    };
    await render();
  },
});
