"use client";

import { Canvas } from "@react-three/fiber";
import { WorkspaceObjects } from "../three/ProjectObjects";
import { ObjectInfo } from "@/@types/api";
import { UserCams } from "../three/UserCams";
import { useEditor } from "@/hook/useEditor";
import Camera from "./camera";
import Lights from "./lights";
import EditorObjects from "./EditorObjects";

import * as styles from "./canvas.css";

export default function Workspace({ objts }: { objts?: ObjectInfo[] }) {
  const {
    cam,
    setCameraPosition,
    setCameraZoom,
    background,
    ambientLight,
    lights,
  } = useEditor();

  return (
    <div className={styles.canvasWrapper}>
      <Canvas
        frameloop="demand"
        shadows
        camera={{ position: [5, 10, 10], fov: 60 }}
      >
        <ambientLight
          intensity={ambientLight.intensity}
          color={ambientLight.color}
        />
        <Lights props={lights} />
        {/* <directionalLight
            intensity={DEFAULT.directionalLight.intensity}
            position={DEFAULT.directionalLight.position}
          /> */}
        <color attach="background" args={[background.color]} />
        <EditorObjects />
        <WorkspaceObjects objectInfos={objts} />
        <Camera
          cam={cam}
          setZoom={setCameraZoom}
          setPosition={setCameraPosition}
        />
        <UserCams />
      </Canvas>
    </div>
  );
}
