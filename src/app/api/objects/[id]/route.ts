import { headers, responseHandler, DEFAULT_HEADERS } from "@/utils/api";
import { NextRequest, NextResponse } from "next/server";

// GET projects
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const header = headers(req);
  const res = await fetch(
    `${process.env.BACKEND_API_BASE}objects/${params.id}`,
    {
      method: "GET",
      headers: header,
    },
  );
  const data = await responseHandler(res);
  return NextResponse.json(JSON.stringify(data), {
    status: 200,
    headers: DEFAULT_HEADERS,
  });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const header = headers(req);
  const body = await req.json();
  const res = await fetch(
    `${process.env.BACKEND_API_BASE}objects/${params.id}`,
    {
      method: "PUT",
      body: JSON.stringify(body),
      headers: header,
    },
  );
  const data = await responseHandler(res);
  return NextResponse.json(JSON.stringify(data), {
    status: 200,
    headers: DEFAULT_HEADERS,
  });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const header = headers(req);
  const res = await fetch(
    `${process.env.BACKEND_API_BASE}objects/${params.id}`,
    {
      method: "DELETE",
      headers: header,
    },
  );
  const data = await responseHandler(res);
  return NextResponse.json(JSON.stringify(data), {
    status: 200,
    headers: DEFAULT_HEADERS,
  });
}
