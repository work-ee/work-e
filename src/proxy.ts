import { NextRequest, NextResponse } from "next/server";

import { COOKIE_NAME } from "@/lib/constants";
import { getUser } from "@/lib/supabase/auth";

// Define protected and auth routes for better maintainability
const protectedRoutes = ["/onboarding", "/profile", "/jobs", "/jobs/[slug]", "/uiKit", "/cv"];
const authRoutes = ["/sign-in", "/sign-up"];

export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const locale = req.cookies.get(COOKIE_NAME)?.value || req.headers.get("accept-language")?.split(",")[0] || "uk";
  const res = NextResponse.next({
    request: {
      headers: req.headers,
    },
  });
  res.headers.set("x-locale", locale);

  const user = await getUser();

  const isLoggedIn = !!user;

  // Redirect authenticated users from home to onboarding
  if (isLoggedIn && pathname === "/") {
    return NextResponse.redirect(new URL("/onboarding", req.url));
  }

  // Redirect authenticated users away from auth pages
  if (isLoggedIn && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/onboarding", req.url));
  }

  // Redirect unauthenticated users from protected routes
  if (!isLoggedIn && protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
