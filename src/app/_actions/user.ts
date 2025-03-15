import { RegisterInfo, UserUpdateInfo } from "./actions";
import { errorHandler, responseHandler, USER_ROUTE } from "./utils";

const ERROR_FROM = "USER ACTION";

export async function create(props: RegisterInfo) {
  const response = await fetch(USER_ROUTE, {
    method: "POST",
    body: JSON.stringify(props),
  });

  const data = await responseHandler(response, ERROR_FROM);
  return data;
}

export async function read(username?: string) {
  const id = username ? username : "me";
  const response = await fetch(`${USER_ROUTE}/${id}`, { method: "GET" });

  const data = await responseHandler(response, ERROR_FROM);
  return data;
}

export async function update({
  username,
  userInfos,
}: {
  username?: string;
  userInfos: UserUpdateInfo;
}) {
  const id = username ? username : "me";
  const response = await fetch(`${USER_ROUTE}/${id}`, {
    method: "PUT",
    body: JSON.stringify(userInfos),
  });
  const data = await responseHandler(response, ERROR_FROM);
  return data;
}

export async function remove(username?: string) {
  const id = username ? username : "me";
  const response = await fetch(`${USER_ROUTE}/${id}`, {
    method: "DELETE",
  });
  const data = await responseHandler(response, ERROR_FROM);
  return data;
}

export async function readEntity(props: { id?: string; entity?: string }) {
  const id = props.id ? props.id : "me";
  const response = await fetch(`${USER_ROUTE}/${id}/${props.entity}`, {
    method: "GET",
  });
  const data = await responseHandler(response, ERROR_FROM);
  return data;
}
