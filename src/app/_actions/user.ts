import { ActionResponse, UserRegisterData } from "./actions";
import { responseHandler, USER_ROUTE } from "./utils";

const ERROR_FROM = "USER ACTION";

export async function create(props: UserRegisterData) {
  const response = await fetch(USER_ROUTE, {
    method: "POST",
    body: JSON.stringify(props),
  });

  const data: ActionResponse<UserData> = await responseHandler(
    response,
    ERROR_FROM,
  );
  return data;
}

export async function read(nameOrId?: string | number) {
  const id = nameOrId ? nameOrId : "me";
  const response = await fetch(`${USER_ROUTE}/${id}`, { method: "GET" });

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
  const response = await fetch(`${USER_ROUTE}/${id}`, {
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
  const response = await fetch(`${USER_ROUTE}/${id}`, {
    method: "DELETE",
  });
  const data: ActionResponse = await responseHandler(response, ERROR_FROM);
  return data;
}

export async function readEntity(props: {
  nameOrId?: string | number;
  entity?: string;
}) {
  const id = props.nameOrId ? props.nameOrId : "me";
  const response = await fetch(`${USER_ROUTE}/${id}/${props.entity}`, {
    method: "GET",
  });
  const data: ActionResponse<UserData> = await responseHandler(
    response,
    ERROR_FROM,
  );
  return data;
}
