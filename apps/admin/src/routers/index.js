import { createWebHistory, createRouter } from "vue-router";

const routes = [
  { path: "/", component: () => import("../views/home.vue") },
  { path: "/login", component: () => import("../views/login.vue") },
];

const router = createRouter({
  history: createWebHistory("/admin/"),
  routes,
});

export default router;
