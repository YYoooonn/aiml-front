import { BFF_ENDPOINTS } from "@/constants/endpoints";
import { BaseFrontResponse } from "@/@types/common";
import { User, UserData } from "@/@types/api";

const ENDPOINT = BFF_ENDPOINTS.USER;

export async function getUserInfo() {
  const response = await fetch(`${ENDPOINT}`, {
    method: "GET",
  });
  const result: BaseFrontResponse<UserData> = await response.json();
  return result;
}

export async function updateUserInfo(userInfo: User) {
  const response = await fetch(`${ENDPOINT}`, {
    method: "PUT",
    body: JSON.stringify(userInfo),
  });
  const result: BaseFrontResponse<UserData> = await response.json();
  return result;
}

export async function deleteUser() {
  const response = await fetch(`${ENDPOINT}`, {
    method: "DELETE",
  });
  const result: BaseFrontResponse = await response.json();
  return result;
}
