import { DefaultEventsMap, Namespace, Socket } from "socket.io";

export type TSocket = Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;

export interface UserMessage {
  username: string;
  message?: string;
  type?: string;
}

export type MSG = UserMessage | string;
