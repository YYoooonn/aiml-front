import { useObjectEditor } from "@/hook/useObjectEditor";
import { useProjectStore } from "@/store/useProjectStore";
import { EditorHeader, ObjectEditor } from "@repo/ui/components/editor";

export default function Object3DEditor({ pId }: { pId: number }) {
  const {
    selected,
    position,
    rotation,
    scale,
    material,
    setScale,
    resetSelected,
    setPosition,
    setRotation,
    updateMatrix,
    removeSelected,
    setMaterial,
  } = useObjectEditor();
  const { updateObject, filterObject } = useProjectStore();

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    const response = await updateMatrix(pId);
    if (response.success) {
      updateObject(response.data);
    } else {
      alert(response.error);
    }
  };

  const handleRemove = async (e: React.MouseEvent) => {
    e.preventDefault();
    const oId = selected?.id;
    if (oId) {
      const response = await removeSelected(pId);
      if (response.success) {
        filterObject(oId);
        resetSelected();
      } else {
        alert(response.error);
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
        position={position}
        rotation={rotation}
        scale={scale}
        material={material}
        setPosition={setPosition}
        setRotation={setRotation}
        setScale={setScale}
        setMaterial={setMaterial}
        onSubmit={handleSubmit}
        onRemove={handleRemove}
      />
    </>
  );
}
