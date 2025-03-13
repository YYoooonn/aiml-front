import { userApiRequest } from "@/utils/api";
import { NextRequest } from "next/server";

// user registration
export async function POST(req: NextRequest) {
  const response = await userApiRequest("users", "POST", req);
  return response;
}
