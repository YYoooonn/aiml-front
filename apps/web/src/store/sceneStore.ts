import { SceneData, TObject3DData } from "@/@types/api";
import { create } from "zustand";

type SceneState = SceneData & {
  selectedSceneId: string | undefined;
};

type SceneStore = Partial<SceneState> & {
  name: string;
  type: "SCENE";
  children: TObject3DData[];

  setScene: (data?: Partial<SceneState>) => void;
  setSelectedSceneId: (id: string | undefined) => void;
  clearSelected: () => void;
};

const sceneStore = create<SceneStore>()((set, get) => ({
  name: "",
  type: "SCENE",
  children: [],

  // selected state
  selectedSceneId: undefined,
  selectedObjectIds: [],

  setScene: (data) => {
    if (!data) return;
    const safeInput = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== undefined),
    ) as Partial<SceneData>;
    set({ ...get(), ...safeInput });
  },
  setSelectedSceneId: (id) => set({ selectedSceneId: id }),
  clearSelected: () => set({ selectedSceneId: undefined }),
}));

export default sceneStore;
