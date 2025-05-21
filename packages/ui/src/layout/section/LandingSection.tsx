import Link from "next/link";
import * as style from "./section.css";

export function LandingSection({ children }: { children: React.ReactNode }) {
  return (
    <section className={style.landingSectionContainer}>{children}</section>
  );
}

export function LandingSampleLink({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <Link href={href} className={style.sampleLink}>
      {children}
    </Link>
  );
}
