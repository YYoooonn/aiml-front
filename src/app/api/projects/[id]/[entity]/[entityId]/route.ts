import { DEFAULT_HEADERS, userAuthRequest, ENDPOINT } from "@/utils/api";
import { NextRequest, NextResponse } from "next/server";

const PATH = ENDPOINT.P;

// GET project-entity
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string; entity: string; entityId: string } },
) {
  const response = await userAuthRequest(
    PATH.concat(`/${params.id}/${params.entity}/${params.entityId}`),
    req,
  );
  return NextResponse.json(response, {
    status: 200,
    headers: DEFAULT_HEADERS,
  });
}

// POST project entity
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string; entity: string; entityId: string } },
) {
  const response = await userAuthRequest(
    PATH.concat(`/${params.id}/${params.entity}/${params.entityId}`),
    req,
  );
  return NextResponse.json(response, {
    status: 200,
    headers: DEFAULT_HEADERS,
  });
}

// PUT project entity
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string; entity: string; entityId: string } },
) {
  const response = await userAuthRequest(
    PATH.concat(`/${params.id}/${params.entity}/${params.entityId}}`),
    req,
  );
  return NextResponse.json(response, {
    status: 200,
    headers: DEFAULT_HEADERS,
  });
}

// POST project entity
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string; entity: string; entityId: string } },
) {
  const response = await userAuthRequest(
    PATH.concat(`/${params.id}/${params.entity}/${params.entityId}}`),
    req,
  );
  return NextResponse.json(response, {
    status: 200,
    headers: DEFAULT_HEADERS,
  });
}
