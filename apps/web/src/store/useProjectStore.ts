"use client";

import { create } from "zustand";
import { getProject, updateProject } from "@/app/actions/project";
import {
  addParticipant,
  deleteParticipant,
  getProjectParticipants,
  updateParticipant,
} from "@/app/actions/participant";
import {
  ParticipantData,
  ProjectData,
  ParticipantRole,
  Project,
} from "@/@types/api";

export interface PAction {
  reset: () => void;
  fetchProject: (pId?: string) => Promise<ProjectData | null>;
  updateProject: (project: Project) => Promise<Project | null>;

  // Participant manipulation
  fetchParticipants: () => Promise<Map<string, ParticipantData> | null>;
  updateParticipant: (
    username: string,
    role: ParticipantRole,
  ) => Promise<Map<string, ParticipantData> | null>;
  removeParticipant: (
    username: string,
  ) => Promise<Map<string, ParticipantData> | null>;
  addParticipant: (
    username: string,
    role: ParticipantRole,
  ) => Promise<ParticipantData | null>;
}

interface ProjectState extends ProjectData, PAction {
  participants: Map<string, ParticipantData>;
}

const emptyMap: Map<string, ParticipantData> = new Map();

const DEFAULT = {
  id: "",
  title: "",
  subtitle: "",
  createdAt: "",
  updatedAt: "",
  isPublic: true,

  participants: emptyMap,

  // TODO not implemented yet
};

export const useProjectStore = create<ProjectState>()((set, get) => ({
  ...DEFAULT,
  reset: () => set({ ...DEFAULT }),
  // setUser: (user) => set({user}),
  fetchProject: async (pId) => {
    const projectId = pId || get().id;
    if (!projectId) {
      return null;
    }
    const response = await getProject(projectId);
    if (response.success) {
      set({ ...response.data });
    }
    if (response.error) alert(response.error);
    return response.data;
  },
  fetchParticipants: async () => {
    const projectId = get().id;
    if (!projectId) {
      alert("Project ID is not set");
      return null;
    }
    const response = await getProjectParticipants(projectId);
    if (response.success) {
      const participants = new Map<string, ParticipantData>();
      response.data.forEach((p) => {
        participants.set(p.username, p);
      });
      set({ participants: participants });
      return participants;
    } else {
      alert(response.error);
      return null;
    }
  },
  updateParticipant: async (username: string, role: ParticipantRole) => {
    const projectId = get().id;
    if (!projectId) {
      alert("Project ID is not set");
      return get().participants;
    }
    const selected = get().participants.get(username);
    if (!selected) {
      alert("Participant not found");
      return get().participants;
    }
    const response = await updateParticipant(projectId, {
      username: selected.username,
      role: role,
    });
    if (response.success) {
      const participants = get().participants;
      participants.set(username, response.data);
      set({ participants: participants });
      return participants;
    } else {
      alert(response.error);
      return null;
    }
  },
  removeParticipant: async (username: string) => {
    const projectId = get().id;
    if (!projectId) {
      alert("Project ID is not set");
      return get().participants;
    }
    const selected = get().participants.get(username);
    if (!selected) {
      alert("Participant not found");
      return get().participants;
    }
    const response = await deleteParticipant(projectId, username);
    if (response.success) {
      const participants = get().participants;
      participants.delete(username);
      set({ participants: participants });
      return participants;
    }
    alert(response.error);
    return null;
  },
  addParticipant: async (username: string, role: ParticipantRole) => {
    const projectId = get().id;
    if (!projectId) {
      alert("Project ID is not set");
      return null;
    }
    const response = await addParticipant(projectId, {
      username: username,
      role: role,
    });
    if (response.success) {
      const participants = get().participants;
      participants.set(username, response.data);
      set({ participants: participants });
      return response.data;
    } else {
      alert(response.error);
      return null;
    }
  },
  updateProject: async (project: Project) => {
    const projectId = get().id;
    if (!projectId) {
      return null;
    }
    const res = await updateProject({ id: projectId, ...project });
    if (res.success) {
      set({ ...res.data });
      return res.data;
    }
    alert(res.error);
    return null;
  },
}));
