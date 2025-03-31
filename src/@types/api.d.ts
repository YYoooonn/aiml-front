import { NextResponse, NextRequest } from "next/server";

/* API REQUEST */
interface LoginRequest extends NextRequest {
  body: {
    username: string;
    password: string;
  };
}

interface AuthRequest extends NextRequest {
  header: { Authorization: string } & Record<string, unknown>;
}

interface RegisterRequest extends NextRequest {
  body: User;
}

interface UserRequest extends NextRequest {
  body: Omit<User, "username">;
}

interface ProjectRequest extends NextRequest {
  body: Project;
}

interface TObjectRequest extends NextRequest {
  body: TObject;
}

interface InvitationRequest extends NextRequest {
  body: {
    projectId: number;
    userId: number;
    readOnly: boolean;
  };
}

interface ImageRequest extends NextRequest {
  body: {
    imageExtension: string; // "jpeg" "png"
    contentLength: number;
  };
}

interface ImgUploadRequest extends NextRequest {
  body: {
    imageExtension: string;
    contentLength: number;
  };
}

/* API RESPONSE */
interface SuccessResponse extends Response {
  body?: { success: boolean };
}

interface ErrorResponse extends Response {
  body?: { error: string };
}

interface IResponse<T extends UserData | ProjectData | TObjectData>
  extends NextResponse {
  body: T;
}

// TODO 나중에 백엔드 이렇게 구성하도록 요청하자
// interface IMultiResponse<T extends UserData | ProjectData | TObjectData> extends NextResponse {
//   body : {data : T[]}
// }

interface ProjectsResponse extends NextResponse {
  body: {
    projects: ProjectData[];
  };
}

interface ProjectsSearchResponse extends NextResponse {
  body: {
    content: ProjectData[];
  };
}

interface ParticipantsResponse extends NextResponse {
  body: {
    participants: Participant[];
  };
}

interface TObjectsResponse extends NextResponse {
  body: {
    objects: TObjectData[];
  };
}

interface LoginResponse extends NextResponse {
  body: {
    token: string;
  };
}

interface ImgResponse extends NextResponse {
  body: { preSignedUrl: string };
}
