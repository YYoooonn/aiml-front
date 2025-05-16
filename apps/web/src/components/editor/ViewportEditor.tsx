import { useState } from "react";
import {
  EditorHeader,
  BackgroundEditor,
  CameraEditor,
  LightEditor,
} from "@repo/ui/components/editor";
import { useEditor } from "@/hook/useEditor";

export default function ViewportEditor() {
  const { background, setBackground, cam, setCameraPosition, setCameraZoom } =
    useEditor();

  const [color, setColor] = useState(background.color);

  const onSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    setBackground({ color: color });
  };

  return (
    <>
      <EditorHeader text="VIEWPORT" />
      <BackgroundEditor
        color={color}
        setColor={setColor}
        preset={color}
        onSubmit={onSubmit}
      />
      <CameraEditor
        position={cam.position}
        setPosition={setCameraPosition}
        zoom={cam.zoom}
        setZoom={setCameraZoom}
      />
      <LightEditor />
    </>
  );
}
