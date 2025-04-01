import { DEFAULT_HEADERS, userAuthRequest, ENDPOINT } from "@/utils/api";
import { NextResponse, NextRequest } from "next/server";

const PATH = ENDPOINT.P;

// GET projects
export async function GET(req: NextRequest) {
  const response = await userAuthRequest(PATH, req);
  return NextResponse.json(response, {
    status: 200,
    headers: DEFAULT_HEADERS,
  });
}

export async function POST(req: NextRequest) {
  const response = await userAuthRequest(PATH, req);
  return NextResponse.json(response, {
    status: 200,
    headers: DEFAULT_HEADERS,
  });
}
