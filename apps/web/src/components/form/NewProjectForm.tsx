"use client";

import { useState } from "react";
import { useModals } from "@/hook/useModals";
import {
  BaseForm,
  TextFormBlock,
  SubmitButton,
  BoolButtonBlock,
} from "@repo/ui/components";
import { ProjectData } from "@/@types/api";
import { BaseFrontResponse } from "@/@types/common";

export function NewProjectForm({
  addProject,
}: {
  addProject: (project: Partial<ProjectData>) => Promise<BaseFrontResponse>;
}) {
  const { close } = useModals();
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [error, setError] = useState<string>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title) {
      setError("Please fill in title");
      return;
    }

    const response = await addProject({
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
        value={title}
        name="title"
        placeholder="Enter project title"
      />
      <TextFormBlock
        title="SUBTITLE"
        onChange={setSubtitle}
        value={subtitle}
        name="subtitle"
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
