import { Entity } from "@/@types/common";
import { TObject3D, TObject3DData } from "../object3d/object3d.dto";

export interface Scene {
  name: string;
  type: "SCENE";
  children: TObject3DData[];
}

export type SceneData = Entity<Scene> & {};
