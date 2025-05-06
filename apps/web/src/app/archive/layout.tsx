import { ArchiveAisleLayout } from "@/components/layouts";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ArchiveAisleLayout>{children}</ArchiveAisleLayout>;
}
