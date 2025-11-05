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
  server: {
    port: 3000,
    watch: {
      usePolling: true,
      interval: 100,
    },
    hmr: {
      overlay: true,
      protocol: "ws",
    },
  },
});
