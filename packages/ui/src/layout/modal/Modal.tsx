import { globalTheme } from "../../styles/global";
import * as styles from "./modal.css";

interface ModalProps {
  handleClose: () => void;
  type: "archive" | "form";
  title?: string;
  subtitle?: string;
}

interface ModalHeaderProps {
  handleClose: () => void;
  title?: string;
  subtitle?: string;
}

function ModalHeader({ handleClose }: ModalHeaderProps) {
  return (
    <div className={styles.modalHeader}>
      <button className={styles.buttonExit} onClick={handleClose} />
    </div>
  );
}

function ArchiveModalHeader({
  title,
  subtitle,
  handleClose,
}: ModalHeaderProps) {
  return (
    <div className={styles.modalHeader}>
      <button className={styles.buttonExit} onClick={handleClose} />
      <p className={styles.modalHeaderTitle}>{title ? title : "untitled"}</p>
      <p className={styles.modalHeaderSubtitle}>
        {subtitle ? subtitle : "anonymous"}
      </p>
    </div>
  );
}

export function ModalLayout({
  children,
  handleClose,
  type,
  title,
  subtitle,
}: ModalProps & React.PropsWithChildren) {
  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modalWrapper} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalInWrapper}>
          {type === "form" ? (
            <ModalHeader handleClose={handleClose} />
          ) : (
            <ArchiveModalHeader
              title={title}
              subtitle={subtitle}
              handleClose={handleClose}
            />
          )}
          <div className={styles.modalContent}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
