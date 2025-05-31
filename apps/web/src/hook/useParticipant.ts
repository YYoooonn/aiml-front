import { Participant, ParticipantData, ParticipantRole } from "@/@types/api";
import {
  addParticipant,
  deleteParticipant,
  getProjectParticipants,
  updateParticipant,
} from "@/services/participant";
import projectStore from "@/store/projectStore";
import { useMemo, useState } from "react";

export const useParticipant = () => {
  const { id: projectId, participants, setParticipants } = projectStore();

  const participantMap = useMemo(() => {
    // 순서 보장을 위함
    const map: Record<string, ParticipantData[]> = {
      OWNER: [],
      EDITOR: [],
      VIEWER: [],
    };
    participants.forEach((participant) => {
      if (map[participant.role]) {
        map[participant.role]?.push(participant);
      } else {
        map[participant.role] = [participant];
      }
    });
    return map;
  }, [participants]);

  const fetchParticipants = async (pId?: string) => {
    const id = pId ?? projectId;
    if (!id) {
      return {
        success: false,
        error: "Project Id not provided",
        data: null,
      }
    }

    const response = await getProjectParticipants(id);
    if (response.success) setParticipants(response.data);
    
    return response
  };

  const saveParticipant = async (participant: Participant, pId?: string) => {
    const id = pId ?? projectId;
    if (!id) {
      alert("Project Id not provided");
      return false;
    }

    const isExisting = participants.some(
      (p) => p.username === participant.username,
    );

    const response = isExisting
      ? await updateParticipant(id, participant)
      : await addParticipant(id, participant);

    if (!response.success) {
      alert(response.error);
      return false;
    }

    const data = response.data;
    const updatedParticipants = isExisting
      ? participants.map((p) => (p.username === data.username ? data : p))
      : [...participants, data];

    setParticipants(updatedParticipants);

    return true;
  };

  const removeParticipant = async (username: string, pId?: string) => {
    const id = pId ?? projectId;
    if (!id) {
      alert("Project Id not provided");
      return false;
    }

    const response = await deleteParticipant(id, username);
    if (!response.success) {
      alert(response.error);
      return false;
    }

    const p = participants.find((p) => p.username === username);
    if (!p) return true;

    const updatedParticipants = participants.filter(
      (p) => p.username !== username,
    );

    setParticipants(updatedParticipants);
    return true;
  };

  return {
    participants,
    participantMap,
    fetchParticipants,
    saveParticipant,
    removeParticipant,
  };
};
