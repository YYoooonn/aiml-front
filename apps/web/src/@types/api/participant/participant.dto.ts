export interface Participant {
  username: string;
  role: ParticipantRole;
}

export type ParticipantRole = "OWNER" | "EDITOR" | "VIEWER";

export type ParticipantData = Participant & {
  projectId: string;
};
