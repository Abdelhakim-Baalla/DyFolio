import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  build: {
    commonjsOptions: {
      include: [/node_modules/],
    },
    rollupOptions: {
      external: [],
    },
    copyPublicDir: true,
    chunkSizeWarningLimit: 1000,
  },
  publicDir: 'public',
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
    preserveSymlinks: false,
  },
  server: {
    port: 3000,
    watch: {
      usePolling: true,
      interval: 100,
      ignored: ['**/node_modules/**', '**/dist/**'],
    },
    hmr: {
      overlay: true,
      protocol: 'ws',
    },
    fs: {
      strict: false,
    },
  },
  preview: {
    port: 3000,
  },
  optimizeDeps: {
    include: ['@apollo/client', '@apollo/client/react', '@apollo/client/core'],
    exclude: [],
  },
});
