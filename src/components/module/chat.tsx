"use client";

// import { MainLayout } from '@/layout/MainLayout';
import * as styles from "./chat.css";
import { ChangeEvent, useEffect, useState } from "react";

interface MessageLog {
  room: string;
  message: string;
  username: string;
}

interface SocketProps {
  roomId?: string;
  username?: string;
  logs: string[];
  sendMessage: (msg: string) => void;
  handleConnection?: () => void;
}

export function ChatModule({ logs, sendMessage }: SocketProps) {
  return (
    <div className={styles.chatContainer}>
      <InputContainer sendMessage={sendMessage} />
      <MessageContainer logs={logs} />
    </div>
  );
}

function InputContainer({
  sendMessage,
}: {
  sendMessage: (input: string) => void;
}) {
  const [message, setMessage] = useState("");
  const onKeyDownSubmit = (e: React.KeyboardEvent) => {
    // 엔터 두번 발생시
    if (e.key === "Enter") {
      if (!e.nativeEvent.isComposing && message) {
        sendMessage(message);
        setMessage("");
      }
    }
  };
  return (
    <div className={styles.chatMessageContainer}>
      <div className={styles.chatInputContainer}>
        <input
          className={styles.chatInput}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={onKeyDownSubmit}
          placeholder="enter message"
        />
        <div
          className={styles.buttonSubmit}
          onClick={() => {
            if (message) {
              sendMessage(message);
              setMessage("");
            }
          }}
        />
      </div>
    </div>
  );
}

function MessageContainer({ logs }: { logs: string[] }) {
  return (
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
  );
}
