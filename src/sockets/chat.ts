"use client";

import { useSocket } from "@/hook/useSocket";
import { useEffect, useState, useRef } from "react";

interface IMessage {
  message: string;
  username: string;
}

export const useChat = (username?:string, id?: string) => {
  const socket = useSocket("chat", id)
  const [logs, setLogs] = useState<string[]>([]);
  const [users, setUsers] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  
  useEffect(() => {
    // Retrieve or generate a unique socket ID
    if(!username || !id){
      return;
    }
    if(!socket) return;
    
    // TODO : AUTH CHECK

    const onConnect = () => {
      setIsConnected(true);
    }

    const onDisconnect = () => {
      setIsConnected(false);
      socket.emit("leave", { type: "leave", username: username });
    }

    const onMessage = (message: string | IMessage) =>{
      // console.log("Received chat message", message)
      if(typeof message === "string") setLogs((prevLogs) => [message, ...prevLogs]);
      else setLogs((prevLogs) => [`${message.username}: ${message.message}`, ...prevLogs]);
    }

    const onUsers = (inputUsers: string[]) => {
      // console.log("users", inputUsers);
      setUsers(inputUsers);
    }

    socket.emit("join", { type: "join", username: username });

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("chatMessage", onMessage);
    socket.on("users", onUsers);
    socket.on("join", onMessage)

    // Cleanup on unmount
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("chatMessage", onMessage);
      socket.off("users", onUsers);
      socket.off("join", onMessage)
      socket.disconnect();
    };
  }, [username, socket?.id, id]);

  const sendMessage = (message: string) => {
    if (socket !== null && message) {
      socket.emit("chatMessage", { username, message });
    }
  }

  return { isConnected, logs, users, sendMessage };
};