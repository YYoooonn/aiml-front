import { RegisterRequest } from "@/@types/api";
import { DEFAULT_HEADERS, ENDPOINT, userAuthRequest } from "@/utils/api";
import { NextResponse } from "next/server";

const PATH = ENDPOINT.U

// user registration
export async function POST(req: RegisterRequest) {
  const response = await userAuthRequest(PATH, req)
  return NextResponse.json(response, {
    status: 200,
    headers: DEFAULT_HEADERS,
  });
}
