
import { ParticipantData, ParticipantRequest } from "@/@types/api";
import { BaseFrontResponse } from "@/@types/common";
import { BFF_ENDPOINTS } from "@/constants/endpoints";

const ENDPOINT = (projectId: string) =>
  `${BFF_ENDPOINTS.PROJECT}/${projectId}/participant`;

export async function getProjectParticipants(projectId: string) {
  const response = await fetch(`${ENDPOINT(projectId)}`, {
    method: "GET",
  });
  const result: BaseFrontResponse<ParticipantData[]> = await response.json();
  return result;
}

export async function addParticipant(
  projectId: string,
  participantProps: ParticipantRequest,
) {
  const response = await fetch(`${ENDPOINT(projectId)}`, {
    method: "POST",
    body: JSON.stringify(participantProps),
  });
  const result: BaseFrontResponse<ParticipantData> = await response.json();
  return result;
}

export async function updateParticipant(
  projectId: string,
  participantProps: ParticipantRequest,
) {
  const response = await fetch(`${ENDPOINT(projectId)}`, {
    method: "PUT",
    body: JSON.stringify(participantProps),
  });
  const result: BaseFrontResponse<ParticipantData> = await response.json();
  return result;
}

export async function deleteParticipant(projectId: string, username: string) {
  const response = await fetch(`${ENDPOINT(projectId)}/${username}`, {
    method: "DELETE",
  });
  const result: BaseFrontResponse = await response.json();
  return result;
}
