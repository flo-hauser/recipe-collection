import { ref } from "vue";

export function useShowPassword() {
  const showPassword = ref(false);

  const toggleShowPassword = () => {
    showPassword.value = !showPassword.value;
  };

  return {
    showPassword,
    toggleShowPassword,
  };
}
