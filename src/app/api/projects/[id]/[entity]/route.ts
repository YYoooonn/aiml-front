import { headers, responseHandler, DEFAULT_HEADERS } from "@/utils/api";
import { NextRequest, NextResponse } from "next/server";

// GET project entity
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string; entity: string } },
) {
  const header = headers(req);
  const res = await fetch(
    `${process.env.BACKEND_API_BASE}projects/${params.id}/${params.entity}`,
    {
      method: "GET",
      headers: header,
    },
  );

  //
  const data = await responseHandler(res);
  return NextResponse.json(JSON.stringify(data), {
    status: 200,
    headers: DEFAULT_HEADERS,
  });
}

// POST project entity
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string; entity: string } },
) {
  const header = headers(req);
  const body = await req.json();
  const res = await fetch(
    `${process.env.BACKEND_API_BASE}projects/${params.id}/${params.entity}`,
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: header,
    },
  );

  //
  const data = await responseHandler(res);
  return NextResponse.json(JSON.stringify(data), {
    status: 200,
    headers: DEFAULT_HEADERS,
  });
}
