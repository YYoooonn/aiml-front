"use client";

import { useObjectEditor } from "@/hook/useObjectEditor";

import { toMatrix4decompose } from "@/utils/calc";
import { Center } from "@react-three/drei";
import { useEffect } from "react";

// const SELECTEDCOLOR = "#FFEA00";

interface MeshProps {
  obj: TObjectData;
  selected?: TObjectData;
  handleSelected?: () => void;
}

/* 

!!! FIXME

1. 겹쳐진 곳 선택했을 때 동시에 선택되는 현상
2. 비어있는 캔버스 클릭했을 때 멈추는 현상

*/

export function WorkspaceObjects({
  objectInfos,
}: {
  objectInfos?: TObjectData[];
}) {
  const pObjects = objectInfos ? objectInfos : [];
  const { setSelected, resetSelected, selected } = useObjectEditor();

  // unmount시 selected 제거
  useEffect(() => {
    return () => resetSelected();
  }, []);

  return (
    <group>
      {pObjects.map((obj, i) => {
        return (
          <SelectableMesh
            key={i}
            obj={obj}
            selected={selected}
            handleSelected={() => setSelected(obj)}
          />
        );
      })}
    </group>
  );
}

export function ArchiveObjects({
  objectInfos,
}: {
  objectInfos?: TObjectData[];
}) {
  const pObjects = objectInfos ? objectInfos : [];
  return (
    <Center>
      {pObjects.map((obj, i) => {
        return <MeshObject key={i} obj={obj} />;
      })}
    </Center>
  );
}

function SelectableMesh({ obj, selected, handleSelected }: MeshProps) {
  const { position, scale, rotation } = toMatrix4decompose(obj.matrix);

  // FIXME temporary for error catch
  const newRotation = rotation.map((d) => (isNaN(d) ? 0 : d)) as Position;

  return (
    <group scale={scale} position={position} rotation={newRotation}>
      <mesh
        onClick={handleSelected}
        visible={selected && selected.objectId !== obj.objectId}
      >
        {obj.geometry === "BoxGeometry" ? (
          <boxGeometry />
        ) : obj.geometry === "SphereGeometry" ? (
          <sphereGeometry />
        ) : (
          <coneGeometry />
        )}
        <meshStandardMaterial color={obj.material} />
      </mesh>
    </group>
  );
}

function MeshObject({ obj }: MeshProps) {
  const { position, scale, rotation } = toMatrix4decompose(obj.matrix);

  // XXX temporary for error catch
  // projectId 53
  const newRotation = rotation.map((d) => (isNaN(d) ? 0 : d)) as Position;

  return (
    <group scale={scale} position={position} rotation={newRotation}>
      <mesh>
        {obj.geometry === "BoxGeometry" ? (
          <boxGeometry />
        ) : obj.geometry === "SphereGeometry" ? (
          <sphereGeometry />
        ) : (
          <coneGeometry />
        )}
        <meshStandardMaterial color={obj.material} />
      </mesh>
    </group>
  );
}
