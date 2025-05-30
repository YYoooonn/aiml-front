"use client";

import { create } from "zustand";
import { ProjectData, UserData } from "@/@types/api";

interface UserStoreState {
  userInfo: UserData;
  projects: ProjectData[];
  setProjects: (projects: ProjectData[]) => void;

  setUser: (user: UserData) => void;
  reset: () => void;
}

const DEFAULT = {
  username: "",
  firstName: "",
  lastName: "",
  createdAt: "",
  updatedAt: "",
  email: "",
};

export const userStore = create<UserStoreState>()((set, get) => ({
  userInfo: { ...DEFAULT },
  projects: [],

  setUser: (user) => set({ userInfo: user }),
  reset: () => set({ userInfo: { ...DEFAULT }, projects: [] }),

  setProjects: (projects) => set({ projects }),
}));
