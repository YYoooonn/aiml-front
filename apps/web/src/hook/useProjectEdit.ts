"use client";

import { useProjectStore } from "@/store/useProjectStore";
import { useState } from "react";
import { useModals } from "./useModals";

export const useProjectEdit = () => {
  const {
    title: pTitle,
    subtitle: pSubtitle,
    isPublic: pIsPublic,
    createdAt,
    updatedAt,
    updateProject,
    fetchProject,
  } = useProjectStore();

  const { close } = useModals();
  const [title, setTitle] = useState(pTitle);
  const [subtitle, setSubtitle] = useState(pSubtitle);
  const [isPublic, setIsPublic] = useState(pIsPublic);

  const handleUpdate = async () => {
    const response = await updateProject({
      title,
      subtitle,
      isPublic,
    });
    console.log(title, subtitle, isPublic);
    if (response) {
      close();
    } else {
      alert("Failed to update project");
    }
  };

  return {
    title,
    subtitle,
    isPublic,
    setTitle,
    setSubtitle,
    setIsPublic,
    createdAt,
    updatedAt,
    handleUpdate,
  };
};
