import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isAuthPage = req.nextUrl.pathname.startsWith("/login");
  const isAdminPage = req.nextUrl.pathname.startsWith("/admin");
  const isDashboard = req.nextUrl.pathname.startsWith("/dashboard") ||
    req.nextUrl.pathname.startsWith("/domains") ||
    req.nextUrl.pathname.startsWith("/builder") ||
    req.nextUrl.pathname.startsWith("/publish");

  if (!isLoggedIn && isDashboard) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isAdminPage && req.auth?.user && (req.auth.user as any).role !== "admin") {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
