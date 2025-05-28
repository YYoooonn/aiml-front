"use client";

import { BaseForm, SubmitButton, BaseFormBlock } from "@repo/ui/components";
import { ParticipantMap, useParticipant } from "@/hook/useParticipant";
import { ParticipantRole } from "@/@types/api";
import { useState } from "react";
import {
  ParticipantEditBlock,
  ParticipantCreateBlock,
} from "@repo/ui/components/module";
import { searchUser } from "@/app/actions/search";
import { SearchInput } from "../input/SearchInput";

interface ParticipantModuleProps {
  map: ParticipantMap;
  handleUpdate: (val: { user: string; role: ParticipantRole | null }) => void;
}

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
    <BaseForm>
      <BaseFormBlock title="PARTICIPANT">
        {Array.from(participantMap.keys()).map((role) => {
          const p = participantMap.get(role);
          if (p) {
            return (
              <ParticipantEditBlock
                key={role}
                participants={p.map((p) => ({
                  user: p.username,
                  role: p.role,
                }))}
                handleParticipant={handleUpdate}
              />
            );
          }
          return null;
        })}
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
      <SubmitButton text={"SAVE"} />
    </BaseForm>
  );
}
