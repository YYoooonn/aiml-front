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

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();

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
      {props.color && props.setColor && (
        <TextSelector
          text="color"
          val={props.color}
          preset={props.color}
          setVal={props.setColor}
        />
      )}
      {props.onSubmit && <SubmitButton title="SUBMIT" handler={handleSubmit} />}
      {props.onRemove && (
        <SubmitButton title="REMOVE" handler={props.onRemove} />
      )}
    </EditorBlock>
  );
}
