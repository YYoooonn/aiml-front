export type ApiMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface BaseResponse<T = unknown> {
  data: T;
  success: boolean;
  code: number;
  message: string | null;
  revalidate: boolean | null;
}

export interface BaseFrontResponse<T = unknown> {
  data: T;
  success: boolean;
  error?: string;
  redirectLink?: string;
}

export interface DateInfo {
  createdAt: string;
  updatedAt: string;
}

export type Entity<T extends object> = T & {
  id: string;
} & DateInfo;
