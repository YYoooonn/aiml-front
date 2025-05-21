"use client";

import { TMaterial, TObject3DData, TTransform, TVector3 } from "@/@types/api";
import { deleteObject3D, updateObject3D } from "@/app/actions/object3d";
// import { remove, update } from "@/app/_actions/object";
import { toMatrix, toMatrix4decompose } from "@/utils/calc";
import { DEFAULT_MATRIX } from "@/utils/constants";
import { create } from "zustand";

const DEFAULT_MATERIAL = "#575757";

interface SelectedInfo {
  selected: TObject3DData | undefined;
  transform: TTransform | undefined;
  name: string;
  visible: boolean;
  color?: string;
}

export interface ObjectActions {
  setSelected: (objectInfo: TObject3DData) => void;
  resetSelected: () => void;
  removeSelected: (sceneId: string) => Promise<boolean>;
  updateSelected: (sceneId: string) => Promise<TObject3DData | null>;

  // infos
  setName: (name: string) => void;
  setVisible: (visible: boolean) => void;
  // setParentId: (parentId: string | null) => void;

  // matrix
  setScale: (val: TVector3) => void;
  setPosition: (val: TVector3) => void;
  setRotation: (val: TVector3) => void;

  // mesh
  setColor: (color: string) => void;
  setMaterial: (material: TMaterial) => void;

  // group
  setChildren: (children: TObject3DData[]) => void;
}

const DEFAULT: SelectedInfo = {
  selected: undefined,
  transform: undefined,
  name: "",
  color: undefined,
  visible: true,
};

export const useObjectEditor = create<SelectedInfo & ObjectActions>()(
  (set, get) => ({
    ...DEFAULT,
    setSelected: (obj: TObject3DData) => {
      if (get().selected?.id === obj.id) {
        get().resetSelected();
      } else {
        set({
          selected: obj,
          transform: toMatrix4decompose(obj.transform),
          name: obj.name,
          color: obj.type === "MESH" ? obj.material.color : undefined,
        });
      }
    },
    resetSelected: () => set({ ...DEFAULT }),
    // fetch
    removeSelected: async (id) => {
      const { selected } = get();
      if (selected) {
        const res = await deleteObject3D(selected.id);
        if (res.success) {
          set({ ...DEFAULT });
          return true;
        } else {
          alert(res.error);
          return false;
        }
      }
      return false;
    },
    updateSelected: async (sceneId) => {
      const { selected, transform } = get();
      if (!selected) return null;
      if (!transform) console.log("transform not set");
      const matrix = transform ? toMatrix(transform) : DEFAULT_MATRIX;
      const res = await updateObject3D({
        ...selected,
        transform: matrix,
        sceneId: sceneId,
      });
      if (res.success) {
        set({ ...DEFAULT });
        return res.data;
      } else {
        alert(res.error);
        return null;
      }
    },

    // infos
    setName: (name) => {
      const { selected } = get();
      if (selected) {
        const updated = { ...selected, name: name };
        set({ selected: updated, name: name });
      }
    },
    setVisible: (visible) => {
      const { selected } = get();
      if (selected) {
        const updated = { ...selected, visible: visible };
        set({ selected: updated, visible: visible });
      }
    },

    // matrix
    setScale: (scale) => {
      const { transform } = get();
      if (!transform) return;
      const trans = { ...transform, scale: scale };
      set({ transform: trans });
    },
    setPosition: (pos) => {
      const { transform } = get();
      if (!transform) return;
      const trans = { ...transform, position: pos };
      set({ transform: trans });
    },
    setRotation: (rot) => {
      const { transform } = get();
      if (!transform) return null;
      const trans = { ...transform, rotation: rot };
      set({ transform: trans });
    },

    // mesh
    setMaterial: (material) => {
      const { selected } = get();
      if (!selected || selected.type !== "MESH") return null;
      const updated = { ...selected, material: material };
      set({ selected: updated });
      return updated;
    },

    setColor: (color) => {
      const { selected } = get();
      if (!selected || selected.type !== "MESH") return null;
      const updated = {
        ...selected,
        material: { ...selected.material, color: color },
      };
      set({ selected: updated, color: color });
      return color;
    },

    // group
    setChildren: (children) => {
      const { selected } = get();
      if (!selected || selected.type !== "GROUP") return null;
      const updated = { ...selected, children: children };
      set({ selected: updated });
      return updated;
    },
  }),
);
