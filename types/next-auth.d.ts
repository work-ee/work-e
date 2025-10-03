import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

export interface BackendUser {
  id: number;
  date_joined: string;
  linkedin_id: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  is_superuser: boolean;
  is_staff: boolean;
  is_active: boolean;
  groups: number[];
  user_permissions: number[];
  avatar_url: string | null;
  last_login: string | null;
  google_id: string | null;
  overview: string | null;
  hobbies: string | null;
  motivation_letter: string | null;
  linkedin: string | null;
  github: string | null;
  ip: string | null;
  programming_languages: string | nul;
  skills: string | null;
  personal_info: number | null;

  desired_position?: string;
  phone?: string;
  country?: string;
  city?: string;
  experience?: string;
  education?: string;
  courses?: string;
  foreign_languages?: string;
  userAgent?: string;
  linkedin_url?: string;
  cv?: string;
}

export type UserBase = Partial<BackendUser>;

export interface ExtendedSessionData {
  backendToken?: string;
  backendUser?: Partial<BackendUser>;
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

interface GetCurrentUserResult {
  success: boolean;
  data?: BackendUserResponse;
  error?: string;
}

export interface IUserFormData {
  username?: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar_url?: string;
  linkedin_url?: string;
  cv?: string;
  date_joined?: string;
}
