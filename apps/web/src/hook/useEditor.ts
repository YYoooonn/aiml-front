"use client";

import { create } from "zustand";

type Position = [x: number, y: number, z: number];
export type Light = {
  type: "directional" | "spot";
  intensity: number;
  position: Position;
  color: string;
};

export interface EditorProps {
  background: {
    color: string;
  };
  cam: {
    position: Position;
    zoom: number;
    fov: number;
  };
  ambientLight: {
    intensity: number;
    color: string;
  };
  lights: Light[];
}
const DEFAULT = <EditorProps>{
  background: {
    color: "#000000",
  },
  cam: {
    position: [5, 10, 10] as Position,
    zoom: 1,
    fov: 60,
  },
  ambientLight: {
    intensity: 1,
    color: "#FFFFFF",
  },
  lights: [],
};

export interface EditorAction {
  setBackground: (bg: EditorProps["background"]) => void;
  setCamera: (cam: EditorProps["cam"]) => void;
  setCameraPosition: (pos: Position) => void;
  setCameraZoom: (val: number) => void;
  setAmbientLight: (lp: EditorProps["ambientLight"]) => void;
  addLight: (l: Light) => void;
}

export const useEditor = create<EditorProps & EditorAction>()((set, get) => ({
  ...DEFAULT,

  setBackground: (bg) => {
    set({ background: bg });
  },
  setCamera: (cam) => {
    set({ cam: cam });
  },
  setCameraPosition: (pos) => set({ cam: { ...get().cam, position: pos } }),
  setCameraZoom: (val) => set({ cam: { ...get().cam, zoom: val } }),
  setAmbientLight: (lp) => {
    set({ ambientLight: lp });
  },
  addLight: (l) => {
    set({ lights: [...get().lights, l] });
  },
}));
