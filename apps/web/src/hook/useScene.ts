"use client";

import type { SceneData, TObject3DData } from "@/@types/api";
import projectStore from "@/store/projectStore";
import sceneStore from "@/store/sceneStore";
import { useMemo, useState, useEffect } from "react";

export const useScene = () => {
  const { id: projectId, scenes, setScenes } = projectStore();
  const { selectedSceneId, setSelectedSceneId } = sceneStore();

  const sceneMap = useMemo(() => {
    const map: Record<string, SceneData> = {};
    scenes.forEach((scene) => {
      map[scene.id] = scene;
    });
    return map;
  }, [scenes]);

  useEffect(() => {
    if (scenes.length > 0 && !selectedSceneId) {
      setSelectedSceneId(scenes[0]?.id);
    }
  }, [scenes, selectedSceneId, setSelectedSceneId]);

  const selectedScene = useMemo(() => {
    if (!selectedSceneId) return undefined;
    return sceneMap[selectedSceneId];
  }, [selectedSceneId, sceneMap]);

  const upsertChildren = (data: TObject3DData[], sceneId?: string) => {
    const id = sceneId ?? selectedSceneId;
    if (!id) {
      console.log("No scene selected");
      return;
    }

    const currentScene = sceneMap[id];
    if (!currentScene) {
      console.error("Current scene not found in sceneMap");
      return;
    }

    const newChildren = [...currentScene.children];
    data.forEach((obj) => {
      if (!findAndInsert(newChildren, obj)) {
        console.error(`Failed to insert or update object with id ${obj.id}`);
      }
    });

    const updatedScene = {
      ...currentScene,
      children: newChildren,
    };

    const newScenes = { ...sceneMap };
    newScenes[id] = updatedScene;

    setScenes(Object.values(newScenes));
  };

  const removeChildren = (ids: string[], sceneId?: string) => {
    const id = sceneId ?? selectedSceneId;
    if (!id) {
      console.log("No scene selected");
      return;
    }

    const currentScene = sceneMap[id];
    if (!currentScene) {
      console.error("Current scene not found, try refreshing the page");
      return;
    }

    const newChildren = currentScene.children.filter(
      (c) => !ids.includes(c.id),
    );

    const updatedScene = {
      ...currentScene,
      children: newChildren,
    };

    const newScenes = { ...sceneMap };
    newScenes[id] = updatedScene;

    setScenes(Object.values(newScenes));
  };

  return {
    projectId,
    sceneMap,
    sceneId: selectedSceneId,
    setSceneId: setSelectedSceneId,
    selectedScene,

    upsertChildren,
    removeChildren,
  };
};

function findAndInsert<T>(nodes: TObject3DData[], obj: TObject3DData): boolean {
  if (obj.parentId === null) {
    // 최상위 객체인 경우
    const existingIndex = nodes.findIndex((node) => node.id === obj.id);
    if (existingIndex !== -1) {
      nodes[existingIndex] = obj; // update
    } else {
      nodes.push(obj); // insert
    }
    return true; // 성공적으로 삽입
  }

  for (let node of nodes) {
    if (node.type === "GROUP") {
      if (node.id === obj.parentId) {
        const existingIndex = node.children.findIndex(
          (child: any) => child.id === obj.id,
        );
        if (existingIndex !== -1) {
          node.children[existingIndex] = obj; // update
        } else {
          node.children.push(obj); // insert
        }
        return true; // 성공적으로 삽입
      } else {
        // 자식들 안에서 탐색 계속
        if (findAndInsert(node.children, obj)) {
          return true;
        }
      }
    }
  }
  return false; // 못 찾음
}
