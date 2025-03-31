import { ActionResponse } from "./actions";
import { responseHandler, PROJECT_ROUTES, OBJ_ROUTE } from "./utils";

const ERROR_FROM = "OBJ ACTION";

export async function create(proId: number, objProps: TObject) {
  const response = await fetch(`${PROJECT_ROUTES}/${proId}/objects`, {
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
  const response = await fetch(`${OBJ_ROUTE}/${oId}`, {
    method: "GET",
  });
  const res: ActionResponse<TObjectData> = await responseHandler(
    response,
    ERROR_FROM,
  );
  return res;
}

export async function update(proId: number, oId: number, objProps: TObject) {
  const response = await fetch(`${OBJ_ROUTE}/${oId}`, {
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
  const response = await fetch(`${OBJ_ROUTE}/${oId}`, {
    method: "DELETE",
  });
  const res: ActionResponse = await responseHandler(response, ERROR_FROM);
  return res;
}
