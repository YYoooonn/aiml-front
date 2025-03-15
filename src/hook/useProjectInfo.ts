"use client";

import { ObjectInfo, ObjectConstructor, Project } from "@/@types/api";
import { read } from "@/app/_actions/project";
import { create } from "@/app/_actions/object";
import * as z from "zustand";

export interface ProjectAction {
  reset: () => void;
  fetch: (projectId: Project["projectId"]) => Promise<Project>;
  getObjects: () => Promise<void>;
  addtoObjects: (object: ObjectInfo) => void;
  createObject: (objectInfo: ObjectConstructor) => Promise<void>;
  removeObject?: (objectId: string) => Promise<void>;
  updateObject: (object: ObjectInfo) => void;
  filterObject: (objectId: string) => void;
}

type ProjectState = Omit<Project & ProjectAction, "projects">;

const DEFAULT: Omit<Project, "projects"> = {
  projectId: "",
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
    const proInfo = await read(projectId);
    const pObjts = await read(projectId, "objects");
    if (proInfo.error || pObjts.error) {
      return DEFAULT;
    } else {
      set({...proInfo, objects: pObjts.objects});
      return proInfo
    }
  },
  createObject: async (objectInfo) => {
    const response = await create(get().projectId, objectInfo);
    if (!response["error"]) {
      set({ objects: [...get().objects, response] });
    }
  },
  getObjects: async () => {
    const response = await read(get().projectId, "objects");
    if (response.objects) {
      set({ objects: response.objects });
    }
  },
  filterObject: (objectId: string) => {
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
