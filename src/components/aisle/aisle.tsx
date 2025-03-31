import { LeftAisleContainer } from "./layout";
import { User, Archive, Editor, Workspace } from "./module/exports";
import LeftAisle from "./leftAisle";
import RightAisle from "./rightAisle";

export { LeftAisle, RightAisle };

export function LeftUserAisle() {
  return (
    <LeftAisleContainer>
      <User />
    </LeftAisleContainer>
  );
}

export function LeftArchiveAisle() {
  return (
    <LeftAisleContainer>
      <Archive />
    </LeftAisleContainer>
  );
}

export function LeftWorkspaceAisle() {
  return (
    <LeftAisleContainer>
      <Workspace />
    </LeftAisleContainer>
  );
}

export function RightEditorAisle() {
  return (
    <LeftAisleContainer>
      <Editor />
    </LeftAisleContainer>
  );
}
