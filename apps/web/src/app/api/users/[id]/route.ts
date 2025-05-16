import { DEFAULT_HEADERS, ENDPOINT, userAuthRequest } from "@/utils/api";
import { NextRequest, NextResponse } from "next/server";

const PATH = ENDPOINT.U;

// GET user profile
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const response = await userAuthRequest(PATH.concat(`/${params.id}`), req);
  return NextResponse.json(response, {
    status: 200,
    headers: DEFAULT_HEADERS,
  });
}

// UPDATE user profile
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const response = await userAuthRequest(PATH.concat(`/${params.id}`), req);
  return NextResponse.json(response, {
    status: 200,
    headers: DEFAULT_HEADERS,
  });
}

// DELETE user
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const response = await userAuthRequest(PATH.concat(`/${params.id}`), req);
  return NextResponse.json(response, {
    status: 200,
    headers: DEFAULT_HEADERS,
  });
}
