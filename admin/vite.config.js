import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    cssMinify: true,
    target: 'es2019',
  },
});
