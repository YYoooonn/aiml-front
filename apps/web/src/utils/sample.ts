/* 백엔드랑 동일 환경 구성 */

import {
  ProjectData,
  UserData,
  TObject3DData,
  TGeometry,
  TMaterial,
} from "@/@types/api";
import {
  DEFAULT_BOX_FACES,
  DEFAULT_BOX_VERTICIES,
  DEFAULT_CONE_FACES,
  DEFAULT_CONE_VERTICIES,
  DEFAULT_SPHERE_FACES,
  DEFAULT_SPHERE_VERTICES,
} from "@/assets/geometry";
import { DEFAULT_MATERIAL } from "@/assets/material";
import { Matrix4Tuple } from "three";

export const SampleUser = (id?: string) => {
  return generateRandomUser(id);
};

export const SampleUsers = (count: number) => {
  return generateRandomUsers(count);
};
export const SampleProject = (id?: string) => {
  return generateRandomProject(id);
};
export const SampleProjects = (count: number) => {
  return generateRandomProjects(count);
};
export const SampleObject = (id?: string) => {
  return generateRandomObject(id);
};
export const SampleObjects = (count: number) => {
  return generateRandomObjects(count);
};

export const SampleToken = () => {
  return generateRandomToken();
};

function generateRandomUser(id?: string): UserData {
  return {
    username: generateRandomString(),
    firstName: generateRandomString(),
    lastName: generateRandomString(),
    createdAt: "2025-03-17T09:49:16.332093",
    updatedAt: "2025-03-17T09:49:06.985782",
    email: generateRandomString().concat("@gmail.com"),
  };
}

function generateRandomUsers(count: number) {
  return Array.from({ length: count }).map((_, i) =>
    generateRandomUser((i + 1).toString()),
  );
}

function generateRandomProject(id?: string): ProjectData {
  return {
    id: id ? id : "randomId",
    isPublic: true,
    title: generateRandomString(),
    subtitle: generateRandomString(),
    createdAt: "2025-03-17T09:49:16.332093",
    updatedAt: "2025-03-17T09:49:06.985782",
  };
}

function generateRandomProjects(count: number) {
  return Array.from({ length: count }).map((_, i) =>
    generateRandomProject(`${i + 1}`),
  );
}

function generateRandomObject(id?: string): TObject3DData {
  return {
    id: id ? id : generateRandomString(),
    type: "mesh",
    name: generateRandomString(),
    visible: true,
    parentId: null,
    createdAt: "2025-03-17T09:49:16.332093",
    updatedAt: "2025-03-17T09:49:06.985782",
    transform: generateRandomMatrix(),
    geometry: generateRandomGeometry(),
    material: generateRandomMaterial(),
  };
}

function generateRandomToken() {
  return generateRandomString();
}

function generateRandomObjects(count: number) {
  return Array.from({ length: count }).map((_, i) =>
    generateRandomObject(`${i + 1}`),
  );
}

function generateRandomString() {
  return Math.random().toString(36).substring(2, 11);
}

function generateRandomMatrix() {
  return Array.from({ length: 16 }, () => Math.random() * 10) as Matrix4Tuple;
}

function generateRandomGeometry(): TGeometry {
  const trigger = Math.floor(Math.random() * 3);
  if (trigger < 1) {
    return {
      type: "BoxGeometry",
      name: "untitled",
      vertices: DEFAULT_BOX_VERTICIES,
      faces: DEFAULT_BOX_FACES,
    };
  } else if (trigger < 2) {
    return {
      type: "SphereGeometry",
      name: "untitled",
      vertices: DEFAULT_SPHERE_VERTICES,
      faces: DEFAULT_SPHERE_FACES,
    };
  }
  return {
    type: "ConeGeometry",
    name: "untitled",
    vertices: DEFAULT_CONE_VERTICIES,
    faces: DEFAULT_CONE_FACES,
  };
}

function generateRandomMaterial(): TMaterial {
  return {
    ...DEFAULT_MATERIAL,
    color: generateRandomHexcolor(),
  };
}

function generateRandomHexcolor() {
  return "#".concat(
    Array.from({ length: 6 }, () =>
      Math.floor(Math.random() * 16 - 0.001).toString(16),
    ).join(""),
  );
}
