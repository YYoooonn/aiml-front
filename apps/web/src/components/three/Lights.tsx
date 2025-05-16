import { Light } from "@/hook/useEditor";

interface LightsProps {
  ambient?: {
    intensity: number;
    color: string;
  };
  directional?: {
    intensity: number;
    position: [number, number, number];
    color: string;
  };
}

export function BaseLights({
  ambient = { intensity: 1, color: "#ffffff" },
  directional = { intensity: 5, position: [5, 10, 10], color: "#FFFFFF" },
}: LightsProps) {
  return (
    <>
      <ambientLight intensity={ambient.intensity} color={ambient.color} />
      <directionalLight
        intensity={directional.intensity}
        position={directional.position}
        color={directional.color}
      />
    </>
  );
}

export function Lights({ lightProps }: { lightProps?: Light[] }) {
  return (
    <>
      {lightProps?.map((light, index) => {
        switch (light.type) {
          case "directional":
            return (
              <DirectionalLight
                key={index}
                type="directional"
                intensity={light.intensity}
                position={light.position}
                color={light.color}
              />
            );
          case "spot":
            return (
              <SpotLight
                key={index}
                type="spot"
                intensity={light.intensity}
                position={light.position}
                color={light.color}
              />
            );
          default:
            return null;
        }
      })}
    </>
  );
}

export function DirectionalLight({
  intensity = 1,
  position = [5, 10, 10],
  color = "#FFFFFF",
}: Light) {
  return (
    <directionalLight intensity={intensity} position={position} color={color} />
  );
}

export function SpotLight({
  intensity = 1,
  position = [5, 10, 10],
  color = "#FFFFFF",
  // angle = Math.PI / 4,
  // penumbra = 0.5,
}: Light) {
  return (
    <spotLight
      intensity={intensity}
      position={position}
      color={color}
      // angle={angle}
      // penumbra={penumbra}
    />
  );
}
