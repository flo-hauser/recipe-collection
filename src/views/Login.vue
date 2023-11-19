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
            clearable
            label="Name"
          ></v-text-field>
          <v-text-field
            v-model="password"
            :readonly="loading"
            :rules="[required]"
            class="mb-2"
            clearable
            label="Passwort"
            type="password"
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

const username = ref("");
const password = ref("");
const loading = ref(false);
const form = ref(false);
const router = useRouter();
const authStore = useAuthStore();

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
    .finally(() => {
      loading.value = false;
    });
}

function required(v: string) {
  return !!v || "Field is required";
}
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: row;
}
</style>