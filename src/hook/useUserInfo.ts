"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserInfo, Project } from "@/@types/api";
import { fetchUserInfo } from "@/app/_actions/user";

interface UserActions {
  // setUser: (user: UserStoreState) => void;
  setAll: (data: UserInfo) => void;
  addProject: (project: Project) => void;
  reset: () => void;
  fetch: (username: string) => Promise<void>;
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

export const useUserInfo = create<UserState>()(
  persist(
    (set, get) => ({
      ...DEFAULT,
      // setUser: (user) => set({user}),
      setAll: (data) => set(data),
      addProject: (project) => set({ projects: [...get().projects, project] }),
      reset: () => set(DEFAULT),
      fetch: async (username) => {
        set(DEFAULT);
        const response = await fetchUserInfo(username);
        //console.debug(response);
        if (!response["error"]) {
          set(response);
        }
      },
    }),
    {
      name: "userStorage",
    },
  ),
);
