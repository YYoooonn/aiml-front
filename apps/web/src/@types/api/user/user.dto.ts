import { Entity } from "@/@types/common";

export interface UserCore {
  username: string;
  email: string;
}

export interface UserProfile {
  firstName?: string;
  lastName?: string;
  bio?: string;
  imageUrl?: string;
}

export interface User extends UserCore, UserProfile {}

export type UserData = Omit<Entity<User>, "id">;
