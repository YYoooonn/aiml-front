"use client";

import { useEffect } from "react";
import { useEditor } from "@/hook/useEditor";
import { WorkspaceObjects } from "@/components/three/ProjectObjects";
import {
  BaseCanvas,
  WorkspaceCamera,
  UserCams,
  BaseLights,
  Lights,
} from "@/components/three";
import { useProject } from "@/hook/useProject";

export default function Page({ params }: { params: { id: string } }) {
  // const fetchUser = useUserInfo((state) => state.fetchUserInfo);
  const { fetchAllProjectData, clearProject } = useProject();

  const {
    cam,
    setCameraPosition,
    setCameraZoom,
    background,
    ambientLight,
    lights,
  } = useEditor();

  useEffect(() => {
    // fetchUser();
    fetchAllProjectData(params.id);
    // return () => clearProject();
  }, []);

  // useEffect(() => {
  //   console.log("scenes", scenes);
  //   console.log("selectedScene", selectedScene);
  // }, [scenes, selectedScene]);

  return (
    <BaseCanvas background={background.color}>
      <BaseLights ambient={ambientLight} />
      <Lights lightProps={lights} />

      <WorkspaceCamera
        cam={cam}
        setZoom={setCameraZoom}
        setPosition={setCameraPosition}
      />

      {/* <EditorObjects /> */}
      <WorkspaceObjects />

      <UserCams />
    </BaseCanvas>
  );
}
