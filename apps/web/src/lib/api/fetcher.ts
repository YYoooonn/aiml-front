"use server";

import { BaseResponse } from "@/@types/common";

export async function fetcher<T>(
  url: string,
  options: RequestInit = {},
): Promise<BaseResponse<T>> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...parseHeaders(options.headers),
  };

  const res = await fetch(`${url}`, {
    ...options,
    headers: headers,
  });

  if (!res.ok && res.headers.get("Content-Type") !== "application/json") {
    const msg = await res.text();
    return {
      data: null as T,
      success: false,
      message: msg,
      revalidate: null,
      code: res.status,
    };
  }

  // XXX Check res.ok?
  const json = await res.json();
  return json as BaseResponse<T>;
}

function parseHeaders(
  headers: HeadersInit | undefined,
): Record<string, string> {
  if (!headers) return {};
  if (headers instanceof Headers) {
    return Object.fromEntries(headers.entries());
  }
  if (Array.isArray(headers)) {
    return Object.fromEntries(headers);
  }
  return headers;
}
