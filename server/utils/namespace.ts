import { Namespace, Server, Socket } from "socket.io";

const activeNamespaces = new Map<string, Namespace>();

export const initNS = <T = unknown>(
  io: Server,
  name: string,
  activeUsers: Map<string, Socket>,
  roomUsers: Map<string, Map<string, string>>,
  events?: string[],
) => {
  if (activeNamespaces.has(name)) {
    console.log(`namespace ${name} already exists`);
    return activeNamespaces.get(name);
  }

  const namespace = io.of(`/${name}`);
  activeNamespaces.set(name, namespace);

  // default namespace event handlers
  namespace.on("connection", (socket) => {
    console.log(`New connection to ${name} namespace`);
    console.log(`Socket ID: ${socket.id}`);
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
      console.log(
        "Duplicate connection detected. Disconnecting previous socket.",
      );
      activeUsers.get(userId)?.disconnect();
    }

    // connection starts
    activeUsers.set(userId, socket);
    console.log(`Active Users on ${name}: ${activeUsers.size}`);

    // Join room
    socket.join(roomId);

    socket.on("connect", () => {
      handleConnect(userId, roomId);
    });

    // join event - username
    socket.on("join", (username: string) => {
      handleJoin(userId, roomId, username);
    });

    // leave event - username
    socket.on("leave", (username: string) => {
      handleLeave(userId, roomId, username);
    });

    socket.on("disconnect", () => {
      handleDisconnect(userId, roomId);
    });

    // Custom events
    events?.forEach((event) => {
      socket.on(event, (input: T) => {
        namespace.to(roomId).emit(event, input);
      });
    });
  });

  const handleConnect = (userId: string, _roomId: string) => {
    console.log(`User ${userId} connected to ${name}`);
    console.log(`Active Users on ${name}: ${activeUsers.size}`);
  };

  const handleDisconnect = (userId: string, _roomId: string) => {
    activeUsers.delete(userId);
    console.log(`User ${userId} disconnected from ${name}`);
    console.log(`Active Users on ${name}: ${activeUsers.size}`);
    // 갑자기 leave없이 disconnect 되는 경우 가능한가? 그런 경우 발견하면 아래 force leave
    // handleLeave(userId, roomId);
  };

  const handleUsers = (roomId: string) => {
    const room = roomUsers.get(roomId);
    if (room) {
      const users = Array.from(room.values());
      namespace.to(roomId).emit("users", users);
      console.log(`Users in room ${roomId}: ${users}`);
    } else {
      namespace.to(roomId).emit("users", []);
      console.log(`No users in room ${roomId}`);
    }
  };

  const handleLeave = (userId: string, roomId: string, username?: string) => {
    const room = roomUsers.get(roomId);
    const user = username ? username : room?.get(userId);
    if (room && user) {
      room.delete(userId);
      console.log(`User ${user} left room ${roomId}`);
      namespace.to(roomId).emit("leave", user);
    }
    handleUsers(roomId);
  };

  const handleJoin = (userId: string, roomId: string, username: string) => {
    const room = roomUsers.get(roomId);
    if (!room) {
      roomUsers.set(roomId, new Map());
    }
    roomUsers.get(roomId)?.set(userId, username);
    namespace.to(roomId).emit("join", username);
    console.log(`User ${username} joined room ${roomId}`);
    handleUsers(roomId);
  };

  return namespace;
};
