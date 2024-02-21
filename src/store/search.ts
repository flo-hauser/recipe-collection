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
    firstCall: true,
  }),

  getters: {},

  actions: {
    async search() {
      this.firstCall = false;
      const tags: string[] = [];
      const filteredSearchTerm: string[] = [];

      const words = this.searchTerm.trim().split(" ");
      words.forEach((word) => {
        if (word.startsWith("#")) {
          tags.push(...word.slice(1).split("#"));
        } else {
          filteredSearchTerm.push(word);
        }
      });

      const searchObject: { q: string; tags?: string } = {
        q: filteredSearchTerm.join(" "),
      };

      if (tags.length > 0) {
        searchObject.tags = tags.join(",");
      }

      this.result = await useRecipeApi<Array<Recipe>>(
        "recipes/search",
        "GET",
        null,
        searchObject
      );
    },

    async searchRandom() {
      if (this.firstCall) {
        this.result = await useRecipeApi<Array<Recipe>>(
          "recipes/search/random",
          "GET",
          null,
          { limit: 10 }
        );
        this.firstCall = false;
      }
    },

    async searchByBook() {
      this.firstCall = false;
      this.result = await useRecipeApi<Array<Recipe>>(
        "recipes/search",
        "GET",
        null,
        { book: this.searchItem?.id }
      );
    },
  },
});
