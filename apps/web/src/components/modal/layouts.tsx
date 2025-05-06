import * as styles from "./modal.css";

export function ArchiveModalLayout({ children }: React.PropsWithChildren) {
  return (
    <div className={styles.modalBackgroundWrapperArchive}>
      <div className={styles.archiveModalWrapper}>{children}</div>
    </div>
  );
}

export function FormModalLayout({
  handleClose,
  children,
}: { handleClose: () => void } & React.PropsWithChildren) {
  return (
    <div className={styles.modalBackgroundWrapper} onClick={handleClose}>
      <div className={styles.modalWrapper} onClick={(e) => e.stopPropagation()}>
        <div className={styles.pageModalInWrapper}>
          <ModalHeader handler={handleClose} />
          {children}
        </div>
      </div>
    </div>
  );
}

function ModalHeader({ handler }: { handler: () => void }) {
  return (
    <div className={styles.modalHeader}>
      <div className={styles.buttonExit} onClick={handler} />
    </div>
  );
}
