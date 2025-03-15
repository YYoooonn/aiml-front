import { DEFAULT_HEADERS, headers, responseHandler } from "@/utils/api";
import { NextRequest, NextResponse } from "next/server";
// GET user entity
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string; entity: string } },
) {
  const header = headers(req)
  const res = await fetch(`${process.env.BACKEND_API_BASE}users/${params.id}/${params.entity}`, {
    method: "GET",
    headers: header,
  })

  //
  const data = await responseHandler(res)
  return NextResponse.json(JSON.stringify(data), {
    status: 200,
    headers: DEFAULT_HEADERS
  })
}
