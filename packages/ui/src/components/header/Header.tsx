import * as styles from "./header.css";
import Link from "next/link";

interface HeaderProps {
  children?: React.ReactNode;
}

export function Header({ children }: HeaderProps) {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerWrapper}>
        <Logo />
        <Links>{children}</Links>
      </div>
    </div>
  );
}

function Logo() {
  return (
    <Link className={styles.logo} href={"/"}>
      "LOGO"
    </Link>
  );
}

function Links({ children }: { children?: React.ReactNode }) {
  return <div className={styles.headerLinkWrapper}>{children}</div>;
}
