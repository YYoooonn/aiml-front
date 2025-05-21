"use server";

import { ProjectData, SceneData } from "@/@types/api";
import { BaseFrontResponse } from "@/@types/common";
import { API_ENDPOINTS } from "../api/constants/constants";

const ENDPOINT = API_ENDPOINTS.ARCHIVE;

export async function searchArchive({
  keyword,
  pageNum,
  pageSize,
}: {
  keyword: string;
  pageNum: number;
  pageSize: number;
}) {
  const response = await fetch(
    `${ENDPOINT}/search?query=${keyword}&pageNum=${pageNum}&pageSize=${pageSize}`,
    { method: "GET" },
  );
  const result: BaseFrontResponse<{ content: ProjectData[] }> =
    await response.json();
  return result;
}

export async function getArchiveScenes(projectId: string) {
  // FIXME: this is not the correct endpoint
  const response = await fetch(`${ENDPOINT}/${projectId}/scenes`, {
    method: "GET",
  });
  const result: BaseFrontResponse<SceneData[]> = await response.json();
  return result;
}
