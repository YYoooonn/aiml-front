import { userApiRequest } from "./userApiRequest";
import { userAuthRequest } from "./userAuthRequest";

export const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
};

export const ENDPOINT = {
  O: "objects",
  P: "projects",
  U: "users",
  A: "auth",
} as const;

export type ENDPOINT = (typeof ENDPOINT)[keyof typeof ENDPOINT];

export { userAuthRequest, userApiRequest };
