import { TGeometry, TMaterial, TObject3DData, TTransform } from "@/@types/api";
import { useObjectCreator } from "@/hook/useObjectCreator";
import { useObjectEditor } from "@/hook/useObjectEditor";
import { toMatrix4decompose } from "@/utils/calc";
import { createBufferGeometry } from "@/utils/three";
import { useMemo } from "react";

const SELECTEDCOLOR = "#FFEA00";
const SELECTEDCOLORNEW = "#00FFEA";

export function EditorObjects() {
  return (
    <group>
      <CreatedObject />
      <SelectedObject />
    </group>
  );
}

function CreatedObject() {
  const { type, transform, geometry, material, children } = useObjectCreator();
  if (!type || !transform) {
    return null;
  }
  if (type === "MESH") {
    if (!geometry || !material) {
      return null;
    }
    return (
      <MeshObject
        transform={transform}
        geometry={geometry}
        color={SELECTEDCOLORNEW}
      />
    );
  } else if (type === "GROUP") {
    return (
      <GroupObject
        transform={transform}
        children={children}
        color={SELECTEDCOLORNEW}
      />
    );
  }
  return null;
}

function SelectedObject() {
  const { selected, transform } = useObjectEditor();
  if (!selected || !transform) {
    return null;
  }

  // FIXME
  if (selected.type === "MESH") {
    return (
      <MeshObject
        transform={transform}
        geometry={selected.geometry}
        color={SELECTEDCOLOR}
      />
    );
  } else if (selected.type === "GROUP") {
    return (
      <GroupObject
        transform={transform}
        children={selected.children}
        color={SELECTEDCOLORNEW}
      />
    );
  }
  return null;
}

// FIXME 아래 최악 refactoring 필요

interface MeshObjectProps {
  transform: TTransform;
  geometry: TGeometry;
  color: string;
}

function MeshObject({ transform, geometry, color }: MeshObjectProps) {
  const geo = useMemo(() => {
    return createBufferGeometry(geometry.vertices, geometry.faces);
  }, [geometry]);

  return (
    <mesh
      scale={transform.scale}
      position={transform.position}
      rotation={transform.rotation}
    >
      <primitive object={geo} attach="geometry" />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

interface GroupObjectProps {
  transform: TTransform;
  color: string;
  children?: TObject3DData[];
}

function GroupObject({ transform, color, children = [] }: GroupObjectProps) {
  return (
    <group
      scale={transform.scale}
      position={transform.position}
      rotation={transform.rotation}
    >
      {children.map((child) => {
        const transform = toMatrix4decompose(child.transform);
        if (child.type === "MESH") {
          return (
            <MeshObject
              key={child.id}
              transform={transform}
              geometry={child.geometry}
              color={child.material.color}
            />
          );
        } else if (child.type === "GROUP") {
          return (
            <GroupObject
              key={child.id}
              transform={transform}
              color={color}
              children={child.children}
            />
          );
        }
        return null;
      })}
    </group>
  );
}
