import { Namespace } from "socket.io";
import { MSG } from "./types";

export const getRoomUsersArray = (usersRoom: Record<string, Record<string, string>>, roomId: string): string[] => {
  return usersRoom[roomId] ? Object.values(usersRoom[roomId]) : [];
};

export const handleParticipants = (
  ns: Namespace,
  usersRoom: Record<string, Record<string, string>>,
  roomId: string
) => {
  ns.to(roomId).emit("users", getRoomUsersArray(usersRoom, roomId));
};

export const handleChat = (ns: Namespace, roomId: string, msg: MSG) => {
  ns.to(roomId).emit("chatMessage", msg);
};
