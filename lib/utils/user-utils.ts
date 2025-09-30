import { cache } from "react";

import { auth } from "@/lib/auth";

import { UserService } from "@/actions/client/user-service";
import type { BackendUser } from "@/types/next-auth";

export interface UserData {
  user: BackendUser | null;
  first_name: string;
  last_name: string;
  username: string;
  avatar_url: string | null;
  email: string | null;
}

export const getCurrentUserData = cache(async (): Promise<UserData> => {
  const session = await auth();

  if (!session) {
    throw new Error("User not authenticated");
  }

  const userResponse = await UserService.getCurrentUser();
  const user = userResponse.success ? userResponse.data : null;

  const userData: Partial<BackendUser> = user || session?.backendUser || {};

  return {
    user: user || null,
    first_name: userData.first_name || session?.user?.name || "Guest",
    last_name: userData.last_name || "User",
    avatar_url: userData.avatar_url || session?.user?.image || null,
    email: userData.email || session?.user?.email || "",
    username: userData.username || "guest_user",
  };
});

// Basic user info for display purposes
export async function getUserDisplayInfo(): Promise<Pick<UserData, "first_name" | "avatar_url">> {
  const data = await getCurrentUserData();
  return {
    first_name: data.first_name,
    avatar_url: data.avatar_url,
  };
}

// Safe version that doesn't throw an error
export async function getSafeCurrentUserData(): Promise<UserData | null> {
  try {
    return await getCurrentUserData();
  } catch {
    return null;
  }
}
