"use client";

import { navigate } from "@/app/actions/navigate";
import redirectUser from "@/hook/redirectUser";
import {
  Header as HeaderLayout,
  ProfileDropdown,
} from "@repo/ui/components/header";
import useComponentVisible from "@/hook/useComponentVisible";
import { useUser } from "@/hook/useUser";

export function Header() {
  const { userInfo, logoutUser } = useUser();
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible();
  const handleLogout = () => {
    logoutUser();
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
        signedIn={userInfo.username !== ""}
        handleVisible={() => setIsComponentVisible(!isComponentVisible)}
      />
      {isComponentVisible ? (
        <ProfileDropdown
          ref={ref}
          username={userInfo.username}
          handleLogout={handleLogout}
          handleNavigate={handleNavigate}
        />
      ) : null}
    </>
  );
}
