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

declare module "next-auth" {
  interface Session extends DefaultSession {
    backendToken?: string;
    backendUser?: BackendUser;
  }

  interface User extends DefaultUser {
    backendToken?: string;
    backendUser?: BackendUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    backendToken?: string;
    backendUser?: BackendUser;
  }
}
