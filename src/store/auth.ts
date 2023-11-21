// Utilities
import { defineStore } from "pinia";
import { Token } from "@/types/dto/Token";
import { User } from "@/types/dto/User";
import { useRecipeApiLogin, useRecipeApi } from "@/composables/api";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    loggedIn: false,
    user: null as User | null,
    token: null as Token | null,
  }),

  actions: {
    async login(username: string, password: string) {
      this.token = await useRecipeApiLogin(username, password);
      if (this.token) {
        this.loggedIn = true;
        this.user = await useRecipeApi<User>("users/me", "GET");
      } else {
        this.loggedIn = false;
        this.user = null;
        this.token = null;
      }
    },
  },

  persist: true,
});
