import * as styles from "./header.css";
import Link from "next/link";
import { HeaderProfile } from "./HeaderProfile";
import Image from "next/image";

interface HeaderProps {
  username?: string;
  handleVisible: () => void;
  profileImg: string;
  children?: React.ReactNode;
}

export function Header({ username, profileImg, handleVisible }: HeaderProps) {
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
          {username ? (
            <HeaderProfile>
              <Image
                src={profileImg}
                alt={username}
                onClick={handleVisible}
                width={24}
                height={24}
                style={{ borderRadius: "50%", cursor: "pointer" }}
              />
            </HeaderProfile>
          ) : (
            <>
              <HeaderLink href={"/register"} text="SignUp" />
              <HeaderLink href={"/login"} text="LogIn" />
            </>
          )}
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
