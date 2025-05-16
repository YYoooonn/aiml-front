import { CreatorBlock, EditorBlock } from "./EditorBlock";
import { MatrixConstructor, MatrixConstructorProps } from "./ui";

interface ObjectConstructorProps extends MatrixConstructorProps {
  geoTypes: string[];
  selected: string;
  setSelect: (val: string) => void;
}

export function ObjectConstructor(props: ObjectConstructorProps) {
  return (
    <EditorBlock text="CREATE">
      {props.geoTypes.map((geoType) => (
        <CreatorBlock
          selector={geoType}
          key={geoType}
          selected={props.selected === geoType}
          setSelect={props.setSelect}
        >
          <MatrixConstructor
            key={geoType}
            position={props.position}
            rotation={props.rotation}
            scale={props.scale}
            material={props.material}
            setPosition={props.setPosition}
            setRotation={props.setRotation}
            setScale={props.setScale}
            setMaterial={props.setMaterial}
            onSubmit={(e) => {
              e.preventDefault();
              props.onSubmit?.(e);
              props.setSelect("");
            }}
          />
        </CreatorBlock>
      ))}
    </EditorBlock>
  );
}
