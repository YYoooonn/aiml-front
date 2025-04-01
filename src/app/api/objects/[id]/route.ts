import { BaseRequest, TObjectRequest } from "@/@types/api";
import { DEFAULT_HEADERS, userAuthRequest, ENDPOINT } from "@/utils/api";
import { NextResponse } from "next/server";

const PATH = ENDPOINT.O

// GET projects
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

export async function PUT(
  req: TObjectRequest,
  { params }: { params: { id: string } },
) {
  const response = await userAuthRequest(PATH.concat(`/${params.id}`), req)
  return NextResponse.json(response, {
    status: 200,
    headers: DEFAULT_HEADERS,
  });
}

export async function DELETE(
  req: BaseRequest,
  { params }: { params: { id: string } },
) {
  const response = await userAuthRequest(PATH.concat(`/${params.id}`), req)
  return NextResponse.json(response, {
    status: 200,
    headers: DEFAULT_HEADERS,
  });
}
