import { userApiRequest } from "@/utils/api";
import { BaseUserInfo } from "./actions";
import { AUTH_ROUTE, errorHandler } from "./utils";
import { createCookie } from "../_actions/auth";

export async function login(props: BaseUserInfo) {
  console.log("1. login action start", props)
  const response = await fetch(AUTH_ROUTE, {
    method: "POST",
    body: JSON.stringify(props),
  })
  const res = await response.json()
  const parsed = JSON.parse(res)

  if(parsed.token){
    await createCookie(parsed.token)
  }

  return parsed
}
