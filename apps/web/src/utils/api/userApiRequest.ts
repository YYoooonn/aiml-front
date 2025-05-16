import { requestHandler, responseHandler } from "./handlers";
import { BaseRequest } from "@/@types/api";

export async function userApiRequest(endpoint: string, request: BaseRequest) {
  // console.debug(`API REQUEST TO ${process.env.BACKEND_API_ENDPOINT + endpoint}`);
  const req = await requestHandler(request, false);
  const response = await fetch(
    `${process.env.BACKEND_API_ENDPOINT + endpoint}`,
    req,
  ).then(async (res) => await responseHandler(res));
  return response;
}
