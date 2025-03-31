"use client";

import { ObjectInfo } from "@/@types/api";
import { useObjectEditor } from "@/hook/useObjectEditor";

import { toMatrix4decompose } from "@/utils/calc";
import { Center } from "@react-three/drei";
import { useEffect } from "react";

// const SELECTEDCOLOR = "#FFEA00";

interface MeshProps {
  obj: ObjectInfo;
  selected?: ObjectInfo;
  handleSelected?: () => void;
}

export function WorkspaceObjects({
  objectInfos,
}: {
  objectInfos?: ObjectInfo[];
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
  objectInfos?: ObjectInfo[];
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

  // XXX temporary for error catch
  // projectId 53
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
