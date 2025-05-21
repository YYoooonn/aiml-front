import { BaseResponse } from "../common";

export * from "./auth/auth.req";
export * from "./auth/auth.res";

export * from "./object3d/object3d.req";
export * from "./object3d/object3d.res";
export * from "./object3d/object3d.dto";

export * from "./project/project.req";
export * from "./project/project.res";
export * from "./project/project.dto";

export * from "./scene/scene.req";
export * from "./scene/scene.res";
export * from "./scene/scene.dto";

export * from "./user/user.req";
export * from "./user/user.res";
export * from "./user/user.dto";

export * from "./participant/participant.req";
export * from "./participant/participant.res";
export * from "./participant/participant.dto";

export type DeleteResponse = BaseResponse<void>;
