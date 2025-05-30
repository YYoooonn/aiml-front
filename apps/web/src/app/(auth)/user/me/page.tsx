"use client";

import { useEffect } from "react";
import { Projects } from "./_project";

import { PageHeader } from "@repo/ui/components/header";
import { useUser } from "@/hook/useUser";

export default function Page() {
  const { fetchUserWithProjects, projects } = useUser();

  useEffect(() => {
    fetchUserWithProjects();
  }, []);

  return (
    <>
      <PageHeader title="Workspaces" />
      <Projects projects={projects} />
    </>
  );
}
