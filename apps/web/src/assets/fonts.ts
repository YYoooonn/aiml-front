import {
  JetBrains_Mono,
  IBM_Plex_Sans_KR,
  Goudy_Bookletter_1911,
  Rajdhani,
} from "next/font/google";
import localFont from "next/font/local";

/* 폰트 변경시 style에서 variable 체크필요 */

export const ibmPlexSans = IBM_Plex_Sans_KR({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500"],
  style: ["normal"],
  variable: "--font-ibm-plex-sans",
});

export const jetBrains_Mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-jetbrains-mono",
});

export const sortMillGoudy = Goudy_Bookletter_1911({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  style: ["normal"],
  variable: "--font-goudy-bookletter",
});

export const rajdhani = Rajdhani({
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
  variable: "--font-radjhani",
});

export const geistSans = localFont({
  src: "../../public/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const geistMono = localFont({
  src: "../../public/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
