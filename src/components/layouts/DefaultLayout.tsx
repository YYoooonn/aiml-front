import { Footer } from "../components";
import * as styles from "./layout.css";

export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={styles.defaultLayoutContainer}>{children}<Footer /></div>;
}
