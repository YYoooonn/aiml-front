import * as styles from "./header.css";
import { Profile } from "./_headerContents";
import Link from "next/link";
import { Header as HeaderLayout } from "@repo/ui/components";

export default function Header() {
  return (
    <HeaderLayout>
      <Link href={"/archive"} className={styles.headerLink}>
        Archive
      </Link>
      <Link href={"/about"} className={styles.headerLink}>
        About
      </Link>
      <Link href={"/documentation"} className={styles.headerLink}>
        Documentation
      </Link>
      <Link href={"/contact"} className={styles.headerLink}>
        Contact
      </Link>
      <Profile />
    </HeaderLayout>
  );
}
