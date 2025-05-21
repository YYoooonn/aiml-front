import { SceneData, SceneRequest } from "@/@types/api";
import { BaseFrontResponse } from "@/@types/common";
import { BFF_ENDPOINTS } from "@/constants/endpoints";

const ENDPOINT = BFF_ENDPOINTS.SCENE;
const ENDPOINT_PUBLIC = BFF_ENDPOINTS.PUBLIC;

export async function getProjectScenes(
  projectId: string,
  isPublic: boolean = false,
) {
  const reqUrl = isPublic
    ? `${ENDPOINT_PUBLIC}/scene?pId=${projectId}`
    : `${BFF_ENDPOINTS.PROJECT}/${projectId}/scene`;
  const response = await fetch(reqUrl, {
    method: "GET",
  });
  const result: BaseFrontResponse<SceneData[]> = await response.json();
  return result;
}

export async function getScene(sceneId: string) {
  const response = await fetch(`${ENDPOINT}/${sceneId}`, {
    method: "GET",
  });
  const result: BaseFrontResponse<SceneData> = await response.json();
  return result;
}

export async function createScene(props: SceneRequest) {
  const response = await fetch(`${ENDPOINT}`, {
    method: "POST",
    body: JSON.stringify(props),
  });
  const result: BaseFrontResponse<SceneData> = await response.json();
  return result;
}

export async function updateScene(props: SceneRequest) {
  const response = await fetch(`${ENDPOINT}/${props.id}`, {
    method: "PUT",
    body: JSON.stringify(props),
  });
  const result: BaseFrontResponse<SceneData> = await response.json();
  return result;
}

export async function deleteScene(sceneId: string) {
  const response = await fetch(`${ENDPOINT}/${sceneId}`, {
    method: "DELETE",
  });
  const result: BaseFrontResponse<SceneData> = await response.json();
  return result;
}
