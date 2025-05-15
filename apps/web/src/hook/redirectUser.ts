import { navigate } from "@/app/_actions/navigate";

export default async function redirectUser(username?: string) {
  //console.debug("push user");
  try {
    if (username) {
      await navigate(`/user/${username}`);
    } else {
      await navigate(`/user/me`);
    }
  } catch (err) {
    alert(err);
  }
  return;
}
