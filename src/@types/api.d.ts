import { NextResponse, NextRequest } from "next/server";

/* API REQUEST */

interface BaseRequest<T = unknown> extends NextRequest {
  body?: T;
  headers?: Record<string, unknown>;
  method : "GET" | "POST" | "DELETE" | "PATCH" | "PUT"
}

interface AuthRequest<T = unknown>  extends BaseRequest {
  body? : T
  headers: { Authorization: string } & Record<string, unknown>;
}

type LoginRequest = BaseRequest<{ username: string; password: string }>

type RegisterRequest = BaseRequest<User>

type UserRequest = BaseRequest<Omit<User, "username">>

type ProjectRequest = BaseRequest<Project>

type TObjectRequest = BaseRequest<TObject> 

type InvitationRequest = BaseRequest<{ projectId: number; userId: number; readOnly: boolean }> 

type ImageUploadRequest = BaseRequest<{ imageExtension: string; contentLength: number }> 

/* API RESPONSE */

interface BaseResponse<T=unknown> extends NextResponse {
  body: T;
}

// TODO 나중에 백엔드 이렇게 구성하도록 요청하자
// interface Response<T=unknwon> extends BaseResponse {
//   body : {data : T}
// }

type ProjectsResponse = BaseResponse<{projects: ProjectData[]}>

type ProjectsSearchResponse = BaseResponse<{content: ProjectData[]}>

type ParticipantsResponse = BaseResponse<{participants: ParticipantData[]}>

type TObjectsResponse = BaseResponse<{objects: TObjectData[]}>

type LoginResponse = BaseResponse<{ token: string }>

type ImgResponse = BaseResponse<{ preSignedUrl: string }>
