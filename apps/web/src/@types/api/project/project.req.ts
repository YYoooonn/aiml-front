import { Project } from "./project.dto";

export type ProjectRequest = Project & {
  id?: string;
};

export interface ProjectSearchRequest {
  keyword?: string;
  pageNum?: number;
  pageSize?: number;
}
