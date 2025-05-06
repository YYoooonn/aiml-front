import { ReactNode } from "react";

import * as styles from "./button.css";

interface ButtonProps {
  children?: ReactNode;
  text?: string;
  handler?: (e: React.MouseEvent) => void;
}

interface SelectorButtonProps extends ButtonProps {
  text: string;
  selected: boolean;
}

export function BaseButton({ text, handler }: ButtonProps) {
  return (
    <button className={styles.baseButton} onClick={handler}>
      {text}
    </button>
  );
}

export function SubmitButton({ text, handler }: ButtonProps) {
  return (
    <button className={styles.submitButton} onClick={handler}>
      {text ? text : "SUBMIT"}
    </button>
  );
}

export function SelectorButton({
  text,
  selected,
  handler,
}: SelectorButtonProps) {
  return (
    <button
      type="button"
      value={text}
      className={selected ? styles.selectedButton : styles.baseButton}
      onClick={handler}
    >
      {text}
    </button>
  );
}
