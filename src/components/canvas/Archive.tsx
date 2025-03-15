"use client";

import { Canvas } from "@react-three/fiber";
import { ArchiveObjects } from "../three/ProjectObjects";
import { ObjectInfo } from "@/@types/api";

import * as styles from "./canvas.css";
import { CameraControls } from "@react-three/drei";

// XXX WORKSPACE PROPS
const DEFAULT = {
  ambientLight: {
    intensity: 1,
  },
  directionalLight: {
    intensity: 5,
    position: [5, 10, 10] as [x: number, y: number, z: number],
  },
  background: {
    color: "#000000",
  },
  orbit: {
    enableZoom: true,
  },
};

export default function Archive({ objts }: { objts?: ObjectInfo[] }) {
  return (
    <div className={styles.canvasWrapper}>
      <Canvas frameloop="demand" shadows>
        <ambientLight intensity={DEFAULT.ambientLight.intensity} />
        <directionalLight
          intensity={DEFAULT.directionalLight.intensity}
          position={DEFAULT.directionalLight.position}
        />
        <color attach="background" args={[DEFAULT.background.color]} />
        {/* <SampleObjects id={id} /> */}

        <ArchiveObjects objectInfos={objts} />
        <CameraControls />
      </Canvas>
    </div>
  );
}
