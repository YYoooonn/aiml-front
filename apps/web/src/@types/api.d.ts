import { NextResponse, NextRequest } from "next/server";
import { User } from "@/types/user";
import { Project } from "@/types/project";
import { TObject } from "@/types/tobject";

/* API Request input */

/* API Request output */

/*

API REQUEST
NextRequest는 Next.js의 내부 구현에 의존하고 있기에
route.ts에서 직접 extend한 타입 사용하는 것은 불가능

*/

interface BaseRequest<T = unknown> extends NextRequest {
  body?: T;
  headers?: HeadersInit;
  method: string | "GET" | "POST" | "DELETE" | "PATCH" | "PUT";
}

interface AuthRequest<T = unknown> extends BaseRequest {
  body?: T;
  headers: { Authorization: string } & Record<string, string>;
}

/* API request */

type LoginRequest = BaseRequest<{ username: string; password: string }>;

type RegisterRequest = BaseRequest<User>;

type UserRequest = BaseRequest<Omit<User, "username">>;

type ProjectRequest = BaseRequest<Project>;

type TObjectRequest = BaseRequest<TObject>;

type InvitationRequest = BaseRequest<{
  projectId: number;
  userId: number;
  readOnly: boolean;
}>;

type ImageUploadRequest = BaseRequest<{
  imageExtension: string;
  contentLength: number;
}>;

/* API response */

interface BaseResponse<T = unknown> extends NextResponse {
  body: T;
}

type ProjectsResponse = BaseResponse<{ projects: ProjectData[] }>;

type ArchiveResponse = BaseResponse<{ content: ProjectData[] }>;

type ParticipantsResponse = BaseResponse<{ participants: ParticipantData[] }>;

type TObjectsResponse = BaseResponse<{ objects: TObjectData[] }>;

type LoginResponse = BaseResponse<{ token: string }>;

type ImgResponse = BaseResponse<{ preSignedUrl: string }>;
