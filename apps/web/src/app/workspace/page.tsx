"use client";

import { BaseCanvas } from "@/components/three/BaseCanvas";
import { BaseCamera } from "@/components/three/Cameras";
import { BaseLights } from "@/components/three/Lights";
import SampleObjects from "@/components/three/SampleObjects";

export default function Test() {
  return (
    <BaseCanvas>
      <BaseCamera />
      <BaseLights />
      <SampleObjects id="1"/>
    </BaseCanvas>
  );
}
