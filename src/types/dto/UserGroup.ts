import { UserGroupLinks } from "./Links";
import { User } from "./User";

type UserGroup = {
  _links: UserGroupLinks;
  id: number;
  group_name: string;
  group_admin: User;
  users: Array<User>;
};

export { UserGroup };
