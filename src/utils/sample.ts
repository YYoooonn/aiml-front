/* 백엔드랑 동일 환경 구성 */

export interface TUser extends Omit<UserData, "id"> {
  userId: number;
}

export interface TProject extends Omit<ProjectData, "id"> {
  projectId: number;
}

export interface TObject extends Omit<TObjectData, "id"> {
  objectId: number;
}

export const SampleUser = (id?: number) => {
  return generateRandomUser(id);
};

export const SampleUsers = (count: number) => {
  return generateRandomUsers(count);
};
export const SampleProject = (id?: number) => {
  return generateRandomProject(id);
};
export const SampleProjects = (count: number) => {
  return generateRandomProjects(count);
};
export const SampleObject = (id?: number) => {
  return generateRandomObject(id);
};
export const SampleObjects = (count: number) => {
  return generateRandomObjects(count);
};

export const SampleToken = () => {
  return generateRandomToken();
};

function generateRandomUser(id?: number): TUser {
  return {
    userId: id ? id : 1,
    username: generateRandomString(),
    firstName: generateRandomString(),
    lastName: generateRandomString(),
    createdAt: "2025-03-17T09:49:16.332093",
    lastModifiedAt: "2025-03-17T09:49:06.985782",
    email: generateRandomString().concat("@gmail.com"),
  };
}

function generateRandomUsers(count: number) {
  return Array.from({ length: count }).map((_, i) => generateRandomUser(i + 1));
}

function generateRandomProject(id?: number): TProject {
  return {
    projectId: id ? id : 1,
    isPublic: true,
    title: generateRandomString(),
    subtitle: generateRandomString(),
    createdAt: "2025-03-17T09:49:16.332093",
    lastModifiedAt: "2025-03-17T09:49:06.985782",
  };
}

function generateRandomProjects(count: number) {
  return Array.from({ length: count }).map((_, i) =>
    generateRandomProject(i + 1),
  );
}

function generateRandomObject(id?: number): TObject {
  return {
    objectId: id ? id : 1,
    createdAt: "2025-03-17T09:49:16.332093",
    lastModifiedAt: "2025-03-17T09:49:06.985782",
    matrix: generateRandomMatrix(),
    geometry: generateRandomGeometry(),
    material: generateRandomHexcolor(),
  };
}

function generateRandomToken() {
  return generateRandomString();
}

function generateRandomObjects(count: number) {
  return Array.from({ length: count }).map((_, i) =>
    generateRandomObject(i + 1),
  );
}

function generateRandomString() {
  return Math.random().toString(36).substring(2, 11);
}

function generateRandomMatrix() {
  return Array.from({ length: 16 }, () => Math.random() * 10);
}

function generateRandomGeometry() {
  const trigger = Math.floor(Math.random() * 3);
  if (trigger < 1) {
    return "ConeGeometry";
  } else if (trigger < 2) {
    return "SphereGeometry";
  }
  return "CubeGeometry";
}

function generateRandomHexcolor() {
  return "#".concat(
    Array.from({ length: 6 }, () =>
      Math.floor(Math.random() * 16 - 0.001).toString(16),
    ).join(""),
  );
}
