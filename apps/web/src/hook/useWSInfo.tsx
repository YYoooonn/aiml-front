"use client";

// import { useEffect, useState } from "react";
// import { useCameraStore } from "@/store/useCameraStore";
// import { useParticipants } from "@/store/useParticipants";
// import { useProjectStore } from "@/store/useProjectStore";
// import { socket } from "@/socket/workspace";

// type Position = [x: number, y: number, z: number];
// type Rotation = Array<number | string | undefined>;

// interface UserCamera {
//   [username: string]: { position: Position };
// }

interface SocketProps {
  roomId?: string;
  username?: string;
}

// NOT IMPLEMENTED
export const useWSInfo = (props: SocketProps) => {
  // const username = props.username ? props.username : "anonymous";
  // //   const [userId, setUserId] = useState("");
  // const [isConnected, setIsConnected] = useState(false);
  // const [transport, setTransport] = useState("N/A");
  // const camPosition = useCameraStore((state) => state.position);
  // const camRotation = useCameraStore((state) => state.rotation);
  // const participants = useParticipants((state) => state.participants);
  // const setParticipant = useParticipants((state) => state.setParticipant);
  // const setParticipants = useParticipants((state) => state.setParticipants);
  // const getObjects = useProjectStore((state) => state.getObjects);
  // const [isDragging, setIsDragging] = useState(false);
  // // track mouse movement
  // useEffect(() => {
  //   const handleMouseDown = () => setIsDragging(true);
  //   const handleMouseUp = () => setIsDragging(false);
  //   // FIXME
  //   // const handleWheelMove = (e) => setWheel(e)
  //   const handleMouseMove = () => {
  //     if (isDragging) {
  //       socket.emit("updateCam", {
  //         userId: socket.id,
  //         username: username,
  //         position: camPosition,
  //         rotation: camRotation,
  //       });
  //     }
  //   };
  //   window.addEventListener("mousedown", handleMouseDown);
  //   window.addEventListener("mouseup", handleMouseUp);
  //   window.addEventListener("mousemove", handleMouseMove);
  //   // window.addEventListener("wheel", handleWheelMove);
  //   return () => {
  //     window.removeEventListener("mousedown", handleMouseDown);
  //     window.removeEventListener("mouseup", handleMouseUp);
  //     window.removeEventListener("mousemove", handleMouseMove);
  //   };
  // }, [camPosition, isDragging]);
  // // useEffect(() => {
  // //   console.log("EMIT UPDATE PROJECT")
  // //   socket.emit("updatePRJT", "hello")
  // //   return () => {}
  // // }, [selected])
  // useEffect(() => {
  //   function onConnect() {
  //     setIsConnected(true);
  //     setTransport(socket.io.engine.transport.name);
  //   }
  //   function onDisconnect() {
  //     setIsConnected(false);
  //     setTransport("N/A");
  //   }
  //   socket.io.engine.on("upgrade", (transport) => {
  //     setTransport(transport.name);
  //   });
  //   if (socket.connected) {
  //     onConnect();
  //     socket.emit("join", {
  //       type: "join",
  //       username: username,
  //       position: camPosition,
  //       rotation: camRotation,
  //     });
  //     console.debug(socket.id);
  //   }
  //   socket.on("connect", onConnect);
  //   socket.on("disconnect", onDisconnect);
  //   function onSetCameraPosition(data: {
  //     userId: string;
  //     username: string;
  //     position: Position;
  //     rotation: Rotation;
  //   }) {
  //     //console.debug(msg);
  //     // console.log("setlog");
  //     if (data.userId !== socket.id) {
  //       setParticipant(data.userId, data.username, {
  //         position: data.position,
  //         rotation: data.rotation,
  //       });
  //     }
  //   }
  //   socket.on("updateCam", onSetCameraPosition);
  //   // USER update
  //   function onUsers(newUsers: Array<string>) {
  //     setParticipants(newUsers.filter((val) => val !== socket.id));
  //   }
  //   socket.on("users", onUsers);
  //   // UPDATE call
  //   function onUpdateCall(data: string) {
  //     console.debug("UPDATE CALL");
  //     // console.log(data);
  //     getObjects();
  //   }
  //   socket.on("updatePRJT", onUpdateCall);
  //   return () => {
  //     socket.off("connect", onConnect);
  //     socket.off("disconnect", onDisconnect);
  //     socket.off("updateCam", onSetCameraPosition);
  //     socket.off("users", onUsers);
  //   };
  // }, [username]);
  // // TODO not implemented yet
  // return {};
};
