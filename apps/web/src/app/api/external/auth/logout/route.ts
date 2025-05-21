"use server";

import { AuthResponse } from "@/@types/api";
import { API_ENDPOINTS } from "@/app/api/constants/constants";
import { fetcher } from "@/lib/api/fetcher";
import { NextRequest, NextResponse } from "next/server";
import { responseMapper } from "@/app/api/utils/responseMapper";
import { BaseResponse } from "@/@types/common";

const ENDPOINT = API_ENDPOINTS.AUTH;

// actions : login, reissue, register
// todo: logout

export async function POST(
  request: NextRequest,
) {
  // const body = await request.json();

  // FIXME logout response
  // const response = await fetcher(`${ENDPOINT}/${params.action}`, {
  //   method: "POST",
  // });

  const response = {
    success: true,
    code: 0,
    message: "Success",  
  } as BaseResponse<null>

  const mapped = responseMapper(response);
  const res = NextResponse.json(mapped);
  res.cookies.delete("accessToken");
  res.cookies.delete("refreshToken");
  return res;
}
