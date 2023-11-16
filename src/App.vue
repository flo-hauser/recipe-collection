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
      <v-list>
        <v-list-item type="subheader" title="Rezepte"></v-list-item>
        <v-list-item title="Suche"></v-list-item>
        <v-list-item>Listen</v-list-item>
        <v-list-item>Hinzufügen</v-list-item>
        <v-list-item type="divider"></v-list-item>
        <v-divider></v-divider>
        <v-list-item type="subheader" title="Bücher"></v-list-item>
        <v-list-item>Sammlung</v-list-item>
        <v-list-item>Hinzufügen</v-list-item>
        <v-list-item type="divider"></v-list-item>
        <v-divider></v-divider>
        <v-list-item>Benutzer</v-list-item>
      </v-list>
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

const authStore = useAuthStore();

onMounted(() => {
  if (!authStore.loggedIn) {
    router.push({ path: "/login" });
  }
});

const drawer = ref(true);
</script>
