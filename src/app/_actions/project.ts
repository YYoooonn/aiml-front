import { ObjectConstructor, Project } from "@/@types/api";

// POST object
export async function createObject(
  input: ObjectConstructor,
  projectId: string,
) {
  try {
    const res = await fetch(`/api/projects/${projectId}/objects`, {
      method: "POST",
      body: JSON.stringify(input),
    });
    const data = await res.json();
    //console.debug(data);
    return data;
  } catch (e) {
    //console.debug("Error from fetching project :");
    //console.debug(e);
    return { error: "error from fetching project process", e };
  }
}

//PUT object
export async function updateObject(
  objectId: string,
  projectId: string,
  updateInfo: {
    matrix?: ObjectConstructor["matrix"];
    material?: ObjectConstructor["material"];
  },
) {
  try {
    const res = await fetch(`/api/projects/${projectId}/objects/${objectId}`, {
      method: "PUT",
      body: JSON.stringify(updateInfo),
    });
    const data = await res.json();
    return data;
  } catch (e) {
    //console.debug("Error from fetching project :");
    //console.debug(e);
    return { error: "error from fetching project process", e};
  }
}

//DELETE object
export async function deleteObject(objectId: string, projectId: string) {
  try {
    const res = await fetch(`/api/projects/${projectId}/objects/${objectId}`, {
      method: "DELETE",
    });
    console.debug(res)
  } catch (e) {
    console.debug("Error from deletion :");
    console.debug(e);
  }
}

// GET project
export async function fetchProject(projectId: string) {
  try {
    const res = await fetch(`/api/projects/${projectId}`, {
      method: "GET",
    });
    const data = await res.json();
    return data;
  } catch (e) {
    //console.debug("Error from fetching project :");
    //console.debug(e);
    return { error: "error from fetching project process", e };
  }
}

// GET projects : not used
export async function fetchProjects(username: string) {
  try {
    const res = await fetch("/api/projects", {
      method: "GET",
    });
    const data = await res.json();
    //console.debug(data);
    return data;
  } catch (e) {
    //console.debug("Error from fetching projects :");
    //console.debug(e);
    return { error: "error from fetching projects process", e};
  }
}

interface BaseProjectProp {
  title: string;
  subtitle: string;
  isPublic: boolean;
}

export async function createProject(props: BaseProjectProp, username?: string) {
  try {
    console.debug(props);
    const res = await fetch("/api/projects", {
      method: "POST",
      body: JSON.stringify(props),
    });
    const data = await res.json();
    //console.debug(data);
    return data;
  } catch (e) {
    return { error: "error from creating project process", e};
  }
}

interface ArchiveProps {
  keyword: string;
  pageNumber: number;
  pageSize: number;
}

export async function getArchives(archiveProps: ArchiveProps) {
  try {
    const res = await fetch("api/archive", {
      method: "POST",
      body: JSON.stringify(archiveProps),
    });
    const data = await res.json();
    return JSON.parse(data);
  } catch (e) {
    return { error: "error from getting public projects", e};
  }
}
