import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("../views/layout.vue"),
    redirect: '/home',
    children: [
      {
        path: "/home",
        component: () => import("../views/home.vue"),
      },
      {
        path: "/todo",
        component: () => import("../views/todo.vue"),
      },
      {
        path: "/user",
        component: () => import("../views/user.vue"),
      },
    ],
  },
  { path: "/login", component: () => import("../views/login.vue") },
];

const router = createRouter({
  history: createWebHistory("/admin/"),
  routes,
});

export default router;
