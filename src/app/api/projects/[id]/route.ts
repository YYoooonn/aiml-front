import { DEFAULT_HEADERS, ENDPOINT, userAuthRequest } from "@/utils/api";
import { NextRequest, NextResponse } from "next/server";

const PATH = ENDPOINT.P;

// GET projects
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  // Archive SEARCH
  if (params.id === "search") {
    const searchParam = req.nextUrl.searchParams;
    const { k, n, s } = {
      k: searchParam.get("keyword"),
      n: searchParam.get("pageNum"),
      s: searchParam.get("pageSize"),
    };
    console.log(k, n, s);
    const response = await userAuthRequest(
      PATH.concat(`/search?keyword=${k}&pageNum=${n}&pageSize=${s}`),
      req,
    );
    return NextResponse.json(response, {
      status: 200,
      headers: DEFAULT_HEADERS,
    });
  }
  const response = await userAuthRequest(PATH.concat(`/${params.id}`), req);
  return NextResponse.json(response, {
    status: 200,
    headers: DEFAULT_HEADERS,
  });
}

// UPDATE project
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const response = await userAuthRequest(PATH.concat(`/${params.id}`), req);
  return NextResponse.json(response, {
    status: 200,
    headers: DEFAULT_HEADERS,
  });
}

// DELETE project
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const response = await userAuthRequest(PATH.concat(`/${params.id}`), req);
  return NextResponse.json(response, {
    status: 200,
    headers: DEFAULT_HEADERS,
  });
}
