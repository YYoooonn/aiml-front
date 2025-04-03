"use client";

import { generate } from "@/socket";
import { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";

export const useSocket = (namespace: string, roomId?: string) => {
  const socketRef = useRef<Socket | null>(null);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    if (!namespace || !roomId) {
      return;
    }

    // generate socket io instance
    const socketio = generate(namespace, { roomId: roomId });

    socketRef.current = socketio;
    setValid(true);

    // Cleanup on unmount
    return () => {
      socketio.disconnect();
      setValid(false);
    };
  }, [namespace, roomId]);

  return { socket: socketRef.current, valid };
};
