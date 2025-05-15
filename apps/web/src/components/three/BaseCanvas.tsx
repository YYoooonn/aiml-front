import { Canvas } from "@react-three/fiber";

const DEFAULT = {
  ambientLight: {
    intensity: 1,
    color: "#ffffff",
  },
  directionalLight: {
    intensity: 5,
    position: [5, 10, 10] as [x: number, y: number, z: number],
    color: "#ffffff",
  },
  background: {
    color: "#d1d5db",
  }
};

interface CanvasProps {
  background?: string;
  children?: React.ReactNode;
}

export function BaseCanvas({ background=DEFAULT.background.color, children }: CanvasProps) {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas frameloop="demand" shadows>
        <color attach="background" args={[background]} />
        {children}
      </Canvas>
    </div>
  );
}
