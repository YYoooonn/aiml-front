"use client";

import { navigateWorkspace } from "@/app/_actions/navigate";
import { useModals } from "@/hook/useModals";
import { Project } from "@/@types/api";
import NewProjectForm from "../form/NewProjectForm";
import { ModalType } from "@/hook/useModalStore";

import * as styles from "./card.css";
import { useRouter } from "next/navigation";
import { useProjectInfo } from "@/hook/useProjectInfo";

export function ArchiveCard({ props }: { props: ProjectProps }) {
  // const { fetch } = useProjectInfo();
  // const { open, close } = useModals();
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(`/archive?from=${props.projectId}`);
    // navigateArchive(props.projectId);
  };
  return <CardModule props={props} handler={handleClick} />;
}

export function WorkspaceCard({ props }: { props: ProjectProps }) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigateWorkspace(props.projectId);
  };
  return <CardModule props={props} handler={handleClick} />;
}

function CardModule({
  props,
  handler,
}: {
  props: ProjectProps;
  handler: (e: React.MouseEvent) => void;
}) {
  return (
    <div className={styles.cardContainer} onClick={handler}>
      <div className={styles.cardImage}></div>
      <div className={styles.cardText}>
        {props.title}
        <div className={styles.cardSubtitle}>{props.subtitle}</div>
      </div>
    </div>
  );
}

export function NewCardModule({
  addProject,
  valid,
}: {
  addProject: (project: Project) => void;
  valid: boolean;
}) {
  const { open } = useModals();

  const handleClick = () => {
    if (valid) {
      open(NewProjectForm, { addProject: addProject }, ModalType.FORM);
    } else {
      // project limitation 3
      alert("Currently Project Limited to 3");
    }
  };

  return (
    <div className={styles.cardContainer} onClick={handleClick}>
      <button disabled={!valid} className={styles.cardImage}></button>
      <button disabled={!valid} className={styles.cardText}>
        CREATE NEW PROJECT
        <div className={styles.cardSubtitle}></div>
      </button>
    </div>
  );
}
