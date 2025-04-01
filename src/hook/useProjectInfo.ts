"use client";

import { read } from "@/app/_actions/project";
import { create } from "@/app/_actions/object";
import * as z from "zustand";

export interface PAction {
  reset: () => void;
  fetch: (pId: ProjectData["id"]) => Promise<ProjectData>;
  getObjects: () => Promise<void>;
  addtoObjects: (object: TObjectData) => void;
  createObject: (objectInfo: TObject) => Promise<void>;
  removeObject?: (oId: number) => Promise<void>;
  updateObject: (object: TObjectData) => void;
  filterObject: (oId: number) => void;
}

interface P extends Omit<ProjectData, "id"> {
  id?: number;
}

interface ProjectState extends P, PAction {
  objects: TObjectData[];
}

const DEFAULT = {
  id: undefined,
  title: "",
  subtitle: "",
  objects: [],
  // TODO not implemented yet
  lastModifiedAt: "",
  createdAt: "",
  createdBy: "",
  isPublic: true,
  participants: [],
};

export const useProjectInfo = z.create<ProjectState>()((set, get) => ({
  ...DEFAULT,
  reset: () => set({ ...DEFAULT }),
  // setUser: (user) => set({user}),
  fetch: async (pId) => {
    const pInfo = await read(pId);
    const pObjts = await read(pId, "objects");
    if (pInfo.success && pObjts.success) {
      set({ ...pInfo.data, objects: pObjts.data.objects });
      return pInfo.data;
    } else {
      return pInfo;
    }
  },
  createObject: async (objectInfo) => {
    const id = get().id;
    if (id) {
      const response = await create(id, objectInfo);
      if (response.success) {
        set({ objects: [...get().objects, response.data] });
      }
    }
  },
  getObjects: async () => {
    const id = get().id;
    if (id) {
      const response = await read(id, "objects");
      if (response.success) {
        set({ objects: response.data.objects });
      }
    }
  },
  filterObject: (oId: number) => {
    set({
      objects: get().objects.filter((o) => o.id !== oId),
    });
  },
  // removeObject: async (objectId) => {
  //   await deleteObject(objectId, get().projectId);
  //   set({ objects: get().objects.filter((o) => o.objectId !== objectId) });
  // },
  updateObject: (obj) => {
    set({
      objects: get().objects.map((o) =>
        o.id === obj.id ? obj : o,
      ),
    });
  },
  addtoObjects: (object) => {
    set({ objects: [...get().objects, object] });
  },
}));
