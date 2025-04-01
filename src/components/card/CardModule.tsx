"use client";

import { navigateWorkspace } from "@/app/_actions/navigate";
import { useModals } from "@/hook/useModals";
import NewProjectForm from "../form/NewProjectForm";
import { ModalType } from "@/hook/useModalStore";

import * as styles from "./card.css";
import { useRouter } from "next/navigation";

export function ArchiveCard({ props }: { props: ProjectData }) {
  // const { fetch } = useProjectInfo();
  // const { open, close } = useModals();
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(`/archive?from=${props.id}`);
    // navigateArchive(props.id);
  };
  return <CardModule props={props} handler={handleClick} />;
}

export function WorkspaceCard({ props }: { props: ProjectData }) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigateWorkspace(props.id);
  };
  return <CardModule props={props} handler={handleClick} />;
}

function CardModule({
  props,
  handler,
}: {
  props: ProjectData;
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

  return (
    <div className={styles.cardContainer} onClick={handleClick}>
      <div className={styles.cardImage}></div>
      <div className={styles.cardText}>
        CREATE NEW PROJECT
        <div className={styles.cardSubtitle}></div>
      </div>
    </div>
  );
}
