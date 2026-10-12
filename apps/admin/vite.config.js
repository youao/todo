import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

// https://vite.dev/config/
const mode = process.env.NODE_ENV;
export default defineConfig({
  base: mode === "production" ? "/admin/" : "/",
  plugins: [vue()],
});
