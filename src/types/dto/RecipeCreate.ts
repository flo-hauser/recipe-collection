import { Tag } from "./Tag";

export type RecipeCreate = {
  page: number;
  title: string;
  book_id: number;
  rating: number;
  tags: Tag[];
};
