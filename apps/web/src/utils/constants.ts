import * as THREE from "three";

export const DEFAULT_MATRIX = new THREE.Matrix4().toArray();

export const JWT_COOKIE_KEY = process.env.JWT_COOKIE_KEY || "jwt_token";
