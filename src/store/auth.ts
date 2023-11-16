// Utilities
import { defineStore } from "pinia";
import { Token } from "@/types/dto/Token";
import { User } from "@/types/dto/User";

export const useAuthStore = defineStore("app", {
  state: () => ({
    loggedIn: false,
    user: null as User | null,
    token: null as Token | null,
  }),
});
