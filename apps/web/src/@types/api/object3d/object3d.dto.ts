import { Entity } from "@/@types/common";
import type { Matrix4Tuple } from "three";

export type TObject3DData = Entity<TObject3D>;

export type TObject3D = TMesh | TGroup;

export type Object3DType = "MESH" | "GROUP";

export interface TGroup extends TObject3DBase {
  type: "GROUP";
  children: TObject3DData[];
}

export interface TMesh extends TObject3DBase {
  type: "MESH";
  geometry: TGeometry;
  material: TMaterial;
}

export interface TObject3DBase {
  name: string;
  transform: TMatrix;
  visible: boolean;
  parentId: string | null;
  type: Object3DType;
}

export type TMatrix = Matrix4Tuple;

export interface TTransform {
  position: TVector3;
  rotation: TVector3;
  scale: TVector3;
}

export type TVector3 = [x: number, y: number, z: number];

export type TQuaternion = [x: number, y: number, z: number, w: number];

export interface TGeometry {
  id?: string;
  name: string;
  vertices: TVertex[];
  faces: number[][];
  type?: string;
}

export interface TMaterial {
  id?: string;
  color: string;
  name: string;
  opacity: number;
  transparent: boolean;
  map: string | null;
}

interface TVertex extends TVector3 {}
