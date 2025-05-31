"use client";

import { useState } from "react";
import {
  BaseSideNav,
  DropdownSideNav,
  DropdownSelector,
  LeftAisleContainer,
  AisleModule,
} from "@repo/ui/components/aisle";
import { navigateWorkspace } from "@/app/actions/navigate";
import { useUser } from "@/hook/useUser";
import redirectUser from "@/hook/redirectUser";


const NAV = [
  { text: "Profile", action: () => redirectUser("me/profile") },
  { text: "Create", action: () => console.log("create clicked") },
  { text: "Upload", action: () => console.log("upload clicked") },
];

export default function UserAisle() {
  const { projects } = useUser();
  const [showList, setShowList] = useState(true);
  const [selected, setSelected] = useState<string>("Projects");

  return (
    <LeftAisleContainer>
      <AisleModule>
        {
          NAV.map((nav, index) => {
            const handleClick = () => {
              nav.action();
              setSelected(nav.text);
            }
            return (
            <div key={index} style={{ marginBottom: "8px" }}>
              <BaseSideNav
                text={nav.text}
                onClick={handleClick}
                selected={selected === nav.text}
              />
            </div>
            )
            }
          )
        }
        <DropdownSideNav
          text="Projects"
          selected={selected === "Projects"}
          onClick={() => {
            redirectUser("me");
            setShowList(true)
            setSelected("Projects")
          }}
          onToggle={() => setShowList(!showList)}
          show={showList}
        >
          {projects.map((p, i) => {
            return (
              <DropdownSelector
                key={p.id}
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
