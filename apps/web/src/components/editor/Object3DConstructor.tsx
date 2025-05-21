import { useState, useEffect } from "react";
import { ObjectConstructor, EditorHeader } from "@repo/ui/components/editor";
import { useObjectCreator } from "@/hook/useObjectCreator";
import { useSceneStore } from "@/store/useSceneStore";

const OPTIONS = ["BoxGeometry", "SphereGeometry", "ConeGeometry"];

export default function Object3DConstructor({ pId }: { pId: string }) {
  const [selected, setSelected] = useState("");
  const {
    name,
    transform,

    setPosition,
    setRotation,
    setScale,

    reset,
    setNewMesh,
    updateObject3D,
  } = useObjectCreator();

  const { addObject3D, selectedScene } = useSceneStore();

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (selectedScene) {
      const updated = await updateObject3D(selectedScene.id);
      if (updated) {
        reset();
        addObject3D(updated);
        setSelected("");
      }
    }
  };

  const onSetSelect = (val: string) => {
    reset();
    setSelected(val);
  };

  useEffect(() => {
    if (selected) {
      setNewMesh(selected);
    }
  }, [selected]);

  return (
    <div>
      <EditorHeader text="CONSTRUCT" />
      <ObjectConstructor
        geoTypes={OPTIONS}
        selected={selected}
        setSelect={onSetSelect}
        position={transform?.position}
        rotation={transform?.rotation}
        scale={transform?.scale}
        setPosition={setPosition}
        setRotation={setRotation}
        setScale={setScale}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
