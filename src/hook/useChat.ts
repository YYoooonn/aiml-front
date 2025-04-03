"use client";

import { useSocket } from "./useSocket";
import { useEffect, useState } from "react";

type TChat =
  | string
  | {
      user?: string;
      msg: string;
    };

export const useChat = (username?: string, id?: string) => {
  const { socket, valid } = useSocket("chat", id);
  const [logs, setLogs] = useState<string[]>([]);
  const [users, setUsers] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Retrieve or generate a unique socket ID
    if (!username || !id || !socket) {
      return;
    }

    // TODO : AUTH CHECK
    socket.connect();
    console.log("CHAT SOCKET", socket.id);
    console.log("CHAT SOCKET connected", socket.connected);
    socket.emit("join", username);

    const onConnect = () => {
      setIsConnected(true);
    };

    const onDisconnect = () => {
      setIsConnected(false);
    };

    const onMessage = (data: TChat) => {
      // console.log("Received chat message", message)
      if (typeof data === "string") setLogs((prevLogs) => [data, ...prevLogs]);
      else setLogs((prevLogs) => [`${data.user}: ${data.msg}`, ...prevLogs]);
    };

    const onUsers = (inputUsers: string[]) => {
      // console.log("users", inputUsers);
      setUsers(inputUsers);
    };

    const onJoin = (username: string) => {
      // console.log("Received chat message", message)
      setLogs((prevLogs) => [`${username} joined the room`, ...prevLogs]);
    };

    const onLeave = (username: string) => {
      // console.log("Received chat message", message)
      setLogs((prevLogs) => [`${username} left the room`, ...prevLogs]);
    };

    // default events
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    // events with username
    socket.on("join", onJoin);
    socket.on("leave", onLeave);
    // custom events
    socket.on("chatMessage", onMessage);
    socket.on("users", onUsers);

    // Cleanup on unmount
    return () => {
      socket.emit("leave", username);
      // 아래 잘 작동하는지 확인해보고 지우자
      // socket.removeAllListeners()
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("join", onJoin);
      socket.off("leave", onLeave);
      socket.off("chatMessage", onMessage);
      socket.off("users", onUsers);
      socket.disconnect();
    };
  }, [username, valid, id]);

  const sendMessage = (message: string) => {
    if (socket !== null && message) {
      const data: TChat = { user: username, msg: message };
      socket.emit("chatMessage", data);
    }
  };

  return { isConnected, logs, users, sendMessage };
};
