"use client";

import { TObject3D, TObject3DData } from "@/@types/api";
import { toMatrix4decompose } from "@/utils/calc";
import { createBufferGeometry } from "@/utils/three";
import { useMemo } from "react";

interface ThreeObjectProps {
  obj: TObject3DData;
  visible?: boolean;
  selected?: TObject3DData;
  handleSelected?: (obj: TObject3DData) => void;
}

const typeToRenderer: Record<
  TObject3DData["type"],
  (props: ThreeObjectProps) => JSX.Element | null
> = {
  MESH: MeshObject,
  GROUP: GroupObject,
};

export function Object3DRenderer(props: ThreeObjectProps) {
  const Component = typeToRenderer[props.obj.type];
  return Component ? <Component {...props} /> : null;
}

function GroupObject({
  obj,
  selected,
  handleSelected,
  visible = true,
}: ThreeObjectProps) {
  const { position, scale, rotation } = toMatrix4decompose(obj.transform);
  if (obj.type !== "GROUP") return null;
  return (
    <group
      scale={scale}
      position={position}
      rotation={rotation}
      onClick={handleSelected ? () => handleSelected(obj) : undefined}
      visible={visible}
    >
      {obj.children.map((child) => (
        <Object3DRenderer
          key={obj.id}
          obj={child}
          handleSelected={handleSelected}
          selected={selected}
        />
      ))}
    </group>
  );
}

function MeshObject({
  obj,
  selected,
  handleSelected,
  visible = true,
}: ThreeObjectProps) {
  const { position, scale, rotation } = toMatrix4decompose(obj.transform);
  if (obj.type !== "MESH") return null;
  const geometry = useMemo(() => {
    return createBufferGeometry(obj.geometry.vertices, obj.geometry.faces);
  }, [obj.geometry]);

  // FIXME temporary for error catch
  const newRotation = rotation.map((d) => (isNaN(d) ? 0 : d)) as Position;

  return (
    <mesh
      scale={scale}
      position={position}
      rotation={newRotation}
      onClick={handleSelected ? () => handleSelected(obj) : undefined}
      visible={visible}
    >
      <primitive object={geometry} attach="geometry" />
      <meshStandardMaterial color={obj.material.color} />
    </mesh>
  );
}
