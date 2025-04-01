import { sampleBoxGeometry } from "@/assets/geometry";
import { blackMaterial } from "@/assets/material";
import { randomPositions, randomRotations } from "@/utils/three";
import { Instance, Instances } from "@react-three/drei";

interface Position {
  position: [x: number, y: number, z: number];
}

export default function SampleObjects({ id }: { id: string }) {
  const seed = Number(id);
  const positions = randomPositions(seed);
  const rotations = randomRotations(seed);

  return (
    <group>
      <Instances geometry={sampleBoxGeometry} material={blackMaterial}>
        {positions.map((pos, i) => {
          return (
            <ObjectInstance key={i} position={pos} rotation={rotations[i]} />
          );
        })}
      </Instances>
    </group>
  );
}

function ObjectInstance({
  position,
  rotation,
}: {
  position: Position["position"];
  rotation: Position["position"];
}) {
  return <Instance position={position} rotation={rotation} />;
}
