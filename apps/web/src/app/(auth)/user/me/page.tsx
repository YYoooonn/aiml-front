"use client";

import { useEffect } from "react";
import { Projects } from "./_project";

import { PageHeader } from "@repo/ui/components/header";
import { useUser } from "@/hook/useUser";

export default function Page() {
  const { fetchUserProjects, projects } = useUser();

  useEffect(() => {
    fetchUserProjects();
  }, []);

  return (
    <>
      <PageHeader title="Workspaces" />
      <Projects projects={projects} />
    </>
  );
}
