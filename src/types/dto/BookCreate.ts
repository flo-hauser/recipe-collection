import { BookType } from "./BookType";

type BookCreate = {
  type: BookType;
  title: string;
  year?: number;
  author?: string;
  issue?: string;
};

export { BookCreate };
