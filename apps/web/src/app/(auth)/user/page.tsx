import { redirect } from "next/navigation";

export default function UserRedirect() {
  redirect("/user/me");
}
