import { MeshNormalMaterial, MeshPhysicalMaterial } from "three";

// FIXME fix any
export const sampleMaterial = new MeshNormalMaterial();
export const blackMaterial = new MeshPhysicalMaterial({
  color: "#666666",
});

export const CAMERAMATERIAL = new MeshPhysicalMaterial();

export const DEFAULT_MATERIAL = {
  name: "untitled",
  color: "#575757",
  opacity: 1,
  transparent: false,
  map: null,
};
