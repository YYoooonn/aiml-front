"use client";

import type { SceneData, TObject3DData } from "@/@types/api";
import projectStore from "@/store/projectStore";
import sceneStore from "@/store/sceneStore";
import { useMemo, useState, useEffect } from "react";

export const useScene = () => {
  const { id: projectId, scenes, setScenes } = projectStore();
  const { selectedSceneId, setSelectedSceneId } =
    sceneStore();

  const [sceneMap, setSceneMap] = useState<Record<string, SceneData>>({});

  useEffect(() => {
    const map: Record<string, SceneData> = {};
    setSelectedSceneId(scenes[0]?.id);
    scenes.forEach((scene) => {
      map[scene.id] = scene;
    });
    setSceneMap(map);
  }, [scenes]);

  const selectedScene = useMemo(() => {
    if (!selectedSceneId) return undefined;
    return sceneMap[selectedSceneId]
  }, [selectedSceneId]);

  const upsertChildren = (data: TObject3DData[]) => {
    if (!selectedSceneId) {
      console.log("No scene selected");
      return;
    }

    const currentScene = sceneMap[selectedSceneId];
    if (!currentScene) {
      console.error("Current scene not found in sceneMap");
      return;
    }

    const newChildren = [...currentScene.children];
    data.forEach((obj) => {
      const existingIndex = newChildren.findIndex((c) => c.id === obj.id);
      if (existingIndex !== -1) {
        newChildren[existingIndex] = obj; // Update existing object
      } else {
        newChildren.push(obj); // Add new object
      }
    });

    const updatedScene = {
      ...currentScene,
      children: newChildren
    }

    const newScenes = {...sceneMap}
    newScenes[selectedSceneId] = updatedScene

    setScenes(Object.values(newScenes));
  };

  const removeChildren = (ids: string[]) => {
    if (!selectedSceneId) {
      console.log("No scene selected");
      return;
    }

    const currentScene = sceneMap[selectedSceneId];
    if (!currentScene) {
      console.error("Current scene not found in sceneMap");
      return;
    }

    const newChildren = currentScene.children.filter((c) => !ids.includes(c.id));

    const updatedScene = {
      ...currentScene,
      children: newChildren
    }

    const newScenes = {...sceneMap}
    newScenes[selectedSceneId] = updatedScene

    setScenes(Object.values(newScenes));
  }

  return {
    sceneMap,
    sceneId: selectedSceneId,
    setSceneId: setSelectedSceneId,
    selectedScene,

    upsertChildren,
    removeChildren,
  };
};

//   const fetchScenes = async (pId?: string) => {
//     const id = pId ?? projectId;
//     if (!id) {
//       alert("Project Id not provided");
//       return false;
//     }

//     const sceneResponse = await getProjectScenes(id);
//     if (sceneResponse.error) {
//       alert(sceneResponse.error);
//       return false;
//     }

//     setScenes(sceneResponse.data);

//     // to default
//     setSceneId(sceneResponse.data[0]?.id);
//     return true;
//   };
