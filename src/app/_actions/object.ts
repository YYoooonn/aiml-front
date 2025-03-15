import { ObjConstructor, ObjUpdateProps, ProjectUpdateProps } from "./actions";
import { responseHandler, PROJECT_ROUTES } from "./utils";

const ERROR_FROM = "OBJ ACTION";

export async function create(proId: string, objProps: ObjConstructor) {
  const response = await fetch(`${PROJECT_ROUTES}/${proId}/objects`, {
    method: "POST",
    body: JSON.stringify(objProps),
  })
  const res = await responseHandler(response, ERROR_FROM)
  return res;
}

export async function read(proId: string, oId: string) {
  const response = await fetch(`${PROJECT_ROUTES}/${proId}/objects/${oId}`, {
    method: "GET",
  })
  const res = await responseHandler(response, ERROR_FROM)
  return res;
}

export async function update(
  proId: string,
  oId: string,
  objProps: ObjUpdateProps,
) {
  const response = await fetch(`${PROJECT_ROUTES}/${proId}/objects/${oId}`, {
    method: "PUT",
    body: JSON.stringify(objProps),
  })
  const res = await responseHandler(response, ERROR_FROM)
  return res;
}

export async function remove(proId: string, oId: string) {
  const response = await fetch(`${PROJECT_ROUTES}/${proId}/objects/${oId}`, {
    method: "DELETE",
  })
  const res = await responseHandler(response, ERROR_FROM)
  return res;
}
