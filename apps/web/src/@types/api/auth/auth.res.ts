import { BaseResponse, Entity } from "@/@types/common";
import { User } from "../user/user.dto";

export type AuthResponse = BaseResponse<{
  accessToken: string;
  refreshToken: string;
}>;

export type RegisterResponse = BaseResponse<Omit<Entity<User>, "id">>;

export type RevalidateResponse = BaseResponse<{
  accessToken: string;
  refreshToken: string;
}>;

export type LogoutResponse = BaseResponse<{}>;
