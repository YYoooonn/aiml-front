import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DefaultLayout } from "@repo/ui/layout";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DefaultLayout
      header={<Header />}
      footer={<Footer />}
    >
      {children}
    </DefaultLayout>
  );
}
