import NextAuth from "next-auth";
import type { Provider } from "next-auth/providers";
import GoogleProvider from "next-auth/providers/google";
import LinkedinProvider from "next-auth/providers/linkedin";

import { handleGoogleLogin, handleLinkedInLogin } from "./auth-callbacks";

const providers: Provider[] = [
  GoogleProvider({
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
  LinkedinProvider({
    clientId: process.env.LINKEDIN_CLIENT_ID!,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
  }),
];

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.AUTH_SECRET!,
  trustHost: true,
  cookies: {
    pkceCodeVerifier: {
      name: "authjs.pkce.code_verifier",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 15, // 15 хвилин замість session
      },
    },
  },
  pages: {
    error: "/auth/error",
    signIn: "/sign-in",
  },
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

    async jwt({ token, user, account, trigger, session }) {
      if (account?.provider) {
        token.provider = account.provider;
      }

      if (user?.backendToken) {
        token.backendToken = user.backendToken;
      }

      if (user?.backendUser) {
        token.backendUser = user.backendUser;
      }

      if (trigger === "update" && session?.backendUser) {
        // Update token with new user data
        token.backendUser = {
          ...token.backendUser,
          ...session.backendUser,
        };
      }

      return token;
    },

    async session({ session, token }) {
      if (token.backendToken) {
        session.backendToken = token.backendToken;
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
