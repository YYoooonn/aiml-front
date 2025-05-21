"use client";

import type {
  TMaterial,
  TObject3D,
  TTransform,
  TGeometry,
  TObject3DBase,
  TObject3DData,
} from "@/@types/api";
import { createObject3D } from "@/app/actions/object3d";
import { getVerticesAndFaces } from "@/assets/geometry";
import { DEFAULT_MATERIAL } from "@/assets/material";
import { toMatrix } from "@/utils/calc";
import { create } from "zustand";

type Object3DBaseConstructor = Omit<TObject3D, "transform" | "type"> & {
  type?: "MESH" | "GROUP";
  transform?: TTransform;

  // mesh
  geometry?: TGeometry;
  material?: TMaterial;

  // group
  children?: TObject3DData[];
};

type MeshConstructor = Object3DBaseConstructor & {
  type: "MESH";
  geometry: TGeometry;
  material: TMaterial;
  transform: TTransform;
};

type GroupConstructor = Object3DBaseConstructor & {
  type: "GROUP";
  children: TObject3DData[];
  transform: TTransform;
};

type Object3DConstructor = MeshConstructor | GroupConstructor;

export interface ConstructorAction {
  reset: () => void;
  setNew: (
    input: Omit<Object3DConstructor, "transform"> & { transform?: TTransform },
  ) => void;
  setNewMesh: (input: string) => void;
  setNewGroup: (input: GroupConstructor) => void;
  setScale: (val: TTransform["scale"]) => void;
  setPosition: (val: TTransform["position"]) => void;
  setRotation: (val: TTransform["rotation"]) => void;

  updateObject3D: (sceneId: string) => Promise<TObject3DData | null>;
  setGeometry: (geometry: MeshConstructor["geometry"]) => void;
  setMaterial: (material: MeshConstructor["material"]) => void;
}

const DEFAULT: Object3DBaseConstructor = {
  type: undefined,
  name: "",
  transform: undefined,
  visible: true,
  parentId: null,
  geometry: undefined,
  material: undefined,
  children: undefined,
};

export const useObjectCreator = create<
  Object3DBaseConstructor & ConstructorAction
>()((set, get) => ({
  ...DEFAULT,
  reset: () => set({ ...DEFAULT }),
  setNew: (input) => {
    if (input.type === "MESH") {
      set({
        type: "MESH",
        name: input.name,
        transform: input.transform ? input.transform : DEFAULT_TRANSFORM,
        visible: input.visible,
        parentId: input.parentId,

        geometry: input.geometry,
        material: input.material,
      });
    } else if (input.type === "GROUP") {
      set({
        type: "GROUP",
        name: input.name,
        transform: input.transform ? input.transform : DEFAULT_TRANSFORM,
        visible: input.visible,
        parentId: input.parentId,

        children: input.children ? input.children : [],
      });
    }
  },
  setScale: (val: TTransform["scale"]) => {
    const transform = get().transform;
    if (!transform) {
      console.log("transform must be set");
      return;
    }
    set({ transform: { ...transform, scale: val } });
  },
  setPosition: (val: TTransform["position"]) => {
    const transform = get().transform;
    if (!transform) {
      console.log("transform must be set");
      return;
    }
    set({ transform: { ...transform, position: val } });
  },
  setRotation: (val: TTransform["rotation"]) => {
    const transform = get().transform;
    if (!transform) {
      console.log("transform must be set");
      return;
    }
    set({ transform: { ...transform, rotation: val } });
  },
  setVisible: (val: boolean) => set({ visible: val }),
  setParentId: (val: string | null) => set({ parentId: val }),
  setName: (val: string) => set({ name: val }),

  // mesh
  setNewMesh: (input) => {
    set({
      type: "MESH",
      name: "untitled",
      transform: DEFAULT_TRANSFORM,
      geometry: DEFAULT_GEOMETRY(input),
      material: DEFAULT_MATERIAL,
    });
  },
  setMaterial: (material) => {
    if (get().type === "MESH") set({ material: material });
  },
  setGeometry: (geometry) => {
    if (get().type === "MESH") set({ geometry: geometry });
  },

  // group
  setNewGroup: (input) => {
    set({
      type: "GROUP",
      name: input.name,
      transform: input.transform ? input.transform : DEFAULT_TRANSFORM,
      children: input.children ? input.children : [],
    });
  },

  updateObject3D: async (sceneId: string) => {
    const {
      type,
      geometry,
      material,
      children,
      transform,
      visible,
      parentId,
      name,
    } = get();
    const t = transform ? transform : DEFAULT_TRANSFORM;
    const matrix = toMatrix(t);
    const objInfo = {
      transform: matrix,
      visible: visible,
      parentId: parentId,
      name: name ? name : "untitled",
    };
    if (type === "MESH") {
      if (geometry && material) {
        const meshInfo = {
          ...objInfo,
          type: "MESH",
          geometry: geometry,
          material: material,
        };
        const res = await createObject3D({
          ...meshInfo,
          type: "MESH",
          sceneId: sceneId,
        });
        return res.data;
      }
    } else if (type === "GROUP") {
      const groupInfo = {
        ...objInfo,
        type: "GROUP",
        children: children ? children : [],
      };
      const res = await createObject3D({
        ...groupInfo,
        type: "GROUP",
        sceneId: sceneId,
      });
      return res.data;
    }
    return null;
  },
}));

const DEFAULT_TRANSFORM: TTransform = {
  position: [0, 0, 0],
  rotation: [0, 0, 0],
  scale: [1, 1, 1],
};

// const DEFAULT_GEOMETRY: MeshConstructor["geometry"] = {
//   name: "untitled",
//   vertices: [],
//   faces: [],
//   type: "box",
// };

const DEFAULT_GEOMETRY = (type: string) => {
  const { v, f } = getVerticesAndFaces(type);
  return {
    name: "untitled",
    vertices: v,
    faces: f,
    type: type,
  };
};
