import { HasImage } from "./HasImage";
import { RecipeLinks } from "./Links";

export type Recipe = {
  _links: RecipeLinks;
  id: number;
  page: number;
  title: string;
  rating: number;
} & HasImage;
