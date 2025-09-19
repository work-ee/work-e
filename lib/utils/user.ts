import { Session } from "next-auth";

import GetSession from "@/lib/auth/get-session";

import { getCurrentUser } from "@/actions/server/user";
import { BackendUser } from "@/types/next-auth";

export interface UserData {
  session: Session | null;
  userData: BackendUser | null | undefined;
  first_name: string;
  last_name: string;
  avatar_url: string | null;
}

export async function fetchCurrentUserData(): Promise<UserData> {
  const session = await GetSession();

  let userData = null;
  if (session?.backendToken) {
    try {
      const userResult = await getCurrentUser();
      if (userResult.success) {
        userData = userResult.data;
      }
    } catch (error) {
      console.error("Failed to get current user:", error);
    }
  }

  const finalUserData = userData || session?.backendUser;

  return {
    session,
    first_name: finalUserData?.first_name || session?.user?.name || "Guest",
    last_name: finalUserData?.last_name || "User",
    avatar_url: finalUserData?.avatar_url || session?.user?.image || null,
    userData: finalUserData,
  };
}
