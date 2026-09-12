import { defineConfig, loadEnv } from 'vite';
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

const SKIP_DIRS = new Set(['node_modules', 'dist', '.git', '.vercel', 'admin']);

// Collect every static HTML entry (multi-page build → প্রতিটা পেজ আলাদা URL, আলাদা index-able)
function collectHtml(dir, base = '') {
  const entries = [];
  for (const item of readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(item.name)) continue;
    const rel = base ? `${base}/${item.name}` : item.name;
    const full = path.join(dir, item.name);
    if (item.isDirectory()) entries.push(...collectHtml(full, rel));
    else if (item.name.endsWith('.html')) entries.push(rel);
  }
  return entries;
}

const htmlFiles = collectHtml(rootDir);
const input = {};
for (const f of htmlFiles) input[f.replace(/\.html$/, '')] = f;

/* Admin panel public site-এর build-এও ঢোকে → https://<host>/admin/
   আগে শুধু APK-র ভেতরেই (assets/admin/) panel ছিল; APK-র firebase.json ভুল/না-থাকলে
   admin-এর হাতে কোনো admin operation-ই থাকত না (যেমন tasks seed), আর debug-ও করা
   যেত না। panel নিজেই Firebase auth + admin claim + Firestore rules দিয়ে gate করা,
   src/admin/index.html-এ noindex meta আছে — মানে secret নয়, শুধু অনুমান করা কঠিন URL। */
input['admin'] = 'src/admin/index.html';

/* DEPLOY SAFETY: আগের এক production incident — Vercel build-এ VITE_FIREBASE_* না থাকায়
   bundle-এ `projectId: undefined` বসে গিয়েছিল, সাইট লোড হতো কিন্তু login/submit সব
   চুপচাপ মরে যেত (কোনো errorই স্পষ্ট ছিল না)। env না থাকলে এখন build শেষে স্পষ্ট warning
   (build ভাঙি না — docs-only deploy যেন block না হয়)। */
function firebaseEnvWarn(env) {
  const need = ['VITE_FIREBASE_API_KEY', 'VITE_FIREBASE_PROJECT_ID'];
  const missing = need.filter((k) => !env[k]);
  if (missing.length) {
    console.warn(
      '\n⚠️  [DigitEarn] Firebase web config বিল্ডে নেই: ' + missing.join(', ') +
      '\n   → সাইট চলবে কিন্তু login/register/submit কাজ করবে না (firebaseReady=false)।\n' +
      '   → Fix: Vercel → Settings → Environment Variables → এই নামগুলো **Production** এ বসান\n' +
      '     (Sensitive রাখলে build-এর সময় পাওয়া যায় না — "Environment Variables" visibility দিন),\n' +
      '     তারপর Redeploy। লোকালে: .env ফাইলে বসান।\n'
    );
  }
  return missing;
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode || 'production', process.cwd(), '');
  const missingEnv = firebaseEnvWarn(env);
  return {
  build: {
    rollupOptions: {
      input,
    },
    cssMinify: true,
    target: 'es2019',
  },
  plugins: [
    {
      name: 'digitearn:build-identity',
      closeBundle() {
        /* Vite nested input রেখে দেয় dist/src/admin/index.html — ওটা dist/admin/index.html
           (asset path গুলোও root-এর জন্য ঠিক করে)। নাহলে /admin/ 404 করত। */
        const distDir = path.join(rootDir, 'dist');
        const nested = path.join(distDir, 'src', 'admin', 'index.html');
        if (existsSync(nested)) {
          const html = readFileSync(nested, 'utf8').replace(/\.\/\.\.\/assets\//g, '/assets/');
          mkdirSync(path.join(distDir, 'admin'), { recursive: true });
          writeFileSync(path.join(distDir, 'admin', 'index.html'), html);
          rmSync(path.join(distDir, 'src'), { recursive: true, force: true });
        }
        // dist/version.json থাকলেই deployed build কেমন, সেটা এক request-এ বোঝা যায়
        console.log(
          missingEnv.length
            ? `⚠️  [DigitEarn] build finished WITHOUT Firebase config (missing: ${missingEnv.join(', ')})`
            : '✅ [DigitEarn] Firebase web config present in this build'
        );
      },
    },
  ],
  };
});
