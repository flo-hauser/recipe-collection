import { BookType } from "./BookType";

type BookCreate = {
  type: BookType;
  title: string;
  year?: string;
  author?: string;
  issue?: string;
};

export { BookCreate };
