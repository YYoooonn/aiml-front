import { ActionResponse } from "./actions";
import { responseHandler, ENDPOINT } from "./utils";

const ERROR_FROM = "OBJ ACTION";

export async function create(proId: number, objProps: TObject) {
  const response = await fetch(`${ENDPOINT.P}/${proId}/objects`, {
    method: "POST",
    body: JSON.stringify(objProps),
  });
  const res: ActionResponse<TObjectData> = await responseHandler(
    response,
    ERROR_FROM,
  );
  return res;
}

export async function read(proId: number, oId: string) {
  const response = await fetch(`${ENDPOINT.O}/${oId}`, {
    method: "GET",
  });
  const res: ActionResponse<TObjectData> = await responseHandler(
    response,
    ERROR_FROM,
  );
  return res;
}

export async function update(proId: number, oId: number, objProps: TObject) {
  const response = await fetch(`${ENDPOINT.O}/${oId}`, {
    method: "PUT",
    body: JSON.stringify(objProps),
  });
  const res: ActionResponse<TObjectData> = await responseHandler(
    response,
    ERROR_FROM,
  );
  return res;
}

export async function remove(proId: number, oId: number) {
  const response = await fetch(`${ENDPOINT.O}/${oId}`, {
    method: "DELETE",
  });
  const res: ActionResponse = await responseHandler(response, ERROR_FROM);
  return res;
}
