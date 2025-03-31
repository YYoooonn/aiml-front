import { Server } from "socket.io";

// Users in a room
const usersRoom: {
  [key: string]: Array<{ socketId: string; username: string }>;
} = { default: [] };

function getRoomUsersArray(roomId: string) {
  // XXX: if roomId doesn't exist
  if (!usersRoom[roomId]) {
    return [];
  }
  return usersRoom[roomId].map((id) => ({
    username: id.username,
  }));
}

export const ChatSocket = (io: Server, name: string) => {
  const namespace = io.of(`/${name}`);

  // NAMESPACE
  namespace.on("connection", (socket) => {
    const req = socket.request;
    const {
      headers: { referer },
    } = req;

    // parse info from uri
    const roomId = referer
      ? referer.split("/")[referer.split("/").length - 1].replace(/\?.+/, "")
      : "default";
    console.debug("roomid", roomId);

    // join room
    socket.join(roomId);
    // send message to room in the namespace
    socket.to(roomId).emit("join", {
      user: "system",
      chat: `user joined`,
    });

    namespace.to(roomId).emit("users", getRoomUsersArray(roomId));
    // debug
    console.debug(usersRoom[roomId]);

    // chat messages
    socket.on("chatMessage", (msg: { username: string; message: string }) => {
      //console.debug("message", msg);
      namespace.to(roomId).emit("chatMessage", msg);
    });

    socket.on("join", (msg: { username: string; type: string }) => {
      // console.debug("join", msg);
      if (!(roomId in usersRoom)) {
        usersRoom[roomId] = [];
      }
      const found = socket.id in usersRoom[roomId];
      if (msg.type === "join" && !found) {
        namespace
          .to(roomId)
          .emit("chatMessage", `${msg.username} joined the room`);
        usersRoom[roomId].push({ socketId: socket.id, username: msg.username });
        namespace.to(roomId).emit("users", getRoomUsersArray(roomId));
        console.log(usersRoom[roomId]);
      }
    });

    // on disconnect message
    socket.on("disconnect", () => {
      console.log("disconnect to room namespace");
      socket.leave(roomId);

      const user = usersRoom[roomId]?.find((val) => val.socketId === socket.id);
      namespace
        .to(roomId)
        .emit("chatMessage", `${user?.username} leaved the room`);
      usersRoom[roomId] = usersRoom[roomId]?.filter(
        (ele) => ele.socketId !== socket.id,
      );
      namespace.to(roomId).emit("users", getRoomUsersArray(roomId));
    });
  });
};
