"use client";

import { SceneData, TObject3D, TObject3DData } from "@/@types/api";
import { getProjectScenes } from "@/app/actions/scene";
import { getScene, updateScene } from "@/app/actions/scene";
import { create } from "zustand";

interface SceneStore {
  selectedScene: SceneData | undefined;
  scenes: Map<string, SceneData>;
  children: TObject3DData[];
}

interface SceneState extends SceneStore {
  reset: () => void;

  // Scene manipulation
  setSelected: (sceneId: string | null) => void;
  fetchScenes: (projectId: string) => Promise<SceneData[]>;
  fetchSelected: () => Promise<SceneData | null>;
  updateSelected: (projectId: string) => Promise<SceneData | undefined>;

  // Object3D manipulation
  addObject3D: (child: TObject3DData) => TObject3DData | null;
  removeObject3D: (id: string) => void;
  updateObject3D: (updated: TObject3DData) => TObject3D | null;
}

const emptyMap: Map<string, SceneData> = new Map();

const DEFAULT: SceneStore = {
  selectedScene: undefined,
  scenes: emptyMap,
  children: [],
};

export const useSceneStore = create<SceneState>()((set, get) => ({
  ...DEFAULT,
  reset: () => set({ ...DEFAULT }),
  fetchScenes: async (projectId: string) => {
    const response = await getProjectScenes(projectId);
    if (response.success) {
      const scenes = new Map<string, SceneData>();
      response.data.forEach((scene) => {
        scenes.set(scene.id, scene);
      });
      set({
        scenes: scenes,
        selectedScene: response.data[0],
        children: response.data[0]?.children || [],
      });
    }
    return response.data;
  },
  setSelected: (sceneId: string | null) => {
    const { scenes } = get();
    if (sceneId) {
      const selected = scenes.get(sceneId);
      set({ selectedScene: selected, children: selected?.children || [] });
    } else {
      set({ selectedScene: undefined });
    }
    return get().selectedScene;
  },
  fetchSelected: async () => {
    const { selectedScene } = get();
    if (selectedScene) {
      const response = await getScene(selectedScene.id);
      if (response.success) {
        return response.data;
      }
    }
    return null;
  },
  updateSelected: async (projectId: string) => {
    const { selectedScene } = get();
    if (selectedScene) {
      const response = await updateScene({
        projectId: projectId,
        ...selectedScene,
      });
      if (response.success) {
        set({ selectedScene: response.data, children: response.data.children });
        return response.data;
      } else {
        console.error(response.error);
      }
    }
    return get().selectedScene;
  },

  // Object3D manipulation
  addObject3D: (child: TObject3DData) => {
    const { selectedScene } = get();
    if (selectedScene) {
      const updatedScene = {
        ...selectedScene,
        children: [...selectedScene.children, child],
      };
      set({ selectedScene: updatedScene, children: updatedScene.children });
      return child;
    }
    console.log("No scene selected");
    return null;
  },
  removeObject3D: (id: string) => {
    const { selectedScene } = get();
    if (selectedScene) {
      const updatedScene = {
        ...selectedScene,
        children: selectedScene.children.filter((child) => child.id !== id),
      };
      set({ selectedScene: updatedScene, children: updatedScene.children });
      // need success call
    }
    console.log("No scene selected");
  },
  updateObject3D: (updated: TObject3DData) => {
    const { selectedScene } = get();
    if (selectedScene) {
      const updatedScene = {
        ...selectedScene,
        children: selectedScene.children.map((child) =>
          child.id === updated.id ? updated : child,
        ),
      };
      set({ selectedScene: updatedScene, children: updatedScene.children });
      return updated;
    }
    console.log("No scene selected");
    return null;
  },
}));
