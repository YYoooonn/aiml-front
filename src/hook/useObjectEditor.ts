"use client";

import { ObjectInfo } from "@/@types/api";
import { remove, update } from "@/app/_actions/object";
import { toMatrix, toMatrix4decompose } from "@/utils/calc";
import { create } from "zustand";

type XYZ = [x: number, y: number, z: number];

export interface SelectedInfo {
  selected: ObjectInfo | undefined;
  position: XYZ | undefined;
  scale: XYZ | undefined;
  rotation: XYZ | undefined;
  material: string | undefined;
  TEST?: boolean;
}

export interface ObjectActions {
  setSelected: (objectInfo: ObjectInfo) => void;
  resetSelected: () => void;
  setScale: (val: XYZ) => void;
  setPosition: (val: XYZ) => void;
  setRotation: (val: XYZ) => void;
  setMaterial: (val: string) => void;
  removeSelected: (projectId: string) => Promise<any>;
  updateMatrix: (projectId: string) => Promise<any>;
  updateMaterial: (material: string) => Promise<void>;
  toggleTest: () => void;
}

const DEFAULT: SelectedInfo = {
  selected: undefined,
  position: undefined,
  scale: undefined,
  rotation: undefined,
  material: undefined,
};

export const useObjectEditor = create<SelectedInfo & ObjectActions>()(
  (set, get) => ({
    ...DEFAULT,
    setSelected: (obj: ObjectInfo) => {
      if (get().selected?.objectId === obj.objectId) {
        get().resetSelected();
      } else {
        set({ selected: obj });
        const mat = toMatrix4decompose(obj.matrix);
        set({
          position: mat.position,
          scale: mat.scale,
          rotation: mat.rotation,
          material: obj.material ? obj.material : "#575757",
        });
      }
    },
    resetSelected: () => set(DEFAULT),
    setScale: (scale) => set({ scale: scale }),
    setPosition: (pos) => set({ position: pos }),
    setRotation: (rot) => set({ rotation: rot }),
    setMaterial: (val) => set({ material: val }),
    updateMatrix: async (id) => {
      const { selected, position, rotation, scale, material, resetSelected } =
        get();
      if (selected && position && rotation && scale) {
        const matrix = toMatrix(position, rotation, scale);
        const response = await update(id, selected.objectId, {
          matrix: matrix,
          material: material,
          geometry: selected.geometry,
        });
        return response;
      }
      return { error: "EMPTY PARAMETER" };
    },

    // fetch
    removeSelected: async (id) => {
      const { selected } = get();
      if (selected) {
        const res = await remove(id, selected.objectId);
        if(res.error) return res
        return selected
      }
    },
    updateMaterial: async (mat) => alert("NOT IMPLEMENTED YET"),
    toggleTest: () => {},
  }),
);
