"use client";

import { io } from "socket.io-client";
import dotenv from "dotenv";

const dev = process.env.NODE_ENV !== "production";

const host = dev ? "localhost:3000" : process.env.NEXT_PUBLIC_HOSTNAME;

export const socket = io(`http://${host}/workspace`, {
  path: "/socket.io/",
});
