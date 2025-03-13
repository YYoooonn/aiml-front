"use client";

import { create } from "zustand";
import { ObjectInfo, ObjectConstructor, Project, UserInfo } from "@/@types/api";
import {
  createObject,
  deleteObject,
  fetchProject,
} from "@/app/_actions/project";
import { persist } from "zustand/middleware";

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

export const useProjectInfo = create<ProjectState>()((set, get) => ({
  ...DEFAULT,
  reset: () => set({ ...DEFAULT }),
  // setUser: (user) => set({user}),
  fetch: async (projectId) => {
    const response = await fetchProject(projectId);
    if (!response["error"]) {
      set(response);
      return response;
    } else {
      return DEFAULT;
    }
  },
  createObject: async (objectInfo) => {
    const response = await createObject(objectInfo, get().projectId);
    if (!response["error"]) {
      set({ objects: [...get().objects, response] });
    }
  },
  getObjects: async () => {
    const response = await fetchProject(get().projectId);
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
