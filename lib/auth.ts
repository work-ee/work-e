import Credentials from "@auth/core/providers/credentials";
import Google from "@auth/core/providers/google";
import LinkedIn from "@auth/core/providers/linkedin";

import NextAuth from "next-auth";
import type { Provider } from "next-auth/providers";

const providers: Provider[] = [
  Google({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  }),
  LinkedIn({
    clientId: process.env.LINKEDIN_CLIENT_ID!,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
  }),
  Credentials({
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      const { email, password } = credentials ?? {};

      // For testing credentials - hardcoded user:
      if (email === "admin@example.com" && password === "admin") {
        return { id: "1", email, name: "Admin" };
      }

      return null;
    },
  }),
];

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider();
      return { id: providerData.id, name: providerData.name };
    } else {
      return { id: provider.id, name: provider.name };
    }
  })
  .filter((provider) => provider.id !== "credentials");

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,
  // debug: true,
  // pages: {
  //   signIn: "/login",
  // },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET!,
  trustHost: true,
});
