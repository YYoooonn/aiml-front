import { EditorBlock } from "./EditorBlock";
import { NumSelector, DimSelector, SubmitButton, TextSelector } from "./ui";

type BackgroundEditorProps = {
  color: string;
  setColor: (val: string) => void;
  preset?: string;
  onSubmit?: (e: React.MouseEvent) => void;
};

export function BackgroundEditor({
  color,
  setColor,
  preset,
  onSubmit,
}: BackgroundEditorProps) {
  return (
    <EditorBlock text={"Background"}>
      <TextSelector
        text="color"
        val={color}
        setVal={setColor}
        preset={preset}
      />
      {onSubmit && <SubmitButton handler={onSubmit} />}
    </EditorBlock>
  );
}

type CameraEditorProps = {
  position: [number, number, number];
  setPosition: (val: [number, number, number]) => void;
  zoom: number;
  setZoom: (val: number) => void;
  onSubmit?: (e: React.MouseEvent) => void;
};

export function CameraEditor({
  position,
  setPosition,
  zoom,
  setZoom,
  onSubmit,
}: CameraEditorProps) {
  return (
    <EditorBlock text={"Camera"}>
      <NumSelector text="zoom" val={zoom} setVal={setZoom} />
      <DimSelector text="position" dim={position} setDim={setPosition} />
      {onSubmit && <SubmitButton handler={onSubmit} />}
    </EditorBlock>
  );
}

type LightEditorProps = {
  // Define any props needed for the LightEditor
  intensity: number;
  setIntensity: (val: number) => void;
};

export function LightEditor({
  intensity,
  setIntensity,
}: LightEditorProps) {
  return (
    <EditorBlock text={"Light"}>
      <NumSelector text="intensity" val={intensity} setVal={setIntensity} />
    </EditorBlock>
  );
}
