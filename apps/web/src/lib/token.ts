import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export function getAccessTokenFromCookie(): string | null {
  return cookies().get("accessToken")?.value ?? null;
}

export function getRefreshTokenFromCookie(): string | null {
  return cookies().get("refreshToken")?.value ?? null;
}

export function clearAuthCookies() {
  const res = NextResponse.redirect("/");
  res.cookies.delete("accessToken");
  res.cookies.delete("refreshToken");
  return res;
}
