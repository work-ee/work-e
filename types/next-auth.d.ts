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

export interface ExtendedSessionData {
  backendToken?: string;
  backendUser?: BackendUser;
  provider?: string;
}

export interface ExtendedUserData {
  backendToken?: string;
  backendUser?: BackendUser;
}

declare module "next-auth" {
  interface Session extends DefaultSession, ExtendedSessionData {}
  interface User extends DefaultUser, ExtendedUserData {}
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT, ExtendedSessionData {}
}

// This file is used for sending user data (Profile) to the backend
export interface IUserFormData extends Omit<BackendUser, "id" | "date_joined"> {
  username?: string;
  avatar_url?: string;
  date_joined?: string;
  linkedin_url?: string;
  cv?: string;
}
