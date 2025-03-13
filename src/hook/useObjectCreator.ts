"use client";

import { ObjectInfo } from "@/@types/api";
import {
  createObject,
  deleteObject,
  updateObject,
} from "@/app/_actions/project";
import { toMatrix, toMatrix4decompose } from "@/utils/calc";
import { create } from "zustand";

type XYZ = [x: number, y: number, z: number];

export interface ObjectConstructor {
  type: string | undefined;
  position: XYZ | undefined;
  scale: XYZ | undefined;
  rotation: XYZ | undefined;
  material: string | undefined;
}

export interface NewObjectAction {
  setNew: (type: string) => void;
  reset: () => void;
  setScale: (val: XYZ) => void;
  setPosition: (val: XYZ) => void;
  setRotation: (val: XYZ) => void;
  setMaterial: (material: string) => void;
  update: (id: string) => Promise<any>;
}

const DEFAULT: ObjectConstructor = {
  type: undefined,
  position: undefined,
  scale: undefined,
  rotation: undefined,
  material: undefined,
};

export const useObjectCreator = create<ObjectConstructor & NewObjectAction>()(
  (set, get) => ({
    ...DEFAULT,
    setNew: (type: string) => {
      set({
        type: type,
        position: [0, 0, 0],
        scale: [1, 1, 1],
        rotation: [0, 0, 0],
        material: "#575757",
      });
    },
    reset: () => set({ ...DEFAULT }),
    setScale: (val: XYZ) => set({ scale: val }),
    setPosition: (val: XYZ) => set({ position: val }),
    setRotation: (val: XYZ) => set({ rotation: val }),
    setMaterial: (material: string) => set({ material: material }),
    update: async (id: string) => {
      const { type, position, scale, rotation, material } = get();
      if (type && position && scale && rotation && material) {
        const matrix = toMatrix(position, rotation, scale);
        const response = await createObject(
          { geometry: type, material: material, matrix: matrix },
          id,
        );
        if (!response.error) {
          return response;
        }
        // XXX error catch
      }
      return null;
    },
  }),
);
