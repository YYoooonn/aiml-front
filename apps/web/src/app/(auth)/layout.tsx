import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = cookies().get("accessToken");
  const refreshToken = cookies().get("refreshToken");

  if (!token && !refreshToken) redirect("/login");

  return <>{children}</>;
}
