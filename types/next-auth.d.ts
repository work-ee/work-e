import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

export interface BackendUser {
  id: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  avatar_url: string;
  date_joined: string;
}
export interface BackendTokens {
  backendToken: string;
  backendRefreshToken: string;
}
export interface ExtendedSessionData {
  backendToken?: string;
  backendRefreshToken?: string;
  backendUser?: BackendUser;
  provider?: string;
}

declare module "next-auth" {
  interface Session extends DefaultSession, ExtendedSessionData {}
  interface User extends DefaultUser, ExtendedSessionData {}
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT, ExtendedSessionData {}
}
