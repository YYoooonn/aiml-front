"use client";

import { useEffect, useState } from "react";
import * as styles from "./workspace.css";
import { useProjectInfo } from "@/hook/useProjectInfo";
import { useUserInfo } from "@/hook/useUserInfo";
import { ChatSocket } from "@/components/socket/ChatSocket";

import redirectUser from "@/hook/redirectUser";
import { navigate } from "@/app/_actions/navigate";
import { useObjectEditor } from "@/hook/useObjectEditor";
import { useChat } from "@/sockets/chat";

export default function Workspace({}: { id?: string }) {
  const { title, objects, id } = useProjectInfo();
  const username = useUserInfo((s) => s.username);
  const {isConnected, logs, users, sendMessage} =  useChat(username,id? id.toString(): undefined)
  
  const [selected, setSelected] = useState(true)
  const handler = () => {
    setSelected(!selected)
  }

  return (
    <div className={styles.workspaceContainer}>
      <WorkspaceTopModule user={username}>
        <WorkspaceInfos user={username} title={title} users={users} connected={isConnected}/>
      </WorkspaceTopModule>
      <WorkspaceBottomModule>
        <UtilHeader selected={selected} handler={handler} />
        <div className={styles.bottomContentContainer}>
        {selected ? <Layers objts={objects} /> : <Chat logs={logs} sendMessage={sendMessage}/>}
        </div>
      </WorkspaceBottomModule>
    </div>
  );
}

export function WorkspaceTopModule({
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

function WorkspaceInfos({ user, title, users, connected }: { user: string; title: string, users: string[], connected?: boolean }) {
  return (
    <>
      <div className={styles.aisleHeader}>
        <div
          className={styles.returnIcon}
          onClick={() => (user ? redirectUser("me") : navigate("/"))}
        />
        <div className={styles.projectTitle}>
          {title ? title : "PROJECT NAME"}
        </div>
      </div>
      <div className={styles.profileImgContainer}>
        <ProfileImages count={users.length}/>
      </div>
      <div className={styles.usersContainer}>
        <div className={styles.socketHeader}>{connected? "connected" : "no connection"}</div>
        {users.map((u, i) => {
          return (
            <div key={i} className={styles.socketUser}>
              {u}
            </div>
          );
        }
        )}
      </div>
    </>
  );
}

function ProfileImages({count} : {count?:number}) {
  const length = count ? count : 1;
  return (
    <div style={{ width: "100%", height: "100%", display: "flex" }}>
      {new Array(length).fill(null).map((_, i) => {
        return (
          <div key={i} className={styles.profileIcon} />
        );
      }
      )}  
    </div>
  );
}

interface H {
  selected : boolean
  handler : () => void
} 

function UtilHeader({selected, handler} : H){
  return(
    <div className={styles.headerButtonContainer}>
    <div
      className={
        selected
          ? styles.headerButtonSelected
          : styles.headerButtonUnSelected
      }
      onClick={handler}
    >
      Layer
    </div>
    <div
      className={
        selected
          ? styles.headerButtonUnSelected
          : styles.headerButtonSelected
      }
      onClick={handler}
    >
      Chat
    </div>
  </div>
  )
} 

function Layers({ objts }: { objts?: TObjectData[] }) {
  return (
    <div className={styles.layerContainer}>
      {objts?.map((o, i) => {
        return <Layer key={i} obj={o} />;
      })}
    </div>
  );
}

function Layer({ obj }: { obj: TObjectData }) {
  const { selected, setSelected } = useObjectEditor();
  return (
    <div
      className={
        selected?.id === obj.id ? styles.layerTagSelected : styles.layerTag
      }
      onClick={() => {
        setSelected(obj);
      }}
    >
      {obj.geometry}
    </div>
  );
}

function Chat({logs, sendMessage} : {logs: string[], sendMessage: (msg: string) => void}) {
  return (
    <div className={styles.chatWrapper}>
      <ChatSocket sendMessage={sendMessage} logs={logs}/>
    </div>
  );
}
