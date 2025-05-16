import { CreatorBlock, EditorBlock } from "./EditorBlock";
import { MatrixConstructor, MatrixConstructorProps } from "./ui";

interface ObjectEditorProps extends MatrixConstructorProps {
  disabled: boolean;
}

export function ObjectEditor(props: ObjectEditorProps) {
  return (
    <EditorBlock text="EDIT" disabled={props.disabled}>
      <MatrixConstructor
        position={props.position}
        rotation={props.rotation}
        scale={props.scale}
        material={props.material}
        setPosition={props.setPosition}
        setRotation={props.setRotation}
        setScale={props.setScale}
        setMaterial={props.setMaterial}
        onSubmit={props.onSubmit}
        onRemove={props.onRemove}
      />
    </EditorBlock>
  );
}
