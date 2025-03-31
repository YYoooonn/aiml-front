import { AUTH_ROUTE, responseHandler } from "./utils";
import { createCookie, deleteCookie } from "./cookie";
import { LoginRequest, LoginResponse } from "@/@types/api";
import { ActionResponse } from "./actions";

export async function login(props: LoginRequest["body"]) {
  deleteCookie();
  const response = await fetch(AUTH_ROUTE, {
    method: "POST",
    body: JSON.stringify(props),
  });

  const r: ActionResponse<LoginResponse["body"]> = await responseHandler(
    response,
    "auth action",
  );
  if (r.success) {
    await createCookie(r.data.token);
    return { success: true };
  } else {
    return { success: false, error: r.error };
  }
}
