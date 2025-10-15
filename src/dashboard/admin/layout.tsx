"use client";

import React, { ReactNode } from "react";
import { useAuth } from "@/shared/contexts/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, LogOut, Bell } from "lucide-react";

interface AdminLayoutProps {
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

export default function AdminLayout({
  children,
  title = "Admin Dashboard",
}: AdminLayoutProps) {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Function to check if a route is active
  const isActiveRoute = (href: string) => {
    if (!pathname) return false;
    // Exact match for dashboard
    if (href === "/admin/dashboard") {
      return pathname === "/admin/dashboard" || pathname === "/admin";
    }
    // For other routes, check if pathname starts with the href
    return pathname.startsWith(href);
  };

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  const navigation: NavItem[] = [
    { name: "Overview", href: "/admin/dashboard", icon: "pi pi-chart-line" },
    { name: "User Management", href: "/admin/users", icon: "pi pi-users" },
    { name: "Job Management", href: "/admin/jobs", icon: "pi pi-briefcase" },
    {
      name: "Applications",
      href: "/admin/applications",
      icon: "pi pi-file-text",
    },
    { name: "Messages", href: "/admin/messages", icon: "pi pi-comments" },
    { name: "Companies", href: "/admin/companies", icon: "pi pi-building" },
    {
      name: "Contact Messages",
      href: "/admin/contacts",
      icon: "pi pi-envelope",
    },
    { name: "Analytics", href: "/admin/analytics", icon: "pi pi-chart-bar" },
    { name: "System Settings", href: "/admin/settings", icon: "pi pi-cog" },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (isLoading || !user || user.role !== "admin") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div
        className={`fixed inset-0 flex z-40 lg:hidden ${
          sidebarOpen ? "" : "pointer-events-none"
        }`}
      >
        <div
          className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity ease-linear duration-300 ${
            sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setSidebarOpen(false)}
        />

        <div
          className={`relative flex-1 flex flex-col max-w-xs w-full bg-white transform transition ease-in-out duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>

          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <button
                onClick={() => router.push("/")}
                className="flex items-center hover:opacity-80 transition-all duration-200 cursor-pointer group"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm group-hover:scale-105 transition-transform duration-200">
                  ص
                </div>
                <span className="ml-2 text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-200">
                  SU&apos;UD
                </span>
              </button>
            </div>
            <nav className="mt-5 px-2 space-y-2">
              {navigation.map((item) => {
                const isActive = isActiveRoute(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-4 py-4 text-base font-medium rounded-md transition-all duration-200 ${
                      isActive
                        ? "bg-indigo-50 text-indigo-600 border-r-4 border-indigo-600 shadow-sm font-semibold"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-r-4 border-transparent"
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <i
                      className={`${
                        item.icon
                      } mr-4 text-lg transition-all duration-200 ${
                        isActive
                          ? "text-indigo-500 scale-110"
                          : "text-gray-400 group-hover:text-gray-500 group-hover:scale-105"
                      }`}
                    />
                    {item.name}
                    {item.count && (
                      <span className="ml-auto inline-block py-0.5 px-3 text-xs font-medium rounded-full bg-red-100 text-red-800">
                        {item.count}
                      </span>
                    )}
                    {item.badge && (
                      <span className="ml-auto inline-block py-0.5 px-2 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <div className="flex-shrink-0 group block">
              <div className="flex items-center">
                <div className="ml-3">
                  <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">
                    {user.name}
                  </p>
                  <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700">
                    System Administrator
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <button
                onClick={() => router.push("/")}
                className="flex items-center hover:opacity-80 transition-all duration-200 cursor-pointer group"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm group-hover:scale-105 transition-transform duration-200">
                  ص
                </div>
                <span className="ml-2 text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-200">
                  SU&apos;UD
                </span>
              </button>
            </div>
            <nav className="mt-5 flex-1 px-2 bg-white space-y-2">
              {navigation.map((item) => {
                const isActive = isActiveRoute(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-4 py-4 text-sm font-medium rounded-md transition-all duration-200 hover:scale-[1.02] active:scale-98 ${
                      isActive
                        ? "bg-indigo-50 text-indigo-600 border-l-4 border-indigo-600 shadow-sm font-semibold"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm border-l-4 border-transparent"
                    }`}
                  >
                    <i
                      className={`${
                        item.icon
                      } mr-3 text-lg transition-all duration-200 ${
                        isActive
                          ? "text-indigo-500 scale-110"
                          : "text-gray-400 group-hover:text-gray-500 group-hover:scale-105"
                      }`}
                    />
                    <span className="flex-1 transition-all duration-200">
                      {item.name}
                    </span>
                    {item.count && (
                      <span className="ml-auto inline-block py-0.5 px-3 text-xs font-medium rounded-full bg-red-100 text-red-800">
                        {item.count}
                      </span>
                    )}
                    {item.badge && (
                      <span className="ml-auto inline-block py-0.5 px-2 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                        {item.badge}
                      </span>
                    )}
                    {!isActive && (
                      <i className="pi pi-angle-right text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-all duration-200 transform group-hover:translate-x-1 ml-auto" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <div className="flex-shrink-0 w-full group block">
              <div className="flex items-center">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                  <i className="pi pi-user text-indigo-600 text-lg" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                    {user.name}
                  </p>
                  <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                    System Administrator
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="mt-2 w-full flex items-center px-2 py-2 text-xs font-medium rounded-md text-red-600 hover:bg-red-50 hover:text-red-700"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        {/* Top navigation bar */}
        <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
          <button
            type="button"
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex">
              <form className="w-full flex md:ml-0" action="#" method="GET">
                <label htmlFor="admin-search-field" className="sr-only">
                  Search
                </label>
                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                  <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                    <i className="pi pi-search text-lg" />
                  </div>
                  <input
                    id="admin-search-field"
                    className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                    placeholder="Search users, jobs, applications..."
                    type="search"
                    name="search"
                  />
                </div>
              </form>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <button
                type="button"
                className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Bell className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="md:flex md:items-center md:justify-between">
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                    {title}
                  </h2>
                </div>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
