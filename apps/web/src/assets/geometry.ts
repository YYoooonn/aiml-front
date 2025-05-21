import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import * as THREE from "three";
import { extractVerticesAndFaces } from "@/utils/three";
import { TVector3 } from "@/@types/api";

export const sampleBoxGeometry = mergeVertices(new THREE.BoxGeometry(1, 1, 1));
export const sampleSphereGeometry = new THREE.SphereGeometry(4);
export const sampleConeGeometry = new THREE.ConeGeometry(4, 8);

// FIXME any type
export const sampleCam = mergeVertices(new THREE.ConeGeometry(0.3, 0.3));

export const { vertices: DEFAULT_BOX_VERTICIES, faces: DEFAULT_BOX_FACES } =
  extractVerticesAndFaces(new THREE.BoxGeometry());
export const { vertices: DEFAULT_CONE_VERTICIES, faces: DEFAULT_CONE_FACES } =
  extractVerticesAndFaces(new THREE.ConeGeometry());
export const {
  vertices: DEFAULT_SPHERE_VERTICES,
  faces: DEFAULT_SPHERE_FACES,
} = extractVerticesAndFaces(new THREE.SphereGeometry());

export function getVerticesAndFaces(geoType: string): {
  v: TVector3[];
  f: number[][];
} {
  switch (geoType) {
    case "BoxGeometry":
      return { v: DEFAULT_BOX_VERTICIES, f: DEFAULT_BOX_FACES };
    case "SphereGeometry":
      return { v: DEFAULT_SPHERE_VERTICES, f: DEFAULT_SPHERE_FACES };
    case "ConeGeometry":
      return { v: DEFAULT_CONE_VERTICIES, f: DEFAULT_CONE_FACES };
    default:
      return { v: DEFAULT_BOX_VERTICIES, f: DEFAULT_BOX_FACES };
  }
}
