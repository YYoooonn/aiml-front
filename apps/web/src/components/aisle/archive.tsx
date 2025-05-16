"use client";

import {
  BaseSideNav,
  LeftAisleContainer,
  AisleModule,
} from "@repo/ui/components/aisle";

export default function ArchiveAisle() {
  return (
    <LeftAisleContainer>
      <AisleModule>
        <BaseSideNav
          text="Search"
          onClick={() => console.log("search clicked")}
        />
      </AisleModule>
    </LeftAisleContainer>
  );
}
