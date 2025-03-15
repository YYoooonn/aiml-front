"use client";

import { useEffect } from "react";
import { Projects } from "./_project";
import { useUserInfo } from "@/hook/useUserInfo";

import * as styles from "./user.css";

export default function Page({ params }: { params: { username: string } }) {
  const fetch = useUserInfo((s) => s.fetch);
  const projects = useUserInfo((s) => s.projects);
  const addProject = useUserInfo((s) => s.addProject);

  useEffect(() => {
    fetch(params.username);
  }, []);

  return (
    <>
      <div className={styles.projectPageHeader}>Workspaces</div>
      <p style={{ marginTop: "16px" }} />

      <Projects projects={projects} addProject={addProject} />
    </>
  );
}
