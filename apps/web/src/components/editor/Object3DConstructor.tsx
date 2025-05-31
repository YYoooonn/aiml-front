import { useEffect, useState } from "react";
import { ObjectConstructor, EditorHeader } from "@repo/ui/components/editor";
import { useObject3D } from "@/hook/useObject3D";
import { DEFAULT_GEOMETRY, DEFAULT_TRANSFORM } from "@/assets/geometry";
import { DEFAULT_MATERIAL } from "@/assets/material";
import {
  Object3DType,
  TGeometry,
  TMaterial,
  TObject3DData,
} from "@/@types/api";
import { toMatrix } from "@/utils/calc";

type GEOMETRY_TYPE = "BoxGeometry" | "SphereGeometry" | "ConeGeometry";

const GEOMETRY_OPTIONS: GEOMETRY_TYPE[] = [
  "BoxGeometry",
  "SphereGeometry",
  "ConeGeometry",
];

export default function Object3DConstructor({ pId, socketUpdate }: { pId?: string, socketUpdate?: (data: any) => void }) {
  const { sceneId, selectObject3D, clearSelected, saveObject3D } = useObject3D();

  const [objectType, setObjectType] = useState<Object3DType | null>("MESH");
  const [geoType, setGeoType] = useState<GEOMETRY_TYPE | null>(null);
  const [transform, setTransform] = useState(DEFAULT_TRANSFORM);
  const [material, setMaterial] = useState(DEFAULT_MATERIAL);
  // const [geometry, setGeometry] = useState(DEFAULT_GEOMETRY(""));

  useEffect(() => {
    if (geoType === null) {
      clearSelected();
      return;
    }
    const base = createNewObject3D(
      "MESH",
      transform,
      DEFAULT_GEOMETRY(geoType),
      material,
    );
    if (!base) return;
    const obj = {
      ...base,
      type: "MESH" as "MESH",
      id: "created-object",
      createdAt: "",
      updatedAt: "",
    };
    selectObject3D(obj, true);
  }, [geoType, transform]);

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (objectType !== "MESH" || !geoType) {
      alert("not implemented yet");
      return;
    }

    const object3D = createNewObject3D(
      objectType,
      transform,
      DEFAULT_GEOMETRY(geoType),
      material,
    );
    if (!object3D) return;

    const response = await saveObject3D(object3D);
    if (response.success && response.data && sceneId) {
      setGeoType(null);
      setTransform(DEFAULT_TRANSFORM);
      socketUpdate?.({
        type: "create",
        objectId: response.data.id,
        sceneId: sceneId,
      })
    } else {
      alert(`Error: ${response.error}`);
    }
  };

  return (
    <div>
      <EditorHeader text="CONSTRUCT" />
      <ObjectConstructor
        selectors={GEOMETRY_OPTIONS}
        selected={geoType}
        setSelect={setGeoType}
        position={transform.position}
        rotation={transform.rotation}
        scale={transform.scale}
        setPosition={(pos) =>
          setTransform((prev) => ({ ...prev, position: pos }))
        }
        setRotation={(rot) =>
          setTransform((prev) => ({ ...prev, rotation: rot }))
        }
        setScale={(scale) =>
          setTransform((prev) => ({ ...prev, scale: scale }))
        }
        onSubmit={handleSubmit}
      />
    </div>
  );
}

function createNewObject3D(
  type: Object3DType,
  transform: typeof DEFAULT_TRANSFORM,
  geometry?: TGeometry,
  material?: TMaterial,
  children?: TObject3DData[],
) {
  switch (type) {
    case "MESH":
      if (!geometry || !material) {
        alert("Geometry && Material is required for MESH type");
        return null;
      }
      return {
        type: "MESH" as "MESH",
        transform: toMatrix(transform),
        geometry: geometry,
        material: material,
        name: "new mesh",
        parentId: null,
        visible: true,
      };
    case "GROUP":
      alert("not implemented yet");
      return null;
    default:
      alert("Invalid object type");
      return null;
  }
}
