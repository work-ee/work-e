import type { GoogleProfile } from "@auth/core/providers/google";
import type { Account, Profile, Session, User } from "@auth/core/types";

import { fetchGoogleTokenWithRetry } from "./fetchGoogleTokenWithRetry";

interface Props {
  user: User;
  account: Account & { id_token?: string };
  profile?: Profile & GoogleProfile;
  session?: Session;
}

export const handleGoogleLogin = async ({ user, account }: Props) => {
  // console.log(account.id_token);

  try {
    // TODO: -> Fetch GoogleToken with retry, if don't need replace to simple fetch request
    const data = await fetchGoogleTokenWithRetry(`${process.env.API_URL}/api/users/google/login/`, account.id_token!);
    // console.log("🚨", data, "🏁");

    // -> Saving backend token and user data to the user object
    user.backendToken = data.token;
    user.backendUser = data.user;
    user.id = data.user.id.toString();
    user.email = data.user.email;
    user.name = `${data.user.first_name} ${data.user.last_name}`.trim();
    user.image = data.user.avatar_url;
    return true;
  } catch (err) {
    console.error("❌ handleGoogleLogin exception:", err);
    return false;
  }
};

export const handleLinkedInLogin = async () => {
  // -> Sending LinkedIn access token to Django backend:
  return true; // TODO: Implement LinkedIn login handling
};

export const handleLinkedInDjangoLogin = async ({ user }: Props) => {
  try {
    // console.log("Handling LinkedIn Django login...", user);

    // -> User data provided via credentials provider
    if (user.backendUser) {
      // console.log("LinkedIn Django user data:", user.backendUser);
      return true;
    }

    return false;
  } catch (error) {
    console.error("❌ handleLinkedInDjangoLogin exception:", error);
    return false;
  }
};
