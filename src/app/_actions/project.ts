import { ActionResponse, ProjectSearchParams } from "./actions";
import { PROJECT_ROUTES, responseHandler } from "./utils";

const ERROR_FROM = "PROJECT ACTION";

export async function search({ k, n, s }: ProjectSearchParams) {
  const response = await fetch(
    `${PROJECT_ROUTES}/search?keyword=${k}&pageNum=${n}&pageSize=${s}`,
    { method: "GET" },
  );
  const r = await responseHandler(response, ERROR_FROM);
  return r;
}

export async function create(props: Project) {
  const response = await fetch(PROJECT_ROUTES, {
    method: "POST",
    body: JSON.stringify(props),
  });
  const data: ActionResponse<ProjectData> = await responseHandler(
    response,
    ERROR_FROM,
  );
  return data;
}

export async function read(id: number, entity?: string) {
  const route = entity
    ? `${PROJECT_ROUTES}/${id}/${entity}`
    : `${PROJECT_ROUTES}/${id}`;
  const response = await fetch(route, {
    method: "GET",
  });
  const data: ActionResponse<ProjectData> = await responseHandler(
    response,
    ERROR_FROM,
  );
  return data;
}

export async function update({
  id,
  infos,
}: {
  id: string;
  infos: ProjectData;
}) {
  const response = await fetch(`${PROJECT_ROUTES}/${id}`, {
    method: "PUT",
    body: JSON.stringify(infos),
  });
  const data: ActionResponse<ProjectData> = await responseHandler(
    response,
    ERROR_FROM,
  );
  return data;
}

export async function remove({ id }: { id: string }) {
  const response = await fetch(`${PROJECT_ROUTES}/${id}`, {
    method: "DELETE",
  });
  const data: ActionResponse = await responseHandler(response, ERROR_FROM);
  return data;
}
