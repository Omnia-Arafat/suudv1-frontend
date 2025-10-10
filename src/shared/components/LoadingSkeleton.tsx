"use client";

import { cn } from "@/shared/utils/cn";

interface SkeletonProps {
  className?: string;
  variant?: "default" | "text" | "circular" | "rectangular";
  animation?: "pulse" | "wave" | "none";
}

interface PageSkeletonProps {
  type?: "site" | "dashboard" | "auth" | "jobs" | "profile";
  variant?: "default" | "minimal" | "detailed";
}

export function Skeleton({
  className,
  variant = "default",
  animation = "pulse",
}: SkeletonProps) {
  const baseClasses = "rounded-md bg-gray-200";

  const variantClasses = {
    default: "rounded-md",
    text: "rounded-sm h-4",
    circular: "rounded-full",
    rectangular: "rounded-none",
  };

  const animationClasses = {
    pulse: "animate-pulse",
    wave: "animate-wave",
    none: "",
  };

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        animationClasses[animation],
        className
      )}
    />
  );
}

export function JobCardSkeleton() {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <div className="flex items-start gap-4">
        <Skeleton className="w-12 h-12 rounded-lg" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <div className="flex items-center gap-4 mt-3">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
        <Skeleton className="w-6 h-6" />
      </div>
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100">
      <div className="space-y-3">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-16" />
        <Skeleton className="h-3 w-20" />
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-5 w-80" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-xl border border-gray-100">
        <Skeleton className="h-6 w-32 mb-4" />
        <Skeleton className="h-64 w-full" />
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <Skeleton className="h-6 w-40 mb-4" />
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SidebarSkeleton() {
  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center gap-3 p-6 border-b">
          <Skeleton className="w-10 h-10 rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-3 w-12" />
          </div>
        </div>

        {/* User Info */}
        <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center gap-3">
            <Skeleton className="w-12 h-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3">
              <Skeleton className="w-5 h-5" />
              <Skeleton className="h-4 flex-1" />
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t">
          <div className="flex items-center gap-3 px-4 py-3">
            <Skeleton className="w-5 h-5" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-3 w-24 mx-auto mt-2" />
        </div>
      </div>
    </div>
  );
}

// Site-specific skeletons
export function SiteHeaderSkeleton() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Skeleton className="w-8 h-8 rounded-lg" />
            <Skeleton className="h-6 w-20" />
          </div>
          <nav className="hidden md:flex items-center gap-8">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-16" />
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
      </div>
    </header>
  );
}

export function HeroSectionSkeleton() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6">
          <Skeleton className="h-12 w-96 mx-auto" />
          <Skeleton className="h-6 w-80 mx-auto" />
          <div className="flex justify-center gap-4 mt-8">
            <Skeleton className="h-12 w-32" />
            <Skeleton className="h-12 w-28" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function JobListSkeleton() {
  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white p-6 rounded-xl border border-gray-100">
        <div className="flex flex-wrap gap-4">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-28" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>

      {/* Job Cards */}
      <div className="space-y-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <JobCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export function AuthFormSkeleton() {
  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <Skeleton className="h-8 w-32 mx-auto" />
          <Skeleton className="h-4 w-48 mx-auto" />
        </div>

        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>

        <Skeleton className="h-12 w-full" />

        <div className="text-center">
          <Skeleton className="h-4 w-32 mx-auto" />
        </div>
      </div>
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="bg-white p-6 rounded-xl border border-gray-100">
        <div className="flex items-center gap-6">
          <Skeleton className="w-24 h-24 rounded-full" />
          <div className="space-y-3">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-40" />
          </div>
        </div>
      </div>

      {/* Profile Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-xl border border-gray-100"
          >
            <Skeleton className="h-5 w-24 mb-4" />
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={j} className="space-y-2">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Enhanced Page Skeleton with type support
export function PageSkeleton({
  type = "dashboard",
  variant = "default",
}: PageSkeletonProps) {
  const renderContent = () => {
    switch (type) {
      case "site":
        return (
          <div className="min-h-screen bg-gray-50">
            <SiteHeaderSkeleton />
            <HeroSectionSkeleton />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <JobListSkeleton />
            </main>
          </div>
        );

      case "auth":
        return (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <AuthFormSkeleton />
          </div>
        );

      case "jobs":
        return (
          <div className="min-h-screen bg-gray-50">
            <SiteHeaderSkeleton />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <JobListSkeleton />
            </main>
          </div>
        );

      case "profile":
        return (
          <div className="min-h-screen bg-gray-50">
            <SiteHeaderSkeleton />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <ProfileSkeleton />
            </main>
          </div>
        );

      case "dashboard":
      default:
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/50">
      <div className="flex min-h-screen">
        {/* Sidebar Skeleton */}
        <div className="hidden lg:block">
          <SidebarSkeleton />
        </div>
        
        {/* Main Content Skeleton */}
        <div className="flex-1 lg:ml-64">
          {/* Mobile Header Skeleton */}
          <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-4 lg:hidden">
            <div className="flex items-center justify-between">
              <Skeleton className="w-6 h-6" />
              <div className="flex items-center gap-2">
                <Skeleton className="w-8 h-8 rounded-lg" />
                <Skeleton className="w-20 h-6" />
              </div>
              <div className="w-6"></div>
            </div>
          </header>
          
          {/* Main Content */}
          <main className="p-4 lg:p-6">
            <DashboardSkeleton />
          </main>
        </div>
      </div>
    </div>
  );
    }
  };

  return renderContent();
}

// Hook to determine skeleton type based on current route
export function useSkeletonType():
  | "site"
  | "dashboard"
  | "auth"
  | "jobs"
  | "profile" {
  if (typeof window === "undefined") return "dashboard";

  const pathname = window.location?.pathname;
  if (!pathname) return "dashboard";

  if (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/employer") ||
    pathname.startsWith("/employee")
  ) {
    return "dashboard";
  }

  if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
    return "auth";
  }

  if (pathname.startsWith("/jobs")) {
    return "jobs";
  }

  if (pathname.startsWith("/profile")) {
    return "profile";
  }

  return "site";
}

// Smart skeleton component that automatically chooses the right type
export function SmartPageSkeleton() {
  const skeletonType = useSkeletonType();
  return <PageSkeleton type={skeletonType} />;
}
