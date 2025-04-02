import { DefaultEventsMap, Namespace, Server, Socket } from "socket.io";

const activeNamespaces = new Map<string, Namespace>(); // Manage active namespaces

type TSocket = Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;

interface UserMessage {
  username: string;
  message?: string;
  type?: string;
}

type MSG = UserMessage | string;

export const ChatSocket = (io: Server, name: string) => {
  let usersRoom: Record<string, Record<string, string>> = {}; // roomId -> { socketId: username }
  const activeUsers = new Map<string, Socket>();
  let timeout: NodeJS.Timeout | undefined;

  // Helper function: Get all users in a room
  const getRoomUsersArray = (roomId: string): string[] => {
    return usersRoom[roomId] ? Object.values(usersRoom[roomId]) : [];
  };

  // Helper function: Handle participants update
  const handleParticipants = (namespace: Namespace, roomId: string) => {
    namespace.to(roomId).emit("users", getRoomUsersArray(roomId));
  };

  // Helper function: Handle chat messages
  const handleChat = (namespace: Namespace, roomId: string, msg: MSG) => {
    namespace.to(roomId).emit("chatMessage", msg);
  };

  // Helper function: Handle user disconnection
  const handleDisconnect = (
    namespace: Namespace,
    userId: string,
    roomId: string
  ) => {
    activeUsers.delete(userId);

    if (usersRoom[roomId]) {
      const username = usersRoom[roomId][userId];
      delete usersRoom[roomId][userId];
      handleChat(namespace, roomId, `${username} left the room`);
      handleParticipants(namespace, roomId);
    }

    if (activeUsers.size === 0) {
      timeout = setTimeout(() => {
        console.log(`Namespace ${name} is inactive. Marking as inactive.`);
        namespace.removeAllListeners(); // Remove listeners to save resources
      }, 30000); // 30 seconds timeout
    }
  };

  // Initialize namespace
  if (activeNamespaces.has(name)) {
    console.log("Chat Socket already exists");
    return activeNamespaces.get(name);
  }

  const namespace = io.of(`/${name}`);
  activeNamespaces.set(name, namespace);

  namespace.on("connection", (socket) => {
    const { userId, roomId } = socket.handshake.query as {
      userId: string;
      roomId: string;
    };

    if (!userId || !roomId) {
      console.log("Invalid connection: Missing userId or roomId");
      socket.disconnect();
      return;
    }

    // Handle duplicate connections
    if (activeUsers.has(userId)) {
      console.log("Duplicate connection detected. Disconnecting previous socket.");
      activeUsers.get(userId)?.disconnect();
    }

    activeUsers.set(userId, socket);
    if (timeout) {
      clearTimeout(timeout); // Clear namespace timeout
      timeout = undefined;
    }
    console.log("Active Users:", activeUsers.size);

    // Join room
    socket.join(roomId);
    handleParticipants(namespace, roomId);

    // Event listeners
    socket.on("chatMessage", (msg: MSG) => {
      handleChat(namespace, roomId, msg);
    });

    socket.on("join", (msg: UserMessage) => {
      if (!usersRoom[roomId]) usersRoom[roomId] = {};
      if (msg.type === "join" && !usersRoom[roomId][userId]) {
        usersRoom[roomId][userId] = msg.username;
        handleChat(namespace, roomId, `${msg.username} joined the room`);
        handleParticipants(namespace, roomId);
      }
    });

    socket.on("disconnect", () => handleDisconnect(namespace, userId, roomId));
  });

  // Reactivate namespace
  namespace.on("connect", () => {
    if (timeout) {
      clearTimeout(timeout); // Cancel the timeout if a new connection occurs
      timeout = undefined;
      console.log(`Namespace ${name} reactivated.`);
    }
  });
};
