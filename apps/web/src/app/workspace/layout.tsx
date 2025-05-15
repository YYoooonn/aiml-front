import { RightAisle } from "@/components/RightAisle";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WorkspaceAisle } from "@/components/LeftAisle";
import { DefaultLayout } from "@repo/ui/layout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DefaultLayout
    // header={<Header/>} footer={<Footer />}
    >
      <WorkspaceAisle />
      <RightAisle />
      {children}
    </DefaultLayout>
  );
}
