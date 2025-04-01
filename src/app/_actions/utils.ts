// import unescapeSlashes from "@/utils/parse";

const BASE_ROUTE = "/api"
  // process.env.NODE_ENV === "development" ? "/api/test" : "/api";

export const ENDPOINT: Record<string, string> = {
  P: `${BASE_ROUTE}/projects`,
  U: `${BASE_ROUTE}/users`,
  A: `${BASE_ROUTE}/auth`,
  O: `${BASE_ROUTE}/objects`,
};

export const responseHandler = async (r: Response, from?: string) => {
  // console.debug("RESPONSE RECEIVED FROM", from);
  // TO JSON
  const data = await r.json();
  // console.debug("2. DATA RECEIVED" , data)

  return data
  // PARSE DATA
  // const parsed = JSON.parse(data);
  // console.debug("3. DATA PARSED", parsed)

  // return parsed;
};
