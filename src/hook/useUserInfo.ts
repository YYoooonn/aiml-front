"use client";

import { create } from "zustand";
import { deleteCookie } from "@/app/_actions/cookie";

import * as user from "@/app/_actions/user";

interface UserActions {
  // setUser: (user: UserStoreState) => void;
  setAll: (data: UserData) => void;
  addProject: (project: ProjectData) => void;
  reset: () => void;
  logout: () => void;
  fetch: (uId?: number) => Promise<void>;
  fetchUserInfo: (id?: number) => Promise<void>;
  update: ({
    id,
    userInfos,
  }: {
    id?: string;
    userInfos: User;
  }) => Promise<void>;
  fetchProjects?: () => Promise<void>;
}

interface U extends Omit<UserData, "id"> {
  id?: number;
  projects: ProjectData[];
}

type UserState = U & UserActions;

const DEFAULT: U = {
  id: undefined,
  username: "",
  firstName: "",
  lastName: "",
  createdAt: "",
  lastModifiedAt: "",
  email: "",
  projects: [],
};

export const useUserInfo = create<UserState>()((set, get) => ({
  ...DEFAULT,
  // setUser: (user) => set({user}),
  setAll: (data) => set({ ...data }),

  addProject: (project) => set({ projects: [...get().projects, project] }),
  reset: () => set(DEFAULT),
  logout: () => {
    deleteCookie();
    set(DEFAULT);
  },
  fetchUserInfo: async (id) => {
    set(DEFAULT);
    const res = id ? await user.read(id) : await user.read();
    if (res.success) set({ ...res.data });
    // !response.error && response.username === username
    //   ? set(response)
    //   : deleteCookie().then(() => {
    //       alert("Unauthorized, please login again");
    //       navigate("/login");
    //     });
  },
  fetch: async (uId) => {
    const res = uId ? await user.read(uId) : await user.read();
    if (res.success) {
      set({ ...res.data });
      const r = await user.readEntity({
        id: uId ? uId : undefined,
        entity: "projects",
      });
      if (r.success) set({ projects: r.data.projects });
    } else {
      alert(res.error);
    }
  },
  update: async (data) => {
    const response = await user.update(data);
    if (!response.success) alert(response.error);
  },
}));
