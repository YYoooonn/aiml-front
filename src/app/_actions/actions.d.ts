interface SuccessResponse<T> {
  success: true;
  data: TDATA<T>;
}

interface ErrorResponse {
  success: false;
  error: string;
}

type TData =
  | undefined
  | UserData
  | TObjectData
  | ProjectData
  | LoginResponse["body"];

interface IData<T extends TData = undefined> {
  data: T;
}

export type ActionResponse<T extends TData = undefined> =
  | SuccessResponse<T>
  | ErrorResponse;

export interface ProjectSearchParams {
  k: string;
  n: number;
  s: number;
}

export interface UserRegisterData extends User {
  password: string;
}
