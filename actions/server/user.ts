"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth";

import { GetCurrentUserResult, IUserFormData } from "@/types/next-auth";

export async function getCurrentUser(): Promise<GetCurrentUserResult> {
  try {
    const session = await auth();
    const token = session?.backendToken || session?.user?.backendToken;

    if (!token) {
      console.error("No authentication token found");
      return { success: false, error: "No authentication token found" };
    }

    const response = await fetch(`${process.env.API_URL}/api/users/current/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to get current user: ${response.status} ${errorText}`);
    }

    const currentUser = await response.json();

    return { success: true, data: currentUser };
  } catch (error) {
    console.error("Error getting current user:", error);
    return { success: false, error: "Failed to get current user" };
  }
}

export async function updateUserProfile(formData: IUserFormData, userId: number) {
  try {
    const session = await auth();
    const token = session?.backendToken || session?.user?.backendToken;

    if (!token) {
      return { success: false, error: "No authentication token found" };
    }

    const response = await fetch(`${process.env.API_URL}/api/users/${userId}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update profile: ${response.status} ${errorText}`);
    }

    const result = await response.json();
    revalidatePath("/profile");

    return { success: true, data: result };
  } catch (error) {
    console.error("Error updating profile:", error);
    return { success: false, error: "Failed to update profile" };
  }
}

export async function updateUserSettings(settings: {
  autoSendCV: boolean;
  autoCompareJobs: boolean;
  emailNotifications: boolean;
}) {
  try {
    return { success: true, data: settings };
    const response = await fetch(`${process.env.API_URL}/api/users/settings`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(settings),
    });

    if (!response.ok) {
      throw new Error("Failed to update settings");
    }

    const result = await response.json();
    revalidatePath("/profile");

    return { success: true, data: result };
  } catch (error) {
    console.error("Error updating settings:", error);
    return { success: false, error: "Failed to update settings" };
  }
}
