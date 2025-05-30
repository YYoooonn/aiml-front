"use client";

import {
  BaseForm,
  SubmitButton,
  BoolButtonBlock,
  TextFormBlock,
} from "@repo/ui/components";
import { useProjectInfo } from "@/hook/useProjectInfo";
import { useModals } from "@/hook/useModals";
import { useState } from "react";
import { useProject } from "@/hook/useProject";
import { navigate } from "@/app/actions/navigate";

export function ProjectEditForm() {
  const { close } = useModals();
  const { projectInfo, saveProjectInfo } = useProjectInfo();
  const { removeProject } = useProject();

  const [title, setTitle] = useState(projectInfo.title);
  const [subtitle, setSubtitle] = useState(projectInfo.subtitle);
  const [isPublic, setIsPublic] = useState(projectInfo.isPublic);
  const [error, setError] = useState<string>();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title) {
      setError("Please fill in title");
      return;
    }

    if (!projectInfo.id) {
      setError("Project not defined, please try again");
      return;
    }

    const response = await saveProjectInfo({
      ...projectInfo,
      title: title,
      subtitle: subtitle,
      isPublic: isPublic,
    });

    if (response.success) {
      close();
    } else {
      console.log(response.error);
      setError("Failed to save project, please try again");
    }
  };

  const onDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    const res = await removeProject(projectInfo.id);
    if (res) {
      close();
      navigate("/user/me");
    }
  };

  return (
    <BaseForm onSubmit={onSubmit} error={error}>
      <TextFormBlock
        title="TITLE"
        onChange={setTitle}
        value={title}
        name="title"
        placeholder="Enter title"
      />
      <TextFormBlock
        title="SUBTITLE"
        onChange={setSubtitle}
        value={subtitle}
        name="subtitle"
        placeholder="Enter subtitle"
      />
      <BoolButtonBlock
        title="PUBLIC"
        textList={["Public", "Private"]}
        selected={isPublic ? "Public" : "Private"}
        setSelected={(value) => setIsPublic(value === "Public")}
      />
      <SubmitButton text={"SAVE"} style={{ marginBottom: "1rem" }} />
      <SubmitButton text={"DELETE PROJECT"} handler={onDelete} />
    </BaseForm>
  );
}
