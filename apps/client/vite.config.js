import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import UnoCSS from "unocss/vite";

// https://vite.dev/config/
export default defineConfig(() => {
  return {
    plugins: [vue(), UnoCSS()],
    server: {
      port: 3001,
      proxy: {
        "/api": {
          target: "http://127.0.0.1:3000",
          changeOrigin: true, // 允许跨域
        },
      },
    },
  };
});
