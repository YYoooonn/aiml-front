"use client";

import { create } from "zustand";
import { logout } from "@/app/actions/auth";
import { getUserInfo, updateUserInfo } from "@/app/actions/user";
import { getUserProjects } from "@/app/actions/project";
import { ProjectData, UserData } from "@/@types/api";

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
    userInfos: UserData;
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
  updatedAt: "",
  email: "",
  projects: [],
};

export const useUserInfo = create<UserState>()((set, get) => ({
  ...DEFAULT,
  // setUser: (user) => set({user}),
  setAll: (data) => set({ ...data }),

  addProject: (project) => set({ projects: [...get().projects, project] }),
  reset: () => set(DEFAULT),
  logout: async () => {
    const res = await logout();
    console.log(res.error);
    set(DEFAULT);
  },
  fetchUserInfo: async (id) => {
    set(DEFAULT);
    const res = await getUserInfo();
    if (res.success) set({ ...res.data });
    // !response.error && response.username === username
    //   ? set(response)
    //   : deleteCookie().then(() => {
    //       alert("Unauthorized, please login again");
    //       navigate("/login");
    //     });
  },
  fetch: async (uId) => {
    const res = await getUserInfo();
    if (res.success) {
      set({ ...res.data });
      const r = await getUserProjects();
      if (r.success) set({ projects: r.data });
    } else {
      alert(res.error);
    }
  },
  update: async (data) => {
    const response = await updateUserInfo(data.userInfos);
    if (!response.success) alert(response.error);
  },
}));
