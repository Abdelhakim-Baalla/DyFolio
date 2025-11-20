import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],
  build: {
    rollupOptions: {
      // Exclure les fichiers/dossiers problématiques
      external: [],
    },
    // S'assurer que le dossier public est correctement copié
    copyPublicDir: true,
  },
  publicDir: "public",
  server: {
    port: 3000,
    watch: {
      usePolling: true,
      interval: 100,
      // Ignorer certains fichiers/dossiers
      ignored: ["**/node_modules/**", "**/dist/**"],
    },
    hmr: {
      overlay: true,
      protocol: "ws",
    },
  },
  preview: {
    port: 3000,
  },
});
