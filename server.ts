import next from "next";

import { Server } from "socket.io";
import { createServer } from "node:http";
import { ChatSocket } from "./server/chat";

const dev = process.env.NODE_ENV !== "production";

if (!dev) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { config } = require("../.next/required-server-files.json");
  process.env.__NEXT_PRIVATE_STANDALONE_CONFIG = JSON.stringify(config);
}

const hostname = dev ? "localhost" : process.env.NEXT_PUBLIC_HOSTNAME;
const port = dev ? 3000 : Number(process.env.NEXT_PUBLIC_PORT || 3000);
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();


const socketHostname = dev ? "localhost" : process.env.SOCKET_CLIENT_HOST;
const socketPort = dev ? 3000 : Number(process.env.SOCKET_CLIENT_PORT || 3000);
app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer, {
    path: "/socket.io/",
    cors: {
      // 현재 동일 컨테이너 내에서 돌아가고 있기 때문에 localhost로 설정
      // 서버 분리할 경우, 따로 설정을 해줘야함 - 클라이언트 컨테이너의 host를 허용해야함
      origin: [`http://${socketHostname}`, `http://${socketHostname}:${socketPort}`],
      methods: ["GET", "POST"],
    },
    // addTrailingSlash: true
  });

  ChatSocket(io);

  // WorkspaceSocket(io, "workspace");

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      //console.debug(`> Ready on http://${hostname}:${port}`);
    });
});
