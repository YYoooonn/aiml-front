import * as styles from "./footer.css";

export function Footer({ hide }: { hide?: boolean }) {
  return (
    <div
      className={`${styles.footerContainer} ${hide ? styles.hidden : styles.visible}`}
    >
      Footer
    </div>
  );
}
