import type { Metadata } from "next";
import { geistSans, rajdhani } from "@/assets/fonts";
import { Header, Footer } from "@/components/components";
import "@/styles/global.css";
import * as styles from "./layout.css";
import Image from "next/image";
import ModalContainer from "@/components/modal/Modal";

export const metadata: Metadata = {
  title: "AIML Project",
  description: "3d real-time web editing tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${rajdhani.variable} ${geistSans.variable}`}>
      <head></head>
      <body>
        <ModalContainer />
        <main className={styles.layoutContainer}>
          <Header />
          <div className={styles.pageContentContainer}>
            <div className={styles.mainContentContainer}>{children}</div>
          </div>
          <Footer />
        </main>
        <div className={styles.backgroundContainer}>
          <Image
            className={styles.backgroundImage}
            src={"/image/background.png"}
            alt="img"
            fill
          />
        </div>
      </body>
    </html>
  );
}
