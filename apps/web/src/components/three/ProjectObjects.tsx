"use client";

import { TObject3DData } from "@/@types/api";
import { useObjectEditor } from "@/hook/useObjectEditor";

import { Center } from "@react-three/drei";
import { useEffect } from "react";
import { Object3DRenderer } from "./Object3DRenderer";

// const SELECTEDCOLOR = "#FFEA00";

/* 

FIXME

1. 겹쳐진 곳 선택했을 때 동시에 선택되는 현상
2. 더블클릭 했을 때 캔버스 멈추는 현상

*/

export function WorkspaceObjects({
  objectInfos,
}: {
  objectInfos?: TObject3DData[];
}) {
  const pObjects = objectInfos ? objectInfos : [];
  const { setSelected, resetSelected, selected } = useObjectEditor();

  // unmount시 selected 제거
  useEffect(() => {
    return () => resetSelected();
  }, []);

  return (
    <group>
      {pObjects.map((obj) => {
        return (
          <Object3DRenderer
            key={obj.id}
            obj={obj}
            selected={selected}
            visible={selected?.id !== obj.id}
            handleSelected={(obj: TObject3DData) => setSelected(obj)}
          />
        );
      })}
    </group>
  );
}

export function ArchiveObjects({
  objectInfos,
}: {
  objectInfos?: TObject3DData[];
}) {
  const pObjects = objectInfos ? objectInfos : [];
  return (
    <Center>
      {pObjects.map((obj) => (
        <Object3DRenderer key={obj.id} obj={obj} />
      ))}
    </Center>
  );
}
