"use server";

import { fetchWithAuth } from "@/lib/api/authFetcher";
import { NextRequest, NextResponse } from "next/server";
import { API_ENDPOINTS } from "@/app/api/constants/constants";
import { responseMapper } from "@/app/api/utils/responseMapper";

const ENDPOINT = API_ENDPOINTS.PROJECT;

// entity : scenes, participant, ...

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string; slug: string[] } },
) {
  const response = await fetchWithAuth(
    `${ENDPOINT}/${params.id}/${params.slug.join("/")}`,
    {
      method: "GET",
    },
  );

  const mapped = responseMapper(response);
  return NextResponse.json(mapped);
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string; slug: string[] } },
) {
  const body = await request.json();
  const response = await fetchWithAuth(
    `${ENDPOINT}/${params.id}/${params.slug.join("/")}`,
    {
      method: "POST",
      body: JSON.stringify(body),
    },
  );

  const mapped = responseMapper(response);
  return NextResponse.json(mapped);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string; slug: string[] } },
) {
  const body = await request.json();
  const response = await fetchWithAuth(
    `${ENDPOINT}/${params.id}/${params.slug.join("/")}`,
    {
      method: "PUT",
      body: JSON.stringify(body),
    },
  );

  const mapped = responseMapper(response);
  return NextResponse.json(mapped);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; slug: string[] } },
) {
  const response = await fetchWithAuth(
    `${ENDPOINT}/${params.id}/${params.slug.join("/")}`,
    {
      method: "DELETE",
    },
  );

  const mapped = responseMapper(response);
  return NextResponse.json(mapped);
}
