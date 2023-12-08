<template>
  <CenteredContainer>
    <v-sheet
      class="pa-12 mx-auto"
      rounded
      max-width="450px"
      color="lightSurface"
    >
      <v-form v-model="form" @submit.prevent="onRegister" v-if="!completed">
        <v-text-field
          v-model="username"
          :readonly="loading"
          :rules="[required]"
          @input="checkUserExists"
          :error-messages="userErrorMessages"
          class="mb-2"
          label="Name"
          name="username"
          autocomplete="username"
        ></v-text-field>
        <v-text-field
          v-model="email"
          :readonly="loading"
          :rules="[required, isEmail]"
          @input="checkEmailExists"
          type="email"
          class="mb-2"
          label="E-Mail"
          name="email"
          autocomplete="email"
        ></v-text-field>
        <v-text-field
          v-model="newPassword"
          :readonly="loading"
          :rules="[required]"
          class="mb-2"
          label="Passwort"
          type="password"
          name="password"
          autocomplete="new-password"
        ></v-text-field>
        <v-text-field
          v-model="confirmPassword"
          :readonly="loading"
          :rules="[required, confiremdPasswordMatches]"
          class="mb-2"
          label="Passwort bestätigen"
          type="password"
          name="password-confirm"
          autocomplete="new-password"
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
          Registrieren
        </v-btn>
      </v-form>

      <v-scale-transition>
        <div v-if="completed">
          <v-icon id="confirmed-register" color="primary"
            >mdi-check-circle</v-icon
          >
        </div>
      </v-scale-transition>
    </v-sheet>
  </CenteredContainer>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import CenteredContainer from "@/components/CenteredContainer.vue";
import { computed } from "vue";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "vue-router";
import { useModalStore } from "@/store/modal";
import { useDebounceFn } from "@vueuse/core";
import { useRecipeApi } from "@/composables/api";

const username = ref("");
const usernameInUse = ref(false);
const userErrorMessages = ref([] as Array<string>);
const email = ref("");
const emailInUse = ref(false);
const emailErrorMessages = ref([] as Array<string>);
const newPassword = ref("");
const confirmPassword = ref("");
const passwordIdent = computed(
  () => newPassword.value == confirmPassword.value
);
const loading = ref(false);
const form = ref(false);
const completed = ref(false);

const router = useRouter();
const authStore = useAuthStore();
const modalStore = useModalStore();

async function onRegister() {
  loading.value = true;
  if (passwordIdent.value) {
    authStore
      .register({
        username: username.value,
        password: newPassword.value,
        email: email.value,
      })
      .then((res) => {
        if (res.username !== username.value) {
          throw new Error("Fehler beim Registrieren");
        }
        return authStore.login(res.username, newPassword.value);
      })
      .then(() => {
        completed.value = true;
        setTimeout(() => {
          router.push({ path: "/" });
        }, 2000);
      })
      .catch((err) => {
        modalStore.showDialog(
          `Registrieren fehlgeschlagen\n${err.response.data.message}`,
          "alert"
        );
        console.warn(err);
      })
      .finally(() => {
        loading.value = false;
      });
  }
}

const checkUserExists = useDebounceFn(async () => {
  if (username.value.length > 3) {
    usernameInUse.value = await useRecipeApi<boolean>(
      "/users/exists",
      "GET",
      null,
      { username: username.value }
    );
  }
}, 750);

const checkEmailExists = useDebounceFn(async () => {
  if (email.value.length > 3 && isEmail(email.value)) {
    emailInUse.value = await useRecipeApi<boolean>(
      "/users/exists",
      "GET",
      null,
      { email: email.value }
    );
  }
}, 750);

watch(usernameInUse, (inUse) => {
  if (inUse) {
    userErrorMessages.value = ["Benutzername bereits vergeben"];
  } else {
    userErrorMessages.value = [];
  }
});

watch(emailInUse, (inUse) => {
  if (inUse) {
    emailErrorMessages.value = ["E-Mail bereits vergeben"];
  } else {
    emailErrorMessages.value = [];
  }
});

function confiremdPasswordMatches(v: string) {
  return v == newPassword.value || "Passwort Eingaben stimmen nicht überein";
}

function required(v: string) {
  return !!v || "Eingabe erforderlich";
}

function isEmail(v: string) {
  return (
    !v ||
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
    "gültige E-mail angeben"
  );
}
</script>

<style scoped>
#confirmed-register {
  font-size: 10rem;
}
</style>
