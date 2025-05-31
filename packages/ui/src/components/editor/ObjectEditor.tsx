import { useEffect, useState } from "react";
import { EditorBlock } from "./EditorBlock";
import {
  MatrixConstructor,
  MatrixConstructorProps,
  TextSelector,
  SubmitButton,
} from "./ui";

interface ObjectEditorProps extends MatrixConstructorProps {
  disabled: boolean;
  name: string;
  setName: (val: string) => void;
  color?: string;
  setColor?: (val: string) => void;
}

export function ObjectEditor(props: ObjectEditorProps) {
  const [color, setColor] = useState(props.color);

  useEffect(() => {
    setColor(props.color);
  }, [props.color]);

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    props.setColor?.(color ? color : "#575757");
    if (props.onSubmit) props.onSubmit(e);
  };

  return (
    <EditorBlock text="EDIT" disabled={props.disabled}>
      <TextSelector
        text="name"
        val={props.name}
        preset={props.name ? props.name : "untitled"}
        setVal={props.setName}
      />
      <MatrixConstructor
        position={props.position}
        rotation={props.rotation}
        scale={props.scale}
        setPosition={props.setPosition}
        setRotation={props.setRotation}
        setScale={props.setScale}
        onSubmit={props.onSubmit}
        onRemove={props.onRemove}
      />
      {color && (
        <TextSelector
          text="color"
          val={color}
          preset={color}
          setVal={setColor}
        />
      )}
      {props.onSubmit && <SubmitButton title="SUBMIT" handler={handleSubmit} />}
      {props.onRemove && (
        <SubmitButton title="REMOVE" handler={props.onRemove} />
      )}
    </EditorBlock>
  );
}
