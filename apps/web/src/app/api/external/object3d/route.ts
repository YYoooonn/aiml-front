"use server";

import { fetchWithAuth } from "@/lib/api/authFetcher";
import { NextRequest, NextResponse } from "next/server";
import { API_ENDPOINTS } from "@/app/api/constants/constants";
import { responseMapper } from "@/app/api/utils/responseMapper";

const ENDPOINT = API_ENDPOINTS.OBJ3D;

export async function POST(request: NextRequest) {
  const body = await request.json();
  const response = await fetchWithAuth(`${ENDPOINT}`, {
    method: "POST",
    body: JSON.stringify(body),
  });

  const mapped = responseMapper(response);
  return NextResponse.json(mapped);
}
