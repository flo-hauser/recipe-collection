// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "search",
    component: () => import("@/views/Search.vue"),
  },

  {
    path: "/login",
    component: () => import("@/views/Login.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
