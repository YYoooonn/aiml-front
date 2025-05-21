"use server";

import { fetchWithAuth } from "@/lib/api/authFetcher";
import { NextRequest, NextResponse } from "next/server";
import { API_ENDPOINTS } from "@/app/api/constants/constants";
import { responseMapper } from "@/app/api/utils/responseMapper";

const ENDPOINT = `${API_ENDPOINTS.USER}/me`;

export async function GET(request: NextRequest) {
  const response = await fetchWithAuth(`${ENDPOINT}`, {
    method: "GET",
  });

  const mapped = responseMapper(response);
  return NextResponse.json(mapped);
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const response = await fetchWithAuth(`${ENDPOINT}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });

  const mapped = responseMapper(response);
  return NextResponse.json(mapped);
}

export async function DELETE(request: NextRequest) {
  const response = await fetchWithAuth(`${ENDPOINT}`, {
    method: "DELETE",
  });

  const mapped = responseMapper(response);
  return NextResponse.json(mapped);
}
