"use client";

import { Suspense, lazy } from "react";
import { SmartPageSkeleton } from "./LoadingSkeleton";

// Lazy load role-specific dashboard components
export const LazyAdminDashboard = lazy(
  () => import("@/app/admin/dashboard/page")
);
export const LazyEmployerDashboard = lazy(
  () => import("@/app/employer/dashboard/page")
);
export const LazyEmployeeDashboard = lazy(
  () => import("@/app/employee/dashboard/page")
);
export const LazyDashboardRouter = lazy(() => import("@/app/dashboard/page"));

// Lazy load auth components
export const LazyLogin = lazy(() => import("@/app/(auth)/login/page"));
export const LazyRegister = lazy(() => import("@/app/(auth)/register/page"));

// Lazy load main pages
export const LazyJobsPage = lazy(() => import("@/app/(website)/jobs/page"));

interface LazyWrapperProps {
  children: React.ReactNode;
  fallback?: React.ComponentType;
}

export function LazyWrapper({
  children,
  fallback: Fallback = SmartPageSkeleton,
}: LazyWrapperProps) {
  return <Suspense fallback={<Fallback />}>{children}</Suspense>;
}

// Higher order component for lazy loading
export function withLazyLoading<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: React.ComponentType
) {
  return function LazyComponent(props: P) {
    return (
      <LazyWrapper fallback={fallback}>
        <Component {...props} />
      </LazyWrapper>
    );
  };
}
