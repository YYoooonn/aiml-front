import { AuthRequest, BaseRequest } from "@/@types/api";
import { DEFAULT_HEADERS, ENDPOINT, userAuthRequest } from "@/utils/api";
import { NextResponse } from "next/server";

const PATH = ENDPOINT.U;

// GET user profile
export async function GET(
  req: BaseRequest,
  { params }: { params: { id: string } },
) {
  const response = await userAuthRequest(PATH.concat(`/${params.id}`), req)
  return NextResponse.json(response, {
    status: 200,
    headers: DEFAULT_HEADERS,
  });
}

// UPDATE user profile
export async function PUT(
  req: AuthRequest,
  { params }: { params: { id: string } },
) {
  const response = await userAuthRequest(PATH.concat(`/${params.id}`), req)
  return NextResponse.json(response, {
    status: 200,
    headers: DEFAULT_HEADERS,
  });
}

// DELETE user
export async function DELETE(
  req: AuthRequest,
  { params }: { params: { id: string } },
) {
  const response = await userAuthRequest(PATH.concat(`/${params.id}`), req)
  return NextResponse.json(response, {
    status: 200,
    headers: DEFAULT_HEADERS,
  });
}
