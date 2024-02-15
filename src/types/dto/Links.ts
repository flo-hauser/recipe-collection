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

type UserLinks = {
  user_group: string | null;
  avatar: string;
} & Links;

type UserGroupLinks = {
  users: Array<string>;
} & Links;

export { RecipeLinks, BookLinks, UserLinks, UserGroupLinks };
