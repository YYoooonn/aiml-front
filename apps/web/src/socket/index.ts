"use client";

import { io, Socket } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

const dev = process.env.NODE_ENV !== "production";
const path = dev ? "localhost:3001" : process.env.NEXT_PUBLIC_HOSTNAME;
// for local docker test
// const path = "localhost"

export const generate = (ns: string, query: Record<string, string>): Socket => {
  // console.log("namespace", ns)
  // console.log("query", query)

  // Retrieve or generate a unique socket ID
  let socketId = localStorage.getItem("socketId");
  if (!socketId) {
    socketId = uuidv4();
    localStorage.setItem("socketId", socketId);
  }

  // Initialize the socket connection
  return io(`http://${path}/${ns}`, {
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
