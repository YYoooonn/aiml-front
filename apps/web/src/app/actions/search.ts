"use server";

import { ProjectData, SceneData, UserCore } from "@/@types/api";
import { BaseFrontResponse } from "@/@types/common";
import { API_ENDPOINTS } from "../api/constants/constants";

const ENDPOINT = API_ENDPOINTS.SEARCH;

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
    `${ENDPOINT}/project?q=${keyword}&page=${pageNum}&size=${pageSize}`,
    { method: "GET" },
  );
  const result: BaseFrontResponse<{ content: ProjectData[] }> =
    await response.json();
  return result;
}

export async function searchUser({ username }: { username: string }) {
  //   return {
  //     success: true,
  //     data: [],
  //   } as BaseFrontResponse<SceneData[]>
  // FIXME: this is not the correct endpoint
  const response = await fetch(`${ENDPOINT}/user?username=${username}`, {
    method: "GET",
  });

  const result: BaseFrontResponse<{ content: UserCore[] }> =
    await response.json();
  return result;
}
