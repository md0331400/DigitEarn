/* Admin panel → Android APK assets build.
   Usage: npm run build:admin-app
   Output: android/app/src/main/assets/admin/ (APK-এ embedded হবে)
   - base: './' → relative asset paths (file:// origin-এ চলবে)
   - public website-এ serve হয় না (এটা শুধু APK-র জন্য) */
import { build } from 'vite';
import { existsSync, readFileSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const out = 'android/app/src/main/assets/admin';
rmSync(out, { recursive: true, force: true }); // পুরনো output নিশ্চিত মুছে ফেলা

await build({
  configFile: false,
  root: process.cwd(),
  base: './',
  publicDir: false, // main site-এর public/ files এখানে copy হবে না
  logLevel: 'info',
  build: {
    outDir: out,
    cssMinify: true,
    target: 'es2019',
    rollupOptions: {
      input: { index: 'src/admin/index.html' },
    },
  },
});

// Vite nested input-এর HTML-কে src/admin/index.html হিসেবে রাখে — root-এ আনি
// + asset reference-গুলো (../../assets/...) root-এর জন্য (./assets/...) ঠিক করি
const nested = path.join(out, 'src/admin/index.html');
if (existsSync(nested)) {
  const html = readFileSync(nested, 'utf-8').replace(/\.\.\/\.\.\/assets\//g, './assets/');
  renameSync(nested, path.join(out, 'index.html'));
  writeFileSync(path.join(out, 'index.html'), html);
  rmSync(path.join(out, 'src'), { recursive: true, force: true });
}
if (!existsSync(path.join(out, 'index.html'))) {
  throw new Error('build-এ index.html পাওয়া যায়নি — script টা দেখুন');
}
console.log('\n[admin-app] ✅ built → android/app/src/main/assets/admin/');
console.log('[admin-app] APK build করুন (Android Studio → Run)');
