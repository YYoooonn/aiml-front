"use server";

import { AuthResponse } from "@/@types/api";
import { API_ENDPOINTS } from "@/app/api/constants/constants";
import { fetcher } from "@/lib/api/fetcher";
import { NextRequest, NextResponse } from "next/server";
import { responseMapper } from "@/app/api/utils/responseMapper";

const ENDPOINT = API_ENDPOINTS.AUTH;

export async function POST(request: NextRequest) {
  const body = await request.json();
  const response = await fetcher(`${ENDPOINT}/reissue`, {
    method: "POST",
    body: JSON.stringify(body),
  });

  if (response.success) {
    const { accessToken, refreshToken } = response.data as AuthResponse["data"];
    const mapped = responseMapper(response);
    const res = NextResponse.json(mapped);
    res.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 60 * 30,
    });
    res.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  }

  const res = NextResponse.json({
    success: false,
    message: response.message || "Reissue failed",
    code: response.code || 500,
    data: null,
  });
  res.cookies.delete("accessToken");
  res.cookies.delete("refreshToken");
  return res;
}
