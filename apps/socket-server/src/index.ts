import express from "express";
import { Server } from "socket.io";
import { createServer } from "node:http";
import { ChatSocket } from "./server/chat";
import { ProjectSocket } from "./server/project";

const dev = process.env.NODE_ENV !== "production";

// const hostname = dev ? "localhost" : process.env.NEXT_PUBLIC_HOSTNAME;
// const port = dev ? 3000 : Number(process.env.NEXT_PUBLIC_PORT || 3000);

// const socketHostname = dev ? "localhost" : process.env.SOCKET_CLIENT_HOST;
// const socketPort = dev ? 3001 : Number(process.env.SOCKET_CLIENT_PORT || 3001);
const app = express();
const httpServer = createServer(app);

const port = dev ? 3001 : Number(process.env.SOCKET_SERVER_PORT || 3001);

const allowedOrigins = [
  "http://localhost:3000",
  `http://${process.env.NEXT_PUBLIC_HOSTNAME}`,
];

const io = new Server(httpServer, {
  path: "/socket.io/",
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
  },
});

// socket 핸들러 등록
ChatSocket(io); 

ProjectSocket(io);

httpServer.listen(port, () => {
  console.log(`✅ Socket.IO server is running on http://localhost:${port}`);
});
