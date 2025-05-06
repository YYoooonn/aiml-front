"use client";

import Link from "next/link";
import * as styles from "./page.css";
import { SnapPageScroll } from "@/components/snapscroll/SnapPageScroll";

export default function Home() {
  return (
    <SnapPageScroll>
      <section className={styles.landingSectionContainer}>
        <h1>&quot;Landing&quot;</h1>
        <h3>work in progress</h3>
      </section>
      <section className={styles.landingSectionContainer}>
        <Link href={"/login"} className={styles.button}>
          <h1>&quot;Click to login&quot;</h1>
        </Link>
      </section>
      <section className={styles.landingSectionContainer}>
        <Link href={"/register"} className={styles.button}>
          <h1>&quot;Click to register&quot;</h1>
        </Link>
      </section>
      <section className={styles.landingSectionContainer}>
        <Link href={"/archive"} className={styles.button}>
          <h1>&quot;Go to Archive&quot;</h1>
        </Link>
      </section>
    </SnapPageScroll>
  );
}
