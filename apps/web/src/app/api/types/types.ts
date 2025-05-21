export interface BaseResponse<T = unknown> {
  data: T;
  success: boolean;
  code: number;
  message: string | null;
  revalidate: boolean | null;
}
