"use client";

import { useEffect, useState } from "react";
import * as styles from "./workspace.css";
import { useProjectInfo } from "@/hook/useProjectInfo";
import { ObjectInfo } from "@/@types/api";
import { useChat } from "@/hook/useChat";
import { useUserInfo } from "@/hook/useUserInfo";
import { ChatSocket } from "@/components/socket/ChatSocket";

import redirectUser from "@/hook/redirectUser";
import { navigate } from "@/app/_actions/navigate";
import { useObjectEditor } from "@/hook/useObjectEditor";

export default function Workspace({ id }: { id?: string }) {
  const { title, objects } = useProjectInfo();
  const { username } = useUserInfo();

  return (
    <div className={styles.workspaceContainer}>
      <WorkspaceTopModule user={username}>
        <WorkspaceInfos user={username} title={title} />
      </WorkspaceTopModule>
      <WorkspaceBottomModule>
        <WorkspaceUtils objts={objects} />
      </WorkspaceBottomModule>
    </div>
  );
}

export function WorkspaceTopModule({
  user,
  children,
}: { user?: string } & React.PropsWithChildren) {
  return (
    <div className={styles.workspaceTopContainer}>
      <div className={styles.workspaceTopInner}>
        <div className={styles.aisleWrapper}>{children}</div>
      </div>
    </div>
  );
}

export function WorkspaceBottomModule({ children }: React.PropsWithChildren) {
  // true == layer
  return (
    <div className={styles.workspaceBottomContainer}>
      <div className={styles.aisleWrapper}>{children}</div>
    </div>
  );
}

function WorkspaceInfos({ user, title }: { user?: string; title?: string }) {
  return (
    <>
      <div className={styles.aisleHeader}>
        <div
          className={styles.returnIcon}
          onClick={() => {
            user ? redirectUser("me") : navigate("/");
          }}
        />
        <div className={styles.projectTitle}>
          {title ? title : "PROJECT NAME"}
        </div>
      </div>
      <div className={styles.profileImgContainer}>
        <ProfileImages />
      </div>
      <div className={styles.usersContainer}>
        <div className={styles.socketHeader}>Online</div>
        <div className={styles.socketUser}>participant1</div>
        <div className={styles.socketUser}>participant2</div>
        <div className={styles.socketUser}>participant3</div>
      </div>
    </>
  );
}

function ProfileImages() {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex" }}>
      <div className={styles.profileIcon} />
      <div className={styles.profileIcon} />
      <div className={styles.profileIcon} />
      <div className={styles.profileIcon} />
    </div>
  );
}

function WorkspaceUtils({ objts }: { objts?: ObjectInfo[] }) {
  // true == layer
  const [isSelected, setIsSelected] = useState(true);
  return (
    <>
      <div className={styles.headerButtonContainer}>
        <div
          className={
            isSelected
              ? styles.headerButtonSelected
              : styles.headerButtonUnSelected
          }
          onClick={() => setIsSelected(true)}
        >
          Layer
        </div>
        <div
          className={
            isSelected
              ? styles.headerButtonUnSelected
              : styles.headerButtonSelected
          }
          onClick={() => setIsSelected(false)}
        >
          Chat
        </div>
      </div>
      <div className={styles.bottomContentContainer}>
        {isSelected ? <Layers objts={objts} /> : <Chat />}
      </div>
    </>
  );
}

function Layers({ objts }: { objts?: ObjectInfo[] }) {
  return (
    <div className={styles.layerContainer}>
      {objts?.map((o, i) => {
        return <Layer key={i} obj={o} />;
      })}
    </div>
  );
}

function Layer({ obj }: { obj: ObjectInfo }) {
  const { selected, setSelected } = useObjectEditor();
  return (
    <div
      className={
        selected?.objectId === obj.objectId
          ? styles.layerTagSelected
          : styles.layerTag
      }
      onClick={() => {
        setSelected(obj);
      }}
    >
      {obj.geometry}
    </div>
  );
}

function Chat() {
  const username = useUserInfo((state) => state.username);
  useEffect(() => {
    setChatOn();
  }, []);

  useEffect(() => {
    return () => setChatOff();
  }, []);

  const { setChatOn, setChatOff } = useChat();

  return (
    <div className={styles.chatWrapper}>
      <ChatSocket {...{ username: username }} />
    </div>
  );
}
