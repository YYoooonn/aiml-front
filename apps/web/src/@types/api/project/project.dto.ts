import { Entity } from "@/@types/common";

export interface Project {
  title: string;
  description?: string;
  subtitle?: string;
  isPublic: boolean;
}

export type ProjectData = Entity<Project> & {};
