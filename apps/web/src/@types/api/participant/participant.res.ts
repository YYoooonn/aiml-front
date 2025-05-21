import { BaseResponse } from "@/@types/common";
import { ParticipantData } from "./participant.dto";

export type ParticipantResponse = BaseResponse<ParticipantData>;
export type ParticipantListResponse = BaseResponse<ParticipantData[]>;
