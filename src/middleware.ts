import { NextRequest, NextResponse } from "next/server";

function isTokenExpired(token: string): boolean {
  try {
    const payload = token.split(".")[1];
    if (!payload) return true;

    const decoded = JSON.parse(
      atob(payload.replace(/-/g, "+").replace(/_/g, "/")),
    ) as { exp?: number };

    return typeof decoded.exp !== "number" || decoded.exp * 1000 <= Date.now();
  } catch {
    return true;
  }
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const hasValidToken = Boolean(token && !isTokenExpired(token));

  const pathname = request.nextUrl.pathname;

  const isAuthPage = pathname.startsWith("/auth");

  const isProtected =
    pathname.startsWith("/student") || pathname.startsWith("/teacher");

  if (!hasValidToken && isProtected) {
    const response = NextResponse.redirect(new URL("/auth/login", request.url));
    if (token) response.cookies.delete("access_token");
    return response;
  }

  if (!hasValidToken && token) {
    const response = NextResponse.next();
    response.cookies.delete("access_token");
    return response;
  }

  if (hasValidToken && isAuthPage) {
    return NextResponse.redirect(new URL("/student/materials", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/student/:path*", "/teacher/:path*", "/auth/:path*"],
};
