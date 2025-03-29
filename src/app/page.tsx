import Link from "next/link";
import * as styles from "./page.css";
import { SnapPageScroll } from "@/components/snapscroll/SnapPageScroll";

export default function Home() {
  return (
    <SnapPageScroll>
      <section className={styles.landingSectionContainer}>
        <p>pg1: Landing</p>
      </section>
      <section className={styles.landingSectionContainer}>
        pg2:
        <div className={styles.button}>
          <Link href={"/login"}>Click to login</Link>
        </div>
      </section>
      <section className={styles.landingSectionContainer}>
        pg3:
        <div className={styles.button}>
          <Link href={"/register"}>Click to register</Link>
        </div>
      </section>
      <section className={styles.landingSectionContainer}>
        pg4:
        <div className={styles.button}>
          <Link href={"/archive"}>Go to Archive</Link>
        </div>
      </section>
    </SnapPageScroll>
  );
}
