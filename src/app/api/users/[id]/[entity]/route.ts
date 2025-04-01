import { BaseRequest } from "@/@types/api";
import { NextResponse } from "next/server";
import { DEFAULT_HEADERS, userAuthRequest, ENDPOINT } from "@/utils/api";


const PATH = ENDPOINT.U;

// GET user entity
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
