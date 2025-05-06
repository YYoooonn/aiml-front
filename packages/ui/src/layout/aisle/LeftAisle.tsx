import * as styles from "./aisle.css";

interface LeftAisleProps {
  children?: React.ReactNode;
}

export function LeftAisle({ children }: LeftAisleProps) {
  return <div className={styles.leftAisleContainer}>{children}</div>;
}
