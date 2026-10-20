import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import UnoCSS from "unocss/vite";

// https://vite.dev/config/
const mode = process.env.NODE_ENV;
export default defineConfig({
  base: mode === "production" ? "/admin/" : "/",
  plugins: [vue(), UnoCSS()],
  server: {
    port: 3002,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3000",
        changeOrigin: true, // 允许跨域
      },
    },
  },
});
