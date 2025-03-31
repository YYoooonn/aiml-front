"use client";

import { read } from "@/app/_actions/project";
import { create } from "@/app/_actions/object";
import * as z from "zustand";

export interface PAction {
  reset: () => void;
  fetch: (projectId: ProjectData["projectId"]) => Promise<ProjectData>;
  getObjects: () => Promise<void>;
  addtoObjects: (object: TObjectData) => void;
  createObject: (objectInfo: TObject) => Promise<void>;
  removeObject?: (objectId: number) => Promise<void>;
  updateObject: (object: TObjectData) => void;
  filterObject: (objectId: number) => void;
}

interface P extends Omit<ProjectData, "projectId"> {
  projectId?: number;
}

interface ProjectState extends P, PAction {
  objects: TObjectData[];
}

const DEFAULT = {
  projectId: undefined,
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
  fetch: async (projectId) => {
    const pInfo = await read(projectId);
    const pObjts = await read(projectId, "objects");
    if (pInfo.success && pObjts.success) {
      set({ ...pInfo.data, objects: pObjts.data.objects });
      return pInfo.data;
    } else {
      return pInfo;
    }
  },
  createObject: async (objectInfo) => {
    const id = get().projectId;
    if (id) {
      const response = await create(id, objectInfo);
      if (response.success) {
        set({ objects: [...get().objects, response.data] });
      }
    }
  },
  getObjects: async () => {
    const id = get().projectId;
    if (id) {
      const response = await read(id, "objects");
      if (response.success) {
        set({ objects: response.data.objects });
      }
    }
  },
  filterObject: (objectId: number) => {
    set({
      objects: get().objects.filter((o) => o.objectId !== objectId),
    });
  },
  // removeObject: async (objectId) => {
  //   await deleteObject(objectId, get().projectId);
  //   set({ objects: get().objects.filter((o) => o.objectId !== objectId) });
  // },
  updateObject: (obj) => {
    set({
      objects: get().objects.map((o) =>
        o.objectId === obj.objectId ? obj : o,
      ),
    });
  },
  addtoObjects: (object) => {
    set({ objects: [...get().objects, object] });
  },
}));
