import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;

  const pathname = request.nextUrl.pathname;

  const isAuthPage = pathname.startsWith("/auth");

  const isProtected =
    pathname.startsWith("/student") || pathname.startsWith("/teacher");

  // Belum login
  if (!token && isProtected) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Sudah login
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/student/materials", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/student/:path*", "/teacher/:path*", "/auth/:path*"],
};
