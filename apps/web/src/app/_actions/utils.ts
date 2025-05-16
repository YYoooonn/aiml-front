const BASE_ROUTE =
  process.env.NODE_ENV === "development" ? "/api/test" : "/api";

export const ENDPOINT: Record<string, string> = {
  P: `${BASE_ROUTE}/projects`,
  U: `${BASE_ROUTE}/users`,
  A: `${BASE_ROUTE}/auth`,
  O: `${BASE_ROUTE}/objects`,
};

export const responseHandler = async (r: Response, _from?: string) => {
  // console.debug("RESPONSE RECEIVED FROM", from);
  // TO JSON
  const data = await r.json();
  return data;
};
