// Utilities
import { defineStore } from "pinia";
import { Token } from "@/types/dto/Token";
import { User } from "@/types/dto/User";
import { NewUser } from "@/types/dto/NewUser";
import { useRecipeApiLogin, useRecipeApi } from "@/composables/api";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    loggedIn: false,
    user: null as User | null,
    token: null as Token | null,
  }),

  actions: {
    async login(username: string, password: string) {
      try {
        this.token = await useRecipeApiLogin(username, password);
        if (this.token) {
          this.loggedIn = true;
          this.user = await useRecipeApi<User>("users/me", "GET");
        } else {
          this.$reset;
        }
      } catch (err) {
        console.warn("failed login");
        throw err;
      }
    },
    logout() {
      this.$reset;
    },

    async refresh() {
      try {
        const t = await useRecipeApi<Token>("tokens/refresh", "GET");
        if (t) {
          this.token = t;
        }
        return false;
      } catch (e) {
        console.log("could not refresh");
      }
    },

    async register(newUserObject: NewUser) {
      try {
        const newUser = await useRecipeApi<User>(
          "users",
          "POST",
          newUserObject
        );
        return newUser;
      } catch (e) {
        console.log(e);
        throw e;
      }
    },
  },

  getters: {
    // Return Fn to recalculate new Date on call
    isTokenValid: (state) => {
      return () => {
        if (state.token?.token_expiration) {
          const expiryDateString = state.token.token_expiration;
          const expiryDate = new Date(Date.parse(expiryDateString));
          const currentDate = new Date();
          return expiryDate > currentDate ? true : false;
        } else {
          return false;
        }
      };
    },

    tokenRemainingTime: (state) => {
      return () => {
        if (state.token?.token_expiration) {
          const expiryDate = new Date(Date.parse(state.token.token_expiration));
          const currentDate = new Date();
          const diff = expiryDate.getTime() - currentDate.getTime();
          return diff;
        } else {
          return 0;
        }
      };
    },
  },

  persist: true,
});
