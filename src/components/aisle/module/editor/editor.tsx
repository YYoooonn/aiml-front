"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import ViewportEditor from "./ViewportEditor";
import ObjectConstructor from "./ObjectConstructor";
import ObjectEditor from "./ObjectEditor";

import * as styles from "./editor.css";

export default function Editor() {
  const [_, id] = usePathname().split("/").slice(1, 3);
  const pId = Number(id);

  return (
    <div className={styles.editorInnerWrapper}>
      <ViewportEditor />
      <p style={{ marginBottom: "16px" }} />
      <ObjectConstructor pId={pId} />
      <p style={{ marginBottom: "16px" }} />
      <ObjectEditor pId={pId} />
    </div>
  );
}

export function EditorBlock({
  text,
  disabled,
  children,
}: { text: string; disabled?: boolean } & React.PropsWithChildren) {
  // XXX only on objecteditor
  const [clicked, setClicked] = useState(disabled !== undefined ? true : false);

  return (
    <div
      className={
        disabled
          ? styles.editorButtonContainerDisabled
          : clicked
            ? styles.editorButtonContainerSelected
            : styles.editorButtonContainer
      }
    >
      <div onClick={() => setClicked(!disabled && !clicked)}>
        <div className={styles.editorBlockTitle}>{text}</div>
      </div>
      {!disabled && clicked ? (
        <>
          <p style={{ marginTop: "4px" }} />
          {children}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

interface TextSelectorProps {
  text: string;
  val: string;
  setVal: React.Dispatch<React.SetStateAction<string>>;
  preset?: string;
}

export function TextSelector({ text, val, setVal, preset }: TextSelectorProps) {
  return (
    <div className={styles.selectorBlock}>
      <div className={styles.selectorTitle}>{text}</div>
      <input
        className={styles.selectorTextInput}
        onChange={(e) => setVal(e.target.value)}
        type="text"
        value={val}
        placeholder={preset ? preset : ""}
      />
    </div>
  );
}

interface MaterialSelectorProps {
  text: string;
  val: string;
  setVal: (val: string) => void;
  preset?: string;
}

export function MaterialSelector({
  text,
  val,
  setVal,
  preset,
}: MaterialSelectorProps) {
  return (
    <div className={styles.selectorBlock}>
      <div className={styles.selectorTitle}>{text}</div>
      <input
        className={styles.selectorTextInput}
        onChange={(e) => setVal(e.target.value)}
        type="text"
        value={val}
        placeholder={preset ? preset : ""}
      />
    </div>
  );
}

interface NumSelectorProps {
  text: string;
  val: number;
  setVal: (val: number) => void;
  preset?: string;
}

export function NumSelector({ text, val, setVal, preset }: NumSelectorProps) {
  return (
    <div className={styles.selectorBlock}>
      <div className={styles.selectorTitle}>{text}</div>
      <input
        className={styles.selectorTextInput}
        onChange={(e) => setVal(Number(e.target.value))}
        type="number"
        value={val}
        placeholder={preset ? preset : "number"}
      />
    </div>
  );
}

interface MultiSelectorProps {
  text: string;
  vals: string[];
  setVal: React.Dispatch<React.SetStateAction<string[]>>;
  presets?: string[];
}

export function MultiSelector({
  text,
  vals,
  setVal,
  presets,
}: MultiSelectorProps) {
  return (
    <div className={styles.selectorBlock}>
      <div className={styles.selectorTitle}>{text}</div>
      <div className={styles.multiSelectorBlock}>
        {vals.map((v, i) => (
          <input
            key={i}
            className={styles.multiSelectorTextInput}
            onChange={(e) => {
              vals[i] = e.target.value;
              setVal([...vals]);
            }}
            type="text"
            value={v}
            placeholder={presets ? presets[i] : ""}
          />
        ))}
      </div>
    </div>
  );
}

interface DimSelectorProps {
  text: string;
  dim: [x: number, y: number, z: number];
  setDim: (val: [x: number, y: number, z: number]) => void;
  preset?: [x: number, y: number, z: number];
}

export function DimSelector({ text, dim, setDim, preset }: DimSelectorProps) {
  return (
    <div className={styles.selectorBlock}>
      <div className={styles.selectorTitle}>{text}</div>
      <div className={styles.multiSelectorBlock}>
        <input
          className={styles.multiSelectorTextInput}
          onChange={(e) => setDim([Number(e.target.value), dim[1], dim[2]])}
          type="number"
          value={dim[0].toString()}
          placeholder={"X"}
        />
        <input
          className={styles.multiSelectorTextInput}
          onChange={(e) => setDim([dim[0], Number(e.target.value), dim[2]])}
          type="number"
          value={dim[1].toString()}
          placeholder={"Y"}
        />
        <input
          className={styles.multiSelectorTextInput}
          onChange={(e) => setDim([dim[0], dim[1], Number(e.target.value)])}
          type="number"
          value={dim[2].toString()}
          placeholder={"Z"}
        />
      </div>
    </div>
  );
}

export function SubmitButton({
  title,
  handler,
}: {
  title?: string;
  handler: (e: React.MouseEvent) => void;
}) {
  return (
    <div className={styles.buttonSubmit} onClick={handler}>
      {title ? title : "UPDATE"}
    </div>
  );
}
