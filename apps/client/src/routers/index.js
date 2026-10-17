import { createWebHistory, createRouter } from "vue-router";

const { VITE_TOKEN_NAME } = import.meta.env;

const routes = [
  {
    path: "/",
    component: () => import("../views/home.vue"),
    meta: {
      auth: true,
    },
  },
  { path: "/login", component: () => import("../views/login.vue") },
  { path: "/register", component: () => import("../views/register.vue") },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const token = localStorage.getItem(VITE_TOKEN_NAME);
  if (!token && to.meta.auth) {
    const redirect = encodeURIComponent(to.fullPath);
    return `/login?redirect=${redirect}`;
  }
});

export default router;
