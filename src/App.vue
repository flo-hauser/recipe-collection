<template>
  <v-app>
    <v-app-bar :elevation="5" prominent>
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        icon="mdi-menu"
      ></v-app-bar-nav-icon>
      <v-app-bar-title>Rezepteverzeichnis</v-app-bar-title>
      <template v-slot:append>
        <v-btn>
          <v-icon>mdi-account</v-icon>
          <v-menu activator="parent">
            <v-list>
              <v-list-item v-if="authStore.loggedIn" @click.stop="onLogout">
                Logout
              </v-list-item>
              <v-list-item
                v-if="!authStore.loggedIn"
                @click.stop="router.push({ path: '/login' })"
              >
                Login
              </v-list-item>
            </v-list>
          </v-menu>
        </v-btn>
      </template>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      mobile-breakpoint="sm"
      color="lightSurface"
    >
      <ListNavigation></ListNavigation>
    </v-navigation-drawer>

    <v-main class="d-flex justify-center mt-3">
      <v-container>
        <MessagesContainer></MessagesContainer>
        <router-view v-slot="{ Component }">
          <transition mode="out-in" name="fade">
            <component :is="Component" />
          </transition>
        </router-view>
      </v-container>
      <DialogModal></DialogModal>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "./store/auth";
import ListNavigation from "./components/ListNavigation.vue";
import DialogModal from "@/components/DialogModal.vue";
import MessagesContainer from "./components/MessagesContainer.vue";
import { useRouter } from "vue-router";
import { useBookListStore } from "./store/bookList";

const router = useRouter();
const authStore = useAuthStore();
const bookListStore = useBookListStore();

onMounted(async () => {
  // Check if sesssion can be restored
  await authStore.refresh();

  // if not logged in, redirect to login page
  if (!authStore.loggedIn) {
    authStore.logout();
    router.push({ path: "/login" });
  }

  // if logged in but token is invalid, redirect to login page
  if (!authStore.isTokenValid()) {
    authStore.logout();
    router.push({ path: "/login" });
  }

  // if logged in and token is valid, redirect to search page
  if (authStore.loggedIn && authStore.isTokenValid()) {
    await bookListStore.getBooks();
    setTimeout(() => {
      router.push({ name: "search" });
    }, 500);
  }

  // poll token refresh every 10 seconds
  setInterval(() => {
    if (authStore.loggedIn && authStore.tokenRemainingTime() < 12000) {
      authStore.refresh();
    }
  }, 10000);
});

function onLogout() {
  authStore.$reset();
  router.push({ path: "/login" });
}

const drawer = ref(true);
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
