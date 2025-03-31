import { NextRequest, NextResponse } from "next/server";
import { getCookie } from "@/app/_actions/cookie";

export const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
};

type THeader = (req: NextRequest) => {
  "Content-Type": string;
  Authorization?: string;
};

export const headers: THeader = (req) => {
  const token = req.cookies.get("aimljwt");
  if (token) {
    return {
      "Content-Type": "application/json",
      Authorization: "Bearer ".concat(token.value),
    };
  } else {
    return {
      "Content-Type": "application/json",
    };
  }
};

export const responseHandler = async (
  res: Response,
  emptyResponse?: boolean,
) => {
  if (res.ok) {
    if (emptyResponse) return { success: true };
    const data = await res.json();
    return data;
  } else {
    const message = await res.text();
    return { error: message ? message : `code ${res.status}` };
  }
};

// DEPRECIATED BELOW

// HANDLE ERROR MESSAGE
const errorBuilder = async (
  endpoint: string,
  message: string,
  status?: number,
) => {
  console.debug("ERROR FROM ".concat(endpoint));
  if (status === 500) {
    console.debug("--------------------------");
    console.debug("error message from backend");
    console.debug("ERROR MESSAGE ".concat(message));
    return "SERVER ISSUE";
  } else if (status === 400) {
    console.debug("ERROR MESSAGE " + message);
    return message.toString();
  } else {
    return "status :".concat(message);
  }
};

export async function userApiRequest(
  endpoint: string,
  method: "GET" | "POST" | "DELETE" | "PATCH" | "PUT" = "GET",
  body?: object,
) {
  console.debug(`API REQUEST TO ${process.env.BACKEND_API_BASE + endpoint}`);
  const response = await fetch(`${process.env.BACKEND_API_BASE + endpoint}`, {
    headers: DEFAULT_HEADERS,
    method: method,
    body: JSON.stringify(body),
  });
  if (response.ok) {
    const data = await response.json();
    return NextResponse.json(JSON.stringify(data), {
      status: 200,
      headers: response.headers,
    });
  } else {
    const data = (await response.json()).toString();
    const err = await errorBuilder(endpoint, data);
    return NextResponse.json(JSON.stringify({ error: err }), {
      status: 200,
      headers: DEFAULT_HEADERS,
    });
  }
}

export async function userAuthRequest(
  endpoint: string,
  method: "GET" | "POST" | "DELETE" | "PATCH" | "PUT" = "GET",
  body?: object,
) {
  console.debug(`AUTH REQUEST TO ${process.env.BACKEND_API_BASE + endpoint}`);
  const token = await getCookie();
  console.log("TOKEN", token);
  if (!token) {
    console.debug("REQUEST WITH CREDENTIALS FAILED, CONVERTS TO API REQUEST ");
    const response = await userApiRequest(endpoint, method, body);
    return response;
  } else {
    const headerWithToken = {
      ...DEFAULT_HEADERS,
      Authorization: "Bearer ".concat(token),
    };
    const response = await fetch(`${process.env.BACKEND_API_BASE + endpoint}`, {
      method: method,
      body: JSON.stringify(body),
      headers: headerWithToken,
    });
    if (response.ok) {
      const data = await response.json();
      // if (Array.isArray(data)) {
      //   return NextResponse.json(JSON.stringify(data), {
      //     status: 200,
      //     headers: DEFAULT_HEADERS,
      //   });
      // }
      return NextResponse.json(JSON.stringify(data), {
        status: 200,
        headers: DEFAULT_HEADERS,
      });
    } else {
      const data = (await response.text()).toString();
      const err = await errorBuilder(endpoint, data, response.status);
      return NextResponse.json(JSON.stringify({ error: err }), {
        status: 200,
        headers: DEFAULT_HEADERS,
      });
    }
  }
}
