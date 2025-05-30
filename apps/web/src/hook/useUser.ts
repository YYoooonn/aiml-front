"use client";

import { navigate } from "@/app/actions/navigate";
import { getUserProjects } from "@/services/project";
import { getUserInfo } from "@/services/user";
import { userStore } from "@/store/userStore";
import { logout } from "@/services/auth";
import { ProjectData } from "@/@types/api";

export const useUser = () => {
  const { userInfo, projects, reset, setUser, setProjects } = userStore();

  const fetchUserInfo = async () => {
    const res = await getUserInfo();
    if (!res.success) {
      alert(res.error);
      res.redirectLink && navigate(res.redirectLink);
      return res;
    }

    setUser(res.data);
    return res;
  };

  const fetchUserProjects = async () => {
    const res = await getUserProjects();
    if (!res.success) {
      alert(res.error);
      res.redirectLink && navigate(res.redirectLink);
      return;
    }

    setProjects(res.data);
    return;
  };

  const logoutUser = async () => {
    const res = await logout();
    reset();
  };

  const fetchUserWithProjects = async () => {
    await fetchUserInfo();
    await fetchUserProjects();
  };

  const addToProjects = async (project: ProjectData) => {
    const filtered = projects.filter((p) => p.id !== project.id);
    setProjects([...filtered, project]);
  };

  return {
    userInfo,
    projects,
    logoutUser,
    fetchUserInfo,
    fetchUserWithProjects,
    addToProjects,
  };
};
