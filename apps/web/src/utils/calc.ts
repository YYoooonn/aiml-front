import * as THREE from "three";
import { DEFAULT_MATRIX } from "./constants";
import { TTransform } from "@/@types/api";

export function toMatrix(transform: TTransform) {
  const pos = new THREE.Vector3(
    transform.position[0],
    transform.position[1],
    transform.position[2],
  );
  const quat = new THREE.Quaternion().setFromEuler(
    new THREE.Euler(
      transform.rotation[0],
      transform.rotation[1],
      transform.rotation[2],
      "XYZ",
    ),
  );
  const sc = new THREE.Vector3(
    transform.scale[0],
    transform.scale[1],
    transform.scale[2],
  );
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

  const euler = new THREE.Euler().setFromQuaternion(quat, "XYZ"); // or 'YXZ', etc.
  return {
    position: [pos.x, pos.y, pos.z],
    scale: [scale.x, scale.y, scale.z],
    rotation: [euler.x, euler.y, euler.z],
  };
}
