import * as styles from "./header.css";

export function PageHeader({title}: {title: string}) {
    return (
        <div className={styles.pageHeader}>
            {title}
        </div>
    )
}