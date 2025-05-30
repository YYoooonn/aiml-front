"use client";

import { useState } from "react";

import * as styles from "./editor.css";

export function EditorBlock({
  text,
  disabled = false,
  children,
}: { text: string; disabled?: boolean } & React.PropsWithChildren) {
  const [selected, setSelected] = useState(disabled ?? false);

  return (
    <ToggleBlock
      title={text}
      selected={selected}
      disabled={disabled}
      onToggle={() => setSelected(!selected)}
    >
      {children}
    </ToggleBlock>
  );
}
type CreatorBlockProps<T> = {
  selector: T;
  selected: boolean;
  setSelect: (val: T | null) => void;
  children?: React.ReactNode;
};

export function CreatorBlock<T>({
  selector,
  selected,
  setSelect,
  children,
}: CreatorBlockProps<T>) {
  return (
    <ToggleBlock
      title={selector as string}
      selected={selected}
      onToggle={() => setSelect(selected ? null : selector)}
    >
      {children}
    </ToggleBlock>
  );
}

type ToggleBlockProps = {
  title: string;
  selected?: boolean;
  disabled?: boolean;
  onToggle?: () => void;
  children?: React.ReactNode;
};

function ToggleBlock({
  title,
  selected = false,
  disabled = false,
  onToggle,
  children,
}: ToggleBlockProps) {
  const containerClassName = disabled
    ? styles.editorButtonContainerDisabled
    : selected
      ? styles.editorButtonContainerSelected
      : styles.editorButtonContainer;

  return (
    <div className={containerClassName}>
      <div
        className={styles.editorBlockHeader}
        onClick={() => !disabled && onToggle?.()}
      >
        <div
          className={
            disabled ? styles.editorBlockTitleDisabled : styles.editorBlockTitle
          }
        >
          {title}
        </div>
      </div>
      {!disabled && selected && (
        <div className={styles.editorBlockContent}>{children}</div>
      )}
    </div>
  );
}
