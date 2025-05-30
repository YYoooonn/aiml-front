"use client";

import React, { useCallback, useEffect, useState } from "react";
import * as styles from "./layer.css";
import { DropdownSideNav } from "../aisle";

interface LayerObjectProps {
  name?: string;
  type?: string;
  children?: LayerObjectProps[];
  id: string;
}

interface LayerProps {
  object: LayerObjectProps;
  selected: boolean;
}

export const Layer = React.memo(function Layer({
  object,
  selected,
}: LayerProps) {
  return (
    <div
      className={selected ? styles.layerTagSelected : styles.layerTag}
      data-id={object.id}
    >
      {object.name ? object.name : "untitled"} - {object.type}
      {object.children?.map((child) => (
        <Layer key={child.id} object={child} selected={selected} />
      ))}
    </div>
  );
});

interface SceneLayerProps {
  scene: any;
  selected: boolean;
  onSelect: (val: string) => void;
  children?: React.ReactNode;
}

export function SceneLayer({
  scene,
  selected,
  onSelect,
  children,
}: SceneLayerProps) {
  const [show, setShow] = useState(true);
  return (
    <div
      className={selected ? styles.sceneTagSelected : styles.layerTag}
      onClick={() => onSelect(scene.id)}
    >
      <DropdownSideNav
        text={`${scene.name ? scene.name : "untitled"} - SCENE`}
        show={show}
        onClick={() => setShow(!show)}
        textSize="0.8rem"
      >
        {children}
      </DropdownSideNav>
    </div>
  );
}

// FIXME : this is a temporary solution

export function InfoBlock({ title, info }: { title: string; info: string }) {
  return (
    <div className={styles.infoTag}>
      <p>
        <strong>{title}</strong>
      </p>
      <p>{info}</p>
    </div>
  );
}

export function TableBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.tableBlock}>
      <div className={styles.tableBlockTitle}>{title}</div>
      <div className={styles.tableBlockContent}>{children}</div>
    </div>
  );
}

interface ParticipantCreateProps {
  users: string[];
  handleParticipant?: (val: PInfo) => void;
}

type Role = "OWNER" | "EDITOR" | "VIEWER";
type PInfo = {
  user: string;
  role: Role;
};

export function ParticipantCreateBlock({
  users,
  handleParticipant,
}: ParticipantCreateProps) {
  const [info, setInfo] = useState<PInfo>();
  const onClick = (user: string, role: Role) => {
    if (info?.user === user && info?.role === role) {
      setInfo(undefined);
    } else {
      setInfo({ user: user, role: role });
    }
  };

  useEffect(() => {
    setInfo(undefined);
  }, [users]);

  return (
    <div>
      {users.map((user) => {
        const isSelected = user === info?.user;
        return (
          <div
            key={user}
            className={
              isSelected
                ? styles.participantContainerSelected
                : styles.participantContainer
            }
          >
            <div className={styles.participantTag}>{user}</div>
            <div className={styles.roleButtonContainer}>
              <RoleButton
                role="OWNER"
                selected={info?.role === "OWNER" && info.user === user}
                onClick={() => onClick(user, "OWNER")}
              />
              <RoleButton
                role="EDITOR"
                selected={info?.role === "EDITOR" && info.user === user}
                onClick={() => onClick(user, "EDITOR")}
              />
              <RoleButton
                role="VIEWER"
                selected={info?.role === "VIEWER" && info.user === user}
                onClick={() => onClick(user, "VIEWER")}
              />
              <div
                className={
                  info?.user === user
                    ? styles.roleAddButtonSelectable
                    : styles.roleButtonDisabled
                }
                onClick={() =>
                  handleParticipant &&
                  isSelected &&
                  handleParticipant(info as PInfo)
                }
              >
                ADD
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

interface ParticipantEditProps {
  participants: PInfo[];
  handleParticipant?: (
    val: Omit<PInfo, "role"> & { role: Role | null },
  ) => void;
}

export function ParticipantEditBlock({
  participants,
  handleParticipant,
}: ParticipantEditProps) {
  const [pInfo, setPInfo] = useState<PInfo>();
  const onClick = (user: string, role: Role) => {
    if (pInfo?.user === user && pInfo?.role === role) {
      setPInfo(undefined);
    } else {
      setPInfo({ user: user, role: role });
    }
  };

  useEffect(() => {
    setPInfo(undefined);
  }, [participants]);

  return (
    <>
      {participants.map((p) => {
        const isUser = pInfo?.user === p.user;
        return (
          <div
            key={p.user}
            className={
              isUser
                ? styles.participantContainerSelected
                : styles.participantContainer
            }
          >
            <div className={styles.participantTag}>{p.user}</div>
            <div className={styles.roleButtonContainer}>
              <RoleButton
                role="OWNER"
                selected={pInfo?.role === "OWNER" && isUser}
                preSelected={p.role === "OWNER"}
                onClick={() => onClick(p.user, "OWNER")}
              />
              <RoleButton
                role="EDITOR"
                selected={pInfo?.role === "EDITOR" && isUser}
                preSelected={p.role === "EDITOR"}
                onClick={() => onClick(p.user, "EDITOR")}
              />
              <RoleButton
                role="VIEWER"
                selected={pInfo?.role === "VIEWER" && isUser}
                preSelected={p.role === "VIEWER"}
                onClick={() => onClick(p.user, "VIEWER")}
              />
              <div
                className={
                  pInfo
                    ? styles.roleAddButtonSelectable
                    : styles.roleButtonDelete
                }
                onClick={() => {
                  if (!handleParticipant) return;
                  if (pInfo) handleParticipant(pInfo);
                  else handleParticipant({ user: p.user, role: null });
                }}
              >
                {pInfo ? "UPDATE" : "REMOVE"}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

function RoleButtonBlock({
  roles,
  selected,
  onClick,
}: {
  roles: Role[];
  selected: Role;
  onClick: (val: Role) => void;
}) {
  return (
    <div className={styles.roleButtonContainer}>
      {roles.map((role) => (
        <RoleButton
          key={role}
          role={role}
          selected={selected === role}
          onClick={() => onClick(role)}
        />
      ))}
    </div>
  );
}

function RoleButton({
  role,
  selected,
  preSelected,
  onClick,
}: {
  role: Role;
  preSelected?: boolean;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={
        selected
          ? styles.roleButtonSelected
          : preSelected
            ? styles.roleButtonPreSelected
            : styles.roleButton
      }
      onClick={onClick}
    >
      {role}
    </div>
  );
}
