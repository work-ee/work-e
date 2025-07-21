import NextAuth from "next-auth";
import type { Provider } from "next-auth/providers";
import GoogleProvider from "next-auth/providers/google";
import LinkedinProvider from "next-auth/providers/linkedin";

import { handleGoogleLogin, handleLinkedInLogin } from "./auth-callbacks";

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
          return await handleLinkedInLogin({ user, account });
        }
        return true;
      } catch (error) {
        console.error("Error during sign in:", error);
        return false;
      }
    },

    async jwt({ token, user, account }) {
      // -> Saving user data to JWT token
      if (account?.provider) {
        token.provider = account.provider;
      }

      if (user?.backendToken) {
        token.backendToken = user.backendToken;
        token.backendUser = user.backendUser;
      }

      return token;
    },

    async session({ session, token }) {
      // -> Saving backend token and user data to session
      if (token.backendToken) {
        session.backendToken = token.backendToken;
        session.backendUser = token.backendUser;
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
