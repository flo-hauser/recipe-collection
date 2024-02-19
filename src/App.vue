<template>
  <v-app>
    <v-app-bar :elevation="5" height="80">
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        icon="mdi-menu"
      ></v-app-bar-nav-icon>

      <v-app-bar-title :to="{ name: 'home' }" link>
        Rezepteverzeichnis
      </v-app-bar-title>

      <template v-slot:append>
        <v-btn>
          <v-avatar
            v-if="authStore.user?._links.avatar"
            :image="authStore.user._links.avatar"
          ></v-avatar>
          <v-icon v-else>mdi-account</v-icon>
          <v-menu activator="parent">
            <v-list>
              <v-list-item v-if="authStore.loggedIn" @click.stop="onLogout">
                Logout
              </v-list-item>
              <v-list-item
                v-if="authStore.loggedIn"
                @click.stop="router.push({ path: '/user' })"
              >
                Profil
              </v-list-item>
              <v-list-item
                v-if="!authStore.loggedIn"
                @click.stop="router.push({ path: '/login' })"
              >
                Login
              </v-list-item>
              <v-list-item
                v-if="!authStore.loggedIn"
                @click.stop="router.push({ path: '/register' })"
              >
                Registrieren
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

    <v-main class="d-flex justify-center mt-3" style="min-height: 90vh">
      <v-container>
        <MessagesContainer></MessagesContainer>
        <router-view v-slot="{ Component }">
          <transition mode="out-in" name="fade">
            <component :is="Component" @pushToSearch="showDrawer" />
          </transition>
        </router-view>
      </v-container>
      <DialogModal></DialogModal>
    </v-main>
    <v-footer
      class="d-flex justify-end pe-12"
      color="lightSurface"
      style="max-height: 4vh"
    >
      <ul class="bottom-links">
        <li>
          <router-link to="/imprint">Impressum</router-link>
        </li>
        <li>
          <router-link to="/about">About</router-link>
        </li>
      </ul>
    </v-footer>
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
import { useDisplay } from "vuetify";

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

  // if logged in and token is valid, redirect to search page and activate drawer
  if (authStore.loggedIn && authStore.isTokenValid()) {
    await bookListStore.getBooks();
    setTimeout(() => {
      router.push({ name: "home" });
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
  router.push({ path: "/login" }).then(() => {
    authStore.logout();
  });
}

// show drawer if redirected from home and display is md or up
const { mdAndUp } = useDisplay();
const drawer = ref(false);
const showDrawer = () => {
  if (mdAndUp.value) {
    setTimeout(() => {
      drawer.value = true;
    }, 900);
  }
};
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

.bottom-links {
  list-style: none;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 0;
  padding: 0;
}
.bottom-links li {
  margin-left: 1rem;
}

.bottom-links li a {
  text-decoration: none;
  color: inherit;
}
</style>
