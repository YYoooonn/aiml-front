"use client";

import { TMaterial, TTransform } from "@/@types/api";
import { useObject3D } from "@/hook/useObject3D";
import { toMatrix, toMatrix4, toMatrix4decompose } from "@/utils/calc";
import { EditorHeader, ObjectEditor } from "@repo/ui/components/editor";
import { useEffect, useMemo, useState } from "react";

const DEFAULT_TRANSFORM: TTransform = {
  position: [0, 0, 0],
  rotation: [0, 0, 0],
  scale: [1, 1, 1],
};

export default function Object3DEditor({
  pId,
  socketUpdate,
}: {
  pId?: string;
  socketUpdate?: (data: any) => void;
}) {
  const {
    selected,
    object3DInfo,
    setObject3DInfo,
    saveSelected,
    removeSelected,
    sceneId,
  } = useObject3D();

  const [visible, setVisible] = useState(object3DInfo.visible ?? true);
  const [name, setName] = useState(object3DInfo.name ?? "");
  const [transform, setTransform] = useState(
    toMatrix4decompose(object3DInfo.transform),
  );
  const [material, setMaterial] = useState<TMaterial | null>(null);

  useEffect(() => {
    setName(object3DInfo.name ?? "");
    setVisible(object3DInfo.visible ?? true);
    setTransform(toMatrix4decompose(object3DInfo.transform));
    setMaterial(object3DInfo.material);
  }, [selected]);

  useEffect(() => {
    setObject3DInfo({ transform: toMatrix(transform), material: material });
  }, [material, transform]);

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();

    const response = await saveSelected({ name: name, visible: visible });
    if (!response.success) {
      alert(`Error: ${response.error}`);
    } else {
      setName("");
      setVisible(true);
      setTransform(DEFAULT_TRANSFORM);
      setMaterial(null);
      if (sceneId && response.data && socketUpdate) {
        socketUpdate({
          objectId: response.data.id,
          sceneId: sceneId,
          type: "update",
        });
      }
    }
  };

  const handleRemove = async (e: React.MouseEvent) => {
    e.preventDefault();
    const selectedIds = Object.keys(selected);

    const response = await removeSelected();
    if (!response.success) {
      alert(`Error: ${response.error}`);
    } else {
      setName("");
      setVisible(true);
      setTransform(DEFAULT_TRANSFORM);
      setMaterial(null);
      if (sceneId && socketUpdate) {
        selectedIds.forEach((id) => {
          socketUpdate({
            objectId: id,
            sceneId: sceneId,
            type: "delete",
          });
        });
      }
    }
  };

  return (
    <>
      <EditorHeader text="EDITOR" />
      <ObjectEditor
        disabled={Object.keys(selected).length === 0}
        name={name}
        setName={setName}
        position={transform?.position}
        setPosition={(val) =>
          setTransform((prev) => ({ ...prev, position: val }))
        }
        rotation={transform?.rotation}
        setRotation={(val) =>
          setTransform((prev) => ({ ...prev, rotation: val }))
        }
        scale={transform?.scale}
        setScale={(val) => setTransform((prev) => ({ ...prev, scale: val }))}
        color={material?.color}
        setColor={material ? (val) => setMaterial({ ...material, color: val }) : undefined}
        onSubmit={handleSubmit}
        onRemove={handleRemove}
      />
    </>
  );
}
