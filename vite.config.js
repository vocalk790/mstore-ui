// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Netlify SPA 대응
  // ✅ 기본값 유지: dist 폴더 사용
});
