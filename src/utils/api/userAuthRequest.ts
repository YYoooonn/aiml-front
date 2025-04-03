import { requestHandler, responseHandler } from "./handlers";
import { userApiRequest } from "./userApiRequest";
import { BaseRequest } from "@/@types/api";

export async function userAuthRequest(endpoint: string, request: BaseRequest) {
  // console.debug(`AUTH REQUEST TO ${process.env.BACKEND_API_BASE + endpoint}`);
  const req = await requestHandler(request, true);
  if ("Authorization" in req.headers) {
    // console.debug("REQUEST WITH CREDENTIALS FAILED, CONVERTS TO API REQUEST ");
    const response = await fetch(
      `${process.env.BACKEND_API_BASE + endpoint}`,
      req,
    ).then(async (res) => await responseHandler(res));
    return response;
  } else {
    return await userApiRequest(endpoint, request);
  }
}
