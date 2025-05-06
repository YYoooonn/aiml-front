import { useGLTF } from "@react-three/drei";
import type { Mesh } from "three";

export const urlCam = "/models/cam.gltf";

useGLTF.preload(urlCam);

declare module "three-stdlib" {
  interface GLTF {
    // nodes는 파일 안에 들어있는 이름, 변경하려면 gltf 파일이 변경되야함
    nodes: {
      mesh_0: Mesh;
    };
  }
}
