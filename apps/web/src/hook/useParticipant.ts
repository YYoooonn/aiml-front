import { Participant, ParticipantData, ParticipantRole } from "@/@types/api";
import {
  addParticipant,
  deleteParticipant,
  getProjectParticipants,
  updateParticipant,
} from "@/app/actions/participant";
import projectStore from "@/store/projectStore";
import { useMemo, useState } from "react";

export type ParticipantMap = Map<ParticipantRole, ParticipantData[]>;

function fromListToMap<K, T>(list: T[], key: (item: T) => K) {
  const map = new Map<K, T[]>();
  list.forEach((item) => {
    const k = key(item);
    if (!map.has(k)) {
      map.set(k, []);
    }
    map.get(k)?.push(item);
  });
  return map;
}

export const useParticipant = () => {
  const { id: projectId, participants, setParticipants } = projectStore();

  const participantMap = useMemo(
    () => fromListToMap(participants, (p) => p.role),
    [participants],
  );

  const fetchParticipants = async (pId?: string) => {
    const id = pId ?? projectId;
    if (!id) {
      alert("Project Id not provided");
      return false;
    }

    const participantResponse = await getProjectParticipants(id);
    if (!participantResponse.success) {
      alert(participantResponse.error);
      return false;
    }

    setParticipants(participantResponse.data);
    return true;
  };

  const saveParticipant = async (participant: Participant, pId?: string) => {
    const id = pId ?? projectId;
    if (!id) {
      alert("Project Id not provided");
      return false;
    }

    const existingParticipants = participantMap.get(participant.role) ?? [];
    const isExisting = existingParticipants.some(
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
      ? existingParticipants.map((p) =>
          p.username === data.username ? data : p,
        )
      : [...existingParticipants, data];

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

    const updatedParticipants =
      participantMap.get(p.role)?.filter((p) => p.username !== username) ?? [];

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
