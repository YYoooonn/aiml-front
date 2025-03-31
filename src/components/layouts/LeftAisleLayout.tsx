import { Footer, LeftAisle } from "@/components/components";
import * as styles from "./layout.css";

export default function LeftAisleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.aisleLayoutContainer}>
      <LeftAisle />
      <div className={styles.leftAislePageContainer}>{children}</div>
      <Footer />
    </div>
  );
}
