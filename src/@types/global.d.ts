// CONSTRUCTOR
interface User {
  username: string;
  firstName: string;
  lastName: string;
  email?: string;
  projects?: ProjectData[];
}

interface TObject {
  matrix: number[];
  geometry: string;
  material?: string;
}

interface Project {
  title: string;
  isPublic: boolean;
  subtitle?: string;
  objects?: TObject[];
}

// DATA
interface DateInfo {
  createdAt: string;
  lastModifiedAt: string;
}

interface UserData extends User, DateInfo {
  userId: number;
}

interface ProjectData extends Project, DateInfo {
  projectId: number;
}

interface TObjectData extends TObject, DateInfo {
  objectId: number;
}

interface ParticipantData extends User {
  userId: number;
  isOwner: boolean;
  readonly: boolean;
}
