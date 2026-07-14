import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const protectedRoutes = [
    "/dashboard",
    "/list-asset",
    "/my-portfolio",
    "/items/add",
    "/items/manage",
  ];

  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const sessionCookie = request.cookies.get("better-auth.session_token");

    if (!sessionCookie) {
      const loginUrl = new URL("/auth/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/list-asset/:path*",
    "/my-portfolio/:path*",
    "/items/add/:path*",
    "/items/manage/:path*",
  ],
};
