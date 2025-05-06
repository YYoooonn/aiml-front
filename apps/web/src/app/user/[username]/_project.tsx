"use client";

import { WorkspaceCard, NewCardModule } from "@/components/card";

import * as styles from "./user.css";

export function Projects({
  projects,
  addProject,
}: {
  projects: ProjectData[];
  addProject: (project: ProjectData) => void;
}) {
  const props = projects.map((p) => {
    return {
      createdAt: p.createdAt,
      isPublic: p.isPublic,
      lastModifiedAt: p.lastModifiedAt,
      id: p.id,
      subtitle: p.subtitle,
      title: p.title,
    };
  });

  return (
    <div className={styles.projectContainer}>
      {props?.map((p, i) => {
        return <WorkspaceCard key={i} props={p} />;
      })}
      <NewCardModule addProject={addProject} valid={projects?.length < 5} />
    </div>
  );
}
