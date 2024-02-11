<template>
  <v-text-field
    :model-value="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
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
    :rules="[required, confiremdPasswordMatches(modelValue, confirmPassword)]"
    :type="showPassword ? 'text' : 'password'"
    class="mb-2"
    label="Passwort bestätigen"
    name="password-confirm"
    autocomplete="new-password"
  ></v-text-field>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { required, confiremdPasswordMatches } from "@/validation/rules";
import { useShowPassword } from "@/composables/useShowPassword";

defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const confirmPassword = ref("");
const { showPassword, toggleShowPassword } = useShowPassword();
const emit = defineEmits(["update:modelValue"]);
</script>
