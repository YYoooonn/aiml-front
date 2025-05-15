import * as styles from "./layout.css";

interface AisleLayoutProps {
  leftAisle?: React.ReactNode;
  rightAisle?: React.ReactNode;
  children: React.ReactNode;
}

export function LeftAislePageLayout({ leftAisle, children }: AisleLayoutProps) {
  return (
    <div className={styles.aisleLayoutContainer}>
      {leftAisle}
      <div className={styles.leftAislePageContainer}>{children}</div>
    </div>
  );
}

export function RightAislePageLayout({
  rightAisle,
  children,
}: AisleLayoutProps) {
  return (
    <div className={styles.aisleLayoutContainer}>
      <div className={styles.leftAislePageContainer}>{children}</div>
      {rightAisle}
    </div>
  );
}
