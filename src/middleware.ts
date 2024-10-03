import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";
import type { ResponseJwt } from "./interface";
import { removeToken } from "./utils/authService";

export function middleware(request: NextRequest) {
  const authTokens = request.cookies.get("authTokens")?.value;
  let decoded: ResponseJwt | null = null;


  if (authTokens) {
    try {
      decoded = jwtDecode<ResponseJwt>(authTokens);
      const currentTime = Math.floor(Date.now() / 1000);
      if (decoded.exp && decoded.exp < currentTime) {
        removeToken()
        decoded = null;
      }
    } catch {
      decoded = null;
    }
  }

  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
  const isAuthRoute = request.nextUrl.pathname.startsWith("/auth");


  if (decoded === null) {
    if (isAuthRoute) {
      return NextResponse.next();
    }
    if (isAdminRoute) {

      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    return NextResponse.next();
  }

  if (decoded) {
    if (isAuthRoute) {
      if (decoded.role === "ADMIN") {
        return NextResponse.redirect(new URL("/admin", request.url));
      } else {
        return NextResponse.next();
      }
    }
    if (isAdminRoute && decoded.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin(.*)", "/auth/(.*)"],
};
