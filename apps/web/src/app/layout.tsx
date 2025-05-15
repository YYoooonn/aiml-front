import type { Metadata } from "next";
// import Image from "next/image";
import ModalContainer from "@/components/modal";
import { rajdhani, jetBrains_Mono, ibmPlexSans } from "@/assets/fonts";
import { defaultTheme } from "@repo/ui/styles";
import "@/styles/global.css";

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
    <html
      lang="en"
      className={`${rajdhani.variable} ${jetBrains_Mono.variable} ${ibmPlexSans.variable} ${defaultTheme}`}
    >
      <head>
        <title>AIML Project</title>
      </head>
      <body>
        <ModalContainer />
        {children}
      </body>
    </html>
  );
}
