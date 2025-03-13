import { NextRequest, NextResponse } from "next/server";
import { ApiResponseHeader } from "./headers";

const HeaderInfo: any = (token?: string) => {
  if (token) {
    return {
      "Content-Type": "application/json",
      Authorization: "Bearer ".concat(token),
    };
  } else {
    return {
      "Content-Type": "application/json",
    };
  }
};

const errorHandler = async (endpoint: string, r: Response) => {
  console.debug("ERROR FROM ".concat(endpoint));
  if (r.status === 400) {
    const message = await r.text();
    console.debug("ERROR MESSAGE ".concat(message));
    return message;
  } else {
    return "status :".concat(r.status.toString());
  }
};

export async function userApiRequest(
  endpoint: string,
  method: "GET" | "POST" | "DELETE" | "PATCH" = "GET",
  req?: NextRequest,
) {
  console.debug(`REQUEST TO ${process.env.BACKEND_API_BASE + endpoint}`);
  try {
    const body = await req?.json();
    const response = await fetch(`${process.env.BACKEND_API_BASE + endpoint}`, {
      method: method,
      headers: HeaderInfo(),
      body: JSON.stringify(body),
    })
      .then((r) => {
        if (r.ok) {
          return r.json();
        }
        const error = errorHandler(endpoint, r).then((e) => {
          throw new Error(e);
        });
      })
      .then((data) => {
        return NextResponse.json(JSON.stringify(data), {
          status: 200,
          headers: ApiResponseHeader,
        });
      });
    return response;
  } catch (e) {
    console.debug("ERROR ON API REQUEST TO ".concat(endpoint), e);
    return NextResponse.json(
      { error: e ? e : "unknown error" },
      {
        status: 200,
        headers: ApiResponseHeader,
      },
    );
  }
}

export async function userAuthRequest(
  endpoint: string,
  method: "GET" | "POST" | "DELETE" | "PATCH" | "PUT" = "GET",
  req?: NextRequest,
) {
  const token = req?.cookies.get("aimljwt")?.value;
  if (!token) {
    return NextResponse.json(
      { error: "EMPTY TOKEN" },
      {
        status: 200,
        headers: ApiResponseHeader,
      },
    );
  }
  console.debug(`REQUEST TO ${process.env.BACKEND_API_BASE + endpoint}`);
  try {
    const body = await req?.json();
    const response = await fetch(`${process.env.BACKEND_API_BASE + endpoint}`, {
      method: method,
      headers: HeaderInfo(token),
      body: JSON.stringify(body),
    })
      .then((r) => {
        if (r.ok) {
          return r.json();
        }
        const error = errorHandler(endpoint, r).then((e) => {
          throw new Error(e);
        });
      })
      .then((data) => {
        return NextResponse.json(JSON.stringify(data), {
          status: 200,
          headers: ApiResponseHeader,
        });
      });
    return response;
  } catch (e) {
    console.debug("ERROR ON USER AUTH REQUEST TO ".concat(endpoint), e);
    return NextResponse.json(
      { error: e ? e : "unknown error" },
      {
        status: 200,
        headers: ApiResponseHeader,
      },
    );
  }
}
