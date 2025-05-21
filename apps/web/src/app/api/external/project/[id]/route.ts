"use server";

import { NextRequest, NextResponse } from "next/server";
import { fetchWithAuth } from "@/lib/api/authFetcher";
import { API_ENDPOINTS } from "@/app/api/constants/constants";
import { responseMapper } from "@/app/api/utils/responseMapper";

const ENDPOINT = API_ENDPOINTS.PROJECT;

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const response = await fetchWithAuth(`${ENDPOINT}/${params.id}`, {
    method: "GET",
  });

  const mapped = responseMapper(response);
  return NextResponse.json(mapped);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const body = await request.json();
  const response = await fetchWithAuth(`${ENDPOINT}/${params.id}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });

  const mapped = responseMapper(response);
  return NextResponse.json(mapped);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const response = await fetchWithAuth(`${ENDPOINT}/${params.id}`, {
    method: "DELETE",
  });

  const mapped = responseMapper(response);
  return NextResponse.json(mapped);
}
