import { defineStore } from "pinia";
import { Recipe } from "@/types/dto/Recipe";
import { useRecipeApi } from "@/composables/api";

export const useSearchStore = defineStore("search", {
  state: () => ({
    result: [] as Array<Recipe>,
    searchTerm: "",
  }),

  getters: {},

  actions: {
    async search() {
      this.result = await useRecipeApi<Array<Recipe>>(
        "recipes/search",
        "GET",
        null,
        { q: this.searchTerm.trim() }
      );
    },
  },
});
