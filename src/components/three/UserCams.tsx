"use client";

// import { CAMERAMATERIAL } from "@/assets/material";
// import { urlCam } from "@/assets/models";
import { useParticipants } from "@/hook/useParticipants";
import { getRandomHexColor } from "@/utils/radom";
// import { Instance, Instances, useGLTF } from "@react-three/drei";

export function UserCams() {
  // const { nodes } = useGLTF(urlCam);
  const cameras = useParticipants((state) => state.cameras);

  return (
    <group>
      {cameras.map((cam, i) => {
        const randColor = getRandomHexColor();
        return (
          <group key={i} position={cam.position}>
            <pointLight intensity={20} color={randColor}>
              <mesh scale={0.2}>
                <sphereGeometry />
                <meshBasicMaterial color={randColor} />
              </mesh>
            </pointLight>
          </group>
        );
      })}
    </group>
  );
}
