interface SuccessResponse<T> {
  success: true;
  data: TDATA<T>;
}

interface ErrorResponse {
  success: false;
  error: string;
}

interface ArchiveData {
  content : ProjectData[]
}

type TData =
  | undefined
  | UserData
  | TObjectData
  | ProjectData
  | LoginResponse["body"]
  | ArchiveData;

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
