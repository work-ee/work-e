import NextAuth from "next-auth";
import type { Provider } from "next-auth/providers";
import GoogleProvider from "next-auth/providers/google";
import LinkedinProvider from "next-auth/providers/linkedin";

import { handleGoogleLogin, handleLinkedInDjangoLogin, handleLinkedInLogin } from "./auth-callbacks";

// Custom LinkedIn Django Provider
const LinkedinDjangoProvider: Provider = {
  id: "linkedin-django",
  name: "LinkedIn Django",
  type: "credentials",
  credentials: {
    userData: { type: "text" },
  },
  async authorize(credentials) {
    try {
      if (!credentials?.userData) {
        return null;
      }

      const userData = JSON.parse(credentials.userData as string);

      return {
        id: userData.id.toString(),
        email: userData.email,
        name: `${userData.first_name} ${userData.last_name}`.trim(),
        image: userData.avatar_url,
        backendUser: userData,
      };
    } catch (error) {
      console.error("LinkedIn Django provider error:", error);
      return null;
    }
  },
};

const providers: Provider[] = [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    authorization: {
      params: {
        prompt: "consent",
        access_type: "offline",
        response_type: "code",
      },
    },
  }),
  LinkedinProvider({
    clientId: process.env.LINKEDIN_CLIENT_ID!,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
  }),
  LinkedinDjangoProvider,
];

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET!,
  trustHost: true,
  callbacks: {
    async signIn({ user, account }) {
      try {
        if (account?.provider === "google") {
          return await handleGoogleLogin({ user, account });
        }

        if (account?.provider === "linkedin") {
          return await handleLinkedInLogin();
        }

        if (account?.provider === "linkedin-django") {
          return await handleLinkedInDjangoLogin({ user, account });
        }
        return true;
      } catch (error) {
        console.error("Error during sign in:", error);
        return false;
      }
    },

    async jwt({ token, user, account }) {
      // -> Saving user data to JWT token
      if (user?.backendToken) {
        token.backendToken = user.backendToken;
        token.backendRefreshToken = user.backendRefreshToken;
        token.backendUser = user.backendUser;
      }

      if (user?.backendUser) {
        token.backendUser = user.backendUser;
      }

      if (account?.provider) {
        token.provider = account.provider;
      }

      return token;
    },

    async session({ session, token }) {
      // -> Saving backend token and user data to session
      if (token.backendToken) {
        session.backendToken = token.backendToken;
      }

      if (token.backendRefreshToken) {
        session.backendRefreshToken = token.backendRefreshToken;
      }

      if (token.backendUser) {
        session.backendUser = token.backendUser;
      }

      if (token.provider) {
        session.provider = token.provider;
      }

      return session;
    },
  },
});
