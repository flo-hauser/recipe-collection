import { defineStore } from "pinia";
import { GeneralBook } from "@/types/dto/Book";
import { useRecipeApi } from "@/composables/api";

export const useBookListStore = defineStore("bookList", {
  state: () => ({
    bookList: [] as Array<GeneralBook>,
  }),

  getters: {
    getCookbooks: (state) => {
      return state.bookList.filter((book) => book.type == "cookbook");
    },
    getMagazines: (state) => {
      return state.bookList.filter((book) => book.type == "magazine");
    },

    getSelectItems: (state) => {
      return state.bookList.map((book) => ({
        value: book.id,
        title:
          book.type == "cookbook" ? book.title : `${book.title} ${book.issue}`,
      }));
    },

    getBookById: (state) => {
      return (id: number) => {
        const books = state.bookList.filter((book) => book.id == id);
        if (books) {
          return books[0];
        }
      };
    },

    getBookByLink: (state) => {
      return (link: string) => {
        const books = state.bookList.filter((book) => book._links.self == link);
        if (books) {
          return books[0];
        }
      };
    },
  },

  actions: {
    async getBooks() {
      try {
        this.bookList = await useRecipeApi<Array<GeneralBook>>("books");
      } catch (e) {
        console.warn(e);
      }
    },
  },
});
