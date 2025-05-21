import { User } from "../user/user.dto";

export interface LoginRequest {
  username: string;
  password: string;
}
export interface RegisterRequest extends User {
  password: string;
}
export interface RevalidateRequest {
  refreshToken: string;
}

export interface LogoutRequest {}
