"use client";

import { useState } from "react";
import { useUserInfo } from "@/hook/useUserInfo";
import {
  BaseSideNav,
  DropdownSideNav,
  DropdownSelector,
  LeftAisleContainer,
  AisleModule,
} from "@repo/ui/components/aisle";
import { navigateWorkspace } from "@/app/_actions/navigate";

export default function UserAisle() {
  const { projects } = useUserInfo();
  const [showList, setShowList] = useState(true);
  // // FIXME -  implement on user
  // const handleClick = (e: MouseEvent) => {
  //   e.preventDefault();
  //   redirectUser(username.concat("/edit"));
  // };

  const handleProjectClick = () => {
    setShowList(!showList);
  };

  return (
    <LeftAisleContainer>
      <AisleModule>
        <BaseSideNav
          text="Profile"
          onClick={() => console.log("profile clicked")}
        />
        <div style={{ margin: "4px" }} />
        <BaseSideNav
          text="Create"
          onClick={() => console.log("create clicked")}
        />
        <div style={{ margin: "4px" }} />
        <BaseSideNav
          text="Upload"
          onClick={() => console.log("upload clicked")}
        />
        <div style={{ margin: "4px" }} />
        <DropdownSideNav
          text="Projects"
          onClick={handleProjectClick}
          show={showList}
        >
          {projects.map((p, i) => {
            return (
              <DropdownSelector
                key={i}
                text={p.title}
                onClick={() => navigateWorkspace(p.id)}
              />
            );
          })}
        </DropdownSideNav>
      </AisleModule>
    </LeftAisleContainer>
  );
}
