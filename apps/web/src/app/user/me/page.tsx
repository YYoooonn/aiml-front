"use client";

import { useEffect } from "react";
import { Projects } from "./_project";
import { useUserInfo } from "@/hook/useUserInfo";

import { PageHeader } from "@repo/ui/components/header";

export default function Page({ params }: { params: { username: string } }) {
  const { fetch, projects, addProject } = useUserInfo();

  useEffect(() => {
    fetch();
  }, [params.username]);

  return (
    <>
      <PageHeader title="Workspaces" />
      <Projects projects={projects} addProject={addProject} />
    </>
  );
}
