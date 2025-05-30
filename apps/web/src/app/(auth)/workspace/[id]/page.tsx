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
import { useUser } from "@/hook/useUser";

export default function Page({ params }: { params: { id: string } }) {
  const { fetchUserInfo } = useUser();
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
    fetch(params.id);
    return () => clearProject();
  }, [params.id]);

  const fetch = async (id: string) => {
    await fetchUserInfo();
    await fetchAllProjectData(id);
  };

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
