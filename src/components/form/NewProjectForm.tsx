"use client";

import { useModals } from "@/hook/useModals";
import { TextInput } from "../ui/input";
import { useState } from "react";
import { Project } from "@/@types/api";
import * as styles from "./form.css";
import { BoolButtons, ButtonSubmit } from "../ui/button";
import { create } from "@/app/_actions/project";

export default function NewProjectForm({
  addProject,
}: {
  addProject: (project: Project) => void;
}) {
  const selections = ["Public", "Private"];

  const { close } = useModals();
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [selected, setSelected] = useState(selections[0]);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await create({
      title: title,
      subtitle: subtitle,
      isPublic: selected === selections[0],
    });
    if (response.error) {
      alert(error);
    } else {
      close();
      addProject(response);
    }
  };

  return (
    <div className={styles.newProjectFormContainer}>
      <TextInput title={"TITLE"} dispatch={setTitle} />
      <p style={{ marginTop: "24px" }} />
      <TextInput title={"SUBTITLE"} dispatch={setSubtitle} />
      <p style={{ marginTop: "24px" }} />
      <BoolButtons
        textList={selections}
        selected={selected}
        setSelected={setSelected}
      />
      <p style={{ marginTop: "24px" }} />
      <ButtonSubmit text={"CREATE"} handler={handleSubmit} />
    </div>
  );
}
