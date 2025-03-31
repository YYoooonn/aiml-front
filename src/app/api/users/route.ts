import { DEFAULT_HEADERS } from "@/utils/api";
import { NextRequest, NextResponse } from "next/server";

// user registration
export async function POST(req: NextRequest) {
  const body = await req.json();

  const fetched = await fetch(`${process.env.BACKEND_API_BASE}users`, {
    body: JSON.stringify(body),
    method: "POST",
    headers: DEFAULT_HEADERS,
  });

  if (fetched.ok) {
    const res = await fetched.json();
    return NextResponse.json(JSON.stringify(res), {
      status: 200,
      headers: DEFAULT_HEADERS,
    });
  } else {
    const text = await fetched.text();
    return NextResponse.json(
      JSON.stringify({
        error: text,
      }),
      {
        status: 200,
        headers: DEFAULT_HEADERS,
      },
    );
  }
}
