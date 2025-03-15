"use server";

import { DEFAULT_HEADERS, headers, responseHandler } from "@/utils/api";
import { NextRequest, NextResponse } from "next/server";

// login
export async function POST(req: NextRequest) {
  const body = await req.json();
  const header = headers(req);
  const res = await fetch(`${process.env.BACKEND_API_BASE}auth/login`, {
    body: JSON.stringify(body),
    method: "POST",
    headers: header,
  });

  const data = await responseHandler(res);
  return NextResponse.json(JSON.stringify(data), {
    status: 200,
    headers: DEFAULT_HEADERS,
  });
}
