import * as styles from "./archive.css";
import { ArchiveCard } from "@/components/card/CardModule";

export function Archives({ archives }: { archives: ProjectData[] }) {
  return (
    <div className={styles.archiveContainer}>
      {archives ? (
        archives.map((val: ProjectData, i: number) => (
          <ArchiveCard key={i} props={val} />
        ))
      ) : (
        <></>
      )}
    </div>
  );
}
