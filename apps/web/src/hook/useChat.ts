"use client";

import { Socket } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import { generate } from "@/socket";

type TChat =
  | string
  | {
      user?: string;
      msg: string;
    };

export const useChat = (username?: string, id?: string) => {
  const socketRef = useRef<Socket | null>(null);
  // const { socket, valid } = useSocket("chat", id);
  const [logs, setLogs] = useState<string[]>([]);
  const [users, setUsers] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Retrieve or generate a unique socket ID
    if (!username || !id) {
      return;
    }

    const socket = generate("chat", { roomId: id });
    socketRef.current = socket;

    // TODO : AUTH CHECK
    socket.connect();
    // console.log("CHAT SOCKET", socket.id);
    console.log("connecting to chat space...");

    const onConnect = () => {
      setIsConnected(true);
      socket.emit("join", username);
      console.log("connected to chat space");
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
      // 아래 잘 작동하는지 확인해보고 한번에 제거하자
      // socket.removeAllListeners()
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("join", onJoin);
      socket.off("leave", onLeave);
      socket.off("chatMessage", onMessage);
      socket.off("users", onUsers);
      socket.disconnect();
    };
  }, [username, id]);

  const sendMessage = (message: string) => {
    if (socketRef.current !== null && message) {
      const data: TChat = { user: username, msg: message };
      socketRef.current.emit("chatMessage", data);
    }
  };

  return { isConnected, logs, users, sendMessage };
};
