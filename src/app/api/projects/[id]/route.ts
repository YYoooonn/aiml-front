import { DEFAULT_HEADERS, headers, responseHandler } from "@/utils/api";
import { NextRequest, NextResponse } from "next/server";

// GET projects
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const header = headers(req);
  let res;
  if (params.id === "search") {
    const searchParam = req.nextUrl.searchParams;
    const { k, n, s } = {
      k: searchParam.get("keyword"),
      n: searchParam.get("pageNum"),
      s: searchParam.get("pageSize"),
    };
    res = await fetch(
      `${process.env.BACKEND_API_BASE}projects/search?keyword=${k}&pageNum=${n}&pageSize=${s}`,
      {
        method: "GET",
        headers: header,
      },
    );
  } else {
    res = await fetch(`${process.env.BACKEND_API_BASE}projects/${params.id}`, {
      method: "GET",
      headers: header,
    });
  }
  const data = await responseHandler(res);
  return NextResponse.json(JSON.stringify(data), {
    status: 200,
    headers: DEFAULT_HEADERS,
  });
}

// UPDATE project
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const header = headers(req);
  const body = await req.json();
  const res = await fetch(
    `${process.env.BACKEND_API_BASE}projects/${params.id}`,
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

// DELETE project
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const header = headers(req);
  const res = await fetch(
    `${process.env.BACKEND_API_BASE}projects/${params.id}`,
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
