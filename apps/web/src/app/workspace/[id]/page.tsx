"use client";

import { useEffect } from "react";
import { useUserInfo } from "@/hook/useUserInfo";
import { useEditor } from "@/hook/useEditor";
import { useSceneStore } from "@/store/useSceneStore";
import { WorkspaceObjects } from "@/components/three/ProjectObjects";
import {
  BaseCanvas,
  WorkspaceCamera,
  EditorObjects,
  UserCams,
  BaseLights,
  Lights,
} from "@/components/three";
import { useProjectStore } from "@/store/useProjectStore";

export default function Page({ params }: { params: { id: string } }) {
  const fetchUser = useUserInfo((state) => state.fetchUserInfo);
  const fetchProject = useProjectStore((s) => s.fetchProject);
  const { scenes, reset, fetchScenes, selectedScene } = useSceneStore();

  const {
    cam,
    setCameraPosition,
    setCameraZoom,
    background,
    ambientLight,
    lights,
  } = useEditor();

  useEffect(() => {
    fetchUser();
    fetchProject(params.id);
    fetchScenes(params.id);
    return () => reset();
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

      <EditorObjects />
      <WorkspaceObjects objectInfos={selectedScene?.children} />

      <UserCams />
    </BaseCanvas>
  );
}
