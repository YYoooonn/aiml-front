"use client";

import { ActionResponse } from "@/app/_actions/actions";
import { remove, update } from "@/app/_actions/object";
import { toMatrix, toMatrix4decompose } from "@/utils/calc";
import { create } from "zustand";

const DEFAULT_MATERIAL = "#575757";

export interface SelectedInfo {
  selected: TObjectData | undefined;
  position: Position | undefined;
  scale: Position | undefined;
  rotation: Position | undefined;
  material: string | undefined;
  TEST?: boolean;
}

export interface ObjectActions {
  setSelected: (objectInfo: TObjectData) => void;
  resetSelected: () => void;
  setScale: (val: Position) => void;
  setPosition: (val: Position) => void;
  setRotation: (val: Position) => void;
  setMaterial: (val: string) => void;
  removeSelected: (projectId: number) => Promise<ActionResponse>;
  updateMatrix: (projectId: number) => Promise<ActionResponse<TObjectData>>;
  updateMaterial: (material: string) => void;
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
    setSelected: (obj: TObjectData) => {
      if (get().selected?.objectId === obj.objectId) {
        get().resetSelected();
      } else {
        set({ selected: obj });
        const mat = toMatrix4decompose(obj.matrix);
        set({
          position: mat.position,
          scale: mat.scale,
          rotation: mat.rotation,
          material: obj.material ? obj.material : DEFAULT_MATERIAL,
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
        if (response.success) resetSelected();
        return response;
      }
      return { success: false, error: "EMPTY PARAMETER" };
    },

    // fetch
    removeSelected: async (id) => {
      const { selected } = get();
      if (selected) {
        const res = await remove(id, selected.objectId);
        return res;
      } else {
        return { success: false, error: "not selected" };
      }
    },
    updateMaterial: async (mat) => {
      // console.log(mat);
      alert("NOT IMPLEMENTED YET");
    },
    toggleTest: () => {},
  }),
);
