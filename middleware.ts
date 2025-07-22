import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/lib/auth";

// Define protected and auth routes for better maintainability
const protectedRoutes = ["/onboarding", "/profile"];
const authRoutes = ["/sign-in", "/sign-up"];
// const publicRoutes = ["/"];

export default async function middleware(req: NextRequest) {
  const session = await auth();
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!session?.user;

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

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
