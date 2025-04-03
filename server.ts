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
const port = dev ? 3000 : Number(process.env.PORT || 3000);
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer, {
    path: "/socket.io/",
    cors: {
      origin: [`http://${hostname}`, `http://${hostname}:${port}`],
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
