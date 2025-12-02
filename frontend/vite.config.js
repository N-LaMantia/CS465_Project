import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
  },
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "https://cs465-project.onrender.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/api"), // optional
      },
    },
  },
});
