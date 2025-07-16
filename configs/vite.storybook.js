// configs/vite.storybook.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsConfigPaths from 'vite-tsconfig-paths';
import { storybook as vitestPlugin } from '@storybook/addon-vitest/vitest-plugin';

export default defineConfig({
  plugins: [
    react(),
    viteTsConfigPaths(),
    vitestPlugin(),
  ],
  server: {
    fs: { allow: ['..', './'] },
  },
});
