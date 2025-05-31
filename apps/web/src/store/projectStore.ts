"use client";

import { create } from "zustand";
import { ParticipantData, ProjectData, SceneData } from "@/@types/api";

type ProjectState = ProjectData & {
  scenes: SceneData[];
  participants: ParticipantData[];
};

interface ProjectStore extends Partial<ProjectState> {
  title: string;
  isPublic: boolean;
  participants: ParticipantData[];
  scenes: SceneData[];

  setProject: (data: Partial<ProjectState>) => void;
  setParticipants: (data: ParticipantData[]) => void;
  setScenes: (data: SceneData[]) => void;
  clearProject: () => void;

  // api fetch 위임?
  // fetchAllProjectInfo: (projectId?: string) => Promise<boolean>
  // fetchProject: (projectId?: string) => Promise<boolean>;

  // createProject: (project?: ProjectData) => Promise<ProjectData?>;
  // updateProject: (project?: ProjectData) => Promise<ProjectData?>;
  // deleteProject: () => Promise<boolean>;
}

const emptyMap: Map<string, ParticipantData> = new Map();

const DEFAULT = {
  title: "",
  subtitle: "",
  createdAt: "",
  updatedAt: "",
  isPublic: true,

  // additional infos
  participants: [],
  scenes: [],
};

const projectStore = create<ProjectStore>()((set, get) => ({
  ...DEFAULT,
  setProject: (data) => {
    const safeInput = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== undefined),
    ) as Partial<ProjectData>;
    set({ ...get(), ...safeInput });
  },
  setScenes: (data) => set({ scenes: [...data] }),
  setParticipants: (data) => {
    set({ participants: data });
  },
  clearProject: () => set({ ...DEFAULT }),

  // fetchProject: async (projectId?: string) => {
  //     const id = projectId ?? get().id;
  //     if (!id) return false

  //     const project = await getProject(id);
  //     if(!project.success) return false

  //     get().setProject(project.data);
  //     return true
  // },

  // // fetch all info of project : scenes, participants, etc
  // fetchAllProjectInfo: async (projectId?: string) => {
  //     const id = projectId ?? get().id;
  //     if (!id) return false

  //     // 1. fetch project info
  //     const projectResponse = await getProject(id);
  //     if (!projectResponse.success) return false

  //     const project = projectResponse.data

  //     // 2. fetch scenes
  //     const sceneResponse = await getProjectScenes(id);
  //     if (!sceneResponse.success) return false
  //     const scenes = sceneResponse.data

  //     // 3. fetch participants
  //     const participantResponse = await getProjectParticipants(id);
  //     if (!participantResponse.success) return false

  //     const participants = participantResponse.data
  //     const participantMap = new Map<string, ParticipantData>();
  //     participants.forEach((p) => {
  //         participantMap.set(p.username, p);
  //     }
  //     )

  //     // 4. set all data
  //     set({
  //         ...project,
  //         scenes: scenes,
  //         participants: participantMap,
  //     })

  //     return true
  // }
}));

export default projectStore;
