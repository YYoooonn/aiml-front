import React from "react";
import * as styles from "./module.css";

export function LeftAisleContainer({ children }: React.PropsWithChildren) {
  return <div className={styles.leftAisleContainer}>{children}</div>;
}

export function RightAisleContainer({ children }: AisleModuleProps) {
  return <div className={styles.rightAisleContainer}>{children}</div>;
}

interface AisleModuleProps {
  style?: React.CSSProperties;
  header?: React.ReactNode;
  children?: React.ReactNode;
  show?: boolean;
}

export function AisleModule({ style, header, children, show=true }: AisleModuleProps) {
  return (
    <div className={styles.moduleWrapper} style={style}>
      {header}
      {show && children && <div className={styles.moduleInner}>{children}</div>}
    </div>
  );
}
