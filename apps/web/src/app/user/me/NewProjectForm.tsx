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
import type { ProjectData } from "@/@types/api";

export default function NewProjectForm({
  addProject,
}: {
  addProject: (project: ProjectData) => void;
}) {
  const selections: string[] = ["Public", "Private"];

  const { close } = useModals();
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [selected, setSelected] = useState("Public");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await createProject({
      title: title,
      subtitle: subtitle,
      isPublic: selected === selections[0],
    });
    if (response.success) {
      addProject(response.data);
      close();
      // alert(error);
    } else {
      setError(
        response.error ? response.error : "Unknown error, please try again",
      );
    }
  };

  return (
    <BaseForm onSubmit={handleSubmit} error={error}>
      <TextFormBlock
        title="TITLE"
        onChange={setTitle}
        placeholder="Enter project title"
      />
      <p style={{ marginTop: "24px" }} />
      <TextFormBlock
        title="SUBTITLE"
        onChange={setSubtitle}
        placeholder="Enter project subtitle"
      />
      <p style={{ marginTop: "24px" }} />
      <BoolButtonBlock
        title="PUBLIC"
        textList={selections}
        selected={selected}
        setSelected={setSelected}
      />
      <p style={{ marginTop: "24px" }} />
      <SubmitButton text={"CREATE"} />
    </BaseForm>
  );
}
