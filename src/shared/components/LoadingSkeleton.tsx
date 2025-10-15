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
    <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-100 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
        <Skeleton className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex-shrink-0" />
        <div className="flex-1 space-y-2 w-full">
          <Skeleton className="h-4 sm:h-5 w-full sm:w-3/4" />
          <Skeleton className="h-3 sm:h-4 w-2/3 sm:w-1/2" />
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2 sm:mt-3">
            <Skeleton className="h-3 sm:h-4 w-16 sm:w-20" />
            <Skeleton className="h-3 sm:h-4 w-20 sm:w-24" />
            <Skeleton className="h-3 sm:h-4 w-12 sm:w-16" />
          </div>
        </div>
        <Skeleton className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
      </div>
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-100">
      <div className="space-y-2 sm:space-y-3">
        <Skeleton className="h-3 sm:h-4 w-20 sm:w-24" />
        <Skeleton className="h-6 sm:h-8 w-12 sm:w-16" />
        <Skeleton className="h-2 sm:h-3 w-16 sm:w-20" />
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-6 sm:h-8 w-48 sm:w-64" />
        <Skeleton className="h-4 sm:h-5 w-64 sm:w-80" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-100">
        <Skeleton className="h-5 sm:h-6 w-24 sm:w-32 mb-3 sm:mb-4" />
        <Skeleton className="h-48 sm:h-64 w-full" />
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 sm:p-6">
        <Skeleton className="h-5 sm:h-6 w-32 sm:w-40 mb-3 sm:mb-4" />
        <div className="space-y-3 sm:space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 sm:gap-4">
              <Skeleton className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex-shrink-0" />
              <div className="flex-1 space-y-1 sm:space-y-2">
                <Skeleton className="h-3 sm:h-4 w-full sm:w-48" />
                <Skeleton className="h-2 sm:h-3 w-3/4 sm:w-24" />
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
    <div className="w-56 lg:w-64 h-screen bg-white border-r border-gray-200">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center gap-2 lg:gap-3 p-4 lg:p-6 border-b">
          <Skeleton className="w-8 h-8 lg:w-10 lg:h-10 rounded-xl flex-shrink-0" />
          <div className="space-y-1 lg:space-y-2">
            <Skeleton className="h-4 lg:h-5 w-16 lg:w-20" />
            <Skeleton className="h-2 lg:h-3 w-10 lg:w-12" />
          </div>
        </div>

        {/* User Info */}
        <div className="p-4 lg:p-6 border-b bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center gap-2 lg:gap-3">
            <Skeleton className="w-10 h-10 lg:w-12 lg:h-12 rounded-full flex-shrink-0" />
            <div className="space-y-1 lg:space-y-2">
              <Skeleton className="h-3 lg:h-4 w-20 lg:w-24" />
              <Skeleton className="h-2 lg:h-3 w-12 lg:w-16" />
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 lg:p-4 space-y-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2 lg:py-3"
            >
              <Skeleton className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0" />
              <Skeleton className="h-3 lg:h-4 flex-1" />
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-3 lg:p-4 border-t">
          <div className="flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2 lg:py-3">
            <Skeleton className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0" />
            <Skeleton className="h-3 lg:h-4 w-16 lg:w-20" />
          </div>
          <Skeleton className="h-2 lg:h-3 w-20 lg:w-24 mx-auto mt-1 lg:mt-2" />
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
        <div className="flex items-center justify-between h-14 sm:h-16">
          <div className="flex items-center gap-2 sm:gap-3">
            <Skeleton className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex-shrink-0" />
            <Skeleton className="h-5 sm:h-6 w-16 sm:w-20" />
          </div>
          <nav className="hidden md:flex items-center gap-4 lg:gap-8">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-3 sm:h-4 w-12 sm:w-16" />
            ))}
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <Skeleton className="h-6 sm:h-8 w-12 sm:w-16" />
            <Skeleton className="h-6 sm:h-8 w-16 sm:w-20" />
          </div>
        </div>
      </div>
    </header>
  );
}

