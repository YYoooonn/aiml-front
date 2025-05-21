import { BaseResponse, Entity } from "@/@types/common";
import { UserData, UserCore, UserProfile } from "./user.dto";

export type UserResponse = BaseResponse<UserData>;
export type UserProfileResponse = BaseResponse<UserProfile>;
export type UserCoreResponse = BaseResponse<UserCore>;
