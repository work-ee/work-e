import type { NextRequest, NextResponse } from "next/server";

import { createSupabaseMiddlewareClient, createSupabaseServerClient } from "./server-client";

/**
 * Gets the current user in Server Components or Route Handlers.
 */
export async function getUser() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();
  return error ? null : data.user;
}

/**
 * Gets the current user in Middleware.
 * Requires NextRequest and NextResponse for proper cookie handling.
 * Automatically refreshes expired sessions.
 */
export async function getUserInMiddleware(request: NextRequest, response: NextResponse) {
  const supabase = createSupabaseMiddlewareClient(request, response);

  // Refresh session if needed (automatically handles expired sessions)
  await supabase.auth.getSession();

  const { data, error } = await supabase.auth.getUser();
  return error ? null : data.user;
}
