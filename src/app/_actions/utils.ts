import unescapeSlashes from "@/utils/parse";

const BASE_ROUTE = process.env.NODE_ENV === "development"? "/api/test" : "/api"

export const PROJECT_ROUTES = `${BASE_ROUTE}/projects`;
export const USER_ROUTE = `${BASE_ROUTE}/users`;
export const AUTH_ROUTE = `${BASE_ROUTE}/auth`;
export const OBJ_ROUTE = `${BASE_ROUTE}/objects`;

export const responseHandler = async (r: Response, from?: string) => {
  // console.debug("1. RESPONSE RECEIVED FROM", from)
  // TO JSON
  const data = await r.json();
  // console.debug("2. DATA RECEIVED" , data)

  // PARSE DATA
  const parsed = JSON.parse(data);
  // console.debug("3. DATA PARSED", parsed)

  return parsed;
};

export const errorHandler = async (r: Response, from?: string) => {
  if (r.ok) {
    const data = await r.json();
    console.log("data from error Handler", data);
    // data type check
    return JSON.parse(data);
  } else {
    const message = (await r.text()).toString();
    return { error: message };
  }
};
