import { navigate } from "@/app/_actions/navigate";

export default async function redirectUser(username: string) {
  //console.debug("push user");
  try {
    if (username) {
      await navigate(`/user/${username}`);
    } else {
      throw new Error("error while pushing user");
    }
  } catch (err) {
    alert(err);
  }
  return;
}
