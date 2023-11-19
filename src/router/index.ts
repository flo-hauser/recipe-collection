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

  {
    path: "/books/new",
    name: "newBook",
    component: () => import("@/views/NewBook.vue"),
  },

  {
    path: "/books",
    name: "allBooks",
    component: () => import("@/views/AllBooks.vue"),
  },

  {
    path: "/books/:id",
    name: "editBook",
    props: true,
    component: () => import("@/views/EditBook.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
