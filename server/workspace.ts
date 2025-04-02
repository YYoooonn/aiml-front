import { Server } from "socket.io";

type Position = Array<number>;
type Rotation = Array<number | string | undefined>;

// Users in a room
const userCamPosition: {
  [key: string]: {
    [socketId: string]: { position: Position; rotation: Rotation };
  };
} = {};

function getUsers(roomId: string) {
  // XXX: if roomId doesn't exist
  if (!userCamPosition[roomId]) {
    return [];
  }
  return Object.keys(userCamPosition[roomId]);
}

export const WorkspaceSocket = (io: Server, name: string) => {
  const namespace = io.of(`/${name}`);

  // NAMESPACE
  namespace.on("connection", (socket) => {
    const req = socket.request;
    const {
      headers: { referer },
    } = req;

    console.log("PROJECT");

    // parse info from uri
    const roomId = referer
      ? referer.split("/")[referer.split("/").length - 1].replace(/\?.+/, "")
      : "default";
    console.debug("Project Socket", roomId);

    // join room
    socket.join(roomId);
    // send message to room in the namespace
    socket.to(roomId).emit("join", {
      user: "system",
      chat: `user joined`,
    });

    //
    namespace.to(roomId).emit("users", getUsers(roomId));
    // debug
    // console.debug(userCamPosition[roomId]);

    // on camera update
    socket.on(
      "updateCam",
      (data: {
        userId: string;
        username: string;
        position: Position;
        rotation: Rotation;
      }) => {
        //console.debug("message", msg);
        namespace.to(roomId).emit("updateCam", data);
        userCamPosition[roomId][socket.id] = {
          position: data.position,
          rotation: data.rotation,
        };
      },
    );

    socket.on("updatePRJT", () => {
      namespace.to(roomId).emit("updatePRJT");
      console.debug("SOCKET UPDATE CALL from ", socket.id);
      console.debug("UPDATE CALL FROM SERVER SOCKET");
    });

    socket.on(
      "join",
      (data: {
        username: string;
        type: string;
        position: Position;
        rotation: Rotation;
      }) => {
        if (!(roomId in userCamPosition)) {
          userCamPosition[roomId] = {};
        }
        const found = socket.id in userCamPosition[roomId];
        if (data.type === "join" && !found) {
          namespace.to(roomId).emit("updateCam", {
            userId: socket.id,
            username: data.username,
            postion: data.position,
          });
          userCamPosition[roomId][socket.id] = {
            position: data.position,
            rotation: data.rotation,
          };
          namespace.to(roomId).emit("users", getUsers(roomId));
        }
      },
    );

    // on disconnect message
    socket.on("disconnect", () => {
      console.log("disconnect to room namespace");
      socket.leave(roomId);

      if (roomId in userCamPosition && socket.id in userCamPosition[roomId]) {
        delete userCamPosition[roomId][socket.id];
      }

      namespace.to(roomId).emit("users", getUsers(roomId));
    });
  });
};
