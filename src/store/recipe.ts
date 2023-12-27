import { defineStore } from "pinia";
import { GeneralBook } from "@/types/dto/Book";
import { RecipeCreate } from "@/types/dto/RecipeCreate";
import { Recipe } from "@/types/dto/Recipe";
import { useRecipeApi } from "@/composables/api";
import { RecipeLinks } from "@/types/dto/Links";

export const useRecipeStore = defineStore("recipe", {
  state: () => ({
    _links: undefined as RecipeLinks | undefined,
    id: undefined as number | undefined,
    title: "",
    page: undefined as number | undefined,
    bookId: undefined as number | undefined,
  }),

  getters: {
    newRecipe: function (state): RecipeCreate {
      return {
        title: state.title,
        page: state.page ?? 0,
        book_id: state.bookId ?? 0,
      };
    },

    recipe: function (state) {
      return {
        _links: state._links,
        id: state.id,
        title: state.title,
        page: state.page,
      };
    },
  },

  actions: {
    async postRecipe(): Promise<GeneralBook> {
      if (!(this.title && this.bookId && this.page)) {
        throw new Error("incomplete recipe");
      }

      return await useRecipeApi<GeneralBook>("recipes", "POST", this.newRecipe);
    },

    async getRecipeById(id: number) {
      const response = await useRecipeApi<Recipe>(`recipes/${id}`);
      this.id = response.id;
      this._links = response._links;
      this.page = response.page;
      this.title = response.title;

      const bookIdFind = /\d+$/.exec(response._links.book);
      if (bookIdFind) {
        this.bookId = Number(bookIdFind[0]);
      }

      return response;
    },

    async updateRecipe() {
      if (this.id && this._links && this.title && this.bookId) {
        const response = await useRecipeApi<Recipe>(this._links.self, "PUT", {
          ...this.recipe,
          book_id: this.bookId,
        });

        this._links = response._links;
        this.title = response.title;
        this.page = response.page;
      } else {
        throw new Error("incomplete book");
      }
    },

    async deleteBook(id: number) {
      if (this.id == id && this._links) {
        await useRecipeApi(this._links?.self, "DELETE");
        this.$reset();
        return true;
      }
    },
  },
});
