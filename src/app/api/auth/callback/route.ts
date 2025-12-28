import { NextResponse } from "next/server";

import { getBaseUrl } from "@/lib/http/get-base-url";
import { getSafeNextPath } from "@/lib/http/get-safe-next-path";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  const baseUrl = getBaseUrl(request);
  const next = getSafeNextPath(url.searchParams, "/");

  if (code) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(new URL(next, baseUrl));
    }
  }

  return NextResponse.redirect(new URL("/auth/auth-code-error", baseUrl));
}
