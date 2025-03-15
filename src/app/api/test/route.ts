import { DEFAULT_HEADERS, userApiRequest } from "@/utils/api";
import { NextRequest, NextResponse } from "next/server";


const TEST_CONFIG = {username: "aimlprjt", password: "aimlprjt"}

// login
export async function POST(req: NextRequest) {
  const body = await req.json();
    console.debug("POST req to json", body)

   const response = await fetch(`${process.env.BACKEND_API_BASE}auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(TEST_CONFIG)
    })

    console.debug("POST RAW: " , response)
    const r = await response.json()
    console.debug("POST JSON: ", r)
    const st = JSON.stringify(r)
    console.debug("POST stringify: ", st)
    return NextResponse.json(st, {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    })

  
//   const response = await userApiRequest("auth/login", "POST", body);
//   const data = await response.json();
//   console.log(data)
//   return NextResponse.json(JSON.stringify(data), {
//     status: 200,
//     headers: DEFAULT_HEADERS,
//   });
}
