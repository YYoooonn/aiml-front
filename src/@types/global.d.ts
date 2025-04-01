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

interface Entity<T extends object> extends T, DateInfo {
  id: number;
}

type UserData = Entity<User>;
type ProjectData = Entity<Project>;
type TObjectData = Entity<TObject>;

interface ParticipantData extends UserData {
  isOwner: boolean;
  readonly: boolean;
}
