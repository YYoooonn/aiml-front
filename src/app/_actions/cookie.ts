"use server";

import { cookies } from "next/headers";
import { JWT_COOKIE_KEY } from "@/utils/constants";

export async function createCookie(data: string) {
  cookies().set({
    name: JWT_COOKIE_KEY,
    value: data,
    httpOnly: true,
  });
}

export async function hasCookie() {
  return cookies().has(JWT_COOKIE_KEY);
}

export async function getCookie() {
  return cookies().get(JWT_COOKIE_KEY)?.value;
}

// TODO log-out
export async function deleteCookie() {
  cookies().delete(JWT_COOKIE_KEY);
}
