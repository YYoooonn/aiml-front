"use server";

import { API_ENDPOINTS } from "@/app/api/constants/constants";
import { fetcher } from "@/lib/api/fetcher";
import { NextRequest, NextResponse } from "next/server";
import { responseMapper } from "@/app/api/utils/responseMapper";

const ENDPOINT = API_ENDPOINTS.AUTH;

export async function POST(request: NextRequest) {
  const body = await request.json();
  const response = await fetcher(`${ENDPOINT}/register`, {
    method: "POST",
    body: JSON.stringify(body),
  });

  return NextResponse.json(responseMapper(response));
}
