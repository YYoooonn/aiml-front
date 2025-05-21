
import { Object3DRequest, TObject3DData } from "@/@types/api";
import { BaseFrontResponse } from "@/@types/common";
import { BFF_ENDPOINTS } from "@/constants/endpoints";

const ENDPOINT = BFF_ENDPOINTS.OBJ3D;

export async function createObject3D(props: Object3DRequest) {
  console.log(props)
  const response = await fetch(`${ENDPOINT}`, {
    method: "POST",
    body: JSON.stringify(props),
  });
  const result: BaseFrontResponse<TObject3DData> = await response.json();
  console.log(result)
  return result;
}

export async function getObject3D(objectId: string) {
  const response = await fetch(`${ENDPOINT}/${objectId}`, {
    method: "GET",
  });
  const result: BaseFrontResponse<TObject3DData> = await response.json();
  return result;
}

export async function updateObject3D(props: Object3DRequest) {
  const response = await fetch(`${ENDPOINT}/${props.id}`, {
    method: "PUT",
    body: JSON.stringify(props),
  });
  const result: BaseFrontResponse<TObject3DData> = await response.json();
  return result;
}

export async function deleteObject3D(objectId: string) {
  const response = await fetch(`${ENDPOINT}/${objectId}`, {
    method: "DELETE",
  });
  const result: BaseFrontResponse<TObject3DData> = await response.json();
  return result;
}
