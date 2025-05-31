"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PageHeader } from "@repo/ui/components/header";
import { EditorPageLayout } from "@repo/ui/layout";
import { useUser } from "@/hook/useUser";
import { BaseButton, SubmitButton, TextFormBlock } from "@repo/ui/components";
import imageCompression from "browser-image-compression";

import { navigate } from "@/app/actions/navigate";
import { updateUserProfile } from "@/app/actions/form";

export default function Page() {
  const { userInfo, fetchUserInfo, setUserInfo } = useUser();
  const [disabled, setDisabled] = useState(true);
  const [image, setImage] = useState<File | null>(null);
  const [profile, setProfile] = useState({
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
    email: userInfo.email,
    bio: userInfo.bio,
  });

  useEffect(() => {
    if (!userInfo.username) {
      fetchUserInfo();
    }
    setProfile({
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      email: userInfo.email,
      bio: userInfo.bio,
    });
  }, [userInfo]);

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    setDisabled(!disabled);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting profile data:", profile);

    const formData = new FormData();
    const json = JSON.stringify(profile);
    const jsonBlob = new Blob([json], { type: "application/json" });
    formData.append("data", jsonBlob);
    if (image) {
      formData.append("file", image);
    }

    const res = await updateUserProfile(formData);
    if (res.success) {
      setUserInfo(res.data);
      setDisabled(true);
      setImage(null);
    } else {
      alert(res.error || "Failed to update profile, please try again.");
      res.redirectLink && navigate(res.redirectLink);
    }
  };

  return (
    <EditorPageLayout>
      <PageHeader title="Profile" />
      <p style={{ marginBottom: "16px" }} />
      <ProfileImage
        imageUrl={userInfo.imageUrl}
        setImage={setImage}
        disabled={disabled}
      />
      <TextFormBlock
        title={"USERNAME"}
        value={userInfo.username}
        name="username"
        disabled
      />
      <TextFormBlock
        title={"FIRST NAME"}
        value={profile.firstName}
        name="first-name"
        onChange={(val) => setProfile((prev) => ({ ...prev, firstName: val }))}
        disabled={disabled}
      />
      <TextFormBlock
        title={"LAST NAME"}
        value={profile.lastName || ""}
        onChange={(val) => setProfile((prev) => ({ ...prev, lastName: val }))}
        name="last-name"
        disabled={disabled}
      />
      <TextFormBlock
        title={"EMAIL"}
        value={profile.email || ""}
        onChange={(val) => setProfile((prev) => ({ ...prev, email: val }))}
        name="email"
        disabled={disabled}
      />
      <TextFormBlock
        title={"BIO"}
        value={profile.bio || ""}
        onChange={(val) => setProfile((prev) => ({ ...prev, bio: val }))}
        name="bio"
        placeholder="Enter your bio"
        disabled={disabled}
      />
      <BaseButton
        text={disabled ? "EDIT" : "SUBMIT"}
        handler={disabled ? handleEdit : handleSubmit}
        style={{ height: "2rem", minHeight: "2rem" }}
      />
    </EditorPageLayout>
  );
}

interface ProfileImageProps {
  imageUrl?: string;
  setImage: (val: File | null) => void;
  disabled?: boolean;
}

function ProfileImage({
  imageUrl,
  setImage,
  disabled = true,
}: ProfileImageProps) {
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(imageUrl);
  useEffect(() => {
    setPreviewUrl(imageUrl);
  }, [imageUrl]);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const compressed = await imageCompression(file, {
        fileType: "image/webp",
        maxSizeMB: 1,
        maxWidthOrHeight: 800,
      });

      const preview = URL.createObjectURL(compressed);
      setPreviewUrl(preview);
      setImage(compressed); // Update the image URL in the parent component
    } catch (error) {
      console.error("Image compression failed:", error);
      setPreviewUrl(undefined);
      setImage(null);
    }
  };

  const handleImageClick = () => {
    inputRef.current?.click();
  };

  return (
    <div style={{ marginBottom: "32px" }}>
      {!disabled && (
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
          style={{ display: "none" }}
        />
      )}
      <Image
        src={previewUrl || "/image/defaultProfile.jpg"}
        alt="Profile Preview"
        width={160}
        height={160}
        style={{ borderRadius: "50%", cursor: disabled ? "cursor" : "pointer" }}
        onClick={handleImageClick}
      />
    </div>
  );
}
