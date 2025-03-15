export interface BaseUserInfo {
  username: string;
  password: string;
}

export interface UserUpdateInfo {
  username?: string;
  firstName: string;
  lastName: string;
  email?: string;
}

export type RegisterInfo = BaseUserInfo & UserUpdateInfo;

export interface BaseProjectProps {
  title: string;
  subtitle: string;
  isPublic: boolean;
}

export interface ProjectUpdateProps {
  title?: string;
  subtitle?: string;
  isPublic?: boolean;
}

export interface ProjectUpdateProps {
  title?: string;
  subtitle?: string;
  isPublic?: boolean;
}

interface ObjConstructor {
  geometry: string;
  material: string;
  matrix: number[];
}

interface ObjUpdateProps {
  material?: string;
  matrix?: number[];
  geometry?: string;
}

interface ProjectSearchParams {
  k?: string;
  n?: number;
  s?: number;
}
