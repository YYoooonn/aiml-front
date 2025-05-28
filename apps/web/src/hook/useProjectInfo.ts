"use client";

import { useMemo } from "react";
import {
  createProject,
  updateProject,
  getProject,
} from "@/app/actions/project";
import projectStore from "@/store/projectStore";
import { ProjectData } from "@/@types/api";

export const useProjectInfo = () => {
  const { id, title, subtitle, isPublic, updatedAt, createdAt, setProject } =
    projectStore();

  const projectInfo = useMemo(
    () => ({
      id: id,
      title: title ?? "",
      subtitle: subtitle ?? "",
      isPublic: isPublic ?? true,
      updatedAt: updatedAt,
      createdAt: createdAt,
    }),
    [title, subtitle, isPublic, updatedAt, createdAt],
  );

  const fetchProjectInfo = async (pId?: string) => {
    const projectId = pId ?? id;
    if (!projectId)
      return { success: false, error: "Project ID is not defined" };

    const projectResponse = await getProject(projectId);
    if (projectResponse.error) return projectResponse;

    setProject(projectResponse.data);
    return projectResponse;
  };

  const saveProjectInfo = async (data: Partial<ProjectData>) => {
    const request = {
      ...data,
      title: data.title ?? "untitled",
      isPublic: data.isPublic ?? true,
    };

    const response = data.id
      ? await updateProject({ ...request, id: data.id })
      : await createProject(request);

    if (response.success) setProject(response.data);

    return response;
  };

  return {
    projectId: projectInfo.id,
    projectInfo,
    saveProjectInfo,
    fetchProjectInfo,
  };
};
