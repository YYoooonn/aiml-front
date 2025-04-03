"use client";

import { io } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

const dev = process.env.NODE_ENV !== "production";
const host = dev ? "localhost" : process.env.NEXT_PUBLIC_HOSTNAME;
const port = dev ? 3000 : Number(process.env.PORT || 3000);

export const generate = (ns: string, query: Record<string, string>) => {
  // console.log("namespace", ns)
  // console.log("query", query)

  // Retrieve or generate a unique socket ID
  let socketId = localStorage.getItem("socketId");
  if (!socketId) {
    socketId = uuidv4();
    localStorage.setItem("socketId", socketId);
  }

  // Initialize the socket connection
  return io(`http://${host}:${port}/${ns}`, {
    path: "/socket.io/",
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    timeout: 20000,
    autoConnect: false,
    query: {
      userId: socketId,
      ...query,
    },
  });
};
