import { ActionResponse, UserRegisterData } from "./actions";
import { responseHandler, ENDPOINT } from "./utils";

const ERROR_FROM = "USER ACTION";

export async function create(props: UserRegisterData) {
  const response = await fetch(ENDPOINT.U, {
    method: "POST",
    body: JSON.stringify(props),
  });

  const data: ActionResponse<UserData> = await responseHandler(
    response,
    ERROR_FROM,
  );
  return data;
}

export async function read(id?: number) {
  const uId = id ? id : "me";
  const response = await fetch(`${ENDPOINT.U}/${uId}`, { method: "GET" });

  const data: ActionResponse<UserData> = await responseHandler(
    response,
    ERROR_FROM,
  );
  return data;
}

export async function update({
  username,
  userInfos,
}: {
  username?: string;
  userInfos: User;
}) {
  const id = username ? username : "me";
  const response = await fetch(`${ENDPOINT.U}/${id}`, {
    method: "PUT",
    body: JSON.stringify(userInfos),
  });
  const data: ActionResponse<UserData> = await responseHandler(
    response,
    ERROR_FROM,
  );
  return data;
}

export async function remove(username?: string) {
  const id = username ? username : "me";
  const response = await fetch(`${ENDPOINT.U}/${id}`, {
    method: "DELETE",
  });
  const data: ActionResponse = await responseHandler(response, ERROR_FROM);
  return data;
}

export async function readEntity(props: { id?: number; entity?: string }) {
  const uId = props.id ? props.id : "me";
  const response = await fetch(`${ENDPOINT.U}/${uId}/${props.entity}`, {
    method: "GET",
  });
  const data: ActionResponse<UserData> = await responseHandler(
    response,
    ERROR_FROM,
  );
  return data;
}
