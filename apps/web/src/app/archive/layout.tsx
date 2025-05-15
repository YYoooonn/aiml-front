import { ArchiveAisle } from "@/components/LeftAisle";
import { DefaultLayout, LeftAislePageLayout } from "@repo/ui/layout";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function ArchiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DefaultLayout header={<Header />} footer={<Footer />}>
      <LeftAislePageLayout leftAisle={<ArchiveAisle />}>
        {children}
      </LeftAislePageLayout>
    </DefaultLayout>
  );
}
