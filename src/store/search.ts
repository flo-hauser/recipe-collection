import { defineStore } from "pinia";
import { Recipe } from "@/types/dto/Recipe";
import { useRecipeApi } from "@/composables/api";

type SearchItem = {
  id: number;
  item: string;
};

export const useSearchStore = defineStore("search", {
  state: () => ({
    result: [] as Array<Recipe>,
    searchTerm: "",
    searchItem: undefined as SearchItem | undefined,
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

    async searchByBook() {
      this.result = await useRecipeApi<Array<Recipe>>(
        "recipes/search",
        "GET",
        null,
        { book: this.searchItem?.id }
      );
    },
  },
});
