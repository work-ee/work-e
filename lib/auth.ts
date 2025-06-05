import Google from "@auth/core/providers/google";
import LinkedIn from "@auth/core/providers/linkedin";

import NextAuth from "next-auth";
import type { Provider } from "next-auth/providers";

import { handleGoogleLogin, handleLinkedInLogin } from "./auth-callbacks";

const providers: Provider[] = [
  Google({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    // authorization: {
    //   params: {
    //     prompt: "consent",
    //     access_type: "offline",
    //     response_type: "code",
    //   },
    // },
  }),
  LinkedIn({
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
        if (account?.provider === "google" && account.id_token) {
          return await handleGoogleLogin({ user, account });
        }

        if (account?.provider === "linkedin") {
          return await handleLinkedInLogin();
        }
        return true;
      } catch (error) {
        console.error("Error during sign in:", error);
        return false;
      }
    },

    async jwt({ token, user }) {
      // -> Saving user data to JWT token
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

      return session;
    },
  },
});
