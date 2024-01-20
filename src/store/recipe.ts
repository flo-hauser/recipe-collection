import { defineStore } from "pinia";
import { RecipeCreate } from "@/types/dto/RecipeCreate";
import { Recipe } from "@/types/dto/Recipe";
import { useRecipeApi, useRecipeApiUpload, apiHost } from "@/composables/api";
import { RecipeLinks } from "@/types/dto/Links";
import fallbackImg from "@/assets/placeholder.svg";
import urlJoin from "url-join";
import { Tag } from "@/types/dto/Tag";

export const useRecipeStore = defineStore("recipe", {
  state: () => ({
    _links: undefined as RecipeLinks | undefined,
    id: undefined as number | undefined,
    title: "",
    page: undefined as number | undefined,
    bookId: undefined as number | undefined,
    image: undefined as string | undefined,
    newImageFile: undefined as File | undefined,
    rating: 0 as number,
    tags: [] as Array<Tag>,
  }),

  getters: {
    newRecipe: function (state): RecipeCreate {
      return {
        title: state.title,
        page: state.page ?? 0,
        book_id: state.bookId ?? 0,
        rating: state.rating ?? 0,
        tags: state.tags,
      };
    },

    recipe: function (state) {
      return {
        _links: state._links,
        id: state.id,
        title: state.title,
        page: state.page,
        rating: state.rating,
        tags: state.tags,
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
    pushTag(tag: string) {
      const newTag = tag.replace("#", "").replace(" ", "").trim();
      if (newTag.length > 0) {
        // check if tag_name is already in tags
        if (!this.tags.find((t) => t.tag_name === newTag)) {
          this.tags.push({ tag_name: newTag });
        }
      }
    },

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
      this.rating = response.rating;
      this.tags = response.tags;

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

    async rateRecipe(rating: number) {
      if (this._links && rating >= 0 && rating <= 5) {
        const response = await useRecipeApi<Recipe>(
          `${this._links.self}/rating`,
          "PUT",
          null,
          { rating }
        );
        this.rating = response.rating;

        return response;
      }
    },
  },
});
