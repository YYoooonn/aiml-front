"use client";

import { TGeometry, TMaterial, TObject3DData } from "@/@types/api";
import { toMatrix4decompose } from "@/utils/calc";
import { createBufferGeometry } from "@/utils/three";
import { useMemo } from "react";

const SELECTED_COLOR = "#FFEA00";

interface ThreeObjectProps {
  obj: TObject3DData;
  selectable?: boolean;
  selected?: boolean;
  temp?: boolean;
  handleSelected?: (obj: TObject3DData) => void;
}

export const typeToRenderer: Record<
  TObject3DData["type"],
  (props: ThreeObjectProps) => JSX.Element | null
> = {
  MESH: MeshObject,
  GROUP: GroupObject,
};

export function Object3DRenderer(props: ThreeObjectProps) {
  const Component = typeToRenderer[props.obj.type];
  const { position, scale, rotation } = toMatrix4decompose(props.obj.transform);
  return (
    <group position={position} scale={scale} rotation={rotation}>
      <Component {...props} />
    </group>
  );
}

function GroupObject({
  obj,
  handleSelected,
  selected = false,
  temp = false,
}: ThreeObjectProps) {
  if (obj.type !== "GROUP") return null;
  return (
    <group>
      {obj.children.map((child) => (
        <Object3DRenderer
          key={obj.id}
          obj={child}
          handleSelected={handleSelected}
          selected={selected}
          temp={temp}
        />
      ))}
    </group>
  );
}

function MeshObject({
  obj,
  handleSelected,
  selected = false,
  temp = false,
}: ThreeObjectProps) {
  if (obj.type !== "MESH") return null;
  const geometry = useMemo(() => {
    return createBufferGeometry(obj.geometry.vertices, obj.geometry.faces);
  }, [obj.geometry]);

  return (
    <mesh onClick={() => handleSelected?.(obj)}>
      <primitive object={geometry} attach="geometry" />
      <meshStandardMaterial
        color={temp? SELECTED_COLOR : obj.material.color}
        transparent
        opacity={temp || selected ? 0.5 : 1}
      />
    </mesh>
  );
}

interface MeshProps {
  geometry: TGeometry;
  material: TMaterial;
  selected?: boolean;
}

function Mesh(props: MeshProps) {
  const geometry = useMemo(() => {
    const { vertices, faces } = props.geometry;
    return createBufferGeometry(vertices, faces);
  }, [props.geometry]);
  return (
    <mesh>
      <primitive object={geometry} attach="geometry" />
      <meshStandardMaterial
        color={props.material.color}
        transparent
        opacity={props.selected ? 0.5 : 1}
      />
    </mesh>
  );
}
