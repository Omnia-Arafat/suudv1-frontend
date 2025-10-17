"use client";

import React, { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useAuth, useI18n } from "@/shared/contexts";

// Types
interface EmployerLayoutProps {
  children: ReactNode;
  title?: string;
}

interface NavItem {
  name: string;
  href: string;
  icon: string;
  count?: number;
  badge?: string;
}

// Constants
const ROUTES = {
  DASHBOARD: "/employer/dashboard",
  POST_JOB: "/employer/jobs/create",
  MY_JOBS: "/employer/jobs",
} as const;

export default function EmployerLayout({
  children,
  title,
}: EmployerLayoutProps) {
  // Hooks
  const { user, logout, isLoading } = useAuth();
  const { language, t } = useI18n();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Navigation configuration
  const navigation: NavItem[] = [
    {
      name: t("navigation.dashboard"),
      href: ROUTES.DASHBOARD,
      icon: "pi pi-chart-bar",
    },
    {
      name: t("navigation.postJobNav"),
      href: ROUTES.POST_JOB,
      icon: "pi pi-plus-circle",
    },
    {
      name: t("navigation.myJobsNav"),
      href: ROUTES.MY_JOBS,
      icon: "pi pi-briefcase",
    },
    {
      name: t("navigation.applicationsNav"),
      href: "/employer/applications",
      icon: "pi pi-file",
    },
    {
      name: t("navigation.messagesNav"),
      href: "/employer/messages",
      icon: "pi pi-comments",
    },
    {
      name: t("navigation.candidatesNav"),
      href: "/employer/candidates",
      icon: "pi pi-users",
    },
    {
      name: t("navigation.companyProfileNav"),
      href: "/employer/company",
      icon: "pi pi-building",
    },
    {
      name: t("navigation.analyticsNav"),
      href: "/employer/analytics",
      icon: "pi pi-chart-line",
    },
  ];

  // Helper functions
  const isActiveRoute = (href: string): boolean => {
    if (!pathname) return false;

    // Exact matches for specific routes
    if (href === ROUTES.DASHBOARD) {
      return pathname === ROUTES.DASHBOARD || pathname === "/employer";
    }
    if (href === ROUTES.POST_JOB) {
      return pathname === ROUTES.POST_JOB;
    }
    if (href === ROUTES.MY_JOBS) {
      return pathname === ROUTES.MY_JOBS;
    }

    // Default: check if pathname starts with href
    return pathname.startsWith(href);
  };

  const handleLogout = async (): Promise<void> => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const getRTLClasses = (ltrClass: string, rtlClass: string): string => {
    return language === "ar" ? rtlClass : ltrClass;
  };

  // Effects
  useEffect(() => {
    if (!isLoading && (!user || user.role !== "employer")) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  // Loading state
  if (isLoading || !user || user.role !== "employer") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600" />
      </div>
    );
  }

  // Render navigation item
  const renderNavItem = (item: NavItem, isMobile = false) => {
    const isActive = isActiveRoute(item.href);
    const baseClasses = `group flex items-center px-4 py-4 font-medium rounded-md transition-all duration-200 ${
      isMobile ? "text-base" : "text-sm hover:scale-[1.02] active:scale-98"
    }`;

    const activeClasses = `bg-indigo-50 text-indigo-600 shadow-sm font-semibold ${getRTLClasses(
      "border-l-4",
      "border-r-4"
    )} border-indigo-600`;

    const inactiveClasses = `text-gray-600 hover:bg-gray-50 hover:text-gray-900 ${
      isMobile ? "" : "hover:shadow-sm"
    } ${getRTLClasses("border-l-4", "border-r-4")} border-transparent`;

    const iconClasses = `${item.icon} ${getRTLClasses(
      isMobile ? "mr-4" : "mr-3",
      isMobile ? "ml-4" : "ml-3"
    )} transition-all duration-200 ${
      isActive
        ? "text-indigo-500 scale-110"
        : "text-gray-400 group-hover:text-gray-500 group-hover:scale-105"
    }`;

    return (
      <Link
        key={item.name}
        href={item.href}
        className={`${baseClasses} ${
          isActive ? activeClasses : inactiveClasses
        }`}
        onClick={() => isMobile && setSidebarOpen(false)}
      >
        <i className={iconClasses} />
        <span className="flex-1 transition-all duration-200">{item.name}</span>

        {/* Count badge */}
        {item.count && (
          <span
            className={`${getRTLClasses(
              "ml-auto",
              "mr-auto"
            )} inline-block py-0.5 px-3 text-xs font-medium rounded-full bg-blue-100 text-blue-800`}
          >
            {item.count}
          </span>
        )}

        {/* Status badge */}
        {item.badge && (
          <span
            className={`${getRTLClasses(
              "ml-auto",
              "mr-auto"
            )} inline-block py-0.5 px-2 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800`}
          >
            {item.badge}
          </span>
        )}

        {/* Arrow indicator for desktop */}
        {!isMobile && !isActive && (
          <i
            className={`pi ${getRTLClasses(
              "pi-angle-right",
              "pi-angle-left"
            )} text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-all duration-200 transform ${getRTLClasses(
              "group-hover:translate-x-1",
              "group-hover:-translate-x-1"
            )} ${getRTLClasses("ml-auto", "mr-auto")}`}
          />
        )}
      </Link>
    );
  };

  // Render logo
  const renderLogo = () => (
    <button
      onClick={() => router.push("/")}
      className="flex items-center justify-center hover:opacity-80 transition-all duration-200 cursor-pointer group"
    >
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24">
        <Image
          src="/images/logo.png"
          alt="SU'UD Logo"
          width={98}
          height={98}
          className="object-contain group-hover:scale-105 transition-transform duration-200"
          priority
        />
      </div>
    </button>
  );

  // Render user profile section
  const renderUserProfile = (isMobile = false) => (
    <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
      <div className={`flex-shrink-0 ${isMobile ? "" : "w-full"} group block`}>
        <div className="flex items-center">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
            <i className="pi pi-building text-indigo-600" />
          </div>
          <div className={getRTLClasses("ml-3", "mr-3")}>
            <p
              className={`text-sm font-medium text-gray-700 group-hover:text-gray-900 ${getRTLClasses(
                "text-left",
                "text-right"
              )}`}
            >
              {user?.name}
            </p>
            <p
              className={`text-xs font-medium text-gray-500 group-hover:text-gray-700 ${getRTLClasses(
                "text-left",
                "text-right"
              )}`}
            >
              Recruiter
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="mt-2 w-full flex items-center px-2 py-2 text-xs font-medium rounded-md text-red-600 hover:bg-red-50 hover:text-red-700"
        >
          <i className={`pi pi-sign-out ${getRTLClasses("mr-2", "ml-2")}`} />
          {t("sidebar.sign_out")}
        </button>
      </div>
    </div>
  );

  return (
    <div
      className="min-h-screen bg-gray-50"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 flex z-40 lg:hidden ${
          sidebarOpen ? "" : "pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity ease-linear duration-300 ${
            sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setSidebarOpen(false)}
        />

        {/* Sidebar */}
        <div
          className={`relative flex-1 flex flex-col max-w-xs w-full bg-white transform transition ease-in-out duration-300 ${
            sidebarOpen
              ? "translate-x-0"
              : getRTLClasses("-translate-x-full", "translate-x-full")
          }`}
        >
          {/* Close button */}
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <i className="pi pi-times text-white" />
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center px-4 pt-4">
            {renderLogo()}
          </div>

          {/* Navigation */}
          <nav className="mt-5 px-3 space-y-2">
            {navigation.map((item) => renderNavItem(item, true))}
          </nav>

          {/* User profile */}
          {renderUserProfile(true)}
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0 px-4 pt-4">
              {renderLogo()}
            </div>

            {/* Navigation */}
            <nav className="mt-5 flex-1 px-3 bg-white space-y-2">
              {navigation.map((item) => renderNavItem(item, false))}
            </nav>

            {/* User profile */}
            {renderUserProfile(false)}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`${getRTLClasses(
          "lg:pl-64",
          "lg:pr-64"
        )} flex flex-col flex-1`}
      >
        {/* Top Navigation */}
        <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
          {/* Mobile menu button */}
          <button
            type="button"
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <i className="pi pi-bars text-lg" />
          </button>

          <div className="flex-1 px-4 flex justify-between">
            {/* Search */}
            <div className="flex-1 flex">
              <form className="w-full flex md:ml-0" action="#" method="GET">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                  <div
                    className={`absolute inset-y-0 ${getRTLClasses(
                      "left-0",
                      "right-0"
                    )} flex items-center pointer-events-none`}
                  >
                    <i className="pi pi-search" />
                  </div>
                  <input
                    id="search-field"
                    className={`block w-full h-full ${getRTLClasses(
                      "pl-8 pr-3",
                      "pr-8 pl-3"
                    )} py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm`}
                    placeholder={t("dashboard.searchPlaceholder")}
                    type="search"
                    name="search"
                  />
                </div>
              </form>
            </div>

            {/* Notifications */}
            <div
              className={`${getRTLClasses(
                "ml-4",
                "mr-4"
              )} flex items-center ${getRTLClasses("md:ml-6", "md:mr-6")}`}
            >
              <button
                type="button"
                className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <i className="pi pi-bell text-lg" />
              </button>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1">
          <div className="py-6">
            {/* Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="md:flex md:items-center md:justify-between">
                <div className="flex-1 min-w-0">
                  <h2
                    className={`text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate ${getRTLClasses(
                      "text-left",
                      "text-right"
                    )}`}
                  >
                    {title || t("dashboard.employerDashboard")}
                  </h2>
                </div>
                <div
                  className={`mt-4 flex md:mt-0 ${getRTLClasses(
                    "md:ml-4",
                    "md:mr-4"
                  )}`}
                >
                  <Link
                    href="/employer/jobs/create"
                    className={`${getRTLClasses(
                      "ml-3",
                      "mr-3"
                    )} inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                  >
                    <i
                      className={`pi pi-plus-circle ${getRTLClasses(
                        "mr-2",
                        "ml-2"
                      )}`}
                    />
                    {t("navigation.postJobNav")}
                  </Link>
                </div>
              </div>
            </div>

            {/* Children */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
