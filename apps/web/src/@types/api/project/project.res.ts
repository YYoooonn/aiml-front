import { BaseResponse } from "@/@types/common";
import { ProjectData } from "./project.dto";

export type ProjectResponse = BaseResponse<ProjectData>;
export type ProjectListResponse = BaseResponse<ProjectData[]>;
