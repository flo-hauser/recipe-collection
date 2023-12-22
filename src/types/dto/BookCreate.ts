import { BookType } from "./BookType";

type BookCreate = {
  type: BookType;
  title: string;
  year?: number | undefined;
  author?: string | undefined;
  issue?: string | undefined;
};

export { BookCreate };
