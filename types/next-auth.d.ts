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
// export interface IUserFormData extends Omit<BackendUser, "id" | "date_joined"> {
export interface IUserFormData {
  username?: string;
  avatar_url?: string;
  date_joined?: string;
  linkedin_url?: string;
  cv?: string;

  first_name?: string;
  last_name?: string;
  email?: string;
  linkedin_id?: string;
  password?: string;
  last_login?: string;
  is_superuser?: boolean;
  is_staff?: boolean;
  is_active?: boolean;
  google_id?: string | null;
  overview?: string | null;
  hobbies?: string | null;
  motivation_letter?: string | null;
  linkedin?: string | null;
  github?: string | null;
  ip?: string | null;
  programming_languages?: string | null;
  skills?: string | null;
  personal_info?: number | null;
  groups?: number[];
  user_permissions?: number[];

  experience?: string;
  education?: string;
  courses?: string;
  foreign_languages?: string;
  desired_position?: string;
  phone?: string;
  country?: string;
  city?: string;
}

export interface BackendUserResponse {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar_url: string;
  linkedin?: string;
  desired_position?: string;
  phone?: string;
  country?: string;
  city?: string;
  overview?: string;
  experience?: string;
  education?: string;
  courses?: string;
  programming_languages?: string;
  skills?: string;
  foreign_languages?: string;
  hobbies?: string;
  motivation_letter?: string;
  github?: string;
  ip?: string;
  userAgent?: string;
}

interface GetCurrentUserResult {
  success: boolean;
  data?: BackendUserResponse;
  error?: string;
}
