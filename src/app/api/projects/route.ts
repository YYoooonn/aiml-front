import { BaseRequest, ProjectRequest } from "@/@types/api";
import { DEFAULT_HEADERS, userAuthRequest, ENDPOINT } from "@/utils/api";
import { NextResponse } from "next/server";

const PATH = ENDPOINT.P;

// GET projects
export async function GET(req: BaseRequest) {
  const response = await userAuthRequest(PATH, req)
  return NextResponse.json(response, {
    status: 200,
    headers: DEFAULT_HEADERS,
  });
}

export async function POST(req: ProjectRequest) {
  const response = await userAuthRequest(PATH, req)
  return NextResponse.json(response, {
    status: 200,
    headers: DEFAULT_HEADERS,
  });
}
