import { DefaultLayout } from "@/components/layouts";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DefaultLayout>{children}</DefaultLayout>;
}
