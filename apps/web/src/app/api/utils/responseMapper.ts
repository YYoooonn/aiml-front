import { BaseResponse } from "@/app/api/types/types";
import { BaseFrontResponse } from "@/@types/common";

export function responseMapper<T>(
  response: BaseResponse<T>,
  redirectLink?: string,
): BaseFrontResponse<T> {
  if (response.success) {
    return {
      data: response.data as T,
      success: response.success,
    };
  } else {
    const errorMessage = response.message || "Unknown error";
    return {
      data: response.data as T,
      success: response.success,
      error: errorMessage,
      redirectLink: response.code === 401 ? "/login" : undefined,
    };
  }
}

export const UNKNOWN_ERROR_RESPONSE = (msg: string = "Unknown error") =>
  ({
    success: false,
    error: msg,
    data: null,
  }) as BaseFrontResponse<null>;
