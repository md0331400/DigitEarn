import { defineConfig } from 'vite';
import { readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

const SKIP_DIRS = new Set(['node_modules', 'dist', '.git', '.vercel']);

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

export default defineConfig({
  build: {
    rollupOptions: {
      input,
    },
    cssMinify: true,
    target: 'es2019',
  },
});
