import { LoginRequest, RegisterRequest, UserData } from "@/@types/api";
import { BaseFrontResponse } from "@/@types/common";
import { BFF_ENDPOINTS } from "@/constants/endpoints";

const ENDPOINT = BFF_ENDPOINTS.AUTH;

export async function login(props: LoginRequest) {
  const response = await fetch(`${ENDPOINT}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(props),
  });
  const result: BaseFrontResponse = await response.json();
  return result;
}

export async function registerUser(
  props: RegisterRequest,
): Promise<BaseFrontResponse> {
  const response = await fetch(`${ENDPOINT}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(props),
  });
  const result: BaseFrontResponse<UserData> = await response.json();
  return result;
}

// TODO
export async function logout() {
  const response = await fetch(`${ENDPOINT}/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result: BaseFrontResponse = await response.json();
  return result;
}
