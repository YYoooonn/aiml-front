import * as styles from "./header.css";
import Link from "next/link";
import { HeaderProfile } from "./HeaderProfile";

interface HeaderProps {
  signedIn: boolean;
  handleVisible: () => void;
  children?: React.ReactNode;
}

export function Header({ signedIn, handleVisible }: HeaderProps) {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerWrapper}>
        <Logo />
        <Links>
          <HeaderLink href={"/archive"} text="Archive" />
          <ExternalHeaderLink
            href={"https://github.com/YYoooonn/aiml-mono"}
            text="About"
          />
          <ExternalHeaderLink
            href={"https://github.com/YYoooonn/aiml-mono"}
            text="Documentation"
          />
          {/* 
          <HeaderLink href={"/documentation"} text="Documentation" />
          <HeaderLink href={"/contact"} text="Contact" /> */}
          <HeaderProfile signedIn={signedIn} handleVisible={handleVisible}>
            <HeaderLink href={"/register"} text="SignUp" />
            <HeaderLink href={"/login"} text="LogIn" />
          </HeaderProfile>
        </Links>
      </div>
    </div>
  );
}

function Logo() {
  return (
    <Link className={styles.logo} href={"/"}>
      &quot;LOGO&quot;
    </Link>
  );
}

function Links({ children }: { children?: React.ReactNode }) {
  return <div className={styles.headerLinkWrapper}>{children}</div>;
}

export function HeaderLink({ href, text }: { href: string; text: string }) {
  return (
    <Link className={styles.headerLink} href={href}>
      {text}
    </Link>
  );
}

export function ExternalHeaderLink({
  href,
  text,
}: {
  href: string;
  text: string;
}) {
  return (
    <a
      className={styles.headerLink}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {text}
    </a>
  );
}
