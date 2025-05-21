"use server";

import { ProjectData, SceneData } from "@/@types/api";
import { BaseFrontResponse } from "@/@types/common";
import { API_ENDPOINTS } from "../api/constants/constants";

const PROJECT_ENDPOINT = API_ENDPOINTS.PROJECT;

export async function searchArchive({
  keyword,
  pageNum,
  pageSize,
}: {
  keyword: string;
  pageNum: number;
  pageSize: number;
}) {
  return {
    success: true,
    data : {
      content: []
    }
  } as BaseFrontResponse<{ content: ProjectData[] }>
  // const response = await fetch(
  //   `${PROJECT_ENDPOINT}/search?q=${keyword}&pageNum=${pageNum}&pageSize=${pageSize}`,
  //   { method: "GET" },
  // );
  // const result: BaseFrontResponse<{ content: ProjectData[] }> =
  //   await response.json();
  // return result;
}

const SCENE_ENDPOINT = API_ENDPOINTS.SCENE;

export async function getArchiveScenes(projectId: string) {
  return {
    success: true,
    data: [],
  } as BaseFrontResponse<SceneData[]>
  // FIXME: this is not the correct endpoint
  // const response = await fetch(`${SCENE_ENDPOINT}/public?pId=${projectId}`, {
  //   method: "GET",
  // });

  // const result: BaseFrontResponse<SceneData[]> = await response.json();
  // return result;
}
