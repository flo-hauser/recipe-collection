type Links = {
  self: string;
};

type RecipeLinks = {
  book: string;
  user: string;
} & Links;

type BookLinks = {
  recipes: string;
  user: string;
} & Links;

type UserLinks = {} & Links;

export { RecipeLinks, BookLinks, UserLinks };
