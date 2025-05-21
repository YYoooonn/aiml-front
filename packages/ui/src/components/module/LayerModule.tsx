"use client";

import React, { useState } from "react";
import * as styles from "./layer.css";
import { DropdownSideNav } from "../aisle";

interface LayerObjectProps {
  name?: string;
  type?: string;
  children?: LayerObjectProps[];
  id: string;
}

interface LayerProps {
  object: LayerObjectProps;
  selected: boolean;
}

export const Layer = React.memo(function Layer({
  object,
  selected,
}: LayerProps) {
  return (
    <div
      className={selected ? styles.layerTagSelected : styles.layerTag}
      data-id={object.id}
    >
      {object.name ? object.name : "untitled"} - {object.type}
      {object.children?.map((child) => (
        <Layer key={child.id} object={child} selected={selected} />
      ))}
    </div>
  );
});

interface SceneLayerProps {
  scene: any;
  selected: boolean;
  onSelect: (val: string) => void;
  children?: React.ReactNode;
}

export function SceneLayer({
  scene,
  selected,
  onSelect,
  children,
}: SceneLayerProps) {
  const [show, setShow] = useState(true);
  return (
    <div
      className={selected ? styles.sceneTagSelected : styles.layerTag}
      onClick={() => onSelect(scene.id)}
    >
      <DropdownSideNav
        text={`${scene.name ? scene.name : "untitled"} - SCENE`}
        show={show}
        onClick={() => setShow(!show)}
        textSize="0.8rem"
      >
        {children}
      </DropdownSideNav>
    </div>
  );
}
