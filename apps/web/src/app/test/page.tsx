"use client";

import { BaseButton } from "@repo/ui/components";
import { ModalLayout } from "@repo/ui/layout";

export default function TestPage() {
  return (
    <ModalLayout handleClose={() => alert("close")} type="archive">
      <div>test</div>
      <BaseButton text="test" handler={() => alert("clicked")} />
      <BaseButton text="test" handler={() => alert("clicked")} />
    </ModalLayout>
  );
}
