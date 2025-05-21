"use client";

import { navigate } from "@/app/actions/navigate";
import redirectUser from "@/hook/redirectUser";
import { useUserInfo } from "@/hook/useUserInfo";
import {
  Header as HeaderLayout,
  ProfileDropdown,
} from "@repo/ui/components/header";
import useComponentVisible from "@/hook/useComponentVisible";

export function Header() {
  const username = useUserInfo((state) => state.username);
  const logout = useUserInfo((state) => state.logout);
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible();
  const handleLogout = () => {
    logout();
    setIsComponentVisible(false);
    navigate("/");
  };

  const handleNavigate = () => {
    setIsComponentVisible(false);
    redirectUser("me");
  };

  return (
    <>
      <HeaderLayout
        signedIn={username !== ""}
        handleVisible={() => setIsComponentVisible(!isComponentVisible)}
      />
      {isComponentVisible ? (
        <ProfileDropdown
          ref={ref}
          username={username}
          handleLogout={handleLogout}
          handleNavigate={handleNavigate}
        />
      ) : null}
    </>
  );
}
