import { BaseResponse } from "@/@types/common";
import { TObject3DData } from "./object3d.dto";

export type Object3DResponse = BaseResponse<TObject3DData>;
export type Object3DListResponse = BaseResponse<TObject3DData[]>;
