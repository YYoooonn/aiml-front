import { DEFAULT_HEADERS, headers, responseHandler } from "@/utils/api";
import { NextRequest, NextResponse } from "next/server";

// GET user profile
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const header = headers(req);
  const res = await fetch(`${process.env.BACKEND_API_BASE}users/${params.id}`, {
    method: "GET",
    headers: header,
  });

  //
  const data = await responseHandler(res);
  return NextResponse.json(JSON.stringify(data), {
    status: 200,
    headers: DEFAULT_HEADERS,
  });
}

// UPDATE user profile
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const body = await req.json();
  const header = headers(req);
  const res = await fetch(`${process.env.BACKEND_API_BASE}users/${params.id}`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: header,
  });

  const data = await responseHandler(res);
  return NextResponse.json(JSON.stringify(data), {
    status: 200,
    headers: DEFAULT_HEADERS,
  });
}

// DELETE user
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const header = headers(req);
  const res = await fetch(`${process.env.BACKEND_API_BASE}users/${params.id}`, {
    method: "DELETE",
    headers: header,
  });

  const data = await responseHandler(res, true);
  return NextResponse.json(JSON.stringify(data), {
    status: 200,
    headers: DEFAULT_HEADERS,
  });
}
