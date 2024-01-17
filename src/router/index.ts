// Composables
import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/store/auth";

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
    path: "/register",
    name: "register",
    component: () => import("@/views/Register.vue"),
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

  {
    path: "/recipes/new",
    name: "newRecipe",
    component: () => import("@/views/NewRecipe.vue"),
  },

  {
    path: "/recipe/:id",
    name: "editRecipe",
    props: true,
    component: () => import("@/views/EditRecipe.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const loginPath = "/login";
  const authRequired = to.path !== loginPath;
  const auth = useAuthStore();
  if (authRequired && !auth.user) {
    return "/login";
  }
});

export default router;
