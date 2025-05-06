import DefaultLayout from "@/components/layouts/DefaultLayout";
import { UserAisleLayout } from "@/components/layouts";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserAisleLayout>
      <DefaultLayout>{children}</DefaultLayout>
    </UserAisleLayout>
  );
}
