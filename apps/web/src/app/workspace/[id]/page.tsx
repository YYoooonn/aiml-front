"use client";

import { useEffect } from "react";
import { useProjectStore } from "@/store/useProjectStore";
import { useUserInfo } from "@/hook/useUserInfo";
import { useEditor } from "@/hook/useEditor";
import { BaseCanvas } from "@/components/three/BaseCanvas";
import { WorkspaceCamera } from "@/components/three/Cameras";
import { EditorObjects } from "@/components/three/EditorObjects";
import { WorkspaceObjects } from "@/components/three/ProjectObjects";
import { UserCams } from "@/components/three/UserCams";
import { BaseLights, Lights } from "@/components/three/Lights";


export default function Page({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const { objects, fetch, reset } = useProjectStore();

  const {
    cam,
    setCameraPosition,
    setCameraZoom,
    background,
    ambientLight,
    lights,
  } = useEditor();

  const fetchUser = useUserInfo((state) => state.fetchUserInfo);

  useEffect(() => {
    fetch(id);
    fetchUser();
    return () => reset();
  }, []);

  return (
    <BaseCanvas background={background.color}>
      <BaseLights ambient={ambientLight}/>
      <Lights lightProps={lights} />

      <WorkspaceCamera cam={cam} setZoom={setCameraZoom} setPosition={setCameraPosition}/>
      
      <EditorObjects />
      <WorkspaceObjects objectInfos={objects} />
      
      <UserCams />
    </BaseCanvas>
  );
}
