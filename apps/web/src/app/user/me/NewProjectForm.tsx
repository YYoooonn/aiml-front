"use client";

import { useState } from "react";
import { useModals } from "@/hook/useModals";
import {
  BaseForm,
  TextFormBlock,
  SubmitButton,
  BoolButtonBlock,
} from "@repo/ui/components";
import { create } from "@/app/_actions/project";

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

    const response = await create({
      title: title,
      subtitle: subtitle,
      isPublic: selected === selections[0],
    });
    if (response.success) {
      addProject(response.data);
      close();
      // alert(error);
    } else {
      setError(error);
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
