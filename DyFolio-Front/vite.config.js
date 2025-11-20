import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

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
    // Résoudre les problèmes avec OneDrive/symlinks
    commonjsOptions: {
      include: [/node_modules/],
    },
    rollupOptions: {
      // Exclure les fichiers/dossiers problématiques
      external: [],
    },
    // S'assurer que le dossier public est correctement copié
    copyPublicDir: true,
    // Augmenter la limite de warning pour les gros fichiers
    chunkSizeWarningLimit: 1000,
  },
  publicDir: "public",
  // Résolution explicite des chemins
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
    // Éviter les problèmes de résolution de fichiers
    preserveSymlinks: false,
  },
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
    // Désactiver fs.strict pour OneDrive
    fs: {
      strict: false,
    },
  },
  preview: {
    port: 3000,
  },
  // Optimisation des dépendances
  optimizeDeps: {
    exclude: [],
    include: [],
  },
});
