import { getProjectParticipants } from "@/app/actions/participant";
import { getProject } from "@/app/actions/project";
import { getProjectScenes } from "@/app/actions/scene";
import projectStore from "@/store/projectStore";

export const useProject = () => {
  const { id: projectId, setProject, clearProject } = projectStore();

  const fetchAllProjectData = async (pId?: string) => {
    const id = pId ?? projectId;
    if (!id) {
      alert("Project Id not provided");
      return false;
    }

    // 1. fetch project info
    const projectResponse = await getProject(id);
    if (!projectResponse.success) {
      alert(projectResponse.error);
      return false;
    }

    // 2. fetch scenes
    const sceneResponse = await getProjectScenes(id);
    if (!sceneResponse.success) {
      alert(sceneResponse.error);
      return false;
    }

    // 3. fetch participants
    const participantResponse = await getProjectParticipants(id);
    if (!participantResponse.success) {
      alert(participantResponse.error);
      return false;
    }

    setProject({
      ...projectResponse.data,
      scenes: sceneResponse.data,
      participants: participantResponse.data,
    });
    return true;
  };

  return {
    projectId,
    fetchAllProjectData,
    clearProject,
  };
};
