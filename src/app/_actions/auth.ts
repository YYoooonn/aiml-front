import { BaseUserInfo } from "./actions";
import { AUTH_ROUTE, responseHandler } from "./utils";
import { createCookie } from "./cookie";

export async function login(props: BaseUserInfo) {
  const response = await fetch(AUTH_ROUTE, {
    method: "POST",
    body: JSON.stringify(props),
  })
  const data = await responseHandler(response, "auth action")
  if(data.token){
    await createCookie(data.token)
  }

  return data
}
