"use client";

import { navigateWorkspace } from "@/app/_actions/navigate";
import { BaseCard } from "@repo/ui/components";
import { useModals } from "@/hook/useModals";
import { ModalType } from "@/store/useModalStore";
import NewProjectForm from "./NewProjectForm";
import { GridLayout } from "@repo/ui/layout";

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
    <GridLayout>
      {props?.map((p, i) => {
        return (
          <WorkspaceCard key={p.id} props={p} />
        );
      })}
      <NewCardModule addProject={addProject} valid={true} />
    </GridLayout>
  );
}

function WorkspaceCard({ props }: { props: ProjectData }) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigateWorkspace(props.id);
  };
  return (
    <BaseCard
      title={props.title}
      subtitle={props.subtitle}
      onClick={handleClick}
    />
  );
}

function NewCardModule({
  addProject,
  valid,
}: {
  addProject: (project: ProjectData) => void;
  valid: boolean;
}) {
  const { open } = useModals();

  const handleClick = () => {
    if (valid) {
      open(NewProjectForm, { addProject: addProject }, ModalType.FORM);
    } else {
      // project limitation 4
      alert("Currently Project Limited to 4");
    }
  };

  return <BaseCard title="CREATE NEW PROJECT" onClick={handleClick} />;
}
