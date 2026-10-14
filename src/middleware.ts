import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;
  const userRole = req.auth?.user?.role;
  const demoRole = req.cookies.get("resda_demo_session")?.value; // "student" | "admin"

  const hasStudentAccess = isLoggedIn || demoRole === "student" || demoRole === "admin";
  const hasAdminAccess = userRole === "ADMIN" || demoRole === "admin";

  // Protected dashboard routes — require login or demo mode
  if (pathname.startsWith("/dashboard")) {
    if (!hasStudentAccess) {
      const loginUrl = new URL("/login", req.nextUrl.origin);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Admin routes — require ADMIN role or demo admin
  if (pathname.startsWith("/admin")) {
    if (!hasAdminAccess) {
      if (!hasStudentAccess) {
        const loginUrl = new URL("/login", req.nextUrl.origin);
        loginUrl.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(loginUrl);
      }
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl.origin));
    }
  }

  // Redirect logged-in or demo users away from auth pages
  if (pathname === "/login" || pathname === "/register") {
    if (hasAdminAccess) {
      return NextResponse.redirect(new URL("/admin", req.nextUrl.origin));
    }
    if (hasStudentAccess) {
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl.origin));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/login", "/register"],
};
