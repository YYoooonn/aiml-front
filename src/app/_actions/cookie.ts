"use server";

import { cookies } from "next/headers";

export async function createCookie(data: string) {
  // if(cookies().has("aimljwt")){
  //   console.log("aimljwt cookie in place, removal process..")
  //   deleteCookie()
  // }
  cookies().set({
    name: "aimljwt",
    value: data,
    httpOnly: true,
  });
  // console.log("Cookie from aimljwt", cookies().get("aimljwt"));
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
