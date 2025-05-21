"use client";

import { useEffect, useState } from "react";
import * as styles from "./chat.css";
import { SubmitButton } from "../button/Button";

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

  const handleSubmit = () => {
    if (message) {
      sendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className={styles.chatInputContainer}>
      <input
        className={styles.chatInput}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={onKeyDownSubmit}
        placeholder="enter message"
      />
      <SubmitButton handler={handleSubmit} style={{ height: "auto" }} />
    </div>
  );
}

function MessageContainer({ logs }: { logs: string[] }) {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    setMessages(logs);
  }, [logs]);

  return (
    <>
      <div className={styles.chatMessageHeader}>messages</div>
      <div className={styles.chatMessageContainer}>
        {messages.map((msg, i) => {
          return (
            <div key={i} className={styles.chatMessage}>
              {msg}
            </div>
          );
        })}
      </div>
    </>
  );
}
