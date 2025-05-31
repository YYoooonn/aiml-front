"use server";

import { UserProfile } from "@/@types/api";
import { BaseFrontResponse, BaseResponse } from "@/@types/common";
import { API_ENDPOINTS } from "../api/constants/constants";
import { fetchWithAuth } from "@/lib/api/authFetcher";
import { responseMapper } from "@/lib/responseMapper";

const ENDPOINT = API_ENDPOINTS.USER;

export async function updateUserProfile(formData: FormData) {
  const response = await fetchWithAuth<UserProfile>(`${ENDPOINT}/me/profile`, {
    method: "PUT",
    body: formData,
  });

  const result = responseMapper(response);
  return result;
}
