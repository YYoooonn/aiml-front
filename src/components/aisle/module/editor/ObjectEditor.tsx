"use client";

import { useProjectInfo } from "@/hook/useProjectInfo";
import {
  EditorBlock,
  DimSelector,
  SubmitButton,
  TextSelector,
  MaterialSelector,
} from "./editor";
import { useObjectEditor } from "@/hook/useObjectEditor";
import { useState } from "react";

import * as styles from "./editor.css";

export default function ObjectEditor({ pId }: { pId: string }) {
  return (
    <>
      <div className={styles.aisleHeader}>
        <div className={styles.aisleTitle}>EDITOR</div>
      </div>
      <p style={{ marginBottom: "8px" }} />
      <MatrixEditor pId={pId} />
    </>
  );
}

function MatrixEditor({ pId }: { pId: string }) {
  const {
    selected,
    position,
    rotation,
    scale,
    material,
    setScale,
    setPosition,
    setRotation,
    updateMatrix,
    removeSelected,
    setMaterial,
  } = useObjectEditor();
  const { updateObject, filterObject } = useProjectInfo();

  // if(!selected) {
  //   return <></>
  // }

  // useEffect(() =>  {
  //   setPos(position?.map((val) => val.toString()))
  //   setRot(rotation?.map((val) => val.toString()))
  //   setSize(scale?.map((val) => val.toString()))
  // }, [selected])

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    await updateMatrix(pId).then((r) =>
      r ? updateObject(r) : alert("error while updating object"),
    );
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    if (selected) {
      removeSelected(pId);
    }
  };

  return (
    <EditorBlock text={"EDIT"} disabled={Boolean(!selected)}>
      {/* <div className={styles.aisleHeader}>
        <div className={styles.aisleTitle}>{selected.geometry}</div>
      </div> */}
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
      <SubmitButton title={"REMOVE"} handler={handleRemove} />
    </EditorBlock>
  );
}
