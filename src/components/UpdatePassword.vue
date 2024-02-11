<template>
  <v-form @submit.prevent="submit" v-model="form" v-if="!completed">
    <v-row>
      <v-col>
        <h4 class="align-left mb-3">Passwort ändern</h4>
      </v-col>
    </v-row>
    <v-text-field
      v-model="newPassword"
      @click:append-inner="toggleShowPassword"
      :readonly="loading"
      :rules="[required]"
      :type="showPassword ? 'text' : 'password'"
      :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      class="mb-2"
      label="Passwort"
      name="password"
      autocomplete="new-password"
    ></v-text-field>
    <v-text-field
      v-model="confirmPassword"
      :readonly="loading"
      :rules="[
        required,
        confiremdPasswordMatches(newPassword, confirmPassword),
      ]"
      :type="showPassword ? 'text' : 'password'"
      class="mb-2"
      label="Passwort bestätigen"
      name="password-confirm"
      autocomplete="new-password"
    ></v-text-field>
    <v-btn
      :loading="loading"
      :disabled="!form"
      block
      size="large"
      type="submit"
      variant="elevated"
    >
      Passwort ändern</v-btn
    >
  </v-form>

  <v-scale-transition>
    <div v-if="completed">
      <v-icon id="confirmed-register" color="primary">mdi-check-circle</v-icon>
    </div>
  </v-scale-transition>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/store/auth";
import { required, confiremdPasswordMatches } from "@/validation/rules";
import { useShowPassword } from "@/composables/useShowPassword";

const store = useAuthStore();
const loading = ref(false);
const form = ref(false);
const newPassword = ref("");
const confirmPassword = ref("");
const { showPassword, toggleShowPassword } = useShowPassword();
const completed = ref(false);

const emit = defineEmits(["update:password"]);

const submit = async () => {
  loading.value = true;

  await store.updatePassword(newPassword.value);
  completed.value = true;
  newPassword.value = "";
  confirmPassword.value = "";
  loading.value = false;
  setTimeout(() => {
    completed.value = false;
  }, 1000);
  emit("update:password");
};
</script>

<style scoped>
#confirmed-register {
  font-size: 10rem;
}
</style>
