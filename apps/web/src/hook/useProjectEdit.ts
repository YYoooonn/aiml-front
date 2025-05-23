"use client";

import { useState } from "react";
import { createProject, updateProject } from "@/app/actions/project";
import projectStore from "@/store/projectStore";

interface ProjectEditProps {
  onUpdateComplete?: () => void;
}

export const useProjectEdit = (props?: ProjectEditProps) => {
  const {
    id: projectId,
    title,
    subtitle,
    isPublic,
    setProject,
  } = projectStore();

  const [projectInfo, setProjectInfo] = useState({
    title: title ?? "",
    subtitle: subtitle ?? "",
    isPublic: isPublic ?? true,
  });

  const onProjectEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "title":
        setProjectInfo((prev) => ({ ...prev, title: value }));
        break;
      case "subtitle":
        setProjectInfo((prev) => ({ ...prev, subtitle: value }));
        break;
      // case "isPublic":
      //   setProject((prev) => ({ ...prev, isPublic: !prev.isPublic }));
      //   break;
      default:
        break;
    }
  };

  const onPublicChange = (val: boolean) => {
    setProjectInfo((prev) => ({
      ...prev,
      isPublic: val,
    }));
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const p = {
      title: projectInfo.title,
      subtitle: projectInfo.subtitle,
      isPublic: projectInfo.isPublic,
    };

    console.log("Project Info: ", projectInfo);

    const response = projectId
      ? await updateProject({ id: projectId, ...p })
      : await createProject(p);

    if (response.success) {
      setProject(response.data);
      props?.onUpdateComplete && props.onUpdateComplete();
    } else {
      alert(response.error ?? "Failed to update project");
    }
  };

  return {
    projectInfo,
    onPublicChange,
    onProjectEdit,
    handleUpdate,
  };
};
