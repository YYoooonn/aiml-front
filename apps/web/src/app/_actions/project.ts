import { ActionResponse, ArchiveData, ProjectSearchParams } from "./actions";
import { ENDPOINT, responseHandler } from "./utils";

const ERROR_FROM = "PROJECT ACTION";

export async function search({ k, n, s }: ProjectSearchParams) {
  const response = await fetch(
    `${ENDPOINT.P}/search?keyword=${k}&pageNum=${n}&pageSize=${s}`,
    { method: "GET" },
  );
  const r: ActionResponse<ArchiveData> = await responseHandler(
    response,
    ERROR_FROM,
  );
  return r;
}

export async function create(props: Project) {
  const response = await fetch(ENDPOINT.P!!, {
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
    ? `${ENDPOINT.P}/${id}/${entity}`
    : `${ENDPOINT.P}/${id}`;
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
  const response = await fetch(`${ENDPOINT.P}/${id}`, {
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
  const response = await fetch(`${ENDPOINT.P}/${id}`, {
    method: "DELETE",
  });
  const data: ActionResponse = await responseHandler(response, ERROR_FROM);
  return data;
}
