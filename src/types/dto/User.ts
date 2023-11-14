import { UserLinks } from "./Links"

type User = {
    _links: UserLinks;
    id: number;
    email?: string;
    username: string;
    roles: Array<Role>
}

type Role = "user" | "admin";

export { User }