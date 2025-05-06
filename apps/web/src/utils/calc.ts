import * as THREE from "three";
import { DEFAULT_MATRIX } from "./constants";

export function toMatrix(
  position: number[],
  rotation: number[],
  scale: number[],
) {
  const pos = new THREE.Vector3(position[0], position[1], position[2]);
  const quat = new THREE.Quaternion(rotation[0], rotation[1], rotation[2]);
  const sc = new THREE.Vector3(scale[0], scale[1], scale[2]);
  return new THREE.Matrix4().compose(pos, quat, sc).toArray();
}

export function convertMatrix(input: number[]) {
  if (input.length !== 16) {
    return DEFAULT_MATRIX;
  } else {
    return input;
  }
}

export function toMatrix4(input: number[]) {
  return new THREE.Matrix4().fromArray(input);
}

interface Output {
  position: [x: number, y: number, z: number];
  scale: [x: number, y: number, z: number];
  rotation: [x: number, y: number, z: number];
}

export function toMatrix4decompose(input: number[]): Output {
  const pos = new THREE.Vector3();
  const quat = new THREE.Quaternion();
  const scale = new THREE.Vector3();
  const matrix = new THREE.Matrix4().fromArray(input);
  matrix.decompose(pos, quat, scale);

  return {
    position: [pos.x, pos.y, pos.z],
    scale: [scale.x, scale.y, scale.z],
    rotation: [quat.x, quat.y, quat.z],
  };
}
