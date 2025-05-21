import { Entity, BaseResponse } from "@/@types/common";
import { Scene, SceneData } from "./scene.dto";

export type SceneResponse = BaseResponse<SceneData>;
export type SceneListResponse = BaseResponse<SceneData[]>;
