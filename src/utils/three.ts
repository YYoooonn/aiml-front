// const EULER_ORDER = ["XYZ", "XZY", "YXZ", "YZX", "ZXY", "ZYX"];

import { BoxGeometry, MeshNormalMaterial } from "three";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils";
import { seededRandom } from "three/src/math/MathUtils";

interface Position {
  position: [x: number, y: number, z: number];
}

export const randomPositions = (seed: number) =>
  Array.from({ length: 10 }).map((_, j) => getRandPos(5, j * seed));
export const randomRotations = (seed: number) =>
  Array.from({ length: 10 }).map((_, j) => getRandRotation(j * seed));

export function getRandNumber(input: number) {
  return Math.random() * input;
}

export function getRandPos(input: number, seed?: number): Position["position"] {
  if (seed) {
    return [
      (seededRandom(seed) - 0.5) * input,
      (seededRandom(seed + 1) - 0.5) * input,
      (seededRandom(seed + 2) - 0.5) * input,
    ];
  } else {
    return [
      Math.random() * input,
      Math.random() * input,
      Math.random() * input,
    ];
  }
}

export function getRandColor() {
  return "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");
}

export function getRandRotation(seed?: number): Position["position"] {
  if (seed) {
    return [
      seededRandom(seed) * 3,
      seededRandom(seed + 1) * 3,
      seededRandom(seed + 2) * 3,
    ];
  } else {
    return [Math.random() * 3, Math.random() * 3, Math.random() * 3];
  }
}

export function createRandomObject() {
  const randomBox = mergeVertices(new BoxGeometry(1, 1, 1));
  const randomMaterial = new MeshNormalMaterial();
  const randPosition = getRandPos(5);
  const randRot = getRandRotation();
  return {
    geometry: randomBox,
    material: randomMaterial,
    others: {
      position: randPosition,
      rotation: randRot,
    },
  };
}
