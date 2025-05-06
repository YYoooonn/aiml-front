import { Footer, LeftAisle } from "@/components";
import { LUserAisle, LArchiveAisle } from "@/components/aisle";
import * as styles from "./layout.css";

export function LeftAisleLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.aisleLayoutContainer}>
      <LeftAisle />
      <div className={styles.leftAislePageContainer}>{children}</div>
      <Footer />
    </div>
  );
}

export function ArchiveAisleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.aisleLayoutContainer}>
      <LArchiveAisle />
      <div className={styles.leftAislePageContainer}>{children}</div>
      <Footer />
    </div>
  );
}

export function UserAisleLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.aisleLayoutContainer}>
      <LUserAisle />
      <div className={styles.leftAislePageContainer}>{children}</div>
      <Footer />
    </div>
  );
}
