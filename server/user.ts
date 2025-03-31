import { Server } from "socket.io";

type Position = Array<number>;

// socket with username
const usersRoom: {
  [key: string]: Array<{
    socketId: string;
    username: string;
    position: Position;
  }>;
} = { default: [] };

// camera position
// const userCamPosition: {
//   [key: string]: Array<{ socketId: string; position: Position }>;
// } = { default: [] };

function getUsernames(roomId: string) {
  // XXX: if roomId doesn't exist
  if (!usersRoom[roomId]) {
    return [];
  }
  return usersRoom[roomId].map((id) => ({
    username: id.username,
  }));
}

// function getCamPosition(roomId: string) {
//   // XXX: if roomId doesn't exist
//   if (!userCamPosition[roomId]) {
//     return [];
//   }
//   return userCamPosition[roomId].map((id) => ({
//     position: id.position,
//   }));
// }

export const UserSocket = (io: Server, name: string) => {
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
    //console.debug(roomId);

    // join room
    socket.join(roomId);
    // send message to room in the namespace
    socket.to(roomId).emit("join", {
      user: "system",
      chat: `user joined`,
    });

    namespace.to(roomId).emit("users", getUsernames(roomId));
    // debug
    console.debug(usersRoom[roomId]);

    // chat messages
    socket.on("chatMessage", (msg: { username: string; message: string }) => {
      //console.debug("message", msg);
      namespace.to(roomId).emit("chatMessage", msg);
    });

    socket.on(
      "join",
      (data: { username: string; type: string; position: Position }) => {
        // console.debug("join", data);
        if (!(roomId in usersRoom)) {
          usersRoom[roomId] = [];
        }
        const found = socket.id in usersRoom[roomId];
        if (data.type === "join" && !found) {
          console.log(`${data.username} joined the room`);
          usersRoom[roomId].push({
            socketId: socket.id,
            username: data.username,
            position: data.position,
          });
          namespace.to(roomId).emit("users", getUsernames(roomId));
          console.log(usersRoom[roomId]);
        }
      },
    );

    // on disconnect message
    socket.on("disconnect", () => {
      console.log("disconnect to room namespace");
      socket.leave(roomId);

      const user = usersRoom[roomId]?.find((val) => val.socketId === socket.id);
      console.log(`${user} left the room`);
      usersRoom[roomId] = usersRoom[roomId].filter(
        (ele) => ele.socketId !== socket.id,
      );
      namespace.to(roomId).emit("users", getUsernames(roomId));
    });
  });
};
