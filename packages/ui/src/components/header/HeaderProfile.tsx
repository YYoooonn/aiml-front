"use client";

import { forwardRef } from "react";
import * as styles from "./profile.css";

interface HeaderProfileProps {
  handleVisible?: () => void;
  children?: React.ReactNode;
}

export function HeaderProfile({ children }: HeaderProfileProps) {
  return <div className={styles.profileLink}>{children}</div>;
}

function Profile({ onClick }: { onClick: () => void }) {
  return (
    <div className={styles.profileLink}>
      <div className={styles.profileImg} onClick={onClick} />
    </div>
  );
}

interface ProfileDropdownProps {
  handleLogout: () => void;
  handleNavigate: () => void;
  username: string;
}

export const ProfileDropdown = forwardRef<HTMLDivElement, ProfileDropdownProps>(
  ({ handleLogout, handleNavigate, username }, ref) => {
    return (
      <div ref={ref} className={styles.profileDropdown}>
        <div className={styles.profileInnerWrapper}>
          <div className={styles.dropdownList}>{username}</div>
          <div
            className={styles.dropdownListSelectable}
            onClick={handleNavigate}
          >
            MY WORKSPACE
          </div>
          <div className={styles.dropdownList}>
            <div className={styles.dropdownButtonWrapper}>
              <div className={styles.dropdownButton}>EDIT PROFILE</div>
              <div className={styles.dropdownButton} onClick={handleLogout}>
                SIGN OUT
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

ProfileDropdown.displayName = "ProfileDropdown"; // for devtools
