import { DEFAULT_HEADERS, userAuthRequest, ENDPOINT } from "@/utils/api";
import { NextRequest, NextResponse } from "next/server";

const PATH = ENDPOINT.O

// GET projects
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const response = await userAuthRequest(PATH.concat(`/${params.id}`), req)
  return NextResponse.json(response, {
    status: 200,
    headers: DEFAULT_HEADERS,
  });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const response = await userAuthRequest(PATH.concat(`/${params.id}`), req)
  return NextResponse.json(response, {
    status: 200,
    headers: DEFAULT_HEADERS,
  });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const response = await userAuthRequest(PATH.concat(`/${params.id}`), req)
  return NextResponse.json(response, {
    status: 200,
    headers: DEFAULT_HEADERS,
  });
}
