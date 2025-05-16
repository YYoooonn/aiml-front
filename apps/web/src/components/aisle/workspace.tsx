"use client";

import { useState, useMemo, useCallback } from "react";

import redirectUser from "@/hook/redirectUser";
import { useChat } from "@/hook/useChat";
import { useUserInfo } from "@/hook/useUserInfo";
import { useObjectEditor } from "@/hook/useObjectEditor";
import { useProjectStore } from "@/store/useProjectStore";

import {
  LeftAisleContainer,
  AisleModule,
  SelectionHeader,
  WorkspaceHeader,
} from "@repo/ui/components/aisle";
import { Layer, SocketModule, ChatModule, SocketHeader } from "@repo/ui/components/module";

const SELECTIONS = ["Layer", "Chat"];

export default function WorkspaceAisle({}: { id?: string }) {
  const { title, objects, id } = useProjectStore();

  const username = useUserInfo((s) => s.username);
  const { isConnected, logs, users, sendMessage } = useChat(
    username,
    id ? id.toString() : undefined,
  );

  const [tag, setTag] = useState(SELECTIONS[0]!!);
  const [showSocket, setShowSocket] = useState(true);

  return (
    <LeftAisleContainer>
      <AisleModule
        style={{ height: "auto", flexShrink: 0 }}
        header={
          <WorkspaceHeader title={title} onClick={() => redirectUser()} />
        }
      />
      <div style={{ marginBottom: "12px" }} />
      <AisleModule
        style={{ height: "auto", maxHeight: "180px", flexShrink: 0 }}
        header={
          <SocketHeader connected={isConnected} show={showSocket} setShow={setShowSocket} />
        }
        show={showSocket}
      >
        <SocketModule connected={isConnected} users={users} />
      </AisleModule>
      <div style={{ marginBottom: "12px" }} />
      <AisleModule
        header={
          <SelectionHeader
            selections={SELECTIONS}
            selected={tag}
            setSelected={setTag}
          />
        }
      >
        {tag === "Layer" ? (
          <LayerModule objects={objects} />
        ) : (
          <ChatModule logs={logs} sendMessage={sendMessage} />
        )}
      </AisleModule>
    </LeftAisleContainer>
  );
}

function LayerModule({ objects }: { objects: TObjectData[] }) {
  const { selected, setSelected } = useObjectEditor();
  // memoize the object map to avoid unnecessary re-renders
  const objectMap = useMemo(() => {
    const map = new Map<number, TObjectData>();
    for (const obj of objects) map.set(obj.id, obj);
    return map;
  }, [objects]);

  // use a callback to handle click events
  const handleClickCapture = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const target = e.target as HTMLElement;
      const id = target.closest("[data-id]")?.getAttribute("data-id");
      if (!id) return;

      const found = objectMap.get(Number(id));
      if (found) setSelected(found);
    },
    [objectMap, setSelected],
  );
  return (
    <div onClickCapture={handleClickCapture}>
      {objects?.map((o, i) => {
        return <Layer key={o.id} object={o} selected={selected?.id === o.id} />;
      })}
    </div>
  );
}
