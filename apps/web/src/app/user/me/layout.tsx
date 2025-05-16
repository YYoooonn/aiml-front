import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { UserAisle } from "@/components/LeftAisle";
import { DefaultLayout, LeftAislePageLayout } from "@repo/ui/layout";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DefaultLayout header={<Header />} footer={<Footer />}>
      <LeftAislePageLayout leftAisle={<UserAisle />}>
        {children}
      </LeftAislePageLayout>
    </DefaultLayout>
  );
}
