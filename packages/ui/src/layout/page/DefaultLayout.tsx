import * as styles from "./layout.css";

interface DefaultLayoutProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export function DefaultLayout({
  header,
  footer,
  style,
  children,
}: Readonly<DefaultLayoutProps>) {
  return (
    <div className={styles.layoutWrapper}>
      {header && <div className={styles.header}>{header}</div>}
      <main className={styles.mainContentContainer} style={{ ...style }}>
        {children}
      </main>
      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  );
}
