"use client";

import { SnapPageScroll } from "@/components/snapscroll/SnapPageScroll";
import { DefaultLayout, LandingSection, LandingSampleLink } from "@repo/ui/layout";
import { Header } from "@/components/Header";

export default function Home() {
  return (
    <DefaultLayout header={<Header />}>
      <SnapPageScroll>
        <LandingSection>
          <h1>&quot;Landing&quot;</h1>
          <h3>work in progress</h3>
        </LandingSection>
        <LandingSection>
          <LandingSampleLink href={"/login"} >
            <h1>&quot;Click to login&quot;</h1>
          </LandingSampleLink>
        </LandingSection>
        <LandingSection>
          <LandingSampleLink href={"/register"}>
            <h1>&quot;Click to register&quot;</h1>
          </LandingSampleLink>
        </LandingSection>
        <LandingSection>
          <LandingSampleLink href={"/archive"} >
            <h1>&quot;Go to Archive&quot;</h1>
          </LandingSampleLink>
        </LandingSection>
      </SnapPageScroll>
    </DefaultLayout>
  );
}
