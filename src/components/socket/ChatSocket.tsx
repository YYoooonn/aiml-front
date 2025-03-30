"use client";

// import { MainLayout } from '@/layout/MainLayout';
import { v4 as uuidv4 } from "uuid";
import * as styles from "./socket.css";
import { useEffect, useState } from "react";
import { socket } from "@/sockets/chat";

interface MessageLog {
  room: string;
  message: string;
  username: string;
}

interface SocketProps {
  roomId?: string;
  username?: string;
}

export function ChatSocket(props: SocketProps) {
  const [username, setUsername] = useState(
    props.username ? props.username : "anonymous",
  );
  const [userId, setUserId] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const [logs, setLogs] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState<string[]>([]);
  useEffect(() => {
    setUserId(socket.id ? socket.id : "");
    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.io.engine.on("upgrade", (transport) => {
      setTransport(transport.name);
    });

    if (socket.connected) {
      onConnect();
      socket.emit("join", { type: "join", username });
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    function onSetLog(msg: MessageLog | string) {
      //console.debug(msg);
      // console.log("setlog");
      if (typeof msg === "string") {
        setLogs((prevLogs) => [...prevLogs, msg]);
      } else {
        setLogs((prevLogs) => [...prevLogs, `${msg.username}: ${msg.message}`]);
      }
    }

    socket.on("chatMessage", onSetLog);

    function onUsers(inputUsers: { username: string }[]) {
      // console.debug(inputUsers);
      setUsers(inputUsers.map((inputUser) => inputUser.username));
    }
    socket.on("users", onUsers);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("chatMessage", onSetLog);
      socket.off("users", onUsers);
    };
  }, [username]);

  const onClickSubmitBtn = () => {
    socket.emit("chatMessage", { username, message });
    setMessage("");
  };

  const onKeyDownSubmit = (e: React.KeyboardEvent) => {
    // 엔터 두번 발생시
    if (e.key === "Enter" && message) {
      if (!e.nativeEvent.isComposing) {
        socket.emit("chatMessage", { username, message });
        setMessage("");
      }
    }
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatMessageContainer}>
        <div className={styles.chatInputContainer}>
          <input
            className={styles.chatInput}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={onKeyDownSubmit}
            placeholder="enter message"
          />
          <div className={styles.buttonSubmit} onClick={onClickSubmitBtn} />
        </div>
      </div>

      <div>
        <div>
          <div className={styles.chatMessageHeader}>messages</div>
          <div className={styles.chatLogContainer}>
            {logs &&
              logs.map((log) => (
                <div className={styles.textStyle} key={uuidv4()}>
                  {log}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
