"use client";

import { create } from "zustand";

export interface CameraInfo {
  position: Array<number>;
  fov: number;
  aspect: number;
  far: number;
  zoom: number;
  rotation: Array<number | string | undefined>;
  quaternion: [x: number, y: number, z: number, w: number];
}

interface CameraStoreAction {
  // setUser: (user: UserStoreState) => void;
  setPosition: (position: CameraInfo["position"]) => void;
  setFov: (fov: CameraInfo["fov"]) => void;
  setAspect: (aspect: CameraInfo["far"]) => void;
  setFar: (far: CameraInfo["fov"]) => void;
  setZoom: (zoom: CameraInfo["zoom"]) => void;
  setRotation: (rotation: CameraInfo["rotation"]) => void;
  setQuaternion: (quaternion: CameraInfo["quaternion"]) => void;
  setQuaternionXYZ: (
    x: CameraInfo["quaternion"][0],
    y: CameraInfo["quaternion"][1],
    z: CameraInfo["quaternion"][2],
  ) => void;
  setY: (quaternion: CameraInfo["quaternion"][1]) => void;
}
type CameraStore = CameraInfo & CameraStoreAction;

export const DEFAULT: CameraInfo = {
  position: [0, 0, 0],
  fov: 50,
  aspect: 1,
  far: 2000,
  zoom: 1,
  rotation: [0, 0, 0, "XYZ"],
  quaternion: [0, 0, 0, 1],
};

export const useCameraInfo = create<CameraStore>()((set, get) => ({
  ...DEFAULT,

  // setUser: (user) => set({user}),
  setPosition: (position) => set({ position }),
  setFov: (fov) => set({ fov }),
  setAspect: (aspect) => set({ aspect }),
  setFar: (far) => set({ far }),
  setZoom: (zoom) => set({ zoom }),
  setRotation: (rotation) => set({ rotation }),
  setQuaternion: (quaternion) => set({ quaternion }),
  setQuaternionXYZ: (x, y, z) =>
    set({
      quaternion: [
        get().quaternion[0] + x,
        get().quaternion[1] + y,
        get().quaternion[2] + z,
        get().quaternion[3],
      ],
    }),
  setY: (y) =>
    set({
      quaternion: get().quaternion.splice(1, 1, y) as CameraInfo["quaternion"],
    }),
}));
