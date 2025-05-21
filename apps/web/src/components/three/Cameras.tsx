"use client";

import { EditorProps } from "@/hook/useEditor";
import { CameraControls } from "@react-three/drei";
import { useEffect, useRef } from "react";
import CamTracker from "../three/CamTracker";

export function BaseCamera() {
  return <CameraControls />;
}

interface CamProps {
  cam: EditorProps["cam"];
  setZoom?: (z: number) => void;
  setPosition?: (dim: EditorProps["cam"]["position"]) => void;
}

export function WorkspaceCamera(props?: CamProps) {
  const cameraRef = useRef<CameraControls>(null);
  useEffect(() => {
    if (props?.cam) {
      cameraRef.current?.setPosition(
        props.cam.position[0],
        props.cam.position[1],
        props.cam.position[2],
        true,
      );
      cameraRef.current?.zoomTo(props.cam.zoom, true);
    }
  }, [props?.cam]);

  return (
    <>
      <CameraControls ref={cameraRef} />
      <CamTracker pos={props?.cam?.position} {...props} />
    </>
  );
}
