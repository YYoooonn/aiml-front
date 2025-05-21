// const EULER_ORDER = ["XYZ", "XZY", "YXZ", "YZX", "ZXY", "ZYX"];

import { TVector3 } from "@/@types/api";
import * as THREE from "three";
import { mergeVertices } from "three-stdlib";
import { seededRandom } from "three/src/math/MathUtils.js";

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
  const randomBox = mergeVertices(new THREE.BoxGeometry(1, 1, 1));
  const randomMaterial = new THREE.MeshNormalMaterial();
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

export function createBufferGeometry(
  vertices: TVector3[],
  faces: number[][],
): THREE.BufferGeometry {
  const geometry = new THREE.BufferGeometry();

  // 1. vertices를 Float32Array로 변환
  const positionArray = new Float32Array(vertices.length * 3); // x, y, z
  vertices.forEach((v, i) => {
    positionArray[i * 3] = v[0];
    positionArray[i * 3 + 1] = v[1];
    positionArray[i * 3 + 2] = v[2];
  });

  // 2. faces를 index로 변환
  const indexArray = new Uint16Array(faces.length * 3); // 삼각형 면마다 3개 인덱스
  faces.forEach((f, i) => {
    indexArray[i * 3] = f[0] ?? 0;
    indexArray[i * 3 + 1] = f[1] ?? 0;
    indexArray[i * 3 + 2] = f[2] ?? 0;
  });

  // 3. BufferGeometry에 세팅
  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positionArray, 3),
  );
  geometry.setIndex(new THREE.BufferAttribute(indexArray, 1));

  // 4. 노멀 자동 계산 (optional)
  geometry.computeVertexNormals();

  return geometry;
}

export function extractVerticesAndFaces(geometry: THREE.BufferGeometry): {
  vertices: TVector3[];
  faces: number[][];
} {
  const position = geometry.getAttribute("position");
  const index = geometry.getIndex();

  const vertices: TVector3[] = [];
  for (let i = 0; i < position.count; i++) {
    vertices.push([
      position.getX(i),
      position.getY(i),
      position.getZ(i),
    ] as TVector3);
  }

  const faces: number[][] = [];
  if (index) {
    for (let i = 0; i < index.count; i += 3) {
      faces.push([index.getX(i), index.getX(i + 1), index.getX(i + 2)]);
    }
  }

  return { vertices, faces };
}

export function sceneTreeBuilder(scene: THREE.Object3D): {
  name: string;
  type: string;
  children: any[];
} {
  const { name, type, children } = scene;
  const childList = children.map((child) => sceneTreeBuilder(child));
  return { name, type, children: childList };
}
