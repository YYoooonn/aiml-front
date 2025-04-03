import { BaseRequest } from "@/@types/api";
import { JWT_COOKIE_KEY } from "../constants";

type THeader = (
  req: BaseRequest,
  _method: BaseRequest["method"],
) => HeadersInit;

export const headers: THeader = (req, _method = "GET") => {
  const token = req.cookies.get(JWT_COOKIE_KEY);
  let base = {};
  if (token) {
    base = { ...base, Authorization: "Bearer ".concat(token.value) };
  }
  if (_method !== "GET") {
    base = { ...base, "Content-Type": "application/json" };
  }
  return base;
};
