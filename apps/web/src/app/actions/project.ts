import { ProjectData, ProjectRequest } from "@/@types/api";
import { BaseFrontResponse } from "@/@types/common";
import { BFF_ENDPOINTS } from "@/constants/endpoints";

const ENDPOINT = BFF_ENDPOINTS.PROJECT;

export async function createProject(props: ProjectRequest) {
  const response = await fetch(ENDPOINT, {
    method: "POST",
    body: JSON.stringify(props),
  });
  const result: BaseFrontResponse<ProjectData> = await response.json();
  return result;
}

export async function getUserProjects() {
  const response = await fetch(`${ENDPOINT}`, {
    method: "GET",
  });
  const result: BaseFrontResponse<ProjectData[]> = await response.json();
  return result;
}

export async function getProject(id: string) {
  const response = await fetch(`${ENDPOINT}/${id}`, {
    method: "GET",
  });
  const result: BaseFrontResponse<ProjectData> = await response.json();
  return result;
}

export async function updateProject(props: ProjectRequest) {
  const response = await fetch(`${ENDPOINT}/${props.id}`, {
    method: "PUT",
    body: JSON.stringify(props),
  });
  const result: BaseFrontResponse<ProjectData> = await response.json();
  return result;
}

export async function deleteProject(id: string) {
  const response = await fetch(`${ENDPOINT}/${id}`, {
    method: "DELETE",
  });
  const result: BaseFrontResponse<ProjectData> = await response.json();
  return result;
}
