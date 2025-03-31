"use client";

import { useModals } from "@/hook/useModals";
import Archive from "../canvas/Archive";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { read } from "@/app/_actions/project";
import * as styles from "./archive.css";

export function ArchiveModal({ id }: { id: string }) {
  const pId = Number(id);
  const router = useRouter();
  const [archInfo, setArchInfo] = useState({ subtitle: "", title: "" });
  const [objts, setObjts] = useState<TObjectData[]>([]);

  const { close } = useModals();
  useEffect(() => {
    read(pId).then((r) => {
      // const owner = r.participants?.filter((p: any) => p.isOwner)[0]?.user
      //   ?.username;
      if (r.success) {
        setArchInfo({
          subtitle: r.data.subtitle,
          title: r.data.title,
        });
      }
    });
    read(pId, "objects").then((r) => {
      if (r.success) {
        setObjts(r.data.objects);
      }
    });
  }, [id]);

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
