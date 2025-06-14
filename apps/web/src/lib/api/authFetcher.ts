"use server";

import { RevalidateResponse } from "@/@types/api";
import { BaseResponse } from "@/@types/common";
import { getAccessTokenFromCookie, getRefreshTokenFromCookie } from "../token";
import { fetcher } from "./fetcher";
import { ABS_ENDPOINTS } from "@/app/api/constants/constants";

// reissue 중복 방지 Promise lock
let refreshing: Promise<string | null> | null = null;

export async function fetchWithAuth<T>(
  url: string,
  options: RequestInit = {},
): Promise<BaseResponse<T>> {
  let accessToken = getAccessTokenFromCookie();
  let revalidate = false;

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${accessToken}`,
  };

  // 1차 요청
  if (accessToken) {
    const response = await fetcher<T>(url, {
      ...options,
      headers: headers,
    });

    if (!response.revalidate) return response;
    revalidate = true;
  }

  // accessToken이 없거나 revalidate가 true → reissue 필요
  if (!accessToken || revalidate) {
    accessToken = await getRefreshedToken();
    if (accessToken) {
      const retryHeaders = {
        ...headers,
        Authorization: `Bearer ${accessToken}`,
      };

      return await fetcher<T>(url, {
        ...options,
        headers: retryHeaders,
      });
    }
  }

  return {
    data: null as T,
    success: false,
    message: "Unauthorized",
    revalidate: false,
    code: 401,
  } as BaseResponse<T>;
}

// refresh 중복 방지 Promise
async function getRefreshedToken(): Promise<string | null> {
  if (!refreshing) {
    refreshing = (async () => {
      const refreshToken = getRefreshTokenFromCookie();
      if (!refreshToken) return null;

      const res = await fetch(`${ABS_ENDPOINTS.AUTH}/reissue`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });

      const response: RevalidateResponse = await res.json();
      if (!response.success) return null;

      return response.data.accessToken;
    })().finally(() => {
      refreshing = null;
    });
  }
  return refreshing;
}
