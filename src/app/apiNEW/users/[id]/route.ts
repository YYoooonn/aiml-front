import { userApiRequest, userAuthRequest } from "@/utils/api";
import { ApiResponseHeader } from "@/utils/headers";
import { NextRequest, NextResponse } from "next/server";

// GET user profile
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  if (params.id === "me") {
    return await userAuthRequest(`users/${params.id}`, "GET", req);
  } else {
    return await userApiRequest(`users/${params.id}`, "GET", req);
  }
}

// UPDATE user profile
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  if (params.id === "me") {
    return await userAuthRequest(`users/${params.id}`, "PUT", req);
  }
  return NextResponse.json(
    { error: "UNAUTHORIZED" },
    {
      status: 200,
      headers: ApiResponseHeader,
    },
  );
}

// DELETE user
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  if (params.id === "me") {
    return await userAuthRequest(`users/${params.id}`, "DELETE", req);
  }
  return NextResponse.json(
    { error: "UNAUTHORIZED" },
    {
      status: 200,
      headers: ApiResponseHeader,
    },
  );
}
