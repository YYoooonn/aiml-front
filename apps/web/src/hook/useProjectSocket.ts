"use client";

import { Socket } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import { generate } from "@/socket";
import { useScene } from "./useScene";
import { getObject3D } from "@/services/object3d";
import { useUser } from "./useUser";

type ObjectUpdateProps = {
    sceneId: string;
    objectId: string;
    type: "create" | "update" | "delete"
}

export const useProjectSocket = (username?: string, id?: string) => {
    const socketRef = useRef<Socket | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const { upsertChildren, removeChildren, projectId } = useScene()
    const { userInfo } = useUser();
    
    useEffect(() => {
        // Retrieve or generate a unique socket ID
        if (!userInfo.username || !projectId) {
            return;
        }

        const socket = generate("project", { roomId: projectId });
        socketRef.current = socket;

        // TODO : AUTH CHECK
        socket.connect();

        console.log("connecting to project space...");

        const onConnect = () => {
            setIsConnected(true);
            socket.emit("join", userInfo.username);
            console.log("connected to project space");
        };

        const onDisconnect = () => {
            setIsConnected(false);
        };

        const onObjectUpdate = async (data: ObjectUpdateProps) => {
            // Handle project updates here
            if (data.type === "update" || data.type === "create") {
                const response = await getObject3D(data.objectId)
                if (response.success) {
                    upsertChildren([response.data], data.sceneId);
                } else {
                    console.error("Failed to get object data", response.error);
                }
            } else if (data.type === "delete") {
                removeChildren([data.objectId], data.sceneId);
            }
        };

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);

        socket.on("objectUpdate", onObjectUpdate);

        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
            socket.off("objectUpdate", onObjectUpdate);
            socket.disconnect();
        }
    }, [projectId, userInfo.username]);

    const emitObjectUpdate = (data : ObjectUpdateProps) => {
        if (socketRef.current && isConnected) {
            socketRef.current.emit("objectUpdate", data);
        } else {
            console.warn("Socket is not connected, cannot send update");
        }
    }
    return {
        isConnected,
        emitObjectUpdate,
    };

}