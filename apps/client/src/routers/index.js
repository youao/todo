import { createWebHistory, createRouter } from "vue-router";
import Layout from "../views/layout.vue";
import Home from "../views/home.vue";
import Login from "../views/login.vue";

const { VITE_TOKEN_NAME } = import.meta.env;

const routes = [
  {
    path: "/",
    component: () => Layout,
    meta: {
      auth: true,
    },
    children: [
      {
        path: "/",
        component: () => Home,
      },
    ],
  },
  { path: "/login", component: Login },
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
