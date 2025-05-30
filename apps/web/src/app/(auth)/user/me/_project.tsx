"use client";

import { navigateWorkspace } from "@/app/actions/navigate";
import { BaseCard } from "@repo/ui/components";
import { useModals } from "@/hook/useModals";
import { ModalType } from "@/store/useModalStore";
import { NewProjectForm } from "@/components/Form";
import { GridLayout } from "@repo/ui/layout";
import { ProjectData } from "@/@types/api";
import { useProjectInfo } from "@/hook/useProjectInfo";

export function Projects({ projects }: { projects: ProjectData[] }) {
  const props = projects.map((p) => {
    return {
      createdAt: p.createdAt,
      isPublic: p.isPublic,
      updatedAt: p.updatedAt,
      id: p.id,
      subtitle: p.subtitle,
      title: p.title,
    };
  });

  return (
    <GridLayout>
      {props?.map((p, i) => {
        return <WorkspaceCard key={p.id} props={p} />;
      })}
      <NewCardModule valid={true} />
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

function NewCardModule({ valid }: { valid: boolean }) {
  const { open } = useModals();
  const { saveProjectInfo } = useProjectInfo();

  const handleClick = () => {
    if (valid) {
      open(NewProjectForm, { addProject: saveProjectInfo }, ModalType.FORM);
    } else {
      // project limitation 4
      alert("Currently Project Limited to 4");
    }
  };

  return <BaseCard title="CREATE NEW PROJECT" onClick={handleClick} />;
}
