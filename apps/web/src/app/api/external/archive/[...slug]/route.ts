"use server";

import { API_ENDPOINTS } from "@/app/api/constants/constants";
import { fetcher } from "@/lib/api/fetcher";
import {
  responseMapper,
  UNKNOWN_ERROR_RESPONSE,
} from "@/app/api/utils/responseMapper";
import { NextRequest, NextResponse } from "next/server";

// search

const ENDPOINT = API_ENDPOINTS.ARCHIVE;

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string[] } },
) {
  const route = params.slug[0];
  if (route !== "search")
    return NextResponse.json(UNKNOWN_ERROR_RESPONSE("route must be search"));
  const searchParam = request.nextUrl.searchParams;
  const { q, n, s } = {
    q: searchParam.get("query"),
    n: searchParam.get("pageNum"),
    s: searchParam.get("pageSize"),
  };
  const response = await fetcher(
    `${ENDPOINT}/${route}?query=${q}&pageNum=${n}&pageSize=${s}`,
    {
      method: "GET",
    },
  );

  const mapped = responseMapper(response);
  return NextResponse.json(mapped);
}
