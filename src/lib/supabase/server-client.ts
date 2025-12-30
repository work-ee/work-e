import { createServerClient } from "@supabase/ssr";

import { cookies } from "next/headers";
import type { NextRequest, NextResponse } from "next/server";

import { getSupabaseEnv } from "./env";

/**
 * Creates a Supabase client for use in Next.js middleware.
 * This function handles cookies using NextRequest and NextResponse.
 */
export function createSupabaseMiddlewareClient(request: NextRequest, response: NextResponse) {
  const { url, anonKey } = getSupabaseEnv();

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          request.cookies.set(name, value);
          response.cookies.set(name, value, options);
        });
      },
    },
  });
}

/**
 * Creates a Supabase client for use in Server Components and Route Handlers.
 * This function handles cookies using the cookies() function from next/headers.
 */
export async function createSupabaseServerClient() {
  const { url, anonKey } = getSupabaseEnv();
  const cookieStore = await cookies();

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          cookieStore.set(name, value, options);
        });
      },
    },
  });
}
