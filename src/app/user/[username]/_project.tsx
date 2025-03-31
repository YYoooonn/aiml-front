"use client";

import { WorkspaceCard, NewCardModule } from "@/components/card/CardModule";
import { Project } from "@/@types/api";

import * as styles from "./user.css";

export function Projects({
  projects,
  addProject,
}: {
  projects: Project[];
  addProject: (project: Project) => void;
}) {
  const props = projects.map((p) => {
    return {
      createdAt: p.createdAt,
      isPublic: p.isPublic,
      lastModifiedAt: p.lastModifiedAt,
      projectId: p.projectId,
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
