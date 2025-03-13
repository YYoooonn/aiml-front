import { userApiRequest } from "@/utils/api";
import { NextRequest } from "next/server";

// login
export async function POST(req: NextRequest) {
  const response = await userApiRequest("auth/login", "POST", req);
  return response;
}
