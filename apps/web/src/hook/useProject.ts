import { navigate } from "@/app/actions/navigate";
import { getProjectParticipants } from "@/services/participant";
import { deleteProject, getProject } from "@/services/project";
import { getProjectScenes } from "@/services/scene";
import projectStore from "@/store/projectStore";

export const useProject = () => {
  const { id: projectId, setProject, clearProject } = projectStore();

  const fetchAllProjectData = async (pId?: string) => {
    const id = pId ?? projectId;
    if (!id) {
      alert("Project Id not provided");
      navigate("/user/me");
      return false;
    }

    // 1. fetch project info
    const projectResponse = await getProject(id);
    if (!projectResponse.success) {
      alert(projectResponse.error);
      projectResponse.redirectLink && navigate(projectResponse.redirectLink);
      return false;
    }

    // 2. fetch scenes
    const sceneResponse = await getProjectScenes(id);
    if (!sceneResponse.success) {
      alert(sceneResponse.error);
      return false;
    }

    setProject({
      ...projectResponse.data,
      scenes: sceneResponse.data,
    });
    return true;
  };

  const removeProject = async (pId?: string) => {
    const id = pId ?? projectId;
    if (!id) {
      alert("Project Id not provided");
      navigate("/user/me");
      return false;
    }

    const res = await deleteProject(id);
    if (!res.success) {
      alert(res.error);
      res.redirectLink && navigate(res.redirectLink);
      return false;
    }

    clearProject();
    return true;
  };

  return {
    projectId,
    fetchAllProjectData,
    clearProject,
    removeProject,
  };
};
