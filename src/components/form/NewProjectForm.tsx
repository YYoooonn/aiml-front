"use client";

import { useState } from "react";
import { useModals } from "@/hook/useModals";
import { TextInput, BoolButtons, ButtonSubmit } from "@/components/ui";
import { create } from "@/app/_actions/project";
import * as styles from "./form.css";

export default function NewProjectForm({
  addProject,
}: {
  addProject: (project: ProjectData) => void;
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
    if (response.success) {
      addProject(response.data);
      close();
      // alert(error);
    } else {
      setError(error);
    }
  };

  return (
    <form className={styles.newProjectFormContainer}>
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
      {error ? (
        <>
          <p style={{ marginTop: "12px" }} />
          <div style={{ textAlign: "center", color: "red" }}>{error}</div>
        </>
      ) : (
        <></>
      )}
    </form>
  );
}
