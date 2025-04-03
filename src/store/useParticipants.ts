"use client";

import { create } from "zustand";

interface UserCamera {
  position: [x: number, y: number, z: number];
  fov?: number;
  aspect?: number;
  far?: number;
  zoom?: number;
  rotation?: Array<number | string | undefined>;
  quaternion?: Array<number>;
}

interface Participants {
  [userId: string]: { username: string; camera: UserCamera };
}

interface ParticipantsAction {
  getCameras: () => Array<UserCamera>;
  setParticipants: (userIds: Array<string>) => void;
  setParticipant: (
    userId: string,
    username: string,
    camera: UserCamera,
  ) => void;
  setCamera: (userId: string, username: string, camera: UserCamera) => void;
}

interface ParticipantStorage {
  participants: Participants;
  cameras: UserCamera[];
}

export const useParticipants = create<
  ParticipantStorage & ParticipantsAction
>()((set, get) => ({
  participants: {},
  cameras: [],
  setParticipants: (userIds) => {
    const participants = get().participants;
    Object.keys(participants).forEach((user) => {
      if (!(user in userIds)) {
        delete participants[user];
      }
    });
    set({ participants: participants });
    set({ cameras: Object.values(participants).map((p) => p.camera) });
  },
  setParticipant: (userId, username, camera) => {
    const participants = get().participants;
    participants[userId] = { username: username, camera: camera };
    set({ participants: participants });
    set({ cameras: Object.values(participants).map((p) => p.camera) });
  },
  getCameras: () => Object.values(get().participants).map((p) => p.camera),
  setCamera: (userId, username, camera) => {
    const participants = get().participants;
    if (!(userId in participants)) {
      get().setParticipant(userId, username, camera);
    }
    participants[userId] = { ...participants[userId], camera: camera };
    set({ participants: participants });
  },
}));
