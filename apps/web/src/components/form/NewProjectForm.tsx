"use client";

import { useState } from "react";
import { useModals } from "@/hook/useModals";
import {
  BaseForm,
  TextFormBlock,
  SubmitButton,
  BoolButtonBlock,
} from "@repo/ui/components";
import { createProject } from "@/app/actions/project";
import { useProjectInfo } from "@/hook/useProjectInfo";

export function NewProjectForm() {
  const { close } = useModals();
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [error, setError] = useState<string>();

  const { saveProjectInfo } = useProjectInfo();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title) {
      setError("Please fill in title");
      return;
    }

    const response = await saveProjectInfo({
      title: title,
      subtitle: subtitle,
      isPublic: isPublic,
    });

    if (response.success) {
      close();
      return;
    }

    // console.log(response.error)
    setError(response.error);
  };

  return (
    <BaseForm onSubmit={handleSubmit} error={error}>
      <TextFormBlock
        title="TITLE"
        onChange={setTitle}
        placeholder="Enter project title"
      />
      <TextFormBlock
        title="SUBTITLE"
        onChange={setSubtitle}
        placeholder="Enter project subtitle"
      />
      <BoolButtonBlock
        title="PUBLIC"
        textList={["Public", "Private"]}
        selected={isPublic ? "Public" : "Private"}
        setSelected={(value) => setIsPublic(value === "Public")}
      />
      <SubmitButton text={"CREATE"} />
    </BaseForm>
  );
}
