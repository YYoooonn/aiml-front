import { userAuthRequest } from "@/utils/api";
import { NextRequest } from "next/server";

// GET projects
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  return await userAuthRequest(`projects/${params.id}`, "GET", req);
}

// UPDATE user profile
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  return await userAuthRequest(`projects/${params.id}`, "PUT", req);
}

// DELETE user
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  return await userAuthRequest(`projects/${params.id}`, "DELETE", req);
}
