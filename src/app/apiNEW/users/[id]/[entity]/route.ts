import { userAuthRequest } from "@/utils/api";
import { ApiResponseHeader } from "@/utils/headers";
import { NextRequest, NextResponse } from "next/server";

// GET user entity
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string; entity: string } },
) {
  const { id, entity } = params;
  if (id === "me") {
    // ENTITY
    if (entity === "projects") {
      return await userAuthRequest(`users/${id}/projects`, "GET", req);
    }
    return NextResponse.json(
      { error: "NOT IMPLEMENTED" },
      {
        status: 200,
        headers: ApiResponseHeader,
      },
    );
  } else {
    return NextResponse.json(
      { error: "UNAUTHORIZED" },
      {
        status: 200,
        headers: ApiResponseHeader,
      },
    );
  }
}
