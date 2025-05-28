"use client";

import { TObject3DData, TTransform } from "@/@types/api";

import { Center } from "@react-three/drei";
import { Object3DRenderer, typeToRenderer } from "./Object3DRenderer";
import { useObject3D } from "@/hook/useObject3D";
import { useScene } from "@/hook/useScene";
import { toMatrix4decompose } from "@/utils/calc";
import { DEFAULT_TRANSFORM } from "@/assets/geometry";
import { DEFAULT_MATRIX } from "@/utils/constants";

// const SELECTEDCOLOR = "#FFEA00";

/* FIXME
1. 겹쳐진 곳 선택했을 때 동시에 선택되는 현상
2. 더블클릭 했을 때 캔버스 멈추는 현상
*/

export function WorkspaceObjects() {
  const { sceneMap, sceneId, setSceneId } = useScene();
  return (
    <>
      {Object.entries(sceneMap).map(([id, scene]) => (
        <group
          key={id}
          onClick={() => setSceneId(id)}
        >
          <SelectableRenderer parentId={null} children={scene.children} />
        </group>
      ))}
    </>
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

interface SelectableRendererProps {
  children: TObject3DData[];
  parentId: string | null;
  transform?: TTransform;
  onClick?: () => void;
}

function SelectableRenderer({
  children,
  parentId,
  transform,
}: SelectableRendererProps) {
  const { selected, object3DInfo, selectObject3D, selectedTransform } =
    useObject3D();

  const { position, rotation, scale } = transform || DEFAULT_TRANSFORM;
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {children.map((obj) => {
        if (obj.type === "GROUP") {
          const childTransform = toMatrix4decompose(obj.transform);
          return (
            <SelectableRenderer
              key={obj.id}
              parentId={obj.id}
              transform={childTransform}
              children={obj.children}
            />
          );
        }
        return (
          <Object3DRenderer
            key={obj.id}
            obj={obj}
            selected={Boolean(selected[obj.id])}
            handleSelected={selectObject3D}
          />
        );
      })}
      {object3DInfo.parentId === parentId && (
        <group
          position={selectedTransform.position}
          rotation={selectedTransform.rotation}
          scale={selectedTransform.scale}
        >
          {Object.values(selected).map((obj) => {
            const matrix =
              object3DInfo.type === "GROUP" ? obj.transform : DEFAULT_MATRIX;
            return (
              <Object3DRenderer
                key={obj.id}
                obj={{ ...obj, transform: matrix }}
                selected={true}
                temp={true}
              />
            );
          })}
        </group>
      )}
    </group>
  );
}
