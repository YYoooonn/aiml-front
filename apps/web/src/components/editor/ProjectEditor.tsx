"use client";

import { useState } from "react";
import { ParticipantEditor } from "../form/ParticipantEditForm";
import { EditorNavigation, EditorPageLayout } from "@repo/ui/layout";
import { ProjectEditForm } from "../Form";

type ProjectNav = "Project" | "Participant";

const NAV: ProjectNav[] = ["Project", "Participant"];

export function ProjectEditor() {
  const [nav, setNav] = useState(NAV[0]);

  const Component = nav === "Project" ? ProjectEditForm : ParticipantEditor;

  return (
    <EditorPageLayout
      navigation={
        <EditorNavigation
          navigations={NAV}
          selected={nav}
          setSelected={(val) => setNav(val)}
        />
      }
    >
      <Component />
    </EditorPageLayout>
  );
}
