"use client";

import { RightAisleContainer, AisleModule } from "@repo/ui/components/aisle";
import Object3DConstructor from "./editor/Object3DConstructor";
import Object3DEditor from "./editor/Object3DEditor";
import ViewportEditor from "./editor/ViewportEditor";
import { useProjectInfo } from "@/hook/useProjectInfo";
import { useProjectSocket } from "@/hook/useProjectSocket";

export function RightAisle() {
  const { projectId } = useProjectInfo()
  const { emitObjectUpdate : socketUpdate } = useProjectSocket()

  return (
    <RightAisleContainer>
      <AisleModule>
        <ViewportEditor />
        <p style={{ marginBottom: "8px" }} />
        <Object3DConstructor pId={projectId} socketUpdate={socketUpdate} />
        <p style={{ marginBottom: "8px" }} />
        <Object3DEditor pId={projectId} socketUpdate={socketUpdate} />
      </AisleModule>
    </RightAisleContainer>
  );
}
