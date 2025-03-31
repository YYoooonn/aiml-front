"use client";

import {
  SetStateAction,
  useEffect,
  useState,
  Dispatch,
  PropsWithChildren,
} from "react";
import {
  EditorBlock,
  SubmitButton,
  DimSelector,
  MaterialSelector,
} from "./editor";
import { useObjectCreator } from "@/hook/useObjectCreator";
import { useProjectInfo } from "@/hook/useProjectInfo";

import * as styles from "./editor.css";

export default function ObjectConstructor({ pId }: { pId: string }) {
  return (
    <>
      <div className={styles.aisleHeader}>
        <div className={styles.aisleTitle}>CONSTRUCT</div>
      </div>
      <p style={{ marginBottom: "8px" }} />
      <ObjectBuilder pId={pId} />
    </>
  );
}

// const TYPE = "BoxGeometry";
// const MATRIX = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

function ObjectBuilder({ pId }: { pId: string }) {
  const [selected, setSelected] = useState("");

  return (
    <EditorBlock text={"CREATE"}>
      <CreatorBlock
        title={"Box"}
        selected={selected}
        selector="BoxGeometry"
        setSelect={setSelected}
      >
        <MatrixBuilder pId={pId} type="BoxGeometry" setSelect={setSelected} />
      </CreatorBlock>
      <CreatorBlock
        title={"Sphere"}
        selected={selected}
        selector="SphereGeometry"
        setSelect={setSelected}
      >
        <MatrixBuilder
          pId={pId}
          type="SphereGeometry"
          setSelect={setSelected}
        />
      </CreatorBlock>
      <CreatorBlock
        title={"Cone"}
        selected={selected}
        selector="ConeGeometry"
        setSelect={setSelected}
      >
        <MatrixBuilder pId={pId} type="ConeGeometry" setSelect={setSelected} />
      </CreatorBlock>
      {/* <DimSelector text="position" dim={position} setDim={setPosition} />
      {rotation? <DimSelector text="rotation" dim={rotation} setDim={setRotation} /> : null}
      {scale? <DimSelector text="scale" dim={scale} setDim={setScale} /> : null}
      <SubmitButton handler={handleSubmit}/>
      <SubmitButton title={"REMOVE"} handler={handleRemove}/> */}
    </EditorBlock>
  );
}

function MatrixBuilder({
  pId,
  type,
  setSelect,
}: {
  pId: string;
  type: string;
  setSelect: Dispatch<SetStateAction<string>>;
}) {
  const {
    setNew,
    reset,
    update,
    position,
    rotation,
    scale,
    material,
    setPosition,
    setRotation,
    setScale,
    setMaterial,
  } = useObjectCreator();
  const addToObjects = useProjectInfo((s) => s.addtoObjects);

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    update(pId).then((r) => {
      if (r) {
        reset();
        addToObjects(r);
        setSelect("");
      }
    });
  };

  useEffect(() => {
    reset();
    setNew(type);
    return () => reset();
  }, []);

  return (
    <>
      {position ? (
        <DimSelector text="position" dim={position} setDim={setPosition} />
      ) : null}
      {rotation ? (
        <DimSelector text="rotation" dim={rotation} setDim={setRotation} />
      ) : null}
      {scale ? (
        <DimSelector text="scale" dim={scale} setDim={setScale} />
      ) : null}
      {material ? (
        <MaterialSelector
          text="color"
          val={material}
          setVal={setMaterial}
          preset={"#HEXCOLOR"}
        />
      ) : null}
      <SubmitButton handler={handleSubmit} />
    </>
  );
}

type BuilderBlockProps = {
  title?: string;
  selected: string;
  selector: string;
  setSelect: Dispatch<SetStateAction<string>>;
} & PropsWithChildren;

function CreatorBlock({
  selector,
  selected,
  setSelect,
  children,
}: BuilderBlockProps) {
  return (
    <div
      className={
        selected === selector
          ? styles.editorButtonContainerSelected
          : styles.editorButtonContainer
      }
    >
      <div
        onClick={() =>
          selected === selector ? setSelect("") : setSelect(selector)
        }
      >
        <div className={styles.editorBlockTitle}>{selector}</div>
      </div>
      {selected === selector ? (
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
