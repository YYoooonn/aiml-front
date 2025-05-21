import { useObjectEditor } from "@/hook/useObjectEditor";
import { useSceneStore } from "@/store/useSceneStore";
import { EditorHeader, ObjectEditor } from "@repo/ui/components/editor";
import { useEffect, useState } from "react";

export default function Object3DEditor({ pId }: { pId: string }) {
  const {
    selected,
    transform,
    removeSelected,
    updateSelected,

    name,
    setName,
    visible,
    setVisible,

    setScale,
    setPosition,
    setRotation,

    color,
    setColor,
    setMaterial,
  } = useObjectEditor();

  const { addObject3D, removeObject3D, updateObject3D, selectedScene } =
    useSceneStore();
  const [sceneId, setSceneId] = useState(selectedScene?.id);

  useEffect(() => {
    setSceneId(selectedScene?.id);
  }, [selectedScene]);

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!sceneId) {
      alert("no object selected");
      return;
    }
    const updated = await updateSelected(sceneId);
    if (updated) {
      updateObject3D(updated);
    }
  };

  const handleRemove = async (e: React.MouseEvent) => {
    e.preventDefault();
    const oId = selected?.id;
    if (oId) {
      const response = await removeSelected(oId);
      if (response) {
        removeObject3D(oId);
      }
    } else {
      alert("no object selected");
    }
  };

  return (
    <>
      <EditorHeader text="EDITOR" />
      <ObjectEditor
        disabled={Boolean(!selected)}
        name={name}
        setName={setName}
        position={transform?.position}
        rotation={transform?.rotation}
        scale={transform?.scale}
        setPosition={setPosition}
        setRotation={setRotation}
        setScale={setScale}
        color={color}
        setColor={setColor}
        onSubmit={handleSubmit}
        onRemove={handleRemove}
      />
    </>
  );
}
