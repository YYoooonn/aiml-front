import { useObjectCreator } from "@/hook/useObjectCreator";
import { useObjectEditor } from "@/hook/useObjectEditor";
import { toMatrix4 } from "@/utils/calc";

const SELECTEDCOLOR = "#FFEA00";
const SELECTEDCOLORNEW = "#00FFEA";

export default function EditorObjects() {
  return (
    <group>
      <NewObject />
      <SelectedObject />
    </group>
  );
}

function NewObject() {
  const { type, scale, position, rotation } = useObjectCreator();
  if (!type) {
    return null;
  }
  // FIXME
  return (
    <group scale={scale} position={position} rotation={rotation}>
      <mesh>
        {type === "BoxGeometry" ? (
          <boxGeometry />
        ) : type === "SphereGeometry" ? (
          <sphereGeometry />
        ) : (
          <coneGeometry />
        )}
        <meshStandardMaterial color={SELECTEDCOLORNEW} />
      </mesh>
    </group>
  );
}

function SelectedObject() {
  const { selected, scale, rotation, position } = useObjectEditor();
  if (!selected) {
    return null;
  }
  const matrix = toMatrix4(selected.matrix);
  // FIXME
  return (
    <group scale={scale} position={position} rotation={rotation}>
      <group>
        <mesh matrix={matrix}>
          {selected.geometry === "BoxGeometry" ? (
            <boxGeometry />
          ) : selected.geometry === "SphereGeometry" ? (
            <sphereGeometry />
          ) : (
            <coneGeometry />
          )}
          <meshStandardMaterial color={SELECTEDCOLOR} />
        </mesh>
      </group>
    </group>
  );
}
