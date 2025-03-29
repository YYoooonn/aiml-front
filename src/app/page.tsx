"use client";

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
        <Link href={"/login"} className={styles.button}>
          Click to login
        </Link>
      </section>
      <section className={styles.landingSectionContainer}>
        pg3:
        <Link href={"/register"} className={styles.button}>
          Click to register
        </Link>
      </section>
      <section className={styles.landingSectionContainer}>
        pg4:
        <Link href={"/archive"} className={styles.button}>
          Go to Archive
        </Link>
      </section>
    </SnapPageScroll>
  );
}
