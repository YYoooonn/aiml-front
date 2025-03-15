"use client";

import { create } from "zustand";
import { UserInfo, Project } from "@/@types/api";
import { deleteCookie } from "@/app/_actions/cookie";
import { UserUpdateInfo } from "@/app/_actions/actions";

import * as user from "@/app/_actions/user";
import * as project from "@/app/_actions/project";

interface UserActions {
  // setUser: (user: UserStoreState) => void;
  setAll: (data: UserInfo) => void;
  addProject: (project: Project) => void;
  reset: () => void;
  logout: () => void;
  fetch: (id?: string) => Promise<void>;
  fetchUserInfo: (id?: string) => Promise<void>;
  update: ({
    id,
    userInfos,
  }: {
    id?: string;
    userInfos: UserUpdateInfo;
  }) => Promise<void>;
  fetchProjects: () => Promise<void>;
}

type UserState = UserInfo & UserActions;

const DEFAULT: UserInfo = {
  userId: "",
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
  setAll: (data) => set(data),

  addProject: (project) => set({ projects: [...get().projects, project] }),
  reset: () => set(DEFAULT),
  logout: () => {
    deleteCookie();
    set(DEFAULT);
  },
  fetchProjects: async () => {
    await project.read(get().userId, "projects").then((r) => {
      console.log(r);
    });
  },
  fetchUserInfo: async (id) => {
    set(DEFAULT);
    const res = await user.read(id);
    if (!res.error) set({ ...res });
    // !response.error && response.username === username
    //   ? set(response)
    //   : deleteCookie().then(() => {
    //       alert("Unauthorized, please login again");
    //       navigate("/login");
    //     });
  },
  fetch: async (id) => {
    const res = await user.read(id);
    if (!res.error) {
      set({ ...res });
    }
    const entity = await user.readEntity({ id: id, entity: "projects" });
    if (!entity.error) {
      set({ projects: entity.projects });
    }
  },
  update: async (data) => {
    const response = await user.update(data);
    console.log("UPDATE USER INFO", response);
    if (!response.error) {
      console.log("UPDATE COMPLETE");
    } else {
      alert("error alert");
    }
  },
}));
