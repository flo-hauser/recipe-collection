<template>
  <v-app>
    <v-app-bar :elevation="5" prominent>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>Rezepteverzeichnis</v-app-bar-title>
      <template v-slot:append>
        <v-btn icon="mdi-account"></v-btn>
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
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useAuthStore } from "./store/auth";
import { onMounted } from "vue";
import router from "./router";
import ListNavigation from "./components/ListNavigation.vue";

const authStore = useAuthStore();

onMounted(() => {
  if (!authStore.loggedIn) {
    router.push({ path: "/login" });
  }
});

const drawer = ref(true);
</script>
