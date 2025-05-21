"use client";

import * as styles from "./ui.css";

type Dimension = [x: number, y: number, z: number];

interface TextSelectorProps {
  text: string;
  val: string;
  setVal: (e: string) => void;
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
  dim: Dimension;
  setDim: (val: Dimension) => void;
  preset?: Dimension;
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
          value={dim[0]}
          placeholder={"X"}
        />
        <input
          className={styles.multiSelectorTextInput}
          onChange={(e) => setDim([dim[0], Number(e.target.value), dim[2]])}
          type="number"
          value={dim[1]}
          placeholder={"Y"}
        />
        <input
          className={styles.multiSelectorTextInput}
          onChange={(e) => setDim([dim[0], dim[1], Number(e.target.value)])}
          type="number"
          value={dim[2]}
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

export function EditorHeader({ text }: { text: string }) {
  return (
    <div className={styles.editorHeader}>
      <div className={styles.editorTitle}>{text}</div>
    </div>
  );
}

export interface MatrixConstructorProps {
  position?: Dimension;
  rotation?: Dimension;
  scale?: Dimension;
  setPosition: (val: Dimension) => void;
  setRotation: (val: Dimension) => void;
  setScale: (val: Dimension) => void;
  onSubmit?: (e: React.MouseEvent) => void;
  onRemove?: (e: React.MouseEvent) => void;
}

export function MatrixConstructor({
  position,
  rotation,
  scale,
  setPosition,
  setRotation,
  setScale,
  onSubmit,
  onRemove,
}: MatrixConstructorProps) {
  return (
    <>
      {position && (
        <DimSelector text="pos" dim={position} setDim={setPosition} />
      )}
      {rotation && (
        <DimSelector text="rot" dim={rotation} setDim={setRotation} />
      )}
      {scale && <DimSelector text="scale" dim={scale} setDim={setScale} />}
      {/* {onSubmit && <SubmitButton title="SUBMIT" handler={onSubmit} />}
      {onRemove && <SubmitButton title="REMOVE" handler={onRemove} />} */}
    </>
  );
}
