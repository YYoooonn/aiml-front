"use client";

import { io } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

const dev = process.env.NODE_ENV !== "production";
// 현재 같은 nextjs의 custom domain에서 소켓을 사용하기 때문에 localhost,
// 서버 분리할 경우, 따로 설정을 해줘야함 - 서버 컨테이너의 host를 사용해야함
// const host = dev
//   ? "localhost"
//   : process.env.NEXT_PUBLIC_SOCKET_HOST || "localhost";
// const port = dev ? 3000 : Number(process.env.NEXT_PUBLIC_SOCKET_PORT) || 3000;
const path = dev ? "localhost:3000" : process.env.NEXT_PUBLIC_SOCKET_HOST || "localhost";

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
