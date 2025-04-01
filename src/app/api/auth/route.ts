"use server";

import { LoginRequest } from "@/@types/api";
import { DEFAULT_HEADERS, ENDPOINT, userApiRequest } from "@/utils/api";
import { NextResponse } from "next/server";

const PATH = ENDPOINT.A;

// login
export async function POST(req: LoginRequest) {
  const response = await userApiRequest(PATH.concat("/login"), req);
  return NextResponse.json(response, {
    status: 200,
    headers: DEFAULT_HEADERS,
  });
}
