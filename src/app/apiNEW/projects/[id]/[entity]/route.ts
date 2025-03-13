import { userAuthRequest } from "@/utils/api";
import { ApiResponseHeader } from "@/utils/headers";
import { NextRequest, NextResponse } from "next/server";

// GET project entity
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string; entity: string } },
) {
  const { id, entity } = params;
  if (entity === "participants" || "objects") {
    return await userAuthRequest(`projects/${id}/${entity}`, "GET", req);
  }
  return NextResponse.json(
    { error: "NOT IMPLEMENTED" },
    {
      status: 200,
      headers: ApiResponseHeader,
    },
  );
}

// POST project entity
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string; entity: string } },
) {
  const { id, entity } = params;
  if (entity === "objects") {
    return await userAuthRequest(`projects/${id}/${entity}`, "POST", req);
  }
  return NextResponse.json(
    { error: "NOT IMPLEMENTED" },
    {
      status: 200,
      headers: ApiResponseHeader,
    },
  );
}
