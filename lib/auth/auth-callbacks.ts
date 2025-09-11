import type { GoogleProfile } from "@auth/core/providers/google";
import type { Account, Profile, Session, User } from "@auth/core/types";

import { AuthService } from "@/actions/client/user-service";

interface Props {
  user: User;
  account: Account & { access_token?: string };
  profile?: Profile & GoogleProfile;
  session?: Session;
}

export const handleGoogleLogin = async ({ user, account }: Props) => {
  if (!account.access_token) {
    console.error("❌ handleGoogleLogin: No access_token found in account");
    return false;
  }

  try {
    const res = await AuthService.authenticateWithGoogle(account.access_token);

    if (!res.success || !res.data) {
      throw new Error(res.error || "Failed to authenticate with Google");
    }
    const { data } = res;

    // -> Saving backend token and user data to the user object
    user.backendToken = data.token;
    user.backendUser = data.user;
    user.id = data.user.id.toString();
    user.email = data.user.email;
    user.name = `${data.user.first_name} ${data.user.last_name}`.trim();
    user.image = data.user.avatar_url;
    return true;
  } catch (error) {
    console.error("❌ handleGoogleLogin exception:", error); // ✅ Google

    // More detailed error logging for debugging
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }

    // Throw error with specific message for NextAuth to handle
    throw new Error(`Authentication failed: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
};

export const handleLinkedInLogin = async ({ user, account }: Props) => {
  // console.log("handleLinkedInLogin", user, account);

  if (!account.access_token) {
    console.error("❌ handleLinkedInLogin: No access_token found in account");
    return false;
  }

  try {
    const res = await AuthService.authenticateWithLinkedIn(account.access_token);

    if (!res.success || !res.data) {
      throw new Error(res.error || "Failed to authenticate with LinkedIn");
    }
    const { data } = res;

    // -> Saving backend token and user data to the user object
    user.backendToken = data.token;
    user.backendUser = data.user;
    user.id = data.user.id.toString();
    user.email = data.user.email;
    user.name = `${data.user.first_name} ${data.user.last_name}`.trim();
    user.image = data.user.avatar_url;
    return true;
  } catch (error) {
    console.error("❌ handleLinkedInLogin exception:", error);

    // More detailed error logging for debugging
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }

    // Throw error with specific message for NextAuth to handle
    throw new Error(`Authentication failed: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
};
