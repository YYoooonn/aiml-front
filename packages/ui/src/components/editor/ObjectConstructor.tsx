import { CreatorBlock, EditorBlock } from "./EditorBlock";
import { MatrixConstructor, MatrixConstructorProps, SubmitButton } from "./ui";

interface ObjectConstructorProps<T> extends MatrixConstructorProps {
  selectors: T[];
  selected: T | null;
  setSelect: (val: T | null) => void;
}

export function ObjectConstructor<T>(props: ObjectConstructorProps<T>) {
  return (
    <EditorBlock text="CREATE">
      {props.selectors.map((selector) => (
        <CreatorBlock
          selector={selector}
          selected={props.selected === selector}
          key={selector as string}
          setSelect={props.setSelect}
        >
          <MatrixConstructor
            key={selector as string}
            position={props.position}
            rotation={props.rotation}
            scale={props.scale}
            setPosition={props.setPosition}
            setRotation={props.setRotation}
            setScale={props.setScale}
          />
          {props.onSubmit && (
            <SubmitButton title="SUBMIT" handler={props.onSubmit} />
          )}
        </CreatorBlock>
      ))}
    </EditorBlock>
  );
}
