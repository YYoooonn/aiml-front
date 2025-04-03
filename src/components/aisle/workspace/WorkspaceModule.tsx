import * as styles from "../base.css";

export function WorkspaceTopModule({
  user,
  children,
}: { user?: string } & React.PropsWithChildren) {
  return (
    <div className={styles.workspaceTopContainer}>
      <div className={styles.workspaceTopInner}>
        <div className={styles.aisleWrapper}>{children}</div>
      </div>
    </div>
  );
}

export function WorkspaceBottomModule({ children }: React.PropsWithChildren) {
  // true == layer
  return (
    <div className={styles.workspaceBottomContainer}>
      <div className={styles.aisleWrapper}>{children}</div>
    </div>
  );
}
