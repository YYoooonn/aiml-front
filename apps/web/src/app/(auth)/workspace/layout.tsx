import { RightAisle } from "@/components/RightAisle";
import { WorkspaceAisle } from "@/components/LeftAisle";
import { DefaultLayout } from "@repo/ui/layout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DefaultLayout
      style={{ padding: 0 }}
      // header={<Header/>} footer={<Footer />}
    >
      <WorkspaceAisle />
      <RightAisle />
      {children}
    </DefaultLayout>
  );
}
