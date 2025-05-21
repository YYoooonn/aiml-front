"use server";

import { NextRequest, NextResponse } from "next/server";
import { API_ENDPOINTS } from "@/app/api/constants/constants";
import { responseMapper } from "@/app/api/utils/responseMapper";
import { fetcher } from "@/lib/api/fetcher";

const ENDPOINT = API_ENDPOINTS.SEARCH;

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } },
) {
  const searchParam = request.nextUrl.searchParams;
  const response = await fetcher(`${ENDPOINT}/${params.slug}?${searchParam}`, {
    method: "GET",
  });

  const mapped = responseMapper(response);
  return NextResponse.json(mapped);
}
