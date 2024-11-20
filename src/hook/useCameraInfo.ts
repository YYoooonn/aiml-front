"use client";

import { create } from "zustand";
import { Euler, Quaternion } from "@react-three/fiber";
import { EulerOrder } from "three";

export interface CameraInfo {
  position: [x: number, y: number, z: number];
  fov: number;
  aspect: number;
  far: number;
  zoom: number;
  rotation: [x: number, y: number, z: number, w: EulerOrder];
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
  setRotationXYZ: (
    x: CameraInfo["rotation"][0],
    y: CameraInfo["rotation"][1],
    z: CameraInfo["rotation"][2],
  ) => void;
  setY: (quaternion: CameraInfo["quaternion"][1]) => void;
}
type CameraStore = CameraInfo & CameraStoreAction;

export const DEFAULT: CameraInfo = {
  position: [0, 0, 20],
  fov: 50,
  aspect: 1,
  far: 2000,
  zoom: 1,
  rotation: [0, 0, 0, "XYZ"],
  quaternion: [0, 0, 0, 1],
};

export const useCameraInfo = create<CameraStore>()((set, get) => ({
  position: DEFAULT.position,
  fov: DEFAULT.fov,
  aspect: DEFAULT.aspect,
  far: DEFAULT.far,
  zoom: DEFAULT.zoom,
  rotation: DEFAULT.rotation,
  quaternion: DEFAULT.quaternion,

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
  setRotationXYZ: (x, y, z) =>
    set({
      rotation: [
        get().rotation[0] + x,
        get().rotation[1] + y,
        get().rotation[2] + z,
        get().rotation[3],
      ],
    }),
  setY: (y) =>
    set({
      quaternion: get().quaternion.splice(1, 1, y) as CameraInfo["quaternion"],
    }),
}));
