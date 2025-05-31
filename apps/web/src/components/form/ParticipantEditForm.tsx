"use client";

import { BaseForm, BaseFormBlock } from "@repo/ui/components";
import { useParticipant } from "@/hook/useParticipant";
import { ParticipantRole } from "@/@types/api";
import { useEffect, useState } from "react";
import {
  ParticipantEditBlock,
  ParticipantCreateBlock,
} from "@repo/ui/components/module";
import { searchUser } from "@/app/actions/search";
import { SearchInput } from "../input/SearchInput";

export function ParticipantEditor() {
  const { participants, participantMap, saveParticipant, removeParticipant } =
    useParticipant();

  const handleUpdate = async ({
    user,
    role,
  }: {
    user: string;
    role: ParticipantRole | null;
  }) => {
    let response;
    if (role === null) response = await removeParticipant(user);
    else response = await saveParticipant({ username: user, role });

    if (response) {
      setSearched((prev) => prev.filter((val) => val !== user));
    }
  };
  const [searched, setSearched] = useState<string[]>([]);

  const handleSearch = async (username: string) => {
    const response = await searchUser({ username: username });
    if (response.success) {
      const users = response.data
        .map((user) => user.username)
        .filter((val) => !participants.some((p) => p.username === val))
        .slice(0, 5);
      setSearched(users);
    } else {
      setSearched([]);
    }
  };
  return (
    <BaseForm onSubmit={(e) => e.preventDefault()}>
      <BaseFormBlock title="PARTICIPANT">
        {Object.entries(participantMap).map(([role, participants]) => (
          <ParticipantEditBlock
            key={role}
            participants={participants.map((p) => ({
              user: p.username,
              role: p.role,
            }))}
            handleParticipant={handleUpdate}
          />
        ))}
      </BaseFormBlock>
      <p style={{ marginTop: "24px" }} />
      <BaseFormBlock title="SEARCH USER">
        <SearchInput handleSearch={handleSearch} />
      </BaseFormBlock>
      <ParticipantCreateBlock
        users={searched}
        handleParticipant={handleUpdate}
      />
      <p style={{ marginTop: "24px" }} />
      {/* <SubmitButton text={"SAVE"} /> */}
    </BaseForm>
  );
}
