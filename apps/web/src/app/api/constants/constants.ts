export const API_BASE_URL =
  process.env.BACKEND_API_ENDPOINT ?? "http://localhost.com:8080";

export const API_ENDPOINTS = {
  AUTH: `${API_BASE_URL}/api/auth`,
  USER: `${API_BASE_URL}/api/user`,
  PROJECT: `${API_BASE_URL}/api/project`,
  SCENE: `${API_BASE_URL}/api/scene`,
  OBJ3D: `${API_BASE_URL}/api/object3d`,
  TEST: `${API_BASE_URL}/test`,
  ARCHIVE: `${API_BASE_URL}/api/archive`,
  SEARCH: `${API_BASE_URL}/api/search`,
  PUBLIC: `${API_BASE_URL}/api/public`,
};

export const ABS_ENDPOINTS = {
  AUTH: `http://${process.env.NEXT_PUBLIC_HOSTNAME}:3000/api/external/auth`,
};
