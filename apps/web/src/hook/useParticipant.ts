import { useProjectStore } from "@/store/useProjectStore";
import { useEffect, useState } from "react";

export const useParticipant = () => {
  const {
    participants: pMap,
    fetchParticipants,
    addParticipant,
    removeParticipant,
    updateParticipant,
  } = useProjectStore();

  useEffect(() => {
    fetchParticipants();
  }, []);

  return {
    participants: Array.from(pMap.values()),
    fetchParticipants,
    addParticipant,
    updateParticipant,
    removeParticipant,
  };
};
