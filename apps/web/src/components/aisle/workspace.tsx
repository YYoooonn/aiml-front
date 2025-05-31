"use client";

import { useState, useMemo, useCallback } from "react";

import redirectUser from "@/hook/redirectUser";
import { useChat } from "@/hook/useChat";
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
import { TObject3DData } from "@/@types/api";
import { useModals } from "@/hook/useModals";
import { ModalType } from "@/store/useModalStore";
import { useProjectInfo } from "@/hook/useProjectInfo";
import { useScene } from "@/hook/useScene";
import { ProjectEditor } from "../editor/ProjectEditor";
import { useObject3D } from "@/hook/useObject3D";
import { useUser } from "@/hook/useUser";
import { useParticipant } from "@/hook/useParticipant";

const SELECTIONS = ["Layer", "Chat"];

export default function WorkspaceAisle({}: { id?: string }) {
  const { projectInfo, projectId } = useProjectInfo();
  const { fetchParticipants } = useParticipant();
  const { open } = useModals();

  const { userInfo } = useUser();
  const { isConnected, logs, users, sendMessage } = useChat(
    userInfo.username,
    projectId,
  );

  const [tag, setTag] = useState(SELECTIONS[0]!!);
  const [showSocket, setShowSocket] = useState(true);
  const [showProjectInfo, setShowProjectInfo] = useState(false);

  const handleSettings = async () => {
    const response = await fetchParticipants();
    if (!response.success) {
      alert(`Not allowed to edit project : ${response.error}`);
      return;
    }
    open(ProjectEditor, {}, ModalType.FORM);
  };

  return (
    <LeftAisleContainer>
      <AisleModule
        style={{ height: "auto", flexShrink: 0 }}
        header={
          <WorkspaceHeader
            title={projectInfo.title}
            handleExit={() => redirectUser()}
            show={showProjectInfo}
            handleToggle={() => setShowProjectInfo(!showProjectInfo)}
          />
        }
      >
        {showProjectInfo && (
          <ProjectInfoModule
            title={projectInfo.title}
            subtitle={projectInfo.subtitle}
            createdAt={projectInfo.createdAt ?? ""}
            updatedAt={projectInfo.updatedAt ?? ""}
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
          <SceneModule />
        ) : (
          <ChatModule logs={logs} sendMessage={sendMessage} />
        )}
      </AisleModule>
    </LeftAisleContainer>
  );
}

function SceneModule() {
  const { sceneId, setSceneId, sceneMap } = useScene();
  return (
    <div>
      {Object.entries(sceneMap).map(([id, scene]) => (
        <SceneLayer
          key={id}
          scene={scene}
          selected={sceneId === id}
          onSelect={() => setSceneId(id)}
        >
          <LayerModule objects={scene.children} />
        </SceneLayer>
      ))}
    </div>
  );
}

function LayerModule({ objects }: { objects: TObject3DData[] }) {
  const { selected, selectObject3D } = useObject3D();
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
      if (found) selectObject3D(found);
    },
    [objectMap, selectObject3D],
  );
  return (
    <div onClickCapture={handleClickCapture}>
      {objects.map((o, i) => {
        return (
          <Layer
            key={o.id}
            object={o}
            selected={selected[o.id] ? true : false}
          />
        );
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
