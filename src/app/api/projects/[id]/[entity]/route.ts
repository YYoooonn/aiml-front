import { BaseRequest, ProjectRequest } from "@/@types/api";
import { headers, responseHandler, DEFAULT_HEADERS, userAuthRequest, ENDPOINT } from "@/utils/api";
import { NextResponse } from "next/server";


const PATH = ENDPOINT.P;

// GET project entity
export async function GET(
  req: BaseRequest,
  { params }: { params: { id: string; entity: string } },
) {
  const response = await userAuthRequest(PATH.concat(`/${params.id}/${params.entity}`), req)
  return NextResponse.json(response, {
    status: 200,
    headers: DEFAULT_HEADERS,
  });
}

// POST project entity
export async function POST(
  req: ProjectRequest,
  { params }: { params: { id: string; entity: string } },
) {
  const response = await userAuthRequest(PATH.concat(`/${params.id}/${params.entity}`), req)
  return NextResponse.json(response, {
    status: 200,
    headers: DEFAULT_HEADERS,
  });
}
