"use client";

import { usePathname } from "next/navigation";
import { RightAisleContainer, AisleModule } from "@repo/ui/components/aisle";
import Object3DConstructor from "./editor/Object3DConstructor";
import Object3DEditor from "./editor/Object3DEditor";
import ViewportEditor from "./editor/ViewportEditor";

export function RightAisle() {
  const [_, id] = usePathname().split("/").slice(1, 3);

  return (
    <RightAisleContainer>
      <AisleModule>
        <ViewportEditor />
        <p style={{ marginBottom: "8px" }} />
        <Object3DConstructor pId={id ? id : ""} />
        <p style={{ marginBottom: "8px" }} />
        <Object3DEditor pId={id ? id : ""} />
      </AisleModule>
    </RightAisleContainer>
  );
}
