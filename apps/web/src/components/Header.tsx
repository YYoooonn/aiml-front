"use client";

import { navigate } from "@/app/actions/navigate";
import redirectUser from "@/hook/redirectUser";
import {
  Header as HeaderLayout,
  ProfileDropdown,
} from "@repo/ui/components/header";
import useComponentVisible from "@/hook/useComponentVisible";
import { useUser } from "@/hook/useUser";
import { useEffect } from "react";

export function Header() {
  const { userInfo, logoutUser, fetchUserInfo } = useUser();
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible();

  useEffect(() => {
    if (!userInfo.username) {
      fetchUserInfo();
    }
  }, [userInfo]);

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
        username={userInfo.username}
        profileImg={userInfo.imageUrl || "/image/defaultProfile.jpg"}
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