export function HeroSectionSkeleton() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 sm:space-y-6">
          <Skeleton className="h-8 sm:h-10 lg:h-12 w-full max-w-xs sm:max-w-md lg:max-w-lg mx-auto" />
          <Skeleton className="h-4 sm:h-5 lg:h-6 w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto" />
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
            <Skeleton className="h-10 sm:h-12 w-full sm:w-32 mx-auto sm:mx-0" />
            <Skeleton className="h-10 sm:h-12 w-full sm:w-28 mx-auto sm:mx-0" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function JobListSkeleton() {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Filters */}
      <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-100">
        <div className="flex flex-wrap gap-2 sm:gap-4">
          <Skeleton className="h-8 sm:h-10 w-full sm:w-48 flex-shrink-0" />
          <Skeleton className="h-8 sm:h-10 w-full sm:w-32 flex-shrink-0" />
          <Skeleton className="h-8 sm:h-10 w-full sm:w-28 flex-shrink-0" />
          <Skeleton className="h-8 sm:h-10 w-full sm:w-24 flex-shrink-0" />
        </div>
      </div>

      {/* Job Cards */}
      <div className="space-y-3 sm:space-y-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <JobCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export function AuthFormSkeleton() {
  return (
    <div className="max-w-sm sm:max-w-md mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg">
      <div className="space-y-4 sm:space-y-6">
        <div className="text-center space-y-2">
          <Skeleton className="h-6 sm:h-8 w-24 sm:w-32 mx-auto" />
          <Skeleton className="h-3 sm:h-4 w-36 sm:w-48 mx-auto" />
        </div>

        <div className="space-y-3 sm:space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-1 sm:space-y-2">
              <Skeleton className="h-3 sm:h-4 w-16 sm:w-20" />
              <Skeleton className="h-8 sm:h-10 w-full" />
            </div>
          ))}
        </div>

        <Skeleton className="h-10 sm:h-12 w-full" />

        <div className="text-center">
          <Skeleton className="h-3 sm:h-4 w-24 sm:w-32 mx-auto" />
        </div>
      </div>
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
      {/* Profile Header */}
      <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-100">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
          <Skeleton className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex-shrink-0" />
          <div className="space-y-2 sm:space-y-3 text-center sm:text-left">
            <Skeleton className="h-5 sm:h-6 w-40 sm:w-48 mx-auto sm:mx-0" />
            <Skeleton className="h-3 sm:h-4 w-28 sm:w-32 mx-auto sm:mx-0" />
            <Skeleton className="h-3 sm:h-4 w-36 sm:w-40 mx-auto sm:mx-0" />
          </div>
        </div>
      </div>

      {/* Profile Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="bg-white p-4 sm:p-6 rounded-xl border border-gray-100"
          >
            <Skeleton className="h-4 sm:h-5 w-20 sm:w-24 mb-3 sm:mb-4" />
            <div className="space-y-2 sm:space-y-3">
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={j} className="space-y-1 sm:space-y-2">
                  <Skeleton className="h-2 sm:h-3 w-12 sm:w-16" />
                  <Skeleton className="h-3 sm:h-4 w-full" />
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
export function PageSkeleton({ type = "dashboard" }: PageSkeletonProps) {
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
              <div className="flex-1 lg:ml-56 xl:ml-64">
                {/* Mobile Header Skeleton */}
                <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 lg:hidden">
                  <div className="flex items-center justify-between">
                    <Skeleton className="w-5 h-5 sm:w-6 sm:h-6" />
                    <div className="flex items-center gap-2">
                      <Skeleton className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg" />
                      <Skeleton className="w-16 sm:w-20 h-5 sm:h-6" />
                    </div>
                    <div className="w-5 sm:w-6"></div>
                  </div>
                </header>

                {/* Main Content */}
                <main className="p-3 sm:p-4 lg:p-6">
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
