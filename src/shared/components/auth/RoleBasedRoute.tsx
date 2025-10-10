"use client";

import { useAuth } from "@/shared/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode, useState } from "react";
import type { UserRole } from "@/shared/types";

interface RoleBasedRouteProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
  redirectPath?: string;
  requireAuth?: boolean;
}

export default function RoleBasedRoute({
  children,
  allowedRoles,
  redirectPath,
  requireAuth = true,
}: RoleBasedRouteProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || isLoading) return;

    // If authentication is required but user is not logged in
    if (requireAuth && !user) {
      router.push("/login");
      return;
    }

    // If user is logged in but doesn't have the required role
    if (user && allowedRoles && !allowedRoles.includes(user.role)) {
      // Redirect to appropriate dashboard based on user's role
      const roleDashboards = {
        admin: "/admin/dashboard",
        employee: "/employee/dashboard",
        employer: "/employer/dashboard",
      };

      const userDashboard =
        roleDashboards[user.role as keyof typeof roleDashboards];
      const redirectTo = redirectPath || userDashboard || "/dashboard";

      // Only redirect if we have a valid path
      if (redirectTo && typeof redirectTo === "string") {
        router.push(redirectTo);
      }
      return;
    }
  }, [
    mounted,
    user,
    isLoading,
    allowedRoles,
    redirectPath,
    requireAuth,
    router,
  ]);

  // Don't render anything until mounted
  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // If authentication is required but user is not logged in
  if (requireAuth && !user) {
    return null; // Will redirect to login
  }

  // If user doesn't have required role
  if (user && allowedRoles && !allowedRoles.includes(user.role)) {
    return null; // Will redirect to appropriate dashboard
  }

  return <>{children}</>;
}

// Helper hook for role-based redirects
export function useRoleRedirect() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  const redirectToDashboard = () => {
    if (isLoading || !user) return;

    const roleDashboards = {
      admin: "/admin/dashboard",
      employee: "/employee/dashboard",
      employer: "/employer/dashboard",
    };

    const dashboard = roleDashboards[user.role];
    if (dashboard) {
      router.push(dashboard);
    }
  };

  return { redirectToDashboard, user, isLoading };
}
