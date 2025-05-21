"use server";

import { redirect } from "next/navigation";

export async function navigate(data: string) {
  redirect(data);
}

export async function navigateArchive(projectId: string) {
  redirect(`/archive/${projectId}`);
}

export async function navigateWorkspace(projectId: string) {
  // XXX navigate to workspace
  redirect(`/workspace/${projectId}`);
}
