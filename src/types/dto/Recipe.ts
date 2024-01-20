import { HasImage } from "./HasImage";
import { RecipeLinks } from "./Links";
import { Tag } from "./Tag";

export type Recipe = {
  _links: RecipeLinks;
  id: number;
  page: number;
  title: string;
  rating: number;
  tags: Tag[];
} & HasImage;
