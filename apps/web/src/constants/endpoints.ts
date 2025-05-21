const BASE_URL =
  process.env.NEXT_PUBLIC_BFF_BASE_URL || "http://localhost:3000";

export const BFF_ENDPOINTS = {
  AUTH: "/api/external/auth",
  USER: "/api/external/user",
  PROJECT: "/api/external/project",
  SCENE: "/api/external/scene",
  OBJ3D: "/api/external/object3d",
  TEST: "/test",
  ARCHIVE: "/api/external/archive",
  PUBLIC: "/api/external/public",
};
