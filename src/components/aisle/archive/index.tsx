import { BaseNavLayout } from "../base";
import * as styles from "./archive.css";

export default function Archive() {
  return (
    <BaseNavLayout>
      <div className={styles.leftAisleSearchBlock}>
        <div className={styles.archiveAisleIcon} />
        <div className={styles.archiveAisleText}>Search</div>
      </div>
    </BaseNavLayout>
  );
}
