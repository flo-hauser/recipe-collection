import { defineStore } from "pinia";
import { GeneralBook } from "@/types/dto/Book";
import { BookCreate } from "@/types/dto/BookCreate";
import { useRecipeApi } from "@/composables/api";
import { BookLinks } from "@/types/dto/Links";

export const useBookStore = defineStore("book", {
  state: () => ({
    _links: undefined as BookLinks | undefined,
    id: undefined as number | undefined,
    isBook: true,
    title: "",
    year: undefined as number | undefined,
    author: undefined as string | undefined,
    issue: undefined as string | undefined,
  }),

  getters: {
    isMagazine: (state) => !state.isBook,
    bookType: (state) => (state.isBook ? "cookbook" : "magazine"),
    newBook: function (state): BookCreate {
      return {
        type: this.bookType,
        title: state.title,
        year: state.year,
        author: state.author,
        issue: state.issue,
      };
    },

    book: function (state) {
      return {
        _links: state._links,
        type: state.isBook ? "cookbook" : "magazine",
        id: state.id,
        isBook: state.isBook,
        title: state.title,
        year: state.year,
        author: state.author,
        issue: state.issue,
      };
    },
  },

  actions: {
    async postBook(): Promise<GeneralBook> {
      if (!this.title) {
        throw new Error("incomplete book");
      }

      return await useRecipeApi<GeneralBook>("books", "POST", this.newBook);
    },

    async getBookById(id: number) {
      const bookResponse = await useRecipeApi<GeneralBook>(`books/${id}`);
      this.id = bookResponse.id;
      this._links = bookResponse._links;
      this.isBook = bookResponse.type == "cookbook" ? true : false;
      this.title = bookResponse.title;
      this.year = bookResponse.year;
      this.author = bookResponse.author;
      this.issue = bookResponse.issue;

      return bookResponse;
    },

    async updateBook() {
      if (this.id && this._links && this.title) {
        const bookResponse = await useRecipeApi<GeneralBook>(
          this._links.self,
          "PUT",
          this.book
        );

        this.id = bookResponse.id;
        this._links = bookResponse._links;
        this.isBook = bookResponse.type == "cookbook" ? true : false;
        this.title = bookResponse.title;
        this.year = bookResponse.year;
        this.author = bookResponse.author;
        this.issue = bookResponse.issue;

        return bookResponse;
      } else {
        throw new Error("incomplete book");
      }
    },
  },
});
