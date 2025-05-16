"use client";

import React from "react";
import * as styles from "./layer.css";

interface TObject3D {
  name?: string;
  type?: string;
  geometry: string;
  id: number;
}

interface LayerProps {
  object: TObject3D;
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
      {object.name ? object.name : "untitled"} - {object.geometry}
    </div>
  );
});
