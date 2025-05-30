import { TObject3D, TObject3DData, TTransform } from "@/@types/api";
import { useScene } from "./useScene";
import { useEffect, useMemo } from "react";
import {
  createObject3D,
  deleteObject3D,
  updateObject3D,
} from "@/services/object3d";
import { DEFAULT_TRANSFORM } from "@/assets/geometry";
import object3DStore from "@/store/object3DStore";
import { toMatrix4decompose } from "@/utils/calc";

export const useObject3D = () => {
  const { sceneId, selectedScene, upsertChildren, removeChildren } = useScene();
  const {
    object3DInfo,
    selected,
    setSelected,
    setObject3DInfo,
    clearSelected,
  } = object3DStore();

  const selectedTransform: TTransform = useMemo(() => {
    return object3DInfo.transform
      ? toMatrix4decompose(object3DInfo.transform)
      : DEFAULT_TRANSFORM;
  }, [object3DInfo.transform]);

  useEffect(() => {
    clearSelected();
  }, [sceneId]);

  const selectObject3D = (data: TObject3DData, isNew = false) => {
    if (isNew) setSelected({ [data.id]: data });
    else {
      let updated = { ...selected } as Record<string, TObject3DData>;
      if (data.parentId !== object3DInfo.parentId)
        updated = { [data.id]: data };
      else if (data.id in selected) delete updated[data.id];
      else updated[data.id] = data;

      setSelected(updated);
    }
  };

  const saveObject3D = async (data: TObject3D & { id?: string }) => {
    if (!selectedScene) return { success: false, error: "Scene not set" };

    const isPresent =
      data.id && selectedScene.children.some((child) => child.id === data.id);
    const response = isPresent
      ? await updateObject3D({ ...data, sceneId: selectedScene.id })
      : await createObject3D({
          ...data,
          sceneId: selectedScene.id,
          id: undefined,
        });

    if (response.success) {
      upsertChildren([response.data]);
      clearSelected();
    }
    return response;
  };

  const saveSelected = async () => {
    if (!selectedScene) return { success: false, error: "Scene not set" };

    // 여러개인 경우, group or transform sum
    const selectedData = Object.values(selected);
    if (selectedData.length !== 1)
      return { success: false, error: "not implemented yet" };

    const current = selectedData.pop();
    if (!current) return { success: false, error: "No object selected" };

    const updated = {
      ...current,
      ...object3DInfo,
      type: current.type,
    } as typeof current;

    return await saveObject3D(updated);
  };

  const removeSelected = async () => {
    if (!selectedScene) return { success: false, error: "Scene not set" };

    const selectedData = Object.values(selected);
    if (selectedData.length !== 1)
      return { success: false, error: "not implemented yet" };

    const current = selectedData.pop();
    if (!current) return { success: false, error: "No object selected" };

    const response = await deleteObject3D(current.id);
    if (response.success) {
      removeChildren([current.id]);
      clearSelected();
    }
    return response;
  };

  return {
    selected,
    selectObject3D,
    object3DInfo,
    setObject3DInfo,
    selectedTransform,
    saveObject3D,
    saveSelected,
    removeSelected,
    clearSelected,
  };
};
