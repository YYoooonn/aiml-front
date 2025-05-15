import { ReactNode } from "react";

import * as styles from "./button.css";

interface ButtonProps {
  children?: ReactNode;
  text?: string;
  handler?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}

interface SelectorButtonProps extends ButtonProps {
  text: string;
  selected: boolean;
  widthPercentage?: string;
}

export function BaseButton({ text, handler, style }: ButtonProps) {
  return (
    <button
      className={styles.baseButton}
      onClick={handler}
      type="button"
      style={{ ...style }}
    >
      {text}
    </button>
  );
}

export function SubmitButton({ text, handler, style }: ButtonProps) {
  return (
    <button
      className={styles.submitButton}
      onClick={handler}
      type="submit"
      style={{ height: "32px", ...style }}
    >
      {text ? text : "SUBMIT"}
    </button>
  );
}

export function SelectorButton({
  text,
  selected,
  handler,
  widthPercentage,
}: SelectorButtonProps) {
  return (
    <button
      type="button"
      value={text}
      style={{ width: widthPercentage }}
      className={selected ? styles.selectedButton : styles.baseButton}
      onClick={handler}
    >
      {text}
    </button>
  );
}
