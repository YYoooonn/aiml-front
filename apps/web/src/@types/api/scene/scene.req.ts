import { Scene } from "./scene.dto";

export type SceneRequest = Scene & {
  id?: string;
  projectId: string;
};
