"use client";

import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

const dev = process.env.NODE_ENV !== "production";
const host = dev ? "localhost:3000" : process.env.NEXT_PUBLIC_HOSTNAME;

export const useSocket = (namespace: string, roomId?: string) => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if(!namespace || !roomId) {
        return;
    }
    // Retrieve or generate a unique socket ID
    let socketId = localStorage.getItem("socketId");
    if (!socketId) {
      socketId = uuidv4();
      localStorage.setItem("socketId", socketId);
    }

    // Initialize the socket connection
    const socketInstance = io(`http://${host}/${namespace}`, {
      path: "/socket.io/",
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 20000,
      query: {
        userId: socketId,
        roomId: roomId
      },
    });

    socketRef.current = socketInstance;

    // Cleanup on unmount
    return () => {
      socketInstance.disconnect();
    };
  }, [namespace, roomId]);

  return socketRef.current;
};