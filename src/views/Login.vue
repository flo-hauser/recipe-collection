<template>
  <CenteredContainer>
    <v-sheet
      class="pa-12 mx-auto"
      rounded
      max-width="450px"
      color="lightSurface"
    >
      <v-fade-transition>
        <v-form
          v-model="form"
          @submit.prevent="onSubmit"
          v-if="!authStore.loggedIn"
        >
          <v-text-field
            v-model="username"
            :readonly="loading"
            :rules="[required]"
            class="mb-2"
            label="Name"
            name="username"
            autocomplete="username"
          ></v-text-field>
          <v-text-field
            v-model="password"
            :readonly="loading"
            :rules="[required]"
            class="mb-2"
            label="Passwort"
            type="password"
            name="password"
            autocomplete="current-password"
          ></v-text-field>
          <v-btn
            :disabled="!form"
            :loading="loading"
            block
            color="success"
            size="large"
            type="submit"
            variant="elevated"
          >
            Anmelden
          </v-btn>
          <v-divider inset></v-divider>
          <v-btn
            :loading="loading"
            block
            variant="outlined"
            size="large"
            class="mt-3"
            @click.stop="onRegister"
          >
            Registrieren
          </v-btn>
        </v-form>
      </v-fade-transition>
      <v-fade-transition duration="5000">
        <div v-if="authStore.loggedIn">
          <h3>Hallo {{ authStore.user?.username }}!</h3>
          <br />
          <v-icon x-large color="primary">mdi-check-circle-outline</v-icon>
        </div>
      </v-fade-transition>
    </v-sheet>
  </CenteredContainer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CenteredContainer from "@/components/CenteredContainer.vue";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "vue-router";
import { useModalStore } from "@/store/modal";

const username = ref("");
const password = ref("");
const loading = ref(false);
const form = ref(false);
const router = useRouter();
const authStore = useAuthStore();
const modalStore = useModalStore();

function onSubmit() {
  if (!form.value) {
    return;
  }
  loading.value = true;

  authStore
    .login(username.value, password.value)
    .then(() => {
      setTimeout(() => {
        router.push({ path: "/" });
      }, 2000);
    })
    .catch(() => {
      password.value = "";
      modalStore.showDialog("Anmeldung fehlgeschlagen", "alert");
    })
    .finally(() => {
      loading.value = false;
    });
}

function onRegister() {
  router.push({ name: "register" });
}

function required(v: string) {
  return !!v || "Eingabe erforderlich";
}
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: row;
}
</style>
