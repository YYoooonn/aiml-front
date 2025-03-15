"use client";

import { useModals } from "@/hook/useModals";
import Archive from "../canvas/Archive";
import * as styles from "./archive.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { read } from "@/app/_actions/project";

export function ArchiveModal({ id }: { id: string }) {
  const router = useRouter();
  const [archInfo, setArchInfo] = useState({ subtitle: "", title: "" });
  const [objts, setObjts] = useState([]);

  const { close } = useModals();
  useEffect(() => {
    read(id).then((r) => {
      // const owner = r.participants?.filter((p: any) => p.isOwner)[0]?.user
      //   ?.username;
      if (!r.error) {
        setArchInfo({
          subtitle: r.subtitle,
          title: r.title,
        });
      }
    });
    read(id, "objects").then((r) => {
      if (!r.error) {
        setObjts(r.objects);
      }
    });
  }, []);

  return (
    <>
      <div className={styles.archiveHeaderContainer}>
        <div
          className={styles.buttonExit}
          onClick={() => {
            router.push("/archive");
            close();
          }}
        />
        <div className={styles.archiveTitle}>
          {archInfo.title ? archInfo.title : "untitled"}
        </div>
        <div className={styles.archiveUser}>
          {archInfo.subtitle ? archInfo.subtitle : "anonymous"}
        </div>
      </div>
      <div className={styles.archiveContentWrapper}>
        <Archive objts={objts} />
      </div>
    </>
  );
}
