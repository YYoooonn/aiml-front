import { useEditor } from "@/hook/useEditor";
import * as styles from "./editor.css";
import { useState } from "react";
import {
  EditorBlock,
  NumSelector,
  DimSelector,
  SubmitButton,
  TextSelector,
} from ".";

export default function ViewportEditor() {
  return (
    <>
      <div className={styles.aisleHeader}>
        <div className={styles.aisleTitle}>VIEWPORT</div>
      </div>
      <p style={{ marginBottom: "8px" }} />
      <BackgroundEditor />
      <CameraEditor />
      <LightEditor />
    </>
  );
}

function BackgroundEditor() {
  const { background, setBackground } = useEditor();
  const [color, setColor] = useState(background.color);

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    setBackground({ color: color });
  };

  return (
    <EditorBlock text={"Background"}>
      <TextSelector
        text="color"
        val={color}
        setVal={setColor}
        preset={background.color}
      />
      <SubmitButton handler={handleSubmit} />
    </EditorBlock>
  );
}

function CameraEditor() {
  const { cam, setCameraPosition, setCameraZoom } = useEditor();

  // // const position = pos.map((p) => p.toString());
  // const handleSubmit = (e: React.MouseEvent) => {
  //   e.preventDefault();
  // };

  return (
    <EditorBlock text={"Camera"}>
      <NumSelector text="zoom" val={cam.zoom} setVal={setCameraZoom} />
      {/* <TextSelector text="fov" val={fov} setVal={setFov}/> */}
      <DimSelector
        text="position"
        dim={cam.position}
        setDim={setCameraPosition}
      />
      {/* XXX update project process */}
      {/* <SubmitButton handler={handleSubmit} /> */}
    </EditorBlock>
  );
}

function LightEditor() {
  return (
    <EditorBlock text={"Light"}>
      <div className={styles.editorProp}>NOT IMPLEMENTED YET</div>
    </EditorBlock>
  );
}
