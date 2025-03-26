import { headers, responseHandler, DEFAULT_HEADERS } from "@/utils/api";
import { NextRequest, NextResponse } from "next/server";

// GET projects
export async function GET(req: NextRequest) {
  const header = headers(req);
  const res = await fetch(`${process.env.BACKEND_API_BASE}objects`, {
    method: "GET",
    headers: header,
  });
  const data = await responseHandler(res);
  return NextResponse.json(JSON.stringify(data), {
    status: 200,
    headers: DEFAULT_HEADERS,
  });
}
