import { LWorkspaceAisle, RightAisle } from "@/components/aisle";
import * as styles from "./layout.css";

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.aisleLayoutContainer}>
      <LWorkspaceAisle />
      <RightAisle />
      <div className={styles.bothAislePageContainer}>{children}</div>
    </div>
  );
}
