"use client";

import { useSocket } from "@/hook/useSocket";
import { useEffect, useState } from "react";
import { TChat } from "./type";

export const useChat = (username?:string, id?: string) => {
  const {socket, on} = useSocket("chat", id)
  const [logs, setLogs] = useState<string[]>([]);
  const [users, setUsers] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  

  useEffect(() => {
    // Retrieve or generate a unique socket ID
    console.log("useEffect", username, id, socket)
    if(!username || !id || !socket){
      return;
    }

    // TODO : AUTH CHECK
    socket.connect();
    console.log("CHAT SOCKET", socket.id)
    console.log("CHAT SOCKET connected", socket.connected)
    

    const onConnect = () => {
      setIsConnected(true);
      socket.emit("join", username);
    }

    const onDisconnect = () => {
      setIsConnected(false);
      socket.emit("leave", username);
    }

    const onMessage = (data: TChat) =>{
      // console.log("Received chat message", message)
      if(typeof data === "string") setLogs((prevLogs) => [data, ...prevLogs]);
      else setLogs((prevLogs) => [`${data.user}: ${data.msg}`, ...prevLogs]);
    }

    const onJoin = (username : string) => {
      // console.log("Received chat message", message)
      setLogs((prevLogs) => [`${username} joined the room`, ...prevLogs])
    }

    const onLeave = (username : string) => {
      // console.log("Received chat message", message)
      setLogs((prevLogs) => [`${username} left the room`, ...prevLogs])
    }

    const onUsers = (inputUsers: string[]) => {
      console.log("users", inputUsers);
      setUsers(inputUsers);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("chatMessage", onMessage);
    socket.on("users", onUsers);
    socket.on("join", onJoin)
    socket.on("leave", onLeave)

    // Cleanup on unmount
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("chatMessage", onMessage);
      socket.off("users", onUsers);
      socket.off("join", onJoin)
      socket.off("leave", onLeave)
      socket.disconnect();
    };
  }, [username, on, id]);

  const sendMessage = (message: string) => {
    if (socket !== null && message) {
      
      socket.emit("chatMessage", {user: username, msg: message});
    }
  }

  return { isConnected, logs, users, sendMessage };
};