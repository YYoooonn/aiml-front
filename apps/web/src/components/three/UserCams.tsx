"use client";

import { useParticipant } from "@/hook/useParticipant";
import { getRandomHexColor } from "@/utils/radom";

export function UserCams() {
  // const { nodes } = useGLTF(urlCam);
  const { participants } = useParticipant();

  return (
    <group>
      {/* {cameras.map((cam, i) => {
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
      })} */}
    </group>
  );
}
