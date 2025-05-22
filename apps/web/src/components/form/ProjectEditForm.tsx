"use client";

import {
  BaseForm,
  TextFormBlock,
  SubmitButton,
  BoolButtonBlock,
  BaseFormBlock,
  SearchFormBlock,
  FormBlockTag,
  TextDebounceInput,
} from "@repo/ui/components";
import { useParticipant } from "@/hook/useParticipant";
import { useProjectEdit } from "@/hook/useProjectEdit";
import { ParticipantData, ParticipantRole } from "@/@types/api";
import { useEffect, useState } from "react";
import {
  ParticipantEditBlock,
  ParticipantCreateBlock,
} from "@repo/ui/components/module";
import { searchUser } from "@/lib/api/search";

interface ProjectEditFormProps {}

export function ProjectEditForm({}: ProjectEditFormProps) {
  const selections: string[] = ["Public", "Private"];
  const {
    title,
    subtitle,
    isPublic,
    setTitle,
    setSubtitle,
    setIsPublic,
    createdAt,
    updatedAt,
    handleUpdate,
  } = useProjectEdit();
  const {
    participants,
    fetchParticipants,
    addParticipant,
    updateParticipant,
    removeParticipant,
  } = useParticipant();
  useEffect(() => {
    fetchParticipants();
  }, []);

  const [searched, setSearched] = useState<string[]>([]);
  const handleCreate = async ({
    user,
    role,
  }: {
    user: string;
    role: "OWNER" | "EDITOR" | "VIEWER";
  }) => {
    if (user && role !== null) {
      const response = await addParticipant(user, role);
      if (response) {
        setSearched((prev) => prev.filter((val) => val !== user));
        fetchParticipants();
      }
    }
  };

  const handleUpdateParticipant = async ({
    user,
    role,
  }: {
    user: string;
    role: "OWNER" | "EDITOR" | "VIEWER" | null;
  }) => {
    if (user) {
      let response;
      if (role === null) response = await removeParticipant(user);
      else response = await addParticipant(user, role);
      if (response) {
        setSearched((prev) => prev.filter((val) => val !== user));
        fetchParticipants();
      }
    }
  };

  const handleSearch = async (username: string) => {
    const response = await searchUser({ username: username });
    if (response.success) {
      const partList = participants.map((participant) => participant.username);
      const users = response.data
        .map((user) => user.username)
        .filter((val) => !partList.includes(val))
        .slice(0, 5);
      setSearched(users);
    } else {
      setSearched([]);
    }
  };

  return (
    <BaseForm onSubmit={handleUpdate}>
      <TextFormBlock
        title="TITLE"
        onChange={setTitle}
        placeholder={title}
        value={title}
      />
      <p style={{ marginTop: "24px" }} />
      <TextFormBlock
        title="SUBTITLE"
        onChange={setSubtitle}
        placeholder={subtitle}
        value={subtitle}
      />
      <p style={{ marginTop: "24px" }} />
      <BoolButtonBlock
        title="PUBLIC"
        textList={selections}
        selected={isPublic ? "Public" : "Private"}
        setSelected={(value: string) => setIsPublic(value === "Public")}
      />
      <p style={{ marginTop: "24px" }} />

      <ParticipantModule
        participants={participants}
        handleUpdate={handleUpdateParticipant}
      />

      <p style={{ marginTop: "24px" }} />
      <BaseFormBlock title="SEARCH USER">
        <SearchInput handleSearch={handleSearch} />
      </BaseFormBlock>
      <ParticipantCreateBlock
        users={searched}
        handleParticipant={handleCreate}
      />
      <p style={{ marginTop: "24px" }} />

      <SubmitButton text={"SAVE"} />
    </BaseForm>
  );
}

interface ParticipantModuleProps {
  participants: ParticipantData[];
  handleUpdate: (val: { user: string; role: ParticipantRole | null }) => void;
}

const emptyMap: Map<string, ParticipantData[]> = new Map();
export function ParticipantModule({
  participants,
  handleUpdate,
}: ParticipantModuleProps) {
  const [map, setMap] = useState(emptyMap);
  useEffect(() => {
    const newMap = emptyMap;
    participants.forEach((p) => {
      const datas = newMap.get(p.role);
      if (datas && !datas.map((d) => d.username).includes(p.username)) {
        newMap.get(p.role)?.push(p);
      } else {
        newMap.set(p.role, [p]);
      }
    });

    setMap(newMap);
  }, [participants]);
  return (
    <>
      <FormBlockTag title="PARTICIPANT" />
      {Array.from(map.keys()).map((role) => {
        const p = map.get(role);
        if (p) {
          return (
            <ParticipantEditBlock
              key={role}
              participants={p.map((p) => ({ user: p.username, role: p.role }))}
              handleParticipant={handleUpdate}
            />
          );
        }
        return null;
      })}
    </>
  );
}

const SearchInput = ({
  handleSearch,
}: {
  handleSearch: (val: string) => Promise<void>;
}) => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500); // 500ms 동안 입력이 없으면 실행

    return () => clearTimeout(handler); // 다음 입력이 들어오면 타이머 취소
  }, [query]);

  useEffect(() => {
    if (debouncedQuery) {
      handleSearch(debouncedQuery);
    }
  }, [debouncedQuery]);

  return <TextDebounceInput query={query} onChange={setQuery} />;
};
