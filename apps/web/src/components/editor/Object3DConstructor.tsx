import { useState, useEffect } from "react";
import { ObjectConstructor, EditorHeader } from "@repo/ui/components/editor";
import { useObjectCreator } from "@/hook/useObjectCreator";
import { useProjectStore } from "@/store/useProjectStore";

const OPTIONS = ["BoxGeometry", "SphereGeometry", "ConeGeometry"];

export default function Object3DConstructor({ pId }: { pId: number }) {
  const [selected, setSelected] = useState("");
  const {
    setNew,
    reset,
    update,
    position,
    rotation,
    scale,
    material,
    setPosition,
    setRotation,
    setScale,
    setMaterial,
  } = useObjectCreator();
  const addToObjects = useProjectStore((s) => s.addtoObjects);
  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    update(pId).then((r) => {
      if (r) {
        reset();
        addToObjects(r);
        setSelected("");
      }
    });
  };
  const onSetSelect = (val: string) => {
    setSelected(val);
    reset();
  };

  useEffect(() => {
    if (selected) {
      setNew(selected);
    }
  }, [selected, setNew]);

  return (
    <div>
      <EditorHeader text="CONSTRUCT" />
      <ObjectConstructor
        geoTypes={OPTIONS}
        selected={selected}
        setSelect={onSetSelect}
        position={position}
        rotation={rotation}
        scale={scale}
        material={material}
        setPosition={setPosition}
        setRotation={setRotation}
        setScale={setScale}
        setMaterial={setMaterial}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
