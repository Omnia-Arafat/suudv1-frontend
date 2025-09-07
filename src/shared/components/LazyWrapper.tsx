'use client';

import { Suspense, lazy } from 'react';
import { PageSkeleton } from './LoadingSkeleton';

// Lazy load dashboard components
export const LazyDashboard = lazy(() => import('@/app/(dashboard)/dashboard/page'));
export const LazyDashboardJobs = lazy(() => import('@/app/(dashboard)/dashboard/jobs/page'));
export const LazyDashboardApplications = lazy(() => import('@/app/(dashboard)/dashboard/applications/page'));
export const LazyDashboardProfile = lazy(() => import('@/app/(dashboard)/dashboard/profile/page'));

// Lazy load auth components
export const LazyLogin = lazy(() => import('@/app/(auth)/login/page'));
export const LazyRegister = lazy(() => import('@/app/(auth)/register/page'));

// Lazy load main pages
export const LazyJobsPage = lazy(() => import('@/app/(website)/jobs/page'));

interface LazyWrapperProps {
  children: React.ReactNode;
  fallback?: React.ComponentType;
}

export function LazyWrapper({ children, fallback: Fallback = PageSkeleton }: LazyWrapperProps) {
  return (
    <Suspense fallback={<Fallback />}>
      {children}
    </Suspense>
  );
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
