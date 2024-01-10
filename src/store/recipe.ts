import { defineStore } from "pinia";
import { RecipeCreate } from "@/types/dto/RecipeCreate";
import { Recipe } from "@/types/dto/Recipe";
import { useRecipeApi, useRecipeApiUpload } from "@/composables/api";
import { RecipeLinks } from "@/types/dto/Links";
import fallbackImg from "@/assets/placeholder.svg";
import { apiHost } from "@/composables/api";
import urlJoin from "url-join";

export const useRecipeStore = defineStore("recipe", {
  state: () => ({
    _links: undefined as RecipeLinks | undefined,
    id: undefined as number | undefined,
    title: "",
    page: undefined as number | undefined,
    bookId: undefined as number | undefined,
    image: undefined as string | undefined,
    newImageFile: undefined as File | undefined,
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

    imgSrc: function (state) {
      if (state._links?.image) {
        return urlJoin(apiHost, state._links.image);
      } else if (state.newImageFile) {
        return URL.createObjectURL(state.newImageFile);
      } else {
        return fallbackImg;
      }
    },
  },

  actions: {
    async postRecipe(): Promise<Recipe> {
      if (!(this.title && this.bookId && this.page)) {
        throw new Error("incomplete recipe");
      }

      let newRecipe = await useRecipeApi<Recipe>(
        "recipes",
        "POST",
        this.newRecipe
      );
      if (newRecipe.id && this.newImageFile) {
        const formData = new FormData();
        formData.append("image", this.newImageFile);

        newRecipe = await useRecipeApiUpload<Recipe>(
          `recipes/${newRecipe.id}/image`,
          "PUT",
          formData
        );
      }
      return newRecipe;
    },

    async getRecipeById(id: number) {
      const response = await useRecipeApi<Recipe>(`recipes/${id}`);
      this.id = response.id;
      this._links = response._links;
      this.page = response.page;
      this.title = response.title;
      this.image = response.image ?? undefined;

      const bookIdFind = /\d+$/.exec(response._links.book);
      if (bookIdFind) {
        this.bookId = Number(bookIdFind[0]);
      }

      return response;
    },

    async updateRecipe() {
      if (this.id && this._links && this.title && this.bookId) {
        let response = await useRecipeApi<Recipe>(this._links.self, "PUT", {
          ...this.recipe,
          book_id: this.bookId,
        });

        if (this.newImageFile) {
          const formData = new FormData();
          formData.append("image", this.newImageFile);

          response = await useRecipeApiUpload<Recipe>(
            `recipes/${this.id}/image`,
            "PUT",
            formData
          );
        }

        this._links = response._links;
        this.title = response.title;
        this.page = response.page;
        this.image = response.image ?? undefined;
      } else {
        throw new Error("incomplete book");
      }
    },

    async deleteRecipe(id: number) {
      if (this.id == id && this._links) {
        await useRecipeApi<void>(this._links?.self, "DELETE");
        this.$reset();
        return true;
      }
    },
  },
});
