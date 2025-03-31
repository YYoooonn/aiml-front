"use server";

import { cookies } from "next/headers";

export async function createCookie(data: string) {
  cookies().set({
    name: "aimljwt",
    value: data,
    httpOnly: true,
  });
}

export async function hasCookie() {
  return cookies().has("aimljwt");
}

export async function getCookie() {
  return cookies().get("aimljwt")?.value;
}

// TODO log-out
export async function deleteCookie() {
  cookies().delete("aimljwt");
}
