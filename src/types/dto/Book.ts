import { BookType } from "./BookType";
import { BookLinks } from "./Links";

type Book = {
  _links: BookLinks;
  id: number;
  title: string;
  year?: number;
  type: BookType;
};

type Cookbook = {
  author?: string;
  type: Exclude<BookType, "magazine">;
} & Book;

type Magazine = {
  issue?: string;
  type: Exclude<BookType, "cookbook">;
} & Book;

export { Cookbook, Magazine, Book };
