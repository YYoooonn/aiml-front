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
import {
  Layer,
  SocketModule,
  ChatModule,
  SocketHeader,
  SceneLayer,
  InfoBlock,
} from "@repo/ui/components/module";
import { SubmitButton } from "@repo/ui/components/editor";
import { useSceneStore } from "@/store/useSceneStore";
import { SceneData, TObject3DData } from "@/@types/api";
import { useModals } from "@/hook/useModals";
import { ModalType } from "@/store/useModalStore";
import { ProjectEditForm } from "../form/ProjectEditForm";

const SELECTIONS = ["Layer", "Chat"];

export default function WorkspaceAisle({}: { id?: string }) {
  const { title, subtitle, id, createdAt, updatedAt } = useProjectStore();
  const scenes = useSceneStore((s) => s.scenes);
  const { open, close } = useModals();

  const username = useUserInfo((s) => s.username);
  const { isConnected, logs, users, sendMessage } = useChat(
    username,
    id ? id.toString() : undefined,
  );

  const [tag, setTag] = useState(SELECTIONS[0]!!);
  const [showSocket, setShowSocket] = useState(true);
  const [showProjectInfo, setShowProjectInfo] = useState(false);

  const handleSettings = () => {
    open(ProjectEditForm, {}, ModalType.FORM);
  };

  return (
    <LeftAisleContainer>
      <AisleModule
        style={{ height: "auto", flexShrink: 0 }}
        header={
          <WorkspaceHeader
            title={title}
            handleExit={() => redirectUser()}
            show={showProjectInfo}
            handleToggle={() => setShowProjectInfo(!showProjectInfo)}
          />
        }
      >
        {showProjectInfo && (
          <ProjectInfoModule
            title={title}
            subtitle={subtitle}
            createdAt={createdAt}
            updatedAt={updatedAt}
            onEdit={handleSettings}
          />
        )}
      </AisleModule>
      <div style={{ marginBottom: "12px" }} />
      <AisleModule
        style={{ height: "auto", maxHeight: "180px", flexShrink: 0 }}
        header={
          <SocketHeader
            connected={isConnected}
            show={showSocket}
            setShow={setShowSocket}
          />
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
          <SceneModule scenes={scenes} />
        ) : (
          <ChatModule logs={logs} sendMessage={sendMessage} />
        )}
      </AisleModule>
    </LeftAisleContainer>
  );
}

function SceneModule({ scenes }: { scenes: Map<string, SceneData> }) {
  const { setSelected, selectedScene, children } = useSceneStore();
  return (
    <>
      {Array.from(scenes.values()).map((scene) => (
        <SceneLayer
          key={scene.id}
          scene={scene}
          selected={selectedScene?.id === scene.id}
          onSelect={() => setSelected(scene.id)}
        >
          <LayerModule objects={children} />
        </SceneLayer>
      ))}
    </>
  );
}

function LayerModule({ objects }: { objects: TObject3DData[] }) {
  const { selected, setSelected } = useObjectEditor();
  // memoize the object map to avoid unnecessary re-renders
  const objectMap = useMemo(() => {
    const map = new Map<string, TObject3DData>();
    for (const obj of objects) map.set(obj.id, obj);
    return map;
  }, [objects]);

  // use a callback to handle click events
  const handleClickCapture = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const target = e.target as HTMLElement;
      const id = target.closest("[data-id]")?.getAttribute("data-id");
      if (!id) return;

      const found = objectMap.get(id);
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

interface ProjectInfoProps {
  title: string;
  subtitle?: string;
  createdAt: string;
  updatedAt: string;
  onEdit?: () => void;
}

function ProjectInfoModule(props: ProjectInfoProps) {
  const created = new Date(props.createdAt);
  created.setHours(created.getHours() + 9);
  const updated = new Date(props.updatedAt);
  updated.setHours(updated.getHours() + 9);
  return (
    <>
      {/* <InfoBlock title="TITLE" info={props.title} /> */}
      {props.subtitle && <InfoBlock title="SUBTITLE" info={props.subtitle} />}
      <InfoBlock title="CREATED AT" info={created.toLocaleString()} />
      <InfoBlock title="UPDATED AT" info={updated.toLocaleString()} />
      {props.onEdit && (
        <SubmitButton title="EDIT PROJECT" handler={props.onEdit} />
      )}
    </>
  );
}
