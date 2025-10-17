import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Get authentication token from cookies
  const token = request.cookies.get("auth_token")?.value;
  const userCookie = request.cookies.get("user")?.value;

  // Parse user data if available
  let user: { role: string } | null = null;
  if (userCookie) {
    try {
      user = JSON.parse(userCookie);
    } catch {
      // Invalid user cookie
      user = null;
    }
  }

  // Define protected routes and their required roles
  const protectedRoutes = {
    "/admin": "admin",
    "/employer": "employer",
    "/employee": "employee",
  };

  // Check if the current path is a protected route
  const protectedPath = Object.keys(protectedRoutes).find((path) =>
    pathname.startsWith(path)
  );

  if (protectedPath) {
    // If no token, redirect to login
    if (!token) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // If no user data, redirect to login
    if (!user) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Check if user has the required role
    const requiredRole =
      protectedRoutes[protectedPath as keyof typeof protectedRoutes];
    if (user.role !== requiredRole) {
      // Redirect to unauthorized page or their appropriate dashboard
      const dashboardUrl = getDashboardUrl(user.role);
      return NextResponse.redirect(new URL(dashboardUrl, request.url));
    }
  }

  // Allow access if no protection needed or user is authorized
  return NextResponse.next();
}

function getDashboardUrl(role: string): string {
  switch (role) {
    case "admin":
      return "/admin/dashboard";
    case "employer":
      return "/employer/dashboard";
    case "employee":
      return "/employee/dashboard";
    default:
      return "/";
  }
}

export const config = {
  matcher: ["/admin/:path*", "/employer/:path*", "/employee/:path*"],
};
