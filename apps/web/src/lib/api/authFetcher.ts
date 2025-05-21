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
  const refreshToken = getRefreshTokenFromCookie();

  let revalidate = false;

  // 1차 요청
  if (accessToken) {
    const headers = {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };

    const response = await fetcher<T>(url, {
      ...options,
      headers: headers,
    });

    if (!response.revalidate) return response;
    revalidate = true;
  }

  // accessToken이 없거나 revalidate가 true → reissue 필요
  if ((!accessToken || revalidate) && refreshToken !== null) {
    accessToken = await getRefreshedToken(refreshToken);

    if (accessToken) {
      const retryHeaders = {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
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
async function getRefreshedToken(refreshToken: string): Promise<string | null> {
  if (!refreshing) {
    refreshing = refreshAccessToken(refreshToken).finally(() => {
      refreshing = null;
    });
  }
  return refreshing;
}

async function refreshAccessToken(
  refreshToken?: string,
): Promise<string | null> {
  if (!refreshToken) return null;

  const res = await fetch(`${ABS_ENDPOINTS.AUTH}/reissue`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken: refreshToken }),
  });

  const response: RevalidateResponse = await res.json();
  if (!response.success) return null;
  // ex: { accessToken: 'new-token' }
  return response.data.accessToken;
}
