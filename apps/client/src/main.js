import "virtual:uno.css";
import "element-plus/dist/index.css";
import ElementPlus from "element-plus";

import { createApp } from "vue";
import { createPinia } from 'pinia'
import App from "./App.vue";
import router from "./routers/index.js";

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(ElementPlus);
app.mount("#app");
