import { BaseTextInput } from "@repo/ui/components";
import { useEffect, useState } from "react";

export const SearchInput = ({
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

  return (
    <BaseTextInput value={query} onChange={(e) => setQuery(e.target.value)} />
  );
};
