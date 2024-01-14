type Links = {
  self: string;
};

type RecipeLinks = {
  book: string;
  user: string;
  image: string;
  thumbnail: string;
} & Links;

type BookLinks = {
  recipes: Array<string>;
  user: string;
} & Links;

type UserLinks = {} & Links;

export { RecipeLinks, BookLinks, UserLinks };
