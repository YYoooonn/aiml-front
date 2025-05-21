import { TObject3D } from "./object3d.dto";

export type Object3DRequest = TObject3D & {
  id?: string;
  sceneId: string;
};
