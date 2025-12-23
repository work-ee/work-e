import { cache } from "react";

import { auth } from "@/lib/auth";

export default async function GetSession() {
  const session = await auth();
  return session;
}

export const GetCachedAuth = cache(async () => {
  return await auth();
});
