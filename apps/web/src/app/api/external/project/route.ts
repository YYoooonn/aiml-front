"use server";

import { NextRequest, NextResponse } from "next/server";
import { fetchWithAuth } from "@/lib/api/authFetcher";
import { API_ENDPOINTS } from "@/app/api/constants/constants";
import { responseMapper } from "@/app/api/utils/responseMapper";

const ENDPOINT = API_ENDPOINTS.PROJECT;

export async function GET(request: NextRequest) {
  const response = await fetchWithAuth(`${ENDPOINT}`, {
    method: "GET",
  });

  const mapped = responseMapper(response);
  return NextResponse.json(mapped);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const response = await fetchWithAuth(`${ENDPOINT}`, {
    method: "POST",
    body: JSON.stringify(body),
  });

  const mapped = responseMapper(response);
  return NextResponse.json(mapped);
}
