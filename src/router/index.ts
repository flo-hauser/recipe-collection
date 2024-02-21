// Composables
import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/store/auth";

// Components
import Login from "@/views/Login.vue";
import Home from "@/views/Home.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },

  {
    path: "/search",
    name: "search",
    component: () => import("@/views/Search.vue"),
  },

  {
    path: "/login",
    component: Login,
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

  {
    path: "/imprint",
    name: "imprint",
    component: () => import("@/views/Imprint.vue"),
  },

  {
    path: "/about",
    name: "about",
    component: () => import("@/views/About.vue"),
  },

  {
    path: "/user",
    name: "user",
    component: () => import("@/views/User.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ top: 0 }),
});

router.beforeEach(async (to) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPaths = ["/home", "/login", "/register", "/about", "/imprint"];
  const authRequired = !publicPaths.includes(to.path);
  const auth = useAuthStore();
  if (authRequired && !auth.user) {
    return "/login";
  }
});

export default router;
