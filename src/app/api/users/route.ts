import { DEFAULT_HEADERS, ENDPOINT, userAuthRequest } from "@/utils/api";
import { NextRequest, NextResponse } from "next/server";

const PATH = ENDPOINT.U;

// user registration
export async function POST(req: NextRequest) {
  const response = await userAuthRequest(PATH, req);
  return NextResponse.json(response, {
    status: 200,
    headers: DEFAULT_HEADERS,
  });
}
