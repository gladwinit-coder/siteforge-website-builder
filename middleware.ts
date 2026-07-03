import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  const isLoggedIn = !!token;
  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/register");
  const isAdminPage = pathname.startsWith("/admin");
  const isDashboard =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/domains") ||
    pathname.startsWith("/builder") ||
    pathname.startsWith("/sections") ||
    pathname.startsWith("/templates") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/seo") ||
    pathname.startsWith("/preview") ||
    pathname.startsWith("/publish");

  // Redirect unauthenticated users away from dashboard
  if (!isLoggedIn && isDashboard) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Block non-admins from admin pages
  if (isAdminPage && (!token || (token as any).role !== "admin")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Redirect logged-in users away from auth pages
  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\.png$).*)"],
};
