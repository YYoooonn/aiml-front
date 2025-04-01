import { BaseRequest } from "@/@types/api";
import { DEFAULT_HEADERS, ENDPOINT, userAuthRequest } from "@/utils/api";
import { NextResponse } from "next/server";

const PATH = ENDPOINT.O;

// GET objects
export async function GET(req: BaseRequest) {
  const response = await userAuthRequest(PATH, req)
  return NextResponse.json(response, {
    status: 200,
    headers: DEFAULT_HEADERS,
  });
}
