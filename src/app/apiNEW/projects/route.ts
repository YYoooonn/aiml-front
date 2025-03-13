import { userApiRequest, userAuthRequest } from "@/utils/api";
import { NextRequest } from "next/server";

// GET project participants
export async function GET(req: NextRequest) {
  const searchParam = req.nextUrl.searchParams;
  const { k, n, s } = {
    k: searchParam.get("keyword"),
    n: searchParam.get("pageNum"),
    s: searchParam.get("pageSize"),
  };
  const response = await userApiRequest(
    `projects/search?keyword=${k}&pageNum=${n}&pageSize=${s}`,
    "GET",
    req,
  );
  return response;
}

export async function POST(req: NextRequest) {
  return await userAuthRequest("projects", "POST", req);
}
