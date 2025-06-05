import type { GoogleProfile } from "@auth/core/providers/google";
import type { Account, Profile, Session, User } from "@auth/core/types";

interface Props {
  user: User;
  account: Account & { id_token?: string };
  profile?: Profile & GoogleProfile;
  session?: Session;
}

export const handleGoogleLogin = async ({ user, account }: Props) => {
  // console.log(account.id_token);

  // TODO: FIX ERROR without promise: {"id_token":["Invalid Google ID token: Token used too early, ..."]}
  await new Promise((res) => setTimeout(res, 5000));

  // -> Sending id_token to Django backend
  const response = await fetch(`${process.env.API_URL}/api/users/google-login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id_token: account.id_token,
    }),
  });
  // console.log("✅", await response.text(), "🏁"); // return response text end finish

  if (response.ok) {
    const data = await response.json();
    // console.log("🚨", data, "🏁");

    // -> Saving backend token and user data to the user object
    user.backendToken = data.token;
    user.backendUser = data.user;
    user.id = data.user.id.toString();
    user.email = data.user.email;
    user.name = `${data.user.first_name} ${data.user.last_name}`.trim();
    user.image = data.user.avatar_url;
    return true;
  } else {
    console.error("Backend authentication failed");
    return false;
  }
};

export const handleLinkedInLogin = async () => {
  // -> Sending LinkedIn access token to Django backend:
  return true; // TODO: Implement LinkedIn login handling
};
