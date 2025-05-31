import { initNS } from "./utils/namespace";
import { Server, Socket } from "socket.io";

/*

activeUsers : {userId : socket} 
one chat socket per user
restricts to single room per user

roomUsers : {roomId : { socketId: username }}
map of users in a room
restricts to single user per room

*/

const activeUsers = new Map<string, Socket>();
const roomUsers = new Map<string, Map<string, string>>();

const NAME = "chat";

export const ChatSocket = (io: Server) => {
  // add custom events
  const customEvents = { default: ["chatMessage"] };

  // init namespace
  const chat = initNS(io, NAME, activeUsers, roomUsers, customEvents);

  // error catch
  chat?.once("error", (err) => {
    console.error(`Error in ${NAME} namespace:`, err);
    process.exit(1);
  });

  return chat;
};

// TODO 적정 시간 지나면 disable되고 connection 생기면 다시 열리는 구조로 변경 해보자
// https://stackoverflow.com/questions/13430505/do-i-have-to-remove-event-listener-when-socket-is-disconnected
//
//   // Reactivate namespace
//   namespace.on("connect", () => {
//     if (timeout) {
//       clearTimeout(timeout); // Cancel the timeout if a new connection occurs
//       timeout = undefined;
//       console.log(`Namespace ${name} reactivated.`);
//     }
//   });
// };
