import * as THREE from "three";

export const DEFAULT_MATRIX = new THREE.Matrix4().toArray();

export const JWT_COOKIE_NAME = process.env.JWT_COOKIE_NAME || "jwt_token";
