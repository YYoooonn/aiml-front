import { navigate } from "@/app/actions/navigate";

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
