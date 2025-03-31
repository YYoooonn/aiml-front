import { BoxGeometry, ConeGeometry, SphereGeometry } from "three";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";
export const sampleBoxGeometry = mergeVertices(new BoxGeometry(1, 1, 1));
export const sampleSphereGeometry = new SphereGeometry(4);
export const sampleConeGeometry = new ConeGeometry(4, 8);

// FIXME any type
export const sampleCam = mergeVertices(new ConeGeometry(0.3, 0.3));
