import { userAuthRequest } from "@/utils/api";
import { ApiResponseHeader } from "@/utils/headers";
import { NextRequest, NextResponse } from "next/server";

// GET project-entity
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string; entity: string; entityId: string } },
) {
  const { id, entity, entityId } = params;
  if (entity === "objects") {
    return await userAuthRequest(
      `projects/${id}/${entity}/${entityId}`,
      "GET",
      req,
    );
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
  { params }: { params: { id: string; entity: string; entityId: string } },
) {
  const { id, entity, entityId } = params;
  if (entity === "objects") {
    return await userAuthRequest(
      `projects/${id}/${entity}/${entityId}`,
      "PUT",
      req,
    );
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
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string; entity: string; entityId: string } },
) {
  const { id, entity, entityId } = params;
  if (entity === "objects") {
    return await userAuthRequest(
      `projects/${id}/${entity}/${entityId}`,
      "DELETE",
      req,
    );
  }
  return NextResponse.json(
    { error: "NOT IMPLEMENTED" },
    {
      status: 200,
      headers: ApiResponseHeader,
    },
  );
}
