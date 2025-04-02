"use client";

// import { MainLayout } from '@/layout/MainLayout';
import * as styles from "./socket.css";
import { useEffect, useState } from "react";

interface MessageLog {
  room: string;
  message: string;
  username: string;
}

interface SocketProps {
  roomId?: string;
  username?: string;
  logs: string[]
  sendMessage: (msg: string) => void;
  handleConnection?: () => void;
}

export function ChatSocket({logs, sendMessage}: SocketProps) {
  const [message, setMessage] = useState("");

  const onKeyDownSubmit = (e: React.KeyboardEvent) => {
    // 엔터 두번 발생시
    if (e.key === "Enter") {
      if (!e.nativeEvent.isComposing && message) {
        sendMessage(message)
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
          <div className={styles.buttonSubmit} onClick={() => {
            if (message) {
              sendMessage(message);
              setMessage("");
            }
          }} />
        </div>
      </div>

      <div>
        <div>
          <div className={styles.chatMessageHeader}>messages</div>
          <div className={styles.chatLogContainer}>
            {logs &&
              logs.map((log, i) => (
                <div className={styles.textStyle} key={i}>
                  {log}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
