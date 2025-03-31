import { MeshNormalMaterial, MeshPhysicalMaterial } from "three";

// FIXME fix any
export const sampleMaterial = new MeshNormalMaterial();
export const blackMaterial = new MeshPhysicalMaterial({
  color: "#666666",
});

export const CAMERAMATERIAL = new MeshPhysicalMaterial();
